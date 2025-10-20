// server/utils/api.ts
import type { H3Event } from 'h3'

/**
 * Make an authenticated request to the Laravel backend
 */
export const makeAuthenticatedRequest = async <T = any>(
    event: H3Event,
    endpoint: string,
    options: {
        method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
        body?: any
        requireAuth?: boolean
    } = {}
): Promise<T> => {
    const config = useRuntimeConfig()
    const session = await getUserSession(event)
    const { method = 'GET', body, requireAuth = true } = options

    // Check authentication if required
    if (requireAuth && !session?.user?.token) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized'
        })
    }

    const headers: Record<string, string> = {
        'Accept': 'application/json'
    }

    // Add authorization header if token exists
    if (session?.user?.token) {
        headers['Authorization'] = `Bearer ${session.user.token}`
    }

    // Add content type for POST/PUT/PATCH requests
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
        headers['Content-Type'] = 'application/json'
    }

    try {
        return await $fetch<T>(`${config.public.apiBase}${endpoint}`, {
            method,
            headers,
            body: body ? body : undefined
        })
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500,
            data: error.data,
            message: error.data?.message || 'Request failed'
        })
    }
}

/**
 * Get the current authenticated user from session
 */
export const getAuthenticatedUser = async (event: H3Event) => {
    const session = await getUserSession(event)

    if (!session?.user) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized'
        })
    }

    return session.user
}

/**
 * Refresh user data from backend and update session
 */
export const refreshUserSession = async (event: H3Event) => {
    const config = useRuntimeConfig()
    const session = await getUserSession(event)

    if (!session?.user?.token) {
        return null
    }

    try {
        const response = await $fetch<{ user: any }>(`${config.public.apiBase}user`, {
            headers: {
                'Authorization': `Bearer ${session.user.token}`,
                'Accept': 'application/json'
            }
        })

        await setUserSession(event, {
            user: {
                ...response.user,
                token: session.user.token
            }
        })

        return response.user
    } catch (error) {
        // Token is invalid, clear session
        await clearUserSession(event)
        return null
    }
}