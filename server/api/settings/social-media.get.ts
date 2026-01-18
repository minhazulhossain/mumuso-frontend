export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const backendUrl = config.public.apiBase

  try {
    const response = await $fetch(`${backendUrl}settings/social-media`)

    return response
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.data?.message || 'Failed to fetch social media settings'
    })
  }
})
