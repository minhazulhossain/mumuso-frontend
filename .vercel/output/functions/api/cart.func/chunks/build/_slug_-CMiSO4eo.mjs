import { _ as __nuxt_component_0 } from './LayoutPage-B-E_1iJt.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { u as useContent } from './useContent-Bu7MSza8.mjs';
import { x as useRoute } from './server.mjs';
import './Container-DJ2zbRf-.mjs';
import 'reka-ui';
import './SelectMenu-C5QjXK1B.mjs';
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
import '@vueuse/core';
import './Input-DomsB7QD.mjs';
import './Badge-DZtstYnH.mjs';
import './useProducts-Dyx4NQUU.mjs';
import './_plugin-vue_export-helper-1tPrXgE0.mjs';
import './ProductCard-DH2uBlVk.mjs';
import './Card-D31Cx9o-.mjs';
import './useCart-YbNJw6-2.mjs';
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
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { fetchCategory } = useContent();
    const route = useRoute();
    const { data: category, pending } = ([__temp, __restore] = withAsyncContext(() => fetchCategory(route.params.slug)), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ShopLayoutPage = __nuxt_component_0;
      _push(ssrRenderComponent(_component_ShopLayoutPage, mergeProps({
        title: unref(category)?.name,
        "sub-title": unref(category)?.description,
        "loading-content": unref(pending)
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/categories/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-CMiSO4eo.mjs.map
