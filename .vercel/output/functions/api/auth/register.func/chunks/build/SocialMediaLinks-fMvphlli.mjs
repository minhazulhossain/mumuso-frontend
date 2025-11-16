import { z as useSettings, d as _sfc_main$e } from './server.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SocialMediaLinks",
  __ssrInlineRender: true,
  props: {
    links: {},
    iconSize: {},
    showUsername: { type: Boolean }
  },
  async setup(__props) {
    let __temp, __restore;
    const { fetchSocialMedia } = useSettings();
    const { data: socialLinks, pending, error } = ([__temp, __restore] = withAsyncContext(() => fetchSocialMedia()), __temp = await __temp, __restore(), __temp);
    const platformIcons = {
      facebook: "i-lucide-facebook",
      twitter: "i-heroicons-x-mark",
      instagram: "i-heroicons-camera",
      linkedin: "i-heroicons-briefcase",
      youtube: "i-heroicons-play-circle",
      github: "i-heroicons-code-bracket",
      tiktok: "i-heroicons-musical-note",
      pinterest: "i-heroicons-pin",
      discord: "i-heroicons-chat-bubble-left-right",
      reddit: "i-heroicons-chat-bubble-bottom-center",
      snapchat: "i-heroicons-camera",
      whatsapp: "i-heroicons-chat-bubble-left-ellipsis",
      telegram: "i-heroicons-paper-airplane",
      twitch: "i-heroicons-video-camera",
      mastodon: "i-heroicons-megaphone"
    };
    const getIcon = (platform) => {
      return platformIcons[platform.toLowerCase()] || "i-heroicons-link";
    };
    const getPlatformName = (link) => {
      if (link.platform === "other" && link.platform_name) {
        return link.platform_name;
      }
      return link.platform.charAt(0).toUpperCase() + link.platform.slice(1);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$e;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-4" }, _attrs))}><!--[-->`);
      ssrRenderList(unref(socialLinks), (link) => {
        _push(`<a${ssrRenderAttr("href", link.url)} target="_blank" rel="noopener noreferrer"${ssrRenderAttr("title", getPlatformName(link))} class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-200">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: getIcon(link.platform),
          class: "size-7"
        }, null, _parent));
        _push(`</a>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SocialMediaLinks.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main, { __name: "SocialMediaLinks" });

export { __nuxt_component_2 as _ };
//# sourceMappingURL=SocialMediaLinks-fMvphlli.mjs.map
