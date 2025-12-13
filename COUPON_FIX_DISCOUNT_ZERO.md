# Coupon Discount Zero Issue - Fixed ✅

## Problem

When applying a coupon code, the discount was showing as $0 even though the coupon should have a discount value.

## Root Cause

The `CouponInput` component was validating the coupon with `amount: 0` when calling `validateCoupon()`. The backend API's `validateCoupon()` method calculates the discount based on the order amount:

```php
// In CouponService.php
public function validateCoupon(string $code, ?int $userId = null, float $amount = 0): array
{
    $discount = $coupon->calculateDiscount($amount);  // ← Calculated based on $amount!

    return [
        'valid' => true,
        'coupon' => $coupon,
        'discount' => $discount,  // ← Returns 0 if amount was 0
        'message' => "Coupon applied successfully"
    ];
}
```

Since the component was passing `amount: 0`, the backend was calculating a discount on $0, which equals $0.

## Solution

### 1. Added `amount` Prop to CouponInput Component
**File:** `app/components/CouponInput.vue`

```typescript
const props = withDefaults(defineProps<{
  amount?: number
}>(), {
  amount: 0
})
```

The component now accepts an optional `amount` prop representing the cart/order total.

### 2. Pass Amount to validateCoupon()
**File:** `app/components/CouponInput.vue`

```typescript
const applyCoupon = async () => {
  if (!inputCode.value.trim()) return

  // Pass the cart amount to validation
  const amount = props.amount || 0
  console.log('Validating coupon with amount:', amount)

  const result = await validateCoupon(inputCode.value, amount)
  // ...
}
```

### 3. Pass Cart Subtotal from Cart Page
**File:** `app/pages/cart.vue`

```vue
<CouponInput
  :amount="subtotal"
  @coupon="appliedCoupon = $event"
/>
```

The cart page now passes the current subtotal to the coupon input.

### 4. Pass Subtotal from Checkout
**File:** `app/components/Checkout/OrderSummary.vue`

```vue
<CouponInput
  :amount="subtotal"
  @coupon="appliedCoupon = $event"
/>
```

The checkout order summary also passes the subtotal.

### 5. Enhanced Logging for Debugging
**File:** `app/composables/useCoupon.ts`

Added console logs to help debug:
```typescript
console.log('Coupon validation response:', response)
console.log('Applied coupon with discount:', discount)
```

And in the component:
```typescript
console.log('Validating coupon with amount:', amount)
```

## How It Works Now

### Before Fix
```
User enters "SAVE20" coupon
    ↓
CouponInput validates with amount=0
    ↓
Backend calculates: 0 * 20% = $0
    ↓
Shows "You saved $0"
```

### After Fix
```
User enters "SAVE20" coupon
    ↓
CouponInput receives :amount="150.00" (cart subtotal)
    ↓
CouponInput validates with amount=150
    ↓
Backend calculates: 150 * 20% = $30
    ↓
Shows "You saved $30"
```

## Discount Calculation Examples

With the fix, discounts now calculate correctly:

### Percentage Discount
```
Coupon: SAVE20 (20% off)
Cart Total: $100
Discount: $100 × 20% = $20 ✓
```

### Fixed Amount Discount
```
Coupon: FLAT10 ($10 off)
Cart Total: $100
Discount: $10 ✓
```

### With Minimum Spend
```
Coupon: MIN50 (20% off, min $50)
Cart Total: $30
Result: "Minimum spend of $50 required" ✓
```

### With Maximum Discount Cap
```
Coupon: MAXCAP (50% off, max discount $40)
Cart Total: $100
Calculated: $100 × 50% = $50
Capped: min($50, $40) = $40 ✓
```

## Testing the Fix

### Test Case 1: Percentage Discount
1. Create test coupon: **SAVE20** (20% off)
2. Add items to cart totaling $100
3. Enter coupon code "SAVE20"
4. Expected: Discount shows $20 ✓
5. Expected message: "You saved $20.00"

### Test Case 2: Fixed Amount Discount
1. Create test coupon: **FLAT15** ($15 off)
2. Add items to cart totaling $100
3. Enter coupon code "FLAT15"
4. Expected: Discount shows $15 ✓
5. Expected message: "You saved $15.00"

### Test Case 3: Minimum Spend Requirement
1. Create test coupon: **MIN50** (20% off, min $50)
2. Add items to cart totaling $30
3. Enter coupon code "MIN50"
4. Expected: Error "Minimum spend of $50 required" ✓
5. Add more items (total now $60)
6. Apply coupon again
7. Expected: Discount shows $12.00 (60 × 20%) ✓

### Test Case 4: Maximum Discount Cap
1. Create test coupon: **MAXOFF** (50% off, max $30)
2. Add items to cart totaling $100
3. Enter coupon code "MAXOFF"
4. Expected: Discount shows $30.00 (capped) ✓
5. Not $50 (which would be 100 × 50%)

## Files Modified

1. **`app/components/CouponInput.vue`**
   - Added `amount` prop
   - Updated `applyCoupon()` to use prop amount
   - Added console logging

2. **`app/pages/cart.vue`**
   - Updated `<CouponInput>` to pass `:amount="subtotal"`

3. **`app/components/Checkout/OrderSummary.vue`**
   - Updated `<CouponInput>` to pass `:amount="subtotal"`

4. **`app/composables/useCoupon.ts`**
   - Added console logging for debugging
   - Enhanced error handling

## Debugging Tips

If discounts still show $0:

1. **Check console logs** - Open browser DevTools (F12)
   - Look for: "Validating coupon with amount: X"
   - Look for: "Coupon validation response: {...}"
   - Look for: "Applied coupon with discount: X"

2. **Verify subtotal is passed**
   - In CouponInput component, check if `props.amount` has a value
   - Add `{{ amount }}` to template temporarily to see value

3. **Check backend response**
   - Network tab → Find `/api/coupons/validate` request
   - Check response body for `discount` field
   - Should be a number > 0 if amount was > 0

4. **Test with fixed amount coupon**
   - Fixed amount coupons don't depend on order amount
   - If these still show $0, issue is elsewhere

## Backend Notes

The backend's `calculateDiscount()` method in `Coupon` model:

```php
public function calculateDiscount(float $amount): float
{
    if (!$this->isValid()) {
        return 0;
    }

    // Check minimum spend
    if ($this->min_spend && $amount < $this->min_spend) {
        return 0;
    }

    // Calculate discount based on type
    $discount = $this->discount_type === 'percentage'
        ? ($amount * $this->discount_value) / 100
        : $this->discount_value;

    // Apply max discount limit if set
    if ($this->max_discount_amount) {
        $discount = min($discount, $this->max_discount_amount);
    }

    return $discount;
}
```

The amount parameter is **critical** for percentage-based discounts!

## Summary

The issue was that the coupon validation amount was hardcoded to 0. Now:

✅ Cart subtotal is passed to CouponInput
✅ CouponInput passes amount to backend validation
✅ Backend correctly calculates discount based on amount
✅ User sees correct discount amount
✅ Discount displays in order summary
✅ Order includes correct discount on submission

The system now works as designed! 🎉
