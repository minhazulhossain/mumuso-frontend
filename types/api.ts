export interface ApiResponse<T = any> {
    status: boolean
    message: string
    data: T
}

export interface CartItem {
    slug: string
    productId: number
    quantity: number
    added_at: string
    product?: any
    reserved_until?: number | null
}

export interface CartResponse {
    items: CartItem[]
    count: number
    total: number
}