// server/api/auth/register.post.ts
import { z } from 'zod'

const bodySchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    password_confirmation: z.string().min(8),
})

export default defineEventHandler(async (event) => {
    const body = await readValidatedBody(event, bodySchema.parse)
    const backendUrl = process.env.BACKEND_API_BASE || 'https://admin.mumuso.com.bd/api/v1/'

    try {
        const response = await $fetch<{
            user: any
            access_token: string
        }>(`${backendUrl}register`, {
            method: 'POST',
            body
        })

        return await setupUserSession(event, response)
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 400,
            message: error.data?.message || 'Registration failed',
        })
    }
})