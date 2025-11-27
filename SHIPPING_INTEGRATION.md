# Backend Shipping Integration Guide

This document outlines the updated shipping system integration with the Laravel backend's zone-based shipping model.

## Backend Structure

The backend implements a WooCommerce-style zone-based shipping system:

### 3 Database Models
- **ShippingZone** - Define shipping zones (Domestic, International, Local Pickup, etc.)
- **ShippingZoneLocation** - Define locations within zones (countries, states, postal codes)
- **ShippingMethod** - Define shipping methods within zones with flexible pricing

### Pre-Configured Zones

**Domestic Zone (US & CA)**
- Standard Shipping ($5.99) - fixed
- Express Shipping ($14.99) - fixed
- Overnight Shipping ($24.99) - fixed

**International Zone**
- International Standard ($29.99) - fixed
- International Express ($49.99) - fixed

**Local Pickup Zone**
- Local Pickup (Free) - free shipping

## API Endpoints

### 1. Get Shipping Methods by Location
```
POST /api/v1/shipping/methods
Content-Type: application/json

{
  "country": "US",
  "state": "CA",
  "postal_code": "90210"
}

Response:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Standard Shipping",
      "description": "Delivery in 5-7 business days",
      "price": 5.99,
      "is_free": false,
      "calculation_type": "fixed",
      "taxable": false
    },
    {
      "id": 2,
      "name": "Express Shipping",
      "description": "Delivery in 2-3 business days",
      "price": 14.99,
      "is_free": false,
      "calculation_type": "fixed",
      "taxable": false
    },
    ...
  ]
}
```

### 2. Calculate Shipping Cost
```
POST /api/v1/shipping/calculate
Authorization: Bearer <token>
Content-Type: application/json

{
  "order_id": 123,
  "method_id": 1
}

Response:
{
  "success": true,
  "data": {
    "cost": 5.99,
    "method": "Standard Shipping",
    "calculation_type": "fixed"
  }
}
```

## Frontend Implementation

### Composable: `useShipping()`

Located in `app/composables/useShipping.ts`

**Available Methods:**
```typescript
// Fetch methods based on shipping location
fetchMethodsByLocation(location: {
  country: string
  state?: string
  postal_code?: string
}): Promise<ShippingMethod[]>

// Calculate actual shipping cost (requires authentication)
calculateShippingCost(
  orderId: number,
  methodId: number
): Promise<number>
```

**Reactive State:**
```typescript
shippingMethods: readonly<ShippingMethod[]>
loading: readonly<boolean>
error: readonly<string | null>
```

### Server API Routes

#### `POST /api/shipping/methods`
- **Purpose**: Proxy to backend shipping methods endpoint
- **Request**: Location data (country, state, postal_code)
- **Validation**: Zod schema
- **Authentication**: Not required
- **Response**: Array of ShippingMethod objects

#### `POST /api/shipping/calculate`
- **Purpose**: Proxy to backend shipping calculation
- **Request**: order_id, method_id
- **Validation**: Zod schema
- **Authentication**: Required (Bearer token)
- **Response**: Calculated cost and method details

## Checkout Integration

### Flow
1. User enters shipping address → Sets country/state
2. Component watches address changes
3. `fetchMethodsByLocation()` is called with location
4. Methods populate in ShippingAddressForm
5. First method is selected by default
6. User can select alternative method
7. On form submission, shippingCost is calculated before order creation

### ShippingAddressForm Component
- Displays available shipping methods with location
- Shows method name, description, and price
- Handles free shipping via `is_free` flag
- Supports multiple calculation types in UI

### Key TypeScript Interfaces

```typescript
interface ShippingMethod {
  id: number
  name: string
  description?: string
  price: number
  calculation_type: 'fixed' | 'per_item' | 'per_weight'
  taxable: boolean
  is_free: boolean
}

interface ShippingLocation {
  country: string
  state?: string
  postal_code?: string
}
```

## Order Creation with Shipping

When placing an order, the checkout process:

1. **Step 1 (Contact)**: Collect email/phone
2. **Step 2 (Shipping)**:
   - Collect address
   - Fetch available methods by location
   - Select preferred method
3. **Step 3 (Payment)**:
   - Set billing address (same as shipping or custom)
   - Select payment method
   - Agree to terms

4. **Order Creation**:
   ```typescript
   const order = {
     contact: contactInfo,
     shipping: shippingAddress,
     billing: billingAddress,
     shippingMethod: selectedShippingMethod,  // Method ID
     paymentMethod: selectedPaymentMethod,
     items: cartItems,
     orderNotes: orderNotes,
     shippingCost: shippingCost  // Calculated from selected method
   }
   ```

## Handling Different Calculation Types

The backend supports three calculation types:

- **fixed**: Flat rate (used for standard/express shipping)
- **per_item**: Cost multiplied by cart items count
- **per_weight**: Cost calculated based on total weight

The UI displays the final price to customers, which is calculated by the backend when needed.

## Error Handling

### Location Not Found
If a location has no available shipping zones:
```typescript
// API returns empty array
shippingMethods = []

// Form shows message
"No shipping methods available. Please try again later."
```

### Authentication Required
The calculate endpoint requires authentication:
```typescript
// If user is not authenticated
// 401 Unauthorized error is thrown
// User must be logged in or use guest cart
```

## Testing Addresses

You can test with these pre-configured zones:

- **US/CA**: Uses Domestic zone (3 methods available)
- **International**: Uses International zone (2 methods available)
- **Local Pickup**: Specific locations have free local pickup

## Future Enhancements

1. **Dynamic Zones**: Add support for regional zones beyond current defaults
2. **Rate Calculation**: Implement per_item and per_weight calculations
3. **Tax Integration**: Apply tax to shipping based on taxable flag
4. **Shipping Time Estimates**: Display estimated delivery times per method
5. **Real Carrier Integration**: Connect to USPS/FedEx/UPS for real rates
