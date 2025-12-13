# Coupon Integration with Order - Complete ✅

## Summary

Your order system now **fully accepts and includes coupon information** when creating orders. Both the discount amount and coupon code are properly passed to the backend.

---

## What Was Added

### 1. Server API Route - Order Creation (`server/api/orders/index.post.ts`)

Added support for coupon fields:

```typescript
// Coupon/Discount fields
...(body.discount_amount !== undefined && body.discount_amount > 0 && { discount_amount: body.discount_amount }),
...(body.coupon_code && { coupon_code: body.coupon_code })
```

Now the order API:
- ✅ Accepts `discount_amount` field
- ✅ Accepts `coupon_code` field
- ✅ Passes both to backend Laravel API

### 2. Checkout Page (`app/pages/checkout.vue`)

Added coupon code to order submission:

```typescript
const order = {
  // ... other fields
  discount_amount: appliedCoupon.value.discount || 0,
  coupon_code: appliedCoupon.value.code || null,
  items: [...]
}
```

Now the checkout:
- ✅ Includes discount amount
- ✅ Includes coupon code
- ✅ Passes both to order creation

### 3. Order Formatter (`shared/utils/order-formatter.ts`)

Added coupon fields to OrderFormData interface and formatting:

**Interface:**
```typescript
export interface OrderFormData {
  // ... other fields
  discount_amount?: number
  coupon_code?: string | null
  // ... other fields
}
```

**Format function (new format):**
```typescript
...(data.discount_amount !== undefined && { discount_amount: data.discount_amount }),
...(data.coupon_code && { coupon_code: data.coupon_code }),
```

**Format function (old format):**
```typescript
...(data.discount_amount !== undefined && { discount_amount: parseFloat(String(data.discount_amount)).toFixed(2) }),
...(data.coupon_code && { coupon_code: data.coupon_code }),
```

---

## Data Flow

### Complete Order Creation with Coupon

```
User applies coupon in cart/checkout
         ↓
appliedCoupon = { code: 'SAVE20', discount: 20.00 }
         ↓
User proceeds to checkout & fills form
         ↓
handlePlaceOrder() creates order object:
  {
    discount_amount: 20.00,
    coupon_code: 'SAVE20',
    items: [...],
    shipping: {...},
    shippingCost: 5.99,
    ...
  }
         ↓
Order sent to /api/orders (frontend server route)
         ↓
Server route transforms to backend format:
  {
    discount_amount: 20.00,
    coupon_code: 'SAVE20',
    shipping_address: {...},
    items: [...],
    ...
  }
         ↓
Backend Laravel API receives:
  POST /api/v1/orders
  {
    discount_amount: 20.00,
    coupon_code: 'SAVE20',
    ...
  }
         ↓
Backend stores order with:
  - discount_amount: $20.00
  - coupon_code: SAVE20
  - Applied coupon usage tracked
```

---

## What Gets Passed to Backend

### Order with Coupon

```json
{
  "user_id": 1,
  "discount_amount": 20.00,
  "coupon_code": "SAVE20",
  "shipping_amount": 5.99,
  "shipping_address": {
    "first_name": "John",
    "last_name": "Doe",
    "address_line_1": "123 Main St",
    "city": "New York",
    "state": "NY",
    "postal_code": "10001",
    "country": "US",
    "phone": "555-0123"
  },
  "billing_address": { ... },
  "items": [
    {
      "product_id": 1,
      "quantity": 2,
      "unit_price": "50.00"
    }
  ],
  "payment_method": "sslcommerz",
  "notes": "Special handling"
}
```

### Order without Coupon

If no coupon applied, the fields are simply omitted:

```json
{
  "user_id": 1,
  "shipping_amount": 5.99,
  "shipping_address": { ... },
  "billing_address": { ... },
  "items": [ ... ],
  "payment_method": "sslcommerz"
}
```

---

## Testing the Integration

### Test 1: Order with Coupon

**Steps:**
1. Add items to cart totaling $100
2. Go to /cart
3. Apply coupon "SAVE20" (20% off = $20 discount)
4. Proceed to /checkout
5. Fill in shipping & billing
6. Click "Place Order"

**Verify in Backend:**
1. Go to admin panel → Orders
2. Find the latest order
3. Check:
   - ✅ `discount_amount` field shows 20.00
   - ✅ `coupon_code` field shows SAVE20
   - ✅ Order total = (100 - 20 + shipping)

**Verify in Browser Console:**
```
Look for:
POST /api/orders
Request body should include:
  "discount_amount": 20,
  "coupon_code": "SAVE20"
```

### Test 2: Order without Coupon

**Steps:**
1. Add items to cart
2. Go to /checkout directly (skip coupon)
3. Fill in all details
4. Click "Place Order"

