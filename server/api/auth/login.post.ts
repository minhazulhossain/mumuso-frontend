import { z } from 'zod'

const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const { email, password } = await readValidatedBody(event, bodySchema.parse)

    console.log(`${config.public.apiBase}/v1/login`)


    try {
        // Call Laravel API
        const response = await $fetch<{
            user: any
            access_token: string
            token_type: string
        }>(`${config.public.apiBase}/v1/login`, {
            method: 'POST',
            body: { email, password }
        })

        // Set user session in cookie
        /*await replaceUserSession(event, {
            user: {
                ...response.user,
                token: response.access_token  // Store token inside user object
            }
        })*/

        await replaceUserSession(event, {
            user: {
                id: response.user.id,
                name: response.user.name,
                email: response.user.email,
                token: response.access_token, // ✅ include token
            },
        })

        return {
            user: response.user
        }
    } catch (error: any) {

        throw createError({
            statusCode: error.statusCode || 401,
            message: error.data?.message || 'Invalid credentials',
        })
    }
})