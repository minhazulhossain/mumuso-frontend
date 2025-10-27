// server/api/auth/login.post.ts
import { z } from 'zod'

const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const { email, password } = await readValidatedBody(event, bodySchema.parse)

    try {
        const response = await $fetch<{
            user: any
            access_token: string
            token_type: string
        }>(`${config.public.apiBase}login`, {
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