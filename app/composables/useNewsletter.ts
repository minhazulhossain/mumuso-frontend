// composables/useNewsletter.ts
export const useNewsletter = () => {
    const loading = ref(false)
    const error = ref<string | null>(null)
    const success = ref(false)

    const clearError = () => {
        error.value = null
    }

    const extractValidationMessage = (e: any): string | null => {
        const data = e?.data

        // Laravel style: { errors: { email: ["..."] } }
        const emailMsg = data?.errors?.email?.[0]
        if (emailMsg) return String(emailMsg)

        // generic errors: { errors: { field: ["..."] } }
        if (data?.errors && typeof data.errors === 'object') {
            const firstField = Object.keys(data.errors)[0]
            const firstMsg = Array.isArray(data.errors[firstField]) ? data.errors[firstField][0] : null
            if (firstMsg) return String(firstMsg)
        }

        // fallback message fields
        if (data?.message) return String(data.message)
        if (e?.message) return String(e.message)

        return null
    }


    const subscribe = async (email: string, name?: string) => {
        loading.value = true
        error.value = null
        success.value = false

        try {
            const payload = {
                email: (email || '').trim(),
                name: (name || '').trim(),
            }

            const response = await $fetch('/api/newsletter/subscribe', {
                method: 'POST',
                body: payload,
            })

            success.value = true
            return response
        } catch (e: any) {
            error.value = extractValidationMessage(e) || 'Subscription failed'
            throw e
        } finally {
            loading.value = false
        }
    }

    const verify = async (token: string) => {
        loading.value = true
        error.value = null
        try {
            return await $fetch(`/api/newsletter/verify/${encodeURIComponent(token)}`)
        } catch (e: any) {
            error.value = extractValidationMessage(e) || e?.message || 'Verification failed'
            throw e
        } finally {
            loading.value = false
        }
    }

    const unsubscribe = async (token: string) => {
        loading.value = true
        error.value = null
        try {
            return await $fetch(`/api/newsletter/unsubscribe/${encodeURIComponent(token)}`, {
                method: 'POST',
            })
        } catch (e: any) {
            error.value = extractValidationMessage(e) || e?.message || 'Unsubscribe failed'
            throw e
        } finally {
            loading.value = false
        }
    }

    return {
        loading,
        error,
        success,
        subscribe,
        verify,
        unsubscribe,
        clearError,
    }
}
