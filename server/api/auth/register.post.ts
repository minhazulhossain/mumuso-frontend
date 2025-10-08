import { z } from 'zod'

const bodySchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    password_confirmation: z.string().min(8),
})

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const body = await readValidatedBody(event, bodySchema.parse)

    try {
        const response = await $fetch<{
            user: any
            access_token: string
        }>(`${config.public.apiBase}register`, {
            method: 'POST',
            body
        })

        await setUserSession(event, {
            user: response.user,
            token: response.access_token
        })

        return {
            user: response.user
        }
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 400,
            message: error.data?.message || 'Registration failed',
        })
    }
})
