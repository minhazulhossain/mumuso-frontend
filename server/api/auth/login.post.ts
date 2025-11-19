// server/api/auth/login.post.ts
import { z } from 'zod'

const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export default defineEventHandler(async (event) => {
    const { email, password } = await readValidatedBody(event, bodySchema.parse)
    const backendUrl = process.env.BACKEND_API_BASE || 'https://mumusoadmin.coderdrivelab.com/api/v1/'

    try {
        const response = await $fetch<{
            user: any
            access_token: string
            token_type: string
        }>(`${backendUrl}login`, {
            method: 'POST',
            body: { email, password }
        })

        return await setupUserSession(event, response)
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 401,
            message: error.data?.message || 'Invalid credentials',
        })
    }
})