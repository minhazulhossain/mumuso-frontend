export const useContent = () => {

    const config = useRuntimeConfig()
    // Use /api routes to avoid CORS issues on client
    const apiBase = '/api/'

    const fetchHome = () => {
        return useFetch(`${apiBase}content/home`, {
            key: 'home-sections',
            server: true,
            transform: (response: ApiResponse) => {
                return response?.data?.sections || []
            },
            getCachedData: (key) => {
                return useNuxtApp().static.data[key] ?? useNuxtApp().payload.data[key]
            },
        })
    }

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
        let response = await $fetch<ApiResponse<Category[]>>(`${apiBase}content/navigation-items`)

        if (!response?.status) {
            throw new Error(response.message)
        }

        return response.data

    }

    const fetchFeaturedCategories = async () => {

        return useFetch(`${apiBase}categories/featured`, {
            key: 'featured-categories',
            server: true,
            // Support multiple backend shapes: [] | { data: [] } | { data: { data: [] } }
            transform: (response: any) => {
                if (Array.isArray(response)) return response
                if (Array.isArray(response?.data)) return response.data
                if (Array.isArray(response?.data?.data)) return response.data.data
                return []
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
        fetchHome,
        fetchHeroBanners,
        fetchCategories,
        fetchFeaturedCategories,
        fetchCategory
    }
}
