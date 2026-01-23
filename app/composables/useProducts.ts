import type {Ref} from 'vue'
// import type {Product, Category, Pagination, ProductFilters} from '../../types';

export const useProducts = () => {
    const config = useRuntimeConfig()
    // Use /api routes to avoid CORS issues on client
    const apiUrl = '/api/'

    // State
    const products: Ref<Product[]> = useState('products', () => [])
    const categories: Ref<Category[]> = useState('categories', () => [])
    const pagination: Ref<Pagination | null> = useState('pagination', () => null)
    const loading = useState('products-loading', () => false)
    const error: Ref<string | null> = useState('products-error', () => null)
    const cachedFilters: Ref<ProductFilters> = useState('cached-filters', () => ({}))

    const normalizeBoolean = (value: any): boolean | null => {
        if (value === null || value === undefined) return null
        if (typeof value === 'boolean') return value
        if (typeof value === 'number') return value > 0
        if (typeof value === 'string') {
            const normalized = value.trim().toLowerCase()
            if (['1', 'true', 'yes', 'in_stock', 'instock', 'available'].includes(normalized)) return true
            if (['0', 'false', 'no', 'out_of_stock', 'outofstock', 'unavailable'].includes(normalized)) return false
        }
        return null
    }

    const normalizeStockQuantity = (value: any): number => {
        if (value && typeof value === 'object') {
            const nested =
                value.available_stock ??
                value.stock_quantity ??
                value.quantity ??
                value.qty
            const nestedNum = Number(nested)
            return Number.isFinite(nestedNum) ? nestedNum : 0
        }
        const num = Number(value)
        return Number.isFinite(num) ? num : 0
    }

    const normalizeStockStatus = (value: any, quantity: number, inStock: boolean | null): string => {
        if (typeof value === 'string') {
            const normalized = value.trim().toLowerCase()
            if (normalized.includes('in')) return 'in_stock'
            if (normalized.includes('out')) return 'out_of_stock'
        }
        if (typeof value === 'boolean') return value ? 'in_stock' : 'out_of_stock'
        if (typeof value === 'number') return value > 0 ? 'in_stock' : 'out_of_stock'
        if (inStock !== null) return inStock ? 'in_stock' : 'out_of_stock'
        return quantity > 0 ? 'in_stock' : 'out_of_stock'
    }

    const normalizeInStock = (value: any, quantity: number, stockStatus: any): boolean => {
        const normalized = normalizeBoolean(value)
        if (normalized !== null) return normalized
        const status = normalizeStockStatus(stockStatus, quantity, null)
        if (status === 'in_stock') return true
        if (status === 'out_of_stock') return false
        return quantity > 0
    }

    const normalizeVariation = (variation: any) => {
        const stockQuantity = normalizeStockQuantity(
            variation?.stock_quantity ?? variation?.available_stock ?? variation?.stock ?? variation?.quantity ?? variation?.qty ?? 0
        )
        const inStock = normalizeInStock(
            variation?.in_stock ?? variation?.is_in_stock ?? variation?.inStock ?? variation?.available ?? variation?.is_available,
            stockQuantity,
            variation?.stock_status
        )
        const stockStatus = normalizeStockStatus(variation?.stock_status, stockQuantity, inStock)

        return {
            ...variation,
            stock_quantity: stockQuantity,
            in_stock: inStock,
            stock_status: stockStatus
        }
    }

    const normalizeProduct = (product: any) => {
        const stockQuantity = normalizeStockQuantity(
            product?.stock_quantity ?? product?.available_stock ?? product?.stock ?? product?.quantity ?? product?.qty ?? 0
        )
        const baseInStock = normalizeInStock(
            product?.in_stock ?? product?.is_in_stock ?? product?.inStock ?? product?.available ?? product?.is_available,
            stockQuantity,
            product?.stock_status
        )
        const variations = Array.isArray(product?.variations)
            ? product.variations.map(normalizeVariation)
            : product?.variations
        const variationsInStock = Array.isArray(variations)
            ? variations.some(v => v?.stock_status === 'in_stock' && (v?.stock_quantity || 0) > 0)
            : false
        const inStock = variationsInStock || baseInStock
        const stockStatus = normalizeStockStatus(product?.stock_status, stockQuantity, inStock)

        return {
            ...product,
            variations,
            stock_quantity: stockQuantity,
            in_stock: inStock,
            stock_status: stockStatus
        }
    }

    /**
     * Build query parameters from filters
     */
    const buildQueryParams = (filters: ProductFilters): Record<string, string> => {
        const params: Record<string, string> = {}

        if (filters.category && filters.category !== 'all') {
            params.category = filters.category
        }
        if (filters.featured !== undefined) {
            params.featured = filters.featured ? '1' : '0'
        }
        if (filters.in_stock !== undefined) {
            params.in_stock = filters.in_stock ? '1' : '0'
        }
        if (filters.min_price) {
            params.min_price = filters.min_price.toString()
        }
        if (filters.max_price) {
            params.max_price = filters.max_price.toString()
        }
        if (filters.search) {
            params.search = filters.search
        }
        if (filters.on_sale) {
            params.on_sale = '1'
        }
        if (filters.page) {
            params.page = filters.page.toString()
        }

        return params
    }

    // Fetch products with filters
    const fetchProducts = async (filters: ProductFilters = {}) => {
        loading.value = true
        error.value = null

        try {
            const queryParams = buildQueryParams(filters)

            const response = await $fetch<{
                data: Product[]
                meta?: {
                    total: number
                    per_page: number
                    current_page: number
                    last_page: number
                    from: number
                    to: number
                }
            }>(`${apiUrl}products`, {
                query: queryParams
            })

            products.value = (response.data || []).map(normalizeProduct)

            // Set pagination if exists
            if (response.meta) {
                pagination.value = {
                    total: response.meta.total,
                    perPage: response.meta.per_page,
                    currentPage: response.meta.current_page,
                    lastPage: response.meta.last_page,
                    from: response.meta.from,
                    to: response.meta.to,
                    hasMorePages: response.meta.current_page < response.meta.last_page,
                }
            }

            // Cache filters
            cachedFilters.value = filters

            return {products: products.value, pagination: pagination.value}
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch products'
            console.error('Error fetching products:', err)
            throw err
        } finally {
            loading.value = false
        }
    }

    // Fetch single product
    const fetchProduct = async (slug: string) => {
        error.value = null

        try {
            const response = await $fetch<{ data: Product }>(
                `${apiUrl}products/${slug}`
            )

            return normalizeProduct(response.data)
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch product'
            throw err
        }
    }

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const response = await $fetch<{ data: Category[] }>(
                `${apiUrl}content/navigation-items`
            )

            categories.value = response.data || []
            return categories.value
        } catch (err: any) {
            console.error('Error fetching categories:', err)
            return []
        }
    }

    // Change page
    const changePage = async (page: number, filters: ProductFilters = {}) => {
        await fetchProducts({...filters, page})
    }

    // Get featured products
    const getFeaturedProducts = async (limit: number = 8) => {
        return await fetchProducts({featured: true, page: 1})
    }

    // Get products by category
    const getProductsByCategory = async (categorySlug: string, limit?: number) => {
        return await fetchProducts({category: categorySlug})
    }

    // Search products
    const searchProducts = async (query: string) => {
        return await fetchProducts({search: query})
    }

    // Get related products (by category)
    const getRelatedProducts = async (product: Product, limit: number = 4) => {
        if (!product.categories || product.categories.length === 0) {
            return []
        }

        const categorySlug = product?.categories[0]?.slug
        const response = await fetchProducts({category: categorySlug})

        // Filter out current product and limit results
        return response.products
            .filter(p => p.id !== product.id)
            .slice(0, limit)
    }

    // Refresh current products
    const refresh = async () => {
        await fetchProducts(cachedFilters.value)
    }

    // Clear state
    const clear = () => {
        products.value = []
        pagination.value = null
        error.value = null
        cachedFilters.value = {}
    }

    // Computed
    const getAllCategories = computed(() => categories.value)
    const hasProducts = computed(() => products.value.length > 0)
    const totalProducts = computed(() => pagination.value?.total || 0)
    const hasMorePages = computed(() => pagination.value?.hasMorePages || false)

    // Initialize categories on first use
    if (categories.value.length === 0) {
        fetchCategories()
    }

    return {
        // State
        products: readonly(products),
        categories: readonly(categories),
        pagination: readonly(pagination),
        loading: readonly(loading),
        error: readonly(error),

        // Methods
        fetchProducts,
        fetchProduct,
        fetchCategories,
        changePage,
        getFeaturedProducts,
        getProductsByCategory,
        searchProducts,
        // getRelatedProducts,
        refresh,
        clear,

        // Computed
        getAllCategories,
        hasProducts,
        totalProducts,
        hasMorePages,
    }
}
