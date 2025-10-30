# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Nuxt 4 e-commerce frontend application that communicates with a Laravel backend API. The application features a shopping cart system with both guest and authenticated user support, blog functionality, product catalog, checkout flow, and dynamic site settings.

## Directory Structure (Nuxt 4.x)

This project follows the **Nuxt 4.x directory structure**:

```
app/                    # Application code (Vue components, composables, pages)
├── assets/            # Stylesheets, fonts, images
├── components/        # Vue components
├── composables/       # Composables and state management
├── layouts/           # Layout wrappers
├── middleware/        # Route middleware
├── pages/            # File-based routing
├── plugins/          # Vue plugins
└── app.config.ts     # App-level configuration

server/                # Server-side code (Nitro)
├── api/              # API endpoints
├── plugins/          # Server plugins
└── utils/            # Server utilities

shared/                # Code shared between app and server
├── types/            # TypeScript definitions (auto-imported)
└── utils/            # Shared utilities (auto-imported)

public/                # Static assets served at root
nuxt.config.ts        # Nuxt configuration
```

**Important Notes:**
- Files directly in `shared/types/` and `shared/utils/` are auto-imported
- Nested subdirectories require explicit import configuration
- Use `#shared` alias to import from shared directory
- Code in `shared/` cannot import Vue or Nitro-specific code

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Prepare Nuxt (auto-runs after install)
npm run postinstall
```

**Note:** After pulling changes, always run `npm install` to ensure all dependencies (including @nuxt/image) are up to date.

## Architecture

### Backend Integration

The frontend communicates with a Laravel backend API configured via `NUXT_PUBLIC_API_BASE` environment variable (defaults to `http://127.0.0.1:8000/api/v1/`).

**Key Integration Points:**
- `server/utils/api.ts`: Contains `makeAuthenticatedRequest()` helper for making authenticated API calls to the backend
- Session management uses `nuxt-auth-utils` module with token-based authentication
- API calls from server routes use `$fetch` with Bearer token authentication

### Dual Cart System

The application implements a sophisticated dual cart system:

**Guest Cart** (`server/utils/guestCart.ts`):
- Stores cart items in encrypted session storage (server-side)
- Only stores product slugs and quantities
- Product details are fetched client-side when displaying the cart
- Automatically syncs to backend cart upon user login

**Authenticated Cart**:
- Stored in backend database via API calls
- Full product details included in responses
- Cart reservations with automatic extension every 10 minutes

**Cart Sync Flow:**
1. Guest adds items → stored in session (`getGuestCart`, `addToGuestCart`)
2. User logs in → `server/api/auth/login.post.ts` retrieves guest cart
3. Guest cart items synced to backend via `syncGuestCartToBackend()`
4. Session cart cleared after successful sync

**Shared Cart Utilities** (`shared/utils/cart-helpers.ts`):
Common cart logic shared between components (auto-imported):
- `getItemStock(item)` - Get stock from variation or product
- `formatPrice(price)` - Format price to 2 decimal places
- `getStockStatus(stock)` - Get stock badge info (color, message)
- `isMaxStockReached(item)` - Check if max stock reached
- `canIncrementQuantity(item)` / `canDecrementQuantity(item)` - Quantity control helpers
- `getItemImageUrl(item)` - Get safe image URL
- `getItemDisplayName(item)` - Get display name with variation
- `calculateShipping()` / `calculateTax()` / `calculateOrderTotal()` - Price calculations

Used by: `app/components/CartSidebar.vue`, `app/pages/cart.vue`

### Server API Routes

All routes in `server/api/` follow Nuxt's file-based routing:
- Auth routes: `auth/login.post.ts`, `auth/register.post.ts`, `auth/logout.post.ts`
- Cart routes: `cart/add.post.ts`, `cart/update/[slug].put.ts`, `cart/remove/[slug].delete.ts`
- Blog routes: `blog/index.get.ts`, `blog/[slug].get.ts`

**Pattern:** Routes automatically detect if user is authenticated and route requests accordingly (guest session vs. backend API).

### Composables Architecture

Composables provide reusable business logic and state management:

**Core Composables:**
- `useAuth()`: Authentication (login, register, logout, password reset) in app/composables/useAuth.ts
- `useCart()`: Cart management with state persistence in app/composables/useCart.ts
- `useSettings()`: Site-wide settings fetched from backend in app/composables/useSettings.ts
- `useProducts()`: Product catalog operations
- `useBlogAPI()`: Blog and content management
- `useReviews()`: Product review system

**State Management:** Uses Nuxt's `useState()` for reactive global state (no Vuex/Pinia required).

### Component Organization

- `app/components/`: Reusable Vue components
  - `Shop/`: Shop-specific components (ProductCard, Sidebar, ProductList)
  - `checkout/`: Multi-step checkout form components
  - `ProductReview/`: Review system components
  - `Mobile/`: Mobile-specific UI components
- `app/pages/`: File-based routing pages
- `app/layouts/`: Layout wrappers (default.vue includes AppHeader, AppFooter, Mobilebottomnav)

### Settings and SEO

