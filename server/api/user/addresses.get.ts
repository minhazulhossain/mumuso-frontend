export default defineEventHandler(async (event) => {

    const config = useRuntimeConfig()
    const session = await getUserSession(event)

    if (!session?.user?.token) {
        throw createError({
            statusCode: 405,
            message: 'Unauthorized'
        })
    }

    try {
        // Call Laravel API with user's token
        const response = await $fetch(`${config.public.apiBase}/v1/addresses`, {
            headers: {
                Authorization: `Bearer ${session.user.token}`
            }
        })

        console.log(response)

        return response?.data
    } catch (error: any) {



        throw createError({
            statusCode: error.statusCode || 500,
            message: error.data?.message || 'Failed to fetch addresses'
        })
    }
})