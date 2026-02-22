/**
 * SSLCommerz Payment Callback Forwarder
 *
 * Optional endpoint to forward callback payloads to Laravel backend.
 * Backend source of truth routes:
 * - /api/v1/payments/success
 * - /api/v1/payments/fail
 * - /api/v1/payments/cancel
 * - /api/v1/payments/ipn
 */
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const query = getQuery(event)

  const allowedTypes = new Set(['success', 'fail', 'cancel', 'ipn'])
  const requestedType = String(query.type || '').toLowerCase()
  const callbackType = allowedTypes.has(requestedType) ? requestedType : 'ipn'

  try {
    const response = await $fetch(`${config.public.apiBase}payments/${callbackType}`, {
      method: 'POST',
      body
    })

    return response
  } catch (error: any) {
    console.error('Payment callback forwarding error:', {
      type: callbackType,
      message: error?.message,
      statusCode: error?.statusCode,
      data: error?.data
    })

    return {
      success: false,
      forwarded_to: `${config.public.apiBase}payments/${callbackType}`,
      callback_type: callbackType,
      message: 'Callback received but backend forwarding failed',
      payload: body
    }
  }
})
