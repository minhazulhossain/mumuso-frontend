import { _ as _sfc_main$e } from './Container-DJ2zbRf-.mjs';
import { mergeProps, defineComponent, withAsyncContext, ref, withCtx, unref, createTextVNode, createBlock, createCommentVNode, toDisplayString, openBlock, createVNode, Fragment, renderList, computed, watch, isRef, reactive, useSlots, toRef, renderSlot, toHandlers, resolveDynamicComponent, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderVNode } from 'vue/server-renderer';
import { useForwardPropsEmits, DialogRoot, DialogTrigger, DialogPortal, DialogOverlay, DialogContent, VisuallyHidden, DialogTitle, DialogDescription, DialogClose, AccordionTrigger, AccordionItem, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuLink, NavigationMenuContent, AccordionContent, AccordionRoot, NavigationMenuRoot, NavigationMenuList, NavigationMenuIndicator, NavigationMenuViewport, TooltipRoot, TooltipTrigger, TooltipPortal, TooltipContent, TooltipArrow } from 'reka-ui';
import { reactivePick, createReusableTemplate } from '@vueuse/core';
import { F as useState, z as useSettings, a as useToast, d as _sfc_main$e$1, _ as __nuxt_component_0$1, b as useRouter, Q as useRuntimeConfig, y as _sfc_main$b$1, e as _sfc_main$8$1, n as useNuxtData, f as __nuxt_component_6, A as useUserSession, v as navigateTo, L as useLocale, o as useAppConfig, G as usePortal, t as tv, I as isArrayOfArray, r as get, N as _sfc_main$9$1, O as pickLinkProps, P as _sfc_main$a$1, x as useRoute } from './server.mjs';
import { G as defu, a8 as isMaxStockReached } from '../_/nitro.mjs';
import { _ as _sfc_main$l } from './Badge-DZtstYnH.mjs';
import { HoverCard, Popover } from 'reka-ui/namespaced';
import { _ as _sfc_main$g, a as _sfc_main$1$1, b as _sfc_main$3$1 } from './Modal-Wzdhz3aA.mjs';
import { _ as _sfc_main$f } from './Input-DomsB7QD.mjs';
import { _ as _sfc_main$h } from './Card-D31Cx9o-.mjs';
import { u as useCart } from './useCart-YbNJw6-2.mjs';
import { u as useAuth } from './useAuth-leGUVdDb.mjs';
import { u as useContent } from './useContent-Bu7MSza8.mjs';
import { _ as __nuxt_component_2$1 } from './SocialMediaLinks-fMvphlli.mjs';
import { _ as _sfc_main$i } from './Form-CfudII3J.mjs';
import { _ as _sfc_main$j } from './FormField-D7jUvIQZ.mjs';
import { _ as _sfc_main$k } from './Alert-67GI-HQ0.mjs';
import { useRoute as useRoute$1 } from 'vue-router';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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

