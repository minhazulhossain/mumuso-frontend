import { _ as _sfc_main$1 } from './Input-DomsB7QD.mjs';
import { w as useAsyncData, u as useHead, e as _sfc_main$8, d as _sfc_main$e, v as navigateTo } from './server.mjs';
import { _ as _sfc_main$2 } from './Card-D31Cx9o-.mjs';
import { _ as _sfc_main$3 } from './Badge-DZtstYnH.mjs';
import { _ as _sfc_main$4 } from './Pagination-Cbxm7ZdA.mjs';
import { defineComponent, ref, withAsyncContext, computed, mergeProps, unref, isRef, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { u as useBlogAPI } from './useBlogAPI-BsHZSc_9.mjs';
import 'reka-ui';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { fetchPosts, fetchCategories } = useBlogAPI();
    const searchQuery = ref("");
    const selectedCategory = ref(null);
    const currentPage = ref(1);
    const { data: categoriesData } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("categories", () => fetchCategories())), __temp = await __temp, __restore(), __temp);
    const categories = computed(() => categoriesData.value || []);
    const { data, pending, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "posts",
      () => fetchPosts(
        selectedCategory.value || void 0,
        currentPage.value,
        searchQuery.value || void 0
      ),
      {
        watch: [currentPage, selectedCategory]
      }
    )), __temp = await __temp, __restore(), __temp);
    const posts = computed(() => data.value?.posts || []);
    const total = computed(() => data.value?.total || 0);
    const totalPages = computed(() => data.value?.totalPages || 1);
    const filterByCategory = (category) => {
      selectedCategory.value = category;
      currentPage.value = 1;
      searchQuery.value = "";
    };
    let searchTimeout;
    const handleSearch = () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        currentPage.value = 1;
        refresh();
      }, 500);
    };
    useHead({
      title: "Home | Blog",
      meta: [
        { name: "description", content: "Explore the latest articles on web development and technology" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UInput = _sfc_main$1;
      const _component_UButton = _sfc_main$8;
      const _component_UIcon = _sfc_main$e;
      const _component_UCard = _sfc_main$2;
      const _component_UBadge = _sfc_main$3;
      const _component_UPagination = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 dark:bg-gray-900" }, _attrs))}><div class="bg-gradient-to-r from-success-600 to-primary-800 text-white py-20"><div class="container mx-auto px-4"><h1 class="text-5xl font-bold mb-4"> Blog</h1><p class="text-xl opacity-90">Exploring the latest in web development and technology</p></div></div><div class="container mx-auto px-4 py-12"><div class="mb-8">`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(searchQuery),
        "onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
        icon: "i-heroicons-magnifying-glass",
        size: "xl",
        placeholder: "Search articles...",
        onInput: handleSearch
      }, null, _parent));
      _push(`</div><div class="mb-8"><div class="flex gap-3 flex-wrap">`);
      _push(ssrRenderComponent(_component_UButton, {
        variant: unref(selectedCategory) === null ? "solid" : "outline",
        color: "primary",
        onClick: ($event) => filterByCategory(null)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` All Posts `);
          } else {
            return [
              createTextVNode(" All Posts ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--[-->`);
      ssrRenderList(unref(categories), (cat) => {
        _push(ssrRenderComponent(_component_UButton, {
          key: cat.name,
          variant: unref(selectedCategory) === cat.name ? "solid" : "outline",
          color: "primary",
          onClick: ($event) => filterByCategory(cat.name)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(cat.name)} (${ssrInterpolate(cat.count)}) `);
            } else {
              return [
                createTextVNode(toDisplayString(cat.name) + " (" + toDisplayString(cat.count) + ") ", 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div>`);
      if (unref(pending)) {
        _push(`<div class="flex justify-center py-20">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-arrow-path",
          class: "animate-spin text-4xl text-primary-500"
        }, null, _parent));
        _push(`</div>`);
      } else if (unref(posts).length) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"><!--[-->`);
        ssrRenderList(unref(posts), (post) => {
          _push(ssrRenderComponent(_component_UCard, {
            key: post.id,
            class: "hover:shadow-xl transition-shadow cursor-pointer",
            onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/blog/${post.slug}`),
            ui: { header: "p-0 px-0 sm:px-0" }
          }, {
            header: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<img${ssrRenderAttr("src", post?.image_url)}${ssrRenderAttr("alt", post.title)} class="w-full h-110 object-cover"${_scopeId}>`);
              } else {
                return [
                  createVNode("img", {
                    src: post?.image_url,
                    alt: post.title,
                    class: "w-full h-110 object-cover"
                  }, null, 8, ["src", "alt"])
                ];
              }
            }),
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="space-y-3"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UBadge, {
                  color: "primary",
                  variant: "subtle"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(post.category)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(post.category), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`<h3 class="text-xl font-bold text-gray-900 dark:text-white line-clamp-2"${_scopeId}>${ssrInterpolate(post.title)}</h3><p class="text-gray-600 dark:text-gray-400 line-clamp-3"${_scopeId}>${ssrInterpolate(post.excerpt)}</p><div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700"${_scopeId}><div class="flex items-center gap-2"${_scopeId}></div><div class="flex items-center gap-1 text-sm text-gray-500"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, { name: "i-heroicons-clock" }, null, _parent2, _scopeId));
                _push2(` ${ssrInterpolate(post.readTime)} min </div></div></div>`);
              } else {
                return [
                  createVNode("div", { class: "space-y-3" }, [
                    createVNode(_component_UBadge, {
                      color: "primary",
                      variant: "subtle"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(post.category), 1)
                      ]),
                      _: 2
                    }, 1024),
                    createVNode("h3", { class: "text-xl font-bold text-gray-900 dark:text-white line-clamp-2" }, toDisplayString(post.title), 1),
                    createVNode("p", { class: "text-gray-600 dark:text-gray-400 line-clamp-3" }, toDisplayString(post.excerpt), 1),
                    createVNode("div", { class: "flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700" }, [
                      createVNode("div", { class: "flex items-center gap-2" }),
                      createVNode("div", { class: "flex items-center gap-1 text-sm text-gray-500" }, [
                        createVNode(_component_UIcon, { name: "i-heroicons-clock" }),
                        createTextVNode(" " + toDisplayString(post.readTime) + " min ", 1)
                      ])
                    ])
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="text-center py-20">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-document-text",
          class: "text-6xl text-gray-400 mb-4"
        }, null, _parent));
        _push(`<p class="text-xl text-gray-600 dark:text-gray-400">${ssrInterpolate(unref(searchQuery) ? `No results found for "${unref(searchQuery)}"` : "No posts found")}</p></div>`);
      }
      if (unref(totalPages) > 1) {
        _push(`<div class="flex justify-center">`);
        _push(ssrRenderComponent(_component_UPagination, {
          modelValue: unref(currentPage),
          "onUpdate:modelValue": ($event) => isRef(currentPage) ? currentPage.value = $event : null,
          "page-count": 9,
          total: unref(total)
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-D3ZcMu8L.mjs.map
