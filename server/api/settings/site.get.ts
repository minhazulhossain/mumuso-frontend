export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const backendUrl = config.public.apiBase

  try {
    const response = await $fetch(`${backendUrl}settings/site`)

    return response
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.data?.message || 'Failed to fetch site settings'
    })
  }
})
