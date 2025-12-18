# Coupon Code Debugging - Server-Side Analysis

## Complete Data Flow

```
Frontend (checkout.vue)
    ↓ sends order with coupon_code
Nuxt Server API (server/api/orders/index.post.ts)
    ↓ transforms data
Laravel Backend API
    ↓ creates order
Database
```

## What We Added: Comprehensive Logging

### Frontend Logging (Browser Console)

When you create an order with coupon, look for these prefixed logs:
- `[CouponInput]` - Coupon validation and event emission
- `[Checkout]` - Coupon state management
- `[useOrders]` - Order API calls

### Nuxt Server Logging

The Nuxt server route (`server/api/orders/index.post.ts`) now logs:

#### 1. **Request Reception** (Line 33-43)
```
[Server API] Order request body received: {
  has_coupon_code: true,
  coupon_code_value: "SUMMER20",
  coupon_code_type: "string",
  discount_amount: 20,
  user_id: 1,
  has_user: false,
  timestamp: "2025-12-18T..."
}
```

**What to check:**
- `has_coupon_code: true` or `false` - Is coupon_code in the request?
- `coupon_code_value` - What value is it?
- `coupon_code_type` - Should be "string"

If `coupon_code_value` is `null` or `undefined`, the frontend didn't send it.

#### 2. **Data Transformation** (Line 80-86)
```
[Server API] Transformed order: {
  has_coupon_code: true,
  coupon_code: "SUMMER20",
  discount_amount: 20,
  items_count: 1,
  timestamp: "2025-12-18T..."
}
```

**What to check:**
- `has_coupon_code: true` - Did the transformation include coupon_code?
- `coupon_code: "SUMMER20"` - Does it have the right value?

If `has_coupon_code: false`, the coupon_code was lost during transformation. This would be a bug in the server route (line 77).

#### 3. **Backend API Call** (Line 91-97)
```
[Server API] Sending to backend API: {
  api_url: "http://127.0.0.1:8000/api/v1/orders",
  has_token: true,
  coupon_code_sending: "SUMMER20",
  discount_amount_sending: 20,
  timestamp: "2025-12-18T..."
}
```

**What to check:**
- `api_url` - Is it pointing to the correct backend?
- `coupon_code_sending` - Is coupon_code being sent?
- `has_token` - Is authentication header included?

If `coupon_code_sending` is `null` or `undefined`, the backend won't receive it.

#### 4. **Backend Response** (Line 107-112)
```
[Server API] Backend response received: {
  success: true,
  order_id: "ORD-XXXXX",
  order_coupon_code: "SUMMER20",
  timestamp: "2025-12-18T..."
}
```

**What to check:**
- `success: true` - Did order creation succeed?
- `order_coupon_code: "SUMMER20"` - Does the backend response include coupon_code?

If `order_coupon_code` is `null`, the backend saved it as null.

#### 5. **Error Handling** (Line 119-126)
If order creation fails, you'll see:
```
[Server API] ===== ORDER CREATION ERROR =====
[Server API] Error message: "..."
[Server API] Error status: 422
[Server API] Error data: {...}
[Server API] Validation errors from backend: {...}
[Server API] ===== END ERROR =====
```

## Where to Check Logs

### Browser Console (Frontend)
1. Open DevTools: F12
2. Go to Console tab
3. Filter by `[Checkout]` or `[CouponInput]` or `[useOrders]`
4. Check order of events and values

### Nuxt Server Logs (Server-Side)
The logs appear in your **terminal** where you're running `npm run dev`.

If you're running in production, check:
- `storage/logs/nuxt.log` (if configured)
- Your application's stdout/stderr

### Laravel Backend Logs (Backend)
Located in: `F:\Minhaz\mumuso-admin\storage\logs\laravel.log`

Look for logs with:
- `OrderService::createOrder started`
- `Creating order with data`
- `Order created successfully`

