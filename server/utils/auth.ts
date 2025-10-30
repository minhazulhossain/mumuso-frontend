// server/utils/auth.ts
import type { H3Event } from 'h3'
import type { BackendAuthResponse } from '#shared/types/auth'

/**
 * Set user session and sync guest cart to backend
 */
export const setupUserSession = async (
    event: H3Event,
    response: BackendAuthResponse
) => {
    // Get guest cart before setting session
    const guestCart = await getGuestCart(event)

    // Set user session
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
}
