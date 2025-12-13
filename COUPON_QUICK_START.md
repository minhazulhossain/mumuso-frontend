# Coupon System - Quick Start Guide

## What Was Implemented

A complete coupon/discount code system for the e-commerce frontend that allows customers to apply discount codes during checkout and see savings in real-time.

## Quick Integration

### 1. Cart Page - Already Done ✅
The coupon input is already integrated in the order summary sidebar at `/cart`. Customers can:
- Enter discount code
- See discount applied to total
- Remove coupon if needed

### 2. Checkout Page - Already Done ✅
The coupon input is available in the order summary component at `/checkout`. Coupon discount is automatically included when creating the order.

### 3. Add to Other Pages (Optional)

To add coupon input anywhere else:

```vue
<template>
  <CouponInput @coupon="appliedCoupon = $event" />

  <div v-if="appliedCoupon.discount > 0">
    Discount: ${{ appliedCoupon.discount.toFixed(2) }}
  </div>
</template>

<script setup>
const appliedCoupon = ref({ code: '', discount: 0 })
</script>
```

## How It Works

### User Flow
```
Customer enters coupon code
         ↓
Frontend validates via API
         ↓
Backend returns discount amount
         ↓
Discount displays on order
         ↓
Customer proceeds to checkout
         ↓
Order includes discount_amount
         ↓
Backend calculates final total with discount
```

### Technical Flow
```
CouponInput component
    ↓
useCoupon composable (validation + state)
    ↓
Server API routes (/api/coupons/*)
    ↓
Backend Laravel API (/api/v1/coupons/*)
    ↓
Backend returns discount details
```

## Key Files

| File | Purpose |
|------|---------|
| `app/composables/useCoupon.ts` | Coupon logic & API calls |
| `app/components/CouponInput.vue` | Input UI component |
| `shared/types/coupon.ts` | TypeScript types |
| `server/api/coupons/*.ts` | API route handlers |
| `app/pages/cart.vue` | Cart integration |
| `app/pages/checkout.vue` | Checkout integration |

## Available Coupon Codes (Example)

Before testing, create some test coupons in the admin panel:

```
WELCOME20    - 20% off first order (min $50)
SAVE10       - $10 off orders over $100
SPRING50     - $50 maximum discount, 50% off
BOGO         - Buy one get one 50% off (specific products)
```

The backend determines which codes are valid and what discounts they provide.

## Testing Coupons

### Test 1: Basic Coupon Application
```
1. Go to /cart
2. In "Discount Code" section, enter: WELCOME20
3. Click "Apply"
4. Verify: Discount shows, total updates
5. Check the green badge shows "20% off"
```

### Test 2: Minimum Spend Requirement
```
1. Create order under minimum spend
2. Apply coupon requiring minimum
3. Should see error: "Minimum spend of $X required"
4. Add more items
5. Coupon should apply successfully
```

### Test 3: Invalid Coupon
```
1. Enter: INVALID123
2. Click "Apply"
3. Should see error: "Coupon code not found"
4. Try valid code again
```

### Test 4: Checkout with Coupon
```
1. Apply coupon in /cart
2. Click "Proceed to Checkout"
3. Coupon should show in order summary
4. Complete checkout
5. Verify order in admin has discount_amount
```

## Common Issues & Fixes

### "Coupon code not found"
**Cause:** Code doesn't exist or is inactive
**Fix:** Check code spelling, verify coupon exists in admin

### "Coupon has expired"
**Cause:** Coupon date range is outside current time
**Fix:** Check coupon start/end dates in admin

### "Minimum spend of $X required"
**Cause:** Cart total is below minimum
**Fix:** Add more items to cart

### "Already used maximum times"
**Cause:** User or system exceeded usage limit
**Fix:** Check usage limits in coupon settings

### Discount not showing in order
**Cause:** Order not including discount_amount
**Fix:** Check checkout page includes coupon data

## Code Examples

### Get Coupon Details
```typescript
const { checkCoupon } = useCoupon()
const coupon = await checkCoupon('SAVE20')
console.log(coupon.description)  // "20% off your order"
console.log(coupon.discount_type) // "percentage"
console.log(coupon.discount_value) // 20
```

