import { _ as _sfc_main$1 } from './Container-DJ2zbRf-.mjs';
import { _ as __nuxt_component_2 } from './SocialMediaLinks-fMvphlli.mjs';
import { defineComponent, withCtx, unref, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { n as useNuxtData, c as useSEO } from './server.mjs';
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
  __name: "contact",
  __ssrInlineRender: true,
  setup(__props) {
    const { data: settings } = useNuxtData("settings");
    useSEO({
      title: "Contact Us",
      description: `Get in touch with ${settings.value?.company.name || settings.value?.site.name || "us"}. We'd love to hear from you!`,
      keywords: "contact, support, customer service, help"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = _sfc_main$1;
      const _component_SocialMediaLinks = __nuxt_component_2;
      _push(ssrRenderComponent(_component_UContainer, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mx-auto px-4 py-12"${_scopeId}><h1 class="text-4xl font-bold mb-8"${_scopeId}>Contact Us</h1><div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8"${_scopeId}><h2 class="text-2xl font-semibold mb-6"${_scopeId}>Get in Touch</h2><div class="grid md:grid-cols-2 gap-8"${_scopeId}><div class="space-y-4"${_scopeId}>`);
            if (unref(settings)?.company.name) {
              _push2(`<div${_scopeId}><h3 class="font-semibold text-gray-900 dark:text-white"${_scopeId}>Company</h3><p class="text-gray-600 dark:text-gray-400"${_scopeId}>${ssrInterpolate(unref(settings).company.name)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(settings)?.company.address) {
              _push2(`<div${_scopeId}><h3 class="font-semibold text-gray-900 dark:text-white"${_scopeId}>Address</h3><p class="text-gray-600 dark:text-gray-400 whitespace-pre-line"${_scopeId}>${ssrInterpolate(unref(settings).company.address)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(settings)?.site.contact_email) {
              _push2(`<div${_scopeId}><h3 class="font-semibold text-gray-900 dark:text-white"${_scopeId}>Email</h3><a${ssrRenderAttr("href", `mailto:${unref(settings).site.contact_email}`)} class="text-primary-600 hover:text-blue-800 dark:text-primary-400"${_scopeId}>${ssrInterpolate(unref(settings).site.contact_email)}</a></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(settings)?.company.phone) {
              _push2(`<div${_scopeId}><h3 class="font-semibold text-gray-900 dark:text-white"${_scopeId}>Phone</h3><a${ssrRenderAttr("href", `tel:${unref(settings).company.phone}`)} class="text-primary-600 hover:text-blue-800 dark:text-primary-400"${_scopeId}>${ssrInterpolate(unref(settings).company.phone)}</a></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><form class="space-y-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium mb-2"${_scopeId}>Name</label><input type="text" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500" placeholder="Your name"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium mb-2"${_scopeId}>Email</label><input type="email" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500" placeholder="your@email.com"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium mb-2"${_scopeId}>Message</label><textarea rows="4" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500" placeholder="Your message..."${_scopeId}></textarea></div><button type="submit" class="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition"${_scopeId}> Send Message </button></form></div></div></div>`);
            if (unref(settings)?.social_media?.length) {
              _push2(`<div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-8"${_scopeId}><h2 class="text-2xl font-semibold mb-4"${_scopeId}>Follow Us</h2><p class="text-gray-600 dark:text-gray-400 mb-6"${_scopeId}> Connect with us on social media </p>`);
              _push2(ssrRenderComponent(_component_SocialMediaLinks, {
                links: unref(settings).social_media,
                "show-username": "",
                "icon-size": "w-8 h-8"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "mx-auto px-4 py-12" }, [
                createVNode("h1", { class: "text-4xl font-bold mb-8" }, "Contact Us"),
                createVNode("div", { class: "bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8" }, [
                  createVNode("h2", { class: "text-2xl font-semibold mb-6" }, "Get in Touch"),
                  createVNode("div", { class: "grid md:grid-cols-2 gap-8" }, [
                    createVNode("div", { class: "space-y-4" }, [
                      unref(settings)?.company.name ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white" }, "Company"),
                        createVNode("p", { class: "text-gray-600 dark:text-gray-400" }, toDisplayString(unref(settings).company.name), 1)
                      ])) : createCommentVNode("", true),
                      unref(settings)?.company.address ? (openBlock(), createBlock("div", { key: 1 }, [
                        createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white" }, "Address"),
                        createVNode("p", { class: "text-gray-600 dark:text-gray-400 whitespace-pre-line" }, toDisplayString(unref(settings).company.address), 1)
                      ])) : createCommentVNode("", true),
                      unref(settings)?.site.contact_email ? (openBlock(), createBlock("div", { key: 2 }, [
                        createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white" }, "Email"),
                        createVNode("a", {
                          href: `mailto:${unref(settings).site.contact_email}`,
                          class: "text-primary-600 hover:text-blue-800 dark:text-primary-400"
                        }, toDisplayString(unref(settings).site.contact_email), 9, ["href"])
                      ])) : createCommentVNode("", true),
                      unref(settings)?.company.phone ? (openBlock(), createBlock("div", { key: 3 }, [
                        createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white" }, "Phone"),
                        createVNode("a", {
                          href: `tel:${unref(settings).company.phone}`,
                          class: "text-primary-600 hover:text-blue-800 dark:text-primary-400"
                        }, toDisplayString(unref(settings).company.phone), 9, ["href"])
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", null, [
                      createVNode("form", { class: "space-y-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium mb-2" }, "Name"),
                          createVNode("input", {
                            type: "text",
                            class: "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500",
                            placeholder: "Your name"
                          })
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium mb-2" }, "Email"),
                          createVNode("input", {
                            type: "email",
                            class: "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500",
                            placeholder: "your@email.com"
                          })
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium mb-2" }, "Message"),
                          createVNode("textarea", {
                            rows: "4",
                            class: "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500",
                            placeholder: "Your message..."
                          })
                        ]),
                        createVNode("button", {
                          type: "submit",
                          class: "w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition"
                        }, " Send Message ")
                      ])
                    ])
                  ])
                ]),
                unref(settings)?.social_media?.length ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "bg-gray-50 dark:bg-gray-900 rounded-lg p-8"
                }, [
                  createVNode("h2", { class: "text-2xl font-semibold mb-4" }, "Follow Us"),
                  createVNode("p", { class: "text-gray-600 dark:text-gray-400 mb-6" }, " Connect with us on social media "),
                  createVNode(_component_SocialMediaLinks, {
                    links: unref(settings).social_media,
                    "show-username": "",
                    "icon-size": "w-8 h-8"
                  }, null, 8, ["links"])
                ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=contact-CFPxWaKR.mjs.map
