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
        const body = await readBody(event)

        return await $fetch(`${config.public.apiBase}user/addresses/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${session.user.token}`
            },
            body
        })
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.data?.message || 'Failed to update address'
        })
    }
})
