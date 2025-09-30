// composables/useReviews.ts
import type {Purchase, Review, ReviewForm, ReviewStats} from '../../types/review';

export const useReviews = (productId: string) => {
    const reviews = ref<Review[]>([])
    const stats = ref<ReviewStats | null>(null)
    const userPurchase = ref<Purchase | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    // Fetch reviews for a product
    const fetchReviews = async (sortBy: 'recent' | 'helpful' | 'rating' = 'recent') => {
        loading.value = true
        error.value = null

        try {
            reviews.value = await $fetch<Review[]>(`/api/reviews/${productId}`, {
                query: {sortBy}
            })
        } catch (e: any) {
            error.value = e.message || 'Failed to fetch reviews'
        } finally {
            loading.value = false
        }
    }

    // Fetch review statistics
    const fetchStats = async () => {
        try {
            stats.value = await $fetch<ReviewStats>(`/api/reviews/${productId}/stats`)
        } catch (e: any) {
            console.error('Failed to fetch stats:', e)
        }
    }

    // Check if user has purchased this product
    const checkPurchase = async () => {
        try {
            userPurchase.value = await $fetch<Purchase | null>(`/api/purchases/check/${productId}`)
        } catch (e: any) {
            console.error('Failed to check purchase:', e)
        }
    }

    // Submit a review
    const submitReview = async (formData: ReviewForm) => {
        loading.value = true
        error.value = null

        try {
            const data = await $fetch<Review>(`/api/reviews/${productId}`, {
                method: 'POST',
                body: formData
            })

            reviews.value.unshift(data)
            await fetchStats()

            if (userPurchase.value) {
                userPurchase.value.hasReviewed = true
            }

            return data
        } catch (e: any) {
            error.value = e.message || 'Failed to submit review'
            throw e
        } finally {
            loading.value = false
        }
    }

    // Mark review as helpful
    const markHelpful = async (reviewId: string, helpful: boolean) => {
        try {
            await $fetch(`/api/reviews/${reviewId}/helpful`, {
                method: 'POST',
                body: { helpful }
            })

            const review = reviews.value.find(r => r.id === reviewId)
            if (review) {
                if (helpful) {
                    review.helpful++
                } else {
                    review.notHelpful++
                }
            }
        } catch (e: any) {
            console.error('Failed to mark helpful:', e)
        }
    }

    // Delete review
    const deleteReview = async (reviewId: string) => {
        try {
            await $fetch(`/api/reviews/${reviewId}`, {
                method: 'DELETE'
            })

            reviews.value = reviews.value.filter(r => r.id !== reviewId)
            await fetchStats()

            if (userPurchase.value) {
                userPurchase.value.hasReviewed = false
            }
        } catch (e: any) {
            throw new Error(e.message || 'Failed to delete review')
        }
    }

    return {
        reviews,
        stats,
        userPurchase,
        loading,
        error,
        fetchReviews,
        fetchStats,
        checkPurchase,
        submitReview,
        markHelpful,
        deleteReview
    }
}