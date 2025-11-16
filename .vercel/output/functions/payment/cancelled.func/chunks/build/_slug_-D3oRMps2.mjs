import { x as useRoute, w as useAsyncData, u as useHead, d as _sfc_main$e, e as _sfc_main$8, v as navigateTo, y as _sfc_main$b } from './server.mjs';
import { _ as _sfc_main$1 } from './Badge-DZtstYnH.mjs';
import { _ as _sfc_main$2 } from './Card-D31Cx9o-.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
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
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { fetchPost, fetchPosts } = useBlogAPI();
    const { data: post, pending } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      `post-${route.params.slug}`,
      () => fetchPost(route.params.slug)
    )), __temp = await __temp, __restore(), __temp);
    const { data: similarPostsData, pending: similarPostsPending } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      `similar-${route.params.slug}`,
      () => fetchPosts(post.value?.category, 1, 4)
    )), __temp = await __temp, __restore(), __temp);
    const similarPosts = computed(
      () => similarPostsData.value?.posts.filter((p) => p.id !== post.value?.id).slice(0, 2) || []
    );
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    useHead({
      title: () => post.value ? `${post.value.title} | Tech Blog` : "Loading...",
      meta: [
        { name: "description", content: () => post.value?.excerpt || "" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$e;
      const _component_UButton = _sfc_main$8;
      const _component_UBadge = _sfc_main$1;
      const _component_UAvatar = _sfc_main$b;
      const _component_UCard = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 dark:bg-gray-900" }, _attrs))}>`);
      if (unref(pending)) {
        _push(`<div class="flex justify-center items-center min-h-screen">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-arrow-path",
          class: "animate-spin text-4xl text-primary-500"
        }, null, _parent));
        _push(`</div>`);
      } else if (unref(post)) {
        _push(`<article class="container mx-auto px-4 py-12 max-w-4xl">`);
        _push(ssrRenderComponent(_component_UButton, {
          icon: "i-heroicons-arrow-left",
          variant: "ghost",
          class: "mb-6",
          onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/blog")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Back to posts `);
            } else {
              return [
                createTextVNode(" Back to posts ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<img${ssrRenderAttr("src", unref(post).image)}${ssrRenderAttr("alt", unref(post).title)} class="w-full h-96 object-cover rounded-lg mb-8"><header class="mb-8">`);
        _push(ssrRenderComponent(_component_UBadge, {
          color: "primary",
          variant: "subtle",
          class: "mb-4"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(post).category)}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(post).category), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">${ssrInterpolate(unref(post).title)}</h1><div class="flex items-center gap-6 text-gray-600 dark:text-gray-400"><div class="flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_UAvatar, {
          src: unref(post).author.avatar,
          size: "sm"
        }, null, _parent));
        _push(`<span>${ssrInterpolate(unref(post).author.name)}</span></div><div class="flex items-center gap-1">`);
        _push(ssrRenderComponent(_component_UIcon, { name: "i-heroicons-calendar" }, null, _parent));
        _push(`<span>${ssrInterpolate(formatDate(unref(post).publishedAt))}</span></div><div class="flex items-center gap-1">`);
        _push(ssrRenderComponent(_component_UIcon, { name: "i-heroicons-clock" }, null, _parent));
        _push(`<span>${ssrInterpolate(unref(post).readTime)} min read</span></div></div><div class="flex gap-2 mt-4"><!--[-->`);
        ssrRenderList(unref(post).tags, (tag) => {
          _push(ssrRenderComponent(_component_UBadge, {
            key: tag,
            color: "gray",
            variant: "subtle"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` #${ssrInterpolate(tag)}`);
              } else {
                return [
                  createTextVNode(" #" + toDisplayString(tag), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div></header><div class="prose prose-lg dark:prose-invert max-w-none mb-12">${unref(post).content ?? ""}</div><div class="border-t border-gray-200 dark:border-gray-700 pt-12"><h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6"> Similar Posts </h2>`);
        if (unref(similarPostsPending)) {
          _push(`<div class="flex justify-center py-10">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-arrow-path",
            class: "animate-spin text-3xl text-primary-500"
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6"><!--[-->`);
          ssrRenderList(unref(similarPosts), (similarPost) => {
            _push(ssrRenderComponent(_component_UCard, {
              key: similarPost.id,
              class: "hover:shadow-lg transition-shadow cursor-pointer",
              onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))(`/blog/${similarPost.slug}`)
            }, {
              header: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<img${ssrRenderAttr("src", similarPost.image)}${ssrRenderAttr("alt", similarPost.title)} class="w-full h-40 object-cover"${_scopeId}>`);
                } else {
                  return [
                    createVNode("img", {
                      src: similarPost.image,
                      alt: similarPost.title,
                      class: "w-full h-40 object-cover"
                    }, null, 8, ["src", "alt"])
                  ];
                }
              }),
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div class="space-y-2"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_UBadge, {
                    color: "primary",
                    variant: "subtle"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`${ssrInterpolate(similarPost.category)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(similarPost.category), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(`<h3 class="text-lg font-bold text-gray-900 dark:text-white line-clamp-2"${_scopeId}>${ssrInterpolate(similarPost.title)}</h3><p class="text-gray-600 dark:text-gray-400 line-clamp-2 text-sm"${_scopeId}>${ssrInterpolate(similarPost.excerpt)}</p><div class="flex items-center gap-1 text-sm text-gray-500"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_UIcon, { name: "i-heroicons-clock" }, null, _parent2, _scopeId));
                  _push2(` ${ssrInterpolate(similarPost.readTime)} min </div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode(_component_UBadge, {
                        color: "primary",
                        variant: "subtle"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(similarPost.category), 1)
                        ]),
                        _: 2
                      }, 1024),
                      createVNode("h3", { class: "text-lg font-bold text-gray-900 dark:text-white line-clamp-2" }, toDisplayString(similarPost.title), 1),
                      createVNode("p", { class: "text-gray-600 dark:text-gray-400 line-clamp-2 text-sm" }, toDisplayString(similarPost.excerpt), 1),
                      createVNode("div", { class: "flex items-center gap-1 text-sm text-gray-500" }, [
                        createVNode(_component_UIcon, { name: "i-heroicons-clock" }),
                        createTextVNode(" " + toDisplayString(similarPost.readTime) + " min ", 1)
                      ])
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div>`);
        }
        _push(`</div></article>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-D3oRMps2.mjs.map
