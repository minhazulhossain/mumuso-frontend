import { Q as useRuntimeConfig, F as useState } from './server.mjs';
import { computed, readonly } from 'vue';

const useProducts = () => {
  const config = useRuntimeConfig();
  const apiUrl = config.public.apiBase;
  const products = useState("products", () => []);
  const categories = useState("categories", () => []);
  const pagination = useState("pagination", () => null);
  const loading = useState("products-loading", () => false);
  const error = useState("products-error", () => null);
  const cachedFilters = useState("cached-filters", () => ({}));
  const buildQueryParams = (filters) => {
    const params = {};
    if (filters.category && filters.category !== "all") {
      params.category = filters.category;
    }
    if (filters.featured !== void 0) {
      params.featured = filters.featured ? "1" : "0";
    }
    if (filters.in_stock !== void 0) {
      params.in_stock = filters.in_stock ? "1" : "0";
    }
    if (filters.min_price) {
      params.min_price = filters.min_price.toString();
    }
    if (filters.max_price) {
      params.max_price = filters.max_price.toString();
    }
    if (filters.search) {
      params.search = filters.search;
    }
    if (filters.on_sale) {
      params.on_sale = "1";
    }
    if (filters.page) {
      params.page = filters.page.toString();
    }
    return params;
  };
  const fetchProducts = async (filters = {}) => {
    loading.value = true;
    error.value = null;
    try {
      const queryParams = buildQueryParams(filters);
      const response = await $fetch(`${apiUrl}products`, {
        query: queryParams
      });
      products.value = response.data || [];
      if (response.meta) {
        pagination.value = {
          total: response.meta.total,
          perPage: response.meta.per_page,
          currentPage: response.meta.current_page,
          lastPage: response.meta.last_page,
          from: response.meta.from,
          to: response.meta.to,
          hasMorePages: response.meta.current_page < response.meta.last_page
        };
      }
      cachedFilters.value = filters;
      return { products: products.value, pagination: pagination.value };
    } catch (err) {
      error.value = err.message || "Failed to fetch products";
      console.error("Error fetching products:", err);
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const fetchProduct = async (slug) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await $fetch(
        `${apiUrl}products/${slug}`
      );
      return response.data;
    } catch (err) {
      error.value = err.message || "Failed to fetch product";
      throw err;
    } finally {
      loading.value = false;
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await $fetch(
        `${apiUrl}content/navigation-items`
      );
      categories.value = response.data || [];
      return categories.value;
    } catch (err) {
      console.error("Error fetching categories:", err);
      return [];
    }
  };
  const changePage = async (page, filters = {}) => {
    await fetchProducts({ ...filters, page });
  };
  const getFeaturedProducts = async (limit = 8) => {
    return await fetchProducts({ featured: true, page: 1 });
  };
  const getProductsByCategory = async (categorySlug, limit) => {
    return await fetchProducts({ category: categorySlug });
  };
  const searchProducts = async (query) => {
    return await fetchProducts({ search: query });
  };
  const refresh = async () => {
    await fetchProducts(cachedFilters.value);
  };
  const clear = () => {
    products.value = [];
    pagination.value = null;
    error.value = null;
    cachedFilters.value = {};
  };
  const getAllCategories = computed(() => categories.value);
  const hasProducts = computed(() => products.value.length > 0);
  const totalProducts = computed(() => pagination.value?.total || 0);
  const hasMorePages = computed(() => pagination.value?.hasMorePages || false);
  if (categories.value.length === 0) {
    fetchCategories();
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
    hasMorePages
  };
};

export { useProducts as u };
//# sourceMappingURL=useProducts-Dyx4NQUU.mjs.map
