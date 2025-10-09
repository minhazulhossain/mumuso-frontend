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
    devtools: {enabled: true},
    nitro: {
        devProxy: {
            '/api': {
                target: 'http://127.0.0.1:8000/api',
                changeOrigin: true,
            }
        }
    },
    runtimeConfig: {
        public: {
            apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://127.0.0.1:8000/api/v1/',
            cartBase: process.env.NUXT_CART_URL || 'http://127.0.0.1:8000/',
        }
    }
})