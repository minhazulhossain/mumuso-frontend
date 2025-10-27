# Types Directory

This directory contains all TypeScript type definitions for the Mumuso frontend application.

## File Structure

### `index.ts`
Central export file for all types. Import from here for convenient access to all types:
```typescript
import type { Product, CartItem, AuthFormData } from '~/types'
```

### `api.ts`
Generic API response types used across the application.
- `ApiResponse<T>` - Generic API response wrapper

### `auth.ts`
Authentication and user-related types.
- `AuthFormData` - Login/register form data
- `ProfileUpdateData` - Profile update form data
- `PasswordResetData` - Password reset form data
- `UserSession` - User session data stored in cookies
- `BackendAuthResponse` - Laravel backend auth response format

### `blog.ts`
Blog and content management types.
- `BlogQueryParams` - Query parameters for blog API requests
- `BlogPost` - Blog post data structure
- `BlogCategory` - Blog category data structure
- `BlogPostsResponse` - Paginated blog posts response

### `cart.ts`
Shopping cart types and utility functions.
- `Product` - Product information in cart
- `CartItem` - Cart item structure (guest & authenticated)
- `CartResponse` - API cart response
- `ApiErrorResponse` - Cart error responses
- Utility functions: `hasProductDetails`, `getItemSlug`, `getItemName`, etc.

### `content.ts`
CMS content types.
- `HeroBanner` - Hero banner/slider data
- `Category` - Content category structure

### `product.d.ts`
Product catalog types.
- `Product` - Full product data structure
- `Pagination` - Pagination metadata
- `ProductFilters` - Product filtering options
- `Category` - Product category structure

### `review.ts`
Product review system types.
- `ReviewSortBy` - Review sorting options ('recent', 'helpful', 'rating')
- `User` - User information in reviews
- `ReviewImage` - Review image data
- `Review` - Review data structure
- `ReviewForm` - Review submission form
- `ReviewStats` - Review statistics and ratings
- `Purchase` - Purchase verification data

### `server.ts`
Server-side types for API routes and utilities.
- `GuestCartData` - Guest cart session structure
- `GuestCartItem` - Guest cart item format
- `CartErrorData` - Cart error response data
- `CartResponse` - Generic cart response

## Usage Examples

### Import from index (Recommended)
```typescript
import type { Product, CartItem, AuthFormData } from '~/types'
```

### Import from specific files
```typescript
import type { AuthFormData } from '~/types/auth'
import type { BlogQueryParams } from '~/types/blog'
```

### Server-side imports
```typescript
import type { GuestCartData, GuestCartItem } from '~/types/server'
import type { BackendAuthResponse } from '~/types/auth'
```

## Type Organization Guidelines

1. **Client types** - Types used in Vue components and composables go in their respective domain files (auth, blog, product, etc.)
2. **Server types** - Types used only in server routes and utilities go in `server.ts`
3. **Shared types** - Types used by both client and server go in their domain files
4. **API types** - Generic API response wrappers go in `api.ts`

## Adding New Types

When adding new types:
1. Add the type to the appropriate domain file (or create a new one)
2. Export the type from that file
3. Re-export from `index.ts` for convenient access
4. Update this README with the new type documentation
