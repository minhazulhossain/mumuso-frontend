import type {BlogQueryParams} from '#shared/types/blog'

/**
 * Blog API composable for fetching blog posts and categories
 * Uses backend Laravel API endpoints
 */
export const useBlogAPI = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Fetch blog posts with pagination and filtering
   */
  const fetchPosts = async (category?: string, page: number = 1, search?: string) => {
    loading.value = true
    error.value = null

    try {
      const params: BlogQueryParams = {
        _page: page,
        _limit: 9
      }

      if (category) params.category = category
      if (search) params.search = search

      return await $fetch('/api/blog', {query: params})
    } catch (err: any) {
      error.value = err.data?.message || err.message || 'Failed to fetch posts'
      console.error('[useBlogAPI] Error fetching posts:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  /**
   * Fetch blog categories
   */
  const fetchCategories = async () => {
    loading.value = true
    error.value = null

    try {
      return await $fetch('/api/blog/categories')
    } catch (err: any) {
      error.value = err.data?.message || err.message || 'Failed to fetch categories'
      console.error('[useBlogAPI] Error fetching categories:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  /**
   * Fetch a single blog post by slug
   */
  const fetchPost = async (slug: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await $fetch(`/api/blog/${slug}`)
      return response
    } catch (err: any) {
      error.value = err.data?.message || err.message || 'Failed to fetch post'
      console.error('[useBlogAPI] Error fetching post:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    loading: readonly(loading),
    error: readonly(error),
    fetchPosts,
    fetchCategories,
    fetchPost
  }
}
