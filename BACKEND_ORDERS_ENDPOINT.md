# Backend Orders Endpoint Requirements

## Overview

The frontend now uses a user-specific orders endpoint for better performance. Only orders for the authenticated user are fetched from the backend, not all orders.

## Frontend Endpoint

**Endpoint**: `GET /api/user/orders`
- **Location**: `server/api/user/orders.get.ts`
- **Authentication**: Required (Bearer token)
- **Purpose**: Fetch orders for the currently authenticated user only

## Backend Endpoint (Primary)

### Recommended Approach

**Endpoint**: `GET /api/v1/users/{userId}/orders`

**Request**:
```
GET /api/v1/users/5/orders HTTP/1.1
Authorization: Bearer {access_token}
Accept: application/json
```

**Response** (200 OK):
```json
{
  "data": [
    {
      "id": 19,
      "order_number": "ORD-693D13628A09E",
      "status": "pending",
      "payment_status": "pending",
      "total_amount": 153.48,
      "created_at": "2025-12-13T07:18:58.000000Z",
      "items": [
        {
          "id": 34,
          "product_id": 5,
          "name": "Product Name",
          "quantity": 2,
          "price": 76.74,
          "image": "http://example.com/image.jpg"
        }
      ],
      "shipping_address": {
        "city": "Dhaka",
        "state": "CA",
        "country": "US"
      },
      "billing_address": {
        "city": "Dhaka",
        "state": "CA",
        "country": "US"
      }
    }
  ]
}
```

## Backend Endpoint (Fallback)

If the user-specific endpoint is not available, the frontend will fallback to:

**Endpoint**: `GET /api/v1/orders`

**Important**: The backend **must** filter orders by the authenticated user automatically using the Bearer token.

**Request**:
```
GET /api/v1/orders HTTP/1.1
Authorization: Bearer {access_token}
Accept: application/json
```

**Response** (200 OK):
```json
{
  "data": [
    { ...order... }
  ]
}
```

## Implementation Steps (Laravel)

### 1. Create Route for User-Specific Orders

```php
// routes/api.php
Route::middleware('auth:sanctum')->group(function () {
    Route::get('users/{userId}/orders', [OrderController::class, 'userOrders']);
});
```

### 2. Create Controller Method

```php
// app/Http/Controllers/OrderController.php

public function userOrders($userId)
{
    // Verify user is requesting their own orders
    if (auth()->id() != $userId) {
        return response()->json(['error' => 'Unauthorized'], 403);
    }

    $orders = Order::where('user_id', $userId)
        ->with('items', 'shippingAddress', 'billingAddress')
        ->orderBy('created_at', 'desc')
        ->get();

    return response()->json(['data' => $orders]);
}
```

### 3. Or Use Generic Endpoint (Must Filter by Auth)

```php
public function index()
{
    // IMPORTANT: Filter by authenticated user only
    $orders = Order::where('user_id', auth()->id())
        ->with('items', 'shippingAddress', 'billingAddress')
        ->orderBy('created_at', 'desc')
        ->get();

    return response()->json(['data' => $orders]);
}
```

## API Flow

```
Frontend Request
    ↓
GET /api/user/orders (Nuxt API endpoint)
    ↓
Backend Route: /api/v1/users/{userId}/orders
    ↓
Database: SELECT * FROM orders WHERE user_id = {authenticated_user_id}
    ↓
Response: User's orders only
    ↓
Frontend: Display paginated orders
```

## Response Format Requirements

The backend can return data in any of these formats (frontend handles all):

### Format 1: Data Wrapper
```json
{
  "data": [
    { "id": 1, "order_number": "ORD-123", ... }
  ]
}
```

### Format 2: Direct Array
```json
[
  { "id": 1, "order_number": "ORD-123", ... }
]
```

### Format 3: Success Wrapper
```json
{
  "success": true,
  "data": [
    { "id": 1, "order_number": "ORD-123", ... }
  ]
}
```

## Order Object Fields

