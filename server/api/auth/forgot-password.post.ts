import { z } from 'zod'

const bodySchema = z.object({
    email: z.string().email()
})

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const body = await readValidatedBody(event, bodySchema.parse)

    try {
        return await $fetch(`${config.public.apiBase}forgot-password`, {
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