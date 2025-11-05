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
        const id = getRouterParam(event, 'id')

        return await $fetch(`${config.public.apiBase}user/addresses/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${session.user.token}`
            }
        })
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.data?.message || 'Failed to delete address'
        })
    }
})