Each order should include:

```javascript
{
  // Required fields
  "id": 1,                           // Order ID
  "order_number": "ORD-123456",      // Human-readable order number
  "status": "pending",               // pending, processing, shipped, delivered, cancelled
  "payment_status": "pending",       // pending, paid, failed, refunded
  "total_amount": 153.48,            // Total price
  "created_at": "2025-12-13T07:18:58.000000Z",  // Order date

  // Recommended fields
  "user_id": 5,                      // User who placed order
  "payment_method": "sslcommerz",    // Payment method used
  "shipping_cost": 10.00,            // Shipping amount
  "tax_amount": 0,                   // Tax amount

  // Related data
  "items": [                         // Order items
    {
      "id": 34,
      "product_id": 5,
      "product_name": "Product Name",
      "name": "Product Name",
      "quantity": 2,
      "price": 76.74,
      "image": "http://example.com/image.jpg"
    }
  ],

  "shipping_address": {
    "first_name": "John",
    "last_name": "Doe",
    "address_line_1": "123 Main St",
    "city": "Dhaka",
    "state": "CA",
    "postal_code": "1216",
    "country": "US",
    "phone": "+8801234567890"
  },

  "billing_address": {
    // Same structure as shipping_address
  }
}
```

## Error Responses

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Unauthenticated."
}
```

### 403 Forbidden (User Not Authorized to View)
```json
{
  "error": "Forbidden",
  "message": "You are not authorized to view this user's orders."
}
```

### 404 Not Found (Endpoint doesn't exist)
Frontend will fallback to generic `/api/v1/orders` endpoint

### 500 Server Error
```json
{
  "error": "Server Error",
  "message": "Failed to retrieve orders."
}
```

## Frontend Behavior

1. **Request**: Sends authenticated request to `/api/user/orders`
2. **Primary Endpoint**: Tries `GET /api/v1/users/{userId}/orders`
3. **Fallback**: If 404, tries `GET /api/v1/orders` (must filter by user)
4. **Response Handling**: Accepts multiple response formats
5. **Display**: Shows only orders returned by backend

## Debugging

### Frontend Logs

Open browser console (F12) to see logs:

```
[User Orders API] Fetching orders for user ID: 5
[User Orders API] Response format: data array with 3 orders
[useOrders] Returning data array with 3 orders
[Orders Page] Loaded 3 orders for user
```

### Backend Logs

Add logging in your Laravel controller:

```php
Log::info('Fetching orders for user: ' . auth()->id());
Log::info('Found ' . count($orders) . ' orders');
```

## Testing Checklist

- [ ] User A can see their orders only
- [ ] User B can see their orders only (different from User A)
- [ ] Orders are filtered by authenticated user
- [ ] User cannot access other users' orders
- [ ] Response includes all required fields
- [ ] Orders are returned in correct format
- [ ] Error codes are returned correctly
- [ ] Frontend displays orders with pagination
- [ ] Console logs show correct user ID and order count

## Performance Tips

1. **Use Database Indexes**:
   ```sql
   CREATE INDEX idx_orders_user_id ON orders(user_id);
   CREATE INDEX idx_orders_created_at ON orders(created_at);
   ```

2. **Eager Load Relationships**:
   ```php
   Order::where('user_id', auth()->id())
       ->with('items', 'shippingAddress', 'billingAddress')
       ->get();
   ```

3. **Limit Fields If Needed**:
   ```php
   Order::where('user_id', auth()->id())
       ->select('id', 'order_number', 'status', 'total_amount', 'created_at')
       ->get();
   ```

4. **Add Pagination** (optional):
   ```php
   Order::where('user_id', auth()->id())
       ->paginate(20);
   ```

## Summary

- ✅ Frontend calls `/api/user/orders`
- ✅ Backend should implement `/api/v1/users/{userId}/orders`
- ✅ Filter orders by authenticated user ID
- ✅ Return user's orders only
- ✅ Include all required fields
- ✅ Handle errors gracefully
