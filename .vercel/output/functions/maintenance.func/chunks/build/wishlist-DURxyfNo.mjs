import { _ as _sfc_main$1 } from './Container-DJ2zbRf-.mjs';
import { a as useToast, c as useSEO, d as _sfc_main$e, e as _sfc_main$8, _ as __nuxt_component_0$1, f as __nuxt_component_6 } from './server.mjs';
import { _ as _sfc_main$2 } from './Card-D31Cx9o-.mjs';
import { defineComponent, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, withModifiers, createBlock, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { u as useWishlist } from './useWishlist-DRW_Mwf9.mjs';
import { u as useCart } from './useCart-YbNJw6-2.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "wishlist",
  __ssrInlineRender: true,
  setup(__props) {
    const toast = useToast();
    const { wishlistItems, wishlistCount, removeFromWishlist, clearWishlist } = useWishlist();
    const { addToCart } = useCart();
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const now = /* @__PURE__ */ new Date();
      const diffInMs = now.getTime() - date.getTime();
      const diffInDays = Math.floor(diffInMs / (1e3 * 60 * 60 * 24));
      if (diffInDays === 0) return "Today";
      if (diffInDays === 1) return "Yesterday";
      if (diffInDays < 7) return `${diffInDays} days ago`;
      if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
      return date.toLocaleDateString();
    };
    const handleRemove = (item) => {
      removeFromWishlist(item.slug);
      toast.add({
        title: "Removed from wishlist",
        description: `${item.name} has been removed`,
        color: "secondary",
        icon: "i-heroicons-heart"
      });
    };
    const handleAddToCart = async (item) => {
      const success = await addToCart(item.slug, 1);
      if (success) {
        toast.add({
          title: "Added to cart!",
          description: `${item.name} has been added to your cart`,
          color: "success",
          icon: "i-heroicons-shopping-cart"
        });
      }
    };
    const handleClearAll = () => {
      if (confirm("Are you sure you want to clear your entire wishlist?")) {
        clearWishlist();
        toast.add({
          title: "Wishlist cleared",
          description: "All items have been removed from your wishlist",
          color: "secondary",
          icon: "i-heroicons-trash"
        });
      }
    };
    useSEO({
      title: "My Wishlist",
      description: "View and manage your saved products"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = _sfc_main$1;
      const _component_UIcon = _sfc_main$e;
      const _component_UButton = _sfc_main$8;
      const _component_UCard = _sfc_main$2;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_NuxtImg = __nuxt_component_6;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 dark:bg-gray-900" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UContainer, { class: "py-8" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mb-8"${_scopeId}><h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2"${_scopeId}>My Wishlist</h1><p class="text-gray-600 dark:text-gray-400"${_scopeId}>${ssrInterpolate(unref(wishlistCount))} ${ssrInterpolate(unref(wishlistCount) === 1 ? "item" : "items")} saved </p></div>`);
            if (unref(wishlistCount) === 0) {
              _push2(`<div class="flex flex-col items-center justify-center py-16 text-center"${_scopeId}><div class="bg-gray-100 dark:bg-gray-800 rounded-full p-8 mb-6"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-heart",
                class: "text-6xl text-gray-400"
              }, null, _parent2, _scopeId));
              _push2(`</div><h3 class="text-2xl font-semibold text-gray-900 dark:text-white mb-2"${_scopeId}>Your wishlist is empty</h3><p class="text-gray-500 dark:text-gray-400 mb-6"${_scopeId}>Save items you love for later</p>`);
              _push2(ssrRenderComponent(_component_UButton, {
                to: "/shop",
                size: "lg",
                icon: "i-heroicons-shopping-bag"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Browse Products `);
                  } else {
                    return [
                      createTextVNode(" Browse Products ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<div${_scopeId}><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"${_scopeId}><!--[-->`);
              ssrRenderList(unref(wishlistItems), (item) => {
                _push2(ssrRenderComponent(_component_UCard, {
                  key: item.slug,
                  class: "group relative overflow-hidden hover:shadow-lg transition-shadow"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<button class="absolute top-2 right-2 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 dark:hover:bg-red-900/20" title="Remove from wishlist"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_UIcon, {
                        name: "i-heroicons-x-mark",
                        class: "text-red-600 dark:text-red-400"
                      }, null, _parent3, _scopeId2));
                      _push3(`</button>`);
                      _push3(ssrRenderComponent(_component_NuxtLink, {
                        to: `/shop/product/${item.slug}`,
                        class: "block"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div class="aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 mb-4"${_scopeId3}>`);
                            _push4(ssrRenderComponent(_component_NuxtImg, {
                              src: item.image || "https://placehold.co/400x400",
                              alt: item.name,
                              class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300",
                              width: "400",
                              height: "400",
                              loading: "lazy",
                              format: "webp"
                            }, null, _parent4, _scopeId3));
                            _push4(`</div><div class="space-y-2"${_scopeId3}><h3 class="font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-500 transition-colors"${_scopeId3}>${ssrInterpolate(item.name)}</h3><div class="flex items-center justify-between"${_scopeId3}><span class="text-lg font-bold text-primary-600 dark:text-primary-400"${_scopeId3}> $${ssrInterpolate(parseFloat(item.price).toFixed(2))}</span>`);
                            _push4(ssrRenderComponent(_component_UButton, {
                              size: "sm",
                              icon: "i-heroicons-shopping-cart",
                              onClick: ($event) => handleAddToCart(item)
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(` Add to Cart `);
                                } else {
                                  return [
                                    createTextVNode(" Add to Cart ")
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(`</div><p class="text-xs text-gray-500 dark:text-gray-400"${_scopeId3}> Added ${ssrInterpolate(formatDate(item.addedAt))}</p></div>`);
                          } else {
                            return [
                              createVNode("div", { class: "aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 mb-4" }, [
                                createVNode(_component_NuxtImg, {
                                  src: item.image || "https://placehold.co/400x400",
                                  alt: item.name,
                                  class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300",
                                  width: "400",
                                  height: "400",
                                  loading: "lazy",
                                  format: "webp"
                                }, null, 8, ["src", "alt"])
                              ]),
                              createVNode("div", { class: "space-y-2" }, [
                                createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-500 transition-colors" }, toDisplayString(item.name), 1),
                                createVNode("div", { class: "flex items-center justify-between" }, [
                                  createVNode("span", { class: "text-lg font-bold text-primary-600 dark:text-primary-400" }, " $" + toDisplayString(parseFloat(item.price).toFixed(2)), 1),
                                  createVNode(_component_UButton, {
                                    size: "sm",
                                    icon: "i-heroicons-shopping-cart",
                                    onClick: withModifiers(($event) => handleAddToCart(item), ["prevent"])
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Add to Cart ")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"])
                                ]),
                                createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400" }, " Added " + toDisplayString(formatDate(item.addedAt)), 1)
                              ])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode("button", {
                          onClick: ($event) => handleRemove(item),
                          class: "absolute top-2 right-2 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 dark:hover:bg-red-900/20",
                          title: "Remove from wishlist"
                        }, [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-x-mark",
                            class: "text-red-600 dark:text-red-400"
                          })
                        ], 8, ["onClick"]),
                        createVNode(_component_NuxtLink, {
                          to: `/shop/product/${item.slug}`,
                          class: "block"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 mb-4" }, [
                              createVNode(_component_NuxtImg, {
                                src: item.image || "https://placehold.co/400x400",
                                alt: item.name,
                                class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300",
                                width: "400",
                                height: "400",
                                loading: "lazy",
                                format: "webp"
                              }, null, 8, ["src", "alt"])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-500 transition-colors" }, toDisplayString(item.name), 1),
                              createVNode("div", { class: "flex items-center justify-between" }, [
                                createVNode("span", { class: "text-lg font-bold text-primary-600 dark:text-primary-400" }, " $" + toDisplayString(parseFloat(item.price).toFixed(2)), 1),
                                createVNode(_component_UButton, {
                                  size: "sm",
                                  icon: "i-heroicons-shopping-cart",
                                  onClick: withModifiers(($event) => handleAddToCart(item), ["prevent"])
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Add to Cart ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ]),
                              createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400" }, " Added " + toDisplayString(formatDate(item.addedAt)), 1)
                            ])
                          ]),
                          _: 2
                        }, 1032, ["to"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--></div><div class="mt-8 flex justify-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UButton, {
                color: "error",
                variant: "soft",
                icon: "i-heroicons-trash",
                onClick: handleClearAll
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Clear All `);
                  } else {
                    return [
                      createTextVNode(" Clear All ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            }
          } else {
            return [
              createVNode("div", { class: "mb-8" }, [
                createVNode("h1", { class: "text-3xl font-bold text-gray-900 dark:text-white mb-2" }, "My Wishlist"),
                createVNode("p", { class: "text-gray-600 dark:text-gray-400" }, toDisplayString(unref(wishlistCount)) + " " + toDisplayString(unref(wishlistCount) === 1 ? "item" : "items") + " saved ", 1)
              ]),
              unref(wishlistCount) === 0 ? (openBlock(), createBlock("div", {
                key: 0,
                class: "flex flex-col items-center justify-center py-16 text-center"
              }, [
                createVNode("div", { class: "bg-gray-100 dark:bg-gray-800 rounded-full p-8 mb-6" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-heart",
                    class: "text-6xl text-gray-400"
                  })
                ]),
                createVNode("h3", { class: "text-2xl font-semibold text-gray-900 dark:text-white mb-2" }, "Your wishlist is empty"),
                createVNode("p", { class: "text-gray-500 dark:text-gray-400 mb-6" }, "Save items you love for later"),
                createVNode(_component_UButton, {
                  to: "/shop",
                  size: "lg",
                  icon: "i-heroicons-shopping-bag"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Browse Products ")
                  ]),
                  _: 1
                })
              ])) : (openBlock(), createBlock("div", { key: 1 }, [
                createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(wishlistItems), (item) => {
                    return openBlock(), createBlock(_component_UCard, {
                      key: item.slug,
                      class: "group relative overflow-hidden hover:shadow-lg transition-shadow"
                    }, {
                      default: withCtx(() => [
                        createVNode("button", {
                          onClick: ($event) => handleRemove(item),
                          class: "absolute top-2 right-2 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 dark:hover:bg-red-900/20",
                          title: "Remove from wishlist"
                        }, [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-x-mark",
                            class: "text-red-600 dark:text-red-400"
                          })
                        ], 8, ["onClick"]),
                        createVNode(_component_NuxtLink, {
                          to: `/shop/product/${item.slug}`,
                          class: "block"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 mb-4" }, [
                              createVNode(_component_NuxtImg, {
                                src: item.image || "https://placehold.co/400x400",
                                alt: item.name,
                                class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300",
                                width: "400",
                                height: "400",
                                loading: "lazy",
                                format: "webp"
                              }, null, 8, ["src", "alt"])
                            ]),
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-500 transition-colors" }, toDisplayString(item.name), 1),
                              createVNode("div", { class: "flex items-center justify-between" }, [
                                createVNode("span", { class: "text-lg font-bold text-primary-600 dark:text-primary-400" }, " $" + toDisplayString(parseFloat(item.price).toFixed(2)), 1),
                                createVNode(_component_UButton, {
                                  size: "sm",
                                  icon: "i-heroicons-shopping-cart",
                                  onClick: withModifiers(($event) => handleAddToCart(item), ["prevent"])
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Add to Cart ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ]),
                              createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400" }, " Added " + toDisplayString(formatDate(item.addedAt)), 1)
                            ])
                          ]),
                          _: 2
                        }, 1032, ["to"])
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ]),
                createVNode("div", { class: "mt-8 flex justify-center" }, [
                  createVNode(_component_UButton, {
                    color: "error",
                    variant: "soft",
                    icon: "i-heroicons-trash",
                    onClick: handleClearAll
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Clear All ")
                    ]),
                    _: 1
                  })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/wishlist.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=wishlist-DURxyfNo.mjs.map
