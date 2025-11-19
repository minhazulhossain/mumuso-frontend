/**
 * SSLCommerz Payment Callback Handler
 * Handles success/failed/cancelled responses from SSLCommerz payment gateway
 *
 * Backend Documentation:
 * The backend should implement the SSL Commerz integration and handle:
 * - Payment validation
 * - Order status updates
 * - Transaction recording
 *
 * This endpoint forwards the callback data to the backend for processing
 */
export default defineEventHandler(async (event) => {
  const backendUrl = process.env.BACKEND_API_BASE || 'https://mumusoadmin.coderdrivelab.com/api/v1/'

  try {
    const body = await readBody(event)

    // Forward the callback to backend for validation and processing
    const response = await $fetch(`${backendUrl}payment/callback`, {
      method: 'POST',
      body
    })

    return response
  } catch (error: any) {
    console.error('Payment callback error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.data?.message || 'Failed to process payment callback'
    })
  }
})
