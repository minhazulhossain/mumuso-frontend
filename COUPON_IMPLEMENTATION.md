# Coupon System Implementation - Frontend Guide

## Overview

A complete coupon system has been implemented in the frontend to allow customers to apply discount codes during checkout and in the shopping cart. The system integrates with the backend Laravel API for validation and discount calculation.

## Architecture

### Components

#### 1. **CouponInput Component** (`app/components/CouponInput.vue`)
A reusable component for applying and managing coupon codes.

**Features:**
- Input field for coupon code entry
- Apply button with loading state
- Display applied coupon with discount amount
- Remove coupon option
- Error message display
- Case-insensitive code handling

**Props:**
None (uses composables internally)

**Events:**
- `@coupon` - Emits `{ code: string, discount: number }` when coupon is applied or removed

**Usage:**
```vue
<template>
  <CouponInput @coupon="appliedCoupon = $event" />
</template>
```

### Composables

#### 2. **useCoupon Composable** (`app/composables/useCoupon.ts`)
Manages coupon state and API interactions.

**State:**
```typescript
couponState: {
  code: string          // Applied coupon code
  discount: number      // Calculated discount amount
  coupon: Coupon | null // Full coupon object
  isApplying: boolean   // Loading state during validation
  error: string | null  // Error message if validation failed
}

availableCoupons: Coupon[]  // List of available coupons
isLoadingCoupons: boolean   // Loading state for coupons list
```

**Methods:**

1. **fetchAvailableCoupons()** - Get list of active, valid coupons
   ```typescript
   const coupons = await fetchAvailableCoupons()
   ```

2. **validateCoupon(code: string, amount?: number)** - Validate coupon code and get discount
   ```typescript
   const result = await validateCoupon('SAVE20', 100.00)
   // Returns: { valid: boolean, message: string, discount: number, coupon: Coupon }
   ```

3. **checkCoupon(code: string)** - Get coupon details without validation
   ```typescript
   const coupon = await checkCoupon('SAVE20')
   // Returns: Coupon object or null
   ```

4. **removeCoupon()** - Clear applied coupon
   ```typescript
   removeCoupon()
   ```

**Computed Properties:**

- `isCouponApplied` - Boolean indicating if coupon is applied
- `couponDisplayText` - Formatted text showing coupon code and discount

### Types

#### 3. **Coupon Types** (`shared/types/coupon.ts`)

```typescript
interface Coupon {
  id: number
  code: string
  description?: string
  discount_type: 'percentage' | 'fixed_amount'
  discount_value: number
  min_spend?: number
  max_discount_amount?: number
  applies_to?: string
  can_combine_with_other_coupons?: boolean
}

interface CouponValidationResult {
  valid: boolean
  message: string
  coupon?: Coupon
  discount?: number
}

interface AppliedCoupon {
  coupon_id: number
  code: string
  discount_amount: number
  discount_type: 'percentage' | 'fixed_amount'
}
```

## Integration Points

### 1. **Cart Page** (`app/pages/cart.vue`)

Added coupon input and discount display:

```vue
<!-- Coupon Input in Order Summary -->
<CouponInput @coupon="appliedCoupon = $event" />

<!-- Coupon Discount Display -->
<div v-if="appliedCoupon.discount > 0" class="flex justify-between text-green-600">
  <span>Coupon ({{ appliedCoupon.code }})</span>
  <span>-${{ appliedCoupon.discount.toFixed(2) }}</span>
</div>
```

**State Management:**
```typescript
const appliedCoupon = ref({
  code: '',
  discount: 0
})

// Total calculation includes coupon discount
const total = computed(() => {
  const subtotalAfterCoupon = Math.max(0, subtotal.value - appliedCoupon.value.discount)
  return calculateOrderTotal(subtotalAfterCoupon, shipping.value, tax.value)
})
```

### 2. **Checkout Page** (`app/pages/checkout.vue`)

