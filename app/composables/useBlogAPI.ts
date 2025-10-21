// composables/useBlogAPI.ts
export const useBlogAPI = () => {
  const fetchPosts = async (category?: string, page: number = 1, search?: string) => {
    const params: any = {
      _page: page,
      _limit: 9
    }

    if (category) params.category = category
    if (search) params.search = search

    return await $fetch('blog', { params })
  }

  const fetchCategories = async () => {
    return await $fetch('blog/categories')
  }

  const fetchPost = async (slug: string) => {
    return await $fetch(`blog/posts/${slug}`)
  }

  return {
    fetchPosts,
    fetchCategories,
    fetchPost
  }
}