### Validate with Amount
```typescript
const { validateCoupon } = useCoupon()
const result = await validateCoupon('SAVE20', 100.00)

if (result.valid) {
  console.log(`Save: $${result.discount}`)
} else {
  console.log(`Error: ${result.message}`)
}
```

### List Available Coupons
```typescript
const { fetchAvailableCoupons } = useCoupon()
const coupons = await fetchAvailableCoupons()

coupons.forEach(c => {
  console.log(`${c.code}: ${c.description}`)
})
```

### Remove Coupon
```typescript
const { removeCoupon } = useCoupon()
removeCoupon()
appliedCoupon.value = { code: '', discount: 0 }
```

## API Endpoints

All endpoints are proxied through the frontend server for security.

### Get Available Coupons
```
GET /api/coupons
Response: { coupons: [{ id, code, description, ... }] }
```

### Validate Coupon Code
```
POST /api/coupons/validate
Body: { code: "SAVE20", amount: 100.00 }
Response: { valid: true/false, discount: 20, message: "..." }
```

### Check Coupon Details
```
POST /api/coupons/check
Body: { code: "SAVE20" }
Response: { id, code, description, discount_type, discount_value, ... }
```

## Backend Integration Points

**Order Creation** - Include coupon discount:
```typescript
const order = {
  // ... other fields
  discount_amount: appliedCoupon.value.discount,
  items: [...]
}
await createOrder(order)
```

**Order Confirmation** - Show discount details:
```typescript
const order = await fetchOrder(orderId)
console.log(`Total Discount: $${order.discount_amount}`)
```

## Tips & Best Practices

1. **Always validate server-side** - Frontend validation is UX only, backend validates all rules
2. **Show discount in real-time** - Users appreciate seeing savings immediately
3. **Clear error messages** - Tell users exactly why coupon didn't apply
4. **Persist coupon through checkout** - Don't lose coupon when moving between pages
5. **Include discount in confirmation email** - Help customer see the value they received
6. **Test with different amounts** - Coupons may have minimums or maximums
7. **Monitor coupon usage** - Backend tracks all coupon applications

## Customization

### Change Coupon Input Styling
Edit `app/components/CouponInput.vue`:
```vue
<!-- Modify the form styling -->
<UInput
  v-model="inputCode"
  placeholder="Enter your discount code here"  <!-- Change placeholder -->
  <!-- Add custom styling -->
/>
```

### Add More Discount Columns to Cart
Edit `app/pages/cart.vue` to add seasonal promotions, loyalty discounts, etc.

### Custom Validation Messages
In `app/composables/useCoupon.ts`, customize toast messages:
```typescript
toast.add({
  title: 'Custom Title',
  description: 'Custom message',
  color: 'info'  // Change color
})
```

## Performance

- **Validation:** Debounced API call on each validation
- **Caching:** Available coupons could be cached (currently not cached)
- **Real-time:** Discount updates immediately on successful validation
- **Error recovery:** Clear error on retry without manual reset

## Security

✅ Validation happens server-side - frontend can't manipulate discounts
✅ All API calls are proxied through frontend server
✅ Coupon codes are case-insensitive but stored securely
✅ User can't see other users' coupon usage
✅ Backend enforces all discount rules and limits

## Next Steps

1. **Test with sample coupons** - Create 3-4 test coupons in admin
2. **Verify order includes discount** - Check database after creating orders
3. **Test all validation rules** - Minimum spend, expiration, usage limits
4. **Check confirmation emails** - Include discount details in email
5. **Monitor performance** - Track coupon application rates
6. **Collect feedback** - Ask users if coupon system is working well

## Support

See detailed documentation:
- `COUPON_IMPLEMENTATION.md` - Full technical guide
- `COUPON_FILES_CREATED.md` - File structure & changes
- Backend docs in `mumuso-admin/COUPON_SYSTEM.md`

---

**Ready to use!** The coupon system is fully integrated and ready to accept coupons. Just create coupons in the admin panel and customers can use them immediately.