const theme$3 = {
  "slots": {
    "overlay": "fixed inset-0 bg-elevated/75",
    "content": "fixed bg-default divide-y divide-default sm:ring ring-default sm:shadow-lg flex flex-col focus:outline-none",
    "header": "flex items-center gap-1.5 p-4 sm:px-6 min-h-16",
    "wrapper": "",
    "body": "flex-1 overflow-y-auto p-4 sm:p-6",
    "footer": "flex items-center gap-1.5 p-4 sm:px-6",
    "title": "text-highlighted font-semibold",
    "description": "mt-1 text-muted text-sm",
    "close": "absolute top-4 end-4"
  },
  "variants": {
    "side": {
      "top": {
        "content": "inset-x-0 top-0 max-h-full"
      },
      "right": {
        "content": "right-0 inset-y-0 w-full max-w-md"
      },
      "bottom": {
        "content": "inset-x-0 bottom-0 max-h-full"
      },
      "left": {
        "content": "left-0 inset-y-0 w-full max-w-md"
      }
    },
    "transition": {
      "true": {
        "overlay": "data-[state=open]:animate-[fade-in_200ms_ease-out] data-[state=closed]:animate-[fade-out_200ms_ease-in]"
      }
    }
  },
  "compoundVariants": [
    {
      "transition": true,
      "side": "top",
      "class": {
        "content": "data-[state=open]:animate-[slide-in-from-top_200ms_ease-in-out] data-[state=closed]:animate-[slide-out-to-top_200ms_ease-in-out]"
      }
    },
    {
      "transition": true,
      "side": "right",
      "class": {
        "content": "data-[state=open]:animate-[slide-in-from-right_200ms_ease-in-out] data-[state=closed]:animate-[slide-out-to-right_200ms_ease-in-out]"
      }
    },
    {
      "transition": true,
      "side": "bottom",
      "class": {
        "content": "data-[state=open]:animate-[slide-in-from-bottom_200ms_ease-in-out] data-[state=closed]:animate-[slide-out-to-bottom_200ms_ease-in-out]"
      }
    },
    {
      "transition": true,
      "side": "left",
      "class": {
        "content": "data-[state=open]:animate-[slide-in-from-left_200ms_ease-in-out] data-[state=closed]:animate-[slide-out-to-left_200ms_ease-in-out]"
      }
    }
  ]
};
const _sfc_main$d = {
  __name: "USlideover",
  __ssrInlineRender: true,
  props: {
    title: { type: String, required: false },
    description: { type: String, required: false },
    content: { type: Object, required: false },
    overlay: { type: Boolean, required: false, default: true },
    transition: { type: Boolean, required: false, default: true },
    side: { type: null, required: false, default: "right" },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    close: { type: [Boolean, Object], required: false, default: true },
    closeIcon: { type: [String, Object], required: false },
    dismissible: { type: Boolean, required: false, default: true },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    open: { type: Boolean, required: false },
    defaultOpen: { type: Boolean, required: false },
    modal: { type: Boolean, required: false, default: true }
  },
  emits: ["after:leave", "after:enter", "close:prevent", "update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const { t } = useLocale();
    const appConfig = useAppConfig();
    const rootProps = useForwardPropsEmits(reactivePick(props, "open", "defaultOpen", "modal"), emits);
    const portalProps = usePortal(toRef(() => props.portal));
    const contentProps = toRef(() => props.content);
    const contentEvents = computed(() => {
      const defaultEvents = {
        closeAutoFocus: (e) => e.preventDefault()
      };
      if (!props.dismissible) {
        const events = ["pointerDownOutside", "interactOutside", "escapeKeyDown"];
        return events.reduce((acc, curr) => {
          acc[curr] = (e) => {
            e.preventDefault();
            emits("close:prevent");
          };
          return acc;
        }, defaultEvents);
      }
      return defaultEvents;
    });
    const ui = computed(() => tv({ extend: tv(theme$3), ...appConfig.ui?.slideover || {} })({
      transition: props.transition,
      side: props.side
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogRoot), mergeProps(unref(rootProps), _attrs), {
        default: withCtx(({ open, close }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!!slots.default) {
              _push2(ssrRenderComponent(unref(DialogTrigger), {
                "as-child": "",
                class: props.class
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "default", { open }, null, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "default", { open })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(DialogPortal), unref(portalProps), {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (__props.overlay) {
                    _push3(ssrRenderComponent(unref(DialogOverlay), {
                      class: ui.value.overlay({ class: props.ui?.overlay })
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(unref(DialogContent), mergeProps({
                    "data-side": __props.side,
                    class: ui.value.content({ class: [!slots.default && props.class, props.ui?.content] })
                  }, contentProps.value, {
                    onAfterEnter: ($event) => emits("after:enter"),
                    onAfterLeave: ($event) => emits("after:leave")
                  }, toHandlers(contentEvents.value)), {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (!!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description))) {
                          _push4(ssrRenderComponent(unref(VisuallyHidden), null, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                if (__props.title || !!slots.title) {
                                  _push5(ssrRenderComponent(unref(DialogTitle), null, {
                                    default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                                          _push6(`${ssrInterpolate(__props.title)}`);
                                        }, _push6, _parent6, _scopeId5);
                                      } else {
                                        return [
                                          renderSlot(_ctx.$slots, "title", {}, () => [
                                            createTextVNode(toDisplayString(__props.title), 1)
                                          ])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                                if (__props.description || !!slots.description) {
                                  _push5(ssrRenderComponent(unref(DialogDescription), null, {
                                    default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        ssrRenderSlot(_ctx.$slots, "description", {}, () => {
                                          _push6(`${ssrInterpolate(__props.description)}`);
                                        }, _push6, _parent6, _scopeId5);
                                      } else {
                                        return [
                                          renderSlot(_ctx.$slots, "description", {}, () => [
                                            createTextVNode(toDisplayString(__props.description), 1)
                                          ])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                              } else {
                                return [
                                  __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), { key: 0 }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "title", {}, () => [
                                        createTextVNode(toDisplayString(__props.title), 1)
                                      ])
                                    ]),
                                    _: 3
                                  })) : createCommentVNode("", true),
                                  __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), { key: 1 }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "description", {}, () => [
                                        createTextVNode(toDisplayString(__props.description), 1)
                                      ])
                                    ]),
                                    _: 3
                                  })) : createCommentVNode("", true)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        ssrRenderSlot(_ctx.$slots, "content", { close }, () => {
                          if (!!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (props.close || !!slots.close)) {
                            _push4(`<div class="${ssrRenderClass(ui.value.header({ class: props.ui?.header }))}"${_scopeId3}>`);
                            ssrRenderSlot(_ctx.$slots, "header", { close }, () => {
                              _push4(`<div class="${ssrRenderClass(ui.value.wrapper({ class: props.ui?.wrapper }))}"${_scopeId3}>`);
                              if (__props.title || !!slots.title) {
                                _push4(ssrRenderComponent(unref(DialogTitle), {
                                  class: ui.value.title({ class: props.ui?.title })
                                }, {
                                  default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      ssrRenderSlot(_ctx.$slots, "title", {}, () => {
                                        _push5(`${ssrInterpolate(__props.title)}`);
                                      }, _push5, _parent5, _scopeId4);
                                    } else {
                                      return [
                                        renderSlot(_ctx.$slots, "title", {}, () => [
                                          createTextVNode(toDisplayString(__props.title), 1)
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              if (__props.description || !!slots.description) {
                                _push4(ssrRenderComponent(unref(DialogDescription), {
                                  class: ui.value.description({ class: props.ui?.description })
                                }, {
                                  default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      ssrRenderSlot(_ctx.$slots, "description", {}, () => {
                                        _push5(`${ssrInterpolate(__props.description)}`);
                                      }, _push5, _parent5, _scopeId4);
                                    } else {
                                      return [
                                        renderSlot(_ctx.$slots, "description", {}, () => [
                                          createTextVNode(toDisplayString(__props.description), 1)
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              _push4(`</div>`);
                              ssrRenderSlot(_ctx.$slots, "actions", {}, null, _push4, _parent4, _scopeId3);
                              if (props.close || !!slots.close) {
                                _push4(ssrRenderComponent(unref(DialogClose), { "as-child": "" }, {
                                  default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      ssrRenderSlot(_ctx.$slots, "close", {
                                        close,
                                        ui: ui.value
                                      }, () => {
                                        if (props.close) {
                                          _push5(ssrRenderComponent(_sfc_main$8$1, mergeProps({
                                            icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                                            color: "neutral",
                                            variant: "ghost",
                                            "aria-label": unref(t)("slideover.close")
                                          }, typeof props.close === "object" ? props.close : {}, {
                                            class: ui.value.close({ class: props.ui?.close })
                                          }), null, _parent5, _scopeId4));
                                        } else {
                                          _push5(`<!---->`);
                                        }
                                      }, _push5, _parent5, _scopeId4);
                                    } else {
                                      return [
                                        renderSlot(_ctx.$slots, "close", {
                                          close,
                                          ui: ui.value
                                        }, () => [
                                          props.close ? (openBlock(), createBlock(_sfc_main$8$1, mergeProps({
                                            key: 0,
                                            icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                                            color: "neutral",
                                            variant: "ghost",
                                            "aria-label": unref(t)("slideover.close")
                                          }, typeof props.close === "object" ? props.close : {}, {
                                            class: ui.value.close({ class: props.ui?.close })
                                          }), null, 16, ["icon", "aria-label", "class"])) : createCommentVNode("", true)
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                            }, _push4, _parent4, _scopeId3);
                            _push4(`</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`<div class="${ssrRenderClass(ui.value.body({ class: props.ui?.body }))}"${_scopeId3}>`);
                          ssrRenderSlot(_ctx.$slots, "body", { close }, null, _push4, _parent4, _scopeId3);
                          _push4(`</div>`);
                          if (!!slots.footer) {
                            _push4(`<div class="${ssrRenderClass(ui.value.footer({ class: props.ui?.footer }))}"${_scopeId3}>`);
                            ssrRenderSlot(_ctx.$slots, "footer", { close }, null, _push4, _parent4, _scopeId3);
                            _push4(`</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                        }, _push4, _parent4, _scopeId3);
                      } else {
                        return [
                          !!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description)) ? (openBlock(), createBlock(unref(VisuallyHidden), { key: 0 }, {
                            default: withCtx(() => [
                              __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), { key: 0 }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "title", {}, () => [
                                    createTextVNode(toDisplayString(__props.title), 1)
                                  ])
                                ]),
                                _: 3
                              })) : createCommentVNode("", true),
                              __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), { key: 1 }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "description", {}, () => [
                                    createTextVNode(toDisplayString(__props.description), 1)
                                  ])
                                ]),
                                _: 3
                              })) : createCommentVNode("", true)
                            ]),
                            _: 3
                          })) : createCommentVNode("", true),
                          renderSlot(_ctx.$slots, "content", { close }, () => [
                            !!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (props.close || !!slots.close) ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: ui.value.header({ class: props.ui?.header })
                            }, [
                              renderSlot(_ctx.$slots, "header", { close }, () => [
                                createVNode("div", {
                                  class: ui.value.wrapper({ class: props.ui?.wrapper })
                                }, [
                                  __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), {
                                    key: 0,
                                    class: ui.value.title({ class: props.ui?.title })
                                  }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "title", {}, () => [
                                        createTextVNode(toDisplayString(__props.title), 1)
                                      ])
                                    ]),
                                    _: 3
                                  }, 8, ["class"])) : createCommentVNode("", true),
                                  __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), {
                                    key: 1,
                                    class: ui.value.description({ class: props.ui?.description })
                                  }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "description", {}, () => [
                                        createTextVNode(toDisplayString(__props.description), 1)
                                      ])
                                    ]),
                                    _: 3
                                  }, 8, ["class"])) : createCommentVNode("", true)
                                ], 2),
                                renderSlot(_ctx.$slots, "actions"),
                                props.close || !!slots.close ? (openBlock(), createBlock(unref(DialogClose), {
                                  key: 0,
                                  "as-child": ""
                                }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "close", {
                                      close,
                                      ui: ui.value
                                    }, () => [
                                      props.close ? (openBlock(), createBlock(_sfc_main$8$1, mergeProps({
                                        key: 0,
                                        icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                                        color: "neutral",
                                        variant: "ghost",
                                        "aria-label": unref(t)("slideover.close")
                                      }, typeof props.close === "object" ? props.close : {}, {
                                        class: ui.value.close({ class: props.ui?.close })
                                      }), null, 16, ["icon", "aria-label", "class"])) : createCommentVNode("", true)
                                    ])
                                  ]),
                                  _: 2
                                }, 1024)) : createCommentVNode("", true)
                              ])
                            ], 2)) : createCommentVNode("", true),
                            createVNode("div", {
                              class: ui.value.body({ class: props.ui?.body })
                            }, [
                              renderSlot(_ctx.$slots, "body", { close })
                            ], 2),
                            !!slots.footer ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: ui.value.footer({ class: props.ui?.footer })
                            }, [
                              renderSlot(_ctx.$slots, "footer", { close })
                            ], 2)) : createCommentVNode("", true)
                          ])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    __props.overlay ? (openBlock(), createBlock(unref(DialogOverlay), {
                      key: 0,
                      class: ui.value.overlay({ class: props.ui?.overlay })
                    }, null, 8, ["class"])) : createCommentVNode("", true),
                    createVNode(unref(DialogContent), mergeProps({
                      "data-side": __props.side,
                      class: ui.value.content({ class: [!slots.default && props.class, props.ui?.content] })
                    }, contentProps.value, {
                      onAfterEnter: ($event) => emits("after:enter"),
                      onAfterLeave: ($event) => emits("after:leave")
                    }, toHandlers(contentEvents.value)), {
                      default: withCtx(() => [
                        !!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description)) ? (openBlock(), createBlock(unref(VisuallyHidden), { key: 0 }, {
                          default: withCtx(() => [
                            __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), { key: 0 }, {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, "title", {}, () => [
                                  createTextVNode(toDisplayString(__props.title), 1)
                                ])
                              ]),
                              _: 3
                            })) : createCommentVNode("", true),
                            __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), { key: 1 }, {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, "description", {}, () => [
                                  createTextVNode(toDisplayString(__props.description), 1)
                                ])
                              ]),
                              _: 3
                            })) : createCommentVNode("", true)
                          ]),
                          _: 3
                        })) : createCommentVNode("", true),
                        renderSlot(_ctx.$slots, "content", { close }, () => [
                          !!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (props.close || !!slots.close) ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: ui.value.header({ class: props.ui?.header })
                          }, [
                            renderSlot(_ctx.$slots, "header", { close }, () => [
                              createVNode("div", {
                                class: ui.value.wrapper({ class: props.ui?.wrapper })
                              }, [
                                __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), {
                                  key: 0,
                                  class: ui.value.title({ class: props.ui?.title })
                                }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "title", {}, () => [
                                      createTextVNode(toDisplayString(__props.title), 1)
                                    ])
                                  ]),
                                  _: 3
                                }, 8, ["class"])) : createCommentVNode("", true),
                                __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), {
                                  key: 1,
                                  class: ui.value.description({ class: props.ui?.description })
                                }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, "description", {}, () => [
                                      createTextVNode(toDisplayString(__props.description), 1)
                                    ])
                                  ]),
                                  _: 3
                                }, 8, ["class"])) : createCommentVNode("", true)
                              ], 2),
                              renderSlot(_ctx.$slots, "actions"),
                              props.close || !!slots.close ? (openBlock(), createBlock(unref(DialogClose), {
                                key: 0,
                                "as-child": ""
                              }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "close", {
                                    close,
                                    ui: ui.value
                                  }, () => [
                                    props.close ? (openBlock(), createBlock(_sfc_main$8$1, mergeProps({
                                      key: 0,
                                      icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                                      color: "neutral",
                                      variant: "ghost",
                                      "aria-label": unref(t)("slideover.close")
                                    }, typeof props.close === "object" ? props.close : {}, {
                                      class: ui.value.close({ class: props.ui?.close })
                                    }), null, 16, ["icon", "aria-label", "class"])) : createCommentVNode("", true)
                                  ])
                                ]),
                                _: 2
                              }, 1024)) : createCommentVNode("", true)
                            ])
                          ], 2)) : createCommentVNode("", true),
                          createVNode("div", {
                            class: ui.value.body({ class: props.ui?.body })
                          }, [
                            renderSlot(_ctx.$slots, "body", { close })
                          ], 2),
                          !!slots.footer ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: ui.value.footer({ class: props.ui?.footer })
                          }, [
                            renderSlot(_ctx.$slots, "footer", { close })
                          ], 2)) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 2
                    }, 1040, ["data-side", "class", "onAfterEnter", "onAfterLeave"])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              !!slots.default ? (openBlock(), createBlock(unref(DialogTrigger), {
                key: 0,
                "as-child": "",
                class: props.class
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", { open })
                ]),
                _: 2
              }, 1032, ["class"])) : createCommentVNode("", true),
              createVNode(unref(DialogPortal), unref(portalProps), {
                default: withCtx(() => [
                  __props.overlay ? (openBlock(), createBlock(unref(DialogOverlay), {
                    key: 0,
                    class: ui.value.overlay({ class: props.ui?.overlay })
                  }, null, 8, ["class"])) : createCommentVNode("", true),
                  createVNode(unref(DialogContent), mergeProps({
                    "data-side": __props.side,
                    class: ui.value.content({ class: [!slots.default && props.class, props.ui?.content] })
                  }, contentProps.value, {
                    onAfterEnter: ($event) => emits("after:enter"),
                    onAfterLeave: ($event) => emits("after:leave")
                  }, toHandlers(contentEvents.value)), {
                    default: withCtx(() => [
                      !!slots.content && (__props.title || !!slots.title || (__props.description || !!slots.description)) ? (openBlock(), createBlock(unref(VisuallyHidden), { key: 0 }, {
                        default: withCtx(() => [
                          __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), { key: 0 }, {
                            default: withCtx(() => [
                              renderSlot(_ctx.$slots, "title", {}, () => [
                                createTextVNode(toDisplayString(__props.title), 1)
                              ])
                            ]),
                            _: 3
                          })) : createCommentVNode("", true),
                          __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), { key: 1 }, {
                            default: withCtx(() => [
                              renderSlot(_ctx.$slots, "description", {}, () => [
                                createTextVNode(toDisplayString(__props.description), 1)
                              ])
                            ]),
                            _: 3
                          })) : createCommentVNode("", true)
                        ]),
                        _: 3
                      })) : createCommentVNode("", true),
                      renderSlot(_ctx.$slots, "content", { close }, () => [
                        !!slots.header || (__props.title || !!slots.title) || (__props.description || !!slots.description) || (props.close || !!slots.close) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: ui.value.header({ class: props.ui?.header })
                        }, [
                          renderSlot(_ctx.$slots, "header", { close }, () => [
                            createVNode("div", {
                              class: ui.value.wrapper({ class: props.ui?.wrapper })
                            }, [
                              __props.title || !!slots.title ? (openBlock(), createBlock(unref(DialogTitle), {
                                key: 0,
                                class: ui.value.title({ class: props.ui?.title })
                              }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "title", {}, () => [
                                    createTextVNode(toDisplayString(__props.title), 1)
                                  ])
                                ]),
                                _: 3
                              }, 8, ["class"])) : createCommentVNode("", true),
                              __props.description || !!slots.description ? (openBlock(), createBlock(unref(DialogDescription), {
                                key: 1,
                                class: ui.value.description({ class: props.ui?.description })
                              }, {
                                default: withCtx(() => [
                                  renderSlot(_ctx.$slots, "description", {}, () => [
                                    createTextVNode(toDisplayString(__props.description), 1)
                                  ])
                                ]),
                                _: 3
                              }, 8, ["class"])) : createCommentVNode("", true)
                            ], 2),
                            renderSlot(_ctx.$slots, "actions"),
                            props.close || !!slots.close ? (openBlock(), createBlock(unref(DialogClose), {
                              key: 0,
                              "as-child": ""
                            }, {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, "close", {
                                  close,
                                  ui: ui.value
                                }, () => [
                                  props.close ? (openBlock(), createBlock(_sfc_main$8$1, mergeProps({
                                    key: 0,
                                    icon: __props.closeIcon || unref(appConfig).ui.icons.close,
                                    color: "neutral",
                                    variant: "ghost",
                                    "aria-label": unref(t)("slideover.close")
                                  }, typeof props.close === "object" ? props.close : {}, {
                                    class: ui.value.close({ class: props.ui?.close })
                                  }), null, 16, ["icon", "aria-label", "class"])) : createCommentVNode("", true)
                                ])
                              ]),
                              _: 2
                            }, 1024)) : createCommentVNode("", true)
                          ])
                        ], 2)) : createCommentVNode("", true),
                        createVNode("div", {
                          class: ui.value.body({ class: props.ui?.body })
                        }, [
                          renderSlot(_ctx.$slots, "body", { close })
                        ], 2),
                        !!slots.footer ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: ui.value.footer({ class: props.ui?.footer })
                        }, [
                          renderSlot(_ctx.$slots, "footer", { close })
                        ], 2)) : createCommentVNode("", true)
                      ])
                    ]),
                    _: 2
                  }, 1040, ["data-side", "class", "onAfterEnter", "onAfterLeave"])
                ]),
                _: 2
              }, 1040)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Slideover.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const theme$2 = {
  "slots": {
    "content": "bg-default shadow-lg rounded-md ring ring-default data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-popover-content-transform-origin) focus:outline-none pointer-events-auto",
    "arrow": "fill-default"
  }
};
const _sfc_main$c = {
  __name: "UPopover",
  __ssrInlineRender: true,
  props: {
    mode: { type: String, required: false, default: "click" },
    content: { type: Object, required: false },
    arrow: { type: [Boolean, Object], required: false },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    reference: { type: null, required: false },
    dismissible: { type: Boolean, required: false, default: true },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    defaultOpen: { type: Boolean, required: false },
    open: { type: Boolean, required: false },
    modal: { type: Boolean, required: false },
    openDelay: { type: Number, required: false, default: 0 },
    closeDelay: { type: Number, required: false, default: 0 }
  },
  emits: ["close:prevent", "update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const appConfig = useAppConfig();
    const pick = props.mode === "hover" ? reactivePick(props, "defaultOpen", "open", "openDelay", "closeDelay") : reactivePick(props, "defaultOpen", "open", "modal");
    const rootProps = useForwardPropsEmits(pick, emits);
    const portalProps = usePortal(toRef(() => props.portal));
    const contentProps = toRef(() => defu(props.content, { side: "bottom", sideOffset: 8, collisionPadding: 8 }));
    const contentEvents = computed(() => {
      if (!props.dismissible) {
        const events = ["pointerDownOutside", "interactOutside", "escapeKeyDown"];
        return events.reduce((acc, curr) => {
          acc[curr] = (e) => {
            e.preventDefault();
            emits("close:prevent");
          };
          return acc;
        }, {});
      }
      return {};
    });
    const arrowProps = toRef(() => props.arrow);
    const ui = computed(() => tv({ extend: tv(theme$2), ...appConfig.ui?.popover || {} })({
      side: contentProps.value.side
    }));
    const Component = computed(() => props.mode === "hover" ? HoverCard : Popover);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Component).Root, mergeProps(unref(rootProps), _attrs), {
        default: withCtx(({ open }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!!slots.default || !!__props.reference) {
              _push2(ssrRenderComponent(unref(Component).Trigger, {
                "as-child": "",
                reference: __props.reference,
                class: props.class
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "default", { open }, null, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "default", { open })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if ("Anchor" in Component.value && !!slots.anchor) {
              _push2(ssrRenderComponent(unref(Component).Anchor, { "as-child": "" }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "anchor", {}, null, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "anchor")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(Component).Portal, unref(portalProps), {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Component).Content, mergeProps(contentProps.value, {
                    class: ui.value.content({ class: [!slots.default && props.class, props.ui?.content] })
                  }, toHandlers(contentEvents.value)), {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        ssrRenderSlot(_ctx.$slots, "content", {}, null, _push4, _parent4, _scopeId3);
                        if (!!__props.arrow) {
                          _push4(ssrRenderComponent(unref(Component).Arrow, mergeProps(arrowProps.value, {
                            class: ui.value.arrow({ class: props.ui?.arrow })
                          }), null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          renderSlot(_ctx.$slots, "content"),
                          !!__props.arrow ? (openBlock(), createBlock(unref(Component).Arrow, mergeProps({ key: 0 }, arrowProps.value, {
                            class: ui.value.arrow({ class: props.ui?.arrow })
                          }), null, 16, ["class"])) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Component).Content, mergeProps(contentProps.value, {
                      class: ui.value.content({ class: [!slots.default && props.class, props.ui?.content] })
                    }, toHandlers(contentEvents.value)), {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "content"),
                        !!__props.arrow ? (openBlock(), createBlock(unref(Component).Arrow, mergeProps({ key: 0 }, arrowProps.value, {
                          class: ui.value.arrow({ class: props.ui?.arrow })
                        }), null, 16, ["class"])) : createCommentVNode("", true)
                      ]),
                      _: 3
                    }, 16, ["class"])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              !!slots.default || !!__props.reference ? (openBlock(), createBlock(unref(Component).Trigger, {
                key: 0,
                "as-child": "",
                reference: __props.reference,
                class: props.class
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", { open })
                ]),
                _: 2
              }, 1032, ["reference", "class"])) : createCommentVNode("", true),
              "Anchor" in Component.value && !!slots.anchor ? (openBlock(), createBlock(unref(Component).Anchor, {
                key: 1,
                "as-child": ""
              }, {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "anchor")
                ]),
                _: 3
              })) : createCommentVNode("", true),
              createVNode(unref(Component).Portal, unref(portalProps), {
                default: withCtx(() => [
                  createVNode(unref(Component).Content, mergeProps(contentProps.value, {
                    class: ui.value.content({ class: [!slots.default && props.class, props.ui?.content] })
                  }, toHandlers(contentEvents.value)), {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "content"),
                      !!__props.arrow ? (openBlock(), createBlock(unref(Component).Arrow, mergeProps({ key: 0 }, arrowProps.value, {
                        class: ui.value.arrow({ class: props.ui?.arrow })
                      }), null, 16, ["class"])) : createCommentVNode("", true)
                    ]),
                    _: 3
                  }, 16, ["class"])
                ]),
                _: 3
              }, 16)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Popover.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const theme$1 = {
  "slots": {
    "content": "flex items-center gap-1 bg-default text-highlighted shadow-sm rounded-sm ring ring-default h-6 px-2.5 py-1 text-xs select-none data-[state=delayed-open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-tooltip-content-transform-origin) pointer-events-auto",
    "arrow": "fill-default",
    "text": "truncate",
    "kbds": "hidden lg:inline-flex items-center shrink-0 gap-0.5 not-first-of-type:before:content-['·'] not-first-of-type:before:me-0.5",
    "kbdsSize": "sm"
  }
};
const _sfc_main$b = {
  __name: "UTooltip",
  __ssrInlineRender: true,
  props: {
    text: { type: String, required: false },
    kbds: { type: Array, required: false },
    content: { type: Object, required: false },
    arrow: { type: [Boolean, Object], required: false },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    reference: { type: null, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    defaultOpen: { type: Boolean, required: false },
    open: { type: Boolean, required: false },
    delayDuration: { type: Number, required: false },
    disableHoverableContent: { type: Boolean, required: false },
    disableClosingTrigger: { type: Boolean, required: false },
    disabled: { type: Boolean, required: false },
    ignoreNonKeyboardFocus: { type: Boolean, required: false }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const appConfig = useAppConfig();
    const rootProps = useForwardPropsEmits(reactivePick(props, "defaultOpen", "open", "delayDuration", "disableHoverableContent", "disableClosingTrigger", "ignoreNonKeyboardFocus"), emits);
    const portalProps = usePortal(toRef(() => props.portal));
    const contentProps = toRef(() => defu(props.content, { side: "bottom", sideOffset: 8, collisionPadding: 8 }));
    const arrowProps = toRef(() => props.arrow);
    const ui = computed(() => tv({ extend: tv(theme$1), ...appConfig.ui?.tooltip || {} })({
      side: contentProps.value.side
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TooltipRoot), mergeProps(unref(rootProps), {
        disabled: !(__props.text || __props.kbds?.length || !!slots.content) || props.disabled
      }, _attrs), {
        default: withCtx(({ open }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!!slots.default || !!__props.reference) {
              _push2(ssrRenderComponent(unref(TooltipTrigger), mergeProps(_ctx.$attrs, {
                "as-child": "",
                reference: __props.reference,
                class: props.class
              }), {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "default", { open }, null, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "default", { open })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(TooltipPortal), unref(portalProps), {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(TooltipContent), mergeProps(contentProps.value, {
                    class: ui.value.content({ class: [!slots.default && props.class, props.ui?.content] })
                  }), {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        ssrRenderSlot(_ctx.$slots, "content", {}, () => {
                          if (__props.text) {
                            _push4(`<span class="${ssrRenderClass(ui.value.text({ class: props.ui?.text }))}"${_scopeId3}>${ssrInterpolate(__props.text)}</span>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          if (__props.kbds?.length) {
                            _push4(`<span class="${ssrRenderClass(ui.value.kbds({ class: props.ui?.kbds }))}"${_scopeId3}><!--[-->`);
                            ssrRenderList(__props.kbds, (kbd, index) => {
                              _push4(ssrRenderComponent(_sfc_main$3$1, mergeProps({
                                key: index,
                                size: props.ui?.kbdsSize || ui.value.kbdsSize()
                              }, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, _parent4, _scopeId3));
                            });
                            _push4(`<!--]--></span>`);
                          } else {
                            _push4(`<!---->`);
                          }
                        }, _push4, _parent4, _scopeId3);
                        if (!!__props.arrow) {
                          _push4(ssrRenderComponent(unref(TooltipArrow), mergeProps(arrowProps.value, {
                            class: ui.value.arrow({ class: props.ui?.arrow })
                          }), null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          renderSlot(_ctx.$slots, "content", {}, () => [
                            __props.text ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: ui.value.text({ class: props.ui?.text })
                            }, toDisplayString(__props.text), 3)) : createCommentVNode("", true),
                            __props.kbds?.length ? (openBlock(), createBlock("span", {
                              key: 1,
                              class: ui.value.kbds({ class: props.ui?.kbds })
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.kbds, (kbd, index) => {
                                return openBlock(), createBlock(_sfc_main$3$1, mergeProps({
                                  key: index,
                                  size: props.ui?.kbdsSize || ui.value.kbdsSize()
                                }, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, 16, ["size"]);
                              }), 128))
                            ], 2)) : createCommentVNode("", true)
                          ]),
                          !!__props.arrow ? (openBlock(), createBlock(unref(TooltipArrow), mergeProps({ key: 0 }, arrowProps.value, {
                            class: ui.value.arrow({ class: props.ui?.arrow })
                          }), null, 16, ["class"])) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(TooltipContent), mergeProps(contentProps.value, {
                      class: ui.value.content({ class: [!slots.default && props.class, props.ui?.content] })
                    }), {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "content", {}, () => [
                          __props.text ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: ui.value.text({ class: props.ui?.text })
                          }, toDisplayString(__props.text), 3)) : createCommentVNode("", true),
                          __props.kbds?.length ? (openBlock(), createBlock("span", {
                            key: 1,
                            class: ui.value.kbds({ class: props.ui?.kbds })
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.kbds, (kbd, index) => {
                              return openBlock(), createBlock(_sfc_main$3$1, mergeProps({
                                key: index,
                                size: props.ui?.kbdsSize || ui.value.kbdsSize()
                              }, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, 16, ["size"]);
                            }), 128))
                          ], 2)) : createCommentVNode("", true)
                        ]),
                        !!__props.arrow ? (openBlock(), createBlock(unref(TooltipArrow), mergeProps({ key: 0 }, arrowProps.value, {
                          class: ui.value.arrow({ class: props.ui?.arrow })
                        }), null, 16, ["class"])) : createCommentVNode("", true)
                      ]),
                      _: 3
                    }, 16, ["class"])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              !!slots.default || !!__props.reference ? (openBlock(), createBlock(unref(TooltipTrigger), mergeProps({ key: 0 }, _ctx.$attrs, {
                "as-child": "",
                reference: __props.reference,
                class: props.class
              }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", { open })
                ]),
                _: 2
              }, 1040, ["reference", "class"])) : createCommentVNode("", true),
              createVNode(unref(TooltipPortal), unref(portalProps), {
                default: withCtx(() => [
                  createVNode(unref(TooltipContent), mergeProps(contentProps.value, {
                    class: ui.value.content({ class: [!slots.default && props.class, props.ui?.content] })
                  }), {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "content", {}, () => [
                        __props.text ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: ui.value.text({ class: props.ui?.text })
                        }, toDisplayString(__props.text), 3)) : createCommentVNode("", true),
                        __props.kbds?.length ? (openBlock(), createBlock("span", {
                          key: 1,
                          class: ui.value.kbds({ class: props.ui?.kbds })
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.kbds, (kbd, index) => {
                            return openBlock(), createBlock(_sfc_main$3$1, mergeProps({
                              key: index,
                              size: props.ui?.kbdsSize || ui.value.kbdsSize()
                            }, { ref_for: true }, typeof kbd === "string" ? { value: kbd } : kbd), null, 16, ["size"]);
                          }), 128))
                        ], 2)) : createCommentVNode("", true)
                      ]),
                      !!__props.arrow ? (openBlock(), createBlock(unref(TooltipArrow), mergeProps({ key: 0 }, arrowProps.value, {
                        class: ui.value.arrow({ class: props.ui?.arrow })
                      }), null, 16, ["class"])) : createCommentVNode("", true)
                    ]),
                    _: 3
                  }, 16, ["class"])
                ]),
                _: 3
              }, 16)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Tooltip.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const theme = {
  "slots": {
    "root": "relative flex gap-1.5 [&>div]:min-w-0",
    "list": "isolate min-w-0",
    "label": "w-full flex items-center gap-1.5 font-semibold text-xs/5 text-highlighted px-2.5 py-1.5",
    "item": "min-w-0",
    "link": "group relative w-full flex items-center gap-1.5 font-medium text-sm before:absolute before:z-[-1] before:rounded-md focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2",
    "linkLeadingIcon": "shrink-0 size-5",
    "linkLeadingAvatar": "shrink-0",
    "linkLeadingAvatarSize": "2xs",
    "linkTrailing": "group ms-auto inline-flex gap-1.5 items-center",
    "linkTrailingBadge": "shrink-0",
    "linkTrailingBadgeSize": "sm",
    "linkTrailingIcon": "size-5 transform shrink-0 group-data-[state=open]:rotate-180 transition-transform duration-200",
    "linkLabel": "truncate",
    "linkLabelExternalIcon": "inline-block size-3 align-top text-dimmed",
    "childList": "isolate",
    "childLabel": "text-xs text-highlighted",
    "childItem": "",
    "childLink": "group relative size-full flex items-start text-start text-sm before:absolute before:z-[-1] before:rounded-md focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2",
    "childLinkWrapper": "min-w-0",
    "childLinkIcon": "size-5 shrink-0",
    "childLinkLabel": "truncate",
    "childLinkLabelExternalIcon": "inline-block size-3 align-top text-dimmed",
    "childLinkDescription": "text-muted",
    "separator": "px-2 h-px bg-border",
    "viewportWrapper": "absolute top-full left-0 flex w-full",
    "viewport": "relative overflow-hidden bg-default shadow-lg rounded-md ring ring-default h-(--reka-navigation-menu-viewport-height) w-full transition-[width,height,left] duration-200 origin-[top_center] data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] z-[1]",
    "content": "",
    "indicator": "absolute data-[state=visible]:animate-[fade-in_100ms_ease-out] data-[state=hidden]:animate-[fade-out_100ms_ease-in] data-[state=hidden]:opacity-0 bottom-0 z-[2] w-(--reka-navigation-menu-indicator-size) translate-x-(--reka-navigation-menu-indicator-position) flex h-2.5 items-end justify-center overflow-hidden transition-[translate,width] duration-200",
    "arrow": "relative top-[50%] size-2.5 rotate-45 border border-default bg-default z-[1] rounded-xs"
  },
  "variants": {
    "color": {
      "primary": {
        "link": "focus-visible:before:ring-primary",
        "childLink": "focus-visible:before:ring-primary"
      },
      "secondary": {
        "link": "focus-visible:before:ring-secondary",
        "childLink": "focus-visible:before:ring-secondary"
      },
      "success": {
        "link": "focus-visible:before:ring-success",
        "childLink": "focus-visible:before:ring-success"
      },
      "info": {
        "link": "focus-visible:before:ring-info",
        "childLink": "focus-visible:before:ring-info"
      },
      "warning": {
        "link": "focus-visible:before:ring-warning",
        "childLink": "focus-visible:before:ring-warning"
      },
      "error": {
        "link": "focus-visible:before:ring-error",
        "childLink": "focus-visible:before:ring-error"
      },
      "neutral": {
        "link": "focus-visible:before:ring-inverted",
        "childLink": "focus-visible:before:ring-inverted"
      }
    },
    "highlightColor": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "variant": {
      "pill": "",
      "link": ""
    },
    "orientation": {
      "horizontal": {
        "root": "items-center justify-between",
        "list": "flex items-center",
        "item": "py-2",
        "link": "px-2.5 py-1.5 before:inset-x-px before:inset-y-0",
        "childList": "grid p-2",
        "childLink": "px-3 py-2 gap-2 before:inset-x-px before:inset-y-0",
        "childLinkLabel": "font-medium",
        "content": "absolute top-0 left-0 w-full max-h-[70vh] overflow-y-auto"
      },
      "vertical": {
        "root": "flex-col",
        "link": "flex-row px-2.5 py-1.5 before:inset-y-px before:inset-x-0",
        "childLabel": "px-1.5 py-0.5",
        "childLink": "p-1.5 gap-1.5 before:inset-y-px before:inset-x-0"
      }
    },
    "contentOrientation": {
      "horizontal": {
        "viewportWrapper": "justify-center",
        "content": "data-[motion=from-start]:animate-[enter-from-left_200ms_ease] data-[motion=from-end]:animate-[enter-from-right_200ms_ease] data-[motion=to-start]:animate-[exit-to-left_200ms_ease] data-[motion=to-end]:animate-[exit-to-right_200ms_ease]"
      },
      "vertical": {
        "viewport": "sm:w-(--reka-navigation-menu-viewport-width) left-(--reka-navigation-menu-viewport-left)"
      }
    },
    "active": {
      "true": {
        "childLink": "before:bg-elevated text-highlighted",
        "childLinkIcon": "text-default"
      },
      "false": {
        "link": "text-muted",
        "linkLeadingIcon": "text-dimmed",
        "childLink": [
          "hover:before:bg-elevated/50 text-default hover:text-highlighted",
          "transition-colors before:transition-colors"
        ],
        "childLinkIcon": [
          "text-dimmed group-hover:text-default",
          "transition-colors"
        ]
      }
    },
    "disabled": {
      "true": {
        "link": "cursor-not-allowed opacity-75"
      }
    },
    "highlight": {
      "true": ""
    },
    "level": {
      "true": ""
    },
    "collapsed": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "orientation": "horizontal",
      "contentOrientation": "horizontal",
      "class": {
        "childList": "grid-cols-2 gap-2"
      }
    },
    {
      "orientation": "horizontal",
      "contentOrientation": "vertical",
      "class": {
        "childList": "gap-1",
        "content": "w-60"
      }
    },
    {
      "orientation": "vertical",
      "collapsed": false,
      "class": {
        "childList": "ms-5 border-s border-default",
        "childItem": "ps-1.5 -ms-px",
        "content": "data-[state=open]:animate-[collapsible-down_200ms_ease-out] data-[state=closed]:animate-[collapsible-up_200ms_ease-out] overflow-hidden"
      }
    },
    {
      "orientation": "vertical",
      "collapsed": true,
      "class": {
        "link": "px-1.5",
        "content": "shadow-sm rounded-sm min-h-6 p-1"
      }
    },
    {
      "orientation": "horizontal",
      "highlight": true,
      "class": {
        "link": [
          "after:absolute after:-bottom-2 after:inset-x-2.5 after:block after:h-px after:rounded-full",
          "after:transition-colors"
        ]
      }
    },
    {
      "orientation": "vertical",
      "highlight": true,
      "level": true,
      "class": {
        "link": [
          "after:absolute after:-start-1.5 after:inset-y-0.5 after:block after:w-px after:rounded-full",
          "after:transition-colors"
        ]
      }
    },
    {
      "disabled": false,
      "active": false,
      "variant": "pill",
      "class": {
        "link": [
          "hover:text-highlighted hover:before:bg-elevated/50",
          "transition-colors before:transition-colors"
        ],
        "linkLeadingIcon": [
          "group-hover:text-default",
          "transition-colors"
        ]
      }
    },
    {
      "disabled": false,
      "active": false,
      "variant": "pill",
      "orientation": "horizontal",
      "class": {
        "link": "data-[state=open]:text-highlighted",
        "linkLeadingIcon": "group-data-[state=open]:text-default"
      }
    },
    {
      "disabled": false,
      "variant": "pill",
      "highlight": true,
      "orientation": "horizontal",
      "class": {
        "link": "data-[state=open]:before:bg-elevated/50"
      }
    },
    {
      "disabled": false,
      "variant": "pill",
      "highlight": false,
      "active": false,
      "orientation": "horizontal",
      "class": {
        "link": "data-[state=open]:before:bg-elevated/50"
      }
    },
    {
      "color": "primary",
      "variant": "pill",
      "active": true,
      "class": {
        "link": "text-primary",
        "linkLeadingIcon": "text-primary group-data-[state=open]:text-primary"
      }
    },
    {
      "color": "secondary",
      "variant": "pill",
      "active": true,
      "class": {
        "link": "text-secondary",
        "linkLeadingIcon": "text-secondary group-data-[state=open]:text-secondary"
      }
    },
    {
      "color": "success",
      "variant": "pill",
      "active": true,
      "class": {
        "link": "text-success",
        "linkLeadingIcon": "text-success group-data-[state=open]:text-success"
      }
    },
    {
      "color": "info",
      "variant": "pill",
      "active": true,
      "class": {
        "link": "text-info",
        "linkLeadingIcon": "text-info group-data-[state=open]:text-info"
      }
    },
    {
      "color": "warning",
      "variant": "pill",
      "active": true,
      "class": {
        "link": "text-warning",
        "linkLeadingIcon": "text-warning group-data-[state=open]:text-warning"
      }
    },
    {
      "color": "error",
      "variant": "pill",
      "active": true,
      "class": {
        "link": "text-error",
        "linkLeadingIcon": "text-error group-data-[state=open]:text-error"
      }
    },
    {
      "color": "neutral",
      "variant": "pill",
      "active": true,
      "class": {
        "link": "text-highlighted",
        "linkLeadingIcon": "text-highlighted group-data-[state=open]:text-highlighted"
      }
    },
    {
      "variant": "pill",
      "active": true,
      "highlight": false,
      "class": {
        "link": "before:bg-elevated"
      }
    },
    {
      "variant": "pill",
      "active": true,
      "highlight": true,
      "disabled": false,
      "class": {
        "link": [
          "hover:before:bg-elevated/50",
          "before:transition-colors"
        ]
      }
    },
    {
      "disabled": false,
      "active": false,
      "variant": "link",
      "class": {
        "link": [
          "hover:text-highlighted",
          "transition-colors"
        ],
        "linkLeadingIcon": [
          "group-hover:text-default",
          "transition-colors"
        ]
      }
    },
    {
      "disabled": false,
      "active": false,
      "variant": "link",
      "orientation": "horizontal",
      "class": {
        "link": "data-[state=open]:text-highlighted",
        "linkLeadingIcon": "group-data-[state=open]:text-default"
      }
    },
    {
      "color": "primary",
      "variant": "link",
      "active": true,
      "class": {
        "link": "text-primary",
        "linkLeadingIcon": "text-primary group-data-[state=open]:text-primary"
      }
    },
    {
      "color": "secondary",
      "variant": "link",
      "active": true,
      "class": {
        "link": "text-secondary",
        "linkLeadingIcon": "text-secondary group-data-[state=open]:text-secondary"
      }
    },
    {
      "color": "success",
      "variant": "link",
      "active": true,
      "class": {
        "link": "text-success",
        "linkLeadingIcon": "text-success group-data-[state=open]:text-success"
      }
    },
    {
      "color": "info",
      "variant": "link",
      "active": true,
      "class": {
        "link": "text-info",
        "linkLeadingIcon": "text-info group-data-[state=open]:text-info"
      }
    },
    {
      "color": "warning",
      "variant": "link",
      "active": true,
      "class": {
        "link": "text-warning",
        "linkLeadingIcon": "text-warning group-data-[state=open]:text-warning"
      }
    },
    {
      "color": "error",
      "variant": "link",
      "active": true,
      "class": {
        "link": "text-error",
        "linkLeadingIcon": "text-error group-data-[state=open]:text-error"
      }
    },
    {
      "color": "neutral",
      "variant": "link",
      "active": true,
      "class": {
        "link": "text-highlighted",
        "linkLeadingIcon": "text-highlighted group-data-[state=open]:text-highlighted"
      }
    },
    {
      "highlightColor": "primary",
      "highlight": true,
      "level": true,
      "active": true,
      "class": {
        "link": "after:bg-primary"
      }
    },
    {
      "highlightColor": "secondary",
      "highlight": true,
      "level": true,
      "active": true,
      "class": {
        "link": "after:bg-secondary"
      }
    },
    {
      "highlightColor": "success",
      "highlight": true,
      "level": true,
      "active": true,
      "class": {
        "link": "after:bg-success"
      }
    },
    {
      "highlightColor": "info",
      "highlight": true,
      "level": true,
      "active": true,
      "class": {
        "link": "after:bg-info"
      }
    },
    {
      "highlightColor": "warning",
      "highlight": true,
      "level": true,
      "active": true,
      "class": {
        "link": "after:bg-warning"
      }
    },
    {
      "highlightColor": "error",
      "highlight": true,
      "level": true,
      "active": true,
      "class": {
        "link": "after:bg-error"
      }
    },
    {
      "highlightColor": "neutral",
      "highlight": true,
      "level": true,
      "active": true,
      "class": {
        "link": "after:bg-inverted"
      }
    }
  ],
  "defaultVariants": {
    "color": "neutral",
    "highlightColor": "primary",
    "variant": "pill"
  }
};
const _sfc_main$a = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "UNavigationMenu",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    trailingIcon: { type: [String, Object], required: false },
    externalIcon: { type: [Boolean, String, Object], required: false, default: true },
    items: { type: null, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    orientation: { type: null, required: false, default: "horizontal" },
    collapsed: { type: Boolean, required: false },
    tooltip: { type: [Boolean, Object], required: false },
    popover: { type: [Boolean, Object], required: false },
    highlight: { type: Boolean, required: false },
    highlightColor: { type: null, required: false },
    content: { type: Object, required: false },
    contentOrientation: { type: null, required: false, default: "horizontal" },
    arrow: { type: Boolean, required: false },
    labelKey: { type: null, required: false, default: "label" },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    modelValue: { type: String, required: false },
    defaultValue: { type: String, required: false },
    delayDuration: { type: Number, required: false, default: 0 },
    disableClickTrigger: { type: Boolean, required: false },
    disableHoverTrigger: { type: Boolean, required: false },
    skipDelayDuration: { type: Number, required: false },
    disablePointerLeaveClose: { type: Boolean, required: false },
    unmountOnHide: { type: Boolean, required: false, default: true },
    disabled: { type: Boolean, required: false },
    type: { type: String, required: false, default: "multiple" },
    collapsible: { type: Boolean, required: false, default: true }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const appConfig = useAppConfig();
    const rootProps = useForwardPropsEmits(computed(() => ({
      as: props.as,
      modelValue: props.modelValue,
      defaultValue: props.defaultValue,
      delayDuration: props.delayDuration,
      skipDelayDuration: props.skipDelayDuration,
      orientation: props.orientation,
      disableClickTrigger: props.disableClickTrigger,
      disableHoverTrigger: props.disableHoverTrigger,
      disablePointerLeaveClose: props.disablePointerLeaveClose,
      unmountOnHide: props.unmountOnHide
    })), emits);
    const accordionProps = useForwardPropsEmits(reactivePick(props, "collapsible", "disabled", "type", "unmountOnHide"), emits);
    const contentProps = toRef(() => props.content);
    const tooltipProps = toRef(() => defu(typeof props.tooltip === "boolean" ? {} : props.tooltip, { delayDuration: 0, content: { side: "right" } }));
    const popoverProps = toRef(() => defu(typeof props.popover === "boolean" ? {} : props.popover, { mode: "hover", content: { side: "right", align: "start", alignOffset: 2 } }));
    const [DefineLinkTemplate, ReuseLinkTemplate] = createReusableTemplate();
    const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate({
      props: {
        item: Object,
        index: Number,
        level: Number
      }
    });
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.navigationMenu || {} })({
      orientation: props.orientation,
      contentOrientation: props.orientation === "vertical" ? void 0 : props.contentOrientation,
      collapsed: props.collapsed,
      color: props.color,
      variant: props.variant,
      highlight: props.highlight,
      highlightColor: props.highlightColor || props.color
    }));
    const lists = computed(
      () => props.items?.length ? isArrayOfArray(props.items) ? props.items : [props.items] : []
    );
    function getAccordionDefaultValue(list, level = 0) {
      const indexes = list.reduce((acc, item, index) => {
        if (item.defaultOpen || item.open) {
          acc.push(item.value || (level > 0 ? `item-${level}-${index}` : `item-${index}`));
        }
        return acc;
      }, []);
      return props.type === "single" ? indexes[0] : indexes;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(DefineLinkTemplate), null, {
        default: withCtx(({ item, active, index }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, item.slot || "item", {
              item,
              index
            }, () => {
              ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-leading` : "item-leading", {
                item,
                active,
                index
              }, () => {
                if (item.avatar) {
                  _push2(ssrRenderComponent(_sfc_main$b$1, mergeProps({
                    size: item.ui?.linkLeadingAvatarSize || props.ui?.linkLeadingAvatarSize || ui.value.linkLeadingAvatarSize()
                  }, item.avatar, {
                    class: ui.value.linkLeadingAvatar({ class: [props.ui?.linkLeadingAvatar, item.ui?.linkLeadingAvatar], active, disabled: !!item.disabled })
                  }), null, _parent2, _scopeId));
                } else if (item.icon) {
                  _push2(ssrRenderComponent(_sfc_main$e$1, {
                    name: item.icon,
                    class: ui.value.linkLeadingIcon({ class: [props.ui?.linkLeadingIcon, item.ui?.linkLeadingIcon], active, disabled: !!item.disabled })
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
              }, _push2, _parent2, _scopeId);
              if ((!__props.collapsed || __props.orientation !== "vertical") && (unref(get)(item, props.labelKey) || !!slots[item.slot ? `${item.slot}-label` : "item-label"])) {
                _push2(`<span class="${ssrRenderClass(ui.value.linkLabel({ class: [props.ui?.linkLabel, item.ui?.linkLabel] }))}"${_scopeId}>`);
                ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-label` : "item-label", {
                  item,
                  active,
                  index
                }, () => {
                  _push2(`${ssrInterpolate(unref(get)(item, props.labelKey))}`);
                }, _push2, _parent2, _scopeId);
                if (item.target === "_blank" && __props.externalIcon !== false) {
                  _push2(ssrRenderComponent(_sfc_main$e$1, {
                    name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
                    class: ui.value.linkLabelExternalIcon({ class: [props.ui?.linkLabelExternalIcon, item.ui?.linkLabelExternalIcon], active })
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</span>`);
              } else {
                _push2(`<!---->`);
              }
              if ((!__props.collapsed || __props.orientation !== "vertical") && (item.badge || __props.orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) || __props.orientation === "vertical" && item.children?.length || item.trailingIcon || !!slots[item.slot ? `${item.slot}-trailing` : "item-trailing"])) {
                ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(__props.orientation === "vertical" && item.children?.length && !__props.collapsed ? unref(AccordionTrigger) : "span"), {
                  as: "span",
                  class: ui.value.linkTrailing({ class: [props.ui?.linkTrailing, item.ui?.linkTrailing] }),
                  onClick: () => {
                  }
                }, {
                  default: withCtx((_, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : "item-trailing", {
                        item,
                        active,
                        index
                      }, () => {
                        if (item.badge !== void 0) {
                          _push3(ssrRenderComponent(_sfc_main$l, mergeProps({
                            color: "neutral",
                            variant: "outline",
                            size: item.ui?.linkTrailingBadgeSize || props.ui?.linkTrailingBadgeSize || ui.value.linkTrailingBadgeSize()
                          }, typeof item.badge === "string" || typeof item.badge === "number" ? { label: item.badge } : item.badge, {
                            class: ui.value.linkTrailingBadge({ class: [props.ui?.linkTrailingBadge, item.ui?.linkTrailingBadge] })
                          }), null, _parent3, _scopeId2));
                        } else {
                          _push3(`<!---->`);
                        }
                        if (__props.orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) || __props.orientation === "vertical" && item.children?.length) {
                          _push3(ssrRenderComponent(_sfc_main$e$1, {
                            name: item.trailingIcon || __props.trailingIcon || unref(appConfig).ui.icons.chevronDown,
                            class: ui.value.linkTrailingIcon({ class: [props.ui?.linkTrailingIcon, item.ui?.linkTrailingIcon], active })
                          }, null, _parent3, _scopeId2));
                        } else if (item.trailingIcon) {
                          _push3(ssrRenderComponent(_sfc_main$e$1, {
                            name: item.trailingIcon,
                            class: ui.value.linkTrailingIcon({ class: [props.ui?.linkTrailingIcon, item.ui?.linkTrailingIcon], active })
                          }, null, _parent3, _scopeId2));
                        } else {
                          _push3(`<!---->`);
                        }
                      }, _push3, _parent3, _scopeId2);
                    } else {
                      return [
                        renderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : "item-trailing", {
                          item,
                          active,
                          index
                        }, () => [
                          item.badge !== void 0 ? (openBlock(), createBlock(_sfc_main$l, mergeProps({
                            key: 0,
                            color: "neutral",
                            variant: "outline",
                            size: item.ui?.linkTrailingBadgeSize || props.ui?.linkTrailingBadgeSize || ui.value.linkTrailingBadgeSize()
                          }, typeof item.badge === "string" || typeof item.badge === "number" ? { label: item.badge } : item.badge, {
                            class: ui.value.linkTrailingBadge({ class: [props.ui?.linkTrailingBadge, item.ui?.linkTrailingBadge] })
                          }), null, 16, ["size", "class"])) : createCommentVNode("", true),
                          __props.orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) || __props.orientation === "vertical" && item.children?.length ? (openBlock(), createBlock(_sfc_main$e$1, {
                            key: 1,
                            name: item.trailingIcon || __props.trailingIcon || unref(appConfig).ui.icons.chevronDown,
                            class: ui.value.linkTrailingIcon({ class: [props.ui?.linkTrailingIcon, item.ui?.linkTrailingIcon], active })
                          }, null, 8, ["name", "class"])) : item.trailingIcon ? (openBlock(), createBlock(_sfc_main$e$1, {
                            key: 2,
                            name: item.trailingIcon,
                            class: ui.value.linkTrailingIcon({ class: [props.ui?.linkTrailingIcon, item.ui?.linkTrailingIcon], active })
                          }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                        ])
                      ];
                    }
                  }),
                  _: 2
                }), _parent2, _scopeId);
              } else {
                _push2(`<!---->`);
              }
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, item.slot || "item", {
                item,
                index
              }, () => [
                renderSlot(_ctx.$slots, item.slot ? `${item.slot}-leading` : "item-leading", {
                  item,
                  active,
                  index
                }, () => [
                  item.avatar ? (openBlock(), createBlock(_sfc_main$b$1, mergeProps({
                    key: 0,
                    size: item.ui?.linkLeadingAvatarSize || props.ui?.linkLeadingAvatarSize || ui.value.linkLeadingAvatarSize()
                  }, item.avatar, {
                    class: ui.value.linkLeadingAvatar({ class: [props.ui?.linkLeadingAvatar, item.ui?.linkLeadingAvatar], active, disabled: !!item.disabled })
                  }), null, 16, ["size", "class"])) : item.icon ? (openBlock(), createBlock(_sfc_main$e$1, {
                    key: 1,
                    name: item.icon,
                    class: ui.value.linkLeadingIcon({ class: [props.ui?.linkLeadingIcon, item.ui?.linkLeadingIcon], active, disabled: !!item.disabled })
                  }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                ]),
                (!__props.collapsed || __props.orientation !== "vertical") && (unref(get)(item, props.labelKey) || !!slots[item.slot ? `${item.slot}-label` : "item-label"]) ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: ui.value.linkLabel({ class: [props.ui?.linkLabel, item.ui?.linkLabel] })
                }, [
                  renderSlot(_ctx.$slots, item.slot ? `${item.slot}-label` : "item-label", {
                    item,
                    active,
                    index
                  }, () => [
                    createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                  ]),
                  item.target === "_blank" && __props.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$e$1, {
                    key: 0,
                    name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
                    class: ui.value.linkLabelExternalIcon({ class: [props.ui?.linkLabelExternalIcon, item.ui?.linkLabelExternalIcon], active })
                  }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                ], 2)) : createCommentVNode("", true),
                (!__props.collapsed || __props.orientation !== "vertical") && (item.badge || __props.orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) || __props.orientation === "vertical" && item.children?.length || item.trailingIcon || !!slots[item.slot ? `${item.slot}-trailing` : "item-trailing"]) ? (openBlock(), createBlock(resolveDynamicComponent(__props.orientation === "vertical" && item.children?.length && !__props.collapsed ? unref(AccordionTrigger) : "span"), {
                  key: 1,
                  as: "span",
                  class: ui.value.linkTrailing({ class: [props.ui?.linkTrailing, item.ui?.linkTrailing] }),
                  onClick: withModifiers(() => {
                  }, ["stop", "prevent"])
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, item.slot ? `${item.slot}-trailing` : "item-trailing", {
                      item,
                      active,
                      index
                    }, () => [
                      item.badge !== void 0 ? (openBlock(), createBlock(_sfc_main$l, mergeProps({
                        key: 0,
                        color: "neutral",
                        variant: "outline",
                        size: item.ui?.linkTrailingBadgeSize || props.ui?.linkTrailingBadgeSize || ui.value.linkTrailingBadgeSize()
                      }, typeof item.badge === "string" || typeof item.badge === "number" ? { label: item.badge } : item.badge, {
                        class: ui.value.linkTrailingBadge({ class: [props.ui?.linkTrailingBadge, item.ui?.linkTrailingBadge] })
                      }), null, 16, ["size", "class"])) : createCommentVNode("", true),
                      __props.orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) || __props.orientation === "vertical" && item.children?.length ? (openBlock(), createBlock(_sfc_main$e$1, {
                        key: 1,
                        name: item.trailingIcon || __props.trailingIcon || unref(appConfig).ui.icons.chevronDown,
                        class: ui.value.linkTrailingIcon({ class: [props.ui?.linkTrailingIcon, item.ui?.linkTrailingIcon], active })
                      }, null, 8, ["name", "class"])) : item.trailingIcon ? (openBlock(), createBlock(_sfc_main$e$1, {
                        key: 2,
                        name: item.trailingIcon,
                        class: ui.value.linkTrailingIcon({ class: [props.ui?.linkTrailingIcon, item.ui?.linkTrailingIcon], active })
                      }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                    ])
                  ]),
                  _: 2
                }, 1032, ["class", "onClick"])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(ssrRenderComponent(unref(DefineItemTemplate), null, {
        default: withCtx(({ item, index, level = 0 }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(__props.orientation === "vertical" && !__props.collapsed ? unref(AccordionItem) : unref(NavigationMenuItem)), {
              as: "li",
              value: item.value || (level > 0 ? `item-${level}-${index}` : `item-${index}`)
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (__props.orientation === "vertical" && item.type === "label" && !__props.collapsed) {
                    _push3(`<div class="${ssrRenderClass(ui.value.label({ class: [props.ui?.label, item.ui?.label, item.class] }))}"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(ReuseLinkTemplate), {
                      item,
                      index
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else if (item.type !== "label") {
                    _push3(ssrRenderComponent(_sfc_main$9$1, mergeProps(__props.orientation === "vertical" && item.children?.length && !__props.collapsed && item.type === "trigger" ? {} : unref(pickLinkProps)(item), { custom: "" }), {
                      default: withCtx(({ active, ...slotProps }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          ssrRenderVNode(_push4, createVNode(resolveDynamicComponent(__props.orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) ? unref(NavigationMenuTrigger) : __props.orientation === "vertical" && item.children?.length && !__props.collapsed && !slotProps.href ? unref(AccordionTrigger) : unref(NavigationMenuLink)), {
                            "as-child": "",
                            active: active || item.active,
                            disabled: item.disabled,
                            onSelect: item.onSelect
                          }, {
                            default: withCtx((_2, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                if (__props.orientation === "vertical" && __props.collapsed && item.children?.length && (!!props.popover || !!item.popover)) {
                                  _push5(ssrRenderComponent(_sfc_main$c, mergeProps({ ...popoverProps.value, ...typeof item.popover === "boolean" ? {} : item.popover || {} }, {
                                    ui: { content: ui.value.content({ class: [props.ui?.content, item.ui?.content] }) }
                                  }), {
                                    content: withCtx((_3, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
                                          item,
                                          active: active || item.active,
                                          index
                                        }, () => {
                                          _push6(`<ul class="${ssrRenderClass(ui.value.childList({ class: [props.ui?.childList, item.ui?.childList] }))}"${_scopeId5}><li class="${ssrRenderClass(ui.value.childLabel({ class: [props.ui?.childLabel, item.ui?.childLabel] }))}"${_scopeId5}>${ssrInterpolate(unref(get)(item, props.labelKey))}</li><!--[-->`);
                                          ssrRenderList(item.children, (childItem, childIndex) => {
                                            _push6(`<li class="${ssrRenderClass(ui.value.childItem({ class: [props.ui?.childItem, item.ui?.childItem] }))}"${_scopeId5}>`);
                                            _push6(ssrRenderComponent(_sfc_main$9$1, mergeProps({ ref_for: true }, unref(pickLinkProps)(childItem), { custom: "" }), {
                                              default: withCtx(({ active: childActive, ...childSlotProps }, _push7, _parent7, _scopeId6) => {
                                                if (_push7) {
                                                  _push7(ssrRenderComponent(unref(NavigationMenuLink), {
                                                    "as-child": "",
                                                    active: childActive,
                                                    onSelect: childItem.onSelect
                                                  }, {
                                                    default: withCtx((_4, _push8, _parent8, _scopeId7) => {
                                                      if (_push8) {
                                                        _push8(ssrRenderComponent(_sfc_main$a$1, mergeProps({ ref_for: true }, childSlotProps, {
                                                          class: ui.value.childLink({ class: [props.ui?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                                        }), {
                                                          default: withCtx((_5, _push9, _parent9, _scopeId8) => {
                                                            if (_push9) {
                                                              if (childItem.icon) {
                                                                _push9(ssrRenderComponent(_sfc_main$e$1, {
                                                                  name: childItem.icon,
                                                                  class: ui.value.childLinkIcon({ class: [props.ui?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                                }, null, _parent9, _scopeId8));
                                                              } else {
                                                                _push9(`<!---->`);
                                                              }
                                                              _push9(`<span class="${ssrRenderClass(ui.value.childLinkLabel({ class: [props.ui?.childLinkLabel, item.ui?.childLinkLabel], active: childActive }))}"${_scopeId8}>${ssrInterpolate(unref(get)(childItem, props.labelKey))} `);
                                                              if (childItem.target === "_blank" && __props.externalIcon !== false) {
                                                                _push9(ssrRenderComponent(_sfc_main$e$1, {
                                                                  name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
                                                                  class: ui.value.childLinkLabelExternalIcon({ class: [props.ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                                }, null, _parent9, _scopeId8));
                                                              } else {
                                                                _push9(`<!---->`);
                                                              }
                                                              _push9(`</span>`);
                                                            } else {
                                                              return [
                                                                childItem.icon ? (openBlock(), createBlock(_sfc_main$e$1, {
                                                                  key: 0,
                                                                  name: childItem.icon,
                                                                  class: ui.value.childLinkIcon({ class: [props.ui?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                                }, null, 8, ["name", "class"])) : createCommentVNode("", true),
                                                                createVNode("span", {
                                                                  class: ui.value.childLinkLabel({ class: [props.ui?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                                }, [
                                                                  createTextVNode(toDisplayString(unref(get)(childItem, props.labelKey)) + " ", 1),
                                                                  childItem.target === "_blank" && __props.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$e$1, {
                                                                    key: 0,
                                                                    name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
                                                                    class: ui.value.childLinkLabelExternalIcon({ class: [props.ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                                  }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                                                                ], 2)
                                                              ];
                                                            }
                                                          }),
                                                          _: 2
                                                        }, _parent8, _scopeId7));
                                                      } else {
                                                        return [
                                                          createVNode(_sfc_main$a$1, mergeProps({ ref_for: true }, childSlotProps, {
                                                            class: ui.value.childLink({ class: [props.ui?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                                          }), {
                                                            default: withCtx(() => [
                                                              childItem.icon ? (openBlock(), createBlock(_sfc_main$e$1, {
                                                                key: 0,
                                                                name: childItem.icon,
                                                                class: ui.value.childLinkIcon({ class: [props.ui?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                              }, null, 8, ["name", "class"])) : createCommentVNode("", true),
                                                              createVNode("span", {
                                                                class: ui.value.childLinkLabel({ class: [props.ui?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                              }, [
                                                                createTextVNode(toDisplayString(unref(get)(childItem, props.labelKey)) + " ", 1),
                                                                childItem.target === "_blank" && __props.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$e$1, {
                                                                  key: 0,
                                                                  name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
                                                                  class: ui.value.childLinkLabelExternalIcon({ class: [props.ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                                }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                                                              ], 2)
                                                            ]),
                                                            _: 2
                                                          }, 1040, ["class"])
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent7, _scopeId6));
                                                } else {
                                                  return [
                                                    createVNode(unref(NavigationMenuLink), {
                                                      "as-child": "",
                                                      active: childActive,
                                                      onSelect: childItem.onSelect
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(_sfc_main$a$1, mergeProps({ ref_for: true }, childSlotProps, {
                                                          class: ui.value.childLink({ class: [props.ui?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                                        }), {
                                                          default: withCtx(() => [
                                                            childItem.icon ? (openBlock(), createBlock(_sfc_main$e$1, {
                                                              key: 0,
                                                              name: childItem.icon,
                                                              class: ui.value.childLinkIcon({ class: [props.ui?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                            }, null, 8, ["name", "class"])) : createCommentVNode("", true),
                                                            createVNode("span", {
                                                              class: ui.value.childLinkLabel({ class: [props.ui?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                            }, [
                                                              createTextVNode(toDisplayString(unref(get)(childItem, props.labelKey)) + " ", 1),
                                                              childItem.target === "_blank" && __props.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$e$1, {
                                                                key: 0,
                                                                name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
                                                                class: ui.value.childLinkLabelExternalIcon({ class: [props.ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                              }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                                                            ], 2)
                                                          ]),
                                                          _: 2
                                                        }, 1040, ["class"])
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["active", "onSelect"])
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent6, _scopeId5));
                                            _push6(`</li>`);
                                          });
                                          _push6(`<!--]--></ul>`);
                                        }, _push6, _parent6, _scopeId5);
                                      } else {
                                        return [
                                          renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
                                            item,
                                            active: active || item.active,
                                            index
                                          }, () => [
                                            createVNode("ul", {
                                              class: ui.value.childList({ class: [props.ui?.childList, item.ui?.childList] })
                                            }, [
                                              createVNode("li", {
                                                class: ui.value.childLabel({ class: [props.ui?.childLabel, item.ui?.childLabel] })
                                              }, toDisplayString(unref(get)(item, props.labelKey)), 3),
                                              (openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
                                                return openBlock(), createBlock("li", {
                                                  key: childIndex,
                                                  class: ui.value.childItem({ class: [props.ui?.childItem, item.ui?.childItem] })
                                                }, [
                                                  createVNode(_sfc_main$9$1, mergeProps({ ref_for: true }, unref(pickLinkProps)(childItem), { custom: "" }), {
                                                    default: withCtx(({ active: childActive, ...childSlotProps }) => [
                                                      createVNode(unref(NavigationMenuLink), {
                                                        "as-child": "",
                                                        active: childActive,
                                                        onSelect: childItem.onSelect
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(_sfc_main$a$1, mergeProps({ ref_for: true }, childSlotProps, {
                                                            class: ui.value.childLink({ class: [props.ui?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                                          }), {
                                                            default: withCtx(() => [
                                                              childItem.icon ? (openBlock(), createBlock(_sfc_main$e$1, {
                                                                key: 0,
                                                                name: childItem.icon,
                                                                class: ui.value.childLinkIcon({ class: [props.ui?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                              }, null, 8, ["name", "class"])) : createCommentVNode("", true),
                                                              createVNode("span", {
                                                                class: ui.value.childLinkLabel({ class: [props.ui?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                              }, [
                                                                createTextVNode(toDisplayString(unref(get)(childItem, props.labelKey)) + " ", 1),
                                                                childItem.target === "_blank" && __props.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$e$1, {
                                                                  key: 0,
                                                                  name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
                                                                  class: ui.value.childLinkLabelExternalIcon({ class: [props.ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                                }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                                                              ], 2)
                                                            ]),
                                                            _: 2
                                                          }, 1040, ["class"])
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["active", "onSelect"])
                                                    ]),
                                                    _: 2
                                                  }, 1040)
                                                ], 2);
                                              }), 128))
                                            ], 2)
                                          ])
                                        ];
                                      }
                                    }),
                                    default: withCtx((_3, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(_sfc_main$a$1, mergeProps(slotProps, {
                                          class: ui.value.link({ class: [props.ui?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })
                                        }), {
                                          default: withCtx((_4, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(unref(ReuseLinkTemplate), {
                                                item,
                                                active: active || item.active,
                                                index
                                              }, null, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(unref(ReuseLinkTemplate), {
                                                  item,
                                                  active: active || item.active,
                                                  index
                                                }, null, 8, ["item", "active", "index"])
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(_sfc_main$a$1, mergeProps(slotProps, {
                                            class: ui.value.link({ class: [props.ui?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })
                                          }), {
                                            default: withCtx(() => [
                                              createVNode(unref(ReuseLinkTemplate), {
                                                item,
                                                active: active || item.active,
                                                index
                                              }, null, 8, ["item", "active", "index"])
                                            ]),
                                            _: 2
                                          }, 1040, ["class"])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else if (__props.orientation === "vertical" && __props.collapsed && (!!props.tooltip || !!item.tooltip)) {
                                  _push5(ssrRenderComponent(_sfc_main$b, mergeProps({
                                    text: unref(get)(item, props.labelKey)
                                  }, { ...tooltipProps.value, ...typeof item.tooltip === "boolean" ? {} : item.tooltip || {} }), {
                                    default: withCtx((_3, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(_sfc_main$a$1, mergeProps(slotProps, {
                                          class: ui.value.link({ class: [props.ui?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })
                                        }), {
                                          default: withCtx((_4, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(unref(ReuseLinkTemplate), {
                                                item,
                                                active: active || item.active,
                                                index
                                              }, null, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(unref(ReuseLinkTemplate), {
                                                  item,
                                                  active: active || item.active,
                                                  index
                                                }, null, 8, ["item", "active", "index"])
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(_sfc_main$a$1, mergeProps(slotProps, {
                                            class: ui.value.link({ class: [props.ui?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })
                                          }), {
                                            default: withCtx(() => [
                                              createVNode(unref(ReuseLinkTemplate), {
                                                item,
                                                active: active || item.active,
                                                index
                                              }, null, 8, ["item", "active", "index"])
                                            ]),
                                            _: 2
                                          }, 1040, ["class"])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(ssrRenderComponent(_sfc_main$a$1, mergeProps(slotProps, {
                                    class: ui.value.link({ class: [props.ui?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: __props.orientation === "horizontal" || level > 0 })
                                  }), {
                                    default: withCtx((_3, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(unref(ReuseLinkTemplate), {
                                          item,
                                          active: active || item.active,
                                          index
                                        }, null, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(unref(ReuseLinkTemplate), {
                                            item,
                                            active: active || item.active,
                                            index
                                          }, null, 8, ["item", "active", "index"])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                }
                              } else {
                                return [
                                  __props.orientation === "vertical" && __props.collapsed && item.children?.length && (!!props.popover || !!item.popover) ? (openBlock(), createBlock(_sfc_main$c, mergeProps({ key: 0 }, { ...popoverProps.value, ...typeof item.popover === "boolean" ? {} : item.popover || {} }, {
                                    ui: { content: ui.value.content({ class: [props.ui?.content, item.ui?.content] }) }
                                  }), {
                                    content: withCtx(() => [
                                      renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
                                        item,
                                        active: active || item.active,
                                        index
                                      }, () => [
                                        createVNode("ul", {
                                          class: ui.value.childList({ class: [props.ui?.childList, item.ui?.childList] })
                                        }, [
                                          createVNode("li", {
                                            class: ui.value.childLabel({ class: [props.ui?.childLabel, item.ui?.childLabel] })
                                          }, toDisplayString(unref(get)(item, props.labelKey)), 3),
                                          (openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
                                            return openBlock(), createBlock("li", {
                                              key: childIndex,
                                              class: ui.value.childItem({ class: [props.ui?.childItem, item.ui?.childItem] })
                                            }, [
                                              createVNode(_sfc_main$9$1, mergeProps({ ref_for: true }, unref(pickLinkProps)(childItem), { custom: "" }), {
                                                default: withCtx(({ active: childActive, ...childSlotProps }) => [
                                                  createVNode(unref(NavigationMenuLink), {
                                                    "as-child": "",
                                                    active: childActive,
                                                    onSelect: childItem.onSelect
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(_sfc_main$a$1, mergeProps({ ref_for: true }, childSlotProps, {
                                                        class: ui.value.childLink({ class: [props.ui?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                                      }), {
                                                        default: withCtx(() => [
                                                          childItem.icon ? (openBlock(), createBlock(_sfc_main$e$1, {
                                                            key: 0,
                                                            name: childItem.icon,
                                                            class: ui.value.childLinkIcon({ class: [props.ui?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                          }, null, 8, ["name", "class"])) : createCommentVNode("", true),
                                                          createVNode("span", {
                                                            class: ui.value.childLinkLabel({ class: [props.ui?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                          }, [
                                                            createTextVNode(toDisplayString(unref(get)(childItem, props.labelKey)) + " ", 1),
                                                            childItem.target === "_blank" && __props.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$e$1, {
                                                              key: 0,
                                                              name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
                                                              class: ui.value.childLinkLabelExternalIcon({ class: [props.ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                            }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                                                          ], 2)
                                                        ]),
                                                        _: 2
                                                      }, 1040, ["class"])
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["active", "onSelect"])
                                                ]),
                                                _: 2
                                              }, 1040)
                                            ], 2);
                                          }), 128))
                                        ], 2)
                                      ])
                                    ]),
                                    default: withCtx(() => [
                                      createVNode(_sfc_main$a$1, mergeProps(slotProps, {
                                        class: ui.value.link({ class: [props.ui?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })
                                      }), {
                                        default: withCtx(() => [
                                          createVNode(unref(ReuseLinkTemplate), {
                                            item,
                                            active: active || item.active,
                                            index
                                          }, null, 8, ["item", "active", "index"])
                                        ]),
                                        _: 2
                                      }, 1040, ["class"])
                                    ]),
                                    _: 2
                                  }, 1040, ["ui"])) : __props.orientation === "vertical" && __props.collapsed && (!!props.tooltip || !!item.tooltip) ? (openBlock(), createBlock(_sfc_main$b, mergeProps({
                                    key: 1,
                                    text: unref(get)(item, props.labelKey)
                                  }, { ...tooltipProps.value, ...typeof item.tooltip === "boolean" ? {} : item.tooltip || {} }), {
                                    default: withCtx(() => [
                                      createVNode(_sfc_main$a$1, mergeProps(slotProps, {
                                        class: ui.value.link({ class: [props.ui?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })
                                      }), {
                                        default: withCtx(() => [
                                          createVNode(unref(ReuseLinkTemplate), {
                                            item,
                                            active: active || item.active,
                                            index
                                          }, null, 8, ["item", "active", "index"])
                                        ]),
                                        _: 2
                                      }, 1040, ["class"])
                                    ]),
                                    _: 2
                                  }, 1040, ["text"])) : (openBlock(), createBlock(_sfc_main$a$1, mergeProps({ key: 2 }, slotProps, {
                                    class: ui.value.link({ class: [props.ui?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: __props.orientation === "horizontal" || level > 0 })
                                  }), {
                                    default: withCtx(() => [
                                      createVNode(unref(ReuseLinkTemplate), {
                                        item,
                                        active: active || item.active,
                                        index
                                      }, null, 8, ["item", "active", "index"])
                                    ]),
                                    _: 2
                                  }, 1040, ["class"]))
                                ];
                              }
                            }),
                            _: 2
                          }), _parent4, _scopeId3);
                          if (__props.orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"])) {
                            _push4(ssrRenderComponent(unref(NavigationMenuContent), mergeProps(contentProps.value, {
                              class: ui.value.content({ class: [props.ui?.content, item.ui?.content] })
                            }), {
                              default: withCtx((_2, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  ssrRenderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
                                    item,
                                    active: active || item.active,
                                    index
                                  }, () => {
                                    _push5(`<ul class="${ssrRenderClass(ui.value.childList({ class: [props.ui?.childList, item.ui?.childList] }))}"${_scopeId4}><!--[-->`);
                                    ssrRenderList(item.children, (childItem, childIndex) => {
                                      _push5(`<li class="${ssrRenderClass(ui.value.childItem({ class: [props.ui?.childItem, item.ui?.childItem] }))}"${_scopeId4}>`);
                                      _push5(ssrRenderComponent(_sfc_main$9$1, mergeProps({ ref_for: true }, unref(pickLinkProps)(childItem), { custom: "" }), {
                                        default: withCtx(({ active: childActive, ...childSlotProps }, _push6, _parent6, _scopeId5) => {
                                          if (_push6) {
                                            _push6(ssrRenderComponent(unref(NavigationMenuLink), {
                                              "as-child": "",
                                              active: childActive,
                                              onSelect: childItem.onSelect
                                            }, {
                                              default: withCtx((_3, _push7, _parent7, _scopeId6) => {
                                                if (_push7) {
                                                  _push7(ssrRenderComponent(_sfc_main$a$1, mergeProps({ ref_for: true }, childSlotProps, {
                                                    class: ui.value.childLink({ class: [props.ui?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                                  }), {
                                                    default: withCtx((_4, _push8, _parent8, _scopeId7) => {
                                                      if (_push8) {
                                                        if (childItem.icon) {
                                                          _push8(ssrRenderComponent(_sfc_main$e$1, {
                                                            name: childItem.icon,
                                                            class: ui.value.childLinkIcon({ class: [props.ui?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                          }, null, _parent8, _scopeId7));
                                                        } else {
                                                          _push8(`<!---->`);
                                                        }
                                                        _push8(`<div class="${ssrRenderClass(ui.value.childLinkWrapper({ class: [props.ui?.childLinkWrapper, item.ui?.childLinkWrapper] }))}"${_scopeId7}><p class="${ssrRenderClass(ui.value.childLinkLabel({ class: [props.ui?.childLinkLabel, item.ui?.childLinkLabel], active: childActive }))}"${_scopeId7}>${ssrInterpolate(unref(get)(childItem, props.labelKey))} `);
                                                        if (childItem.target === "_blank" && __props.externalIcon !== false) {
                                                          _push8(ssrRenderComponent(_sfc_main$e$1, {
                                                            name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
                                                            class: ui.value.childLinkLabelExternalIcon({ class: [props.ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                          }, null, _parent8, _scopeId7));
                                                        } else {
                                                          _push8(`<!---->`);
                                                        }
                                                        _push8(`</p>`);
                                                        if (childItem.description) {
                                                          _push8(`<p class="${ssrRenderClass(ui.value.childLinkDescription({ class: [props.ui?.childLinkDescription, item.ui?.childLinkDescription], active: childActive }))}"${_scopeId7}>${ssrInterpolate(childItem.description)}</p>`);
                                                        } else {
                                                          _push8(`<!---->`);
                                                        }
                                                        _push8(`</div>`);
                                                      } else {
                                                        return [
                                                          childItem.icon ? (openBlock(), createBlock(_sfc_main$e$1, {
                                                            key: 0,
                                                            name: childItem.icon,
                                                            class: ui.value.childLinkIcon({ class: [props.ui?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                          }, null, 8, ["name", "class"])) : createCommentVNode("", true),
                                                          createVNode("div", {
                                                            class: ui.value.childLinkWrapper({ class: [props.ui?.childLinkWrapper, item.ui?.childLinkWrapper] })
                                                          }, [
                                                            createVNode("p", {
                                                              class: ui.value.childLinkLabel({ class: [props.ui?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                            }, [
                                                              createTextVNode(toDisplayString(unref(get)(childItem, props.labelKey)) + " ", 1),
                                                              childItem.target === "_blank" && __props.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$e$1, {
                                                                key: 0,
                                                                name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
                                                                class: ui.value.childLinkLabelExternalIcon({ class: [props.ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                              }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                                                            ], 2),
                                                            childItem.description ? (openBlock(), createBlock("p", {
                                                              key: 0,
                                                              class: ui.value.childLinkDescription({ class: [props.ui?.childLinkDescription, item.ui?.childLinkDescription], active: childActive })
                                                            }, toDisplayString(childItem.description), 3)) : createCommentVNode("", true)
                                                          ], 2)
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent7, _scopeId6));
                                                } else {
                                                  return [
                                                    createVNode(_sfc_main$a$1, mergeProps({ ref_for: true }, childSlotProps, {
                                                      class: ui.value.childLink({ class: [props.ui?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                                    }), {
                                                      default: withCtx(() => [
                                                        childItem.icon ? (openBlock(), createBlock(_sfc_main$e$1, {
                                                          key: 0,
                                                          name: childItem.icon,
                                                          class: ui.value.childLinkIcon({ class: [props.ui?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                        }, null, 8, ["name", "class"])) : createCommentVNode("", true),
                                                        createVNode("div", {
                                                          class: ui.value.childLinkWrapper({ class: [props.ui?.childLinkWrapper, item.ui?.childLinkWrapper] })
                                                        }, [
                                                          createVNode("p", {
                                                            class: ui.value.childLinkLabel({ class: [props.ui?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                          }, [
                                                            createTextVNode(toDisplayString(unref(get)(childItem, props.labelKey)) + " ", 1),
                                                            childItem.target === "_blank" && __props.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$e$1, {
                                                              key: 0,
                                                              name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
                                                              class: ui.value.childLinkLabelExternalIcon({ class: [props.ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                            }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                                                          ], 2),
                                                          childItem.description ? (openBlock(), createBlock("p", {
                                                            key: 0,
                                                            class: ui.value.childLinkDescription({ class: [props.ui?.childLinkDescription, item.ui?.childLinkDescription], active: childActive })
                                                          }, toDisplayString(childItem.description), 3)) : createCommentVNode("", true)
                                                        ], 2)
                                                      ]),
                                                      _: 2
                                                    }, 1040, ["class"])
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent6, _scopeId5));
                                          } else {
                                            return [
                                              createVNode(unref(NavigationMenuLink), {
                                                "as-child": "",
                                                active: childActive,
                                                onSelect: childItem.onSelect
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_sfc_main$a$1, mergeProps({ ref_for: true }, childSlotProps, {
                                                    class: ui.value.childLink({ class: [props.ui?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                                  }), {
                                                    default: withCtx(() => [
                                                      childItem.icon ? (openBlock(), createBlock(_sfc_main$e$1, {
                                                        key: 0,
                                                        name: childItem.icon,
                                                        class: ui.value.childLinkIcon({ class: [props.ui?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                      }, null, 8, ["name", "class"])) : createCommentVNode("", true),
                                                      createVNode("div", {
                                                        class: ui.value.childLinkWrapper({ class: [props.ui?.childLinkWrapper, item.ui?.childLinkWrapper] })
                                                      }, [
                                                        createVNode("p", {
                                                          class: ui.value.childLinkLabel({ class: [props.ui?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                        }, [
                                                          createTextVNode(toDisplayString(unref(get)(childItem, props.labelKey)) + " ", 1),
                                                          childItem.target === "_blank" && __props.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$e$1, {
                                                            key: 0,
                                                            name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
                                                            class: ui.value.childLinkLabelExternalIcon({ class: [props.ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                          }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                                                        ], 2),
                                                        childItem.description ? (openBlock(), createBlock("p", {
                                                          key: 0,
                                                          class: ui.value.childLinkDescription({ class: [props.ui?.childLinkDescription, item.ui?.childLinkDescription], active: childActive })
                                                        }, toDisplayString(childItem.description), 3)) : createCommentVNode("", true)
                                                      ], 2)
                                                    ]),
                                                    _: 2
                                                  }, 1040, ["class"])
                                                ]),
                                                _: 2
                                              }, 1032, ["active", "onSelect"])
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent5, _scopeId4));
                                      _push5(`</li>`);
                                    });
                                    _push5(`<!--]--></ul>`);
                                  }, _push5, _parent5, _scopeId4);
                                } else {
                                  return [
                                    renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
                                      item,
                                      active: active || item.active,
                                      index
                                    }, () => [
                                      createVNode("ul", {
                                        class: ui.value.childList({ class: [props.ui?.childList, item.ui?.childList] })
                                      }, [
                                        (openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
                                          return openBlock(), createBlock("li", {
                                            key: childIndex,
                                            class: ui.value.childItem({ class: [props.ui?.childItem, item.ui?.childItem] })
                                          }, [
                                            createVNode(_sfc_main$9$1, mergeProps({ ref_for: true }, unref(pickLinkProps)(childItem), { custom: "" }), {
                                              default: withCtx(({ active: childActive, ...childSlotProps }) => [
                                                createVNode(unref(NavigationMenuLink), {
                                                  "as-child": "",
                                                  active: childActive,
                                                  onSelect: childItem.onSelect
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(_sfc_main$a$1, mergeProps({ ref_for: true }, childSlotProps, {
                                                      class: ui.value.childLink({ class: [props.ui?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                                    }), {
                                                      default: withCtx(() => [
                                                        childItem.icon ? (openBlock(), createBlock(_sfc_main$e$1, {
                                                          key: 0,
                                                          name: childItem.icon,
                                                          class: ui.value.childLinkIcon({ class: [props.ui?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                        }, null, 8, ["name", "class"])) : createCommentVNode("", true),
                                                        createVNode("div", {
                                                          class: ui.value.childLinkWrapper({ class: [props.ui?.childLinkWrapper, item.ui?.childLinkWrapper] })
                                                        }, [
                                                          createVNode("p", {
                                                            class: ui.value.childLinkLabel({ class: [props.ui?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                          }, [
                                                            createTextVNode(toDisplayString(unref(get)(childItem, props.labelKey)) + " ", 1),
                                                            childItem.target === "_blank" && __props.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$e$1, {
                                                              key: 0,
                                                              name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
                                                              class: ui.value.childLinkLabelExternalIcon({ class: [props.ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                            }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                                                          ], 2),
                                                          childItem.description ? (openBlock(), createBlock("p", {
                                                            key: 0,
                                                            class: ui.value.childLinkDescription({ class: [props.ui?.childLinkDescription, item.ui?.childLinkDescription], active: childActive })
                                                          }, toDisplayString(childItem.description), 3)) : createCommentVNode("", true)
                                                        ], 2)
                                                      ]),
                                                      _: 2
                                                    }, 1040, ["class"])
                                                  ]),
                                                  _: 2
                                                }, 1032, ["active", "onSelect"])
                                              ]),
                                              _: 2
                                            }, 1040)
                                          ], 2);
                                        }), 128))
                                      ], 2)
                                    ])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                        } else {
                          return [
                            (openBlock(), createBlock(resolveDynamicComponent(__props.orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) ? unref(NavigationMenuTrigger) : __props.orientation === "vertical" && item.children?.length && !__props.collapsed && !slotProps.href ? unref(AccordionTrigger) : unref(NavigationMenuLink)), {
                              "as-child": "",
                              active: active || item.active,
                              disabled: item.disabled,
                              onSelect: item.onSelect
                            }, {
                              default: withCtx(() => [
                                __props.orientation === "vertical" && __props.collapsed && item.children?.length && (!!props.popover || !!item.popover) ? (openBlock(), createBlock(_sfc_main$c, mergeProps({ key: 0 }, { ...popoverProps.value, ...typeof item.popover === "boolean" ? {} : item.popover || {} }, {
                                  ui: { content: ui.value.content({ class: [props.ui?.content, item.ui?.content] }) }
                                }), {
                                  content: withCtx(() => [
                                    renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
                                      item,
                                      active: active || item.active,
                                      index
                                    }, () => [
                                      createVNode("ul", {
                                        class: ui.value.childList({ class: [props.ui?.childList, item.ui?.childList] })
                                      }, [
                                        createVNode("li", {
                                          class: ui.value.childLabel({ class: [props.ui?.childLabel, item.ui?.childLabel] })
                                        }, toDisplayString(unref(get)(item, props.labelKey)), 3),
                                        (openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
                                          return openBlock(), createBlock("li", {
                                            key: childIndex,
                                            class: ui.value.childItem({ class: [props.ui?.childItem, item.ui?.childItem] })
                                          }, [
                                            createVNode(_sfc_main$9$1, mergeProps({ ref_for: true }, unref(pickLinkProps)(childItem), { custom: "" }), {
                                              default: withCtx(({ active: childActive, ...childSlotProps }) => [
                                                createVNode(unref(NavigationMenuLink), {
                                                  "as-child": "",
                                                  active: childActive,
                                                  onSelect: childItem.onSelect
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(_sfc_main$a$1, mergeProps({ ref_for: true }, childSlotProps, {
                                                      class: ui.value.childLink({ class: [props.ui?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                                    }), {
                                                      default: withCtx(() => [
                                                        childItem.icon ? (openBlock(), createBlock(_sfc_main$e$1, {
                                                          key: 0,
                                                          name: childItem.icon,
                                                          class: ui.value.childLinkIcon({ class: [props.ui?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                        }, null, 8, ["name", "class"])) : createCommentVNode("", true),
                                                        createVNode("span", {
                                                          class: ui.value.childLinkLabel({ class: [props.ui?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                        }, [
                                                          createTextVNode(toDisplayString(unref(get)(childItem, props.labelKey)) + " ", 1),
                                                          childItem.target === "_blank" && __props.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$e$1, {
                                                            key: 0,
                                                            name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
                                                            class: ui.value.childLinkLabelExternalIcon({ class: [props.ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                          }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                                                        ], 2)
                                                      ]),
                                                      _: 2
                                                    }, 1040, ["class"])
                                                  ]),
                                                  _: 2
                                                }, 1032, ["active", "onSelect"])
                                              ]),
                                              _: 2
                                            }, 1040)
                                          ], 2);
                                        }), 128))
                                      ], 2)
                                    ])
                                  ]),
                                  default: withCtx(() => [
                                    createVNode(_sfc_main$a$1, mergeProps(slotProps, {
                                      class: ui.value.link({ class: [props.ui?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })
                                    }), {
                                      default: withCtx(() => [
                                        createVNode(unref(ReuseLinkTemplate), {
                                          item,
                                          active: active || item.active,
                                          index
                                        }, null, 8, ["item", "active", "index"])
                                      ]),
                                      _: 2
                                    }, 1040, ["class"])
                                  ]),
                                  _: 2
                                }, 1040, ["ui"])) : __props.orientation === "vertical" && __props.collapsed && (!!props.tooltip || !!item.tooltip) ? (openBlock(), createBlock(_sfc_main$b, mergeProps({
                                  key: 1,
                                  text: unref(get)(item, props.labelKey)
                                }, { ...tooltipProps.value, ...typeof item.tooltip === "boolean" ? {} : item.tooltip || {} }), {
                                  default: withCtx(() => [
                                    createVNode(_sfc_main$a$1, mergeProps(slotProps, {
                                      class: ui.value.link({ class: [props.ui?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })
                                    }), {
                                      default: withCtx(() => [
                                        createVNode(unref(ReuseLinkTemplate), {
                                          item,
                                          active: active || item.active,
                                          index
                                        }, null, 8, ["item", "active", "index"])
                                      ]),
                                      _: 2
                                    }, 1040, ["class"])
                                  ]),
                                  _: 2
                                }, 1040, ["text"])) : (openBlock(), createBlock(_sfc_main$a$1, mergeProps({ key: 2 }, slotProps, {
                                  class: ui.value.link({ class: [props.ui?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: __props.orientation === "horizontal" || level > 0 })
                                }), {
                                  default: withCtx(() => [
                                    createVNode(unref(ReuseLinkTemplate), {
                                      item,
                                      active: active || item.active,
                                      index
                                    }, null, 8, ["item", "active", "index"])
                                  ]),
                                  _: 2
                                }, 1040, ["class"]))
                              ]),
                              _: 2
                            }, 1064, ["active", "disabled", "onSelect"])),
                            __props.orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) ? (openBlock(), createBlock(unref(NavigationMenuContent), mergeProps({ key: 0 }, contentProps.value, {
                              class: ui.value.content({ class: [props.ui?.content, item.ui?.content] })
                            }), {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
                                  item,
                                  active: active || item.active,
                                  index
                                }, () => [
                                  createVNode("ul", {
                                    class: ui.value.childList({ class: [props.ui?.childList, item.ui?.childList] })
                                  }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
                                      return openBlock(), createBlock("li", {
                                        key: childIndex,
                                        class: ui.value.childItem({ class: [props.ui?.childItem, item.ui?.childItem] })
                                      }, [
                                        createVNode(_sfc_main$9$1, mergeProps({ ref_for: true }, unref(pickLinkProps)(childItem), { custom: "" }), {
                                          default: withCtx(({ active: childActive, ...childSlotProps }) => [
                                            createVNode(unref(NavigationMenuLink), {
                                              "as-child": "",
                                              active: childActive,
                                              onSelect: childItem.onSelect
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_sfc_main$a$1, mergeProps({ ref_for: true }, childSlotProps, {
                                                  class: ui.value.childLink({ class: [props.ui?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                                }), {
                                                  default: withCtx(() => [
                                                    childItem.icon ? (openBlock(), createBlock(_sfc_main$e$1, {
                                                      key: 0,
                                                      name: childItem.icon,
                                                      class: ui.value.childLinkIcon({ class: [props.ui?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                    }, null, 8, ["name", "class"])) : createCommentVNode("", true),
                                                    createVNode("div", {
                                                      class: ui.value.childLinkWrapper({ class: [props.ui?.childLinkWrapper, item.ui?.childLinkWrapper] })
                                                    }, [
                                                      createVNode("p", {
                                                        class: ui.value.childLinkLabel({ class: [props.ui?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                      }, [
                                                        createTextVNode(toDisplayString(unref(get)(childItem, props.labelKey)) + " ", 1),
                                                        childItem.target === "_blank" && __props.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$e$1, {
                                                          key: 0,
                                                          name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
                                                          class: ui.value.childLinkLabelExternalIcon({ class: [props.ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                        }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                                                      ], 2),
                                                      childItem.description ? (openBlock(), createBlock("p", {
                                                        key: 0,
                                                        class: ui.value.childLinkDescription({ class: [props.ui?.childLinkDescription, item.ui?.childLinkDescription], active: childActive })
                                                      }, toDisplayString(childItem.description), 3)) : createCommentVNode("", true)
                                                    ], 2)
                                                  ]),
                                                  _: 2
                                                }, 1040, ["class"])
                                              ]),
                                              _: 2
                                            }, 1032, ["active", "onSelect"])
                                          ]),
                                          _: 2
                                        }, 1040)
                                      ], 2);
                                    }), 128))
                                  ], 2)
                                ])
                              ]),
                              _: 2
                            }, 1040, ["class"])) : createCommentVNode("", true)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (__props.orientation === "vertical" && item.children?.length && !__props.collapsed) {
                    _push3(ssrRenderComponent(unref(AccordionContent), {
                      class: ui.value.content({ class: [props.ui?.content, item.ui?.content] })
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(AccordionRoot), mergeProps({
                            ...unref(accordionProps),
                            defaultValue: getAccordionDefaultValue(item.children, level + 1)
                          }, {
                            as: "ul",
                            class: ui.value.childList({ class: props.ui?.childList })
                          }), {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(item.children, (childItem, childIndex) => {
                                  _push5(ssrRenderComponent(unref(ReuseItemTemplate), {
                                    key: childIndex,
                                    item: childItem,
                                    index: childIndex,
                                    level: level + 1,
                                    class: ui.value.childItem({ class: [props.ui?.childItem, childItem.ui?.childItem] })
                                  }, null, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
                                    return openBlock(), createBlock(unref(ReuseItemTemplate), {
                                      key: childIndex,
                                      item: childItem,
                                      index: childIndex,
                                      level: level + 1,
                                      class: ui.value.childItem({ class: [props.ui?.childItem, childItem.ui?.childItem] })
                                    }, null, 8, ["item", "index", "level", "class"]);
                                  }), 128))
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(AccordionRoot), mergeProps({
                              ...unref(accordionProps),
                              defaultValue: getAccordionDefaultValue(item.children, level + 1)
                            }, {
                              as: "ul",
                              class: ui.value.childList({ class: props.ui?.childList })
                            }), {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
                                  return openBlock(), createBlock(unref(ReuseItemTemplate), {
                                    key: childIndex,
                                    item: childItem,
                                    index: childIndex,
                                    level: level + 1,
                                    class: ui.value.childItem({ class: [props.ui?.childItem, childItem.ui?.childItem] })
                                  }, null, 8, ["item", "index", "level", "class"]);
                                }), 128))
                              ]),
                              _: 2
                            }, 1040, ["class"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    __props.orientation === "vertical" && item.type === "label" && !__props.collapsed ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: ui.value.label({ class: [props.ui?.label, item.ui?.label, item.class] })
                    }, [
                      createVNode(unref(ReuseLinkTemplate), {
                        item,
                        index
                      }, null, 8, ["item", "index"])
                    ], 2)) : item.type !== "label" ? (openBlock(), createBlock(_sfc_main$9$1, mergeProps({ key: 1 }, __props.orientation === "vertical" && item.children?.length && !__props.collapsed && item.type === "trigger" ? {} : unref(pickLinkProps)(item), { custom: "" }), {
                      default: withCtx(({ active, ...slotProps }) => [
                        (openBlock(), createBlock(resolveDynamicComponent(__props.orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) ? unref(NavigationMenuTrigger) : __props.orientation === "vertical" && item.children?.length && !__props.collapsed && !slotProps.href ? unref(AccordionTrigger) : unref(NavigationMenuLink)), {
                          "as-child": "",
                          active: active || item.active,
                          disabled: item.disabled,
                          onSelect: item.onSelect
                        }, {
                          default: withCtx(() => [
                            __props.orientation === "vertical" && __props.collapsed && item.children?.length && (!!props.popover || !!item.popover) ? (openBlock(), createBlock(_sfc_main$c, mergeProps({ key: 0 }, { ...popoverProps.value, ...typeof item.popover === "boolean" ? {} : item.popover || {} }, {
                              ui: { content: ui.value.content({ class: [props.ui?.content, item.ui?.content] }) }
                            }), {
                              content: withCtx(() => [
                                renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
                                  item,
                                  active: active || item.active,
                                  index
                                }, () => [
                                  createVNode("ul", {
                                    class: ui.value.childList({ class: [props.ui?.childList, item.ui?.childList] })
                                  }, [
                                    createVNode("li", {
                                      class: ui.value.childLabel({ class: [props.ui?.childLabel, item.ui?.childLabel] })
                                    }, toDisplayString(unref(get)(item, props.labelKey)), 3),
                                    (openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
                                      return openBlock(), createBlock("li", {
                                        key: childIndex,
                                        class: ui.value.childItem({ class: [props.ui?.childItem, item.ui?.childItem] })
                                      }, [
                                        createVNode(_sfc_main$9$1, mergeProps({ ref_for: true }, unref(pickLinkProps)(childItem), { custom: "" }), {
                                          default: withCtx(({ active: childActive, ...childSlotProps }) => [
                                            createVNode(unref(NavigationMenuLink), {
                                              "as-child": "",
                                              active: childActive,
                                              onSelect: childItem.onSelect
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_sfc_main$a$1, mergeProps({ ref_for: true }, childSlotProps, {
                                                  class: ui.value.childLink({ class: [props.ui?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                                }), {
                                                  default: withCtx(() => [
                                                    childItem.icon ? (openBlock(), createBlock(_sfc_main$e$1, {
                                                      key: 0,
                                                      name: childItem.icon,
                                                      class: ui.value.childLinkIcon({ class: [props.ui?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                    }, null, 8, ["name", "class"])) : createCommentVNode("", true),
                                                    createVNode("span", {
                                                      class: ui.value.childLinkLabel({ class: [props.ui?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                    }, [
                                                      createTextVNode(toDisplayString(unref(get)(childItem, props.labelKey)) + " ", 1),
                                                      childItem.target === "_blank" && __props.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$e$1, {
                                                        key: 0,
                                                        name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
                                                        class: ui.value.childLinkLabelExternalIcon({ class: [props.ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                      }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                                                    ], 2)
                                                  ]),
                                                  _: 2
                                                }, 1040, ["class"])
                                              ]),
                                              _: 2
                                            }, 1032, ["active", "onSelect"])
                                          ]),
                                          _: 2
                                        }, 1040)
                                      ], 2);
                                    }), 128))
                                  ], 2)
                                ])
                              ]),
                              default: withCtx(() => [
                                createVNode(_sfc_main$a$1, mergeProps(slotProps, {
                                  class: ui.value.link({ class: [props.ui?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })
                                }), {
                                  default: withCtx(() => [
                                    createVNode(unref(ReuseLinkTemplate), {
                                      item,
                                      active: active || item.active,
                                      index
                                    }, null, 8, ["item", "active", "index"])
                                  ]),
                                  _: 2
                                }, 1040, ["class"])
                              ]),
                              _: 2
                            }, 1040, ["ui"])) : __props.orientation === "vertical" && __props.collapsed && (!!props.tooltip || !!item.tooltip) ? (openBlock(), createBlock(_sfc_main$b, mergeProps({
                              key: 1,
                              text: unref(get)(item, props.labelKey)
                            }, { ...tooltipProps.value, ...typeof item.tooltip === "boolean" ? {} : item.tooltip || {} }), {
                              default: withCtx(() => [
                                createVNode(_sfc_main$a$1, mergeProps(slotProps, {
                                  class: ui.value.link({ class: [props.ui?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })
                                }), {
                                  default: withCtx(() => [
                                    createVNode(unref(ReuseLinkTemplate), {
                                      item,
                                      active: active || item.active,
                                      index
                                    }, null, 8, ["item", "active", "index"])
                                  ]),
                                  _: 2
                                }, 1040, ["class"])
                              ]),
                              _: 2
                            }, 1040, ["text"])) : (openBlock(), createBlock(_sfc_main$a$1, mergeProps({ key: 2 }, slotProps, {
                              class: ui.value.link({ class: [props.ui?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: __props.orientation === "horizontal" || level > 0 })
                            }), {
                              default: withCtx(() => [
                                createVNode(unref(ReuseLinkTemplate), {
                                  item,
                                  active: active || item.active,
                                  index
                                }, null, 8, ["item", "active", "index"])
                              ]),
                              _: 2
                            }, 1040, ["class"]))
                          ]),
                          _: 2
                        }, 1064, ["active", "disabled", "onSelect"])),
                        __props.orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) ? (openBlock(), createBlock(unref(NavigationMenuContent), mergeProps({ key: 0 }, contentProps.value, {
                          class: ui.value.content({ class: [props.ui?.content, item.ui?.content] })
                        }), {
                          default: withCtx(() => [
                            renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
                              item,
                              active: active || item.active,
                              index
                            }, () => [
                              createVNode("ul", {
                                class: ui.value.childList({ class: [props.ui?.childList, item.ui?.childList] })
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
                                  return openBlock(), createBlock("li", {
                                    key: childIndex,
                                    class: ui.value.childItem({ class: [props.ui?.childItem, item.ui?.childItem] })
                                  }, [
                                    createVNode(_sfc_main$9$1, mergeProps({ ref_for: true }, unref(pickLinkProps)(childItem), { custom: "" }), {
                                      default: withCtx(({ active: childActive, ...childSlotProps }) => [
                                        createVNode(unref(NavigationMenuLink), {
                                          "as-child": "",
                                          active: childActive,
                                          onSelect: childItem.onSelect
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_sfc_main$a$1, mergeProps({ ref_for: true }, childSlotProps, {
                                              class: ui.value.childLink({ class: [props.ui?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                            }), {
                                              default: withCtx(() => [
                                                childItem.icon ? (openBlock(), createBlock(_sfc_main$e$1, {
                                                  key: 0,
                                                  name: childItem.icon,
                                                  class: ui.value.childLinkIcon({ class: [props.ui?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                }, null, 8, ["name", "class"])) : createCommentVNode("", true),
                                                createVNode("div", {
                                                  class: ui.value.childLinkWrapper({ class: [props.ui?.childLinkWrapper, item.ui?.childLinkWrapper] })
                                                }, [
                                                  createVNode("p", {
                                                    class: ui.value.childLinkLabel({ class: [props.ui?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                  }, [
                                                    createTextVNode(toDisplayString(unref(get)(childItem, props.labelKey)) + " ", 1),
                                                    childItem.target === "_blank" && __props.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$e$1, {
                                                      key: 0,
                                                      name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
                                                      class: ui.value.childLinkLabelExternalIcon({ class: [props.ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                    }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                                                  ], 2),
                                                  childItem.description ? (openBlock(), createBlock("p", {
                                                    key: 0,
                                                    class: ui.value.childLinkDescription({ class: [props.ui?.childLinkDescription, item.ui?.childLinkDescription], active: childActive })
                                                  }, toDisplayString(childItem.description), 3)) : createCommentVNode("", true)
                                                ], 2)
                                              ]),
                                              _: 2
                                            }, 1040, ["class"])
                                          ]),
                                          _: 2
                                        }, 1032, ["active", "onSelect"])
                                      ]),
                                      _: 2
                                    }, 1040)
                                  ], 2);
                                }), 128))
                              ], 2)
                            ])
                          ]),
                          _: 2
                        }, 1040, ["class"])) : createCommentVNode("", true)
                      ]),
                      _: 2
                    }, 1040)) : createCommentVNode("", true),
                    __props.orientation === "vertical" && item.children?.length && !__props.collapsed ? (openBlock(), createBlock(unref(AccordionContent), {
                      key: 2,
                      class: ui.value.content({ class: [props.ui?.content, item.ui?.content] })
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(AccordionRoot), mergeProps({
                          ...unref(accordionProps),
                          defaultValue: getAccordionDefaultValue(item.children, level + 1)
                        }, {
                          as: "ul",
                          class: ui.value.childList({ class: props.ui?.childList })
                        }), {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
                              return openBlock(), createBlock(unref(ReuseItemTemplate), {
                                key: childIndex,
                                item: childItem,
                                index: childIndex,
                                level: level + 1,
                                class: ui.value.childItem({ class: [props.ui?.childItem, childItem.ui?.childItem] })
                              }, null, 8, ["item", "index", "level", "class"]);
                            }), 128))
                          ]),
                          _: 2
                        }, 1040, ["class"])
                      ]),
                      _: 2
                    }, 1032, ["class"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 2
            }), _parent2, _scopeId);
          } else {
            return [
              (openBlock(), createBlock(resolveDynamicComponent(__props.orientation === "vertical" && !__props.collapsed ? unref(AccordionItem) : unref(NavigationMenuItem)), {
                as: "li",
                value: item.value || (level > 0 ? `item-${level}-${index}` : `item-${index}`)
              }, {
                default: withCtx(() => [
                  __props.orientation === "vertical" && item.type === "label" && !__props.collapsed ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: ui.value.label({ class: [props.ui?.label, item.ui?.label, item.class] })
                  }, [
                    createVNode(unref(ReuseLinkTemplate), {
                      item,
                      index
                    }, null, 8, ["item", "index"])
                  ], 2)) : item.type !== "label" ? (openBlock(), createBlock(_sfc_main$9$1, mergeProps({ key: 1 }, __props.orientation === "vertical" && item.children?.length && !__props.collapsed && item.type === "trigger" ? {} : unref(pickLinkProps)(item), { custom: "" }), {
                    default: withCtx(({ active, ...slotProps }) => [
                      (openBlock(), createBlock(resolveDynamicComponent(__props.orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) ? unref(NavigationMenuTrigger) : __props.orientation === "vertical" && item.children?.length && !__props.collapsed && !slotProps.href ? unref(AccordionTrigger) : unref(NavigationMenuLink)), {
                        "as-child": "",
                        active: active || item.active,
                        disabled: item.disabled,
                        onSelect: item.onSelect
                      }, {
                        default: withCtx(() => [
                          __props.orientation === "vertical" && __props.collapsed && item.children?.length && (!!props.popover || !!item.popover) ? (openBlock(), createBlock(_sfc_main$c, mergeProps({ key: 0 }, { ...popoverProps.value, ...typeof item.popover === "boolean" ? {} : item.popover || {} }, {
                            ui: { content: ui.value.content({ class: [props.ui?.content, item.ui?.content] }) }
                          }), {
                            content: withCtx(() => [
                              renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
                                item,
                                active: active || item.active,
                                index
                              }, () => [
                                createVNode("ul", {
                                  class: ui.value.childList({ class: [props.ui?.childList, item.ui?.childList] })
                                }, [
                                  createVNode("li", {
                                    class: ui.value.childLabel({ class: [props.ui?.childLabel, item.ui?.childLabel] })
                                  }, toDisplayString(unref(get)(item, props.labelKey)), 3),
                                  (openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
                                    return openBlock(), createBlock("li", {
                                      key: childIndex,
                                      class: ui.value.childItem({ class: [props.ui?.childItem, item.ui?.childItem] })
                                    }, [
                                      createVNode(_sfc_main$9$1, mergeProps({ ref_for: true }, unref(pickLinkProps)(childItem), { custom: "" }), {
                                        default: withCtx(({ active: childActive, ...childSlotProps }) => [
                                          createVNode(unref(NavigationMenuLink), {
                                            "as-child": "",
                                            active: childActive,
                                            onSelect: childItem.onSelect
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_sfc_main$a$1, mergeProps({ ref_for: true }, childSlotProps, {
                                                class: ui.value.childLink({ class: [props.ui?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                              }), {
                                                default: withCtx(() => [
                                                  childItem.icon ? (openBlock(), createBlock(_sfc_main$e$1, {
                                                    key: 0,
                                                    name: childItem.icon,
                                                    class: ui.value.childLinkIcon({ class: [props.ui?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                                  }, null, 8, ["name", "class"])) : createCommentVNode("", true),
                                                  createVNode("span", {
                                                    class: ui.value.childLinkLabel({ class: [props.ui?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                  }, [
                                                    createTextVNode(toDisplayString(unref(get)(childItem, props.labelKey)) + " ", 1),
                                                    childItem.target === "_blank" && __props.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$e$1, {
                                                      key: 0,
                                                      name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
                                                      class: ui.value.childLinkLabelExternalIcon({ class: [props.ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                    }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                                                  ], 2)
                                                ]),
                                                _: 2
                                              }, 1040, ["class"])
                                            ]),
                                            _: 2
                                          }, 1032, ["active", "onSelect"])
                                        ]),
                                        _: 2
                                      }, 1040)
                                    ], 2);
                                  }), 128))
                                ], 2)
                              ])
                            ]),
                            default: withCtx(() => [
                              createVNode(_sfc_main$a$1, mergeProps(slotProps, {
                                class: ui.value.link({ class: [props.ui?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })
                              }), {
                                default: withCtx(() => [
                                  createVNode(unref(ReuseLinkTemplate), {
                                    item,
                                    active: active || item.active,
                                    index
                                  }, null, 8, ["item", "active", "index"])
                                ]),
                                _: 2
                              }, 1040, ["class"])
                            ]),
                            _: 2
                          }, 1040, ["ui"])) : __props.orientation === "vertical" && __props.collapsed && (!!props.tooltip || !!item.tooltip) ? (openBlock(), createBlock(_sfc_main$b, mergeProps({
                            key: 1,
                            text: unref(get)(item, props.labelKey)
                          }, { ...tooltipProps.value, ...typeof item.tooltip === "boolean" ? {} : item.tooltip || {} }), {
                            default: withCtx(() => [
                              createVNode(_sfc_main$a$1, mergeProps(slotProps, {
                                class: ui.value.link({ class: [props.ui?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })
                              }), {
                                default: withCtx(() => [
                                  createVNode(unref(ReuseLinkTemplate), {
                                    item,
                                    active: active || item.active,
                                    index
                                  }, null, 8, ["item", "active", "index"])
                                ]),
                                _: 2
                              }, 1040, ["class"])
                            ]),
                            _: 2
                          }, 1040, ["text"])) : (openBlock(), createBlock(_sfc_main$a$1, mergeProps({ key: 2 }, slotProps, {
                            class: ui.value.link({ class: [props.ui?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: __props.orientation === "horizontal" || level > 0 })
                          }), {
                            default: withCtx(() => [
                              createVNode(unref(ReuseLinkTemplate), {
                                item,
                                active: active || item.active,
                                index
                              }, null, 8, ["item", "active", "index"])
                            ]),
                            _: 2
                          }, 1040, ["class"]))
                        ]),
                        _: 2
                      }, 1064, ["active", "disabled", "onSelect"])),
                      __props.orientation === "horizontal" && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : "item-content"]) ? (openBlock(), createBlock(unref(NavigationMenuContent), mergeProps({ key: 0 }, contentProps.value, {
                        class: ui.value.content({ class: [props.ui?.content, item.ui?.content] })
                      }), {
                        default: withCtx(() => [
                          renderSlot(_ctx.$slots, item.slot ? `${item.slot}-content` : "item-content", {
                            item,
                            active: active || item.active,
                            index
                          }, () => [
                            createVNode("ul", {
                              class: ui.value.childList({ class: [props.ui?.childList, item.ui?.childList] })
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
                                return openBlock(), createBlock("li", {
                                  key: childIndex,
                                  class: ui.value.childItem({ class: [props.ui?.childItem, item.ui?.childItem] })
                                }, [
                                  createVNode(_sfc_main$9$1, mergeProps({ ref_for: true }, unref(pickLinkProps)(childItem), { custom: "" }), {
                                    default: withCtx(({ active: childActive, ...childSlotProps }) => [
                                      createVNode(unref(NavigationMenuLink), {
                                        "as-child": "",
                                        active: childActive,
                                        onSelect: childItem.onSelect
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_sfc_main$a$1, mergeProps({ ref_for: true }, childSlotProps, {
                                            class: ui.value.childLink({ class: [props.ui?.childLink, item.ui?.childLink, childItem.class], active: childActive })
                                          }), {
                                            default: withCtx(() => [
                                              childItem.icon ? (openBlock(), createBlock(_sfc_main$e$1, {
                                                key: 0,
                                                name: childItem.icon,
                                                class: ui.value.childLinkIcon({ class: [props.ui?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })
                                              }, null, 8, ["name", "class"])) : createCommentVNode("", true),
                                              createVNode("div", {
                                                class: ui.value.childLinkWrapper({ class: [props.ui?.childLinkWrapper, item.ui?.childLinkWrapper] })
                                              }, [
                                                createVNode("p", {
                                                  class: ui.value.childLinkLabel({ class: [props.ui?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })
                                                }, [
                                                  createTextVNode(toDisplayString(unref(get)(childItem, props.labelKey)) + " ", 1),
                                                  childItem.target === "_blank" && __props.externalIcon !== false ? (openBlock(), createBlock(_sfc_main$e$1, {
                                                    key: 0,
                                                    name: typeof __props.externalIcon === "string" ? __props.externalIcon : unref(appConfig).ui.icons.external,
                                                    class: ui.value.childLinkLabelExternalIcon({ class: [props.ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })
                                                  }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                                                ], 2),
                                                childItem.description ? (openBlock(), createBlock("p", {
                                                  key: 0,
                                                  class: ui.value.childLinkDescription({ class: [props.ui?.childLinkDescription, item.ui?.childLinkDescription], active: childActive })
                                                }, toDisplayString(childItem.description), 3)) : createCommentVNode("", true)
                                              ], 2)
                                            ]),
                                            _: 2
                                          }, 1040, ["class"])
                                        ]),
                                        _: 2
                                      }, 1032, ["active", "onSelect"])
                                    ]),
                                    _: 2
                                  }, 1040)
                                ], 2);
                              }), 128))
                            ], 2)
                          ])
                        ]),
                        _: 2
                      }, 1040, ["class"])) : createCommentVNode("", true)
                    ]),
                    _: 2
                  }, 1040)) : createCommentVNode("", true),
                  __props.orientation === "vertical" && item.children?.length && !__props.collapsed ? (openBlock(), createBlock(unref(AccordionContent), {
                    key: 2,
                    class: ui.value.content({ class: [props.ui?.content, item.ui?.content] })
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(AccordionRoot), mergeProps({
                        ...unref(accordionProps),
                        defaultValue: getAccordionDefaultValue(item.children, level + 1)
                      }, {
                        as: "ul",
                        class: ui.value.childList({ class: props.ui?.childList })
                      }), {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(item.children, (childItem, childIndex) => {
                            return openBlock(), createBlock(unref(ReuseItemTemplate), {
                              key: childIndex,
                              item: childItem,
                              index: childIndex,
                              level: level + 1,
                              class: ui.value.childItem({ class: [props.ui?.childItem, childItem.ui?.childItem] })
                            }, null, 8, ["item", "index", "level", "class"]);
                          }), 128))
                        ]),
                        _: 2
                      }, 1040, ["class"])
                    ]),
                    _: 2
                  }, 1032, ["class"])) : createCommentVNode("", true)
                ]),
                _: 2
              }, 1032, ["value"]))
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(ssrRenderComponent(unref(NavigationMenuRoot), mergeProps({ ...unref(rootProps), ..._ctx.$attrs }, {
        "data-collapsed": __props.collapsed,
        class: ui.value.root({ class: [props.ui?.root, props.class] })
      }), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "list-leading", {}, null, _push2, _parent2, _scopeId);
            _push2(`<!--[-->`);
            ssrRenderList(lists.value, (list, listIndex) => {
              _push2(`<!--[-->`);
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(__props.orientation === "vertical" && !__props.collapsed ? unref(AccordionRoot) : unref(NavigationMenuList)), mergeProps({ ref_for: true }, __props.orientation === "vertical" && !__props.collapsed ? {
                ...unref(accordionProps),
                defaultValue: getAccordionDefaultValue(list)
              } : {}, {
                as: "ul",
                class: ui.value.list({ class: props.ui?.list })
              }), {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(list, (item, index) => {
                      _push3(ssrRenderComponent(unref(ReuseItemTemplate), {
                        key: `list-${listIndex}-${index}`,
                        item,
                        index,
                        class: ui.value.item({ class: [props.ui?.item, item.ui?.item] })
                      }, null, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(list, (item, index) => {
                        return openBlock(), createBlock(unref(ReuseItemTemplate), {
                          key: `list-${listIndex}-${index}`,
                          item,
                          index,
                          class: ui.value.item({ class: [props.ui?.item, item.ui?.item] })
                        }, null, 8, ["item", "index", "class"]);
                      }), 128))
                    ];
                  }
                }),
                _: 2
              }), _parent2, _scopeId);
              if (__props.orientation === "vertical" && listIndex < lists.value.length - 1) {
                _push2(`<div class="${ssrRenderClass(ui.value.separator({ class: props.ui?.separator }))}"${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--]-->`);
            });
            _push2(`<!--]-->`);
            ssrRenderSlot(_ctx.$slots, "list-trailing", {}, null, _push2, _parent2, _scopeId);
            if (__props.orientation === "horizontal") {
              _push2(`<div class="${ssrRenderClass(ui.value.viewportWrapper({ class: props.ui?.viewportWrapper }))}"${_scopeId}>`);
              if (__props.arrow) {
                _push2(ssrRenderComponent(unref(NavigationMenuIndicator), {
                  class: ui.value.indicator({ class: props.ui?.indicator })
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="${ssrRenderClass(ui.value.arrow({ class: props.ui?.arrow }))}"${_scopeId2}></div>`);
                    } else {
                      return [
                        createVNode("div", {
                          class: ui.value.arrow({ class: props.ui?.arrow })
                        }, null, 2)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(unref(NavigationMenuViewport), {
                class: ui.value.viewport({ class: props.ui?.viewport })
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              renderSlot(_ctx.$slots, "list-leading"),
              (openBlock(true), createBlock(Fragment, null, renderList(lists.value, (list, listIndex) => {
                return openBlock(), createBlock(Fragment, {
                  key: `list-${listIndex}`
                }, [
                  (openBlock(), createBlock(resolveDynamicComponent(__props.orientation === "vertical" && !__props.collapsed ? unref(AccordionRoot) : unref(NavigationMenuList)), mergeProps({ ref_for: true }, __props.orientation === "vertical" && !__props.collapsed ? {
                    ...unref(accordionProps),
                    defaultValue: getAccordionDefaultValue(list)
                  } : {}, {
                    as: "ul",
                    class: ui.value.list({ class: props.ui?.list })
                  }), {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(list, (item, index) => {
                        return openBlock(), createBlock(unref(ReuseItemTemplate), {
                          key: `list-${listIndex}-${index}`,
                          item,
                          index,
                          class: ui.value.item({ class: [props.ui?.item, item.ui?.item] })
                        }, null, 8, ["item", "index", "class"]);
                      }), 128))
                    ]),
                    _: 2
                  }, 1040, ["class"])),
                  __props.orientation === "vertical" && listIndex < lists.value.length - 1 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: ui.value.separator({ class: props.ui?.separator })
                  }, null, 2)) : createCommentVNode("", true)
                ], 64);
              }), 128)),
              renderSlot(_ctx.$slots, "list-trailing"),
              __props.orientation === "horizontal" ? (openBlock(), createBlock("div", {
                key: 0,
                class: ui.value.viewportWrapper({ class: props.ui?.viewportWrapper })
              }, [
                __props.arrow ? (openBlock(), createBlock(unref(NavigationMenuIndicator), {
                  key: 0,
                  class: ui.value.indicator({ class: props.ui?.indicator })
                }, {
                  default: withCtx(() => [
                    createVNode("div", {
                      class: ui.value.arrow({ class: props.ui?.arrow })
                    }, null, 2)
                  ]),
                  _: 1
                }, 8, ["class"])) : createCommentVNode("", true),
                createVNode(unref(NavigationMenuViewport), {
                  class: ui.value.viewport({ class: props.ui?.viewport })
                }, null, 8, ["class"])
              ], 2)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/NavigationMenu.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "GlobalCategoryMenu",
  __ssrInlineRender: true,
  props: {
    items: Array
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_USlideover = _sfc_main$d;
      const _component_UButton = _sfc_main$8$1;
      const _component_UNavigationMenu = _sfc_main$a;
      _push(ssrRenderComponent(_component_USlideover, mergeProps({
        side: "left",
        title: "Product Categories",
        ui: { content: "w-4/6" }
      }, _attrs), {
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UNavigationMenu, {
              orientation: "vertical",
              items: __props.items
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UNavigationMenu, {
                orientation: "vertical",
                items: __props.items
              }, null, 8, ["items"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              color: "neutral",
              variant: "ghost",
              icon: "i-heroicons-bars-3"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UButton, {
                color: "neutral",
                variant: "ghost",
                icon: "i-heroicons-bars-3"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Mobile/GlobalCategoryMenu.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __nuxt_component_1$1 = Object.assign(_sfc_main$9, { __name: "MobileGlobalCategoryMenu" });
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "AppLogo",
  __ssrInlineRender: true,
  props: {
    size: { default: "md" },
    showTagline: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const { data: settings } = useNuxtData("settings");
    const sizeClasses = computed(() => {
      const sizes = {
        sm: "h-8",
        md: "h-8",
        lg: "h-12",
        xl: "h-16"
      };
      return sizes[props.size];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = __nuxt_component_6;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-3" }, _attrs))}>`);
      if (unref(settings)?.branding.logo) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_NuxtImg, {
          src: unref(settings).branding.logo,
          alt: unref(settings).site.name,
          class: [unref(sizeClasses), "w-auto dark:hidden"],
          loading: "eager",
          format: "webp"
        }, null, _parent));
        if (unref(settings).branding.logo_dark) {
          _push(ssrRenderComponent(_component_NuxtImg, {
            src: unref(settings).branding.logo_dark,
            alt: unref(settings).site.name,
            class: [unref(sizeClasses), "w-auto hidden dark:block"],
            loading: "eager",
            format: "webp"
          }, null, _parent));
        } else {
          _push(ssrRenderComponent(_component_NuxtImg, {
            src: unref(settings).branding.logo,
            alt: unref(settings).site.name,
            class: [unref(sizeClasses), "w-auto hidden dark:block"],
            loading: "eager",
            format: "webp"
          }, null, _parent));
        }
        _push(`<!--]-->`);
      } else {
        _push(`<div class="flex flex-col"><h1 class="${ssrRenderClass([
          "font-bold",
          __props.size === "sm" ? "text-lg" : "",
          __props.size === "md" ? "text-xl" : "",
          __props.size === "lg" ? "text-2xl" : "",
          __props.size === "xl" ? "text-3xl" : ""
        ])}">${ssrInterpolate(unref(settings)?.site.name || "My Website")}</h1>`);
        if (__props.showTagline && unref(settings)?.site.tagline) {
          _push(`<p class="text-sm text-gray-600 dark:text-gray-400">${ssrInterpolate(unref(settings).site.tagline)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppLogo.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$8, { __name: "AppLogo" });
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "UserMenu",
  __ssrInlineRender: true,
  setup(__props) {
    const { user, clear: clearSession } = useUserSession();
    const items = ref([
      [
        {
          label: user.value?.name,
          avatar: {
            src: "https://github.com/benjamincanac.png"
          },
          type: "label"
        }
      ],
      [
        {
          label: "Profile",
          icon: "i-lucide-user",
          to: "/account"
        },
        {
          label: "Billing",
          icon: "i-lucide-credit-card"
        },
        {
          label: "Settings",
          icon: "i-lucide-cog",
          kbds: [","]
        },
        {
          label: "Keyboard shortcuts",
          icon: "i-lucide-monitor"
        }
      ],
      [
        {
          label: "Team",
          icon: "i-lucide-users"
        },
        {
          label: "Invite users",
          icon: "i-lucide-user-plus",
          children: [
            [
              {
                label: "Email",
                icon: "i-lucide-mail"
              },
              {
                label: "Message",
                icon: "i-lucide-message-square"
              }
            ],
            [
              {
                label: "More",
                icon: "i-lucide-circle-plus"
              }
            ]
          ]
        },
        {
          label: "New team",
          icon: "i-lucide-plus",
          kbds: ["meta", "n"]
        }
      ],
      [
        {
          label: "GitHub",
          icon: "i-simple-icons-github",
          to: "https://github.com/nuxt/ui",
          target: "_blank"
        },
        {
          label: "Support",
          icon: "i-lucide-life-buoy",
          to: "/"
        },
        {
          label: "API",
          icon: "i-lucide-cloud",
          disabled: true
        }
      ],
      [
        {
          label: "Logout",
          icon: "i-lucide-log-out",
          onSelect(e) {
            logout();
          }
        }
      ]
    ]);
    async function logout() {
      await clearSession();
      await navigateTo("/auth/login");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$8$1;
      const _component_UDropdownMenu = _sfc_main$1$1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (!unref(user)) {
        _push(ssrRenderComponent(_component_UButton, {
          to: "/auth/login",
          size: "sm",
          class: "hidden sm:inline-flex uppercase",
          icon: "i-heroicons-user",
          variant: "ghost"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`My Account`);
            } else {
              return [
                createTextVNode("My Account")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(ssrRenderComponent(_component_UDropdownMenu, {
          items: unref(items),
          ui: {
            content: "w-48"
          }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UButton, {
                label: unref(user)?.name,
                icon: "i-lucide-menu",
                color: "neutral",
                variant: "outline"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UButton, {
                  label: unref(user)?.name,
                  icon: "i-lucide-menu",
                  color: "neutral",
                  variant: "outline"
                }, null, 8, ["label"])
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
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UserMenu.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_8 = Object.assign(_sfc_main$7, { __name: "UserMenu" });
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "CartSidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const {
      cartItems,
      cartTotal,
      cartOriginalTotal,
      cartDiscount,
      cartSavings,
      appliedDiscounts,
      cartItemsCount,
      isCartOpen,
      isLoading,
      updateCartItemQuantity,
      removeFromCart,
      clearCart,
      checkout
    } = useCart();
    const { loggedIn } = useAuth();
    const checkoutLoading = ref(false);
    const localCartOpen = computed({
      get: () => {
        if (route.path === "/cart") {
          return false;
        }
        return isCartOpen.value;
      },
      set: (val) => {
        if (route.path === "/cart" && val === true) {
          return;
        }
        isCartOpen.value = val;
      }
    });
    watch(() => route.path, (newPath) => {
      if (newPath === "/cart") {
        isCartOpen.value = false;
      }
    });
    const getItemPrice = (item) => {
      const price = item.variation?.price ?? item.product?.price ?? 0;
      return parseFloat(price);
    };
    const getItemOriginalPrice = (item) => {
      const originalPrice = item.variation?.original_price ?? item.product?.original_price ?? item.variation?.price ?? item.product?.price ?? 0;
      return parseFloat(originalPrice);
    };
    const hasDiscount = (item) => {
      const currentPrice = getItemPrice(item);
      const originalPrice = getItemOriginalPrice(item);
      return originalPrice > currentPrice;
    };
    const getItemTotal = (item) => {
      return getItemPrice(item) * (item.quantity || 1);
    };
    const getItemOriginalTotal = (item) => {
      return getItemOriginalPrice(item) * (item.quantity || 1);
    };
    const checkMaxStock = isMaxStockReached;
    const handleCheckout = async () => {
      if (!loggedIn.value) {
        localCartOpen.value = false;
        await navigateTo("/checkout");
        return;
      }
      checkoutLoading.value = true;
      try {
        await checkout();
      } finally {
        checkoutLoading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_USlideover = _sfc_main$d;
      const _component_UButton = _sfc_main$8$1;
      const _component_UBadge = _sfc_main$l;
      const _component_UCard = _sfc_main$h;
      const _component_UIcon = _sfc_main$e$1;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_NuxtImg = __nuxt_component_6;
      _push(ssrRenderComponent(_component_USlideover, mergeProps({
        modelValue: unref(localCartOpen),
        "onUpdate:modelValue": ($event) => isRef(localCartOpen) ? localCartOpen.value = $event : null,
        title: "Mini Cart",
        description: "mini-cart"
      }, _attrs), {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UCard, { class: "flex flex-col h-full" }, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center justify-between"${_scopeId2}><h2 class="text-xl font-semibold text-gray-900 dark:text-white"${_scopeId2}> Shopping Cart (${ssrInterpolate(unref(cartItemsCount))}) </h2>`);
                  _push3(ssrRenderComponent(_component_UButton, {
                    color: "secondary",
                    variant: "ghost",
                    icon: "i-heroicons-x-mark",
                    onClick: ($event) => localCartOpen.value = false
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("h2", { class: "text-xl font-semibold text-gray-900 dark:text-white" }, " Shopping Cart (" + toDisplayString(unref(cartItemsCount)) + ") ", 1),
                      createVNode(_component_UButton, {
                        color: "secondary",
                        variant: "ghost",
                        icon: "i-heroicons-x-mark",
                        onClick: ($event) => localCartOpen.value = false
                      }, null, 8, ["onClick"])
                    ])
                  ];
                }
              }),
              footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(cartItems) && unref(cartItems).length > 0) {
                    _push3(`<div class="space-y-4"${_scopeId2}>`);
                    if (unref(appliedDiscounts) && unref(appliedDiscounts).length > 0) {
                      _push3(`<div class="space-y-2 pb-3 border-b border-gray-200 dark:border-gray-700"${_scopeId2}><!--[-->`);
                      ssrRenderList(unref(appliedDiscounts), (discount) => {
                        _push3(`<div class="flex items-start gap-2"${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_UIcon, {
                          name: "i-heroicons-tag",
                          class: "text-green-500 mt-0.5"
                        }, null, _parent3, _scopeId2));
                        _push3(`<div class="flex-1 min-w-0"${_scopeId2}><p class="text-xs font-medium text-green-600 dark:text-green-400"${_scopeId2}>${ssrInterpolate(discount.name)}</p><p class="text-xs text-gray-500 dark:text-gray-400"${_scopeId2}>${ssrInterpolate(discount.summary)} • ${ssrInterpolate(discount.items_affected)} ${ssrInterpolate(discount.items_affected === 1 ? "item" : "items")}</p></div><span class="text-xs font-semibold text-green-600 dark:text-green-400"${_scopeId2}>-$${ssrInterpolate(discount.discount_amount?.toFixed(2))}</span></div>`);
                      });
                      _push3(`<!--]--></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<div class="space-y-2"${_scopeId2}>`);
                    if (unref(cartDiscount) > 0) {
                      _push3(`<div class="flex justify-between text-sm text-gray-500 dark:text-gray-400"${_scopeId2}><span${_scopeId2}>Subtotal:</span><span class="line-through"${_scopeId2}>$${ssrInterpolate(unref(cartOriginalTotal)?.toFixed(2))}</span></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (unref(cartSavings) > 0) {
                      _push3(`<div class="flex justify-between text-sm text-green-600 dark:text-green-400"${_scopeId2}><span${_scopeId2}>Savings:</span><span${_scopeId2}>-$${ssrInterpolate(unref(cartSavings)?.toFixed(2))}</span></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<div class="flex justify-between items-center text-lg font-semibold pt-2 border-t border-gray-200 dark:border-gray-700"${_scopeId2}><span class="text-gray-900 dark:text-white"${_scopeId2}>Total:</span><span class="text-primary-500"${_scopeId2}>$${ssrInterpolate(unref(cartTotal)?.toFixed(2))}</span></div></div>`);
                    _push3(ssrRenderComponent(_component_UButton, {
                      class: "w-full",
                      color: "success",
                      variant: "soft",
                      block: "",
                      as: "a",
                      href: "/cart",
                      ui: { base: "rounded-none" }
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`View Cart`);
                        } else {
                          return [
                            createTextVNode("View Cart")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<div class="flex gap-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UButton, {
                      onClick: unref(clearCart),
                      color: "secondary",
                      variant: "soft",
                      block: "",
                      disabled: unref(isLoading),
                      ui: { base: "rounded-none" }
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Clear Cart `);
                        } else {
                          return [
                            createTextVNode(" Clear Cart ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UButton, {
                      onClick: handleCheckout,
                      color: "primary",
                      block: "",
                      loading: unref(checkoutLoading),
                      disabled: unref(isLoading),
                      ui: { base: "rounded-none" }
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Checkout `);
                        } else {
                          return [
                            createTextVNode(" Checkout ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    unref(cartItems) && unref(cartItems).length > 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-4"
                    }, [
                      unref(appliedDiscounts) && unref(appliedDiscounts).length > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "space-y-2 pb-3 border-b border-gray-200 dark:border-gray-700"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(appliedDiscounts), (discount) => {
                          return openBlock(), createBlock("div", {
                            key: discount.name,
                            class: "flex items-start gap-2"
                          }, [
                            createVNode(_component_UIcon, {
                              name: "i-heroicons-tag",
                              class: "text-green-500 mt-0.5"
                            }),
                            createVNode("div", { class: "flex-1 min-w-0" }, [
                              createVNode("p", { class: "text-xs font-medium text-green-600 dark:text-green-400" }, toDisplayString(discount.name), 1),
                              createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400" }, toDisplayString(discount.summary) + " • " + toDisplayString(discount.items_affected) + " " + toDisplayString(discount.items_affected === 1 ? "item" : "items"), 1)
                            ]),
                            createVNode("span", { class: "text-xs font-semibold text-green-600 dark:text-green-400" }, "-$" + toDisplayString(discount.discount_amount?.toFixed(2)), 1)
                          ]);
                        }), 128))
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "space-y-2" }, [
                        unref(cartDiscount) > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex justify-between text-sm text-gray-500 dark:text-gray-400"
                        }, [
                          createVNode("span", null, "Subtotal:"),
                          createVNode("span", { class: "line-through" }, "$" + toDisplayString(unref(cartOriginalTotal)?.toFixed(2)), 1)
                        ])) : createCommentVNode("", true),
                        unref(cartSavings) > 0 ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "flex justify-between text-sm text-green-600 dark:text-green-400"
                        }, [
                          createVNode("span", null, "Savings:"),
                          createVNode("span", null, "-$" + toDisplayString(unref(cartSavings)?.toFixed(2)), 1)
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "flex justify-between items-center text-lg font-semibold pt-2 border-t border-gray-200 dark:border-gray-700" }, [
                          createVNode("span", { class: "text-gray-900 dark:text-white" }, "Total:"),
                          createVNode("span", { class: "text-primary-500" }, "$" + toDisplayString(unref(cartTotal)?.toFixed(2)), 1)
                        ])
                      ]),
                      createVNode(_component_UButton, {
                        class: "w-full",
                        color: "success",
                        variant: "soft",
                        block: "",
                        as: "a",
                        href: "/cart",
                        ui: { base: "rounded-none" }
                      }, {
                        default: withCtx(() => [
                          createTextVNode("View Cart")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "flex gap-2" }, [
                        createVNode(_component_UButton, {
                          onClick: unref(clearCart),
                          color: "secondary",
                          variant: "soft",
                          block: "",
                          disabled: unref(isLoading),
                          ui: { base: "rounded-none" }
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Clear Cart ")
                          ]),
                          _: 1
                        }, 8, ["onClick", "disabled"]),
                        createVNode(_component_UButton, {
                          onClick: handleCheckout,
                          color: "primary",
                          block: "",
                          loading: unref(checkoutLoading),
                          disabled: unref(isLoading),
                          ui: { base: "rounded-none" }
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Checkout ")
                          ]),
                          _: 1
                        }, 8, ["loading", "disabled"])
                      ])
                    ])) : createCommentVNode("", true)
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(isLoading)) {
                    _push3(`<div class="flex items-center justify-center py-12"${_scopeId2}><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"${_scopeId2}></div></div>`);
                  } else if (!unref(cartItems) || unref(cartItems).length === 0) {
                    _push3(`<div class="flex flex-col items-center justify-center py-12 text-center"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-shopping-cart",
                      class: "text-6xl text-gray-300 mb-4"
                    }, null, _parent3, _scopeId2));
                    _push3(`<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2"${_scopeId2}>Your cart is empty</h3><p class="text-gray-500 dark:text-gray-400 mb-6"${_scopeId2}>Add some products to get started</p>`);
                    _push3(ssrRenderComponent(_component_UButton, {
                      onClick: ($event) => localCartOpen.value = false,
                      to: "/shop"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Continue Shopping`);
                        } else {
                          return [
                            createTextVNode("Continue Shopping")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<div class="space-y-4"${_scopeId2}><!--[-->`);
                    ssrRenderList(unref(cartItems), (item) => {
                      _push3(`<div class="flex gap-4 rounded-lg"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_NuxtLink, {
                        to: `/shop/product/${item.product?.slug || item.slug}`,
                        onClick: ($event) => localCartOpen.value = false
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_NuxtImg, {
                              src: item.variation?.images?.thumb || item.product?.image || "https://placehold.co/60x60",
                              alt: item.variation?.name || item.product?.name || "Product",
                              class: "w-20 h-20 object-cover",
                              width: "80",
                              height: "80",
                              loading: "lazy",
                              format: "webp"
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_NuxtImg, {
                                src: item.variation?.images?.thumb || item.product?.image || "https://placehold.co/60x60",
                                alt: item.variation?.name || item.product?.name || "Product",
                                class: "w-20 h-20 object-cover",
                                width: "80",
                                height: "80",
                                loading: "lazy",
                                format: "webp"
                              }, null, 8, ["src", "alt"])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`<div class="flex-1 min-w-0"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_NuxtLink, {
                        to: `/shop/product/${item.product?.slug || item.slug}`,
                        onClick: ($event) => localCartOpen.value = false,
                        class: "font-semibold text-gray-900 dark:text-white hover:text-primary-500 block truncate"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(item.product?.name || item.slug)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(item.product?.name || item.slug), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      if (item.variation) {
                        _push3(`<p class="text-xs text-gray-500 dark:text-gray-400 mt-1"${_scopeId2}>${ssrInterpolate(item.variation.name)}</p>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      if (item.variation?.price || item.product?.price) {
                        _push3(`<div class="mb-2"${_scopeId2}><div class="flex items-center gap-2"${_scopeId2}><span class="text-sm font-semibold text-gray-900 dark:text-white"${_scopeId2}> $${ssrInterpolate(getItemPrice(item).toFixed(2))}</span>`);
                        if (hasDiscount(item)) {
                          _push3(`<span class="text-xs text-gray-400 line-through"${_scopeId2}> $${ssrInterpolate(getItemOriginalPrice(item).toFixed(2))}</span>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`</div>`);
                        if (item.discount) {
                          _push3(ssrRenderComponent(_component_UBadge, {
                            color: "success",
                            variant: "soft",
                            size: "xs",
                            class: "mt-1"
                          }, {
                            default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                              if (_push4) {
                                _push4(`${ssrInterpolate(item.discount.summary)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(item.discount.summary), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent3, _scopeId2));
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`</div>`);
                      } else {
                        _push3(`<p class="text-xs text-gray-400 mb-2 italic"${_scopeId2}> Loading details... </p>`);
                      }
                      _push3(`<div class="flex items-center gap-2"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_UButton, {
                        onClick: ($event) => unref(updateCartItemQuantity)(item.product?.slug || item.slug, item.quantity - 1, item.variation_id),
                        icon: "i-lucide-minus",
                        size: "xs",
                        color: "secondary",
                        disabled: item.quantity <= 1 || unref(isLoading),
                        ui: { base: "rounded-none" }
                      }, null, _parent3, _scopeId2));
                      _push3(`<span class="text-sm font-medium w-8 text-center"${_scopeId2}>${ssrInterpolate(item.quantity)}</span>`);
                      _push3(ssrRenderComponent(_component_UButton, {
                        onClick: ($event) => unref(updateCartItemQuantity)(item.product?.slug || item.slug, item.quantity + 1, item.variation_id),
                        icon: "i-lucide-plus",
                        size: "xs",
                        color: "secondary",
                        disabled: unref(isLoading) || unref(checkMaxStock)(item),
                        ui: { base: "rounded-none" }
                      }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UButton, {
                        onClick: ($event) => unref(removeFromCart)(item.product?.slug || item.slug, item.variation_id),
                        icon: "i-heroicons-trash",
                        size: "xs",
                        color: "error",
                        variant: "soft",
                        class: "ml-auto",
                        disabled: unref(isLoading),
                        ui: { base: "rounded-none" }
                      }, null, _parent3, _scopeId2));
                      _push3(`</div>`);
                      if (unref(checkMaxStock)(item)) {
                        _push3(`<p class="text-xs text-orange-500 mt-1"${_scopeId2}> Max stock reached </p>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div><div class="text-right"${_scopeId2}>`);
                      if (item.variation?.price || item.product?.price) {
                        _push3(`<div${_scopeId2}><p class="font-semibold text-gray-900 dark:text-white"${_scopeId2}> $${ssrInterpolate(getItemTotal(item).toFixed(2))}</p>`);
                        if (hasDiscount(item)) {
                          _push3(`<p class="text-xs text-gray-400 line-through"${_scopeId2}> $${ssrInterpolate(getItemOriginalTotal(item).toFixed(2))}</p>`);
                        } else {
                          _push3(`<!---->`);
                        }
                        _push3(`</div>`);
                      } else {
                        _push3(`<p class="text-sm text-gray-400"${_scopeId2}> -- </p>`);
                      }
                      _push3(`</div></div>`);
                    });
                    _push3(`<!--]--></div>`);
                  }
                } else {
                  return [
                    unref(isLoading) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex items-center justify-center py-12"
                    }, [
                      createVNode("div", { class: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" })
                    ])) : !unref(cartItems) || unref(cartItems).length === 0 ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "flex flex-col items-center justify-center py-12 text-center"
                    }, [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-shopping-cart",
                        class: "text-6xl text-gray-300 mb-4"
                      }),
                      createVNode("h3", { class: "text-lg font-semibold text-gray-900 dark:text-white mb-2" }, "Your cart is empty"),
                      createVNode("p", { class: "text-gray-500 dark:text-gray-400 mb-6" }, "Add some products to get started"),
                      createVNode(_component_UButton, {
                        onClick: ($event) => localCartOpen.value = false,
                        to: "/shop"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Continue Shopping")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ])) : (openBlock(), createBlock("div", {
                      key: 2,
                      class: "space-y-4"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(cartItems), (item) => {
                        return openBlock(), createBlock("div", {
                          key: item.slug || item.productId,
                          class: "flex gap-4 rounded-lg"
                        }, [
                          createVNode(_component_NuxtLink, {
                            to: `/shop/product/${item.product?.slug || item.slug}`,
                            onClick: ($event) => localCartOpen.value = false
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_NuxtImg, {
                                src: item.variation?.images?.thumb || item.product?.image || "https://placehold.co/60x60",
                                alt: item.variation?.name || item.product?.name || "Product",
                                class: "w-20 h-20 object-cover",
                                width: "80",
                                height: "80",
                                loading: "lazy",
                                format: "webp"
                              }, null, 8, ["src", "alt"])
                            ]),
                            _: 2
                          }, 1032, ["to", "onClick"]),
                          createVNode("div", { class: "flex-1 min-w-0" }, [
                            createVNode(_component_NuxtLink, {
                              to: `/shop/product/${item.product?.slug || item.slug}`,
                              onClick: ($event) => localCartOpen.value = false,
                              class: "font-semibold text-gray-900 dark:text-white hover:text-primary-500 block truncate"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.product?.name || item.slug), 1)
                              ]),
                              _: 2
                            }, 1032, ["to", "onClick"]),
                            item.variation ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-xs text-gray-500 dark:text-gray-400 mt-1"
                            }, toDisplayString(item.variation.name), 1)) : createCommentVNode("", true),
                            item.variation?.price || item.product?.price ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: "mb-2"
                            }, [
                              createVNode("div", { class: "flex items-center gap-2" }, [
                                createVNode("span", { class: "text-sm font-semibold text-gray-900 dark:text-white" }, " $" + toDisplayString(getItemPrice(item).toFixed(2)), 1),
                                hasDiscount(item) ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "text-xs text-gray-400 line-through"
                                }, " $" + toDisplayString(getItemOriginalPrice(item).toFixed(2)), 1)) : createCommentVNode("", true)
                              ]),
                              item.discount ? (openBlock(), createBlock(_component_UBadge, {
                                key: 0,
                                color: "success",
                                variant: "soft",
                                size: "xs",
                                class: "mt-1"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item.discount.summary), 1)
                                ]),
                                _: 2
                              }, 1024)) : createCommentVNode("", true)
                            ])) : (openBlock(), createBlock("p", {
                              key: 2,
                              class: "text-xs text-gray-400 mb-2 italic"
                            }, " Loading details... ")),
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode(_component_UButton, {
                                onClick: ($event) => unref(updateCartItemQuantity)(item.product?.slug || item.slug, item.quantity - 1, item.variation_id),
                                icon: "i-lucide-minus",
                                size: "xs",
                                color: "secondary",
                                disabled: item.quantity <= 1 || unref(isLoading),
                                ui: { base: "rounded-none" }
                              }, null, 8, ["onClick", "disabled"]),
                              createVNode("span", { class: "text-sm font-medium w-8 text-center" }, toDisplayString(item.quantity), 1),
                              createVNode(_component_UButton, {
                                onClick: ($event) => unref(updateCartItemQuantity)(item.product?.slug || item.slug, item.quantity + 1, item.variation_id),
                                icon: "i-lucide-plus",
                                size: "xs",
                                color: "secondary",
                                disabled: unref(isLoading) || unref(checkMaxStock)(item),
                                ui: { base: "rounded-none" }
                              }, null, 8, ["onClick", "disabled"]),
                              createVNode(_component_UButton, {
                                onClick: ($event) => unref(removeFromCart)(item.product?.slug || item.slug, item.variation_id),
                                icon: "i-heroicons-trash",
                                size: "xs",
                                color: "error",
                                variant: "soft",
                                class: "ml-auto",
                                disabled: unref(isLoading),
                                ui: { base: "rounded-none" }
                              }, null, 8, ["onClick", "disabled"])
                            ]),
                            unref(checkMaxStock)(item) ? (openBlock(), createBlock("p", {
                              key: 3,
                              class: "text-xs text-orange-500 mt-1"
                            }, " Max stock reached ")) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "text-right" }, [
                            item.variation?.price || item.product?.price ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode("p", { class: "font-semibold text-gray-900 dark:text-white" }, " $" + toDisplayString(getItemTotal(item).toFixed(2)), 1),
                              hasDiscount(item) ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-xs text-gray-400 line-through"
                              }, " $" + toDisplayString(getItemOriginalTotal(item).toFixed(2)), 1)) : createCommentVNode("", true)
                            ])) : (openBlock(), createBlock("p", {
                              key: 1,
                              class: "text-sm text-gray-400"
                            }, " -- "))
                          ])
                        ]);
                      }), 128))
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UCard, { class: "flex flex-col h-full" }, {
                header: withCtx(() => [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("h2", { class: "text-xl font-semibold text-gray-900 dark:text-white" }, " Shopping Cart (" + toDisplayString(unref(cartItemsCount)) + ") ", 1),
                    createVNode(_component_UButton, {
                      color: "secondary",
                      variant: "ghost",
                      icon: "i-heroicons-x-mark",
                      onClick: ($event) => localCartOpen.value = false
                    }, null, 8, ["onClick"])
                  ])
                ]),
                footer: withCtx(() => [
                  unref(cartItems) && unref(cartItems).length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-4"
                  }, [
                    unref(appliedDiscounts) && unref(appliedDiscounts).length > 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-2 pb-3 border-b border-gray-200 dark:border-gray-700"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(appliedDiscounts), (discount) => {
                        return openBlock(), createBlock("div", {
                          key: discount.name,
                          class: "flex items-start gap-2"
                        }, [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-tag",
                            class: "text-green-500 mt-0.5"
                          }),
                          createVNode("div", { class: "flex-1 min-w-0" }, [
                            createVNode("p", { class: "text-xs font-medium text-green-600 dark:text-green-400" }, toDisplayString(discount.name), 1),
                            createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400" }, toDisplayString(discount.summary) + " • " + toDisplayString(discount.items_affected) + " " + toDisplayString(discount.items_affected === 1 ? "item" : "items"), 1)
                          ]),
                          createVNode("span", { class: "text-xs font-semibold text-green-600 dark:text-green-400" }, "-$" + toDisplayString(discount.discount_amount?.toFixed(2)), 1)
                        ]);
                      }), 128))
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "space-y-2" }, [
                      unref(cartDiscount) > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex justify-between text-sm text-gray-500 dark:text-gray-400"
                      }, [
                        createVNode("span", null, "Subtotal:"),
                        createVNode("span", { class: "line-through" }, "$" + toDisplayString(unref(cartOriginalTotal)?.toFixed(2)), 1)
                      ])) : createCommentVNode("", true),
                      unref(cartSavings) > 0 ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex justify-between text-sm text-green-600 dark:text-green-400"
                      }, [
                        createVNode("span", null, "Savings:"),
                        createVNode("span", null, "-$" + toDisplayString(unref(cartSavings)?.toFixed(2)), 1)
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "flex justify-between items-center text-lg font-semibold pt-2 border-t border-gray-200 dark:border-gray-700" }, [
                        createVNode("span", { class: "text-gray-900 dark:text-white" }, "Total:"),
                        createVNode("span", { class: "text-primary-500" }, "$" + toDisplayString(unref(cartTotal)?.toFixed(2)), 1)
                      ])
                    ]),
                    createVNode(_component_UButton, {
                      class: "w-full",
                      color: "success",
                      variant: "soft",
                      block: "",
                      as: "a",
                      href: "/cart",
                      ui: { base: "rounded-none" }
                    }, {
                      default: withCtx(() => [
                        createTextVNode("View Cart")
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode(_component_UButton, {
                        onClick: unref(clearCart),
                        color: "secondary",
                        variant: "soft",
                        block: "",
                        disabled: unref(isLoading),
                        ui: { base: "rounded-none" }
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Clear Cart ")
                        ]),
                        _: 1
                      }, 8, ["onClick", "disabled"]),
                      createVNode(_component_UButton, {
                        onClick: handleCheckout,
                        color: "primary",
                        block: "",
                        loading: unref(checkoutLoading),
                        disabled: unref(isLoading),
                        ui: { base: "rounded-none" }
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Checkout ")
                        ]),
                        _: 1
                      }, 8, ["loading", "disabled"])
                    ])
                  ])) : createCommentVNode("", true)
                ]),
                default: withCtx(() => [
                  unref(isLoading) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex items-center justify-center py-12"
                  }, [
                    createVNode("div", { class: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" })
                  ])) : !unref(cartItems) || unref(cartItems).length === 0 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "flex flex-col items-center justify-center py-12 text-center"
                  }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-shopping-cart",
                      class: "text-6xl text-gray-300 mb-4"
                    }),
                    createVNode("h3", { class: "text-lg font-semibold text-gray-900 dark:text-white mb-2" }, "Your cart is empty"),
                    createVNode("p", { class: "text-gray-500 dark:text-gray-400 mb-6" }, "Add some products to get started"),
                    createVNode(_component_UButton, {
                      onClick: ($event) => localCartOpen.value = false,
                      to: "/shop"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Continue Shopping")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ])) : (openBlock(), createBlock("div", {
                    key: 2,
                    class: "space-y-4"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(cartItems), (item) => {
                      return openBlock(), createBlock("div", {
                        key: item.slug || item.productId,
                        class: "flex gap-4 rounded-lg"
                      }, [
                        createVNode(_component_NuxtLink, {
                          to: `/shop/product/${item.product?.slug || item.slug}`,
                          onClick: ($event) => localCartOpen.value = false
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_NuxtImg, {
                              src: item.variation?.images?.thumb || item.product?.image || "https://placehold.co/60x60",
                              alt: item.variation?.name || item.product?.name || "Product",
                              class: "w-20 h-20 object-cover",
                              width: "80",
                              height: "80",
                              loading: "lazy",
                              format: "webp"
                            }, null, 8, ["src", "alt"])
                          ]),
                          _: 2
                        }, 1032, ["to", "onClick"]),
                        createVNode("div", { class: "flex-1 min-w-0" }, [
                          createVNode(_component_NuxtLink, {
                            to: `/shop/product/${item.product?.slug || item.slug}`,
                            onClick: ($event) => localCartOpen.value = false,
                            class: "font-semibold text-gray-900 dark:text-white hover:text-primary-500 block truncate"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.product?.name || item.slug), 1)
                            ]),
                            _: 2
                          }, 1032, ["to", "onClick"]),
                          item.variation ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-xs text-gray-500 dark:text-gray-400 mt-1"
                          }, toDisplayString(item.variation.name), 1)) : createCommentVNode("", true),
                          item.variation?.price || item.product?.price ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "mb-2"
                          }, [
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode("span", { class: "text-sm font-semibold text-gray-900 dark:text-white" }, " $" + toDisplayString(getItemPrice(item).toFixed(2)), 1),
                              hasDiscount(item) ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "text-xs text-gray-400 line-through"
                              }, " $" + toDisplayString(getItemOriginalPrice(item).toFixed(2)), 1)) : createCommentVNode("", true)
                            ]),
                            item.discount ? (openBlock(), createBlock(_component_UBadge, {
                              key: 0,
                              color: "success",
                              variant: "soft",
                              size: "xs",
                              class: "mt-1"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.discount.summary), 1)
                              ]),
                              _: 2
                            }, 1024)) : createCommentVNode("", true)
                          ])) : (openBlock(), createBlock("p", {
                            key: 2,
                            class: "text-xs text-gray-400 mb-2 italic"
                          }, " Loading details... ")),
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(_component_UButton, {
                              onClick: ($event) => unref(updateCartItemQuantity)(item.product?.slug || item.slug, item.quantity - 1, item.variation_id),
                              icon: "i-lucide-minus",
                              size: "xs",
                              color: "secondary",
                              disabled: item.quantity <= 1 || unref(isLoading),
                              ui: { base: "rounded-none" }
                            }, null, 8, ["onClick", "disabled"]),
                            createVNode("span", { class: "text-sm font-medium w-8 text-center" }, toDisplayString(item.quantity), 1),
                            createVNode(_component_UButton, {
                              onClick: ($event) => unref(updateCartItemQuantity)(item.product?.slug || item.slug, item.quantity + 1, item.variation_id),
                              icon: "i-lucide-plus",
                              size: "xs",
                              color: "secondary",
                              disabled: unref(isLoading) || unref(checkMaxStock)(item),
                              ui: { base: "rounded-none" }
                            }, null, 8, ["onClick", "disabled"]),
                            createVNode(_component_UButton, {
                              onClick: ($event) => unref(removeFromCart)(item.product?.slug || item.slug, item.variation_id),
                              icon: "i-heroicons-trash",
                              size: "xs",
                              color: "error",
                              variant: "soft",
                              class: "ml-auto",
                              disabled: unref(isLoading),
                              ui: { base: "rounded-none" }
                            }, null, 8, ["onClick", "disabled"])
                          ]),
                          unref(checkMaxStock)(item) ? (openBlock(), createBlock("p", {
                            key: 3,
                            class: "text-xs text-orange-500 mt-1"
                          }, " Max stock reached ")) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "text-right" }, [
                          item.variation?.price || item.product?.price ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode("p", { class: "font-semibold text-gray-900 dark:text-white" }, " $" + toDisplayString(getItemTotal(item).toFixed(2)), 1),
                            hasDiscount(item) ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-xs text-gray-400 line-through"
                            }, " $" + toDisplayString(getItemOriginalTotal(item).toFixed(2)), 1)) : createCommentVNode("", true)
                          ])) : (openBlock(), createBlock("p", {
                            key: 1,
                            class: "text-sm text-gray-400"
                          }, " -- "))
                        ])
                      ]);
                    }), 128))
                  ]))
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              icon: "i-heroicons-shopping-cart",
              variant: "ghost"
            }, {
              trailing: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(cartItemsCount) > 0) {
                    _push3(ssrRenderComponent(_component_UBadge, { variant: "solid" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(unref(cartItemsCount))}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(unref(cartItemsCount)), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    unref(cartItemsCount) > 0 ? (openBlock(), createBlock(_component_UBadge, {
                      key: 0,
                      variant: "solid"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(cartItemsCount)), 1)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UButton, {
                icon: "i-heroicons-shopping-cart",
                variant: "ghost"
              }, {
                trailing: withCtx(() => [
                  unref(cartItemsCount) > 0 ? (openBlock(), createBlock(_component_UBadge, {
                    key: 0,
                    variant: "solid"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(cartItemsCount)), 1)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CartSidebar.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$6, { __name: "CartSidebar" });
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "Desktop",
  __ssrInlineRender: true,
  props: {
    items: Array
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = _sfc_main$e;
      const _component_UNavigationMenu = _sfc_main$a;
      const _component_CartSidebar = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "hidden md:block border-t border-gray-200" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UNavigationMenu, {
              items: __props.items,
              class: "w-full justify-center hidden md:inline-flex",
              ui: { list: "gap-x-5", link: "uppercase tracking-wide" }
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_CartSidebar, null, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex" }, [
                createVNode(_component_UNavigationMenu, {
                  items: __props.items,
                  class: "w-full justify-center hidden md:inline-flex",
                  ui: { list: "gap-x-5", link: "uppercase tracking-wide" }
                }, null, 8, ["items"]),
                createVNode(_component_CartSidebar)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Header/Desktop.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_9 = Object.assign(_sfc_main$5, { __name: "HeaderDesktop" });
const useColorMode = () => {
  return useState("color-mode").value;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "AppHeader",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const colorMode = useColorMode();
    const router = useRouter();
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiBase;
    const { fetchCategories } = useContent();
    const searchQuery = ref("");
    const showResults = ref(false);
    const isSearching = ref(false);
    const searchResults = ref([]);
    let searchTimeout = null;
    const searchQueryMobile = ref("");
    const showMobileSearch = ref(false);
    const isSearchingMobile = ref(false);
    const searchResultsMobile = ref([]);
    let searchTimeoutMobile = null;
    const isDark = computed(() => colorMode.value === "dark");
    const toggleColorMode = () => {
      colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
    };
    const performGlobalSearch = async (query) => {
      try {
        const response = await $fetch(`${apiUrl}products`, {
          query: { search: query }
        });
        if (response?.data && Array.isArray(response.data)) {
          return response.data.slice(0, 8);
        }
        return [];
      } catch (error) {
        console.error("Search error:", error);
        return [];
      }
    };
    watch(searchQuery, async (newQuery) => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
      if (!newQuery || newQuery.trim().length < 2) {
        searchResults.value = [];
        isSearching.value = false;
        return;
      }
      isSearching.value = true;
      searchTimeout = setTimeout(async () => {
        try {
          searchResults.value = await performGlobalSearch(newQuery.trim());
        } catch (error) {
          console.error("Search error:", error);
          searchResults.value = [];
        } finally {
          isSearching.value = false;
        }
      }, 300);
    });
    watch(searchQueryMobile, async (newQuery) => {
      if (searchTimeoutMobile) {
        clearTimeout(searchTimeoutMobile);
      }
      if (!newQuery || newQuery.trim().length < 2) {
        searchResultsMobile.value = [];
        isSearchingMobile.value = false;
        return;
      }
      isSearchingMobile.value = true;
      searchTimeoutMobile = setTimeout(async () => {
        try {
          searchResultsMobile.value = await performGlobalSearch(newQuery.trim());
        } catch (error) {
          console.error("Search error:", error);
          searchResultsMobile.value = [];
        } finally {
          isSearchingMobile.value = false;
        }
      }, 300);
    });
    const handleProductSelect = (productSlug) => {
      if (productSlug) {
        router.push(`/shop/product/${productSlug}`);
        showMobileSearch.value = false;
        showResults.value = false;
        searchQuery.value = "";
        searchQueryMobile.value = "";
        searchResults.value = [];
        searchResultsMobile.value = [];
      }
    };
    const formatPrice = (price) => {
      if (!price) return "";
      const numPrice = typeof price === "string" ? parseFloat(price) : price;
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      }).format(numPrice);
    };
    const [categoryItems] = ([__temp, __restore] = withAsyncContext(() => Promise.all([
      fetchCategories()
    ])), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = _sfc_main$e;
      const _component_MobileGlobalCategoryMenu = __nuxt_component_1$1;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_AppLogo = __nuxt_component_3;
      const _component_UInput = _sfc_main$f;
      const _component_UIcon = _sfc_main$e$1;
      const _component_UAvatar = _sfc_main$b$1;
      const _component_UButton = _sfc_main$8$1;
      const _component_UserMenu = __nuxt_component_8;
      const _component_HeaderDesktop = __nuxt_component_9;
      const _component_UModal = _sfc_main$g;
      const _component_UCard = _sfc_main$h;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "relative z-50 bg-white dark:bg-gray-950/75 backdrop-blur-md border-b border-gray-200 dark:border-gray-800" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between h-13 md:h-16"${_scopeId}><div class="md:hidden"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_MobileGlobalCategoryMenu, { items: unref(categoryItems) }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center space-x-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/",
              class: "flex items-center space-x-3 hover:opacity-80 transition-opacity"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_AppLogo, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_AppLogo)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="hidden md:flex flex-1 max-w-2xl mx-8 relative"${_scopeId}><div class="relative w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: unref(searchQuery),
              "onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
              placeholder: "Search products...",
              icon: "i-heroicons-magnifying-glass",
              size: "lg",
              color: "neutral",
              class: "w-full",
              ui: {
                wrapper: "rounded-full",
                base: "rounded-full",
                input: "rounded-full"
              },
              onFocus: ($event) => showResults.value = true
            }, null, _parent2, _scopeId));
            if (unref(showResults) && (unref(searchQuery).length >= 2 || unref(isSearching))) {
              _push2(`<div class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 max-h-96 overflow-y-auto z-50"${_scopeId}>`);
              if (unref(isSearching)) {
                _push2(`<div class="p-4 text-center"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-arrow-path",
                  class: "w-6 h-6 animate-spin text-primary-500 mx-auto"
                }, null, _parent2, _scopeId));
                _push2(`<p class="text-sm text-gray-500 dark:text-gray-400 mt-2"${_scopeId}>Searching...</p></div>`);
              } else if (unref(searchResults).length > 0) {
                _push2(`<div class="py-2"${_scopeId}><!--[-->`);
                ssrRenderList(unref(searchResults), (product) => {
                  _push2(`<button class="w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left flex items-center gap-3"${_scopeId}>`);
                  if (product.image) {
                    _push2(ssrRenderComponent(_component_UAvatar, {
                      src: product.image,
                      alt: product.name,
                      size: "md"
                    }, null, _parent2, _scopeId));
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<div class="flex-1 min-w-0"${_scopeId}><p class="text-sm font-medium text-gray-900 dark:text-white truncate"${_scopeId}>${ssrInterpolate(product.name)}</p><div class="flex items-center gap-2 mt-1"${_scopeId}><p class="text-xs font-semibold text-primary-600 dark:text-primary-400"${_scopeId}>${ssrInterpolate(formatPrice(product.price))}</p>`);
                  if (product.compare_price) {
                    _push2(`<p class="text-xs line-through text-gray-400"${_scopeId}>${ssrInterpolate(formatPrice(product.compare_price))}</p>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div></div>`);
                  _push2(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-chevron-right",
                    class: "w-4 h-4 text-gray-400 shrink-0"
                  }, null, _parent2, _scopeId));
                  _push2(`</button>`);
                });
                _push2(`<!--]--></div>`);
              } else if (unref(searchQuery).length >= 2) {
                _push2(`<div class="text-center py-8"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-magnifying-glass",
                  class: "w-10 h-10 text-gray-300 dark:text-gray-700 mx-auto mb-2"
                }, null, _parent2, _scopeId));
                _push2(`<p class="text-sm text-gray-900 dark:text-white font-medium"${_scopeId}>No products found</p><p class="text-xs text-gray-500 dark:text-gray-400 mt-1"${_scopeId}> Try searching with different keywords </p></div>`);
              } else {
                _push2(`<div class="text-center py-6 text-xs text-gray-500 dark:text-gray-400"${_scopeId}> Type at least 2 characters to search... </div>`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              icon: "i-heroicons-magnifying-glass",
              color: "neutral",
              variant: "ghost",
              size: "sm",
              class: "md:hidden",
              onClick: ($event) => showMobileSearch.value = true
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              icon: unref(isDark) ? "i-heroicons-sun" : "i-heroicons-moon",
              color: "neutral",
              variant: "ghost",
              size: "sm",
              onClick: toggleColorMode
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UserMenu, null, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between h-13 md:h-16" }, [
                createVNode("div", { class: "md:hidden" }, [
                  createVNode(_component_MobileGlobalCategoryMenu, { items: unref(categoryItems) }, null, 8, ["items"])
                ]),
                createVNode("div", { class: "flex items-center space-x-4" }, [
                  createVNode(_component_NuxtLink, {
                    to: "/",
                    class: "flex items-center space-x-3 hover:opacity-80 transition-opacity"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_AppLogo)
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "hidden md:flex flex-1 max-w-2xl mx-8 relative" }, [
                  createVNode("div", { class: "relative w-full" }, [
                    createVNode(_component_UInput, {
                      modelValue: unref(searchQuery),
                      "onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
                      placeholder: "Search products...",
                      icon: "i-heroicons-magnifying-glass",
                      size: "lg",
                      color: "neutral",
                      class: "w-full",
                      ui: {
                        wrapper: "rounded-full",
                        base: "rounded-full",
                        input: "rounded-full"
                      },
                      onFocus: ($event) => showResults.value = true
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "onFocus"]),
                    unref(showResults) && (unref(searchQuery).length >= 2 || unref(isSearching)) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 max-h-96 overflow-y-auto z-50"
                    }, [
                      unref(isSearching) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "p-4 text-center"
                      }, [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-arrow-path",
                          class: "w-6 h-6 animate-spin text-primary-500 mx-auto"
                        }),
                        createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400 mt-2" }, "Searching...")
                      ])) : unref(searchResults).length > 0 ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "py-2"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(searchResults), (product) => {
                          return openBlock(), createBlock("button", {
                            key: product.id,
                            class: "w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left flex items-center gap-3",
                            onClick: ($event) => handleProductSelect(product.slug)
                          }, [
                            product.image ? (openBlock(), createBlock(_component_UAvatar, {
                              key: 0,
                              src: product.image,
                              alt: product.name,
                              size: "md"
                            }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
                            createVNode("div", { class: "flex-1 min-w-0" }, [
                              createVNode("p", { class: "text-sm font-medium text-gray-900 dark:text-white truncate" }, toDisplayString(product.name), 1),
                              createVNode("div", { class: "flex items-center gap-2 mt-1" }, [
                                createVNode("p", { class: "text-xs font-semibold text-primary-600 dark:text-primary-400" }, toDisplayString(formatPrice(product.price)), 1),
                                product.compare_price ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "text-xs line-through text-gray-400"
                                }, toDisplayString(formatPrice(product.compare_price)), 1)) : createCommentVNode("", true)
                              ])
                            ]),
                            createVNode(_component_UIcon, {
                              name: "i-heroicons-chevron-right",
                              class: "w-4 h-4 text-gray-400 shrink-0"
                            })
                          ], 8, ["onClick"]);
                        }), 128))
                      ])) : unref(searchQuery).length >= 2 ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "text-center py-8"
                      }, [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-magnifying-glass",
                          class: "w-10 h-10 text-gray-300 dark:text-gray-700 mx-auto mb-2"
                        }),
                        createVNode("p", { class: "text-sm text-gray-900 dark:text-white font-medium" }, "No products found"),
                        createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400 mt-1" }, " Try searching with different keywords ")
                      ])) : (openBlock(), createBlock("div", {
                        key: 3,
                        class: "text-center py-6 text-xs text-gray-500 dark:text-gray-400"
                      }, " Type at least 2 characters to search... "))
                    ])) : createCommentVNode("", true)
                  ])
                ]),
                createVNode("div", { class: "flex items-center" }, [
                  createVNode(_component_UButton, {
                    icon: "i-heroicons-magnifying-glass",
                    color: "neutral",
                    variant: "ghost",
                    size: "sm",
                    class: "md:hidden",
                    onClick: ($event) => showMobileSearch.value = true
                  }, null, 8, ["onClick"]),
                  createVNode(_component_UButton, {
                    icon: unref(isDark) ? "i-heroicons-sun" : "i-heroicons-moon",
                    color: "neutral",
                    variant: "ghost",
                    size: "sm",
                    onClick: toggleColorMode
                  }, null, 8, ["icon"]),
                  createVNode(_component_UserMenu)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_HeaderDesktop, { items: unref(categoryItems) }, null, _parent));
      _push(ssrRenderComponent(_component_UModal, {
        open: unref(showMobileSearch),
        "onUpdate:open": ($event) => isRef(showMobileSearch) ? showMobileSearch.value = $event : null
      }, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UCard, null, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center justify-between"${_scopeId2}><div class="flex items-center gap-3"${_scopeId2}><div class="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-magnifying-glass",
                    class: "text-primary-600 dark:text-primary-400 text-xl"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}><h3 class="text-lg font-semibold text-gray-900 dark:text-white"${_scopeId2}>Search Products</h3><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId2}>Find what you&#39;re looking for</p></div></div>`);
                  _push3(ssrRenderComponent(_component_UButton, {
                    color: "secondary",
                    variant: "ghost",
                    icon: "i-heroicons-x-mark-20-solid",
                    size: "sm",
                    onClick: ($event) => showMobileSearch.value = false
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", { class: "flex items-center gap-3" }, [
                        createVNode("div", { class: "p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg" }, [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-magnifying-glass",
                            class: "text-primary-600 dark:text-primary-400 text-xl"
                          })
                        ]),
                        createVNode("div", null, [
                          createVNode("h3", { class: "text-lg font-semibold text-gray-900 dark:text-white" }, "Search Products"),
                          createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Find what you're looking for")
                        ])
                      ]),
                      createVNode(_component_UButton, {
                        color: "secondary",
                        variant: "ghost",
                        icon: "i-heroicons-x-mark-20-solid",
                        size: "sm",
                        onClick: ($event) => showMobileSearch.value = false
                      }, null, 8, ["onClick"])
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: unref(searchQueryMobile),
                    "onUpdate:modelValue": ($event) => isRef(searchQueryMobile) ? searchQueryMobile.value = $event : null,
                    class: "w-full",
                    placeholder: "Search products...",
                    icon: "i-heroicons-magnifying-glass",
                    size: "lg",
                    autofocus: "",
                    ui: {
                      wrapper: "w-full",
                      base: "w-full"
                    }
                  }, null, _parent3, _scopeId2));
                  if (unref(isSearchingMobile)) {
                    _push3(`<div class="flex flex-col items-center justify-center py-12"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-arrow-path",
                      class: "w-10 h-10 animate-spin text-primary-500 mb-3"
                    }, null, _parent3, _scopeId2));
                    _push3(`<p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId2}>Searching...</p></div>`);
                  } else if (unref(searchResultsMobile).length > 0) {
                    _push3(`<div class="space-y-2"${_scopeId2}><p class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide"${_scopeId2}>${ssrInterpolate(unref(searchResultsMobile).length)} Results </p><div class="space-y-2 max-h-96 overflow-y-auto"${_scopeId2}><!--[-->`);
                    ssrRenderList(unref(searchResultsMobile), (product) => {
                      _push3(`<button class="w-full p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors text-left flex items-center gap-3 border border-gray-200 dark:border-gray-700"${_scopeId2}>`);
                      if (product.image) {
                        _push3(ssrRenderComponent(_component_UAvatar, {
                          src: product.image,
                          alt: product.name,
                          size: "lg"
                        }, null, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`<div class="flex-1 min-w-0"${_scopeId2}><p class="font-medium text-gray-900 dark:text-white truncate"${_scopeId2}>${ssrInterpolate(product.name)}</p><div class="flex items-center gap-2 mt-1"${_scopeId2}><p class="text-sm font-semibold text-primary-600 dark:text-primary-400"${_scopeId2}>${ssrInterpolate(formatPrice(product.price))}</p>`);
                      if (product.compare_price) {
                        _push3(`<p class="text-sm line-through text-gray-400"${_scopeId2}>${ssrInterpolate(formatPrice(product.compare_price))}</p>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div></div>`);
                      _push3(ssrRenderComponent(_component_UIcon, {
                        name: "i-heroicons-chevron-right",
                        class: "w-5 h-5 text-gray-400 shrink-0"
                      }, null, _parent3, _scopeId2));
                      _push3(`</button>`);
                    });
                    _push3(`<!--]--></div></div>`);
                  } else if (unref(searchQueryMobile).length >= 2) {
                    _push3(`<div class="text-center py-12"${_scopeId2}><div class="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-magnifying-glass",
                      class: "w-8 h-8 text-gray-400"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><p class="text-gray-900 dark:text-white font-medium mb-1"${_scopeId2}>No products found</p><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId2}> Try searching with different keywords </p></div>`);
                  } else {
                    _push3(`<div class="text-center py-12"${_scopeId2}><div class="inline-flex items-center justify-center w-16 h-16 bg-primary-50 dark:bg-primary-900/20 rounded-full mb-4"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-sparkles",
                      class: "w-8 h-8 text-primary-600 dark:text-primary-400"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><p class="text-gray-900 dark:text-white font-medium mb-1"${_scopeId2}>Start searching</p><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId2}> Type at least 2 characters to search </p></div>`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode(_component_UInput, {
                        modelValue: unref(searchQueryMobile),
                        "onUpdate:modelValue": ($event) => isRef(searchQueryMobile) ? searchQueryMobile.value = $event : null,
                        class: "w-full",
                        placeholder: "Search products...",
                        icon: "i-heroicons-magnifying-glass",
                        size: "lg",
                        autofocus: "",
                        ui: {
                          wrapper: "w-full",
                          base: "w-full"
                        }
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      unref(isSearchingMobile) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex flex-col items-center justify-center py-12"
                      }, [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-arrow-path",
                          class: "w-10 h-10 animate-spin text-primary-500 mb-3"
                        }),
                        createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Searching...")
                      ])) : unref(searchResultsMobile).length > 0 ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "space-y-2"
                      }, [
                        createVNode("p", { class: "text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide" }, toDisplayString(unref(searchResultsMobile).length) + " Results ", 1),
                        createVNode("div", { class: "space-y-2 max-h-96 overflow-y-auto" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(searchResultsMobile), (product) => {
                            return openBlock(), createBlock("button", {
                              key: product.id,
                              class: "w-full p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors text-left flex items-center gap-3 border border-gray-200 dark:border-gray-700",
                              onClick: ($event) => handleProductSelect(product.slug)
                            }, [
                              product.image ? (openBlock(), createBlock(_component_UAvatar, {
                                key: 0,
                                src: product.image,
                                alt: product.name,
                                size: "lg"
                              }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
                              createVNode("div", { class: "flex-1 min-w-0" }, [
                                createVNode("p", { class: "font-medium text-gray-900 dark:text-white truncate" }, toDisplayString(product.name), 1),
                                createVNode("div", { class: "flex items-center gap-2 mt-1" }, [
                                  createVNode("p", { class: "text-sm font-semibold text-primary-600 dark:text-primary-400" }, toDisplayString(formatPrice(product.price)), 1),
                                  product.compare_price ? (openBlock(), createBlock("p", {
                                    key: 0,
                                    class: "text-sm line-through text-gray-400"
                                  }, toDisplayString(formatPrice(product.compare_price)), 1)) : createCommentVNode("", true)
                                ])
                              ]),
                              createVNode(_component_UIcon, {
                                name: "i-heroicons-chevron-right",
                                class: "w-5 h-5 text-gray-400 shrink-0"
                              })
                            ], 8, ["onClick"]);
                          }), 128))
                        ])
                      ])) : unref(searchQueryMobile).length >= 2 ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "text-center py-12"
                      }, [
                        createVNode("div", { class: "inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4" }, [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-magnifying-glass",
                            class: "w-8 h-8 text-gray-400"
                          })
                        ]),
                        createVNode("p", { class: "text-gray-900 dark:text-white font-medium mb-1" }, "No products found"),
                        createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, " Try searching with different keywords ")
                      ])) : (openBlock(), createBlock("div", {
                        key: 3,
                        class: "text-center py-12"
                      }, [
                        createVNode("div", { class: "inline-flex items-center justify-center w-16 h-16 bg-primary-50 dark:bg-primary-900/20 rounded-full mb-4" }, [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-sparkles",
                            class: "w-8 h-8 text-primary-600 dark:text-primary-400"
                          })
                        ]),
                        createVNode("p", { class: "text-gray-900 dark:text-white font-medium mb-1" }, "Start searching"),
                        createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, " Type at least 2 characters to search ")
                      ]))
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UCard, null, {
                header: withCtx(() => [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("div", { class: "flex items-center gap-3" }, [
                      createVNode("div", { class: "p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg" }, [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-magnifying-glass",
                          class: "text-primary-600 dark:text-primary-400 text-xl"
                        })
                      ]),
                      createVNode("div", null, [
                        createVNode("h3", { class: "text-lg font-semibold text-gray-900 dark:text-white" }, "Search Products"),
                        createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Find what you're looking for")
                      ])
                    ]),
                    createVNode(_component_UButton, {
                      color: "secondary",
                      variant: "ghost",
                      icon: "i-heroicons-x-mark-20-solid",
                      size: "sm",
                      onClick: ($event) => showMobileSearch.value = false
                    }, null, 8, ["onClick"])
                  ])
                ]),
                default: withCtx(() => [
                  createVNode("div", { class: "space-y-4" }, [
                    createVNode(_component_UInput, {
                      modelValue: unref(searchQueryMobile),
                      "onUpdate:modelValue": ($event) => isRef(searchQueryMobile) ? searchQueryMobile.value = $event : null,
                      class: "w-full",
                      placeholder: "Search products...",
                      icon: "i-heroicons-magnifying-glass",
                      size: "lg",
                      autofocus: "",
                      ui: {
                        wrapper: "w-full",
                        base: "w-full"
                      }
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    unref(isSearchingMobile) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex flex-col items-center justify-center py-12"
                    }, [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-arrow-path",
                        class: "w-10 h-10 animate-spin text-primary-500 mb-3"
                      }),
                      createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Searching...")
                    ])) : unref(searchResultsMobile).length > 0 ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "space-y-2"
                    }, [
                      createVNode("p", { class: "text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide" }, toDisplayString(unref(searchResultsMobile).length) + " Results ", 1),
                      createVNode("div", { class: "space-y-2 max-h-96 overflow-y-auto" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(searchResultsMobile), (product) => {
                          return openBlock(), createBlock("button", {
                            key: product.id,
                            class: "w-full p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors text-left flex items-center gap-3 border border-gray-200 dark:border-gray-700",
                            onClick: ($event) => handleProductSelect(product.slug)
                          }, [
                            product.image ? (openBlock(), createBlock(_component_UAvatar, {
                              key: 0,
                              src: product.image,
                              alt: product.name,
                              size: "lg"
                            }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
                            createVNode("div", { class: "flex-1 min-w-0" }, [
                              createVNode("p", { class: "font-medium text-gray-900 dark:text-white truncate" }, toDisplayString(product.name), 1),
                              createVNode("div", { class: "flex items-center gap-2 mt-1" }, [
                                createVNode("p", { class: "text-sm font-semibold text-primary-600 dark:text-primary-400" }, toDisplayString(formatPrice(product.price)), 1),
                                product.compare_price ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "text-sm line-through text-gray-400"
                                }, toDisplayString(formatPrice(product.compare_price)), 1)) : createCommentVNode("", true)
                              ])
                            ]),
                            createVNode(_component_UIcon, {
                              name: "i-heroicons-chevron-right",
                              class: "w-5 h-5 text-gray-400 shrink-0"
                            })
                          ], 8, ["onClick"]);
                        }), 128))
                      ])
                    ])) : unref(searchQueryMobile).length >= 2 ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: "text-center py-12"
                    }, [
                      createVNode("div", { class: "inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-4" }, [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-magnifying-glass",
                          class: "w-8 h-8 text-gray-400"
                        })
                      ]),
                      createVNode("p", { class: "text-gray-900 dark:text-white font-medium mb-1" }, "No products found"),
                      createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, " Try searching with different keywords ")
                    ])) : (openBlock(), createBlock("div", {
                      key: 3,
                      class: "text-center py-12"
                    }, [
                      createVNode("div", { class: "inline-flex items-center justify-center w-16 h-16 bg-primary-50 dark:bg-primary-900/20 rounded-full mb-4" }, [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-sparkles",
                          class: "w-8 h-8 text-primary-600 dark:text-primary-400"
                        })
                      ]),
                      createVNode("p", { class: "text-gray-900 dark:text-white font-medium mb-1" }, "Start searching"),
                      createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, " Type at least 2 characters to search ")
                    ]))
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</header>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppHeader.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$4, { __name: "AppHeader" });
const useNewsletter = () => {
  const loading = ref(false);
  const error = ref(null);
  const success = ref(false);
  const subscribe = async (email, name) => {
    loading.value = true;
    error.value = null;
    success.value = false;
    try {
      const response = await $fetch("/api/newsletter/subscribe", {
        method: "POST",
        body: {
          email,
          name
        }
      });
      success.value = true;
      return response;
    } catch (e) {
      error.value = e.data?.message || e.message || "Subscription failed";
      throw e;
    } finally {
      loading.value = false;
    }
  };
  const verify = async (token) => {
    try {
      return await $fetch(`/api/newsletter/verify/${token}`);
    } catch (e) {
      throw e;
    }
  };
  const unsubscribe = async (token) => {
    try {
      return await $fetch(`/api/newsletter/unsubscribe/${token}`, {
        method: "POST"
      });
    } catch (e) {
      throw e;
    }
  };
  return {
    loading,
    error,
    success,
    subscribe,
    verify,
    unsubscribe
  };
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "NewsletterForm",
  __ssrInlineRender: true,
  emits: ["success"],
  setup(__props, { emit: __emit }) {
    const { subscribe, loading, error, success } = useNewsletter();
    const state = reactive({
      email: "",
      name: ""
    });
    const emit = __emit;
    const onSubmit = async () => {
      try {
        await subscribe(state.email, state.name);
        emit("success");
        state.email = "";
        state.name = "";
      } catch (e) {
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UForm = _sfc_main$i;
      const _component_UFormField = _sfc_main$j;
      const _component_UInput = _sfc_main$f;
      const _component_UAlert = _sfc_main$k;
      const _component_UButton = _sfc_main$8$1;
      _push(ssrRenderComponent(_component_UForm, mergeProps({
        state: unref(state),
        onSubmit,
        class: "space-y-4"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UFormField, {
              label: "Email",
              name: "email",
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: unref(state).email,
                    "onUpdate:modelValue": ($event) => unref(state).email = $event,
                    type: "email",
                    placeholder: "your@email.com",
                    disabled: unref(loading),
                    class: "w-full",
                    size: "lg"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: unref(state).email,
                      "onUpdate:modelValue": ($event) => unref(state).email = $event,
                      type: "email",
                      placeholder: "your@email.com",
                      disabled: unref(loading),
                      class: "w-full",
                      size: "lg"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (unref(error)) {
              _push2(ssrRenderComponent(_component_UAlert, {
                color: "error",
                variant: "soft",
                title: unref(error),
                "close-button": { icon: "i-heroicons-x-mark-20-solid" },
                onClose: ($event) => error.value = null
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (unref(success)) {
              _push2(ssrRenderComponent(_component_UAlert, {
                color: "success",
                variant: "soft",
                title: "Success!",
                description: "Please check your email to confirm your subscription."
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_UButton, {
              type: "submit",
              loading: unref(loading),
              disabled: unref(success),
              block: "",
              size: "lg"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(success) ? "Subscribed!" : "Subscribe to Newsletter")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(success) ? "Subscribed!" : "Subscribe to Newsletter"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UFormField, {
                label: "Email",
                name: "email",
                required: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_UInput, {
                    modelValue: unref(state).email,
                    "onUpdate:modelValue": ($event) => unref(state).email = $event,
                    type: "email",
                    placeholder: "your@email.com",
                    disabled: unref(loading),
                    class: "w-full",
                    size: "lg"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                ]),
                _: 1
              }),
              unref(error) ? (openBlock(), createBlock(_component_UAlert, {
                key: 0,
                color: "error",
                variant: "soft",
                title: unref(error),
                "close-button": { icon: "i-heroicons-x-mark-20-solid" },
                onClose: ($event) => error.value = null
              }, null, 8, ["title", "onClose"])) : createCommentVNode("", true),
              unref(success) ? (openBlock(), createBlock(_component_UAlert, {
                key: 1,
                color: "success",
                variant: "soft",
                title: "Success!",
                description: "Please check your email to confirm your subscription."
              })) : createCommentVNode("", true),
              createVNode(_component_UButton, {
                type: "submit",
                loading: unref(loading),
                disabled: unref(success),
                block: "",
                size: "lg"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(success) ? "Subscribed!" : "Subscribe to Newsletter"), 1)
                ]),
                _: 1
              }, 8, ["loading", "disabled"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/NewsletterForm.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_4 = Object.assign(_sfc_main$3, { __name: "NewsletterForm" });
const _sfc_main$2 = {
  __name: "AppFooter",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { fetchFooterSettings } = useSettings();
    const { data: footer } = ([__temp, __restore] = withAsyncContext(() => fetchFooterSettings()), __temp = await __temp, __restore(), __temp);
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    ref("");
    ref(false);
    const toast = useToast();
    const handleNewsLetterSuccess = () => {
      toast.add({
        title: "Subscribed!",
        description: "Please check your email to confirm.",
        color: "success"
      });
    };
    const footerSections = [
      {
        title: "Product",
        links: [
          { name: "Shop", to: "/shop" },
          { name: "Pricing", to: "/" },
          { name: "Documentation", to: "/" },
          { name: "API Reference", to: "/" },
          { name: "Changelog", to: "/" }
        ]
      },
      {
        title: "Company",
        links: [
          { name: "About", to: "/" },
          { name: "Blog", to: "/blog" },
          { name: "Careers", to: "/" },
          { name: "Press Kit", to: "/" },
          { name: "Contact", to: "/contact" }
        ]
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = _sfc_main$e;
      const _component_UIcon = _sfc_main$e$1;
      const _component_SocialMediaLinks = __nuxt_component_2$1;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_NewsletterForm = __nuxt_component_4;
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-16"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"${_scopeId}><div class="space-y-4"${_scopeId}><div class="flex items-center space-x-3"${_scopeId}><div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-cube",
              class: "w-5 h-5 text-white"
            }, null, _parent2, _scopeId));
            _push2(`</div><span class="text-xl font-bold text-gray-900 dark:text-white"${_scopeId}>Herlan</span></div><p class="text-gray-600 dark:text-gray-400 text-sm max-w-xs"${_scopeId}> At Herlan Store, we are dedicated to providing a premium selection of skincare and makeup brands that stand out in both quality and authenticity. Every brand we carry is carefully chosen through a rigorous selection process. </p>`);
            if (unref(footer)?.show_social) {
              _push2(`<div class="space-y-4"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 dark:text-white"${_scopeId}> Follow Us </h3>`);
              _push2(ssrRenderComponent(_component_SocialMediaLinks, { "icon-size": "w-5 h-5" }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><!--[-->`);
            ssrRenderList(footerSections, (section) => {
              _push2(`<div class="space-y-4"${_scopeId}><h3 class="font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wider"${_scopeId}>${ssrInterpolate(section.title)}</h3><ul class="space-y-3"${_scopeId}><!--[-->`);
              ssrRenderList(section.links, (link) => {
                _push2(`<li${_scopeId}>`);
                _push2(ssrRenderComponent(_component_NuxtLink, {
                  to: link.to,
                  external: link.external,
                  target: link.external ? "_blank" : void 0,
                  class: "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors flex items-center"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(link.name)} `);
                      if (link.external) {
                        _push3(ssrRenderComponent(_component_UIcon, {
                          name: "i-heroicons-arrow-top-right-on-square",
                          class: "w-3 h-3 ml-1"
                        }, null, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                    } else {
                      return [
                        createTextVNode(toDisplayString(link.name) + " ", 1),
                        link.external ? (openBlock(), createBlock(_component_UIcon, {
                          key: 0,
                          name: "i-heroicons-arrow-top-right-on-square",
                          class: "w-3 h-3 ml-1"
                        })) : createCommentVNode("", true)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</li>`);
              });
              _push2(`<!--]--></ul></div>`);
            });
            _push2(`<!--]--><div class="space-y-4"${_scopeId}><h3 class="font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wider"${_scopeId}> Get Something Beautiful </h3>`);
            _push2(ssrRenderComponent(_component_NewsletterForm, { onSuccess: handleNewsLetterSuccess }, null, _parent2, _scopeId));
            _push2(`</div></div></div><div class="py-6 border-t border-gray-200 dark:border-gray-800"${_scopeId}><div class="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0"${_scopeId}><p class="text-gray-600 dark:text-gray-400 text-sm"${_scopeId}>${ssrInterpolate(unref(footer)?.copyright || `© ${unref(currentYear)} All rights reserved.`)}</p><div class="flex items-center space-x-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/",
              class: "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Privacy Policy `);
                } else {
                  return [
                    createTextVNode(" Privacy Policy ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/",
              class: "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Terms of Service `);
                } else {
                  return [
                    createTextVNode(" Terms of Service ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/",
              class: "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Cookies `);
                } else {
                  return [
                    createTextVNode(" Cookies ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-16" }, [
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" }, [
                  createVNode("div", { class: "space-y-4" }, [
                    createVNode("div", { class: "flex items-center space-x-3" }, [
                      createVNode("div", { class: "w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center" }, [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-cube",
                          class: "w-5 h-5 text-white"
                        })
                      ]),
                      createVNode("span", { class: "text-xl font-bold text-gray-900 dark:text-white" }, "Herlan")
                    ]),
                    createVNode("p", { class: "text-gray-600 dark:text-gray-400 text-sm max-w-xs" }, " At Herlan Store, we are dedicated to providing a premium selection of skincare and makeup brands that stand out in both quality and authenticity. Every brand we carry is carefully chosen through a rigorous selection process. "),
                    unref(footer)?.show_social ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-4"
                    }, [
                      createVNode("h3", { class: "text-lg font-semibold text-gray-900 dark:text-white" }, " Follow Us "),
                      createVNode(_component_SocialMediaLinks, { "icon-size": "w-5 h-5" })
                    ])) : createCommentVNode("", true)
                  ]),
                  (openBlock(), createBlock(Fragment, null, renderList(footerSections, (section) => {
                    return createVNode("div", {
                      key: section.title,
                      class: "space-y-4"
                    }, [
                      createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wider" }, toDisplayString(section.title), 1),
                      createVNode("ul", { class: "space-y-3" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(section.links, (link) => {
                          return openBlock(), createBlock("li", {
                            key: link.name
                          }, [
                            createVNode(_component_NuxtLink, {
                              to: link.to,
                              external: link.external,
                              target: link.external ? "_blank" : void 0,
                              class: "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors flex items-center"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(link.name) + " ", 1),
                                link.external ? (openBlock(), createBlock(_component_UIcon, {
                                  key: 0,
                                  name: "i-heroicons-arrow-top-right-on-square",
                                  class: "w-3 h-3 ml-1"
                                })) : createCommentVNode("", true)
                              ]),
                              _: 2
                            }, 1032, ["to", "external", "target"])
                          ]);
                        }), 128))
                      ])
                    ]);
                  }), 64)),
                  createVNode("div", { class: "space-y-4" }, [
                    createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wider" }, " Get Something Beautiful "),
                    createVNode(_component_NewsletterForm, { onSuccess: handleNewsLetterSuccess })
                  ])
                ])
              ]),
              createVNode("div", { class: "py-6 border-t border-gray-200 dark:border-gray-800" }, [
                createVNode("div", { class: "flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0" }, [
                  createVNode("p", { class: "text-gray-600 dark:text-gray-400 text-sm" }, toDisplayString(unref(footer)?.copyright || `© ${unref(currentYear)} All rights reserved.`), 1),
                  createVNode("div", { class: "flex items-center space-x-6" }, [
                    createVNode(_component_NuxtLink, {
                      to: "/",
                      class: "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Privacy Policy ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_NuxtLink, {
                      to: "/",
                      class: "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Terms of Service ")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_NuxtLink, {
                      to: "/",
                      class: "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Cookies ")
                      ]),
                      _: 1
                    })
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</footer>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppFooter.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "Mobilebottomnav",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute$1();
    const showCategories = ref(false);
    const expandedCategory = ref(null);
    ref(3);
    const currentRoute = computed(() => route.path);
    const categories = ref([
      {
        id: 1,
        name: "Electronics",
        icon: "📱",
        subcategories: [
          { id: 11, name: "Smartphones", link: "/shop/electronics/smartphones" },
          { id: 12, name: "Laptops", link: "/shop/electronics/laptops" },
          { id: 13, name: "Tablets", link: "/shop/electronics/tablets" },
          { id: 14, name: "Accessories", link: "/shop/electronics/accessories" }
        ]
      },
      {
        id: 2,
        name: "Fashion",
        icon: "👕",
        subcategories: [
          { id: 21, name: "Men's Clothing", link: "/shop/fashion/men" },
          { id: 22, name: "Women's Clothing", link: "/shop/fashion/women" },
          { id: 23, name: "Kids' Clothing", link: "/shop/fashion/kids" },
          { id: 24, name: "Shoes", link: "/shop/fashion/shoes" }
        ]
      },
      {
        id: 3,
        name: "Home & Living",
        icon: "🏠",
        subcategories: [
          { id: 31, name: "Furniture", link: "/shop/home/furniture" },
          { id: 32, name: "Decor", link: "/shop/home/decor" },
          { id: 33, name: "Kitchen", link: "/shop/home/kitchen" },
          { id: 34, name: "Bedding", link: "/shop/home/bedding" }
        ]
      },
      {
        id: 4,
        name: "Sports & Outdoors",
        icon: "⚽",
        subcategories: [
          { id: 41, name: "Fitness Equipment", link: "/shop/sports/fitness" },
          { id: 42, name: "Outdoor Gear", link: "/shop/sports/outdoor" },
          { id: 43, name: "Team Sports", link: "/shop/sports/team" },
          { id: 44, name: "Activewear", link: "/shop/sports/activewear" }
        ]
      },
      {
        id: 5,
        name: "Beauty & Health",
        icon: "💄",
        subcategories: [
          { id: 51, name: "Skincare", link: "/shop/beauty/skincare" },
          { id: 52, name: "Makeup", link: "/shop/beauty/makeup" },
          { id: 53, name: "Haircare", link: "/shop/beauty/haircare" },
          { id: 54, name: "Wellness", link: "/shop/beauty/wellness" }
        ]
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_CartSidebar = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mobile-nav-wrapper" }, _attrs))} data-v-e1614363>`);
      if (showCategories.value) {
        _push(`<div class="categories-overlay" data-v-e1614363><div class="categories-panel" data-v-e1614363><div class="categories-header" data-v-e1614363><h3 data-v-e1614363>Categories</h3><button class="close-btn" data-v-e1614363><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-e1614363><line x1="18" y1="6" x2="6" y2="18" data-v-e1614363></line><line x1="6" y1="6" x2="18" y2="18" data-v-e1614363></line></svg></button></div><div class="categories-content" data-v-e1614363><!--[-->`);
        ssrRenderList(categories.value, (category) => {
          _push(`<div class="category-group" data-v-e1614363><div class="category-main" data-v-e1614363><span class="category-icon" data-v-e1614363>${ssrInterpolate(category.icon)}</span><span class="category-name" data-v-e1614363>${ssrInterpolate(category.name)}</span><svg class="${ssrRenderClass([{ "rotated": expandedCategory.value === category.id }, "chevron"])}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-e1614363><polyline points="6 9 12 15 18 9" data-v-e1614363></polyline></svg></div>`);
          if (expandedCategory.value === category.id) {
            _push(`<div class="subcategories" data-v-e1614363><!--[-->`);
            ssrRenderList(category.subcategories, (sub) => {
              _push(ssrRenderComponent(_component_NuxtLink, {
                key: sub.id,
                to: sub.link,
                class: "subcategory-item",
                onClick: ($event) => showCategories.value = false
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(sub.name)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(sub.name), 1)
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
          _push(`</div>`);
        });
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<nav class="bottom-nav" data-v-e1614363>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: ["nav-item", { active: currentRoute.value === "/" }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-e1614363${_scopeId}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" data-v-e1614363${_scopeId}></path><polyline points="9 22 9 12 15 12 15 22" data-v-e1614363${_scopeId}></polyline></svg><span data-v-e1614363${_scopeId}>Home</span>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                createVNode("path", { d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }),
                createVNode("polyline", { points: "9 22 9 12 15 12 15 22" })
              ])),
              createVNode("span", null, "Home")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="${ssrRenderClass([{ active: showCategories.value }, "nav-item"])}" data-v-e1614363><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-e1614363><rect x="3" y="3" width="7" height="7" data-v-e1614363></rect><rect x="14" y="3" width="7" height="7" data-v-e1614363></rect><rect x="14" y="14" width="7" height="7" data-v-e1614363></rect><rect x="3" y="14" width="7" height="7" data-v-e1614363></rect></svg><span data-v-e1614363>Shop</span></button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: ["nav-item", { active: currentRoute.value === "/cart" }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_CartSidebar, null, null, _parent2, _scopeId));
            _push2(`<span data-v-e1614363${_scopeId}>Cart</span>`);
          } else {
            return [
              createVNode(_component_CartSidebar),
              createVNode("span", null, "Cart")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/account",
        class: ["nav-item", { active: currentRoute.value === "/account" }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-e1614363${_scopeId}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" data-v-e1614363${_scopeId}></path><circle cx="12" cy="7" r="4" data-v-e1614363${_scopeId}></circle></svg><span data-v-e1614363${_scopeId}>Account</span>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                width: "24",
                height: "24",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                createVNode("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }),
                createVNode("circle", {
                  cx: "12",
                  cy: "7",
                  r: "4"
                })
              ])),
              createVNode("span", null, "Account")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Mobilebottomnav.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-e1614363"]]);
const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    useColorMode();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppHeader = __nuxt_component_0;
      const _component_AppFooter = _sfc_main$2;
      const _component_Mobilebottomnav = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
      _push(`<main class="flex-1">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
      _push(ssrRenderComponent(_component_AppFooter, null, null, _parent));
      _push(ssrRenderComponent(_component_Mobilebottomnav, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-BI7cJY7k.mjs.map
