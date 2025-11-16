import { a as useToast, F as useState, Q as useRuntimeConfig } from './server.mjs';
import { computed, readonly } from 'vue';
import { a9 as getItemTotal } from '../_/nitro.mjs';

const handleCartError = (toast, error, defaultMessage) => {
  const errorData = error.data;
  const message = errorData?.message || defaultMessage;
  const availableStock = errorData?.available_stock;
  toast.add({
    title: "Error",
    description: availableStock !== void 0 ? `${message}. Only ${availableStock} available.` : message,
    color: "error"
  });
};
const useCart = () => {
  const toast = useToast();
  const config = useRuntimeConfig();
  const cartItems = useState("cart", () => []);
  const cartTotals = useState("cartTotals", () => null);
  const appliedDiscounts = useState("appliedDiscounts", () => []);
  const isCartOpen = useState("isCartOpen", () => false);
  const isLoading = useState("cartLoading", () => false);
  const reservationTimer = useState("reservationTimer", () => null);
  const cartTotal = computed(() => {
    if (cartTotals.value?.final) {
      return cartTotals.value.final;
    }
    return cartItems.value.reduce((total, item) => {
      return total + getItemTotal(item);
    }, 0);
  });
  const cartOriginalTotal = computed(() => {
    if (cartTotals.value?.original) {
      return cartTotals.value.original;
    }
    return cartTotal.value;
  });
  const cartDiscount = computed(() => {
    return cartTotals.value?.discount || 0;
  });
  const cartSavings = computed(() => {
    return cartTotals.value?.savings || 0;
  });
  const cartItemsCount = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0);
  });
  const fetchProductDetails = async (slug) => {
    const baseUrl = config.public.apiBase.replace(/\/$/, "");
    try {
      const response = await $fetch(`${baseUrl}/products/${slug}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch product ${slug}:`, error);
      return null;
    }
  };
  const fetchCart = async () => {
    try {
      isLoading.value = true;
      const response = await $fetch("/api/cart");
      if (response.items?.length) {
        cartItems.value = await Promise.all(
          response.items.map(async (item) => {
            if (!item.product && item.slug) {
              const product = await fetchProductDetails(item.slug);
              return product ? { ...item, product } : item;
            }
            return item;
          })
        );
      } else {
        cartItems.value = response.items || [];
      }
      cartTotals.value = response?.totals || null;
      appliedDiscounts.value = response?.applied_discounts || [];
      return response;
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      handleCartError(toast, error, "Failed to load cart");
      return null;
    } finally {
      isLoading.value = false;
    }
  };
  const addToCart = async (slug, quantity = 1, variationId) => {
    try {
      isLoading.value = true;
      const body = {
        slug,
        quantity
      };
      if (variationId) {
        body.variation_id = variationId;
      }
      const response = await $fetch("/api/cart/add", {
        method: "POST",
        body
      });
      await fetchCart();
      toast.add({
        title: "Success",
        description: response.message || "Added to cart",
        color: "success"
      });
      return true;
    } catch (error) {
      handleCartError(toast, error, "Failed to add item to cart");
      return false;
    } finally {
      isLoading.value = false;
    }
  };
  const updateCartItemQuantity = async (slug, quantity, variationId) => {
    try {
      isLoading.value = true;
      const body = { quantity };
      if (variationId !== void 0) {
        body.variation_id = variationId;
      }
      const response = await $fetch(`/api/cart/update/${slug}`, {
        method: "PUT",
        body
      });
      await fetchCart();
      toast.add({
        title: "Success",
        description: response.message || "Cart updated",
        color: "success"
      });
      return true;
    } catch (error) {
      handleCartError(toast, error, "Failed to update cart");
      await fetchCart();
      return false;
    } finally {
      isLoading.value = false;
    }
  };
  const removeFromCart = async (slug, variationId) => {
    try {
      isLoading.value = true;
      let url = `/api/cart/remove/${slug}`;
      if (variationId !== void 0) {
        url += `?variation_id=${variationId}`;
      }
      const response = await $fetch(url, {
        method: "DELETE"
      });
      await fetchCart();
      toast.add({
        title: "Removed",
        description: response.message || "Item removed from cart",
        color: "warning"
      });
      return true;
    } catch (error) {
      handleCartError(toast, error, "Failed to remove item");
      return false;
    } finally {
      isLoading.value = false;
    }
  };
  const clearCart = async () => {
    try {
      isLoading.value = true;
      const response = await $fetch("/api/cart/clear", {
        method: "DELETE"
      });
      cartItems.value = [];
      toast.add({
        title: "Cart Cleared",
        description: response.message || "All items removed from cart",
        color: "warning"
      });
      return true;
    } catch (error) {
      handleCartError(toast, error, "Failed to clear cart");
      return false;
    } finally {
      isLoading.value = false;
    }
  };
  const checkout = async () => {
    try {
      isLoading.value = true;
      const response = await $fetch("/api/cart/checkout", {
        method: "POST"
      });
      cartItems.value = [];
      isCartOpen.value = false;
      if (reservationTimer.value) {
        clearInterval(reservationTimer.value);
        reservationTimer.value = null;
      }
      toast.add({
        title: "Order Placed!",
        description: response.message || "Your order has been placed successfully",
        color: "success"
      });
      return true;
    } catch (error) {
      handleCartError(toast, error, "Failed to complete checkout");
      await fetchCart();
      return false;
    } finally {
      isLoading.value = false;
    }
  };
  const extendReservation = async () => {
    if (cartItemsCount.value === 0) return;
    try {
      await $fetch("/api/cart/extend-reservation", {
        method: "POST"
      });
    } catch (error) {
      console.error("Failed to extend reservation:", error);
    }
  };
  const toggleCart = () => {
    isCartOpen.value = !isCartOpen.value;
  };
  const getItemBySlug = (slug, variationId) => {
    return cartItems.value.find((item) => {
      const slugMatches = item.slug === slug;
      const variationMatches = (item.variation_id ?? null) === (variationId ?? null);
      return slugMatches && variationMatches;
    });
  };
  const isInCart = (slug, variationId) => {
    return cartItems.value.some((item) => {
      const slugMatches = item.slug === slug;
      const variationMatches = (item.variation_id ?? null) === (variationId ?? null);
      return slugMatches && variationMatches;
    });
  };
  const getItemQuantity = (slug, variationId) => {
    return getItemBySlug(slug, variationId)?.quantity || 0;
  };
  return {
    // State
    cartItems: readonly(cartItems),
    cartTotal,
    cartOriginalTotal,
    cartDiscount,
    cartSavings,
    cartTotals: readonly(cartTotals),
    appliedDiscounts: readonly(appliedDiscounts),
    cartItemsCount,
    isCartOpen,
    isLoading: readonly(isLoading),
    // Actions
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
    checkout,
    toggleCart,
    fetchCart,
    extendReservation,
    // Helpers
    getItemBySlug,
    isInCart,
    getItemQuantity
  };
};

export { useCart as u };
//# sourceMappingURL=useCart-YbNJw6-2.mjs.map
