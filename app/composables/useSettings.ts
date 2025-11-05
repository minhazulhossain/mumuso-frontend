import type { Settings, BrandingSettings, SiteSettings, SEOSettings, FooterSettings } from '#shared/types'

export const useSettings = () => {
    const config = useRuntimeConfig()
    const apiBase = config.public.apiBase || 'http://localhost:8000/api'

    // Fetch all settings
    const fetchSettings = () => {
        return useAsyncData<Settings>('settings', async () => {
            return await $fetch<Settings>(`${apiBase}settings`)
        }, {
            server: true,
            getCachedData: (key) => useNuxtApp().static.data[key] ?? useNuxtApp().payload.data[key],
        })
    }

    // Fetch only branding assets
    const fetchBranding = () => {
        return useFetch<BrandingSettings>(`${apiBase}settings/branding`, {
            key: 'branding',
            lazy: true,
        })
    }

    // Fetch only site settings
    const fetchSiteSettings = () => {
        return useFetch<SiteSettings>(`${apiBase}settings/site`, {
            key: 'site-settings',
            lazy: true,
        })
    }

    // Fetch only SEO settings
    const fetchSEO = () => {
        return useFetch<SEOSettings>(`${apiBase}settings/seo`, {
            key: 'seo-settings',
            lazy: true,
        })
    }

    // Fetch only social media links
    const fetchSocialMedia = () => {
        return useAsyncData<Settings>('social-media', async () => {
            return await $fetch<Settings>(`${apiBase}settings/social-media`)
        }, {
            server: true,
            getCachedData: (key) => useNuxtApp().static.data[key] ?? useNuxtApp().payload.data[key],
        })
    }

    // Fetch only footer settings
    const fetchFooterSettings = () => {
        return useFetch<FooterSettings>(`${apiBase}settings/footer`, {
            key: 'footer-settings',
            lazy: true,
        })
    }

    return {
        fetchSettings,
        fetchBranding,
        fetchSiteSettings,
        fetchSEO,
        fetchSocialMedia,
        fetchFooterSettings,
    }
}