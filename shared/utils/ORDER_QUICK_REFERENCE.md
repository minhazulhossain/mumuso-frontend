# Order Data Format - Quick Reference

## Complete Order Data Structure

```typescript
{
  // USER - Choose one option:
  user_id: 123,  // For existing users
  // OR
  user: {
    first_name: string,
    last_name: string,
    email: string,
    phone?: string  // optional
  },

  // ORDER DETAILS - All optional
  status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded',
  payment_status?: 'pending' | 'paid' | 'failed' | 'refunded',
  payment_method?: string,
  currency?: string,  // e.g., 'USD'
  notes?: string,

  // FINANCIAL - All optional
  tax_amount?: number,
  shipping_amount?: number,
  discount_amount?: number,

  // ADDRESSES
  billing_address: {          // REQUIRED
    first_name: string,      // required
    last_name: string,       // required
    address_line_1: string,  // required
    city: string,            // required
    state: string,           // required
    postal_code: string,     // required
    country: string,         // required
    phone?: string           // optional
  },

  shipping_address?: {        // OPTIONAL
    // Same fields as billing_address
  },

  // ORDER ITEMS
  items: [                     // REQUIRED (min. 1 item)
    {
      product_id: number,      // required
      quantity: number,        // required (min. 1)
      unit_price?: number,     // optional
      product_options?: {      // optional
        [key: string]: any
      }
    }
  ]
}
```

## Minimum Required Data

```javascript
// For authenticated user
{
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
    { product_id: 1, quantity: 1 }
  ]
}

// For guest checkout
{
  user: {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@example.com'
  },
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
    { product_id: 1, quantity: 1 }
  ]
}
```

## Usage in Component

```vue
<script setup>
import { useOrders } from '~/composables/useOrders'
import { validateOrderData, type OrderFormData } from '#shared/utils/order-formatter'

const { createOrder, loading, error } = useOrders()

const orderData: OrderFormData = {
  // ... your order data
}

const submitOrder = async () => {
  const result = await createOrder(orderData)
  if (result) {
    // Order created successfully
  }
}
</script>
```

## Field Validation Rules

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `user_id` | number/string | conditional* | Must exist in database |
| `user.first_name` | string | with user | max 255 chars |
| `user.last_name` | string | with user | max 255 chars |
| `user.email` | string | with user | valid email format |
| `user.phone` | string | no | max 20 chars |
| `billing_address.*` | string | yes | max 255/100/20 chars |
| `tax_amount` | number | no | >= 0 |
| `shipping_amount` | number | no | >= 0 |
| `discount_amount` | number | no | >= 0 |
| `items` | array | yes | min 1 item |
| `items[].product_id` | number | yes | must exist |
| `items[].quantity` | number | yes | >= 1 |
| `items[].unit_price` | number | no | >= 0 |

*Either `user_id` OR `user` object is required

## Validation & Error Handling

```typescript
import { validateOrderData } from '#shared/utils/order-formatter'

const validation = validateOrderData(orderData)

if (!validation.valid) {
  validation.errors.forEach(err => {
    console.log(err)
    // "Either user_id or user information is required"
    // "User first name is required"
    // "Billing address is required"
    // etc.
  })
}
```

## Numeric Formatting

The formatter automatically formats prices to 2 decimal places:

```typescript
// Input
{ tax_amount: 15, shipping_amount: 10.567 }

// Output
{ tax_amount: "15.00", shipping_amount: "10.57" }
```

## Usage in Checkout Flow

```typescript
// 1. Collect order data from form/cart
const orderData = {
  user_id: currentUser.id,
  billing_address: formData.billing,
  shipping_address: formData.shipping,
  items: cart.items.map(item => ({
    product_id: item.id,
    quantity: item.qty,
    unit_price: item.price,
    product_options: item.options
  })),
  tax_amount: cart.tax,
  shipping_amount: cart.shipping,
  discount_amount: cart.discount,
  payment_method: formData.paymentMethod
}

// 2. Submit with useOrders composable
const { createOrder, loading, error } = useOrders()
const result = await createOrder(orderData)

// 3. Handle response
if (result) {
  // Success - navigate to confirmation page
  router.push(`/order-confirmation/${result.id}`)
} else {
  // Show error message
  showErrorToast(error.value)
}
```