**Dynamic Settings** (app/app.vue):
- Settings fetched on app initialization using `useSettings().fetchSettings()`
- Settings provided globally via `provide('settings', settings)`
- Includes: branding, site info, SEO meta tags, Google Analytics, Google Tag Manager
- Automatic maintenance mode redirect when `settings.site.active === false`

**SEO Configuration:**
- Meta tags, Open Graph, Twitter Cards dynamically set from backend settings
- Google Analytics and GTM injected via script tags if configured
- Canonical URLs and favicons from settings

### Authentication Flow

1. User submits login form → `app/composables/useAuth.ts:login()`
2. Calls `/api/auth/login` → `server/api/auth/login.post.ts`
3. Backend validates credentials, returns user + access_token
4. Session stored via `replaceUserSession()` from nuxt-auth-utils
5. Guest cart items synced to backend if present
6. User state available via `useUserSession()` composable

### Type Definitions

All TypeScript types are centralized in `shared/types/` directory following Nuxt 4.x structure. Types in this directory are automatically available to both the Vue app and Nitro server.

**Import types using #shared alias (recommended):**
```typescript
import type { Product, CartItem, AuthFormData } from '#shared/types'
// Or from specific files:
import type { AuthFormData } from '#shared/types/auth'
```

**Type files in `shared/types/`:**
- `index.ts`: Central export file for all types
- `auth.ts`: Authentication types (AuthFormData, ProfileUpdateData, BackendAuthResponse, etc.)
- `blog.ts`: Blog types (BlogQueryParams, BlogPost, BlogCategory)
- `cart.ts`: Cart types and utility functions (CartItem, CartResponse)
- `product.d.ts`: Product catalog types (Product, Pagination, ProductFilters, Category)
- `review.ts`: Review system types (Review, ReviewStats, ReviewSortBy)
- `content.ts`: CMS content types (HeroBanner, Category)
- `server.ts`: Server-side types (GuestCartData, GuestCartItem, CartErrorData)
- `api.ts`: Generic API response wrappers

See `shared/types/README.md` for detailed documentation on each type.

## Configuration

**Nuxt Config** (nuxt.config.ts):
- Modules: `@nuxt/ui`, `@nuxt/image`, `nuxt-auth-utils`
- Runtime config: `apiBase` for backend URL
- UI theme: Default variants set to neutral/sm
- Devtools enabled
- Image optimization: WebP/AVIF formats, responsive sizes, custom provider

**Image Optimization (@nuxt/image):**
- Automatic format conversion (WebP, AVIF)
- Responsive image sizing with configurable breakpoints
- Lazy loading by default
- Quality set to 80 for optimal file size/quality balance
- Supports external URLs (from Laravel backend) without modification

**Environment Variables:**
- `NUXT_PUBLIC_API_BASE`: Backend API URL
- `NUXT_SESSION_PASSWORD`: Session encryption key (min 32 chars)

## Key Implementation Details

### Zod Validation
Server API routes use Zod schemas for request validation:
```typescript
const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})
const body = await readValidatedBody(event, bodySchema.parse)
```

### Error Handling
- API errors throw `createError()` with statusCode and message
- Client composables catch and re-throw with user-friendly messages
- Toast notifications used for user feedback (via `@nuxt/ui`)

### Cart Reservation System
- Frontend auto-extends cart reservations every 10 minutes via `setInterval`
- Ensures items remain reserved during checkout process
- Timer started on mount, cleared on unmount in useCart composable

## Image Optimization Best Practices

**Using NuxtImg for standard images:**
```vue
<NuxtImg
  src="/path/to/image.jpg"
  alt="Description"
  width="400"
  height="300"
  sizes="xs:100vw sm:50vw md:33vw lg:25vw"
  loading="lazy"
  format="webp"
/>
```

**Using NuxtPicture for responsive/art-directed images:**
```vue
<NuxtPicture
  src="/path/to/image.jpg"
  alt="Description"
  :img-attrs="{ class: 'w-full h-full object-cover' }"
  sizes="xs:100vw sm:100vw md:100vw"
  loading="eager"
  format="webp"
/>
```

**Guidelines:**
- Use `loading="eager"` for above-the-fold images (hero banners, logos)
- Use `loading="lazy"` for below-the-fold images (product cards, thumbnails)
- Always specify `width` and `height` to prevent layout shift
- Use `sizes` attribute for responsive images to optimize bandwidth
- Format automatically converts to WebP/AVIF when supported
- External URLs (from Laravel backend) work seamlessly
- Images are automatically optimized based on screen size and format support

## File References

When working with authentication: server/utils/api.ts, app/composables/useAuth.ts, server/api/auth/login.post.ts
When working with cart: server/utils/guestCart.ts, app/composables/useCart.ts, server/api/cart/, shared/utils/cart-helpers.ts
When working with settings: app/composables/useSettings.ts, app/app.vue
When working with types: shared/types/ (import via #shared/types), see shared/types/README.md
When working with shared utilities: shared/utils/ (auto-imported), e.g., cart-helpers.ts for cart operations
When working with images: Use NuxtImg/NuxtPicture components for automatic optimization
When adding new API routes: Follow pattern in server/api/ with proper HTTP method suffix (.get.ts, .post.ts, etc.)
