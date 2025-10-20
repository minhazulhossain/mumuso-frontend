import { z } from 'zod'

const bodySchema = z.object({
    email: z.string().email(),
    name: z.string().optional()
})

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const body = await readValidatedBody(event, bodySchema.parse)

    try {
        return await $fetch(`${config.public.apiBase}newsletter/subscribe`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body
        })
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500,
            data: error.data,
            message: error.data?.message || 'Subscription failed'
        })
    }
})