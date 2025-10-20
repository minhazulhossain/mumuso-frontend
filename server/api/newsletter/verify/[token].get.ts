export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const token = getRouterParam(event, 'token')

    try {
        return await $fetch(`${config.public.apiBase}newsletter/verify/${token}`, {
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