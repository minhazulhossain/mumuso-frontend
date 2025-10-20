export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)

  try {
    const response = await $fetch(`${config.public.apiBase}blog`, {
      query: {
        per_page: query._limit || 9,
        page: query._page || 1,
        search: query.search,
        category: query.category // if you add category support later
      }
    })

    console.log('response', response)

    // Transform Laravel pagination to match your frontend format
    return {
      posts: response.data,
      total: response.meta.total,
      page: response.meta.current_page,
      totalPages: response.meta.last_page,
      perPage: response.meta.per_page
    }
  } catch (error) {
    console.log(error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to fetch blog posts'
    })
  }
})