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
 * Blog post data
 */
export interface BlogPost {
    id: string | number
    title: string
    slug: string
    excerpt?: string
    content: string
    featured_image?: string
    author?: string
    category?: string
    published_at?: string
    created_at: string
    updated_at: string
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
