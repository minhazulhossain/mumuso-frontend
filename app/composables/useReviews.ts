// composables/useReviews.ts
import type { Purchase, Review, ReviewStats, ReviewSortBy } from '#shared/types/review'

export const useReviews = (productId: string) => {
    const reviews = ref<Review[]>([])
    const stats = ref<ReviewStats | null>(null)
    const userPurchase = ref<Purchase | null>(null)
    const userReview = ref<Review | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)
    const config = useRuntimeConfig()

    // Normalize API base URL
    const apiBase = config.public.apiBase.replace(/\/$/, '')

    const fetchReviews = async (sortBy: ReviewSortBy = 'recent') => {
        loading.value = true
        error.value = null

        try {
            reviews.value = await $fetch<Review[]>(`${apiBase}/reviews/${productId}`, {
                query: { sortBy }
            })
        } catch (e: any) {
            error.value = e.message || 'Failed to fetch reviews'
        } finally {
            loading.value = false
        }
    }

    const fetchStats = async () => {
        try {
            const data = await $fetch<{ data: ReviewStats }>(`${apiBase}/reviews/${productId}/stats`)
            stats.value = data.data
        } catch (e: any) {
            console.error('Failed to fetch stats:', e)
        }
    }

    const checkPurchase = async () => {
        try {
            const data = await $fetch<{ data: Purchase | null }>(`${apiBase}/purchases/check/${productId}`, {
                headers: useRequestHeaders(['cookie'])
            })
            userPurchase.value = data.data
        } catch (e: any) {
            console.error('Failed to check purchase:', e)
        }
    }

    const fetchUserReview = async () => {
        try {
            const data = await $fetch<{ data: Review | null }>(`${apiBase}/reviews/${productId}/user-review`, {
                headers: useRequestHeaders(['cookie'])
            })
            userReview.value = data.data
        } catch (e: any) {
            console.error('Failed to fetch user review:', e)
        }
    }

    const submitReview = async (formData: FormData) => {
        loading.value = true
        error.value = null

        try {
            const data = await $fetch<{ data: Review }>(`${apiBase}/reviews/${productId}`, {
                method: 'POST',
                body: formData,
                headers: useRequestHeaders(['cookie'])
            })

            reviews.value.unshift(data.data)
            await Promise.all([fetchStats(), fetchUserReview()])

            return data.data
        } catch (e: any) {
            error.value = e.data?.message || 'Failed to submit review'
            throw e
        } finally {
            loading.value = false
        }
    }

    const markHelpful = async (reviewId: string, helpful: boolean) => {
        try {
            await $fetch(`${apiBase}/reviews/${reviewId}/helpful`, {
                method: 'POST',
                body: { helpful },
                headers: useRequestHeaders(['cookie'])
            })

            const review = reviews.value.find(r => r.id === reviewId)
            if (review) {
                helpful ? review.helpful++ : review.not_helpful++
            }
        } catch (e: any) {
            console.error('Failed to mark helpful:', e)
            throw e
        }
    }

    const deleteReview = async (reviewId: string) => {
        try {
            await $fetch(`${apiBase}/reviews/${reviewId}`, {
                method: 'DELETE',
                headers: useRequestHeaders(['cookie'])
            })

            reviews.value = reviews.value.filter(r => r.id !== reviewId)
            await fetchStats()
            userReview.value = null
        } catch (e: any) {
            throw new Error(e.data?.message || 'Failed to delete review')
        }
    }

    return {
        reviews,
        stats,
        userPurchase,
        userReview,
        loading,
        error,
        fetchReviews,
        fetchStats,
        checkPurchase,
        fetchUserReview,
        submitReview,
        markHelpful,
        deleteReview
    }
}