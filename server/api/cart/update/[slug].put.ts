import { z } from 'zod'

const bodySchema = z.object({
    quantity: z.number().min(1),
    variation_id: z.number().optional()
})

export default defineEventHandler(async (event) => {
    const slug = getRouterParam(event, 'slug')
    const body = await readValidatedBody(event, bodySchema.parse)
    const session = await getUserSession(event)

    if (session?.user?.token) {
        return await makeAuthenticatedRequest(event, `cart/update/${slug}`, {
            method: 'PUT',
            body,
            requireAuth: false
        })
    }

    return await updateGuestCartItem(event, slug!, body.quantity, body.variation_id)
})