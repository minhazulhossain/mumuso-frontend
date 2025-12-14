export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  try {
    const response = await $fetch(`${config.public.apiBase}blog/categories`)
    return response.data || []
  } catch (error: any) {
    console.error('[Blog Categories API] Error fetching categories:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.data?.message || error.message || 'Failed to fetch categories'
    })
  }
})
