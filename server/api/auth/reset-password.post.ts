import { z } from 'zod'

const bodySchema = z.object({
    token: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    password_confirmation: z.string().min(8)
})

export default defineEventHandler(async (event) => {
    const body = await readValidatedBody(event, bodySchema.parse)
    const backendUrl = process.env.BACKEND_API_BASE || 'https://mumusoadmin.coderdrivelab.com/api/v1/'

    try {
        return await $fetch(`${backendUrl}reset-password`, {
            method: 'POST',
            body
        })
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.data?.message || 'Password reset failed'
        })
    }
})