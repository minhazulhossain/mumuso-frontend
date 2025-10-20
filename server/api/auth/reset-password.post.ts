import { z } from 'zod'

const bodySchema = z.object({
    token: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    password_confirmation: z.string().min(8)
})

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const body = await readValidatedBody(event, bodySchema.parse)

    try {
        return await $fetch(`${config.public.apiBase}reset-password`, {
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