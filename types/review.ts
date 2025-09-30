// types/review.ts
export interface User {
    id: string
    name: string
    email: string
    avatar?: string
}

export interface Product {
    id: string
    name: string
    description: string
    price: number
    image?: string
}

export interface Review {
    id: string
    productId: string
    userId: string
    rating: number // 1-5
    title: string
    comment: string
    isVerifiedPurchase: boolean
    purchaseDate?: Date
    helpful: number
    notHelpful: number
    images?: string[]
    createdAt: Date
    updatedAt: Date
    user?: User
}

export interface ReviewForm {
    rating: number
    title: string
    comment: string
    images?: File[]
}

export interface ReviewStats {
    averageRating: number
    totalReviews: number
    ratingDistribution: {
        1: number
        2: number
        3: number
        4: number
        5: number
    }
    verifiedPurchases: number
}

export interface Purchase {
    id: string
    userId: string
    productId: string
    purchaseDate: Date
    orderId: string
    hasReviewed: boolean
}