// types/blog.ts

/**
 * Blog query parameters for API requests
 */
export interface BlogQueryParams {
    _page?: number
    _limit?: number
    category?: string
    search?: string
}

/**
 * Blog post data (matches backend Laravel API response)
 */
export interface BlogPost {
    slug: string
    title: string
    description: string
    short_description: string
    is_featured: boolean
    created_at: string
    image_url?: string
    categories?: BlogCategory[]
    tags?: any[]
}

/**
 * Blog category data
 */
export interface BlogCategory {
    id: string | number
    name: string
    slug: string
    description?: string
    count?: number
}

/**
 * Blog posts response with pagination
 */
export interface BlogPostsResponse {
    data: BlogPost[]
    meta?: {
        current_page: number
        last_page: number
        per_page: number
        total: number
    }
}
