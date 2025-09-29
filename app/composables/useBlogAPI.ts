export const useBlogAPI = () => {
  const config = useRuntimeConfig()

  const fetchPosts = async (category?: string, page = 1, limit = 9) => {
    const query = new URLSearchParams({
      _page: page.toString(),
      _limit: limit.toString(),
      ...(category && { category })
    })
    
    return await $fetch(`/api/blog?${query}`)
  }

  const fetchPost = async (slug: string) => {
    return await $fetch(`/api/blog/${slug}`)
  }

  const fetchCategories = async () => {
    return await $fetch('/api/blog/categories')
  }

  const searchPosts = async (query: string) => {
    return await $fetch(`/api/posts/search?q=${query}`)
  }

  return {
    fetchPosts,
    fetchPost,
    fetchCategories,
    searchPosts
  }
}