import { _ as _sfc_main$1 } from './Container-DJ2zbRf-.mjs';
import { a as useToast, b as useRouter, c as useSEO, d as _sfc_main$e, e as _sfc_main$8, _ as __nuxt_component_0$1, f as __nuxt_component_6 } from './server.mjs';
import { _ as _sfc_main$2 } from './Badge-DZtstYnH.mjs';
import { a1 as calculateShipping, a2 as calculateTax, a3 as calculateOrderTotal, a4 as getStockStatus, a5 as getItemStock, a6 as canDecrementQuantity, a7 as canIncrementQuantity, a8 as isMaxStockReached } from '../_/nitro.mjs';
import { defineComponent, computed, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
import { u as useCart } from './useCart-YbNJw6-2.mjs';
import 'reka-ui';
import 'vue-router';
import 'tailwindcss/colors';
import '@iconify/vue';
import '@vueuse/core';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import '@vue/shared';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@iconify/utils';
import 'consola';
import 'node:url';
import 'ipx';
import 'node:fs';
import 'node:path';

const taxRate = 10;
const freeShippingThreshold = 50;
const shippingRate = 5.99;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "cart",
  __ssrInlineRender: true,
  setup(__props) {
    const toast = useToast();
    const router = useRouter();
    const {
      cartItems,
      cartTotal,
      cartOriginalTotal,
      cartDiscount,
      cartSavings,
      appliedDiscounts,
      updateCartItemQuantity,
      removeFromCart
    } = useCart();
    const subtotal = computed(() => {
      return cartTotal.value || 0;
    });
    const shipping = computed(() => {
      return calculateShipping(subtotal.value, freeShippingThreshold, shippingRate);
    });
    const tax = computed(() => {
      return calculateTax(subtotal.value, taxRate);
    });
    const total = computed(() => {
      return calculateOrderTotal(subtotal.value, shipping.value, tax.value);
    });
    const incrementQuantity = (item, maxStock) => {
      if (item && canIncrementQuantity(item)) {
        updateCartItemQuantity(item.product?.slug || item.slug, item.quantity + 1, item.variation_id);
      }
    };
    const decrementQuantity = (item) => {
      if (item && canDecrementQuantity(item)) {
        updateCartItemQuantity(item.product?.slug || item.slug, item.quantity - 1, item.variation_id);
      }
    };
    const removeItemFromCart = (item) => {
      if (item) {
        removeFromCart(item.product?.slug || item.slug, item.variation_id);
        toast.add({
          title: "Removed from cart",
          description: `${item.product.name}${item.variation ? " - " + item.variation.name : ""} has been removed`,
          color: "success",
          icon: "i-heroicons-trash"
        });
      }
    };
    const getItemPrice = (item) => {
      const price = item.variation?.price ?? item.product?.price ?? 0;
      return parseFloat(price);
    };
    const getItemOriginalPrice = (item) => {
      const originalPrice = item.variation?.original_price ?? item.product?.original_price ?? item.variation?.price ?? item.product?.price ?? 0;
      return parseFloat(originalPrice);
    };
    const hasDiscount = (item) => {
      const currentPrice = getItemPrice(item);
      const originalPrice = getItemOriginalPrice(item);
      return originalPrice > currentPrice;
    };
    const getItemTotal = (item) => {
      return getItemPrice(item) * (item.quantity || 1);
    };
    const getItemOriginalTotal = (item) => {
      return getItemOriginalPrice(item) * (item.quantity || 1);
    };
    const handleCheckout = () => {
      router.push("/checkout");
      toast.add({
        title: "Proceeding to checkout",
        description: "Please complete your purchase",
        color: "primary",
        icon: "i-heroicons-shopping-bag"
      });
    };
    useSEO({
      title: "Shopping Cart",
      description: "Review your cart and proceed to checkout"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = _sfc_main$1;
      const _component_UIcon = _sfc_main$e;
      const _component_UButton = _sfc_main$8;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_NuxtImg = __nuxt_component_6;
      const _component_UBadge = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 dark:bg-gray-900" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UContainer, { class: "py-8" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mb-8"${_scopeId}><h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2"${_scopeId}>Shopping Cart</h1><p class="text-gray-600 dark:text-gray-400"${_scopeId}>${ssrInterpolate(unref(cartItems)?.length || 0)} ${ssrInterpolate(unref(cartItems)?.length === 1 ? "item" : "items")} in your cart </p></div>`);
            if (!unref(cartItems) || unref(cartItems).length === 0) {
              _push2(`<div class="flex flex-col items-center justify-center py-16 text-center"${_scopeId}><div class="bg-gray-100 dark:bg-gray-800 rounded-full p-8 mb-6"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-shopping-cart",
                class: "text-6xl text-gray-400"
              }, null, _parent2, _scopeId));
              _push2(`</div><h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2"${_scopeId}>Your cart is empty</h3><p class="text-gray-500 dark:text-gray-400 mb-6"${_scopeId}>Looks like you haven&#39;t added anything to your cart yet</p>`);
              _push2(ssrRenderComponent(_component_UButton, {
                to: "/shop",
                size: "lg",
                icon: "i-heroicons-shopping-bag"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Continue Shopping `);
                  } else {
                    return [
                      createTextVNode(" Continue Shopping ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-8"${_scopeId}><div class="lg:col-span-2 space-y-4"${_scopeId}><!--[-->`);
              ssrRenderList(unref(cartItems), (item) => {
                _push2(`<div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"${_scopeId}><div class="flex gap-4"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_NuxtLink, {
                  to: `/shop/product/${item.product.slug}`,
                  class: "flex-shrink-0"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_NuxtImg, {
                        src: item.variation?.images?.thumb || item.product.image || "https://placehold.co/120x120",
                        alt: item.variation?.name || item.product.name,
                        class: "w-24 h-24 object-cover rounded-lg hover:opacity-90 transition-opacity",
                        width: "120",
                        height: "120",
                        loading: "lazy",
                        format: "webp"
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_NuxtImg, {
                          src: item.variation?.images?.thumb || item.product.image || "https://placehold.co/120x120",
                          alt: item.variation?.name || item.product.name,
                          class: "w-24 h-24 object-cover rounded-lg hover:opacity-90 transition-opacity",
                          width: "120",
                          height: "120",
                          loading: "lazy",
                          format: "webp"
                        }, null, 8, ["src", "alt"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`<div class="flex-1 min-w-0"${_scopeId}><div class="flex justify-between items-start mb-2"${_scopeId}><div class="flex-1 min-w-0 pr-4"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_NuxtLink, {
                  to: `/shop/product/${item.product.slug}`,
                  class: "font-semibold text-gray-900 dark:text-white hover:text-primary-500 block truncate"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(item?.product?.name)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(item?.product?.name), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                if (item.variation) {
                  _push2(`<p class="text-sm font-medium text-primary-600 dark:text-primary-400 mt-1"${_scopeId}>${ssrInterpolate(item.variation.name)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<p class="text-sm text-gray-500 dark:text-gray-400 mt-1"${_scopeId}> SKU: ${ssrInterpolate(item.variation?.sku || item?.product?.sku)}</p></div><div class="text-right flex-shrink-0"${_scopeId}><div class="space-y-1"${_scopeId}><p class="font-bold text-lg text-gray-900 dark:text-white"${_scopeId}> $${ssrInterpolate(getItemTotal(item).toFixed(2))}</p>`);
                if (hasDiscount(item)) {
                  _push2(`<p class="text-sm text-gray-400 line-through"${_scopeId}> $${ssrInterpolate(getItemOriginalTotal(item).toFixed(2))}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="flex items-center gap-2 justify-end"${_scopeId}><p class="text-sm font-medium text-gray-900 dark:text-white"${_scopeId}> $${ssrInterpolate(getItemPrice(item).toFixed(2))} each </p>`);
                if (hasDiscount(item)) {
                  _push2(`<p class="text-xs text-gray-400 line-through"${_scopeId}> $${ssrInterpolate(getItemOriginalPrice(item).toFixed(2))}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
                if (item.discount) {
                  _push2(ssrRenderComponent(_component_UBadge, {
                    color: "success",
                    variant: "soft",
                    size: "xs"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`${ssrInterpolate(item.discount.summary)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(item.discount.summary), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div></div>`);
                if (("getStockStatus" in _ctx ? _ctx.getStockStatus : unref(getStockStatus))(("getItemStock" in _ctx ? _ctx.getItemStock : unref(getItemStock))(item)).showBadge) {
                  _push2(`<div class="mb-2"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_UBadge, {
                    color: ("getStockStatus" in _ctx ? _ctx.getStockStatus : unref(getStockStatus))(("getItemStock" in _ctx ? _ctx.getItemStock : unref(getItemStock))(item)).color,
                    variant: "soft",
                    size: "xs"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`${ssrInterpolate(("getStockStatus" in _ctx ? _ctx.getStockStatus : unref(getStockStatus))(("getItemStock" in _ctx ? _ctx.getItemStock : unref(getItemStock))(item)).message)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(("getStockStatus" in _ctx ? _ctx.getStockStatus : unref(getStockStatus))(("getItemStock" in _ctx ? _ctx.getItemStock : unref(getItemStock))(item)).message), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(`</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="flex items-center justify-between mt-3"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><span class="text-sm text-gray-600 dark:text-gray-400"${_scopeId}>Quantity:</span><div class="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UButton, {
                  onClick: ($event) => decrementQuantity(item),
                  icon: "i-heroicons-minus",
                  size: "xs",
                  color: "secondary",
                  variant: "ghost",
                  disabled: !("canDecrementQuantity" in _ctx ? _ctx.canDecrementQuantity : unref(canDecrementQuantity))(item)
                }, null, _parent2, _scopeId));
                _push2(`<span class="text-sm font-semibold w-10 text-center text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(item.quantity)}</span>`);
                _push2(ssrRenderComponent(_component_UButton, {
                  onClick: ($event) => incrementQuantity(item, ("getItemStock" in _ctx ? _ctx.getItemStock : unref(getItemStock))(item)),
                  icon: "i-heroicons-plus",
                  size: "xs",
                  color: "secondary",
                  variant: "ghost",
                  disabled: !("canIncrementQuantity" in _ctx ? _ctx.canIncrementQuantity : unref(canIncrementQuantity))(item)
                }, null, _parent2, _scopeId));
                _push2(`</div></div>`);
                _push2(ssrRenderComponent(_component_UButton, {
                  onClick: ($event) => removeItemFromCart(item),
                  icon: "i-heroicons-trash",
                  size: "sm",
                  color: "error",
                  variant: "ghost"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Remove `);
                    } else {
                      return [
                        createTextVNode(" Remove ")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</div>`);
                if (("isMaxStockReached" in _ctx ? _ctx.isMaxStockReached : unref(isMaxStockReached))(item)) {
                  _push2(`<p class="text-xs text-orange-500 mt-2"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-exclamation-triangle",
                    class: "inline"
                  }, null, _parent2, _scopeId));
                  _push2(` Maximum available quantity reached </p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div></div>`);
              });
              _push2(`<!--]--><div class="pt-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UButton, {
                to: "/shop",
                variant: "soft",
                icon: "i-heroicons-arrow-left",
                size: "lg"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Continue Shopping `);
                  } else {
                    return [
                      createTextVNode(" Continue Shopping ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div><div class="lg:col-span-1"${_scopeId}><div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm sticky top-4"${_scopeId}><h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6"${_scopeId}>Order Summary</h2>`);
              if (unref(appliedDiscounts) && unref(appliedDiscounts).length > 0) {
                _push2(`<div class="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700"${_scopeId}><h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-tag",
                  class: "text-green-500"
                }, null, _parent2, _scopeId));
                _push2(` Active Discounts </h3><div class="space-y-3"${_scopeId}><!--[-->`);
                ssrRenderList(unref(appliedDiscounts), (discount) => {
                  _push2(`<div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-3"${_scopeId}><div class="flex items-start justify-between gap-2 mb-1"${_scopeId}><div class="flex-1 min-w-0"${_scopeId}><p class="text-sm font-semibold text-green-700 dark:text-green-300"${_scopeId}>${ssrInterpolate(discount.name)}</p><p class="text-xs text-gray-600 dark:text-gray-400"${_scopeId}>${ssrInterpolate(discount.summary)}</p></div>`);
                  _push2(ssrRenderComponent(_component_UBadge, {
                    color: "success",
                    variant: "solid",
                    size: "xs"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(` -$${ssrInterpolate(discount.discount_amount.toFixed(2))}`);
                      } else {
                        return [
                          createTextVNode(" -$" + toDisplayString(discount.discount_amount.toFixed(2)), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(`</div><p class="text-xs text-gray-500 dark:text-gray-400 mt-1"${_scopeId}> Applied to ${ssrInterpolate(discount.items_affected)} ${ssrInterpolate(discount.items_affected === 1 ? "item" : "items")}</p></div>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="space-y-3 mb-6"${_scopeId}>`);
              if (unref(cartDiscount) > 0) {
                _push2(`<div class="flex justify-between text-gray-500 dark:text-gray-400"${_scopeId}><span${_scopeId}>Original Subtotal</span><span class="font-medium line-through"${_scopeId}>$${ssrInterpolate(unref(cartOriginalTotal).toFixed(2))}</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="flex justify-between text-gray-600 dark:text-gray-400"${_scopeId}><span${_scopeId}>Subtotal</span><span class="font-medium"${_scopeId}>$${ssrInterpolate(unref(subtotal).toFixed(2))}</span></div>`);
              if (unref(cartSavings) > 0) {
                _push2(`<div class="flex justify-between text-green-600 dark:text-green-400"${_scopeId}><span class="flex items-center gap-1"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-tag",
                  class: "text-sm"
                }, null, _parent2, _scopeId));
                _push2(` Discount Savings </span><span class="font-medium"${_scopeId}>-$${ssrInterpolate(unref(cartSavings).toFixed(2))}</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="flex justify-between text-gray-600 dark:text-gray-400"${_scopeId}><span${_scopeId}>Shipping</span><span class="font-medium"${_scopeId}>${ssrInterpolate(unref(shipping) === 0 ? "FREE" : `$${unref(shipping).toFixed(2)}`)}</span></div><div class="flex justify-between text-gray-600 dark:text-gray-400"${_scopeId}><span${_scopeId}>Tax (${ssrInterpolate(taxRate)}%)</span><span class="font-medium"${_scopeId}>$${ssrInterpolate(unref(tax).toFixed(2))}</span></div></div>`);
              if (unref(shipping) > 0 && unref(subtotal) < freeShippingThreshold) {
                _push2(`<div class="mb-6"${_scopeId}><div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3"${_scopeId}><div class="flex items-start gap-2 mb-2"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-truck",
                  class: "text-blue-500 mt-0.5"
                }, null, _parent2, _scopeId));
                _push2(`<p class="text-sm text-blue-700 dark:text-blue-300"${_scopeId}> Add $${ssrInterpolate((freeShippingThreshold - unref(subtotal)).toFixed(2))} more for FREE shipping! </p></div><div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"${_scopeId}><div class="bg-blue-500 h-2 rounded-full transition-all duration-300" style="${ssrRenderStyle({ width: `${unref(subtotal) / freeShippingThreshold * 100}%` })}"${_scopeId}></div></div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="pt-4 border-t-2 border-gray-200 dark:border-gray-700 mb-6"${_scopeId}><div class="flex justify-between items-baseline"${_scopeId}><span class="text-lg font-semibold text-gray-900 dark:text-white"${_scopeId}>Total</span><span class="text-2xl font-bold text-primary-500"${_scopeId}>$${ssrInterpolate(unref(total).toFixed(2))}</span></div></div>`);
              _push2(ssrRenderComponent(_component_UButton, {
                onClick: handleCheckout,
                size: "xl",
                block: "",
                icon: "i-heroicons-lock-closed",
                class: "mb-4"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Proceed to Checkout `);
                  } else {
                    return [
                      createTextVNode(" Proceed to Checkout ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="space-y-2 text-sm text-gray-600 dark:text-gray-400"${_scopeId}><div class="flex items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-shield-check",
                class: "text-green-500"
              }, null, _parent2, _scopeId));
              _push2(`<span${_scopeId}>Secure checkout</span></div><div class="flex items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-arrow-path",
                class: "text-blue-500"
              }, null, _parent2, _scopeId));
              _push2(`<span${_scopeId}>30-day return policy</span></div></div></div></div></div>`);
            }
          } else {
            return [
              createVNode("div", { class: "mb-8" }, [
                createVNode("h1", { class: "text-3xl font-bold text-gray-900 dark:text-white mb-2" }, "Shopping Cart"),
                createVNode("p", { class: "text-gray-600 dark:text-gray-400" }, toDisplayString(unref(cartItems)?.length || 0) + " " + toDisplayString(unref(cartItems)?.length === 1 ? "item" : "items") + " in your cart ", 1)
              ]),
              !unref(cartItems) || unref(cartItems).length === 0 ? (openBlock(), createBlock("div", {
                key: 0,
                class: "flex flex-col items-center justify-center py-16 text-center"
              }, [
                createVNode("div", { class: "bg-gray-100 dark:bg-gray-800 rounded-full p-8 mb-6" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-shopping-cart",
                    class: "text-6xl text-gray-400"
                  })
                ]),
                createVNode("h3", { class: "text-2xl font-semibold text-gray-900 dark:text-white mb-2" }, "Your cart is empty"),
                createVNode("p", { class: "text-gray-500 dark:text-gray-400 mb-6" }, "Looks like you haven't added anything to your cart yet"),
                createVNode(_component_UButton, {
                  to: "/shop",
                  size: "lg",
                  icon: "i-heroicons-shopping-bag"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Continue Shopping ")
                  ]),
                  _: 1
                })
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "grid grid-cols-1 lg:grid-cols-3 gap-8"
              }, [
                createVNode("div", { class: "lg:col-span-2 space-y-4" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(cartItems), (item) => {
                    return openBlock(), createBlock("div", {
                      key: `${item.slug}-${item.variation_id || "default"}`,
                      class: "bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                    }, [
                      createVNode("div", { class: "flex gap-4" }, [
                        createVNode(_component_NuxtLink, {
                          to: `/shop/product/${item.product.slug}`,
                          class: "flex-shrink-0"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_NuxtImg, {
                              src: item.variation?.images?.thumb || item.product.image || "https://placehold.co/120x120",
                              alt: item.variation?.name || item.product.name,
                              class: "w-24 h-24 object-cover rounded-lg hover:opacity-90 transition-opacity",
                              width: "120",
                              height: "120",
                              loading: "lazy",
                              format: "webp"
                            }, null, 8, ["src", "alt"])
                          ]),
                          _: 2
                        }, 1032, ["to"]),
                        createVNode("div", { class: "flex-1 min-w-0" }, [
                          createVNode("div", { class: "flex justify-between items-start mb-2" }, [
                            createVNode("div", { class: "flex-1 min-w-0 pr-4" }, [
                              createVNode(_component_NuxtLink, {
                                to: `/shop/product/${item.product.slug}`,
                                class: "font-semibold text-gray-900 dark:text-white hover:text-primary-500 block truncate"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item?.product?.name), 1)
                                ]),
                                _: 2
                              }, 1032, ["to"]),
                              item.variation ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm font-medium text-primary-600 dark:text-primary-400 mt-1"
                              }, toDisplayString(item.variation.name), 1)) : createCommentVNode("", true),
                              createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400 mt-1" }, " SKU: " + toDisplayString(item.variation?.sku || item?.product?.sku), 1)
                            ]),
                            createVNode("div", { class: "text-right flex-shrink-0" }, [
                              createVNode("div", { class: "space-y-1" }, [
                                createVNode("p", { class: "font-bold text-lg text-gray-900 dark:text-white" }, " $" + toDisplayString(getItemTotal(item).toFixed(2)), 1),
                                hasDiscount(item) ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "text-sm text-gray-400 line-through"
                                }, " $" + toDisplayString(getItemOriginalTotal(item).toFixed(2)), 1)) : createCommentVNode("", true),
                                createVNode("div", { class: "flex items-center gap-2 justify-end" }, [
                                  createVNode("p", { class: "text-sm font-medium text-gray-900 dark:text-white" }, " $" + toDisplayString(getItemPrice(item).toFixed(2)) + " each ", 1),
                                  hasDiscount(item) ? (openBlock(), createBlock("p", {
                                    key: 0,
                                    class: "text-xs text-gray-400 line-through"
                                  }, " $" + toDisplayString(getItemOriginalPrice(item).toFixed(2)), 1)) : createCommentVNode("", true)
                                ]),
                                item.discount ? (openBlock(), createBlock(_component_UBadge, {
                                  key: 1,
                                  color: "success",
                                  variant: "soft",
                                  size: "xs"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(item.discount.summary), 1)
                                  ]),
                                  _: 2
                                }, 1024)) : createCommentVNode("", true)
                              ])
                            ])
                          ]),
                          ("getStockStatus" in _ctx ? _ctx.getStockStatus : unref(getStockStatus))(("getItemStock" in _ctx ? _ctx.getItemStock : unref(getItemStock))(item)).showBadge ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mb-2"
                          }, [
                            createVNode(_component_UBadge, {
                              color: ("getStockStatus" in _ctx ? _ctx.getStockStatus : unref(getStockStatus))(("getItemStock" in _ctx ? _ctx.getItemStock : unref(getItemStock))(item)).color,
                              variant: "soft",
                              size: "xs"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(("getStockStatus" in _ctx ? _ctx.getStockStatus : unref(getStockStatus))(("getItemStock" in _ctx ? _ctx.getItemStock : unref(getItemStock))(item)).message), 1)
                              ]),
                              _: 2
                            }, 1032, ["color"])
                          ])) : createCommentVNode("", true),
                          createVNode("div", { class: "flex items-center justify-between mt-3" }, [
                            createVNode("div", { class: "flex items-center gap-3" }, [
                              createVNode("span", { class: "text-sm text-gray-600 dark:text-gray-400" }, "Quantity:"),
                              createVNode("div", { class: "flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1" }, [
                                createVNode(_component_UButton, {
                                  onClick: ($event) => decrementQuantity(item),
                                  icon: "i-heroicons-minus",
                                  size: "xs",
                                  color: "secondary",
                                  variant: "ghost",
                                  disabled: !("canDecrementQuantity" in _ctx ? _ctx.canDecrementQuantity : unref(canDecrementQuantity))(item)
                                }, null, 8, ["onClick", "disabled"]),
                                createVNode("span", { class: "text-sm font-semibold w-10 text-center text-gray-900 dark:text-white" }, toDisplayString(item.quantity), 1),
                                createVNode(_component_UButton, {
                                  onClick: ($event) => incrementQuantity(item, ("getItemStock" in _ctx ? _ctx.getItemStock : unref(getItemStock))(item)),
                                  icon: "i-heroicons-plus",
                                  size: "xs",
                                  color: "secondary",
                                  variant: "ghost",
                                  disabled: !("canIncrementQuantity" in _ctx ? _ctx.canIncrementQuantity : unref(canIncrementQuantity))(item)
                                }, null, 8, ["onClick", "disabled"])
                              ])
                            ]),
                            createVNode(_component_UButton, {
                              onClick: ($event) => removeItemFromCart(item),
                              icon: "i-heroicons-trash",
                              size: "sm",
                              color: "error",
                              variant: "ghost"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Remove ")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ]),
                          ("isMaxStockReached" in _ctx ? _ctx.isMaxStockReached : unref(isMaxStockReached))(item) ? (openBlock(), createBlock("p", {
                            key: 1,
                            class: "text-xs text-orange-500 mt-2"
                          }, [
                            createVNode(_component_UIcon, {
                              name: "i-heroicons-exclamation-triangle",
                              class: "inline"
                            }),
                            createTextVNode(" Maximum available quantity reached ")
                          ])) : createCommentVNode("", true)
                        ])
                      ])
                    ]);
                  }), 128)),
                  createVNode("div", { class: "pt-4" }, [
                    createVNode(_component_UButton, {
                      to: "/shop",
                      variant: "soft",
                      icon: "i-heroicons-arrow-left",
                      size: "lg"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Continue Shopping ")
                      ]),
                      _: 1
                    })
                  ])
                ]),
                createVNode("div", { class: "lg:col-span-1" }, [
                  createVNode("div", { class: "bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm sticky top-4" }, [
                    createVNode("h2", { class: "text-xl font-bold text-gray-900 dark:text-white mb-6" }, "Order Summary"),
                    unref(appliedDiscounts) && unref(appliedDiscounts).length > 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "mb-6 pb-6 border-b border-gray-200 dark:border-gray-700"
                    }, [
                      createVNode("h3", { class: "text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2" }, [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-tag",
                          class: "text-green-500"
                        }),
                        createTextVNode(" Active Discounts ")
                      ]),
                      createVNode("div", { class: "space-y-3" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(appliedDiscounts), (discount) => {
                          return openBlock(), createBlock("div", {
                            key: discount.name,
                            class: "bg-green-50 dark:bg-green-900/20 rounded-lg p-3"
                          }, [
                            createVNode("div", { class: "flex items-start justify-between gap-2 mb-1" }, [
                              createVNode("div", { class: "flex-1 min-w-0" }, [
                                createVNode("p", { class: "text-sm font-semibold text-green-700 dark:text-green-300" }, toDisplayString(discount.name), 1),
                                createVNode("p", { class: "text-xs text-gray-600 dark:text-gray-400" }, toDisplayString(discount.summary), 1)
                              ]),
                              createVNode(_component_UBadge, {
                                color: "success",
                                variant: "solid",
                                size: "xs"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" -$" + toDisplayString(discount.discount_amount.toFixed(2)), 1)
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400 mt-1" }, " Applied to " + toDisplayString(discount.items_affected) + " " + toDisplayString(discount.items_affected === 1 ? "item" : "items"), 1)
                          ]);
                        }), 128))
                      ])
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "space-y-3 mb-6" }, [
                      unref(cartDiscount) > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex justify-between text-gray-500 dark:text-gray-400"
                      }, [
                        createVNode("span", null, "Original Subtotal"),
                        createVNode("span", { class: "font-medium line-through" }, "$" + toDisplayString(unref(cartOriginalTotal).toFixed(2)), 1)
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "flex justify-between text-gray-600 dark:text-gray-400" }, [
                        createVNode("span", null, "Subtotal"),
                        createVNode("span", { class: "font-medium" }, "$" + toDisplayString(unref(subtotal).toFixed(2)), 1)
                      ]),
                      unref(cartSavings) > 0 ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex justify-between text-green-600 dark:text-green-400"
                      }, [
                        createVNode("span", { class: "flex items-center gap-1" }, [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-tag",
                            class: "text-sm"
                          }),
                          createTextVNode(" Discount Savings ")
                        ]),
                        createVNode("span", { class: "font-medium" }, "-$" + toDisplayString(unref(cartSavings).toFixed(2)), 1)
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "flex justify-between text-gray-600 dark:text-gray-400" }, [
                        createVNode("span", null, "Shipping"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(unref(shipping) === 0 ? "FREE" : `$${unref(shipping).toFixed(2)}`), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between text-gray-600 dark:text-gray-400" }, [
                        createVNode("span", null, "Tax (" + toDisplayString(taxRate) + "%)"),
                        createVNode("span", { class: "font-medium" }, "$" + toDisplayString(unref(tax).toFixed(2)), 1)
                      ])
                    ]),
                    unref(shipping) > 0 && unref(subtotal) < freeShippingThreshold ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "mb-6"
                    }, [
                      createVNode("div", { class: "bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3" }, [
                        createVNode("div", { class: "flex items-start gap-2 mb-2" }, [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-truck",
                            class: "text-blue-500 mt-0.5"
                          }),
                          createVNode("p", { class: "text-sm text-blue-700 dark:text-blue-300" }, " Add $" + toDisplayString((freeShippingThreshold - unref(subtotal)).toFixed(2)) + " more for FREE shipping! ", 1)
                        ]),
                        createVNode("div", { class: "w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2" }, [
                          createVNode("div", {
                            class: "bg-blue-500 h-2 rounded-full transition-all duration-300",
                            style: { width: `${unref(subtotal) / freeShippingThreshold * 100}%` }
                          }, null, 4)
                        ])
                      ])
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "pt-4 border-t-2 border-gray-200 dark:border-gray-700 mb-6" }, [
                      createVNode("div", { class: "flex justify-between items-baseline" }, [
                        createVNode("span", { class: "text-lg font-semibold text-gray-900 dark:text-white" }, "Total"),
                        createVNode("span", { class: "text-2xl font-bold text-primary-500" }, "$" + toDisplayString(unref(total).toFixed(2)), 1)
                      ])
                    ]),
                    createVNode(_component_UButton, {
                      onClick: handleCheckout,
                      size: "xl",
                      block: "",
                      icon: "i-heroicons-lock-closed",
                      class: "mb-4"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Proceed to Checkout ")
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "space-y-2 text-sm text-gray-600 dark:text-gray-400" }, [
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-shield-check",
                          class: "text-green-500"
                        }),
                        createVNode("span", null, "Secure checkout")
                      ]),
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-arrow-path",
                          class: "text-blue-500"
                        }),
                        createVNode("span", null, "30-day return policy")
                      ])
                    ])
                  ])
                ])
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cart.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=cart-ClhuAam2.mjs.map
