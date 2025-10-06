import type {HeroBanner} from "~~/types/content";

export const useContent = () => {

    const config = useRuntimeConfig()

    const fetchHeroBanners = async () => {
        return await $fetch<HeroBanner[]>(`${config.public.apiBase}/v1/content/hero-banners`)
    }

    return {
        fetchHeroBanners
    }
}