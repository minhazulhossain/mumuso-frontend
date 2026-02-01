// types/settings.ts

/**
 * Branding assets settings
 */
export interface BrandingSettings {
    logo: string | null
    logo_dark: string | null
    favicon: string | null
    og_image: string | null
}

/**
 * Site configuration settings
 */
export interface SiteSettings {
    name: string
    tagline: string | null
    description: string
    url: string
    contact_email: string
    active: boolean
}

/**
 * SEO and analytics settings
 */
export interface SEOSettings {
    keywords: string | null
    google_analytics_id: string | null
    google_tag_manager_id: string | null
    indexing: boolean
}

/**
 * Company information settings
 */
export interface CompanySettings {
    name: string | null
    address: string | null
    phone: string | null
    timezone: string
}

/**
 * Social media link configuration
 */
export interface SocialMediaLink {
    platform: string
    platform_name?: string
    url: string
    username?: string
    is_active: boolean
    order: number
}

/**
 * Footer menu item
 */
export interface FooterMenuItem {
    label: string
    url: string
    opens_in_new_tab: boolean
    order: number
}

/**
 * Footer configuration settings
 */
export interface FooterSettings {
    menu_items: FooterMenuItem[]
    copyright: string | null
    description: string | null
    show_social: boolean
}

export interface CurrencyOption {
    code: string
    name?: string | null
    symbol?: string | null
}

export interface CurrencySettings {
    default: string
    options: CurrencyOption[]
}

export interface TopbarItem {
    text?: string | null
    label?: string | null
    message?: string | null
    title?: string | null
    is_active?: boolean
    order?: number
}

export interface TopbarSettings {
    enabled: boolean
    items: TopbarItem[]
}

/**
 * Complete settings object structure
 */
export interface Settings {
    branding: BrandingSettings
    site: SiteSettings
    seo: SEOSettings
    company: CompanySettings
    social_media: SocialMediaLink[]
    footer: FooterSettings
    currency: CurrencySettings
    topbar: TopbarSettings
}
