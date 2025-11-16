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

    compatibilityDate: '2024-11-16', // ✅ Fixed - current date

    nitro: {
        preset: 'vercel',
        compressPublicAssets: true,
        // ✅ Removed problematic proxy
    },

    devtools: { enabled: false }, // ✅ Disable in production

    runtimeConfig: {
        // ✅ Session config for nuxt-auth-utils
        // WARNING: Must be set via environment variable in production
        session: {
            password: process.env.NUXT_SESSION_PASSWORD || 'dev-secret-key-change-in-production-min-32-xxx'
        },

        public: {
            // ✅ API base URL - uses CORS proxy for HTTP backend support
            // Production (Vercel HTTPS) uses CORS proxy to call HTTP backend
            // Development (local HTTP) calls backend directly
            apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://api.allorigins.win/raw?url=http://mumusoadmin.coderdrivelab.com/api/v1/'
        }
    }
})