import { F as useState } from './server.mjs';
import { computed, readonly } from 'vue';

const useWishlist = () => {
  const wishlistItems = useState("wishlist", () => []);
  const wishlistCount = computed(() => wishlistItems.value.length);
  const initWishlist = () => {
  };
  const isInWishlist = (slug) => {
    return wishlistItems.value.some((item) => item.slug === slug);
  };
  const addToWishlist = (product) => {
    if (isInWishlist(product.slug)) {
      return false;
    }
    const wishlistItem = {
      slug: product.slug,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image || product.image_thumb || "",
      addedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    wishlistItems.value.push(wishlistItem);
    return true;
  };
  const removeFromWishlist = (slug) => {
    const index = wishlistItems.value.findIndex((item) => item.slug === slug);
    if (index === -1) {
      return false;
    }
    wishlistItems.value.splice(index, 1);
    return true;
  };
  const toggleWishlist = (product) => {
    if (isInWishlist(product.slug)) {
      removeFromWishlist(product.slug);
      return false;
    } else {
      addToWishlist(product);
      return true;
    }
  };
  const clearWishlist = () => {
    wishlistItems.value = [];
  };
  const getWishlist = () => {
    return wishlistItems.value;
  };
  return {
    wishlistItems: readonly(wishlistItems),
    wishlistCount,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
    getWishlist,
    initWishlist
  };
};

export { useWishlist as u };
//# sourceMappingURL=useWishlist-DRW_Mwf9.mjs.map
