import { _ as _sfc_main$1$1 } from './ProductCard-DH2uBlVk.mjs';
import { _ as __nuxt_component_7, a as _sfc_main$1$2 } from './ProductCarousel-DWm0jcls.mjs';
import { withAsyncContext, unref, withCtx, createVNode, defineComponent, useTemplateRef, ref, computed, mergeProps, createBlock, createCommentVNode, openBlock, toDisplayString, useAttrs, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { _ as __nuxt_component_0$1, f as __nuxt_component_6, p as pictureProps, g as useImage, h as useBaseImage, i as getFileExtension, u as useHead, j as baseImageProps, m as useNuxtApp } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import { _ as _sfc_main$6 } from './Container-DJ2zbRf-.mjs';
import { _ as _sfc_main$7 } from './Card-D31Cx9o-.mjs';
import { u as useContent } from './useContent-Bu7MSza8.mjs';
import { u as useProducts } from './useProducts-Dyx4NQUU.mjs';
import 'reka-ui';
import './Badge-DZtstYnH.mjs';
import 'embla-carousel-vue';
import '@vueuse/core';
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
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import '@vue/shared';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "NuxtPicture",
  __ssrInlineRender: true,
  props: pictureProps,
  emits: ["load", "error"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const attrs = useAttrs();
    const isServer = true;
    const $img = useImage();
    const { attrs: baseAttrs, options: baseOptions, modifiers: baseModifiers } = useBaseImage(props);
    const originalFormat = computed(() => getFileExtension(props.src));
    const isTransparent = computed(() => ["png", "webp", "gif", "svg"].includes(originalFormat.value));
    const legacyFormat = computed(() => {
      if (props.legacyFormat) {
        return props.legacyFormat;
      }
      return isTransparent.value ? "png" : "jpeg";
    });
    const sources = computed(() => {
      const formats = props.format?.split(",") || (originalFormat.value === "svg" ? ["svg"] : $img.options.format?.length ? [...$img.options.format] : ["webp"]);
      if (formats[0] === "svg") {
        return [{ src: props.src }];
      }
      if (!formats.includes(legacyFormat.value)) {
        formats.push(legacyFormat.value);
      } else {
        formats.splice(formats.indexOf(legacyFormat.value), 1);
        formats.push(legacyFormat.value);
      }
      return formats.map((format) => {
        const { srcset, sizes, src } = $img.getSizes(props.src, {
          ...baseOptions.value,
          sizes: props.sizes || $img.options.screens,
          densities: props.densities,
          modifiers: { ...baseModifiers.value, format }
        });
        return { src, type: `image/${format}`, sizes, srcset };
      });
    });
    const lastSource = computed(() => sources.value[sources.value.length - 1]);
    if (props.preload) {
      useHead({ link: () => {
        const firstSource = sources.value[0];
        if (!firstSource) {
          return [];
        }
        const link = {
          rel: "preload",
          as: "image",
          imagesrcset: firstSource.srcset,
          nonce: props.nonce,
          ...typeof props.preload !== "boolean" && props.preload?.fetchPriority ? { fetchpriority: props.preload.fetchPriority } : {}
        };
        if (sources.value?.[0]?.sizes) {
          link.imagesizes = sources.value[0].sizes;
        }
        return [link];
      } });
    }
    const imgAttrs = computed(() => {
      const result = { ...props.imgAttrs, "data-nuxt-pic": "" };
      for (const key in attrs) {
        if (key in baseImageProps && !(key in result)) {
          result[key] = attrs[key];
        }
      }
      return result;
    });
    const imgEl = ref();
    const nuxtApp = useNuxtApp();
    nuxtApp.isHydrating;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<picture${ssrRenderAttrs(_attrs)}><!--[-->`);
      ssrRenderList(sources.value.slice(0, -1), (source) => {
        _push(`<source${ssrRenderAttr("type", source.type)}${ssrRenderAttr("sizes", source.sizes)}${ssrRenderAttr("srcset", source.srcset)}>`);
      });
      _push(`<!--]-->`);
      if (lastSource.value) {
        _push(`<img${ssrRenderAttrs(mergeProps({
          ref_key: "imgEl",
          ref: imgEl
        }, {
          ...unref(baseAttrs),
          ...unref(isServer) ? { onerror: "this.setAttribute('data-error', 1)" } : {},
          ...imgAttrs.value
        }, {
          src: lastSource.value.src,
          sizes: lastSource.value.sizes,
          srcset: lastSource.value.srcset
        }))}>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</picture>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_2$1 = Object.assign(_sfc_main$5, { __name: "NuxtPicture" });
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "HeroSlider",
  __ssrInlineRender: true,
  props: {
    banners: {},
    autoplay: { type: Boolean, default: true },
    interval: { default: 5e3 },
    height: { default: "auto" },
    loading: { type: Boolean, default: false }
  },
  emits: ["slide-change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const carouselRef = useTemplateRef("carouselRef");
    const loadedImages = ref({});
    const handleImageLoad = (bannerId) => {
      loadedImages.value[bannerId] = true;
    };
    const handleImageError = (bannerId) => {
      loadedImages.value[bannerId] = true;
    };
    const onSlideChange = (index) => {
      emit("slide-change", index);
    };
    const containerHeight = computed(() => {
      if (isMobile.value) {
        return props.height === "600px" ? "400px" : props.height;
      }
      return props.height;
    });
    const isMobile = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_USkeleton = _sfc_main$1$1;
      const _component_UCarousel = _sfc_main$1$2;
      const _component_NuxtPicture = __nuxt_component_2$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative w-full overflow-hidden" }, _attrs))} data-v-b0c3ae5b>`);
      if (__props.loading) {
        _push(`<div style="${ssrRenderStyle({ height: unref(containerHeight) })}" data-v-b0c3ae5b>`);
        _push(ssrRenderComponent(_component_USkeleton, { class: "w-full h-full" }, null, _parent));
        _push(`</div>`);
      } else if (__props.banners?.length > 0) {
        _push(ssrRenderComponent(_component_UCarousel, {
          ref_key: "carouselRef",
          ref: carouselRef,
          items: __props.banners,
          ui: {
            item: "w-full",
            dots: "absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20",
            dot: "w-10 md:w-14 h-2 rounded-full transition-all cursor-pointer bg-white/50 hover:bg-white/75 data-[state=active]:w-16 md:data-[state=active]:w-20 data-[state=active]:bg-white"
          },
          arrows: false,
          dots: __props.banners.length > 1,
          loop: true,
          autoplay: __props.autoplay ? { delay: __props.interval || 5e3, stopOnInteraction: false } : false,
          duration: 20,
          class: "w-full",
          style: { height: unref(containerHeight) },
          onSelect: onSlideChange
        }, {
          default: withCtx(({ item: banner }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="relative w-full h-full" data-v-b0c3ae5b${_scopeId}><div class="relative w-full h-full bg-gray-100" data-v-b0c3ae5b${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtPicture, {
                src: banner.image.desktop,
                alt: banner.title,
                "img-attrs": {
                  class: "w-full h-full object-cover",
                  onLoad: () => handleImageLoad(banner.id),
                  onError: () => handleImageError(banner.id)
                },
                sizes: "xs:100vw sm:100vw md:100vw lg:100vw",
                loading: "eager",
                format: "webp"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
              if (banner.overlay_color) {
                _push2(`<div class="absolute inset-0 pointer-events-none" style="${ssrRenderStyle({
                  backgroundColor: banner.overlay_color,
                  opacity: (banner.overlay_opacity || 50) / 100
                })}" data-v-b0c3ae5b${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "relative w-full h-full" }, [
                  createVNode("div", { class: "relative w-full h-full bg-gray-100" }, [
                    createVNode(_component_NuxtPicture, {
                      src: banner.image.desktop,
                      alt: banner.title,
                      "img-attrs": {
                        class: "w-full h-full object-cover",
                        onLoad: () => handleImageLoad(banner.id),
                        onError: () => handleImageError(banner.id)
                      },
                      sizes: "xs:100vw sm:100vw md:100vw lg:100vw",
                      loading: "eager",
                      format: "webp"
                    }, null, 8, ["src", "alt", "img-attrs"])
                  ]),
                  banner.overlay_color ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "absolute inset-0 pointer-events-none",
                    style: {
                      backgroundColor: banner.overlay_color,
                      opacity: (banner.overlay_opacity || 50) / 100
                    }
                  }, null, 4)) : createCommentVNode("", true)
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HeroSlider.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$4, [["__scopeId", "data-v-b0c3ae5b"]]), { __name: "HeroSlider" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "CategoriesGrid",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { fetchFeaturedCategories } = useContent();
    const { data: categories, pending } = ([__temp, __restore] = withAsyncContext(() => fetchFeaturedCategories()), __temp = await __temp, __restore(), __temp);
    const loading = ref(false);
    const loadedImages = ref({});
    const handleImageLoad = (src) => {
      loadedImages.value[src] = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_USkeleton = _sfc_main$1$1;
      const _component_UCarousel = _sfc_main$1$2;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_UCard = _sfc_main$7;
      const _component_NuxtImg = __nuxt_component_6;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (unref(loading)) {
        _push(`<div class="space-y-4">`);
        _push(ssrRenderComponent(_component_USkeleton, { class: "h-48 w-full" }, null, _parent));
        _push(`</div>`);
      } else {
        _push(ssrRenderComponent(_component_UCarousel, {
          loop: "",
          dots: "",
          "slides-to-scroll": 3,
          items: unref(categories),
          ui: {
            item: "basis-[29%] md:basis-1/8 lg:basis-1/8",
            dot: "w-10 h-2 data-[state=active]:bg-success-600 data-[state=active]:w-20"
          }
        }, {
          default: withCtx(({ item }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_NuxtLink, {
                to: `/categories/${item?.slug}`
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UCard, {
                      variant: "soft",
                      ui: { root: "bg-transparent ring-0", header: "p-0 sm:px-0 border-0", body: "p-0 sm:p-0 text-center" }
                    }, {
                      header: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="relative w-full aspect-[50/50] rounded-full"${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_NuxtImg, {
                            src: item?.image ? item.image?.original : "",
                            class: [
                              "transition-opacity w-12 md:w-16 duration-300 absolute top-[50%] left-[50%] translate-[-50%]"
                            ],
                            onLoad: ($event) => handleImageLoad(item?.image ? item.image?.original : ""),
                            alt: item?.name,
                            width: "64",
                            height: "64",
                            loading: "lazy",
                            format: "webp"
                          }, null, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", { class: "relative w-full aspect-[50/50] rounded-full" }, [
                              createVNode(_component_NuxtImg, {
                                src: item?.image ? item.image?.original : "",
                                class: [
                                  "transition-opacity w-12 md:w-16 duration-300 absolute top-[50%] left-[50%] translate-[-50%]"
                                ],
                                onLoad: ($event) => handleImageLoad(item?.image ? item.image?.original : ""),
                                alt: item?.name,
                                width: "64",
                                height: "64",
                                loading: "lazy",
                                format: "webp"
                              }, null, 8, ["src", "onLoad", "alt"])
                            ])
                          ];
                        }
                      }),
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<p class="mb-0 text-sm leading-none"${_scopeId3}>${ssrInterpolate(item?.name)}</p>`);
                        } else {
                          return [
                            createVNode("p", { class: "mb-0 text-sm leading-none" }, toDisplayString(item?.name), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UCard, {
                        variant: "soft",
                        ui: { root: "bg-transparent ring-0", header: "p-0 sm:px-0 border-0", body: "p-0 sm:p-0 text-center" }
                      }, {
                        header: withCtx(() => [
                          createVNode("div", { class: "relative w-full aspect-[50/50] rounded-full" }, [
                            createVNode(_component_NuxtImg, {
                              src: item?.image ? item.image?.original : "",
                              class: [
                                "transition-opacity w-12 md:w-16 duration-300 absolute top-[50%] left-[50%] translate-[-50%]"
                              ],
                              onLoad: ($event) => handleImageLoad(item?.image ? item.image?.original : ""),
                              alt: item?.name,
                              width: "64",
                              height: "64",
                              loading: "lazy",
                              format: "webp"
                            }, null, 8, ["src", "onLoad", "alt"])
                          ])
                        ]),
                        default: withCtx(() => [
                          createVNode("p", { class: "mb-0 text-sm leading-none" }, toDisplayString(item?.name), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_NuxtLink, {
                  to: `/categories/${item?.slug}`
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UCard, {
                      variant: "soft",
                      ui: { root: "bg-transparent ring-0", header: "p-0 sm:px-0 border-0", body: "p-0 sm:p-0 text-center" }
                    }, {
                      header: withCtx(() => [
                        createVNode("div", { class: "relative w-full aspect-[50/50] rounded-full" }, [
                          createVNode(_component_NuxtImg, {
                            src: item?.image ? item.image?.original : "",
                            class: [
                              "transition-opacity w-12 md:w-16 duration-300 absolute top-[50%] left-[50%] translate-[-50%]"
                            ],
                            onLoad: ($event) => handleImageLoad(item?.image ? item.image?.original : ""),
                            alt: item?.name,
                            width: "64",
                            height: "64",
                            loading: "lazy",
                            format: "webp"
                          }, null, 8, ["src", "onLoad", "alt"])
                        ])
                      ]),
                      default: withCtx(() => [
                        createVNode("p", { class: "mb-0 text-sm leading-none" }, toDisplayString(item?.name), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1032, ["to"])
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CategoriesGrid.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$3, { __name: "CategoriesGrid" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "PromotionGrid",
  __ssrInlineRender: true,
  setup(__props) {
    const fallbackProducts = [
      {
        id: 1,
        img: "/promo/1.jpg",
        name: "Mini Fan",
        description: "Beat the heat in style with this adorably appealing Mini Fan from the house of MUMUSO."
      },
      {
        id: 2,
        img: "/promo/2.jpg",
        name: "Portable Fan",
        description: "Beat the heat in style with this adorably appealing Mini Fan from the house of MUMUSO."
      },
      {
        id: 3,
        img: "/promo/3.jpg",
        name: "Desk Fan",
        description: "Beat the heat in style with this adorably appealing Mini Fan from the house of MUMUSO."
      },
      {
        id: 4,
        img: "/promo/1.jpg",
        name: "USB Fan",
        description: "Beat the heat in style with this adorably appealing Mini Fan from the house of MUMUSO."
      },
      {
        id: 5,
        img: "/promo/2.jpg",
        name: "Hand Fan",
        description: "Beat the heat in style with this adorably appealing Mini Fan from the house of MUMUSO."
      },
      {
        id: 6,
        img: "/promo/3.jpg",
        name: "Clip Fan",
        description: "Beat the heat in style with this adorably appealing Mini Fan from the house of MUMUSO."
      }
    ];
    const loading = ref(false);
    const products = ref(fallbackProducts);
    ref({});
    return (_ctx, _push, _parent, _attrs) => {
      const _component_USkeleton = _sfc_main$1$1;
      const _component_UCarousel = _sfc_main$1$2;
      const _component_UCard = _sfc_main$7;
      const _component_NuxtImg = __nuxt_component_6;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (unref(loading)) {
        _push(`<div class="space-y-4">`);
        _push(ssrRenderComponent(_component_USkeleton, { class: "h-64 w-full" }, null, _parent));
        _push(`</div>`);
      } else {
        _push(ssrRenderComponent(_component_UCarousel, {
          loop: "",
          "wheel-gestures": "",
          items: unref(products),
          ui: {
            item: "basis-[60%] md:basis-[40%] ps-2"
          }
        }, {
          default: withCtx(({ item }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UCard, { ui: { root: "rounded-none mb-2", header: "p-0 sm:px-0" } }, {
                header: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="relative w-full aspect-[380/288] bg-gray-100"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_NuxtImg, {
                      src: item.img,
                      class: [
                        "w-full h-full object-cover transition-opacity duration-300"
                      ],
                      alt: item.name,
                      width: "380",
                      height: "288",
                      sizes: "xs:60vw sm:40vw md:40vw",
                      loading: "lazy",
                      format: "webp"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "relative w-full aspect-[380/288] bg-gray-100" }, [
                        createVNode(_component_NuxtImg, {
                          src: item.img,
                          class: [
                            "w-full h-full object-cover transition-opacity duration-300"
                          ],
                          alt: item.name,
                          width: "380",
                          height: "288",
                          sizes: "xs:60vw sm:40vw md:40vw",
                          loading: "lazy",
                          format: "webp"
                        }, null, 8, ["src", "alt"])
                      ])
                    ];
                  }
                }),
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<p${_scopeId2}>${ssrInterpolate(item.description)}</p>`);
                  } else {
                    return [
                      createVNode("p", null, toDisplayString(item.description), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UCard, { ui: { root: "rounded-none mb-2", header: "p-0 sm:px-0" } }, {
                  header: withCtx(() => [
                    createVNode("div", { class: "relative w-full aspect-[380/288] bg-gray-100" }, [
                      createVNode(_component_NuxtImg, {
                        src: item.img,
                        class: [
                          "w-full h-full object-cover transition-opacity duration-300"
                        ],
                        alt: item.name,
                        width: "380",
                        height: "288",
                        sizes: "xs:60vw sm:40vw md:40vw",
                        loading: "lazy",
                        format: "webp"
                      }, null, 8, ["src", "alt"])
                    ])
                  ]),
                  default: withCtx(() => [
                    createVNode("p", null, toDisplayString(item.description), 1)
                  ]),
                  _: 2
                }, 1024)
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PromotionGrid.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$2, { __name: "PromotionGrid" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "BannersGrid",
  __ssrInlineRender: true,
  setup(__props) {
    const items = [
      "/banners/1.jpg",
      "/banners/2.png",
      "/banners/3.jpg",
      "/banners/4.png",
      "/banners/5.png"
    ];
    ref(new Array(items.length).fill(false));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = __nuxt_component_6;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-4 grid-rows-3 gap-2 md:gap-4" }, _attrs))}><div class="col-span-4 bg-gray-200 dark:bg-gray-800 rounded-none overflow-hidden relative">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: items[0],
        alt: "Item 1",
        class: "w-full transition-opacity duration-300",
        loading: "eager",
        width: "1200",
        height: "auto",
        format: "webp"
      }, null, _parent));
      _push(`</div><!--[-->`);
      ssrRenderList(items.slice(1), (item, index) => {
        _push(`<div class="col-span-2 bg-gray-200 dark:bg-gray-800 rounded-none overflow-hidden relative">`);
        _push(ssrRenderComponent(_component_NuxtImg, {
          src: item,
          alt: `Item ${index + 2}`,
          class: "w-full object-cover transition-opacity duration-300",
          loading: "lazy",
          width: "600",
          height: "auto",
          sizes: "xs:50vw sm:50vw md:50vw",
          format: "webp"
        }, null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BannersGrid.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_5 = Object.assign(_sfc_main$1, { __name: "BannersGrid" });
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { fetchHeroBanners } = useContent();
    const { data: heroBanners, pending } = ([__temp, __restore] = withAsyncContext(() => fetchHeroBanners()), __temp = await __temp, __restore(), __temp);
    const { products, loading } = useProducts();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HeroSlider = __nuxt_component_0;
      const _component_UContainer = _sfc_main$6;
      const _component_CategoriesGrid = __nuxt_component_2;
      const _component_PromotionGrid = __nuxt_component_3;
      const _component_ProductCarousel = __nuxt_component_7;
      const _component_BannersGrid = __nuxt_component_5;
      _push(`<div${ssrRenderAttrs(_attrs)}><section class="relative overflow-hidden bg-gradient-to-br from-white via-primary-50 to-primary-100 dark:from-gray-950 dark:via-primary-950 dark:to-gray-900">`);
      if (unref(heroBanners)) {
        _push(ssrRenderComponent(_component_HeroSlider, {
          banners: unref(heroBanners),
          autoplay: true,
          loading: unref(pending)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</section><section class="py-6 md:py-16 bg-white dark:bg-gray-950">`);
      _push(ssrRenderComponent(_component_UContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_CategoriesGrid, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_CategoriesGrid)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section><section class="py-12 md:py-16 bg-gray-50 dark:bg-gray-900">`);
      _push(ssrRenderComponent(_component_UContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_PromotionGrid, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_PromotionGrid)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section><section class="py-12 md:py-16 bg-white dark:bg-gray-950">`);
      _push(ssrRenderComponent(_component_UContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ProductCarousel, {
              title: "Best Selling",
              items: unref(products),
              loading: unref(loading)
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ProductCarousel, {
                title: "Best Selling",
                items: unref(products),
                loading: unref(loading)
              }, null, 8, ["items", "loading"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section><section class="py-12 md:py-16 bg-success-500 dark:bg-success-600">`);
      _push(ssrRenderComponent(_component_UContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ProductCarousel, {
              title: "New Arrivals",
              items: unref(products),
              loading: unref(loading)
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ProductCarousel, {
                title: "New Arrivals",
                items: unref(products),
                loading: unref(loading)
              }, null, 8, ["items", "loading"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section><section class="py-12 md:py-16 bg-white dark:bg-gray-950">`);
      _push(ssrRenderComponent(_component_UContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_BannersGrid, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_BannersGrid)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section><section class="py-12 md:py-16 bg-gray-50 dark:bg-gray-900">`);
      _push(ssrRenderComponent(_component_UContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_ProductCarousel, {
              title: "Trending",
              items: unref(products),
              loading: unref(loading)
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_ProductCarousel, {
                title: "Trending",
                items: unref(products),
                loading: unref(loading)
              }, null, 8, ["items", "loading"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-0-Og1yXl.mjs.map
