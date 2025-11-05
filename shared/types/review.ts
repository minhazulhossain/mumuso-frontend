import type { User } from './auth'

/**
 * Review sort options
 */
export type ReviewSortBy = 'recent' | 'helpful' | 'rating'

export interface ReviewImage {
    id: string | number
    url: string
    thumb: string
    preview: string
    name: string
}

export interface Review {
    id: string
    product_id: string
    user_id: string
    rating: number
    title: string
    comment: string
    is_verified_purchase: boolean
    purchase_date?: string
    helpful: number
    not_helpful: number
    helpful_percentage: number
    images?: ReviewImage[]
    user?: User
    created_at: string
    updated_at: string
}

export interface ReviewForm {
    rating: number
    title: string
    comment: string
    images?: File[]
}

export interface ReviewStats {
    average_rating: number
    total_reviews: number
    rating_distribution: {
        1: number
        2: number
        3: number
        4: number
        5: number
    }
    verified_purchases: number
}

export interface Purchase {
    id: string
    user_id: string
    product_id: string
    purchase_date: string
    order_id: string
    has_reviewed: boolean
}