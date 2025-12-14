export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)

  try {
    const params = new URLSearchParams()
    params.append('per_page', String(query._limit || 9))
    params.append('page', String(query._page || 1))
    
    if (query.search) params.append('search', String(query.search))
    if (query.category) params.append('category', String(query.category))

    const queryStr = params.toString()
    const response = await $fetch(`${config.public.apiBase}blog?${queryStr}`)

    return {
      posts: response.data || [],
      total: response.meta?.total || 0,
      page: response.meta?.current_page || 1,
      totalPages: response.meta?.last_page || 1,
      perPage: response.meta?.per_page || 9,
      meta: response.meta
    }
  } catch (error: any) {
    console.error('[Blog API] Error fetching posts:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.data?.message || error.message || 'Failed to fetch blog posts'
    })
  }
})
