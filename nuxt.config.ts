// nuxt.config.ts - Support BOTH proxied and direct API calls
export default defineNuxtConfig({
    modules: ['@nuxt/ui', 'nuxt-auth-utils'],
    css: ['~/assets/css/main.css'],

    ui: {
        theme: {
            defaultVariants: {
                color: 'neutral',
                size: 'sm'
            }
        }
    },

    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },

    runtimeConfig: {
        public: {
            // Backend API base URL - used by server routes
            apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://127.0.0.1:8000/api/v1/'
        }
    }
})