export const useContent = () => {

    const config = useRuntimeConfig()
    // Use /api routes to avoid CORS issues on client
    const apiBase = '/api/'

    const fetchHeroBanners = () => {
        return useFetch(`${apiBase}content/hero-banners`, {
            key: 'hero-banners',
            server: true,
            // Make sure this returns the data immediately
            transform: (response: ApiResponse) => {
                return response?.data || []
            },
            getCachedData: (key) => {
                return useNuxtApp().static.data[key] ?? useNuxtApp().payload.data[key]
            },
        })
    }

    const fetchCategories = async () => {
        let response = await $fetch<ApiResponse<Category[]>>(`${config.public.apiBase}content/navigation-items`)

        if (!response?.status) {
            throw new Error(response.message)
        }

        return response.data

    }

    const fetchFeaturedCategories = async () => {

        return useFetch(`${apiBase}categories/featured`, {
            key: 'featured-categories',
            server: true,
            // Make sure this returns the data immediately
            transform: (response: ApiResponse) => {
                return response?.data || []
            },
            getCachedData: (key) => {
                return useNuxtApp().static.data[key] ?? useNuxtApp().payload.data[key]
            },
        })
    }

    const fetchCategory = async (slug: string) => {
        return useFetch(`${apiBase}categories/${slug}`, {
            key: 'category-' + slug,
            server: true,
            // Make sure this returns the data immediately
            transform: (response: ApiResponse) => {
                return response?.data || []
            },
            getCachedData: (key) => {
                return useNuxtApp().static.data[key] ?? useNuxtApp().payload.data[key]
            },
        })
    }

    return {
        fetchHeroBanners,
        fetchCategories,
        fetchFeaturedCategories,
        fetchCategory
    }
}