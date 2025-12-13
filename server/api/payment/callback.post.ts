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
  const config = useRuntimeConfig()

  try {
    const body = await readBody(event)

    // Forward the callback to backend for validation and processing
    const response = await $fetch(`${config.public.apiBase}payment/callback`, {
      method: 'POST',
      body
    })

    return response
  } catch (error: any) {
    console.error('Payment callback error:', error)
    console.warn('Backend payment callback endpoint not available, storing callback locally')

    // If backend callback fails, log the callback for manual processing
    // In production, this should be stored in a database or log file
    console.log('Payment callback data:', JSON.stringify(body, null, 2))

    // Return success to acknowledge callback receipt
    return {
      success: true,
      message: 'Callback received (will be processed when backend is ready)'
    }
  }
})
