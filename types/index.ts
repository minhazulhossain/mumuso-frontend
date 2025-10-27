// types/index.ts
// Central export file for all types

// API types
export type { ApiResponse } from './api'

// Auth types
export type {
    AuthFormData,
    ProfileUpdateData,
    PasswordResetData,
    UserSession,
    BackendAuthResponse
} from './auth'

// Blog types
export type {
    BlogQueryParams,
    BlogPost,
    BlogCategory,
    BlogPostsResponse
} from './blog'

// Cart types
export type {
    CartItem,
    CartResponse,
    ApiErrorResponse
} from './cart'

export {
    hasProductDetails,
    getItemSlug,
    getItemName,
    getItemPrice,
    getItemImage,
    getItemTotal
} from './cart'

// Product types
export type {
    Product,
    Pagination,
    ProductFilters,
    Category
} from './product'

// Review types
export type {
    ReviewSortBy,
    User,
    ReviewImage,
    Review,
    ReviewForm,
    ReviewStats,
    Purchase
} from './review'

// Content types
export type {
    HeroBanner,
    Category as ContentCategory
} from './content'

// Server types
export type {
    GuestCartData,
    GuestCartItem,
    CartErrorData
} from './server'
