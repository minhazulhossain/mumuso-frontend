# Shared Types Directory

This directory contains all TypeScript type definitions shared between the Vue app and Nitro server.

**Location:** `shared/types/` (Nuxt 4.x structure)
**Auto-imports:** Types in this directory are automatically imported in both app and server contexts.

## File Structure

### `index.ts`
Central export file for all types. Import from here for convenient access to all types:
```typescript
import type { Product, CartItem, AuthFormData } from '#shared/types'
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
- `User` - User data structure (used across auth, reviews, etc.)

### `blog.ts`
Blog and content management types.
- `BlogQueryParams` - Query parameters for blog API requests
- `BlogPost` - Blog post data structure
- `BlogCategory` - Blog category data structure
- `BlogPostsResponse` - Paginated blog posts response

### `cart.ts`
Shopping cart types and utility functions.
- `CartItem` - Cart item structure (guest & authenticated)
- `CartResponse` - API cart response
- `ApiErrorResponse` - Cart error responses
- `CartItemDiscount` - Discount information for cart items
- `CartItemPricing` - Pricing information with discounts
- `AppliedDiscount` - Applied discount details
- `CartTotals` - Cart totals with discounts
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
- `ReviewImage` - Review image data
- `Review` - Review data structure (includes User from auth.ts)
- `ReviewForm` - Review submission form
- `ReviewStats` - Review statistics and ratings
- `Purchase` - Purchase verification data

### `server.ts`
Server-side types for API routes and utilities.
- `GuestCartData` - Guest cart session structure
- `GuestCartItem` - Guest cart item format
- `CartErrorData` - Cart error response data

### `settings.ts`
Application settings and configuration types.
- `Settings` - Complete settings object structure
- `BrandingSettings` - Branding assets (logo, favicon, og_image)
- `SiteSettings` - Site configuration (name, url, contact, active status)
- `SEOSettings` - SEO and analytics settings (keywords, Google Analytics, GTM)
- `CompanySettings` - Company information (name, address, phone, timezone)
- `SocialMediaLink` - Social media link configuration
- `FooterMenuItem` - Footer menu item structure
- `FooterSettings` - Footer configuration and menu items

### `wishlist.ts`
Wishlist functionality types.
- `WishlistItem` - Wishlist item stored in cache/localStorage

### `payment.ts`
Payment and transaction types.
- `Payment` - Payment record structure
- `PaymentStatus` - Payment status enum ('pending' | 'processing' | 'completed' | 'failed' | 'cancelled')
- `PaymentMethod` - Payment method types (visa, bkash, nagad, etc.)
- `PaymentInitiateRequest` - Payment initiation request payload
- `PaymentInitiateResponse` - Payment gateway URL response
- `PaymentStatusResponse` - Payment status query response

## Usage Examples

### Import from index (Recommended)
```typescript
import type { Product, CartItem, AuthFormData, Settings } from '#shared/types'
```

### Import from specific files
```typescript
import type { AuthFormData } from '#shared/types/auth'
import type { BlogQueryParams } from '#shared/types/blog'
```

### Server-side imports (same pattern)
```typescript
import type { GuestCartData, GuestCartItem } from '#shared/types/server'
import type { BackendAuthResponse } from '#shared/types/auth'
```

### Auto-imports
Thanks to Nuxt 4.x, types in `shared/types/` are automatically available in both app and server without explicit imports in many cases.

## Type Organization Guidelines (Nuxt 4.x)

1. **Shared types** - All types in `shared/types/` are available to both Vue app and Nitro server
2. **Server types** - Server-specific types go in `server.ts`
3. **Domain types** - Types organized by domain (auth, blog, product, cart, etc.)
4. **API types** - Generic API response wrappers go in `api.ts`
5. **No Vue/Nitro imports** - Code in `shared/` cannot import Vue or Nitro-specific code

## Adding New Types

When adding new types:
1. Add the type to the appropriate domain file (or create a new one)
2. Export the type from that file
3. Re-export from `index.ts` for convenient access
4. Update this README with the new type documentation
