import { z } from 'zod'

const bodySchema = z.object({
    slug: z.string(),
    quantity: z.number().min(1).default(1)
})

export default defineEventHandler(async (event) => {
    const body = await readValidatedBody(event, bodySchema.parse)
    const session = await getUserSession(event)

    // If authenticated, use backend
    if (session?.user?.token) {
        return await makeAuthenticatedRequest(event, 'cart/add', {
            method: 'POST',
            body,
            requireAuth: false
        })
    }

    // For guests, just store slug and quantity
    return await addToGuestCart(event, body.slug, body.quantity)
})