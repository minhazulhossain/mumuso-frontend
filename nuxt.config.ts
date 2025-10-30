export default defineNuxtConfig({
    modules: ['@nuxt/ui', '@nuxt/image', 'nuxt-auth-utils'],
    css: ['~/assets/css/main.css'],

    ui: {
        theme: {
            defaultVariants: {
                color: 'neutral',
                size: 'sm'
            }
        }
    },

    image: {
        quality: 80,
        format: ['webp', 'avif', 'jpeg'],
        screens: {
            xs: 320,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
            xxl: 1536
        }
    },

    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },

    // Nuxt 4.2.0 experimental features for better performance
    experimental: {
        // Reduces JS bundle size by ~39% for prerendered sites
        asyncDataHandlerExtraction: true,
        // Enhanced TypeScript support with smart component features
        typescriptPlugin: false, // Set to true if you want advanced TS features
    },

    runtimeConfig: {
        public: {
            // Backend API base URL - used by server routes
            apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://127.0.0.1:8000/api/v1/'
        }
    }
})