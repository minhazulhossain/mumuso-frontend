export default defineEventHandler(async (event) => {
    const session = await getUserSession(event)
    const backendUrl = process.env.BACKEND_API_BASE || 'https://mumusoadmin.coderdrivelab.com/api/v1/'

    if (!session?.user?.token) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized'
        })
    }

    try {
        const body = await readBody(event)

        return await $fetch(`${backendUrl}user/addresses`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${session.user.token}`
            },
            body
        })
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.data?.message || 'Failed to create address'
        })
    }
})
