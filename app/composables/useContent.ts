import type {HeroBanner, Category} from "~~/types/content";
import type {ApiResponse} from "../../types/api";


export const useContent = () => {

    const config = useRuntimeConfig()

    const fetchHeroBanners = async () => {
        let response = await $fetch<ApiResponse<HeroBanner[]>>(`${config.public.apiBase}content/hero-banners`)

        if (!response.status) {
            throw new Error(response.message)
        }

        return response.data

    }

    const fetchCategories = async () => {
        let response = await $fetch<ApiResponse<Category[]>>(`${config.public.apiBase}content/navigation-items`)

        if (!response?.status) {
            throw new Error(response.message)
        }

        return response.data

    }

    return {
        fetchHeroBanners,
        fetchCategories
    }
}