import { x as useRoute, w as useAsyncData, u as useHead, d as _sfc_main$e, v as navigateTo, y as _sfc_main$b } from './server.mjs';
import { _ as _sfc_main$1 } from './Card-D31Cx9o-.mjs';
import { _ as _sfc_main$2 } from './Pagination-Cbxm7ZdA.mjs';
import { defineComponent, computed, ref, withAsyncContext, mergeProps, unref, withCtx, createVNode, toDisplayString, createTextVNode, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { u as useBlogAPI } from './useBlogAPI-BsHZSc_9.mjs';
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
import 'reka-ui';
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
  __name: "[name]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { fetchPosts } = useBlogAPI();
    const categoryName = computed(() => route.params.name);
    const currentPage = ref(1);
    const { data, pending } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      `category-${categoryName.value}`,
      () => fetchPosts(categoryName.value, currentPage.value),
      { watch: [currentPage] }
    )), __temp = await __temp, __restore(), __temp);
    const posts = computed(() => data.value?.posts || []);
    const total = computed(() => data.value?.total || 0);
    const totalPages = computed(() => data.value?.totalPages || 1);
    useHead({
      title: () => `${categoryName.value} | Tech Blog`,
      meta: [
        { name: "description", content: () => `Browse all ${categoryName.value} articles` }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$e;
      const _component_UCard = _sfc_main$1;
      const _component_UAvatar = _sfc_main$b;
      const _component_UPagination = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 dark:bg-gray-900" }, _attrs))}><div class="bg-primary-600 text-white py-16"><div class="container mx-auto px-4"><h1 class="text-4xl font-bold mb-2">${ssrInterpolate(unref(categoryName))}</h1><p class="text-lg opacity-90">${ssrInterpolate(unref(total))} articles in this category</p></div></div><div class="container mx-auto px-4 py-12">`);
      if (unref(pending)) {
        _push(`<div class="flex justify-center py-20">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-arrow-path",
          class: "animate-spin text-4xl text-primary-500"
        }, null, _parent));
        _push(`</div>`);
      } else if (unref(posts).length) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"><!--[-->`);
        ssrRenderList(unref(posts), (post) => {
          _push(ssrRenderComponent(_component_UCard, {
            key: post.id,
            class: "hover:shadow-xl transition-shadow cursor-pointer",
            onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/blog/${post.slug}`)
          }, {
            header: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<img${ssrRenderAttr("src", post.image)}${ssrRenderAttr("alt", post.title)} class="w-full h-48 object-cover"${_scopeId}>`);
              } else {
                return [
                  createVNode("img", {
                    src: post.image,
                    alt: post.title,
                    class: "w-full h-48 object-cover"
                  }, null, 8, ["src", "alt"])
                ];
              }
            }),
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="space-y-3"${_scopeId}><h3 class="text-xl font-bold text-gray-900 dark:text-white line-clamp-2"${_scopeId}>${ssrInterpolate(post.title)}</h3><p class="text-gray-600 dark:text-gray-400 line-clamp-3"${_scopeId}>${ssrInterpolate(post.excerpt)}</p><div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700"${_scopeId}><div class="flex items-center gap-2"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UAvatar, {
                  src: post.author.avatar,
                  size: "xs"
                }, null, _parent2, _scopeId));
                _push2(`<span class="text-sm text-gray-600 dark:text-gray-400"${_scopeId}>${ssrInterpolate(post.author.name)}</span></div><div class="flex items-center gap-1 text-sm text-gray-500"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, { name: "i-heroicons-clock" }, null, _parent2, _scopeId));
                _push2(` ${ssrInterpolate(post.readTime)} min </div></div></div>`);
              } else {
                return [
                  createVNode("div", { class: "space-y-3" }, [
                    createVNode("h3", { class: "text-xl font-bold text-gray-900 dark:text-white line-clamp-2" }, toDisplayString(post.title), 1),
                    createVNode("p", { class: "text-gray-600 dark:text-gray-400 line-clamp-3" }, toDisplayString(post.excerpt), 1),
                    createVNode("div", { class: "flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700" }, [
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode(_component_UAvatar, {
                          src: post.author.avatar,
                          size: "xs"
                        }, null, 8, ["src"]),
                        createVNode("span", { class: "text-sm text-gray-600 dark:text-gray-400" }, toDisplayString(post.author.name), 1)
                      ]),
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
        _push(`<!---->`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/category/[name].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_name_-BaIOTCQB.mjs.map
