import { z } from 'zod'

const bodySchema = z.object({
    email: z.string().email(),
    name: z.string().optional()
})

export default defineEventHandler(async (event) => {
    const body = await readValidatedBody(event, bodySchema.parse)
    const backendUrl = process.env.BACKEND_API_BASE || 'https://mumusoadmin.coderdrivelab.com/api/v1/'

    try {
        return await $fetch(`${backendUrl}newsletter/subscribe`, {
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