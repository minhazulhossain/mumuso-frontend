# Order History Implementation Guide

## Overview

The order history feature allows authenticated customers to view all their orders with filtering, sorting, and pagination capabilities.

## Features Implemented

### 1. **Order History Page** (`/account/orders`)
- **Authentication Required**: Users must be logged in to access
- **Complete Order Display**: Shows all customer orders with details
- **Status Badges**: Visual indicators for order status and payment status
- **Product Preview**: Shows first 2 items, expandable to see all
- **Product Images**: Displays product thumbnails with lazy loading

### 2. **Filtering & Sorting**
- **Filter by Status**:
  - All Orders (default)
  - Pending
  - Processing
  - Shipped
  - Delivered
  - Cancelled
  - Filters reset pagination to page 1

- **Sort Options**:
  - Newest First (default)
  - Oldest First
  - Highest Price
  - Lowest Price

### 3. **Pagination System**
- **Items Per Page Options**: 5, 10, 15, or 20 orders
- **Page Navigation**:
  - Previous/Next buttons
  - Direct page number clicks
  - Smart page display (shows first, last, and nearby pages with ellipsis)

- **User Feedback**:
  - Shows current page number
  - Displays total pages
  - Shows item count (e.g., "Showing 1 to 5 of 20 orders")
  - Disabled buttons at boundaries

- **Navigation Behavior**:
  - Smooth scroll to top when changing pages
  - Auto-reset to page 1 when filtering
  - Auto-reset to page 1 when changing items per page

### 4. **Order Card Information**
Each order displays:
- **Order Number**: Unique identifier (e.g., ORD-693D13628A09E)
- **Order Date**: Formatted date
- **Total Amount**: Currency formatted price
- **Order Status**: Badge showing status with color coding
- **Payment Status**: Badge showing payment state with color coding
- **Items List**: Product details with images, quantities, and prices
- **Action Buttons**:
  - "View Details" → Full order confirmation page
  - "Pay Now" → Retry payment for pending orders

### 5. **Status Indicators**
**Order Status Colors:**
- Pending → Amber
- Processing → Blue
- Shipped → Cyan
- Delivered → Green
- Cancelled → Red

**Payment Status Colors:**
- Pending → Amber
- Paid → Green
- Failed → Red
- Refunded → Blue

### 6. **Empty States**
- **No Orders**: Shows friendly message with "Continue Shopping" button
- **Loading**: Spinner with loading message
- **Error**: Error message with "Try Again" button

## User Access

**How customers reach Order History:**

1. Click account dropdown menu (username icon in header)
2. Click "Orders" menu item
3. View all their orders with filters/sorting/pagination

Or direct navigation to: `/account/orders`

## API Integration

### Endpoint: `GET /api/orders`
- **Authentication**: Required (Bearer token)
- **Backend Call**: Forwards to `/api/v1/orders` on Laravel backend
- **Response Format**: Returns user's orders array

### Backend Requirement
Your Laravel backend must:
1. Accept authenticated requests to `/api/v1/orders`
2. Return only orders for the authenticated user
3. Include order details (id, order_number, status, payment_status, items, etc.)

**Expected Response Format:**
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
          "name": "Product Name",
          "quantity": 2,
          "price": 76.74,
          "image": "http://example.com/image.jpg"
        }
      ]
    }
  ]
}
```

## File Structure

### Frontend Files
- **Page**: `app/pages/account/orders.vue`
  - Main order history page component
  - Includes pagination logic
  - Filtering and sorting
  - Order display cards

- **API Endpoint**: `server/api/orders/index.get.ts`
  - Fetches orders from backend
  - Requires authentication
  - Handles multiple response formats

- **Composable**: `app/composables/useOrders.ts`
  - `fetchOrders()` - Fetch all user orders
  - `fetchOrder(id)` - Fetch single order details
  - `createOrder(data)` - Create new order

- **Menu**: `app/components/UserMenu.vue`
  - Added "Orders" link to dropdown

## Pagination Details

### How It Works
1. **Filtered Orders**: Orders are filtered by status if selected
2. **Sorted Orders**: Applied sort is maintained across pages
3. **Paginated Slice**: Current page orders are sliced from filtered list
4. **Page Numbers**: Smart pagination shows relevant pages

### Computed Properties
```typescript
// Total pages based on items per page
totalPages = Math.ceil(filteredOrders.length / itemsPerPage)

// Current items to display
paginatedOrders = filteredOrders.slice(startIndex, endIndex)

// Smart page display (1, 2, ..., 5, 6, 7, ..., 10)
visiblePages = computed(() => { ... })
```

### Reset Behavior
Pagination resets to page 1 when:
- Filtering by status changes
- Items per page setting changes
- User manually navigates back to page 1

## Customization

### Change Items Per Page Options
Edit in `app/pages/account/orders.vue`:
```typescript
const itemsPerPageOptions = [
  { label: '5 per page', value: 5 },
  { label: '10 per page', value: 10 },
  { label: '15 per page', value: 15 },
  { label: '20 per page', value: 20 }
]
```

### Change Default Items Per Page
```typescript
const itemsPerPage = ref(10) // Changed from 5
```

### Add More Status Filters
```typescript
const orderStatuses = [
  'pending',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
  'returned' // Add new status
]
```

### Modify Sort Options
```typescript
const sortOptions = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Total Amount (High to Low)', value: 'highest' },
  // Add custom sorts
]
```

## Styling Notes

- **Responsive Design**: Works on mobile, tablet, and desktop
- **Dark Mode**: Fully supported with color-aware components
- **Icons**: Uses Heroicons (i-heroicons-*)
- **Colors**: Uses primary, gray, amber, green, red, blue colors
- **Spacing**: Uses Tailwind CSS spacing utilities

## Performance Considerations

- **Lazy Loading**: Product images use lazy loading
- **Computed Properties**: Used for efficient filtering/sorting/pagination
- **Auth Check**: Required before data fetch
- **Error Handling**: Graceful error states with retry option

## Testing Checklist

- [ ] User must be logged in to access page
- [ ] Page shows all user's orders (not other users' orders)
- [ ] Filter by status works correctly
- [ ] Sorting displays orders in correct order
- [ ] Pagination displays correct page count
- [ ] Previous/Next buttons work
- [ ] Direct page number navigation works
- [ ] Items per page selector works
- [ ] Filters reset page to 1
- [ ] Items per page change resets page to 1
- [ ] Empty state shows for new users
- [ ] Error state shows when API fails
- [ ] "View Details" navigates to order confirmation
- [ ] "Pay Now" works for pending payments
- [ ] Mobile layout is responsive
- [ ] Dark mode displays correctly

## Future Enhancements

- Export orders to CSV/PDF
- Search orders by order number
- Download invoices
- Track shipments in real-time
- Order cancellation
- Reorder functionality
- Customer support integration
- Email notifications for order status

## Backend Requirements Checklist

- [ ] `/api/v1/orders` GET endpoint implemented
- [ ] Returns only authenticated user's orders
- [ ] Includes all order details (id, number, status, items, etc.)
- [ ] Supports Bearer token authentication
- [ ] Returns proper error codes (401, 500, etc.)
- [ ] Handles multiple response formats gracefully