## Diagnostic Flowchart

```
Frontend sends order?
│
├─ Check: [useOrders] Formatted data before API call
│  └─ coupon_code field present?
│
Server receives request?
│
├─ Check: [Server API] Order request body received
│  └─ has_coupon_code: true?
│
Server transforms data?
│
├─ Check: [Server API] Transformed order
│  └─ has_coupon_code: true?
│
Server sends to backend?
│
├─ Check: [Server API] Sending to backend API
│  └─ coupon_code_sending present?
│
Backend creates order?
│
├─ Check: [Server API] Backend response received
│  └─ order_coupon_code present?
│
├─ Check: Laravel logs - coupon_code_saved
│  └─ Did OrderService save it?
│
Database has it?
│
└─ Check orders table, coupon_code column
```

## Quick Debugging Checklist

When you test with coupon SUMMER20:

- [ ] Browser console shows `[CouponInput] Validating coupon: { code: "SUMMER20", ... }`
- [ ] Browser console shows `[CouponInput] Validation result: { valid: true, ... }`
- [ ] Browser console shows `[Checkout] appliedCoupon updated: { code: "SUMMER20", ... }`
- [ ] Browser console shows `[Checkout] Final order object to send: { coupon_code: "SUMMER20", ... }`
- [ ] Browser console shows `[useOrders] Formatted data: { coupon_code: "SUMMER20", ... }`
- [ ] Server terminal shows `[Server API] Order request body received: { coupon_code_value: "SUMMER20", ... }`
- [ ] Server terminal shows `[Server API] Transformed order: { has_coupon_code: true, coupon_code: "SUMMER20", ... }`
- [ ] Server terminal shows `[Server API] Sending to backend API: { coupon_code_sending: "SUMMER20", ... }`
- [ ] Server terminal shows `[Server API] Backend response: { order_coupon_code: "SUMMER20", ... }`
- [ ] Laravel logs show `coupon_code_received: "SUMMER20"`
- [ ] Laravel logs show `coupon_code_saved: "SUMMER20"`
- [ ] Database shows order with coupon_code = "SUMMER20"

## Common Issues and Fixes

### Issue 1: Frontend shows coupon applied, but server shows coupon_code: null

**Root Cause:** CouponInput event not firing
**Fix:**
- Check that `@coupon="handleCouponApplied"` is correct in checkout.vue line 90
- Ensure appliedCoupon ref is being updated
- Check browser console for [Checkout] events

### Issue 2: Server receives coupon_code, but backend shows null

**Root Cause:** Data lost in server transformation
**Fix:**
- Check server route line 77: `...(body.coupon_code && { coupon_code: body.coupon_code })`
- If body.coupon_code is null/empty, it won't be sent to backend

### Issue 3: Backend receives coupon_code, but database is null

**Root Cause:** OrderService not saving it correctly
**Fix:**
- Check OrderService line 71: `'coupon_code' => $data['coupon_code'] ?? null,`
- Check Order model has 'coupon_code' in $fillable

## Files Modified

- `F:\Minhaz\mumuso-frontend\app\components\CouponInput.vue` - Enhanced logging
- `F:\Minhaz\mumuso-frontend\app\pages\checkout.vue` - Enhanced logging
- `F:\Minhaz\mumuso-frontend\app\composables\useOrders.ts` - Enhanced logging
- `F:\Minhaz\mumuso-frontend\server\api\orders\index.post.ts` - **Added comprehensive server logging**
- `F:\Minhaz\mumuso-admin\app\Services\OrderService.php` - Enhanced logging

## Next Steps

1. **Test**: Create an order with SUMMER20 coupon
2. **Collect Logs**: Screenshot all console and server logs
3. **Follow Flowchart**: Use diagnostic flowchart to identify where data is lost
4. **Report Findings**: Share logs with full context
5. **Fix Issue**: Based on where data is lost, we'll apply the specific fix
