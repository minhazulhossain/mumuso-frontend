import { o as useAppConfig, t as tv, _ as __nuxt_component_0$1, f as __nuxt_component_6 } from './server.mjs';
import { computed, unref, mergeProps, withCtx, renderSlot, defineComponent, ref, createTextVNode, toDisplayString, createVNode, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';
import { Primitive } from 'reka-ui';
import { _ as _sfc_main$2 } from './Badge-DZtstYnH.mjs';

const theme = {
  "base": "animate-pulse rounded-md bg-elevated"
};
const _sfc_main$1 = {
  __name: "USkeleton",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    class: { type: null, required: false }
  },
  setup(__props) {
    const props = __props;
    const appConfig = useAppConfig();
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.skeleton || {} }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        "aria-busy": "true",
        "aria-label": "loading",
        "aria-live": "polite",
        role: "alert",
        class: ui.value({ class: props.class })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Skeleton.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProductCard",
  __ssrInlineRender: true,
  props: {
    product: {}
  },
  emits: ["add-to-cart", "add-to-wishlist"],
  setup(__props) {
    const imageLoaded = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_USkeleton = _sfc_main$1;
      const _component_NuxtImg = __nuxt_component_6;
      const _component_UBadge = _sfc_main$2;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        to: `/shop/product/${__props.product.slug}`,
        class: "overflow-hidden bg-white dark:bg-gray-800 h-full flex flex-col group"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative w-full aspect-square bg-gray-100 dark:bg-gray-900 overflow-hidden"${_scopeId}>`);
            if (!unref(imageLoaded)) {
              _push2(ssrRenderComponent(_component_USkeleton, { class: "w-full h-full absolute inset-0" }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_NuxtImg, {
              src: __props.product.image,
              alt: __props.product.name,
              class: [
                "w-full h-full object-cover transition-all duration-300 group-hover:scale-105",
                unref(imageLoaded) ? "opacity-100" : "opacity-0"
              ],
              sizes: "xs:100vw sm:50vw md:33vw lg:25vw",
              loading: "lazy",
              format: "webp",
              onLoad: ($event) => imageLoaded.value = true
            }, null, _parent2, _scopeId));
            if (__props.product.has_discount && __props.product.discount_percentage) {
              _push2(`<div class="absolute top-2 right-2 z-10"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UBadge, {
                color: "error",
                variant: "solid",
                size: "md"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` -${ssrInterpolate(__props.product.discount_percentage)}% OFF `);
                  } else {
                    return [
                      createTextVNode(" -" + toDisplayString(__props.product.discount_percentage) + "% OFF ", 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (!__props.product.in_stock) {
              _push2(`<div class="absolute top-2 left-2 z-10"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UBadge, {
                color: "secondary",
                variant: "solid",
                size: "sm"
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
            _push2(`</div><div class="p-3 space-y-2 flex-1 flex flex-col"${_scopeId}><h3 class="text-sm font-medium line-clamp-2 group-hover:text-primary-500 transition-colors"${_scopeId}>${ssrInterpolate(__props.product.name)}</h3><div class="space-y-1 mt-auto"${_scopeId}><div class="flex items-baseline gap-2"${_scopeId}><p class="text-lg font-bold text-primary-600 dark:text-primary-400"${_scopeId}> $${ssrInterpolate(parseFloat(__props.product.price).toFixed(2))}</p>`);
            if (__props.product.compare_price) {
              _push2(`<p class="text-sm text-gray-400 line-through"${_scopeId}> $${ssrInterpolate(parseFloat(__props.product.compare_price).toFixed(2))}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "relative w-full aspect-square bg-gray-100 dark:bg-gray-900 overflow-hidden" }, [
                !unref(imageLoaded) ? (openBlock(), createBlock(_component_USkeleton, {
                  key: 0,
                  class: "w-full h-full absolute inset-0"
                })) : createCommentVNode("", true),
                createVNode(_component_NuxtImg, {
                  src: __props.product.image,
                  alt: __props.product.name,
                  class: [
                    "w-full h-full object-cover transition-all duration-300 group-hover:scale-105",
                    unref(imageLoaded) ? "opacity-100" : "opacity-0"
                  ],
                  sizes: "xs:100vw sm:50vw md:33vw lg:25vw",
                  loading: "lazy",
                  format: "webp",
                  onLoad: ($event) => imageLoaded.value = true
                }, null, 8, ["src", "alt", "class", "onLoad"]),
                __props.product.has_discount && __props.product.discount_percentage ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "absolute top-2 right-2 z-10"
                }, [
                  createVNode(_component_UBadge, {
                    color: "error",
                    variant: "solid",
                    size: "md"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" -" + toDisplayString(__props.product.discount_percentage) + "% OFF ", 1)
                    ]),
                    _: 1
                  })
                ])) : createCommentVNode("", true),
                !__props.product.in_stock ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "absolute top-2 left-2 z-10"
                }, [
                  createVNode(_component_UBadge, {
                    color: "secondary",
                    variant: "solid",
                    size: "sm"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Out of Stock ")
                    ]),
                    _: 1
                  })
                ])) : createCommentVNode("", true)
              ]),
              createVNode("div", { class: "p-3 space-y-2 flex-1 flex flex-col" }, [
                createVNode("h3", { class: "text-sm font-medium line-clamp-2 group-hover:text-primary-500 transition-colors" }, toDisplayString(__props.product.name), 1),
                createVNode("div", { class: "space-y-1 mt-auto" }, [
                  createVNode("div", { class: "flex items-baseline gap-2" }, [
                    createVNode("p", { class: "text-lg font-bold text-primary-600 dark:text-primary-400" }, " $" + toDisplayString(parseFloat(__props.product.price).toFixed(2)), 1),
                    __props.product.compare_price ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-sm text-gray-400 line-through"
                    }, " $" + toDisplayString(parseFloat(__props.product.compare_price).toFixed(2)), 1)) : createCommentVNode("", true)
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Shop/ProductCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_9 = Object.assign(_sfc_main, { __name: "ShopProductCard" });

export { _sfc_main$1 as _, __nuxt_component_9 as a };
//# sourceMappingURL=ProductCard-DH2uBlVk.mjs.map
