export interface ProductVariationImage {
    thumb: string
    medium: string
    large: string
    original: string
}

export interface ProductVariation {
    id: number
    name: string
    sku: string
    price: string
    compare_price: string | null
    stock_quantity: number
    stock_status: string
    is_active: boolean
    sort_order: number
    attribute_values: string[]
    images: ProductVariationImage
    product_id: number
}

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
    variations?: ProductVariation[]
    description?: string
    weight?: string
    status?: string
    images?: {
        featured: {
            thumb: string
            medium: string
            large: string
            original: string
        }
        all: Array<{
            id: number
            url: string
            thumb: string
            alt: string
        }>
    }
    related_products?: Product[]
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