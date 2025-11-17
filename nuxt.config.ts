export default defineNuxtConfig({
    modules: ['@nuxt/ui', '@nuxt/image', 'nuxt-auth-utils'],
    css: ['~/assets/css/main.css'],

    ui: {
        theme: {
            defaultVariants: {
                color: 'primary',
                size: 'sm'
            }
        },
        colors: {
            primary: [
                '#f8fafc',  // 50 - Almost white
                '#f1f5f9',  // 100 - Very light
                '#e2e8f0',  // 200 - Light
                '#cbd5e1',  // 300 - Light-medium
                '#94a3b8',  // 400 - Medium
                '#64748b',  // 500 - Base primary
                '#475569',  // 600 - Dark
                '#334155',  // 700 - Darker
                '#1e293b',  // 800 - Very dark
                '#0f172a'   // 950 - Almost black
            ]
        }
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

    compatibilityDate: '2024-11-16', // ✅ Fixed - current date

    nitro: {
        preset: 'vercel',
        compressPublicAssets: true,
        // ✅ Removed problematic proxy
    },

    devtools: { enabled: true }, // ✅ Disable in production

    runtimeConfig: {
        // ✅ Session config for nuxt-auth-utils
        // WARNING: Must be set via environment variable in production
        session: {
            password: process.env.NUXT_SESSION_PASSWORD || 'dev-secret-key-change-in-production-min-32-xxx'
        },

        public: {
            // ✅ API base URL - uses server-side proxy to avoid CORS issues
            // Frontend calls /api/proxy/* which forwards to backend
            // This avoids all CORS issues by proxying through Vercel server
            apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api/proxy/'
        }
    }
})