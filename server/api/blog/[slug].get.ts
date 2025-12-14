export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({
      statusCode: 400,
      message: 'Slug is required'
    })
  }

  try {
    const response = await $fetch(`${config.public.apiBase}blog/${slug}`)
    return response.data || response
  } catch (error: any) {
    console.error('[Blog API] Error fetching post:', error)
    throw createError({
      statusCode: error.statusCode || 404,
      message: error.data?.message || error.message || 'Post not found'
    })
  }
})
