export interface BrandingSettings {
    logo: string | null
    logo_dark: string | null
    favicon: string | null
    og_image: string | null
}

export interface SiteSettings {
    name: string
    tagline: string | null
    description: string
    url: string
    contact_email: string
    active: boolean
}

export interface SEOSettings {
    keywords: string | null
    google_analytics_id: string | null
    google_tag_manager_id: string | null
    indexing: boolean
}

export interface CompanySettings {
    name: string | null
    address: string | null
    phone: string | null
    timezone: string
}

export interface SocialMediaLink {
    platform: string
    platform_name?: string
    url: string
    username?: string
    is_active: boolean
    order: number
}

export interface FooterMenuItem {
    label: string
    url: string
    opens_in_new_tab: boolean
    order: number
}

export interface FooterSettings {
    menu_items: FooterMenuItem[]
    copyright: string | null
    description: string | null
    show_social: boolean
}

export interface Settings {
    branding: BrandingSettings
    site: SiteSettings
    seo: SEOSettings
    company: CompanySettings
    social_media: SocialMediaLink[]
    footer: FooterSettings
}

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