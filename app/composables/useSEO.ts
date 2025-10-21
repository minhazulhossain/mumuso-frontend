// Helper composable for managing SEO on individual pages

interface SEOOptions {
    title?: string
    description?: string
    image?: string
    keywords?: string
    noIndex?: boolean
    canonical?: string
}

export const useSEO = (options: SEOOptions = {}) => {
    const settings = inject('settings') as any
    const route = useRoute()
    const config = useRuntimeConfig()

    const siteName = computed(() => settings?.value?.site?.name || 'My Website')
    const siteUrl = computed(() => settings?.value?.site?.url || config.public.apiBase)

    const pageTitle = computed(() => {
        const title = options.title || siteName.value
        return title === siteName.value ? title : `${title} - ${siteName.value}`
    })

    const pageDescription = computed(() =>
        options.description || settings?.value?.site?.description || 'Welcome to our website'
    )

    const pageImage = computed(() =>
        options.image ||
        settings?.value?.branding?.og_image ||
        settings?.value?.branding?.logo ||
        ''
    )

    const pageUrl = computed(() =>
        options.canonical || `${siteUrl.value}${route.path}`
    )

    const pageKeywords = computed(() => {
        const siteKeywords = settings?.value?.seo?.keywords || ''
        const pageKeywords = options.keywords || ''

        return pageKeywords
            ? `${pageKeywords}, ${siteKeywords}`
            : siteKeywords
    })

    const shouldIndex = computed(() => {
        if (options.noIndex) return false
        return settings?.value?.seo?.indexing ?? true
    })

    useHead({
        title: pageTitle.value,
        meta: [
            {
                name: 'description',
                content: pageDescription.value,
            },
            {
                name: 'keywords',
                content: pageKeywords.value,
            },
            {
                name: 'robots',
                content: shouldIndex.value ? 'index, follow' : 'noindex, nofollow',
            },
            // Open Graph
            {
                property: 'og:title',
                content: pageTitle.value,
            },
            {
                property: 'og:description',
                content: pageDescription.value,
            },
            {
                property: 'og:url',
                content: pageUrl.value,
            },
            {
                property: 'og:image',
                content: pageImage.value,
            },
            {
                property: 'og:type',
                content: 'website',
            },
            // Twitter Card
            {
                name: 'twitter:card',
                content: 'summary_large_image',
            },
            {
                name: 'twitter:title',
                content: pageTitle.value,
            },
            {
                name: 'twitter:description',
                content: pageDescription.value,
            },
            {
                name: 'twitter:image',
                content: pageImage.value,
            },
        ],
        link: [
            {
                rel: 'canonical',
                href: pageUrl.value,
            },
        ],
    })

    return {
        pageTitle,
        pageDescription,
        pageImage,
        pageUrl,
        pageKeywords,
        shouldIndex,
    }
}