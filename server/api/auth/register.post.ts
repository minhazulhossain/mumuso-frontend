// server/api/auth/register.post.ts
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
        // Get guest cart before registration
        const guestCart = await getGuestCart(event)

        const response = await $fetch<{
            user: any
            access_token: string
        }>(`${config.public.apiBase}register`, {
            method: 'POST',
            body
        })

        await setUserSession(event, {
            user: {
                id: response.user.id,
                name: response.user.name,
                email: response.user.email,
                token: response.access_token
            }
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
            statusCode: error.statusCode || 400,
            message: error.data?.message || 'Registration failed',
        })
    }
})