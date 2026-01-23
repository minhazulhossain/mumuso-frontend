export default defineEventHandler(async (event) => {
    const token = getRouterParam(event, 'token')
    const backendUrl = process.env.BACKEND_API_BASE || 'https://admin.mumuso.com.bd/api/v1/'

    try {
        return await $fetch(`${backendUrl}newsletter/verify/${token}`, {
            headers: {
                'Accept': 'application/json'
            }
        })
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.data?.message || 'Verification failed'
        })
    }
})