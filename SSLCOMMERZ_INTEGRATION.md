# SSLCommerz Payment Gateway Integration Guide

## Overview
This guide covers the integration of SSLCommerz payment gateway with the Laravel backend and Nuxt 4 frontend.

## Architecture Flow

```
User → Nuxt Frontend → Laravel Backend → SSLCommerz API → Payment Page
                                            ↓
User ← Nuxt Frontend ← Laravel Backend ← SSLCommerz Callback
```

## Backend Integration (Laravel)

### 1. Install SSLCommerz Package

```bash
composer require shipu/sslcommerz
```

### 2. Publish Configuration

```bash
php artisan vendor:publish --provider="Shipu\SslCommerz\SslCommerzServiceProvider"
```

### 3. Environment Variables (.env)

```env
# SSLCommerz Configuration
SSLCOMMERZ_STORE_ID=your_store_id
SSLCOMMERZ_STORE_PASSWORD=your_store_password
SSLCOMMERZ_TESTMODE=true  # Set to false for production
SSLCOMMERZ_SUCCESS_URL="${APP_URL}/api/v1/payment/success"
SSLCOMMERZ_FAIL_URL="${APP_URL}/api/v1/payment/fail"
SSLCOMMERZ_CANCEL_URL="${APP_URL}/api/v1/payment/cancel"
SSLCOMMERZ_IPN_URL="${APP_URL}/api/v1/payment/ipn"
```

### 4. Database Migration (Create payments table)

```php
// database/migrations/xxxx_create_payments_table.php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->string('transaction_id')->unique();
            $table->string('payment_method')->nullable();
            $table->decimal('amount', 10, 2);
            $table->string('currency', 3)->default('BDT');
            $table->enum('status', ['pending', 'processing', 'completed', 'failed', 'cancelled'])->default('pending');
            $table->string('bank_tran_id')->nullable();
            $table->string('card_type')->nullable();
            $table->string('card_no')->nullable();
            $table->text('gateway_response')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();

            $table->index(['transaction_id', 'status']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('payments');
    }
};
```

### 5. Payment Model

```php
// app/Models/Payment.php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'order_id',
        'user_id',
        'transaction_id',
        'payment_method',
        'amount',
        'currency',
        'status',
        'bank_tran_id',
        'card_type',
        'card_no',
        'gateway_response',
        'paid_at',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'paid_at' => 'datetime',
        'gateway_response' => 'array',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
```

### 6. Payment Controller

