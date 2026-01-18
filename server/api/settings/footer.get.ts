export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const backendUrl = config.public.apiBase

  try {
    const response = await $fetch(`${backendUrl}settings/footer`)

    return response
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.data?.message || 'Failed to fetch footer settings'
    })
  }
})
