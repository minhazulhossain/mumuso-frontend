export default defineEventHandler(async (event) => {
    const backendUrl = process.env.BACKEND_API_BASE || 'https://admin.mumuso.com.bd/api/v1/'
    const body = await readBody(event)

    try {
        return await $fetch(`${backendUrl}newsletter/subscribe`, {
            method: 'POST',
            body
        })
    } catch (err: any) {
        // ✅ forward backend error properly
        const statusCode = err?.statusCode || err?.response?.status || 500
        const data = err?.data || err?.response?._data || null

        // pick a friendly message
        const msg =
            data?.message ||
            data?.errors?.email?.[0] ||
            'Subscription failed'

        throw createError({
            statusCode,
            statusMessage: err?.statusMessage || 'Validation Error',
            message: msg,
            data // ✅ keep full errors object
        })
    }
})
