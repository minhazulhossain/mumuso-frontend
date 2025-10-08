export interface Product {
    id: number
    name: string
    slug: string
    sku: string
    price: string
    compare_price: string | null
    has_discount: boolean
    discount_percentage: number | null
    image: string
    image_thumb: string
    image_webp: string
    in_stock: boolean
    stock_quantity: number
    is_featured: boolean
    categories: Array<{ id: number; name: string; slug: string }>
    rating?: number
    reviews_count?: number
    short_description?: string
}

export interface Pagination {
    total: number
    perPage: number
    currentPage: number
    lastPage: number
    from: number
    to: number
    hasMorePages: boolean
}

export interface ProductFilters {
    category?: string
    featured?: boolean
    in_stock?: boolean
    min_price?: number | string
    max_price?: number | string
    search?: string
    sort_by?: string
    on_sale?: boolean
    page?: number
}

export interface Category {
    id: number
    name: string,
    label ?: string
    slug: string
    description?: string
    is_active: boolean
}