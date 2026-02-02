export const useMenus = () => {
    const menus = useState<Record<string, any>>('menus', () => ({}))
    const loading = useState('menus-loading', () => false)
    const error = useState<string | null>('menus-error', () => null)

    /**
     * Normalize menu structure (handles different response formats)
     */
    const normalizeMenu = (menu: any) => {
        return {
            ...menu,
            slug: menu.slug || menu.name?.toLowerCase().replace(/\s+/g, '-'),
            name: menu.name || menu.label || menu.title,
            items: (menu.items || menu.children || []).map((item: any) => ({
                id: item.id,
                label: item.label || item.title || item.name,
                url: item.url || item.link || item.href || '#',
                children: item.children || []
            }))
        }
    }

    /**
     * Fetch all menus
     */
    const fetchAllMenus = async () => {
        loading.value = true
        error.value = null

        try {
            console.log('[useMenus] Fetching all menus')

            let response

            // Try primary menus endpoint first
            try {
                response = await $fetch<{
                    data: any[]
                    status: boolean
                    message: string
                }>('/api/menus')
            } catch (err) {
                console.log('[useMenus] Primary endpoint failed, trying menu-builder endpoint')
                response = await $fetch<{
                    data: any[]
                    status: boolean
                    message: string
                }>('/api/menu-builder')
            }

            if (response?.data && Array.isArray(response.data)) {
                // Store menus by slug for easy access
                response.data.forEach((menu: any) => {
                    const normalized = normalizeMenu(menu)
                    menus.value[normalized.slug] = normalized
                })
                console.log('[useMenus] Menus loaded:', Object.keys(menus.value).length)
            }

            return response?.data || []
        } catch (err: any) {
            error.value = err.data?.message || 'Failed to fetch menus'
            console.error('[useMenus] Error fetching all menus:', err)
            return []
        } finally {
            loading.value = false
        }
    }

    /**
     * Fetch specific menu by slug or ID
     */
    const fetchMenu = async (slug: string) => {
        // Return from cache if available
        if (menus.value[slug]) {
            console.log('[useMenus] Returning cached menu:', slug)
            return menus.value[slug]
        }

        loading.value = true
        error.value = null

        try {
            console.log('[useMenus] Fetching menu:', slug)

            let response

            // Try primary endpoint first
            try {
                response = await $fetch<{
                    data: any
                    status: boolean
                    message: string
                }>(`/api/menus/${slug}`)
            } catch (err) {
                console.log('[useMenus] Primary endpoint failed for', slug, 'trying menu-builder endpoint')
                response = await $fetch<{
                    data: any
                    status: boolean
                    message: string
                }>(`/api/menu-builder/${slug}`)
            }

            if (response?.data) {
                const normalized = normalizeMenu(response.data)
                menus.value[normalized.slug] = normalized
                console.log('[useMenus] Menu loaded:', slug)
                return normalized
            }

            return null
        } catch (err: any) {
            error.value = err.data?.message || `Failed to fetch menu: ${slug}`
            console.error(`[useMenus] Error fetching menu ${slug}:`, err)
            return null
        } finally {
            loading.value = false
        }
    }

    /**
     * Fetch multiple specific menus
     */
        // const fetchMenus = async (slugs: string[]) => {
        //   const results: Record<string, any> = {}
        //
        //   for (const slug of slugs) {
        //     const menu = await fetchMenu(slug)
        //     if (menu) {
        //       results[slug] = menu
        //     }
        //   }
        //
        //   console.log('[useMenus] Fetched multiple menus:', Object.keys(results).length)
        //   return results
        // }

    const fetchMenus = async (slugs: string[]) => {
            const results = await Promise.all(
                slugs.map(slug => $fetch(`/api/menus/${slug}`))
            )

            return Object.fromEntries(results.map((m: any) => [m.slug, m]))
        }

    /**
     * Get menu by slug from cache
     */
    const getMenu = (slug: string) => {
        return menus.value[slug] || null
    }

    /**
     * Get all cached menus
     */
    const getAllMenus = () => {
        return menus.value
    }

    return {
        menus: readonly(menus),
        loading: readonly(loading),
        error: readonly(error),
        fetchAllMenus,
        fetchMenu,
        fetchMenus,
        getMenu,
        getAllMenus
    }
}
