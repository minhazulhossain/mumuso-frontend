import { _ as _sfc_main$1 } from './Container-DJ2zbRf-.mjs';
import { _ as _sfc_main$2 } from './Card-D31Cx9o-.mjs';
import { x as useRoute, c as useSEO, d as _sfc_main$e, e as _sfc_main$8 } from './server.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, createTextVNode, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "cancelled",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    const transactionId = ref(null);
    useSEO({
      title: "Payment Cancelled",
      description: "Payment process was cancelled"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = _sfc_main$1;
      const _component_UCard = _sfc_main$2;
      const _component_UIcon = _sfc_main$e;
      const _component_UButton = _sfc_main$8;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-2xl mx-auto"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UCard, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-center py-12"${_scopeId2}><div class="w-20 h-20 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-6 mx-auto"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-exclamation-circle",
                    class: "text-6xl text-orange-600 dark:text-orange-400"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2"${_scopeId2}> Payment Cancelled </h1><p class="text-gray-600 dark:text-gray-400 mb-8"${_scopeId2}> You have cancelled the payment process </p>`);
                  if (unref(transactionId)) {
                    _push3(`<div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-8"${_scopeId2}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId2}>Transaction ID</p><p class="font-medium text-gray-900 dark:text-white"${_scopeId2}>${ssrInterpolate(unref(transactionId))}</p></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8 text-left"${_scopeId2}><div class="flex items-start gap-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-information-circle",
                    class: "text-blue-600 dark:text-blue-400 text-xl shrink-0 mt-0.5"
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="text-sm text-blue-800 dark:text-blue-200"${_scopeId2}><p class="font-medium mb-2"${_scopeId2}>Don&#39;t worry!</p><ul class="list-disc list-inside space-y-1"${_scopeId2}><li${_scopeId2}>No charges have been made to your account</li><li${_scopeId2}>Your items are still in your cart</li><li${_scopeId2}>You can complete the payment whenever you&#39;re ready</li></ul></div></div></div><div class="flex flex-col sm:flex-row gap-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UButton, {
                    to: "/checkout",
                    size: "lg",
                    icon: "i-heroicons-arrow-path",
                    block: "",
                    class: "sm:flex-1"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Complete Payment `);
                      } else {
                        return [
                          createTextVNode(" Complete Payment ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UButton, {
                    to: "/cart",
                    size: "lg",
                    color: "secondary",
                    variant: "outline",
                    icon: "i-heroicons-shopping-cart",
                    block: "",
                    class: "sm:flex-1"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` View Cart `);
                      } else {
                        return [
                          createTextVNode(" View Cart ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UButton, {
                    to: "/shop",
                    size: "lg",
                    color: "secondary",
                    variant: "ghost",
                    icon: "i-heroicons-shopping-bag",
                    block: "",
                    class: "sm:flex-1"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Continue Shopping `);
                      } else {
                        return [
                          createTextVNode(" Continue Shopping ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "text-center py-12" }, [
                      createVNode("div", { class: "w-20 h-20 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-6 mx-auto" }, [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-exclamation-circle",
                          class: "text-6xl text-orange-600 dark:text-orange-400"
                        })
                      ]),
                      createVNode("h1", { class: "text-3xl font-bold text-gray-900 dark:text-white mb-2" }, " Payment Cancelled "),
                      createVNode("p", { class: "text-gray-600 dark:text-gray-400 mb-8" }, " You have cancelled the payment process "),
                      unref(transactionId) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-8"
                      }, [
                        createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Transaction ID"),
                        createVNode("p", { class: "font-medium text-gray-900 dark:text-white" }, toDisplayString(unref(transactionId)), 1)
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8 text-left" }, [
                        createVNode("div", { class: "flex items-start gap-3" }, [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-information-circle",
                            class: "text-blue-600 dark:text-blue-400 text-xl shrink-0 mt-0.5"
                          }),
                          createVNode("div", { class: "text-sm text-blue-800 dark:text-blue-200" }, [
                            createVNode("p", { class: "font-medium mb-2" }, "Don't worry!"),
                            createVNode("ul", { class: "list-disc list-inside space-y-1" }, [
                              createVNode("li", null, "No charges have been made to your account"),
                              createVNode("li", null, "Your items are still in your cart"),
                              createVNode("li", null, "You can complete the payment whenever you're ready")
                            ])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "flex flex-col sm:flex-row gap-3" }, [
                        createVNode(_component_UButton, {
                          to: "/checkout",
                          size: "lg",
                          icon: "i-heroicons-arrow-path",
                          block: "",
                          class: "sm:flex-1"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Complete Payment ")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UButton, {
                          to: "/cart",
                          size: "lg",
                          color: "secondary",
                          variant: "outline",
                          icon: "i-heroicons-shopping-cart",
                          block: "",
                          class: "sm:flex-1"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" View Cart ")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UButton, {
                          to: "/shop",
                          size: "lg",
                          color: "secondary",
                          variant: "ghost",
                          icon: "i-heroicons-shopping-bag",
                          block: "",
                          class: "sm:flex-1"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Continue Shopping ")
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "max-w-2xl mx-auto" }, [
                createVNode(_component_UCard, null, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-center py-12" }, [
                      createVNode("div", { class: "w-20 h-20 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-6 mx-auto" }, [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-exclamation-circle",
                          class: "text-6xl text-orange-600 dark:text-orange-400"
                        })
                      ]),
                      createVNode("h1", { class: "text-3xl font-bold text-gray-900 dark:text-white mb-2" }, " Payment Cancelled "),
                      createVNode("p", { class: "text-gray-600 dark:text-gray-400 mb-8" }, " You have cancelled the payment process "),
                      unref(transactionId) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-8"
                      }, [
                        createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Transaction ID"),
                        createVNode("p", { class: "font-medium text-gray-900 dark:text-white" }, toDisplayString(unref(transactionId)), 1)
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8 text-left" }, [
                        createVNode("div", { class: "flex items-start gap-3" }, [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-information-circle",
                            class: "text-blue-600 dark:text-blue-400 text-xl shrink-0 mt-0.5"
                          }),
                          createVNode("div", { class: "text-sm text-blue-800 dark:text-blue-200" }, [
                            createVNode("p", { class: "font-medium mb-2" }, "Don't worry!"),
                            createVNode("ul", { class: "list-disc list-inside space-y-1" }, [
                              createVNode("li", null, "No charges have been made to your account"),
                              createVNode("li", null, "Your items are still in your cart"),
                              createVNode("li", null, "You can complete the payment whenever you're ready")
                            ])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "flex flex-col sm:flex-row gap-3" }, [
                        createVNode(_component_UButton, {
                          to: "/checkout",
                          size: "lg",
                          icon: "i-heroicons-arrow-path",
                          block: "",
                          class: "sm:flex-1"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Complete Payment ")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UButton, {
                          to: "/cart",
                          size: "lg",
                          color: "secondary",
                          variant: "outline",
                          icon: "i-heroicons-shopping-cart",
                          block: "",
                          class: "sm:flex-1"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" View Cart ")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UButton, {
                          to: "/shop",
                          size: "lg",
                          color: "secondary",
                          variant: "ghost",
                          icon: "i-heroicons-shopping-bag",
                          block: "",
                          class: "sm:flex-1"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Continue Shopping ")
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  _: 1
                })
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/payment/cancelled.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=cancelled-DTTSrsPA.mjs.map
