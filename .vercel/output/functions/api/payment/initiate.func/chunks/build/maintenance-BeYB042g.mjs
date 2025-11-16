import { defineComponent, withAsyncContext, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { z as useSettings, u as useHead } from './server.mjs';
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
  __name: "maintenance",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { fetchSiteSettings } = useSettings();
    const { data: site } = ([__temp, __restore] = withAsyncContext(() => fetchSiteSettings()), __temp = await __temp, __restore(), __temp);
    useHead({
      title: "Site Maintenance"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800" }, _attrs))}><div class="max-w-md w-full mx-4"><div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center"><div class="w-20 h-20 mx-auto mb-6 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center"><svg class="w-10 h-10 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg></div><h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4"> Under Maintenance </h1><p class="text-gray-600 dark:text-gray-400 mb-6">${ssrInterpolate(unref(site)?.name || "Our website")} is currently undergoing scheduled maintenance. We&#39;ll be back online shortly. Thank you for your patience! </p>`);
      if (unref(site)?.contact_email) {
        _push(`<div class="border-t border-gray-200 dark:border-gray-700 pt-6"><p class="text-sm text-gray-600 dark:text-gray-400 mb-2"> Need immediate assistance? </p><a${ssrRenderAttr("href", `mailto:${unref(site).contact_email}`)} class="text-blue-600 hover:text-blue-800 dark:text-blue-400 font-medium">${ssrInterpolate(unref(site).contact_email)}</a></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button class="mt-6 w-full text-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"> ← Go Back </button></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/maintenance.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=maintenance-BeYB042g.mjs.map
