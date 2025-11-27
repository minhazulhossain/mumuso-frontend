import { z } from 'zod'

const bodySchema = z.object({
  order_id: z.number(),
  method_id: z.number()
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readValidatedBody(event, bodySchema.parse)

    const result = await makeAuthenticatedRequest(event, 'shipping/calculate', {
      method: 'POST',
      body,
      requireAuth: true
    })

    return {
      success: true,
      data: result
    }
  } catch (error: any) {
    console.error('Error calculating shipping cost:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to calculate shipping cost'
    })
  }
})
