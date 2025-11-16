import { Q as useRuntimeConfig, S as useFetch, m as useNuxtApp } from './server.mjs';

const useContent = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase;
  const fetchHeroBanners = () => {
    return useFetch(`${apiBase}content/hero-banners`, {
      key: "hero-banners",
      server: true,
      // Make sure this returns the data immediately
      transform: (response) => {
        return response?.data || [];
      },
      getCachedData: (key) => {
        return useNuxtApp().static.data[key] ?? useNuxtApp().payload.data[key];
      }
    }, "$FhUFgv_Hyi");
  };
  const fetchCategories = async () => {
    let response = await $fetch(`${config.public.apiBase}content/navigation-items`);
    if (!response?.status) {
      throw new Error(response.message);
    }
    return response.data;
  };
  const fetchFeaturedCategories = async () => {
    return useFetch(`${apiBase}categories/featured`, {
      key: "featured-categories",
      server: true,
      // Make sure this returns the data immediately
      transform: (response) => {
        return response?.data || [];
      },
      getCachedData: (key) => {
        return useNuxtApp().static.data[key] ?? useNuxtApp().payload.data[key];
      }
    }, "$qBcfR4Bbik");
  };
  const fetchCategory = async (slug) => {
    return useFetch(`${apiBase}categories/${slug}`, {
      key: "category-" + slug,
      server: true,
      // Make sure this returns the data immediately
      transform: (response) => {
        return response?.data || [];
      },
      getCachedData: (key) => {
        return useNuxtApp().static.data[key] ?? useNuxtApp().payload.data[key];
      }
    }, "$_eNMb1ojDv");
  };
  return {
    fetchHeroBanners,
    fetchCategories,
    fetchFeaturedCategories,
    fetchCategory
  };
};

export { useContent as u };
//# sourceMappingURL=useContent-Bu7MSza8.mjs.map
