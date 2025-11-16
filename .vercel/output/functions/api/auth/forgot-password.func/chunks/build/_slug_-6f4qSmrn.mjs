import { _ as _sfc_main$3 } from './Container-DJ2zbRf-.mjs';
import { _ as _sfc_main$4 } from './Breadcrumb-BWHX8r5o.mjs';
import { _ as _sfc_main$1$1 } from './ProductCard-DH2uBlVk.mjs';
import { defineComponent, ref, computed, watch, watchEffect, mergeProps, withCtx, unref, createTextVNode, toDisplayString, createVNode, isRef, createBlock, openBlock, createCommentVNode, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderStyle, ssrRenderList, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import { x as useRoute, a as useToast, c as useSEO, d as _sfc_main$e, e as _sfc_main$8 } from './server.mjs';
import { _ as _sfc_main$5 } from './Badge-DZtstYnH.mjs';
import { _ as __nuxt_component_7 } from './ProductCarousel-DWm0jcls.mjs';
import { u as useProducts } from './useProducts-Dyx4NQUU.mjs';
import { u as useCart } from './useCart-YbNJw6-2.mjs';
import { u as useWishlist } from './useWishlist-DRW_Mwf9.mjs';
import 'reka-ui';
import '../_/nitro.mjs';
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
import 'embla-carousel-vue';

const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_USkeleton = _sfc_main$1$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 lg:grid-cols-2 gap-12" }, _attrs))}><div class="space-y-4">`);
  _push(ssrRenderComponent(_component_USkeleton, { class: "aspect-square w-full rounded-lg" }, null, _parent));
  _push(`<div class="grid grid-cols-4 gap-2"><!--[-->`);
  ssrRenderList(4, (i) => {
    _push(ssrRenderComponent(_component_USkeleton, {
      key: i,
      class: "aspect-square w-full rounded-lg"
    }, null, _parent));
  });
  _push(`<!--]--></div></div><div class="space-y-6"><div class="flex items-center gap-2">`);
  _push(ssrRenderComponent(_component_USkeleton, { class: "h-6 w-20 rounded-full" }, null, _parent));
  _push(ssrRenderComponent(_component_USkeleton, { class: "h-6 w-16 rounded-full" }, null, _parent));
  _push(`</div><div>`);
  _push(ssrRenderComponent(_component_USkeleton, { class: "h-10 w-3/4 mb-2" }, null, _parent));
  _push(ssrRenderComponent(_component_USkeleton, { class: "h-6 w-32" }, null, _parent));
  _push(`</div><div class="flex items-baseline gap-4">`);
  _push(ssrRenderComponent(_component_USkeleton, { class: "h-12 w-32" }, null, _parent));
  _push(ssrRenderComponent(_component_USkeleton, { class: "h-8 w-24" }, null, _parent));
  _push(`</div>`);
  _push(ssrRenderComponent(_component_USkeleton, { class: "h-6 w-48" }, null, _parent));
  _push(`<div class="space-y-2">`);
  _push(ssrRenderComponent(_component_USkeleton, { class: "h-4 w-full" }, null, _parent));
  _push(ssrRenderComponent(_component_USkeleton, { class: "h-4 w-full" }, null, _parent));
  _push(ssrRenderComponent(_component_USkeleton, { class: "h-4 w-2/3" }, null, _parent));
  _push(`</div>`);
  _push(ssrRenderComponent(_component_USkeleton, { class: "h-32 w-full rounded-lg" }, null, _parent));
  _push(ssrRenderComponent(_component_USkeleton, { class: "h-12 w-32" }, null, _parent));
  _push(ssrRenderComponent(_component_USkeleton, { class: "h-14 w-full rounded-lg" }, null, _parent));
  _push(`</div></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SingleProduct/Skeleton.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]), { __name: "SingleProductSkeleton" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ProductVariationSelector",
  __ssrInlineRender: true,
  props: {
    variations: {},
    modelValue: {}
  },
  emits: ["update:modelValue", "variation-selected"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const selectedVariationId = computed(() => props.modelValue);
    const activeVariations = computed(() => {
      return props.variations.filter((v) => v.is_active).sort((a, b) => a.sort_order - b.sort_order);
    });
    const selectedVariation = computed(() => {
      if (!selectedVariationId.value) return null;
      return props.variations.find((v) => v.id === selectedVariationId.value);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UBadge = _sfc_main$5;
      const _component_UIcon = _sfc_main$e;
      if (__props.variations && __props.variations.length > 0) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}><div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"> Select Variation </label><div class="grid grid-cols-1 gap-3"><!--[-->`);
        ssrRenderList(unref(activeVariations), (variation) => {
          _push(`<button${ssrIncludeBooleanAttr(!variation.is_active || variation.stock_status !== "in_stock") ? " disabled" : ""} class="${ssrRenderClass([[
            unref(selectedVariationId) === variation.id ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20" : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600",
            !variation.is_active || variation.stock_status !== "in_stock" ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          ], "relative flex items-center justify-between p-4 border-2 rounded-lg transition-all text-left"])}"><div class="flex items-center gap-4 flex-1">`);
          if (variation.images?.thumb) {
            _push(`<div class="w-16 h-16 rounded-md overflow-hidden flex-shrink-0"><img${ssrRenderAttr("src", variation.images.thumb)}${ssrRenderAttr("alt", variation.name)} class="w-full h-full object-cover"></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="flex-1 min-w-0"><div class="flex items-center gap-2 mb-1"><h4 class="font-semibold text-gray-900 dark:text-white truncate">${ssrInterpolate(variation.name)}</h4>`);
          if (unref(selectedVariationId) === variation.id) {
            _push(ssrRenderComponent(_component_UBadge, {
              color: "primary",
              variant: "solid",
              size: "xs"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(` Selected `);
                } else {
                  return [
                    createTextVNode(" Selected ")
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div><p class="text-sm text-gray-500 dark:text-gray-400 mb-1"> SKU: ${ssrInterpolate(variation.sku)}</p><div class="flex items-center gap-2"><span class="text-lg font-bold text-primary-500"> $${ssrInterpolate(parseFloat(variation.price).toFixed(2))}</span>`);
          if (variation.compare_price) {
            _push(`<span class="text-sm text-gray-400 line-through"> $${ssrInterpolate(parseFloat(variation.compare_price).toFixed(2))}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div><div class="flex flex-col items-end gap-1">`);
          _push(ssrRenderComponent(_component_UBadge, {
            color: variation.stock_status === "in_stock" ? "success" : "error",
            variant: "soft",
            size: "sm"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(variation.stock_status === "in_stock" ? "In Stock" : "Out of Stock")}`);
              } else {
                return [
                  createTextVNode(toDisplayString(variation.stock_status === "in_stock" ? "In Stock" : "Out of Stock"), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          if (variation.stock_status === "in_stock") {
            _push(`<span class="text-xs text-gray-500 dark:text-gray-400">${ssrInterpolate(variation.stock_quantity)} available </span>`);
          } else {
            _push(`<!---->`);
          }
          if (variation.stock_quantity < 10 && variation.stock_status === "in_stock") {
            _push(ssrRenderComponent(_component_UBadge, {
              color: "warning",
              variant: "soft",
              size: "xs"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(` Low Stock `);
                } else {
                  return [
                    createTextVNode(" Low Stock ")
                  ];
                }
              }),
              _: 2
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
          if (unref(selectedVariationId) === variation.id) {
            _push(`<div class="absolute top-3 right-3">`);
            _push(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-check-circle-solid",
              class: "text-2xl text-primary-500"
            }, null, _parent));
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</button>`);
        });
        _push(`<!--]--></div></div>`);
        if (unref(selectedVariation)) {
          _push(`<div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">`);
          _push(ssrRenderComponent(_component_UIcon, { name: "i-heroicons-information-circle" }, null, _parent));
          _push(`<span class="font-medium">Selected Variation</span></div><div class="text-sm space-y-1"><p class="text-gray-900 dark:text-white"><span class="font-semibold">${ssrInterpolate(unref(selectedVariation).name)}</span></p><p class="text-gray-600 dark:text-gray-400"> SKU: ${ssrInterpolate(unref(selectedVariation).sku)}</p><p class="text-gray-600 dark:text-gray-400"> Price: <span class="font-semibold text-primary-500">$${ssrInterpolate(parseFloat(unref(selectedVariation).price).toFixed(2))}</span></p></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductVariationSelector.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_6 = Object.assign(_sfc_main$1, { __name: "ProductVariationSelector" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const toast = useToast();
    const { fetchProduct, loading, error } = useProducts();
    const { addToCart, toggleCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();
    const product = ref(null);
    const quantity = ref(1);
    const selectedImage = ref("");
    const isZoomed = ref(false);
    const zoomStyle = ref({});
    const relatedProducts = ref([]);
    const selectedVariationId = ref(null);
    const selectedVariation = ref(null);
    const currentPrice = computed(() => {
      return selectedVariation.value ? selectedVariation.value.price : product.value?.price || "0";
    });
    const currentComparePrice = computed(() => {
      return selectedVariation.value ? selectedVariation.value.compare_price : product.value?.compare_price;
    });
    const currentStockQuantity = computed(() => {
      return selectedVariation.value ? selectedVariation.value.stock_quantity : product.value?.stock_quantity || 0;
    });
    const currentStockStatus = computed(() => {
      return selectedVariation.value ? selectedVariation.value.stock_status : product.value?.stock_status || "out_of_stock";
    });
    const currentInStock = computed(() => {
      return currentStockStatus.value === "in_stock";
    });
    const currentSku = computed(() => {
      return selectedVariation.value ? selectedVariation.value.sku : product.value?.sku || "";
    });
    const breadcrumbLinks = computed(() => {
      const links = [
        { label: "Home", to: "/" },
        { label: "Shop", to: "/shop" }
      ];
      if (product.value) {
        if (product.value.categories.length > 0) {
          links.push({
            label: product.value.categories[0].name,
            to: `/shop?category=${product.value.categories[0].slug}`
          });
        }
        links.push({
          label: product.value.name,
          to: `/shop/product/${product.value.slug}`
        });
      }
      return links;
    });
    const loadProduct = async () => {
      product.value = null;
      const slug = route.params.slug;
      const productData = await fetchProduct(slug);
      if (productData) {
        product.value = productData;
        relatedProducts.value = productData?.related_products;
        selectedImage.value = productData.images.featured.medium || productData.images.featured.original;
      }
    };
    const toggleZoom = () => {
      isZoomed.value = !isZoomed.value;
      if (!isZoomed.value) {
        zoomStyle.value = {};
      }
    };
    const handleMouseMove = (event) => {
      if (!isZoomed.value) return;
      const target = event.currentTarget;
      const rect = target.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width * 100;
      const y = (event.clientY - rect.top) / rect.height * 100;
      zoomStyle.value = {
        transformOrigin: `${x}% ${y}%`
      };
    };
    const handleVariationSelected = (variation) => {
      selectedVariation.value = variation;
      selectedVariationId.value = variation.id;
      if (variation.images?.medium) {
        selectedImage.value = variation.images.medium;
      }
      quantity.value = 1;
    };
    const handleAddToCart = async () => {
      if (!product.value) return;
      if (product.value.variations && product.value.variations.length > 0) {
        if (!selectedVariationId.value) {
          toast.add({
            title: "Please select a variation",
            description: "Choose a product variation before adding to cart",
            color: "warning",
            icon: "i-heroicons-exclamation-triangle"
          });
          return;
        }
      }
      const success = await addToCart(
        product.value.slug,
        quantity.value,
        selectedVariationId.value || void 0
      );
      if (success) {
        toast.add({
          title: "Added to cart!",
          description: selectedVariation.value ? `${quantity.value}x ${selectedVariation.value.name}` : `${quantity.value}x ${product.value.name}`,
          color: "success",
          icon: "i-heroicons-shopping-cart"
        });
        quantity.value = 1;
        setTimeout(() => {
          toggleCart();
        }, 500);
      }
    };
    const handleWishlist = () => {
      if (!product.value) return;
      const isAdded = toggleWishlist(product.value);
      if (isAdded) {
        toast.add({
          title: "Added to wishlist!",
          description: `${product.value.name} saved for later`,
          color: "success",
          icon: "i-heroicons-heart-solid"
        });
      } else {
        toast.add({
          title: "Removed from wishlist",
          description: `${product.value.name} removed from your wishlist`,
          color: "secondary",
          icon: "i-heroicons-heart"
        });
      }
    };
    const handleImageError = (event) => {
      const target = event.target;
      target.src = "https://placehold.co/600x600";
    };
    watch(() => route.params.slug, () => {
      if (route.params.slug) {
        loadProduct();
      }
    });
    watchEffect(() => {
      if (product.value) {
        useSEO({
          title: product.value.name,
          description: product.value.short_description || product.value.description || `Buy ${product.value.name} - ${product.value.categories.map((c) => c.name).join(", ")}`,
          keywords: `${product.value.name}, ${product.value.categories.map((c) => c.name).join(", ")}, ${product.value.sku}`
        });
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = _sfc_main$3;
      const _component_UBreadcrumb = _sfc_main$4;
      const _component_SingleProductSkeleton = __nuxt_component_2;
      const _component_UIcon = _sfc_main$e;
      const _component_UButton = _sfc_main$8;
      const _component_UBadge = _sfc_main$5;
      const _component_ProductVariationSelector = __nuxt_component_6;
      const _component_ProductCarousel = __nuxt_component_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 dark:bg-gray-900" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UContainer, { class: "py-8" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UBreadcrumb, {
              items: unref(breadcrumbLinks),
              class: "mb-6"
            }, null, _parent2, _scopeId));
            if (unref(loading)) {
              _push2(ssrRenderComponent(_component_SingleProductSkeleton, null, null, _parent2, _scopeId));
            } else if (unref(error)) {
              _push2(`<div class="text-center py-16"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-exclamation-triangle",
                class: "text-4xl text-red-500 mb-4"
              }, null, _parent2, _scopeId));
              _push2(`<p class="text-red-600 dark:text-red-400"${_scopeId}>${ssrInterpolate(unref(error))}</p>`);
              _push2(ssrRenderComponent(_component_UButton, {
                onClick: loadProduct,
                color: "primary",
                class: "mt-4"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Try Again`);
                  } else {
                    return [
                      createTextVNode("Try Again")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else if (unref(product)) {
              _push2(`<div class="grid grid-cols-1 lg:grid-cols-2 gap-12"${_scopeId}><div class="space-y-4"${_scopeId}><div class="aspect-square overflow-hidden rounded-lg bg-gray-100 relative group cursor-zoom-in"${_scopeId}><img${ssrRenderAttr("src", unref(selectedImage))}${ssrRenderAttr("alt", unref(product).name)} class="${ssrRenderClass([{ "scale-150": unref(isZoomed) }, "w-full h-full object-cover transition-transform duration-300"])}" style="${ssrRenderStyle(unref(zoomStyle))}"${_scopeId}>`);
              if (!unref(isZoomed)) {
                _push2(`<div class="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center pointer-events-none"${_scopeId}><div class="bg-white dark:bg-gray-800 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-lucide-lightbulb",
                  class: "text-2xl text-gray-700 dark:text-gray-300"
                }, null, _parent2, _scopeId));
                _push2(`</div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(product).has_discount) {
                _push2(`<div class="absolute top-4 right-4"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UBadge, {
                  color: "error",
                  variant: "solid",
                  size: "lg"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` -${ssrInterpolate(unref(product).discount_percentage)}% OFF `);
                    } else {
                      return [
                        createTextVNode(" -" + toDisplayString(unref(product).discount_percentage) + "% OFF ", 1)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (!unref(product).in_stock) {
                _push2(`<div class="absolute top-4 left-4"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UBadge, {
                  color: "secondary",
                  variant: "solid",
                  size: "lg"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Out of Stock `);
                    } else {
                      return [
                        createTextVNode(" Out of Stock ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (unref(product).images.all.length > 1) {
                _push2(`<div class="grid grid-cols-4 gap-2"${_scopeId}><!--[-->`);
                ssrRenderList(unref(product).images.all, (image) => {
                  _push2(`<button class="${ssrRenderClass([unref(selectedImage) === image.url ? "border-primary-500" : "border-transparent hover:border-gray-300", "aspect-square overflow-hidden rounded-lg bg-gray-100 border-2 transition-colors"])}"${_scopeId}><img${ssrRenderAttr("src", image.thumb)}${ssrRenderAttr("alt", image.alt)} class="w-full h-full object-cover"${_scopeId}></button>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="space-y-4"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><!--[-->`);
              ssrRenderList(unref(product).categories, (category) => {
                _push2(ssrRenderComponent(_component_UBadge, {
                  key: category.id,
                  color: "primary",
                  variant: "soft"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(category.name)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(category.name), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
              if (unref(product).is_featured) {
                _push2(ssrRenderComponent(_component_UBadge, {
                  color: "warning",
                  variant: "soft"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Featured `);
                    } else {
                      return [
                        createTextVNode(" Featured ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(_component_UBadge, {
                color: unref(product).in_stock ? "success" : "error",
                variant: "soft"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(product).stock_status)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(product).stock_status), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><div${_scopeId}><h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2"${_scopeId}>${ssrInterpolate(unref(product).name)}</h1><p class="text-lg text-gray-600 dark:text-gray-400"${_scopeId}>SKU: ${ssrInterpolate(unref(currentSku))}</p></div><div class="space-y-2"${_scopeId}><div class="flex items-baseline gap-4"${_scopeId}><span class="text-4xl font-bold text-primary-500"${_scopeId}> $${ssrInterpolate(parseFloat(unref(currentPrice)).toFixed(2))}</span>`);
              if (unref(currentComparePrice)) {
                _push2(`<span class="text-2xl text-gray-400 line-through"${_scopeId}> $${ssrInterpolate(parseFloat(unref(currentComparePrice)).toFixed(2))}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (unref(product).has_discount && unref(product).discount_percentage) {
                _push2(`<div class="flex items-center gap-2"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UBadge, {
                  color: "success",
                  variant: "soft",
                  size: "lg"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UIcon, {
                        name: "i-heroicons-tag",
                        class: "mr-1"
                      }, null, _parent3, _scopeId2));
                      _push3(` Save ${ssrInterpolate(unref(product).discount_percentage)}% `);
                    } else {
                      return [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-tag",
                          class: "mr-1"
                        }),
                        createTextVNode(" Save " + toDisplayString(unref(product).discount_percentage) + "% ", 1)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`<span class="text-sm text-green-600 dark:text-green-400 font-medium"${_scopeId}> You save $${ssrInterpolate((parseFloat(unref(currentComparePrice) || "0") - parseFloat(unref(currentPrice))).toFixed(2))}</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="flex items-center gap-4"${_scopeId}><div class="flex items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: unref(currentInStock) ? "i-lucide-check-circle" : "i-lucide-x-circle",
                class: unref(currentInStock) ? "text-green-500" : "text-red-500"
              }, null, _parent2, _scopeId));
              _push2(`<span class="text-gray-700 dark:text-gray-300"${_scopeId}>${ssrInterpolate(unref(currentInStock) ? `${unref(currentStockQuantity)} in stock` : "Out of stock")}</span></div>`);
              if (unref(currentStockQuantity) < 10 && unref(currentInStock)) {
                _push2(ssrRenderComponent(_component_UBadge, {
                  color: "warning",
                  variant: "soft"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Low Stock `);
                    } else {
                      return [
                        createTextVNode(" Low Stock ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (unref(product).short_description) {
                _push2(`<div${_scopeId}><p class="text-lg text-gray-600 dark:text-gray-400 leading-relaxed"${_scopeId}>${ssrInterpolate(unref(product).short_description)}</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(product).description) {
                _push2(`<div${_scopeId}><h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2"${_scopeId}>Description</h2><div class="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line"${_scopeId}>${ssrInterpolate(unref(product).description)}</div></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(product).variations && unref(product).variations.length > 0) {
                _push2(ssrRenderComponent(_component_ProductVariationSelector, {
                  modelValue: unref(selectedVariationId),
                  "onUpdate:modelValue": ($event) => isRef(selectedVariationId) ? selectedVariationId.value = $event : null,
                  variations: unref(product).variations,
                  onVariationSelected: handleVariationSelected
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 space-y-2"${_scopeId}>`);
              if (unref(product).weight) {
                _push2(`<div class="flex justify-between"${_scopeId}><span class="text-gray-600 dark:text-gray-400"${_scopeId}>Weight:</span><span class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(unref(product).weight)} kg</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="flex justify-between"${_scopeId}><span class="text-gray-600 dark:text-gray-400"${_scopeId}>Status:</span><span class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(unref(product).status)}</span></div>`);
              if (unref(product).variations && unref(product).variations.length > 0) {
                _push2(`<div class="flex justify-between"${_scopeId}><span class="text-gray-600 dark:text-gray-400"${_scopeId}>Variations:</span><span class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(unref(product).variations.length)} available</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (unref(currentInStock)) {
                _push2(`<div class="flex items-center gap-4"${_scopeId}><label class="text-sm font-medium text-gray-700 dark:text-gray-300"${_scopeId}>Quantity:</label><div class="flex items-center gap-2"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UButton, {
                  onClick: ($event) => quantity.value = Math.max(1, unref(quantity) - 1),
                  icon: "i-heroicons-minus",
                  color: "secondary",
                  size: "sm",
                  disabled: unref(quantity) <= 1,
                  ui: { base: "rounded-none" }
                }, null, _parent2, _scopeId));
                _push2(`<span class="w-12 text-center font-semibold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(unref(quantity))}</span>`);
                _push2(ssrRenderComponent(_component_UButton, {
                  onClick: ($event) => quantity.value = Math.min(unref(currentStockQuantity), unref(quantity) + 1),
                  icon: "i-heroicons-plus",
                  color: "secondary",
                  size: "sm",
                  disabled: unref(quantity) >= unref(currentStockQuantity),
                  ui: { base: "rounded-none" }
                }, null, _parent2, _scopeId));
                _push2(`</div><span class="text-sm text-gray-500"${_scopeId}> Max: ${ssrInterpolate(unref(currentStockQuantity))}</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="flex gap-4 pt-4"${_scopeId}>`);
              if (unref(currentInStock)) {
                _push2(ssrRenderComponent(_component_UButton, {
                  onClick: handleAddToCart,
                  size: "xl",
                  class: "flex-1",
                  icon: "i-heroicons-shopping-cart",
                  ui: { base: "rounded-none" }
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      if (unref(product).has_discount) {
                        _push3(`<span class="flex items-center gap-2"${_scopeId2}> Add to Cart - $${ssrInterpolate((parseFloat(unref(currentPrice)) * unref(quantity)).toFixed(2))} <span class="text-xs line-through opacity-75"${_scopeId2}>$${ssrInterpolate((parseFloat(unref(currentComparePrice) || unref(currentPrice)) * unref(quantity)).toFixed(2))}</span></span>`);
                      } else {
                        _push3(`<span${_scopeId2}> Add to Cart - $${ssrInterpolate((parseFloat(unref(currentPrice)) * unref(quantity)).toFixed(2))}</span>`);
                      }
                    } else {
                      return [
                        unref(product).has_discount ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "flex items-center gap-2"
                        }, [
                          createTextVNode(" Add to Cart - $" + toDisplayString((parseFloat(unref(currentPrice)) * unref(quantity)).toFixed(2)) + " ", 1),
                          createVNode("span", { class: "text-xs line-through opacity-75" }, "$" + toDisplayString((parseFloat(unref(currentComparePrice) || unref(currentPrice)) * unref(quantity)).toFixed(2)), 1)
                        ])) : (openBlock(), createBlock("span", { key: 1 }, " Add to Cart - $" + toDisplayString((parseFloat(unref(currentPrice)) * unref(quantity)).toFixed(2)), 1))
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(_component_UButton, {
                  size: "xl",
                  class: "flex-1",
                  disabled: ""
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Out of Stock `);
                    } else {
                      return [
                        createTextVNode(" Out of Stock ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              }
              _push2(ssrRenderComponent(_component_UButton, {
                size: "xl",
                color: unref(isInWishlist)(unref(product).slug) ? "primary" : "secondary",
                variant: unref(isInWishlist)(unref(product).slug) ? "solid" : "soft",
                icon: unref(isInWishlist)(unref(product).slug) ? "i-heroicons-heart-solid" : "i-heroicons-heart",
                onClick: handleWishlist,
                ui: {
                  base: "transition-all duration-200 rounded-none"
                }
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(isInWishlist)(unref(product).slug) ? "Saved" : "Save")}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(unref(isInWishlist)(unref(product).slug) ? "Saved" : "Save"), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div><div class="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-3"${_scopeId}><div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, { name: "i-heroicons-truck" }, null, _parent2, _scopeId));
              _push2(`<span${_scopeId}>Free shipping on orders over $50</span></div><div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, { name: "i-heroicons-arrow-path" }, null, _parent2, _scopeId));
              _push2(`<span${_scopeId}>30-day return policy</span></div><div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, { name: "i-heroicons-shield-check" }, null, _parent2, _scopeId));
              _push2(`<span${_scopeId}>Secure checkout</span></div></div></div></div>`);
            } else {
              _push2(`<div class="text-center py-16"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-shopping-bag",
                class: "text-6xl text-gray-300 mb-4"
              }, null, _parent2, _scopeId));
              _push2(`<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2"${_scopeId}>Product not found</h3><p class="text-gray-600 dark:text-gray-400 mb-4"${_scopeId}>The product you&#39;re looking for doesn&#39;t exist</p>`);
              _push2(ssrRenderComponent(_component_UButton, {
                to: "/shop",
                color: "primary"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Browse Products`);
                  } else {
                    return [
                      createTextVNode("Browse Products")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            }
            if (unref(product) && unref(relatedProducts).length > 0) {
              _push2(`<div class="mt-16"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_ProductCarousel, {
                items: unref(relatedProducts),
                title: "Related Products"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_component_UBreadcrumb, {
                items: unref(breadcrumbLinks),
                class: "mb-6"
              }, null, 8, ["items"]),
              unref(loading) ? (openBlock(), createBlock(_component_SingleProductSkeleton, { key: 0 })) : unref(error) ? (openBlock(), createBlock("div", {
                key: 1,
                class: "text-center py-16"
              }, [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-exclamation-triangle",
                  class: "text-4xl text-red-500 mb-4"
                }),
                createVNode("p", { class: "text-red-600 dark:text-red-400" }, toDisplayString(unref(error)), 1),
                createVNode(_component_UButton, {
                  onClick: loadProduct,
                  color: "primary",
                  class: "mt-4"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Try Again")
                  ]),
                  _: 1
                })
              ])) : unref(product) ? (openBlock(), createBlock("div", {
                key: 2,
                class: "grid grid-cols-1 lg:grid-cols-2 gap-12"
              }, [
                createVNode("div", { class: "space-y-4" }, [
                  createVNode("div", { class: "aspect-square overflow-hidden rounded-lg bg-gray-100 relative group cursor-zoom-in" }, [
                    createVNode("img", {
                      src: unref(selectedImage),
                      alt: unref(product).name,
                      class: ["w-full h-full object-cover transition-transform duration-300", { "scale-150": unref(isZoomed) }],
                      style: unref(zoomStyle),
                      onError: handleImageError,
                      onClick: toggleZoom,
                      onMousemove: handleMouseMove,
                      onMouseleave: ($event) => isZoomed.value = false
                    }, null, 46, ["src", "alt", "onMouseleave"]),
                    !unref(isZoomed) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center pointer-events-none"
                    }, [
                      createVNode("div", { class: "bg-white dark:bg-gray-800 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity" }, [
                        createVNode(_component_UIcon, {
                          name: "i-lucide-lightbulb",
                          class: "text-2xl text-gray-700 dark:text-gray-300"
                        })
                      ])
                    ])) : createCommentVNode("", true),
                    unref(product).has_discount ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "absolute top-4 right-4"
                    }, [
                      createVNode(_component_UBadge, {
                        color: "error",
                        variant: "solid",
                        size: "lg"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" -" + toDisplayString(unref(product).discount_percentage) + "% OFF ", 1)
                        ]),
                        _: 1
                      })
                    ])) : createCommentVNode("", true),
                    !unref(product).in_stock ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: "absolute top-4 left-4"
                    }, [
                      createVNode(_component_UBadge, {
                        color: "secondary",
                        variant: "solid",
                        size: "lg"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Out of Stock ")
                        ]),
                        _: 1
                      })
                    ])) : createCommentVNode("", true)
                  ]),
                  unref(product).images.all.length > 1 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "grid grid-cols-4 gap-2"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(product).images.all, (image) => {
                      return openBlock(), createBlock("button", {
                        key: image.id,
                        onClick: ($event) => selectedImage.value = image.url,
                        class: ["aspect-square overflow-hidden rounded-lg bg-gray-100 border-2 transition-colors", unref(selectedImage) === image.url ? "border-primary-500" : "border-transparent hover:border-gray-300"]
                      }, [
                        createVNode("img", {
                          src: image.thumb,
                          alt: image.alt,
                          class: "w-full h-full object-cover"
                        }, null, 8, ["src", "alt"])
                      ], 10, ["onClick"]);
                    }), 128))
                  ])) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "space-y-4" }, [
                  createVNode("div", { class: "flex items-center gap-2" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(product).categories, (category) => {
                      return openBlock(), createBlock(_component_UBadge, {
                        key: category.id,
                        color: "primary",
                        variant: "soft"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(category.name), 1)
                        ]),
                        _: 2
                      }, 1024);
                    }), 128)),
                    unref(product).is_featured ? (openBlock(), createBlock(_component_UBadge, {
                      key: 0,
                      color: "warning",
                      variant: "soft"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Featured ")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true),
                    createVNode(_component_UBadge, {
                      color: unref(product).in_stock ? "success" : "error",
                      variant: "soft"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(product).stock_status), 1)
                      ]),
                      _: 1
                    }, 8, ["color"])
                  ]),
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-4xl font-bold text-gray-900 dark:text-white mb-2" }, toDisplayString(unref(product).name), 1),
                    createVNode("p", { class: "text-lg text-gray-600 dark:text-gray-400" }, "SKU: " + toDisplayString(unref(currentSku)), 1)
                  ]),
                  createVNode("div", { class: "space-y-2" }, [
                    createVNode("div", { class: "flex items-baseline gap-4" }, [
                      createVNode("span", { class: "text-4xl font-bold text-primary-500" }, " $" + toDisplayString(parseFloat(unref(currentPrice)).toFixed(2)), 1),
                      unref(currentComparePrice) ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "text-2xl text-gray-400 line-through"
                      }, " $" + toDisplayString(parseFloat(unref(currentComparePrice)).toFixed(2)), 1)) : createCommentVNode("", true)
                    ]),
                    unref(product).has_discount && unref(product).discount_percentage ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex items-center gap-2"
                    }, [
                      createVNode(_component_UBadge, {
                        color: "success",
                        variant: "soft",
                        size: "lg"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-tag",
                            class: "mr-1"
                          }),
                          createTextVNode(" Save " + toDisplayString(unref(product).discount_percentage) + "% ", 1)
                        ]),
                        _: 1
                      }),
                      createVNode("span", { class: "text-sm text-green-600 dark:text-green-400 font-medium" }, " You save $" + toDisplayString((parseFloat(unref(currentComparePrice) || "0") - parseFloat(unref(currentPrice))).toFixed(2)), 1)
                    ])) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "flex items-center gap-4" }, [
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode(_component_UIcon, {
                        name: unref(currentInStock) ? "i-lucide-check-circle" : "i-lucide-x-circle",
                        class: unref(currentInStock) ? "text-green-500" : "text-red-500"
                      }, null, 8, ["name", "class"]),
                      createVNode("span", { class: "text-gray-700 dark:text-gray-300" }, toDisplayString(unref(currentInStock) ? `${unref(currentStockQuantity)} in stock` : "Out of stock"), 1)
                    ]),
                    unref(currentStockQuantity) < 10 && unref(currentInStock) ? (openBlock(), createBlock(_component_UBadge, {
                      key: 0,
                      color: "warning",
                      variant: "soft"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Low Stock ")
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ]),
                  unref(product).short_description ? (openBlock(), createBlock("div", { key: 0 }, [
                    createVNode("p", { class: "text-lg text-gray-600 dark:text-gray-400 leading-relaxed" }, toDisplayString(unref(product).short_description), 1)
                  ])) : createCommentVNode("", true),
                  unref(product).description ? (openBlock(), createBlock("div", { key: 1 }, [
                    createVNode("h2", { class: "text-xl font-semibold text-gray-900 dark:text-white mb-2" }, "Description"),
                    createVNode("div", { class: "text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line" }, toDisplayString(unref(product).description), 1)
                  ])) : createCommentVNode("", true),
                  unref(product).variations && unref(product).variations.length > 0 ? (openBlock(), createBlock(_component_ProductVariationSelector, {
                    key: 2,
                    modelValue: unref(selectedVariationId),
                    "onUpdate:modelValue": ($event) => isRef(selectedVariationId) ? selectedVariationId.value = $event : null,
                    variations: unref(product).variations,
                    onVariationSelected: handleVariationSelected
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "variations"])) : createCommentVNode("", true),
                  createVNode("div", { class: "bg-gray-100 dark:bg-gray-800 rounded-lg p-4 space-y-2" }, [
                    unref(product).weight ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex justify-between"
                    }, [
                      createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Weight:"),
                      createVNode("span", { class: "font-medium text-gray-900 dark:text-white" }, toDisplayString(unref(product).weight) + " kg", 1)
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "flex justify-between" }, [
                      createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Status:"),
                      createVNode("span", { class: "font-medium text-gray-900 dark:text-white" }, toDisplayString(unref(product).status), 1)
                    ]),
                    unref(product).variations && unref(product).variations.length > 0 ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "flex justify-between"
                    }, [
                      createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Variations:"),
                      createVNode("span", { class: "font-medium text-gray-900 dark:text-white" }, toDisplayString(unref(product).variations.length) + " available", 1)
                    ])) : createCommentVNode("", true)
                  ]),
                  unref(currentInStock) ? (openBlock(), createBlock("div", {
                    key: 3,
                    class: "flex items-center gap-4"
                  }, [
                    createVNode("label", { class: "text-sm font-medium text-gray-700 dark:text-gray-300" }, "Quantity:"),
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode(_component_UButton, {
                        onClick: ($event) => quantity.value = Math.max(1, unref(quantity) - 1),
                        icon: "i-heroicons-minus",
                        color: "secondary",
                        size: "sm",
                        disabled: unref(quantity) <= 1,
                        ui: { base: "rounded-none" }
                      }, null, 8, ["onClick", "disabled"]),
                      createVNode("span", { class: "w-12 text-center font-semibold text-gray-900 dark:text-white" }, toDisplayString(unref(quantity)), 1),
                      createVNode(_component_UButton, {
                        onClick: ($event) => quantity.value = Math.min(unref(currentStockQuantity), unref(quantity) + 1),
                        icon: "i-heroicons-plus",
                        color: "secondary",
                        size: "sm",
                        disabled: unref(quantity) >= unref(currentStockQuantity),
                        ui: { base: "rounded-none" }
                      }, null, 8, ["onClick", "disabled"])
                    ]),
                    createVNode("span", { class: "text-sm text-gray-500" }, " Max: " + toDisplayString(unref(currentStockQuantity)), 1)
                  ])) : createCommentVNode("", true),
                  createVNode("div", { class: "flex gap-4 pt-4" }, [
                    unref(currentInStock) ? (openBlock(), createBlock(_component_UButton, {
                      key: 0,
                      onClick: handleAddToCart,
                      size: "xl",
                      class: "flex-1",
                      icon: "i-heroicons-shopping-cart",
                      ui: { base: "rounded-none" }
                    }, {
                      default: withCtx(() => [
                        unref(product).has_discount ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "flex items-center gap-2"
                        }, [
                          createTextVNode(" Add to Cart - $" + toDisplayString((parseFloat(unref(currentPrice)) * unref(quantity)).toFixed(2)) + " ", 1),
                          createVNode("span", { class: "text-xs line-through opacity-75" }, "$" + toDisplayString((parseFloat(unref(currentComparePrice) || unref(currentPrice)) * unref(quantity)).toFixed(2)), 1)
                        ])) : (openBlock(), createBlock("span", { key: 1 }, " Add to Cart - $" + toDisplayString((parseFloat(unref(currentPrice)) * unref(quantity)).toFixed(2)), 1))
                      ]),
                      _: 1
                    })) : (openBlock(), createBlock(_component_UButton, {
                      key: 1,
                      size: "xl",
                      class: "flex-1",
                      disabled: ""
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Out of Stock ")
                      ]),
                      _: 1
                    })),
                    createVNode(_component_UButton, {
                      size: "xl",
                      color: unref(isInWishlist)(unref(product).slug) ? "primary" : "secondary",
                      variant: unref(isInWishlist)(unref(product).slug) ? "solid" : "soft",
                      icon: unref(isInWishlist)(unref(product).slug) ? "i-heroicons-heart-solid" : "i-heroicons-heart",
                      onClick: handleWishlist,
                      ui: {
                        base: "transition-all duration-200 rounded-none"
                      }
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(isInWishlist)(unref(product).slug) ? "Saved" : "Save"), 1)
                      ]),
                      _: 1
                    }, 8, ["color", "variant", "icon"])
                  ]),
                  createVNode("div", { class: "border-t border-gray-200 dark:border-gray-700 pt-6 space-y-3" }, [
                    createVNode("div", { class: "flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400" }, [
                      createVNode(_component_UIcon, { name: "i-heroicons-truck" }),
                      createVNode("span", null, "Free shipping on orders over $50")
                    ]),
                    createVNode("div", { class: "flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400" }, [
                      createVNode(_component_UIcon, { name: "i-heroicons-arrow-path" }),
                      createVNode("span", null, "30-day return policy")
                    ]),
                    createVNode("div", { class: "flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400" }, [
                      createVNode(_component_UIcon, { name: "i-heroicons-shield-check" }),
                      createVNode("span", null, "Secure checkout")
                    ])
                  ])
                ])
              ])) : (openBlock(), createBlock("div", {
                key: 3,
                class: "text-center py-16"
              }, [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-shopping-bag",
                  class: "text-6xl text-gray-300 mb-4"
                }),
                createVNode("h3", { class: "text-xl font-semibold text-gray-900 dark:text-white mb-2" }, "Product not found"),
                createVNode("p", { class: "text-gray-600 dark:text-gray-400 mb-4" }, "The product you're looking for doesn't exist"),
                createVNode(_component_UButton, {
                  to: "/shop",
                  color: "primary"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Browse Products")
                  ]),
                  _: 1
                })
              ])),
              unref(product) && unref(relatedProducts).length > 0 ? (openBlock(), createBlock("div", {
                key: 4,
                class: "mt-16"
              }, [
                createVNode(_component_ProductCarousel, {
                  items: unref(relatedProducts),
                  title: "Related Products"
                }, null, 8, ["items"])
              ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/shop/product/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-6f4qSmrn.mjs.map
