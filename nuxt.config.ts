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

    nitro: {
        devProxy: {
            '/api': {
                target: 'http://127.0.0.1:8000/api/v1',
                changeOrigin: true,
                cookieDomainRewrite: {
                    '*': ''
                }
            },
            '/sanctum': {
                target: 'http://127.0.0.1:8000/sanctum',
                changeOrigin: true,
                cookieDomainRewrite: {
                    '*': ''
                }
            }
        }
    },

    runtimeConfig: {
        public: {
            // For direct API calls (products, etc.)
            apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://127.0.0.1:8000/api/v1/',
            cartBase: process.env.NUXT_CART_URL || 'http://127.0.0.1:8000/',

            // NEW: For proxied cart API calls (with credentials/CSRF)
            cartApiBase: '/api/',  // This uses the proxy
            sanctumBase: '/sanctum/'  // This uses the proxy
        }
    }
})