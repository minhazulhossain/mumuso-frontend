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
  __name: "failed",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    const transactionId = ref(null);
    useSEO({
      title: "Payment Failed",
      description: "Your payment could not be processed"
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
                  _push3(`<div class="text-center py-12"${_scopeId2}><div class="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6 mx-auto"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-x-circle",
                    class: "text-6xl text-red-600 dark:text-red-400"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2"${_scopeId2}> Payment Failed </h1><p class="text-gray-600 dark:text-gray-400 mb-8"${_scopeId2}> Unfortunately, your payment could not be processed </p>`);
                  if (unref(transactionId)) {
                    _push3(`<div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-8"${_scopeId2}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId2}>Transaction ID</p><p class="font-medium text-gray-900 dark:text-white"${_scopeId2}>${ssrInterpolate(unref(transactionId))}</p></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-8 text-left"${_scopeId2}><h3 class="font-semibold text-red-900 dark:text-red-100 mb-3"${_scopeId2}>Common Reasons for Payment Failure:</h3><ul class="space-y-2 text-sm text-red-800 dark:text-red-200"${_scopeId2}><li class="flex items-start gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-x-mark",
                    class: "text-red-600 dark:text-red-400 shrink-0 mt-0.5"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span${_scopeId2}>Insufficient funds in your account</span></li><li class="flex items-start gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-x-mark",
                    class: "text-red-600 dark:text-red-400 shrink-0 mt-0.5"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span${_scopeId2}>Incorrect card details or PIN</span></li><li class="flex items-start gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-x-mark",
                    class: "text-red-600 dark:text-red-400 shrink-0 mt-0.5"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span${_scopeId2}>Card expired or blocked</span></li><li class="flex items-start gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-x-mark",
                    class: "text-red-600 dark:text-red-400 shrink-0 mt-0.5"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span${_scopeId2}>Payment limit exceeded</span></li><li class="flex items-start gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-x-mark",
                    class: "text-red-600 dark:text-red-400 shrink-0 mt-0.5"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span${_scopeId2}>Bank or network issues</span></li></ul></div><div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8 text-left"${_scopeId2}><div class="flex items-start gap-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-information-circle",
                    class: "text-blue-600 dark:text-blue-400 text-xl shrink-0 mt-0.5"
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="text-sm text-blue-800 dark:text-blue-200"${_scopeId2}><p class="font-medium mb-2"${_scopeId2}>What you can do:</p><ul class="list-disc list-inside space-y-1"${_scopeId2}><li${_scopeId2}>Double-check your payment details and try again</li><li${_scopeId2}>Try a different payment method</li><li${_scopeId2}>Contact your bank if the issue persists</li><li${_scopeId2}>Contact our support team for assistance</li></ul></div></div></div><div class="flex flex-col sm:flex-row gap-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UButton, {
                    to: "/checkout",
                    size: "lg",
                    icon: "i-heroicons-arrow-path",
                    block: "",
                    class: "sm:flex-1"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Try Again `);
                      } else {
                        return [
                          createTextVNode(" Try Again ")
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
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "text-center py-12" }, [
                      createVNode("div", { class: "w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6 mx-auto" }, [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-x-circle",
                          class: "text-6xl text-red-600 dark:text-red-400"
                        })
                      ]),
                      createVNode("h1", { class: "text-3xl font-bold text-gray-900 dark:text-white mb-2" }, " Payment Failed "),
                      createVNode("p", { class: "text-gray-600 dark:text-gray-400 mb-8" }, " Unfortunately, your payment could not be processed "),
                      unref(transactionId) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-8"
                      }, [
                        createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Transaction ID"),
                        createVNode("p", { class: "font-medium text-gray-900 dark:text-white" }, toDisplayString(unref(transactionId)), 1)
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-8 text-left" }, [
                        createVNode("h3", { class: "font-semibold text-red-900 dark:text-red-100 mb-3" }, "Common Reasons for Payment Failure:"),
                        createVNode("ul", { class: "space-y-2 text-sm text-red-800 dark:text-red-200" }, [
                          createVNode("li", { class: "flex items-start gap-2" }, [
                            createVNode(_component_UIcon, {
                              name: "i-heroicons-x-mark",
                              class: "text-red-600 dark:text-red-400 shrink-0 mt-0.5"
                            }),
                            createVNode("span", null, "Insufficient funds in your account")
                          ]),
                          createVNode("li", { class: "flex items-start gap-2" }, [
                            createVNode(_component_UIcon, {
                              name: "i-heroicons-x-mark",
                              class: "text-red-600 dark:text-red-400 shrink-0 mt-0.5"
                            }),
                            createVNode("span", null, "Incorrect card details or PIN")
                          ]),
                          createVNode("li", { class: "flex items-start gap-2" }, [
                            createVNode(_component_UIcon, {
                              name: "i-heroicons-x-mark",
                              class: "text-red-600 dark:text-red-400 shrink-0 mt-0.5"
                            }),
                            createVNode("span", null, "Card expired or blocked")
                          ]),
                          createVNode("li", { class: "flex items-start gap-2" }, [
                            createVNode(_component_UIcon, {
                              name: "i-heroicons-x-mark",
                              class: "text-red-600 dark:text-red-400 shrink-0 mt-0.5"
                            }),
                            createVNode("span", null, "Payment limit exceeded")
                          ]),
                          createVNode("li", { class: "flex items-start gap-2" }, [
                            createVNode(_component_UIcon, {
                              name: "i-heroicons-x-mark",
                              class: "text-red-600 dark:text-red-400 shrink-0 mt-0.5"
                            }),
                            createVNode("span", null, "Bank or network issues")
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8 text-left" }, [
                        createVNode("div", { class: "flex items-start gap-3" }, [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-information-circle",
                            class: "text-blue-600 dark:text-blue-400 text-xl shrink-0 mt-0.5"
                          }),
                          createVNode("div", { class: "text-sm text-blue-800 dark:text-blue-200" }, [
                            createVNode("p", { class: "font-medium mb-2" }, "What you can do:"),
                            createVNode("ul", { class: "list-disc list-inside space-y-1" }, [
                              createVNode("li", null, "Double-check your payment details and try again"),
                              createVNode("li", null, "Try a different payment method"),
                              createVNode("li", null, "Contact your bank if the issue persists"),
                              createVNode("li", null, "Contact our support team for assistance")
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
                            createTextVNode(" Try Again ")
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
                      createVNode("div", { class: "w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6 mx-auto" }, [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-x-circle",
                          class: "text-6xl text-red-600 dark:text-red-400"
                        })
                      ]),
                      createVNode("h1", { class: "text-3xl font-bold text-gray-900 dark:text-white mb-2" }, " Payment Failed "),
                      createVNode("p", { class: "text-gray-600 dark:text-gray-400 mb-8" }, " Unfortunately, your payment could not be processed "),
                      unref(transactionId) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-8"
                      }, [
                        createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Transaction ID"),
                        createVNode("p", { class: "font-medium text-gray-900 dark:text-white" }, toDisplayString(unref(transactionId)), 1)
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-8 text-left" }, [
                        createVNode("h3", { class: "font-semibold text-red-900 dark:text-red-100 mb-3" }, "Common Reasons for Payment Failure:"),
                        createVNode("ul", { class: "space-y-2 text-sm text-red-800 dark:text-red-200" }, [
                          createVNode("li", { class: "flex items-start gap-2" }, [
                            createVNode(_component_UIcon, {
                              name: "i-heroicons-x-mark",
                              class: "text-red-600 dark:text-red-400 shrink-0 mt-0.5"
                            }),
                            createVNode("span", null, "Insufficient funds in your account")
                          ]),
                          createVNode("li", { class: "flex items-start gap-2" }, [
                            createVNode(_component_UIcon, {
                              name: "i-heroicons-x-mark",
                              class: "text-red-600 dark:text-red-400 shrink-0 mt-0.5"
                            }),
                            createVNode("span", null, "Incorrect card details or PIN")
                          ]),
                          createVNode("li", { class: "flex items-start gap-2" }, [
                            createVNode(_component_UIcon, {
                              name: "i-heroicons-x-mark",
                              class: "text-red-600 dark:text-red-400 shrink-0 mt-0.5"
                            }),
                            createVNode("span", null, "Card expired or blocked")
                          ]),
                          createVNode("li", { class: "flex items-start gap-2" }, [
                            createVNode(_component_UIcon, {
                              name: "i-heroicons-x-mark",
                              class: "text-red-600 dark:text-red-400 shrink-0 mt-0.5"
                            }),
                            createVNode("span", null, "Payment limit exceeded")
                          ]),
                          createVNode("li", { class: "flex items-start gap-2" }, [
                            createVNode(_component_UIcon, {
                              name: "i-heroicons-x-mark",
                              class: "text-red-600 dark:text-red-400 shrink-0 mt-0.5"
                            }),
                            createVNode("span", null, "Bank or network issues")
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8 text-left" }, [
                        createVNode("div", { class: "flex items-start gap-3" }, [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-information-circle",
                            class: "text-blue-600 dark:text-blue-400 text-xl shrink-0 mt-0.5"
                          }),
                          createVNode("div", { class: "text-sm text-blue-800 dark:text-blue-200" }, [
                            createVNode("p", { class: "font-medium mb-2" }, "What you can do:"),
                            createVNode("ul", { class: "list-disc list-inside space-y-1" }, [
                              createVNode("li", null, "Double-check your payment details and try again"),
                              createVNode("li", null, "Try a different payment method"),
                              createVNode("li", null, "Contact your bank if the issue persists"),
                              createVNode("li", null, "Contact our support team for assistance")
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
                            createTextVNode(" Try Again ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/payment/failed.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=failed-GeAtladI.mjs.map
