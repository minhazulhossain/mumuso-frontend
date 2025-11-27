import { z } from 'zod'

const bodySchema = z.object({
  country: z.string(),
  state: z.string().optional(),
  postal_code: z.string().optional()
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readValidatedBody(event, bodySchema.parse)

    const methods = await makeAuthenticatedRequest(event, 'shipping/methods', {
      method: 'POST',
      body,
      requireAuth: false
    })

    return {
      success: true,
      data: methods
    }
  } catch (error: any) {
    console.error('Error fetching shipping methods:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Failed to fetch shipping methods'
    })
  }
})
