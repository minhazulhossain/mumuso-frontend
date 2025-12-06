# Order Formatter - Usage Examples

This document shows how to use the order formatter and useOrders composable to submit orders that match the API specifications.

## Basic Usage Example

```typescript
import { useOrders } from '~/composables/useOrders'

export default {
  setup() {
    const { createOrder, loading, error } = useOrders()

    const submitOrder = async () => {
      const orderData = {
        // For authenticated users, use user_id
        user_id: 123,

        // Or provide user info for guest checkout
        // user: {
        //   first_name: 'John',
        //   last_name: 'Doe',
        //   email: 'john@example.com',
        //   phone: '+1234567890'
        // },

        // Order details (optional)
        status: 'pending',
        payment_status: 'pending',
        payment_method: 'credit_card',
        currency: 'USD',
        notes: 'Special instructions for delivery',

        // Financial information
        tax_amount: 15.00,
        shipping_amount: 10.00,
        discount_amount: 5.00,

        // Required: Billing address
        billing_address: {
          first_name: 'John',
          last_name: 'Doe',
          address_line_1: '123 Main Street',
          city: 'New York',
          state: 'NY',
          postal_code: '10001',
          country: 'United States',
          phone: '+1234567890'
        },

        // Optional: Shipping address (if different from billing)
        shipping_address: {
          first_name: 'Jane',
          last_name: 'Doe',
          address_line_1: '456 Oak Avenue',
          city: 'Los Angeles',
          state: 'CA',
          postal_code: '90001',
          country: 'United States',
          phone: '+0987654321'
        },

        // Required: Order items (at least 1)
        items: [
          {
            product_id: 1,
            quantity: 2,
            unit_price: 29.99,
            product_options: {
              color: 'blue',
              size: 'large'
            }
          },
          {
            product_id: 2,
            quantity: 1,
            unit_price: 49.99
          }
        ]
      }

      const result = await createOrder(orderData)

      if (result) {
        console.log('Order created successfully:', result)
      } else {
        console.log('Order creation failed:', error.value)
      }
    }

    return { submitOrder, loading, error }
  }
}
```

## Guest Checkout Example

For guest users without an account:

```typescript
const guestOrderData = {
  // Provide new customer information
  user: {
    first_name: 'John',
    last_name: 'Smith',
    email: 'john.smith@example.com',
    phone: '+1-555-0123'
  },

  billing_address: {
    first_name: 'John',
    last_name: 'Smith',
    address_line_1: '123 Main St',
    city: 'Boston',
    state: 'MA',
    postal_code: '02101',
    country: 'United States'
  },

  items: [
    {
      product_id: 5,
      quantity: 1,
      unit_price: 99.99
    }
  ]
}

const result = await createOrder(guestOrderData)
```

## Registered User Checkout Example

For authenticated users:

```typescript
const userOrderData = {
  // Use existing user ID
  user_id: currentUserId,

  // Include financial details
  tax_amount: 24.50,
  shipping_amount: 15.00,

  billing_address: {
    first_name: 'Jane',
    last_name: 'Johnson',
    address_line_1: '789 Elm Street',
    city: 'Chicago',
    state: 'IL',
    postal_code: '60601',
    country: 'United States'
  },

  // Multiple items example
  items: [
    {
      product_id: 10,
      quantity: 3,
      unit_price: 25.00,
      product_options: { color: 'red' }
    },
    {
      product_id: 11,
      quantity: 1,
      unit_price: 50.00,
      product_options: { size: 'medium', style: 'casual' }
    }
  ],

  payment_method: 'paypal',
  notes: 'Gift wrap please'
}

const result = await createOrder(userOrderData)
```

## Validation & Error Handling

The formatter automatically validates all required fields:

```typescript
import { validateOrderData } from '#shared/utils/order-formatter'

const validation = validateOrderData(orderData)

if (!validation.valid) {
  console.log('Validation errors:', validation.errors)
  // errors is an array of error messages
}
```

The `createOrder` function automatically validates before submission and returns `null` on validation failure with `error.value` containing the error message.

## API Data Format

The formatter ensures the data is sent to the API in the correct format:

```json
{
  "user_id": 123,
  "billing_address": {
    "first_name": "John",
    "last_name": "Doe",
    "address_line_1": "123 Main Street",
    "city": "New York",
    "state": "NY",
    "postal_code": "10001",
    "country": "United States",
    "phone": "+1234567890"
  },
  "shipping_address": {
    "first_name": "Jane",
    "last_name": "Doe",
    "address_line_1": "456 Oak Avenue",
    "city": "Los Angeles",
    "state": "CA",
    "postal_code": "90001",
    "country": "United States",
    "phone": "+0987654321"
  },
  "items": [
    {
      "product_id": 1,
      "quantity": 2,
      "unit_price": "29.99",
      "product_options": {
        "color": "blue",
        "size": "large"
      }
    }
  ],
  "tax_amount": "15.00",
  "shipping_amount": "10.00",
  "discount_amount": "5.00",
  "status": "pending",
  "payment_status": "pending",
  "payment_method": "credit_card",
  "currency": "USD",
  "notes": "Special instructions"
}
```

## Key Features

- ✅ **Automatic Validation**: All required fields are validated before submission
- ✅ **Type-Safe**: Full TypeScript support with interfaces
- ✅ **Price Formatting**: Automatically formats prices to 2 decimal places
- ✅ **Flexible User Info**: Support both registered users (user_id) and guest users (user object)
- ✅ **Product Options**: Support for product variations and options
- ✅ **Error Messages**: Clear, actionable validation error messages

## Required Fields

### User Information (choose one):
- `user_id` (for registered users)
- OR `user` object with: `first_name`, `last_name`, `email`, optional `phone`

### Addresses:
- `billing_address` (required)
  - `first_name`, `last_name`, `address_line_1`, `city`, `state`, `postal_code`, `country`
  - Optional: `phone`
- `shipping_address` (optional)
  - Same fields as billing_address

### Order Items:
- `items` (required, minimum 1 item)
  - Each item: `product_id`, `quantity` (minimum 1)
  - Optional: `unit_price`, `product_options`