Coupon integrated in order summary and final order calculation:

```vue
<!-- OrderSummary component shows CouponInput -->
<CheckoutOrderSummary
  :cart-items="cartItems || []"
  :shipping-cost="shippingCost"
  :tax-rate="0"
/>
```

**Order Data with Coupon:**
```typescript
const order = {
  // ... other order data
  discount_amount: appliedCoupon.value.discount || 0,
  items: [...],
  shippingCost: shippingCost.value || 0
}
```

### 3. **Order Summary Component** (`app/components/Checkout/OrderSummary.vue`)

Enhanced with coupon support:

```vue
<!-- Coupon Input -->
<CouponInput @coupon="appliedCoupon = $event" />

<!-- Coupon Discount Line Item -->
<div v-if="appliedCoupon.discount > 0" class="flex justify-between text-green-600">
  <span>Discount ({{ appliedCoupon.code }})</span>
  <span>-${{ appliedCoupon.discount.toFixed(2) }}</span>
</div>

<!-- Updated Total -->
<span class="text-2xl font-bold text-primary-500">{{ finalTotal.toFixed(2) }}</span>
```

**Calculation:**
```typescript
const appliedCoupon = ref({ code: '', discount: 0 })

const finalTotal = computed(() => {
  return total.value - appliedCoupon.value.discount
})
```

## API Routes

### Server API Endpoints

Created proxy endpoints for frontend:

#### 1. **GET `/api/coupons`** - List Available Coupons
File: `server/api/coupons/index.get.ts`

```typescript
// Response
{
  "coupons": [
    {
      "id": 1,
      "code": "SAVE20",
      "description": "20% off your first order",
      "discount_type": "percentage",
      "discount_value": 20,
      "min_spend": 50,
      "max_discount_amount": 100
    }
  ]
}
```

#### 2. **POST `/api/coupons/validate`** - Validate Coupon Code
File: `server/api/coupons/validate.post.ts`

**Request:**
```json
{
  "code": "SAVE20",
  "amount": 100.00
}
```

**Response (Valid):**
```json
{
  "valid": true,
  "message": "Coupon applied successfully",
  "coupon": { ... },
  "discount": 20.00
}
```

**Response (Invalid):**
```json
{
  "valid": false,
  "message": "Coupon code not found"
}
```

#### 3. **POST `/api/coupons/check`** - Check Coupon Details
File: `server/api/coupons/check.post.ts`

**Request:**
```json
{
  "code": "SAVE20"
}
```

**Response:**
```json
{
  "id": 1,
  "code": "SAVE20",
  "description": "20% off your first order",
  "discount_type": "percentage",
  "discount_value": 20,
  "min_spend": 50,
  "max_discount_amount": 100
}
```

## Usage Examples

### Example 1: Apply Coupon in Cart

```vue
<script setup>
const { validateCoupon } = useCoupon()
const appliedCoupon = ref({ code: '', discount: 0 })

const onCouponApplied = async (coupon) => {
  const result = await validateCoupon(coupon.code, 100)
  if (result.valid) {
    appliedCoupon.value = coupon
  }
}
</script>

<template>
  <CouponInput @coupon="onCouponApplied" />
  <div v-if="appliedCoupon.code">
    Coupon applied: {{ appliedCoupon.code }} - Save ${{ appliedCoupon.discount }}
  </div>
</template>
```

### Example 2: Validate Coupon Before Order

```typescript
const applyCoupon = async (code: string, cartTotal: number) => {
  const { validateCoupon } = useCoupon()

  const result = await validateCoupon(code, cartTotal)

  if (result.valid) {
    console.log(`Saved: $${result.discount}`)
    // Proceed with order including discount
    return result.discount
  } else {
    console.error(result.message)
    return null
  }
}
```

### Example 3: List Available Coupons

```typescript
const showAvailableCoupons = async () => {
  const { fetchAvailableCoupons } = useCoupon()
  const coupons = await fetchAvailableCoupons()

  coupons.forEach(coupon => {
    console.log(`${coupon.code}: ${coupon.description}`)
  })
}
```

