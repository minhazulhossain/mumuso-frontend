export default defineNuxtConfig({
    modules: ['@nuxt/ui', '@nuxt/image', '@nuxt/fonts', 'nuxt-auth-utils'],
    css: [
        '~/assets/css/main.css'
    ],

    ui: {
        fonts: false,
        theme: {
            defaultVariants: {
                color: 'primary',
                size: 'sm'
            }
        },
        colors: {
            primary: {
                50:  '#ecfdf8',
                100: '#d1faee',
                200: '#a7f3df',
                300: '#6ee7c9',
                400: '#39d2ad',
                500: '#33b68f', // your base
                600: '#279b78',
                700: '#1f7d63',
                800: '#1c6452',
                900: '#195346',
                950: '#083126',
            },
        }
    },

    fonts: {
        families: [
            {
                name: 'Outfit',
                provider: 'google',
                weights: [300, 400, 500, 600, 700],
            },
        ],
    },

    colorMode: {
        preference: 'light'
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

    vite: {
        build: {
            cssMinify: 'esbuild'
        }
    },

    compatibilityDate: '2024-11-16', // ✅ Fixed - current date

    nitro: {
        preset: 'node-server',
        compressPublicAssets: true,
        // ✅ Removed problematic proxy
    },

    devtools: { enabled: process.env.NODE_ENV !== 'production' }, // ✅ Disable in production

    runtimeConfig: {
        // Backend API URL - used by server-side code and client-side code
        public: {
            apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://mumusoadmin.coderdrivelab.com/api/v1/'
        },
        // ✅ Session config for nuxt-auth-utils
        // WARNING: Must be set via environment variable in production
        session: {
            password: process.env.NUXT_SESSION_PASSWORD || 'dev-secret-key-change-in-production-min-32-xxx'
        }
    }
})

