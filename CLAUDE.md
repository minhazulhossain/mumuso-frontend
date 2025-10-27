# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Nuxt 4 e-commerce frontend application that communicates with a Laravel backend API. The application features a shopping cart system with both guest and authenticated user support, blog functionality, product catalog, checkout flow, and dynamic site settings.

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

All TypeScript types are centralized in `types/` directory with a central export file:

**Import types from index (recommended):**
```typescript
import type { Product, CartItem, AuthFormData } from '~/types'
```

**Type files:**
- `index.ts`: Central export file for all types
- `auth.ts`: Authentication types (AuthFormData, ProfileUpdateData, BackendAuthResponse, etc.)
- `blog.ts`: Blog types (BlogQueryParams, BlogPost, BlogCategory)
- `cart.ts`: Cart types and utility functions (CartItem, CartResponse)
- `product.d.ts`: Product catalog types (Product, Pagination, ProductFilters, Category)
- `review.ts`: Review system types (Review, ReviewStats, ReviewSortBy)
- `content.ts`: CMS content types (HeroBanner, Category)
- `server.ts`: Server-side types (GuestCartData, GuestCartItem, CartErrorData)
- `api.ts`: Generic API response wrappers

See `types/README.md` for detailed documentation on each type.

## Configuration

**Nuxt Config** (nuxt.config.ts):
- Modules: `@nuxt/ui`, `nuxt-auth-utils`
- Runtime config: `apiBase` for backend URL
- UI theme: Default variants set to neutral/sm
- Devtools enabled

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

## File References

When working with authentication: server/utils/api.ts, app/composables/useAuth.ts, server/api/auth/login.post.ts
When working with cart: server/utils/guestCart.ts, app/composables/useCart.ts, server/api/cart/
When working with settings: app/composables/useSettings.ts, app/app.vue
When adding new API routes: Follow pattern in server/api/ with proper HTTP method suffix (.get.ts, .post.ts, etc.)