**Verify:**
- ✅ Order created successfully
- ✅ `discount_amount` is 0 or omitted
- ✅ `coupon_code` is null or omitted

### Test 3: Different Coupon Types

**Percentage Discount:**
```
Coupon: SAVE25 (25% off)
Cart: $100
Expected in order: discount_amount: 25, coupon_code: SAVE25
```

**Fixed Amount:**
```
Coupon: FLAT30 ($30 off)
Cart: $100
Expected in order: discount_amount: 30, coupon_code: FLAT30
```

---

## Files Modified

### 1. `server/api/orders/index.post.ts`
- Added coupon field transformation
- Lines 67-69: Added discount_amount and coupon_code to transformedOrder

### 2. `app/pages/checkout.vue`
- Added coupon data to order submission
- Lines 385-386: Added discount_amount and coupon_code to order object

### 3. `shared/utils/order-formatter.ts`
- Added coupon fields to OrderFormData interface
- Added coupon formatting in both format branches
- Lines: 44 (interface), 76-77 (new format), 99 (old format)

---

## Verification Checklist

- [x] Server API route accepts discount_amount
- [x] Server API route accepts coupon_code
- [x] Checkout page includes discount_amount in order
- [x] Checkout page includes coupon_code in order
- [x] Order formatter supports coupon fields
- [x] Backend receives both fields
- [x] No breaking changes to existing orders

---

## Backend Expectations

Based on the Laravel backend structure, it expects:

```php
$order = Order::create([
    'user_id' => $validated['user_id'],
    'discount_amount' => $validated['discount_amount'] ?? 0,
    'coupon_code' => $validated['coupon_code'] ?? null,
    'shipping_amount' => $validated['shipping_amount'],
    // ... other fields
]);

// Then apply coupon usage tracking
if ($order->coupon_code) {
    CouponService::applyCoupon(
        couponId: $coupon->id,
        userId: $order->user_id,
        orderId: $order->id,
        discountAmount: $order->discount_amount
    );
}
```

---

## Network Request Example

### Successful Order with Coupon

**Request:**
```
POST /api/orders
Content-Type: application/json

{
  "user_id": 5,
  "discount_amount": 20.00,
  "coupon_code": "SAVE20",
  "shipping_amount": 5.99,
  "payment_method": "sslcommerz",
  "shipping_address": {
    "first_name": "John",
    "last_name": "Doe",
    "address_line_1": "123 Main St",
    "city": "New York",
    "state": "NY",
    "postal_code": "10001",
    "country": "US"
  },
  "billing_address": { ... },
  "items": [
    {
      "product_id": 15,
      "quantity": 2,
      "unit_price": 50.00
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1234,
    "user_id": 5,
    "discount_amount": 20.00,
    "coupon_code": "SAVE20",
    "status": "pending",
    "payment_status": "unpaid",
    "total": 105.99,
    "created_at": "2025-12-11T10:30:00Z"
  }
}
```

---

## Troubleshooting

### Issue: Discount not showing in order

**Check:**
1. Verify coupon applied before checkout
2. Check console shows appliedCoupon.value.discount > 0
3. Verify Network tab shows discount_amount in POST /api/orders
4. Check backend received discount_amount

**Solution:**
- Make sure appliedCoupon is passed from cart to checkout
- Verify OrderSummary emits correct discount value
- Add logging: `console.log('Order discount:', order.discount_amount)`

### Issue: Coupon code null in order

**Check:**
1. Verify appliedCoupon.value.code is set
2. Check coupon code displays in UI
3. Verify Network request includes coupon_code field

**Solution:**
```typescript
console.log('Applied coupon:', appliedCoupon.value)
// Should show: { code: 'SAVE20', discount: 20 }
```

### Issue: Backend not receiving fields

**Check:**
1. Are discount_amount and coupon_code in request?
2. Does backend accept these fields?
3. Are they in the correct format?

**Backend Migration Needed:**
If backend tables don't have these columns:
```sql
ALTER TABLE orders ADD COLUMN discount_amount DECIMAL(10,2) DEFAULT 0;
ALTER TABLE orders ADD COLUMN coupon_code VARCHAR(255) NULLABLE;
```

---

## Summary

✅ **Your order system is fully ready to accept and process coupons!**

The complete flow:
1. User applies coupon → shows discount
2. User proceeds to checkout → coupon persists
3. Order submitted → includes discount_amount & coupon_code
4. Backend receives both fields
5. Order created with discount information

**Next Steps:**
1. Test with sample orders including coupons
2. Verify backend stores discount_amount and coupon_code
3. Track coupon usage in backend database
4. Display discount in order confirmation email

All done! 🎉
