/**
 * Universal proxy endpoint for backend API calls
 * Frontend calls /api/proxy/... which forwards to backend
 * This avoids CORS issues by proxying through the server
 */
export default defineEventHandler(async (event) => {
    // Get the remaining path after /api/proxy/
    const path = getRouterParam(event, '_')

    if (!path) {
        throw createError({
            statusCode: 400,
            message: 'No path specified'
        })
    }

    // Get query parameters from the request
    const query = getQuery(event)

    // Get request method
    const method = getMethod(event)

    // Get request body for POST/PUT requests
    let body: any = undefined
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
        body = await readBody(event)
    }

    const config = useRuntimeConfig()
    const backendUrl = process.env.BACKEND_API_BASE || 'https://mumusoadmin.coderdrivelab.com/api/v1/'

    // Build the full URL
    const url = new URL(path, backendUrl)

    // Add query parameters
    Object.entries(query).forEach(([key, value]) => {
        url.searchParams.append(key, String(value))
    })

    try {
        const response = await $fetch.raw(url.toString(), {
            method,
            body,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })

        // Set response headers
        setResponseStatus(event, response.status)

        // Forward important headers
        if (response.headers.get('content-type')) {
            setHeader(event, 'content-type', response.headers.get('content-type')!)
        }

        return response._data
    } catch (error: any) {
        console.error(`Proxy error for ${path}:`, error)

        throw createError({
            statusCode: error.status || 500,
            message: error.message || 'Failed to fetch from backend'
        })
    }
})
