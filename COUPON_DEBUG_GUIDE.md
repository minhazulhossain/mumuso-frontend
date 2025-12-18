# Coupon Code Debugging Guide

## Issue
Coupon codes are not being saved to the database when creating orders, even though the coupon discount appears to be applied.

## Solution: Comprehensive Debugging

I've added detailed logging throughout the entire coupon flow to help identify where the data is being lost. Follow these steps to diagnose the issue:

### Step 1: Enable Console Logging (Browser)

1. Open your browser's Developer Tools (F12 or Right-Click → Inspect)
2. Go to the **Console** tab
3. Clear any previous logs

### Step 2: Test Coupon Application & Order Creation

1. Go to the **Checkout** page
2. Add items to cart if not already there
3. Complete shipping information
4. **In the Order Summary (right side)**, enter coupon code: `SUMMER20`
5. Click **Apply** button
6. Watch the browser console for logs (marked with brackets like `[CouponInput]`, `[Checkout]`, etc.)

### Step 3: Check Console Logs

#### Expected Log Sequence:

##### 1. **Coupon Validation** (When clicking Apply)
```javascript
[CouponInput] Validating coupon: {
  code: "SUMMER20",
  amount: <total_price>,
  timestamp: "2025-12-18T..."
}

[CouponInput] Validation result: {
  valid: true,
  message: "Coupon applied successfully",
  couponState: {
    code: "SUMMER20",
    discount: <discount_amount>,
    ...
  },
  timestamp: "2025-12-18T..."
}

[CouponInput] Emitting coupon event: {
  code: "SUMMER20",
  discount: <discount_amount>
}
```

If you see `valid: false`, the coupon validation is failing. Check the `message` field for the reason:
- "Coupon has expired or is inactive"
- "Minimum spend of X required"
- "You have already used this coupon"

##### 2. **Checkout Receives Event** (When coupon is applied)
```javascript
[Checkout] handleCouponApplied received event: {
  couponData: {
    code: "SUMMER20",
    discount: <discount_amount>
  },
  timestamp: "2025-12-18T..."
}

[Checkout] appliedCoupon updated: {
  appliedCoupon: {
    code: "SUMMER20",
    discount: <discount_amount>
  },
  timestamp: "2025-12-18T..."
}
```

If these logs don't appear, the event is NOT being emitted or received. This is the likely issue.

##### 3. **Order Placement** (When clicking Place Order)
```javascript
[Checkout] Final coupon state before order creation: {
  appliedCoupon: {
    code: "SUMMER20",
    discount: <discount_amount>
  },
  timestamp: "2025-12-18T..."
}

[Checkout] Final order object to send: {
  user_id: <id_or_undefined>,
  user: {...},
  coupon_code: "SUMMER20",
  discount_amount: <discount_amount>,
  items_count: 1,
  shipping_cost: 0,
  timestamp: "2025-12-18T..."
}
```

**Critical Check**: If `coupon_code` is `null` or empty here, the issue is that `appliedCoupon.value.code` is not set (coupon event never fired).

##### 4. **API Call** (Sending to backend)
```javascript
[useOrders] Formatted data before API call: {
  coupon_code: "SUMMER20",
  discount_amount: <discount_amount>,
  user_id: <id_or_undefined>,
  user: {...},
  timestamp: "2025-12-18T..."
}

[useOrders] API response: {
  success: true,
  order_id: <order_number>,
  order_coupon_code: "SUMMER20",
  timestamp: "2025-12-18T..."
}
```

If API response shows `order_coupon_code: null`, the backend received it but didn't save it.

### Step 4: Check Backend Logs

1. Open your Laravel application logs: `storage/logs/laravel.log` (or the latest log file)
2. Search for logs from when you created the order

#### Expected Backend Logs:

```
[Order 1] OrderService::createOrder started {
  "user_id": <id_or_null>,
  "coupon_code_received": "SUMMER20",
  "discount_amount": <amount>,
  "all_data_keys": [...]
}

[Order 2] Creating order with data {
  "coupon_code": "SUMMER20",
  "discount_amount": <amount>,
  "subtotal": 100,
  "total_amount": 80
}

[Order 3] Order created successfully {
  "order_id": <numeric_id>,
  "order_number": "ORD-...",
  "coupon_code_saved": "SUMMER20",
  "discount_amount_saved": <amount>
}
```

## Diagnostic Decision Tree

```
Does Console show [CouponInput] Validating?
│
├─ NO → User didn't click Apply button or CouponInput component isn't rendering
│
└─ YES → Does Console show valid: true?
  │
  ├─ NO → Coupon validation failed:
  │   ├─ Check coupon status in admin panel (active/expired)
  │   ├─ Check min_spend requirement
  │   └─ Check usage limits
  │
  └─ YES → Does Console show [Checkout] appliedCoupon updated?
    │
    ├─ NO → Event not being emitted or received
    │   └─ Check that @coupon handler is properly bound to CouponInput
    │
    └─ YES → Does final order object show coupon_code: "SUMMER20"?
      │
      ├─ NO → Code is being set but lost in order-formatter
      │   └─ Check order-formatter logic (line 77)
      │
      └─ YES → Does [useOrders] Formatted data show coupon_code?
        │
        ├─ NO → formatOrderData not including coupon_code
        │
        └─ YES → Does backend log show coupon_code_received?
          │
          ├─ NO → API didn't receive it (network/serialization issue)
          │
          └─ YES → Does backend log show coupon_code_saved?
            │
            ├─ NO → Order::create() not including coupon_code
            │
            └─ YES → Issue is resolved! Coupon should be in database
```

## What to Check

### If coupon validation fails:
1. Admin Panel → Coupons → Check SUMMER20 coupon:
   - `is_active` = true
   - `valid_from` <= today
   - `valid_until` >= today (or null)
   - `min_spend` <= current cart total

### If event doesn't fire:
1. Check that CouponInput is rendering in checkout page
2. Verify `@coupon="handleCouponApplied"` is correct on line 88-90 of checkout.vue
3. Check for JavaScript errors in console

### If coupon_code is null in database:
1. Check backend logs to see if coupon_code was received
2. Verify Order model has 'coupon_code' in $fillable array
3. Check if there's a fillGuard or validation issue

## Files Modified

**Frontend (Debugging Added):**
- `app/components/CouponInput.vue` - Added detailed validation and event logs
- `app/pages/checkout.vue` - Added coupon state and order object logs
- `app/composables/useOrders.ts` - Added formatted data and API response logs

**Backend (Debugging Added):**
- `app/Services/OrderService.php` - Added coupon data received and saved logs

## Next Steps After Debugging

1. **Document the Issue**: Share the console and backend logs showing where the data is lost
2. **Fix the Root Cause**: Based on the logs, we can identify exactly where to fix the issue
3. **Test Again**: Re-test with the debugging in place to verify the fix works
4. **Remove Debugging**: Once verified, clean up the console.log statements

## Important Notes

- The SUMMER20 coupon must exist and be active
- Make sure you're testing on a product with sufficient price for min_spend
- Guest orders should also work (no user_id required)
- Clear browser cache if changes don't appear
