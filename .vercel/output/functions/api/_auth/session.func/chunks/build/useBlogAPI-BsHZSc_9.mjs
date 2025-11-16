const useBlogAPI = () => {
  const fetchPosts = async (category, page = 1, search) => {
    const params = {
      _page: page,
      _limit: 9
    };
    if (category) params.category = category;
    if (search) params.search = search;
    return await $fetch("/api/blog", { query: params });
  };
  const fetchCategories = async () => {
    return await $fetch("/api/blog/categories");
  };
  const fetchPost = async (slug) => {
    return await $fetch(`/api/blog/${slug}`);
  };
  return {
    fetchPosts,
    fetchCategories,
    fetchPost
  };
};

export { useBlogAPI as u };
//# sourceMappingURL=useBlogAPI-BsHZSc_9.mjs.map
