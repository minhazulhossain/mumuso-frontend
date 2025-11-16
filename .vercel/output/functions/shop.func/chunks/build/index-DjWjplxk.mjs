import { _ as __nuxt_component_0 } from './LayoutPage-B-E_1iJt.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import './Container-DJ2zbRf-.mjs';
import 'reka-ui';
import './server.mjs';
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
import './SelectMenu-C5QjXK1B.mjs';
import './Input-DomsB7QD.mjs';
import './Badge-DZtstYnH.mjs';
import './useProducts-Dyx4NQUU.mjs';
import './ProductCard-DH2uBlVk.mjs';
import './Card-D31Cx9o-.mjs';
import './useCart-YbNJw6-2.mjs';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_ShopLayoutPage = __nuxt_component_0;
  _push(ssrRenderComponent(_component_ShopLayoutPage, mergeProps({
    title: "Shop",
    "sub-title": "Discover our amazing products"
  }, _attrs), null, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/shop/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index-DjWjplxk.mjs.map
