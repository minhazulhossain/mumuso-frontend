import { _ as _sfc_main$1 } from './Container-DJ2zbRf-.mjs';
import { x as useRoute, u as useHead, e as _sfc_main$8, _ as __nuxt_component_0$1, d as _sfc_main$e } from './server.mjs';
import { _ as _sfc_main$2 } from './Card-D31Cx9o-.mjs';
import { _ as _sfc_main$3 } from './Badge-DZtstYnH.mjs';
import { defineComponent, computed, mergeProps, withCtx, createTextVNode, unref, toDisplayString, createVNode, createBlock, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { u as useProducts } from './useProducts-Dyx4NQUU.mjs';
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
  __name: "[category]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { products } = useProducts();
    const categoryProducts = computed(() => {
      return products.value.filter((p) => p.category === route.params.category);
    });
    useHead({
      title: `${String(route.params.category).charAt(0).toUpperCase() + String(route.params.category).slice(1)} - Shop`,
      meta: [
        { name: "description", content: `Browse ${route.params.category} products` }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = _sfc_main$1;
      const _component_UButton = _sfc_main$8;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_UCard = _sfc_main$2;
      const _component_UIcon = _sfc_main$e;
      const _component_UBadge = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 dark:bg-gray-900" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UContainer, { class: "py-8" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              to: "/shop",
              icon: "i-heroicons-arrow-left",
              color: "gray",
              variant: "ghost",
              class: "mb-6"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Back to Shop `);
                } else {
                  return [
                    createTextVNode(" Back to Shop ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="mb-8"${_scopeId}><h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2 capitalize"${_scopeId}>${ssrInterpolate(unref(route).params.category)}</h1><p class="text-gray-600 dark:text-gray-400"${_scopeId}>${ssrInterpolate(unref(categoryProducts).length)} products in this category </p></div>`);
            if (unref(categoryProducts).length > 0) {
              _push2(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"${_scopeId}><!--[-->`);
              ssrRenderList(unref(categoryProducts), (product) => {
                _push2(ssrRenderComponent(_component_NuxtLink, {
                  key: product.id,
                  to: `/shop/product/${product.slug}`,
                  class: "group"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UCard, { class: "hover:shadow-lg transition-shadow duration-200" }, {
                        header: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div class="aspect-square overflow-hidden rounded-lg bg-gray-100"${_scopeId3}><img${ssrRenderAttr("src", product.image)}${ssrRenderAttr("alt", product.name)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"${_scopeId3}></div>`);
                          } else {
                            return [
                              createVNode("div", { class: "aspect-square overflow-hidden rounded-lg bg-gray-100" }, [
                                createVNode("img", {
                                  src: product.image,
                                  alt: product.name,
                                  class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                }, null, 8, ["src", "alt"])
                              ])
                            ];
                          }
                        }),
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div class="space-y-2"${_scopeId3}><div class="flex items-center gap-1 text-sm"${_scopeId3}>`);
                            _push4(ssrRenderComponent(_component_UIcon, {
                              name: "i-heroicons-star-solid",
                              class: "text-yellow-400"
                            }, null, _parent4, _scopeId3));
                            _push4(`<span class="text-gray-700 dark:text-gray-300"${_scopeId3}>${ssrInterpolate(product.rating)}</span></div><h3 class="font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors"${_scopeId3}>${ssrInterpolate(product.name)}</h3><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId3}>${ssrInterpolate(product.brand)}</p><div class="flex items-center justify-between pt-2"${_scopeId3}><span class="text-xl font-bold text-primary-500"${_scopeId3}>$${ssrInterpolate(product.price)}</span>`);
                            _push4(ssrRenderComponent(_component_UBadge, {
                              color: product.stock > 10 ? "success" : "warning",
                              variant: "soft"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(product.stock)} in stock `);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(product.stock) + " in stock ", 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(`</div></div>`);
                          } else {
                            return [
                              createVNode("div", { class: "space-y-2" }, [
                                createVNode("div", { class: "flex items-center gap-1 text-sm" }, [
                                  createVNode(_component_UIcon, {
                                    name: "i-heroicons-star-solid",
                                    class: "text-yellow-400"
                                  }),
                                  createVNode("span", { class: "text-gray-700 dark:text-gray-300" }, toDisplayString(product.rating), 1)
                                ]),
                                createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors" }, toDisplayString(product.name), 1),
                                createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, toDisplayString(product.brand), 1),
                                createVNode("div", { class: "flex items-center justify-between pt-2" }, [
                                  createVNode("span", { class: "text-xl font-bold text-primary-500" }, "$" + toDisplayString(product.price), 1),
                                  createVNode(_component_UBadge, {
                                    color: product.stock > 10 ? "success" : "warning",
                                    variant: "soft"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(product.stock) + " in stock ", 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["color"])
                                ])
                              ])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_UCard, { class: "hover:shadow-lg transition-shadow duration-200" }, {
                          header: withCtx(() => [
                            createVNode("div", { class: "aspect-square overflow-hidden rounded-lg bg-gray-100" }, [
                              createVNode("img", {
                                src: product.image,
                                alt: product.name,
                                class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                              }, null, 8, ["src", "alt"])
                            ])
                          ]),
                          default: withCtx(() => [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode("div", { class: "flex items-center gap-1 text-sm" }, [
                                createVNode(_component_UIcon, {
                                  name: "i-heroicons-star-solid",
                                  class: "text-yellow-400"
                                }),
                                createVNode("span", { class: "text-gray-700 dark:text-gray-300" }, toDisplayString(product.rating), 1)
                              ]),
                              createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors" }, toDisplayString(product.name), 1),
                              createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, toDisplayString(product.brand), 1),
                              createVNode("div", { class: "flex items-center justify-between pt-2" }, [
                                createVNode("span", { class: "text-xl font-bold text-primary-500" }, "$" + toDisplayString(product.price), 1),
                                createVNode(_component_UBadge, {
                                  color: product.stock > 10 ? "success" : "warning",
                                  variant: "soft"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(product.stock) + " in stock ", 1)
                                  ]),
                                  _: 2
                                }, 1032, ["color"])
                              ])
                            ])
                          ]),
                          _: 2
                        }, 1024)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="text-center py-16"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-shopping-bag",
                class: "text-6xl text-gray-300 mb-4"
              }, null, _parent2, _scopeId));
              _push2(`<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2"${_scopeId}>No products in this category</h3>`);
              _push2(ssrRenderComponent(_component_UButton, {
                to: "/shop",
                color: "primary"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Browse All Products`);
                  } else {
                    return [
                      createTextVNode("Browse All Products")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            }
          } else {
            return [
              createVNode(_component_UButton, {
                to: "/shop",
                icon: "i-heroicons-arrow-left",
                color: "gray",
                variant: "ghost",
                class: "mb-6"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Back to Shop ")
                ]),
                _: 1
              }),
              createVNode("div", { class: "mb-8" }, [
                createVNode("h1", { class: "text-3xl font-bold text-gray-900 dark:text-white mb-2 capitalize" }, toDisplayString(unref(route).params.category), 1),
                createVNode("p", { class: "text-gray-600 dark:text-gray-400" }, toDisplayString(unref(categoryProducts).length) + " products in this category ", 1)
              ]),
              unref(categoryProducts).length > 0 ? (openBlock(), createBlock("div", {
                key: 0,
                class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(categoryProducts), (product) => {
                  return openBlock(), createBlock(_component_NuxtLink, {
                    key: product.id,
                    to: `/shop/product/${product.slug}`,
                    class: "group"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UCard, { class: "hover:shadow-lg transition-shadow duration-200" }, {
                        header: withCtx(() => [
                          createVNode("div", { class: "aspect-square overflow-hidden rounded-lg bg-gray-100" }, [
                            createVNode("img", {
                              src: product.image,
                              alt: product.name,
                              class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                            }, null, 8, ["src", "alt"])
                          ])
                        ]),
                        default: withCtx(() => [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("div", { class: "flex items-center gap-1 text-sm" }, [
                              createVNode(_component_UIcon, {
                                name: "i-heroicons-star-solid",
                                class: "text-yellow-400"
                              }),
                              createVNode("span", { class: "text-gray-700 dark:text-gray-300" }, toDisplayString(product.rating), 1)
                            ]),
                            createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors" }, toDisplayString(product.name), 1),
                            createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, toDisplayString(product.brand), 1),
                            createVNode("div", { class: "flex items-center justify-between pt-2" }, [
                              createVNode("span", { class: "text-xl font-bold text-primary-500" }, "$" + toDisplayString(product.price), 1),
                              createVNode(_component_UBadge, {
                                color: product.stock > 10 ? "success" : "warning",
                                variant: "soft"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(product.stock) + " in stock ", 1)
                                ]),
                                _: 2
                              }, 1032, ["color"])
                            ])
                          ])
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1032, ["to"]);
                }), 128))
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "text-center py-16"
              }, [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-shopping-bag",
                  class: "text-6xl text-gray-300 mb-4"
                }),
                createVNode("h3", { class: "text-xl font-semibold text-gray-900 dark:text-white mb-2" }, "No products in this category"),
                createVNode(_component_UButton, {
                  to: "/shop",
                  color: "primary"
                }, {
                  default: withCtx(() => [
                    createTextVNode("Browse All Products")
                  ]),
                  _: 1
                })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/shop/category/[category].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_category_-CKDP6nXM.mjs.map
