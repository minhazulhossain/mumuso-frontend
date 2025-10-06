// composables/useProducts.ts
import type { Ref } from 'vue'

export interface ProductVariation {
    id: number
    product_id: number
    name: string
    sku: string
    price: number
    stock: number
    is_active: boolean
    created_at: string
    updated_at: string
}

export interface Product {
    id: number
    name: string
    sku: string
    description: string | null
    price: number
    is_active: boolean
    is_featured: boolean
    image_url: string | null
    variations: ProductVariation[]
    created_at: string
    updated_at: string
}

export interface ProductsResponse {
    success: boolean
    message: string
    data: {
        current_page: number
        data: Product[]
        first_page_url: string
        from: number
        last_page: number
        last_page_url: string
        links: Array<{
            url: string | null
            label: string
            active: boolean
        }>
        next_page_url: string | null
        path: string
        per_page: number
        prev_page_url: string | null
        to: number
        total: number
    }
}

export interface ProductFilters {
    search?: string
    is_active?: boolean | null
    is_featured?: boolean | null
    per_page?: number
    page?: number
}

export const useProducts = () => {
    const config = useRuntimeConfig()
    const baseURL = config.public.apiBase || 'http://127.0.0.1:8000/api'

    // State
    const products = ref<Product[]>([])
    const pagination = ref<any>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    // Fetch products with filters
    const fetchProducts = async (filters: ProductFilters = {}) => {
        loading.value = true
        error.value = null

        try {
            const { data, error: fetchError } = await useFetch<ProductsResponse>(
                '/products',
                {
                    baseURL,
                    params: {
                        search: filters.search || undefined,
                        is_active: filters.is_active !== null ? filters.is_active : undefined,
                        is_featured: filters.is_featured !== null ? filters.is_featured : undefined,
                        per_page: filters.per_page || 15,
                        page: filters.page || 1,
                    },
                    // Add headers if you need authentication
                    // headers: {
                    //   Authorization: `Bearer ${token}`,
                    // },
                }
            )

            if (fetchError.value) {
                throw new Error(fetchError.value.message)
            }

            if (data.value?.success) {
                products.value = data.value.data.data
                pagination.value = {
                    currentPage: data.value.data.current_page,
                    lastPage: data.value.data.last_page,
                    perPage: data.value.data.per_page,
                    total: data.value.data.total,
                    from: data.value.data.from,
                    to: data.value.data.to,
                }
            }
        } catch (e: any) {
            error.value = e.message || 'Failed to fetch products'
            console.error('Error fetching products:', e)
        } finally {
            loading.value = false
        }
    }

    // Fetch single product
    const fetchProduct = async (id: number) => {
        loading.value = true
        error.value = null

        try {
            const { data, error: fetchError } = await useFetch<{
                success: boolean
                message: string
                data: Product
            }>(`/products/${id}`, {
                baseURL,
            })

            if (fetchError.value) {
                throw new Error(fetchError.value.message)
            }

            return data.value?.data || null
        } catch (e: any) {
            error.value = e.message || 'Failed to fetch product'
            console.error('Error fetching product:', e)
            return null
        } finally {
            loading.value = false
        }
    }

    // Search products (debounced)
    const searchProducts = async (searchQuery: string, filters: ProductFilters = {}) => {
        await fetchProducts({ ...filters, search: searchQuery })
    }

    // Filter by active status
    const filterByActive = async (isActive: boolean | null, filters: ProductFilters = {}) => {
        await fetchProducts({ ...filters, is_active: isActive })
    }

    // Filter by featured status
    const filterByFeatured = async (isFeatured: boolean | null, filters: ProductFilters = {}) => {
        await fetchProducts({ ...filters, is_featured: isFeatured })
    }

    // Change page
    const changePage = async (page: number, filters: ProductFilters = {}) => {
        await fetchProducts({ ...filters, page })
    }

    // Reset filters
    const resetFilters = async () => {
        await fetchProducts()
    }

    return {
        // State
        products: readonly(products),
        pagination: readonly(pagination),
        loading: readonly(loading),
        error: readonly(error),

        // Methods
        fetchProducts,
        fetchProduct,
        searchProducts,
        filterByActive,
        filterByFeatured,
        changePage,
        resetFilters,
    }
}