export const useBlogAPI = () => {
  const fetchPosts = async (category?: string, page: number = 1, search?: string) => {
    const params: BlogQueryParams = {
      _page: page,
      _limit: 9
    }

    if (category) params.category = category
    if (search) params.search = search
    return await $fetch('/api/blog', { query: params })
  }

  const fetchCategories = async () => {
    return await $fetch('/api/blog/categories')
  }

  const fetchPost = async (slug: string) => {
    return await $fetch(`/api/blog/${slug}`)
  }

  return {
    fetchPosts,
    fetchCategories,
    fetchPost
  }
}