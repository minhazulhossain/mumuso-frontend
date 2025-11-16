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
        // ✅ Session config for nuxt-auth-utils - required for production
        session: {
            password: process.env.NUXT_SESSION_PASSWORD || (() => {
                if (process.env.NODE_ENV === 'production') {
                    throw new Error('NUXT_SESSION_PASSWORD environment variable is required in production')
                }
                return 'dev-password-min-32-characters-required-xxx'
            })()
        },

        public: {
            // ✅ API base URL - required
            apiBase: process.env.NUXT_PUBLIC_API_BASE || (() => {
                if (process.env.NODE_ENV === 'production') {
                    throw new Error('NUXT_PUBLIC_API_BASE environment variable is required in production')
                }
                return 'https://mumusoadmin.coderdrivelab.com/api/v1/'
            })()
        }
    }
})