# Shared Utilities

## Order Formatter

The order formatter provides type-safe order data formatting and validation that matches your Laravel API specifications.

### Files Included

1. **`order-formatter.ts`** - Core formatting and validation functions
2. **`ORDER_QUICK_REFERENCE.md`** - Quick lookup for field requirements
3. **`ORDER_FORMATTER_EXAMPLE.md`** - Complete usage examples

### Quick Start

```typescript
import { useOrders } from '~/composables/useOrders'

const { createOrder, loading, error } = useOrders()

const orderData = {
  user_id: 123,
  billing_address: {
    first_name: 'John',
    last_name: 'Doe',
    address_line_1: '123 Main St',
    city: 'New York',
    state: 'NY',
    postal_code: '10001',
    country: 'USA'
  },
  items: [
    { product_id: 1, quantity: 2, unit_price: 29.99 }
  ],
  tax_amount: 15.00,
  shipping_amount: 10.00
}

const result = await createOrder(orderData)
```

### Features

- ✅ **Automatic Validation** - Validates all required fields before API submission
- ✅ **Type-Safe** - Full TypeScript support with exported interfaces
- ✅ **Format Consistency** - Automatically formats prices to 2 decimal places
- ✅ **Flexible User Handling** - Support both registered users and guest checkout
- ✅ **Product Options** - Support for variations and custom product options
- ✅ **Error Handling** - Clear, actionable validation error messages

### Integration Points

#### Updated Composables
- `app/composables/useOrders.ts` - Now includes automatic formatting and validation

#### Exported Interfaces
```typescript
// Main order data interface
export interface OrderFormData {
  user_id?: number | string
  user?: UserInput
  status?: string
  payment_status?: string
  payment_method?: string
  currency?: string
  notes?: string
  tax_amount?: number
  shipping_amount?: number
  discount_amount?: number
  billing_address: AddressInput
  shipping_address?: AddressInput
  items: OrderItemInput[]
}

// Component interfaces also exported
export interface UserInput
export interface AddressInput
export interface OrderItemInput
```

### API Compliance

The formatter ensures data conforms to your Laravel API validation rules:

```php
// From your Laravel OrderRequest
'user_id' => 'nullable|exists:users,id',
'user.first_name' => 'required_with:user|string|max:255',
'billing_address.first_name' => 'required|string|max:255',
'items.*.product_id' => 'required|exists:products,id',
'items.*.quantity' => 'required|integer|min:1',
'tax_amount' => 'nullable|numeric|min:0',
// ... etc
```

### Usage in Checkout Component

```vue
<script setup lang="ts">
import { useOrders } from '~/composables/useOrders'
import type { OrderFormData } from '#shared/utils/order-formatter'

const { createOrder, loading, error } = useOrders()

const checkoutData: OrderFormData = {
  // Collect from your checkout form
}

const submit = async () => {
  const result = await createOrder(checkoutData)
  if (result) {
    // Navigate to order confirmation
    router.push(`/order-confirmation/${result.id}`)
  }
}
</script>

<template>
  <form @submit.prevent="submit">
    <!-- Your checkout form fields -->
    <button :disabled="loading">
      {{ loading ? 'Processing...' : 'Place Order' }}
    </button>
    <p v-if="error" class="text-red-600">{{ error }}</p>
  </form>
</template>
```

### Error Handling

```typescript
const { createOrder, error } = useOrders()

const result = await createOrder(orderData)

if (!result) {
  // error.value contains the validation/submission error message
  // Validation errors are formatted as: "Field 1 is required; Field 2 must be valid"
  console.error(error.value)
}
```

### Validation Example

```typescript
import { validateOrderData } from '#shared/utils/order-formatter'

const validation = validateOrderData(orderData)

if (!validation.valid) {
  // validation.errors is an array of clear error messages:
  // [
  //   "Either user_id or user information is required",
  //   "Billing first name is required",
  //   "At least one item is required"
  // ]
  validation.errors.forEach(error => showErrorMessage(error))
}
```

### File Structure

```
shared/utils/
├── order-formatter.ts              # Core utilities (auto-imported)
├── ORDER_QUICK_REFERENCE.md        # Field requirements cheat sheet
└── ORDER_FORMATTER_EXAMPLE.md      # Detailed usage examples
```

### Notes

- All numeric values (prices, taxes, etc) are automatically formatted to 2 decimal places
- Phone numbers and optional fields are trimmed automatically
- The formatter is auto-imported in `shared/utils/` so you can import directly:
  ```typescript
  import { formatOrderData, validateOrderData } from '#shared/utils/order-formatter'
  ```
- Type definitions are exported for full IDE support and autocomplete