## Discount Calculation

### Percentage Discount
```
discount = order_total × (discount_value / 100)
```

Example: 20% off $100 order = $20 discount

### Fixed Amount Discount
```
discount = discount_value
```

Example: $20 off = $20 discount

### With Maximum Cap
```
discount = min(calculated_discount, max_discount_amount)
```

Example: 30% off with max $50 cap on $200 order = min($60, $50) = $50

### Validation Rules
1. **Minimum Spend**: Order total must meet `min_spend` requirement
2. **Maximum Spend**: Coupon may have `max_spend` limit
3. **Usage Limit**: Global usage count cannot exceed `usage_limit`
4. **Per-User Limit**: User cannot exceed `usage_limit_per_user`
5. **Date Range**: Coupon must be within `start_date` and `end_date`
6. **Active Status**: Coupon must have `is_active = true`

## Tax and Shipping Calculation

Coupons are applied **before** tax and shipping calculation:

```
Subtotal = Item prices × quantities
Discount = Subtotal × discount_rate (or fixed amount)
Taxable Amount = Subtotal - Discount
Tax = Taxable Amount × tax_rate
Shipping = Based on original subtotal
Final Total = Subtotal - Discount + Tax + Shipping
```

## Error Handling

The composable provides error handling with user-friendly messages:

```typescript
const { validateCoupon, couponState } = useCoupon()

await validateCoupon('INVALID')
console.log(couponState.value.error)
// "Coupon code not found" or "Coupon has expired"
```

**Common Error Messages:**
- "Coupon code not found" - Code doesn't exist
- "Coupon has expired or is inactive" - Coupon time-based or status check failed
- "You have already used this coupon the maximum number of times" - Per-user limit exceeded
- "Minimum spend of $50 required" - Order doesn't meet minimum
- "Coupon code is required" - Empty/null code

## Testing Checklist

- [ ] Apply valid coupon to cart
- [ ] Verify discount displays correctly
- [ ] Remove coupon and verify discount clears
- [ ] Apply coupon with minimum spend requirement
- [ ] Test percentage and fixed amount discounts
- [ ] Verify tax calculation excludes coupon discount
- [ ] Confirm coupon included in order submission
- [ ] Test expired coupon rejection
- [ ] Test per-user usage limit
- [ ] Verify error messages display

## Performance Considerations

1. **Validation Debouncing**: Add debounce to input if real-time validation is implemented
2. **Caching**: Available coupons list could be cached with TTL
3. **Error State**: Component clears error state on new validation attempt
4. **Toast Notifications**: User feedback via toast for all state changes

## Security Notes

1. Coupon codes are validated server-side - frontend validation is UX only
2. Discount amounts are always calculated and verified by backend
3. User cannot manipulate discount amount directly
4. Per-user limits enforced at backend via database queries
5. All API calls include standard CSRF and authentication headers

## Future Enhancements

1. **Coupon Categories**: Apply coupons to specific product categories
2. **Bundle Discounts**: Support multiple item discounts
3. **Loyalty Points**: Integrate coupon system with loyalty program
4. **Auto-Apply**: Automatically apply best coupon for user
5. **Coupon History**: Show previously used coupons
6. **Coupon Suggestions**: Show applicable coupons based on cart content

## Troubleshooting

### Coupon not applying
- Check coupon code is entered correctly (case-insensitive)
- Verify coupon is not expired
- Ensure order meets minimum spend requirement
- Check user hasn't exceeded per-user usage limit

### Discount not showing on order
- Verify appliedCoupon.value.discount is passed to order
- Check discount_amount field in order object
- Verify backend receives discount_amount correctly

### API errors
- Check `server/api/coupons/` route files exist
- Verify backend API base URL in `.env`
- Check backend API endpoints are responding
- Review browser console for API error details
