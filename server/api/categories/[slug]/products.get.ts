export default defineEventHandler(async (event) => {
  const backendUrl = process.env.BACKEND_API_BASE || 'https://admin.mumuso.com.bd/api/v1/'
  const slug = getRouterParam(event, 'slug')
  const query = getQuery(event)

  console.log('Category products route - slug:', slug, 'query:', query)

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: 'Category slug is required'
    })
  }

  try {
    const finalQuery = {
      ...query,
      category: slug
    }

    console.log('Calling backend with query:', finalQuery)

    const response = await $fetch(`${backendUrl}products`, {
      query: finalQuery
    })

    console.log('Backend response received, items count:', response.data?.length)

    return response
  } catch (error: any) {
    console.error('Error fetching category products:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.data?.message || 'Failed to fetch category products'
    })
  }
})
