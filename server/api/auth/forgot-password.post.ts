import { z } from 'zod'

const bodySchema = z.object({
    email: z.string().email()
})

export default defineEventHandler(async (event) => {
    const body = await readValidatedBody(event, bodySchema.parse)
    const backendUrl = process.env.BACKEND_API_BASE || 'https://admin.mumuso.com.bd/api/v1/'

    try {
        return await $fetch(`${backendUrl}forgot-password`, {
            method: 'POST',
            body
        })
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.data?.message || 'Failed to send reset link'
        })
    }
})