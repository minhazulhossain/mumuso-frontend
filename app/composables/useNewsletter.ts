// composables/useNewsletter.ts
export const useNewsletter = () => {
    const loading = ref(false)
    const error = ref<string | null>(null)
    const success = ref(false)

    const subscribe = async (email: string, name?: string) => {
        loading.value = true
        error.value = null
        success.value = false

        try {
            const response = await $fetch('/api/newsletter/subscribe', {
                method: 'POST',
                body: {
                    email,
                    name,
                },
            })

            success.value = true
            return response
        } catch (e: any) {
            error.value = e.data?.message || e.message || 'Subscription failed'
            throw e
        } finally {
            loading.value = false
        }
    }

    const verify = async (token: string) => {
        try {
            return await $fetch(`/api/newsletter/verify/${token}`)
        } catch (e: any) {
            throw e
        }
    }

    const unsubscribe = async (token: string) => {
        try {
            return await $fetch(`/api/newsletter/unsubscribe/${token}`, {
                method: 'POST'
            })
        } catch (e: any) {
            throw e
        }
    }

    return {
        loading,
        error,
        success,
        subscribe,
        verify,
        unsubscribe,
    }
}