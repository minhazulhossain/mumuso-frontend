import { _ as _sfc_main$1 } from './Container-DJ2zbRf-.mjs';
import { x as useRoute, c as useSEO, d as _sfc_main$e, e as _sfc_main$8 } from './server.mjs';
import { _ as _sfc_main$2 } from './Card-D31Cx9o-.mjs';
import { defineComponent, ref, mergeProps, withCtx, unref, createTextVNode, createVNode, createBlock, createCommentVNode, toDisplayString, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as usePayment } from './usePayment-BVr1DIZC.mjs';
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
  __name: "success",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    usePayment();
    const loading = ref(true);
    const error = ref(null);
    const paymentData = ref(null);
    useSEO({
      title: "Payment Successful",
      description: "Your payment has been processed successfully"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = _sfc_main$1;
      const _component_UIcon = _sfc_main$e;
      const _component_UCard = _sfc_main$2;
      const _component_UButton = _sfc_main$8;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-2xl mx-auto"${_scopeId}>`);
            if (unref(loading)) {
              _push2(`<div class="text-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-arrow-path",
                class: "text-6xl text-primary-500 animate-spin mb-4 mx-auto"
              }, null, _parent2, _scopeId));
              _push2(`<p class="text-gray-600 dark:text-gray-400"${_scopeId}>Verifying payment...</p></div>`);
            } else if (unref(paymentData)) {
              _push2(`<div class="text-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UCard, null, {
                header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex flex-col items-center py-6"${_scopeId2}><div class="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-check-circle",
                      class: "text-6xl text-green-600 dark:text-green-400"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2"${_scopeId2}> Payment Successful! </h1><p class="text-gray-600 dark:text-gray-400"${_scopeId2}> Your payment has been processed successfully </p></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex flex-col items-center py-6" }, [
                        createVNode("div", { class: "w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4" }, [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-check-circle",
                            class: "text-6xl text-green-600 dark:text-green-400"
                          })
                        ]),
                        createVNode("h1", { class: "text-3xl font-bold text-gray-900 dark:text-white mb-2" }, " Payment Successful! "),
                        createVNode("p", { class: "text-gray-600 dark:text-gray-400" }, " Your payment has been processed successfully ")
                      ])
                    ];
                  }
                }),
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="space-y-6"${_scopeId2}><div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4"${_scopeId2}><h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4"${_scopeId2}> Transaction Details </h2><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId2}><div${_scopeId2}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId2}>Transaction ID</p><p class="font-medium text-gray-900 dark:text-white"${_scopeId2}>${ssrInterpolate(unref(paymentData).transaction_id)}</p></div><div${_scopeId2}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId2}>Amount Paid</p><p class="font-medium text-gray-900 dark:text-white"${_scopeId2}>${ssrInterpolate(unref(paymentData).currency)} ${ssrInterpolate(parseFloat(unref(paymentData).amount).toFixed(2))}</p></div>`);
                    if (unref(paymentData).payment_method) {
                      _push3(`<div${_scopeId2}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId2}>Payment Method</p><p class="font-medium text-gray-900 dark:text-white capitalize"${_scopeId2}>${ssrInterpolate(unref(paymentData).payment_method)}</p></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (unref(paymentData).paid_at) {
                      _push3(`<div${_scopeId2}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId2}>Payment Date</p><p class="font-medium text-gray-900 dark:text-white"${_scopeId2}>${ssrInterpolate(new Date(unref(paymentData).paid_at).toLocaleString())}</p></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (unref(paymentData).bank_tran_id) {
                      _push3(`<div${_scopeId2}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId2}>Bank Transaction ID</p><p class="font-medium text-gray-900 dark:text-white"${_scopeId2}>${ssrInterpolate(unref(paymentData).bank_tran_id)}</p></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<div${_scopeId2}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId2}>Order ID</p><p class="font-medium text-gray-900 dark:text-white"${_scopeId2}>#${ssrInterpolate(unref(paymentData).order_id)}</p></div></div></div><div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4"${_scopeId2}><div class="flex items-start gap-3"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-information-circle",
                      class: "text-green-600 dark:text-green-400 text-xl shrink-0 mt-0.5"
                    }, null, _parent3, _scopeId2));
                    _push3(`<div class="text-sm text-green-800 dark:text-green-200"${_scopeId2}><p class="font-medium mb-1"${_scopeId2}>What&#39;s next?</p><ul class="list-disc list-inside space-y-1"${_scopeId2}><li${_scopeId2}>You will receive an order confirmation email shortly</li><li${_scopeId2}>You can track your order status in your account</li><li${_scopeId2}>We&#39;ll notify you when your order ships</li></ul></div></div></div><div class="flex flex-col sm:flex-row gap-3 pt-4"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UButton, {
                      to: "/account/orders",
                      size: "lg",
                      icon: "i-heroicons-receipt-percent",
                      block: "",
                      class: "sm:flex-1"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` View Orders `);
                        } else {
                          return [
                            createTextVNode(" View Orders ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UButton, {
                      to: "/shop",
                      size: "lg",
                      color: "secondary",
                      variant: "outline",
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
                      createVNode("div", { class: "space-y-6" }, [
                        createVNode("div", { class: "bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4" }, [
                          createVNode("h2", { class: "text-lg font-semibold text-gray-900 dark:text-white mb-4" }, " Transaction Details "),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                            createVNode("div", null, [
                              createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Transaction ID"),
                              createVNode("p", { class: "font-medium text-gray-900 dark:text-white" }, toDisplayString(unref(paymentData).transaction_id), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Amount Paid"),
                              createVNode("p", { class: "font-medium text-gray-900 dark:text-white" }, toDisplayString(unref(paymentData).currency) + " " + toDisplayString(parseFloat(unref(paymentData).amount).toFixed(2)), 1)
                            ]),
                            unref(paymentData).payment_method ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Payment Method"),
                              createVNode("p", { class: "font-medium text-gray-900 dark:text-white capitalize" }, toDisplayString(unref(paymentData).payment_method), 1)
                            ])) : createCommentVNode("", true),
                            unref(paymentData).paid_at ? (openBlock(), createBlock("div", { key: 1 }, [
                              createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Payment Date"),
                              createVNode("p", { class: "font-medium text-gray-900 dark:text-white" }, toDisplayString(new Date(unref(paymentData).paid_at).toLocaleString()), 1)
                            ])) : createCommentVNode("", true),
                            unref(paymentData).bank_tran_id ? (openBlock(), createBlock("div", { key: 2 }, [
                              createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Bank Transaction ID"),
                              createVNode("p", { class: "font-medium text-gray-900 dark:text-white" }, toDisplayString(unref(paymentData).bank_tran_id), 1)
                            ])) : createCommentVNode("", true),
                            createVNode("div", null, [
                              createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Order ID"),
                              createVNode("p", { class: "font-medium text-gray-900 dark:text-white" }, "#" + toDisplayString(unref(paymentData).order_id), 1)
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4" }, [
                          createVNode("div", { class: "flex items-start gap-3" }, [
                            createVNode(_component_UIcon, {
                              name: "i-heroicons-information-circle",
                              class: "text-green-600 dark:text-green-400 text-xl shrink-0 mt-0.5"
                            }),
                            createVNode("div", { class: "text-sm text-green-800 dark:text-green-200" }, [
                              createVNode("p", { class: "font-medium mb-1" }, "What's next?"),
                              createVNode("ul", { class: "list-disc list-inside space-y-1" }, [
                                createVNode("li", null, "You will receive an order confirmation email shortly"),
                                createVNode("li", null, "You can track your order status in your account"),
                                createVNode("li", null, "We'll notify you when your order ships")
                              ])
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "flex flex-col sm:flex-row gap-3 pt-4" }, [
                          createVNode(_component_UButton, {
                            to: "/account/orders",
                            size: "lg",
                            icon: "i-heroicons-receipt-percent",
                            block: "",
                            class: "sm:flex-1"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" View Orders ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UButton, {
                            to: "/shop",
                            size: "lg",
                            color: "secondary",
                            variant: "outline",
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
              _push2(`<div class="text-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UCard, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="py-12"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-exclamation-triangle",
                      class: "text-6xl text-red-500 mb-4 mx-auto"
                    }, null, _parent3, _scopeId2));
                    _push3(`<h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2"${_scopeId2}> Unable to Verify Payment </h1><p class="text-gray-600 dark:text-gray-400 mb-6"${_scopeId2}>${ssrInterpolate(unref(error) || "Something went wrong while verifying your payment")}</p><div class="flex flex-col sm:flex-row gap-3 justify-center"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UButton, {
                      to: "/account/orders",
                      size: "lg",
                      icon: "i-heroicons-receipt-percent"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` View Orders `);
                        } else {
                          return [
                            createTextVNode(" View Orders ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UButton, {
                      to: "/",
                      size: "lg",
                      color: "secondary",
                      variant: "outline"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Go Home `);
                        } else {
                          return [
                            createTextVNode(" Go Home ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "py-12" }, [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-exclamation-triangle",
                          class: "text-6xl text-red-500 mb-4 mx-auto"
                        }),
                        createVNode("h1", { class: "text-2xl font-bold text-gray-900 dark:text-white mb-2" }, " Unable to Verify Payment "),
                        createVNode("p", { class: "text-gray-600 dark:text-gray-400 mb-6" }, toDisplayString(unref(error) || "Something went wrong while verifying your payment"), 1),
                        createVNode("div", { class: "flex flex-col sm:flex-row gap-3 justify-center" }, [
                          createVNode(_component_UButton, {
                            to: "/account/orders",
                            size: "lg",
                            icon: "i-heroicons-receipt-percent"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" View Orders ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UButton, {
                            to: "/",
                            size: "lg",
                            color: "secondary",
                            variant: "outline"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Go Home ")
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
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "max-w-2xl mx-auto" }, [
                unref(loading) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "text-center"
                }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-arrow-path",
                    class: "text-6xl text-primary-500 animate-spin mb-4 mx-auto"
                  }),
                  createVNode("p", { class: "text-gray-600 dark:text-gray-400" }, "Verifying payment...")
                ])) : unref(paymentData) ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "text-center"
                }, [
                  createVNode(_component_UCard, null, {
                    header: withCtx(() => [
                      createVNode("div", { class: "flex flex-col items-center py-6" }, [
                        createVNode("div", { class: "w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4" }, [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-check-circle",
                            class: "text-6xl text-green-600 dark:text-green-400"
                          })
                        ]),
                        createVNode("h1", { class: "text-3xl font-bold text-gray-900 dark:text-white mb-2" }, " Payment Successful! "),
                        createVNode("p", { class: "text-gray-600 dark:text-gray-400" }, " Your payment has been processed successfully ")
                      ])
                    ]),
                    default: withCtx(() => [
                      createVNode("div", { class: "space-y-6" }, [
                        createVNode("div", { class: "bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4" }, [
                          createVNode("h2", { class: "text-lg font-semibold text-gray-900 dark:text-white mb-4" }, " Transaction Details "),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                            createVNode("div", null, [
                              createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Transaction ID"),
                              createVNode("p", { class: "font-medium text-gray-900 dark:text-white" }, toDisplayString(unref(paymentData).transaction_id), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Amount Paid"),
                              createVNode("p", { class: "font-medium text-gray-900 dark:text-white" }, toDisplayString(unref(paymentData).currency) + " " + toDisplayString(parseFloat(unref(paymentData).amount).toFixed(2)), 1)
                            ]),
                            unref(paymentData).payment_method ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Payment Method"),
                              createVNode("p", { class: "font-medium text-gray-900 dark:text-white capitalize" }, toDisplayString(unref(paymentData).payment_method), 1)
                            ])) : createCommentVNode("", true),
                            unref(paymentData).paid_at ? (openBlock(), createBlock("div", { key: 1 }, [
                              createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Payment Date"),
                              createVNode("p", { class: "font-medium text-gray-900 dark:text-white" }, toDisplayString(new Date(unref(paymentData).paid_at).toLocaleString()), 1)
                            ])) : createCommentVNode("", true),
                            unref(paymentData).bank_tran_id ? (openBlock(), createBlock("div", { key: 2 }, [
                              createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Bank Transaction ID"),
                              createVNode("p", { class: "font-medium text-gray-900 dark:text-white" }, toDisplayString(unref(paymentData).bank_tran_id), 1)
                            ])) : createCommentVNode("", true),
                            createVNode("div", null, [
                              createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Order ID"),
                              createVNode("p", { class: "font-medium text-gray-900 dark:text-white" }, "#" + toDisplayString(unref(paymentData).order_id), 1)
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4" }, [
                          createVNode("div", { class: "flex items-start gap-3" }, [
                            createVNode(_component_UIcon, {
                              name: "i-heroicons-information-circle",
                              class: "text-green-600 dark:text-green-400 text-xl shrink-0 mt-0.5"
                            }),
                            createVNode("div", { class: "text-sm text-green-800 dark:text-green-200" }, [
                              createVNode("p", { class: "font-medium mb-1" }, "What's next?"),
                              createVNode("ul", { class: "list-disc list-inside space-y-1" }, [
                                createVNode("li", null, "You will receive an order confirmation email shortly"),
                                createVNode("li", null, "You can track your order status in your account"),
                                createVNode("li", null, "We'll notify you when your order ships")
                              ])
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "flex flex-col sm:flex-row gap-3 pt-4" }, [
                          createVNode(_component_UButton, {
                            to: "/account/orders",
                            size: "lg",
                            icon: "i-heroicons-receipt-percent",
                            block: "",
                            class: "sm:flex-1"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" View Orders ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UButton, {
                            to: "/shop",
                            size: "lg",
                            color: "secondary",
                            variant: "outline",
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
                    _: 2
                  }, 1024)
                ])) : (openBlock(), createBlock("div", {
                  key: 2,
                  class: "text-center"
                }, [
                  createVNode(_component_UCard, null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "py-12" }, [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-exclamation-triangle",
                          class: "text-6xl text-red-500 mb-4 mx-auto"
                        }),
                        createVNode("h1", { class: "text-2xl font-bold text-gray-900 dark:text-white mb-2" }, " Unable to Verify Payment "),
                        createVNode("p", { class: "text-gray-600 dark:text-gray-400 mb-6" }, toDisplayString(unref(error) || "Something went wrong while verifying your payment"), 1),
                        createVNode("div", { class: "flex flex-col sm:flex-row gap-3 justify-center" }, [
                          createVNode(_component_UButton, {
                            to: "/account/orders",
                            size: "lg",
                            icon: "i-heroicons-receipt-percent"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" View Orders ")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UButton, {
                            to: "/",
                            size: "lg",
                            color: "secondary",
                            variant: "outline"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Go Home ")
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    _: 1
                  })
                ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/payment/success.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=success-Dg6FMIoz.mjs.map
