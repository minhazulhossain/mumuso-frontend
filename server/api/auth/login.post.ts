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
        // Get guest cart before login
        const guestCart = await getGuestCart(event)

        // Call Laravel API
        const response = await $fetch<{
            user: any
            access_token: string
            token_type: string
        }>(`${config.public.apiBase}login`, {
            method: 'POST',
            body: { email, password }
        })

        // Set user session in cookie
        await replaceUserSession(event, {
            user: {
                id: response.user.id,
                name: response.user.name,
                email: response.user.email,
                token: response.access_token,
            },
        })

        // Sync guest cart to backend if it has items
        if (guestCart.items.length > 0) {
            await syncGuestCartToBackend(event, guestCart.items)
        }

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