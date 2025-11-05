export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const session = await getUserSession(event)

    if (!session?.user?.token) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized'
        })
    }

    try {
        const body = await readBody(event)

        const response = await $fetch(`${config.public.apiBase}payment/initiate`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${session.user.token}`
            },
            body
        })

        return response
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.data?.message || 'Failed to initiate payment'
        })
    }
})