```php
// app/Http/Controllers/Api/V1/PaymentController.php
<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Shipu\SslCommerz\SslCommerzNotification;

class PaymentController extends Controller
{
    /**
     * Initiate payment
     */
    public function initiate(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id',
        ]);

        $order = Order::with('user', 'items')->findOrFail($request->order_id);

        // Create payment record
        $payment = Payment::create([
            'order_id' => $order->id,
            'user_id' => $order->user_id,
            'transaction_id' => 'TXN-' . uniqid(),
            'amount' => $order->total,
            'currency' => 'BDT',
            'status' => 'pending',
        ]);

        // Prepare SSLCommerz data
        $post_data = [
            'total_amount' => $order->total,
            'currency' => 'BDT',
            'tran_id' => $payment->transaction_id,
            'product_category' => 'E-commerce',
            'product_name' => 'Order #' . $order->id,
            'cus_name' => $order->user->name ?? $order->shipping_address['first_name'] . ' ' . $order->shipping_address['last_name'],
            'cus_email' => $order->user->email ?? $order->shipping_address['email'] ?? 'customer@example.com',
            'cus_add1' => $order->shipping_address['address_line_1'] ?? 'N/A',
            'cus_city' => $order->shipping_address['city'] ?? 'Dhaka',
            'cus_state' => $order->shipping_address['state'] ?? 'Dhaka',
            'cus_postcode' => $order->shipping_address['postal_code'] ?? '1000',
            'cus_country' => $order->shipping_address['country'] ?? 'Bangladesh',
            'cus_phone' => $order->shipping_address['phone'] ?? '01700000000',
            'shipping_method' => 'NO',
            'num_of_item' => $order->items->count(),
        ];

        try {
            $sslc = new SslCommerzNotification();
            $payment_options = $sslc->makePayment($post_data, 'hosted');

            if (!is_array($payment_options)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Payment gateway error',
                ], 500);
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'gateway_url' => $payment_options['GatewayPageURL'] ?? null,
                    'transaction_id' => $payment->transaction_id,
                ],
            ]);
        } catch (\Exception $e) {
            Log::error('SSLCommerz Error: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Payment initiation failed',
            ], 500);
        }
    }

    /**
     * Payment success callback
     */
    public function success(Request $request)
    {
        $tran_id = $request->input('tran_id');
        $amount = $request->input('amount');
        $currency = $request->input('currency');

        $sslc = new SslCommerzNotification();

        try {
            $validation = $sslc->orderValidate($request->all(), $tran_id, $amount, $currency);

            if ($validation) {
                DB::transaction(function () use ($request, $tran_id) {
                    $payment = Payment::where('transaction_id', $tran_id)->firstOrFail();

                    $payment->update([
                        'status' => 'completed',
                        'payment_method' => $request->input('card_type'),
                        'bank_tran_id' => $request->input('bank_tran_id'),
                        'card_type' => $request->input('card_type'),
                        'card_no' => $request->input('card_no'),
                        'gateway_response' => $request->all(),
                        'paid_at' => now(),
                    ]);

                    // Update order status
                    $payment->order->update([
                        'payment_status' => 'paid',
                        'status' => 'processing',
                    ]);
                });

                // Redirect to frontend success page
                return redirect(config('app.frontend_url') . '/payment/success?transaction_id=' . $tran_id);
            } else {
                return redirect(config('app.frontend_url') . '/payment/failed?transaction_id=' . $tran_id);
            }
        } catch (\Exception $e) {
            Log::error('Payment Success Error: ' . $e->getMessage());
            return redirect(config('app.frontend_url') . '/payment/error');
        }
    }

    /**
     * Payment fail callback
     */
    public function fail(Request $request)
    {
        $tran_id = $request->input('tran_id');

        try {
            $payment = Payment::where('transaction_id', $tran_id)->first();

            if ($payment) {
                $payment->update([
                    'status' => 'failed',
                    'gateway_response' => $request->all(),
                ]);
            }

            return redirect(config('app.frontend_url') . '/payment/failed?transaction_id=' . $tran_id);
        } catch (\Exception $e) {
            Log::error('Payment Fail Error: ' . $e->getMessage());
            return redirect(config('app.frontend_url') . '/payment/error');
        }
    }

    /**
     * Payment cancel callback
     */
    public function cancel(Request $request)
    {
        $tran_id = $request->input('tran_id');

        try {
            $payment = Payment::where('transaction_id', $tran_id)->first();

            if ($payment) {
                $payment->update([
                    'status' => 'cancelled',
                    'gateway_response' => $request->all(),
                ]);
            }

            return redirect(config('app.frontend_url') . '/payment/cancelled?transaction_id=' . $tran_id);
        } catch (\Exception $e) {
            Log::error('Payment Cancel Error: ' . $e->getMessage());
            return redirect(config('app.frontend_url') . '/payment/error');
        }
    }

    /**
     * IPN (Instant Payment Notification)
     */
    public function ipn(Request $request)
    {
        $tran_id = $request->input('tran_id');
        $status = $request->input('status');

        try {
            $payment = Payment::where('transaction_id', $tran_id)->first();

            if ($payment && $status == 'VALID') {
                $payment->update([
                    'status' => 'completed',
                    'gateway_response' => $request->all(),
                ]);
            }

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            Log::error('IPN Error: ' . $e->getMessage());
            return response()->json(['status' => 'error'], 500);
        }
    }

    /**
     * Get payment status
     */
    public function status(Request $request, $transactionId)
    {
        $payment = Payment::with('order')
            ->where('transaction_id', $transactionId)
            ->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => $payment,
        ]);
    }
}
```

### 7. Routes (routes/api.php)

```php
use App\Http\Controllers\Api\V1\PaymentController;

Route::prefix('v1')->group(function () {
    // Payment routes
    Route::post('/payment/initiate', [PaymentController::class, 'initiate'])->middleware('auth:sanctum');
    Route::post('/payment/success', [PaymentController::class, 'success']);
    Route::post('/payment/fail', [PaymentController::class, 'fail']);
    Route::post('/payment/cancel', [PaymentController::class, 'cancel']);
    Route::post('/payment/ipn', [PaymentController::class, 'ipn']);
    Route::get('/payment/status/{transactionId}', [PaymentController::class, 'status'])->middleware('auth:sanctum');
});
```

### 8. Additional Configuration

Add frontend URL to config/app.php:

```php
'frontend_url' => env('FRONTEND_URL', 'http://localhost:3000'),
```

And add to .env:

```env
FRONTEND_URL=http://localhost:3000
```

## Frontend Integration (Nuxt 4)

See the created files:
- `shared/types/payment.ts` - Payment type definitions
- `app/composables/usePayment.ts` - Payment composable
- `app/pages/payment/success.vue` - Success page
- `app/pages/payment/failed.vue` - Failed page
- `app/pages/payment/cancelled.vue` - Cancelled page
- `server/api/payment/initiate.post.ts` - Payment initiation API

## Testing

### Sandbox Credentials
SSLCommerz provides test credentials:
- Store ID: Available in your SSLCommerz sandbox account
- Store Password: Available in your SSLCommerz sandbox account

### Test Cards
SSLCommerz provides test card numbers for different scenarios.

## Production Checklist

- [ ] Set `SSLCOMMERZ_TESTMODE=false` in .env
- [ ] Update Store ID and Password with production credentials
- [ ] Configure proper callback URLs
- [ ] Enable SSL certificate on your domain
- [ ] Test all payment scenarios
- [ ] Set up proper error logging
- [ ] Configure IPN endpoint
- [ ] Test payment notifications

## Security Considerations

1. Always validate payment on server-side
2. Use HTTPS for all callbacks
3. Store sensitive data encrypted
4. Implement proper error handling
5. Log all payment transactions
6. Validate transaction amounts
7. Implement proper authentication
8. Use environment variables for credentials

## Support

- SSLCommerz Documentation: https://developer.sslcommerz.com/
- Package Documentation: https://github.com/shipu/sslcommerz
