export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const backendUrl = process.env.BACKEND_API_BASE || 'https://mumusoadmin.coderdrivelab.com/api/v1/'

  try {
    const response = await $fetch(`${backendUrl}blog`, {
      query: {
        per_page: query._limit || 9,
        page: query._page || 1,
        search: query.search,
        category: query.category // if you add category support later
      }
    })

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