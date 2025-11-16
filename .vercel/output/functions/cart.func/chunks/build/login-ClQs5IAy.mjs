import { _ as _sfc_main$1 } from './Container-DJ2zbRf-.mjs';
import { _ as _sfc_main$2 } from './Card-D31Cx9o-.mjs';
import { _ as _sfc_main$3 } from './FormField-D7jUvIQZ.mjs';
import { _ as _sfc_main$4 } from './Input-DomsB7QD.mjs';
import { _ as _sfc_main$5 } from './Checkbox-B-SowvkF.mjs';
import { _ as _sfc_main$6 } from './Alert-67GI-HQ0.mjs';
import { a as useToast, e as _sfc_main$8, _ as __nuxt_component_0$1, v as navigateTo } from './server.mjs';
import { reactive, ref, mergeProps, withCtx, unref, createVNode, createTextVNode, withModifiers, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-leGUVdDb.mjs';
import 'reka-ui';
import '@vueuse/core';
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
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import '@vue/shared';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const _sfc_main = {
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const { login } = useAuth();
    const toast = useToast();
    const form = reactive({
      email: "",
      password: "",
      remember: false
    });
    const loading = ref(false);
    const error = ref("");
    const handleLogin = async () => {
      loading.value = true;
      try {
        await login(form.email, form.password);
        toast.add({
          title: "Success",
          description: "Login successful! Welcome back.",
          color: "success"
        });
        await navigateTo("/");
      } catch (error2) {
        toast.add({
          title: "Login Failed",
          description: error2.message || "Something went wrong",
          color: "error"
        });
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = _sfc_main$1;
      const _component_UCard = _sfc_main$2;
      const _component_UFormField = _sfc_main$3;
      const _component_UInput = _sfc_main$4;
      const _component_UCheckbox = _sfc_main$5;
      const _component_UAlert = _sfc_main$6;
      const _component_UButton = _sfc_main$8;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_UContainer, mergeProps({ class: "max-w-md mx-auto py-12" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UCard, null, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h1 class="text-2xl font-bold text-center"${_scopeId2}>Login</h1>`);
                } else {
                  return [
                    createVNode("h1", { class: "text-2xl font-bold text-center" }, "Login")
                  ];
                }
              }),
              footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-center space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_NuxtLink, {
                    to: "/auth/register",
                    class: "text-primary-500"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Don&#39;t have an account? Sign up `);
                      } else {
                        return [
                          createTextVNode(" Don't have an account? Sign up ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<br${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_NuxtLink, {
                    to: "/forgot-password",
                    class: "text-sm text-gray-500"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Forgot your password? `);
                      } else {
                        return [
                          createTextVNode(" Forgot your password? ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "text-center space-y-2" }, [
                      createVNode(_component_NuxtLink, {
                        to: "/auth/register",
                        class: "text-primary-500"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Don't have an account? Sign up ")
                        ]),
                        _: 1
                      }),
                      createVNode("br"),
                      createVNode(_component_NuxtLink, {
                        to: "/forgot-password",
                        class: "text-sm text-gray-500"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Forgot your password? ")
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<form class="space-y-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UFormField, {
                    label: "Email",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UInput, {
                          modelValue: unref(form).email,
                          "onUpdate:modelValue": ($event) => unref(form).email = $event,
                          type: "email",
                          placeholder: "Enter your email",
                          class: "w-full",
                          required: "",
                          icon: "i-lucide-at-sign"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UInput, {
                            modelValue: unref(form).email,
                            "onUpdate:modelValue": ($event) => unref(form).email = $event,
                            type: "email",
                            placeholder: "Enter your email",
                            class: "w-full",
                            required: "",
                            icon: "i-lucide-at-sign"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UFormField, {
                    label: "Password",
                    required: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UInput, {
                          modelValue: unref(form).password,
                          "onUpdate:modelValue": ($event) => unref(form).password = $event,
                          type: "password",
                          placeholder: "Enter your password",
                          class: "w-full",
                          required: ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UInput, {
                            modelValue: unref(form).password,
                            "onUpdate:modelValue": ($event) => unref(form).password = $event,
                            type: "password",
                            placeholder: "Enter your password",
                            class: "w-full",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UCheckbox, {
                    modelValue: unref(form).remember,
                    "onUpdate:modelValue": ($event) => unref(form).remember = $event,
                    label: "Remember me"
                  }, null, _parent3, _scopeId2));
                  if (unref(error)) {
                    _push3(ssrRenderComponent(_component_UAlert, {
                      color: "red",
                      title: unref(error),
                      "close-button": false
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(_component_UButton, {
                    type: "submit",
                    loading: unref(loading),
                    size: "lg",
                    class: "w-full"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Login `);
                      } else {
                        return [
                          createTextVNode(" Login ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</form>`);
                } else {
                  return [
                    createVNode("form", {
                      onSubmit: withModifiers(handleLogin, ["prevent"]),
                      class: "space-y-4"
                    }, [
                      createVNode(_component_UFormField, {
                        label: "Email",
                        required: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UInput, {
                            modelValue: unref(form).email,
                            "onUpdate:modelValue": ($event) => unref(form).email = $event,
                            type: "email",
                            placeholder: "Enter your email",
                            class: "w-full",
                            required: "",
                            icon: "i-lucide-at-sign"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UFormField, {
                        label: "Password",
                        required: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UInput, {
                            modelValue: unref(form).password,
                            "onUpdate:modelValue": ($event) => unref(form).password = $event,
                            type: "password",
                            placeholder: "Enter your password",
                            class: "w-full",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UCheckbox, {
                        modelValue: unref(form).remember,
                        "onUpdate:modelValue": ($event) => unref(form).remember = $event,
                        label: "Remember me"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      unref(error) ? (openBlock(), createBlock(_component_UAlert, {
                        key: 0,
                        color: "red",
                        title: unref(error),
                        "close-button": false
                      }, null, 8, ["title"])) : createCommentVNode("", true),
                      createVNode(_component_UButton, {
                        type: "submit",
                        loading: unref(loading),
                        size: "lg",
                        class: "w-full"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Login ")
                        ]),
                        _: 1
                      }, 8, ["loading"])
                    ], 32)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UCard, null, {
                header: withCtx(() => [
                  createVNode("h1", { class: "text-2xl font-bold text-center" }, "Login")
                ]),
                footer: withCtx(() => [
                  createVNode("div", { class: "text-center space-y-2" }, [
                    createVNode(_component_NuxtLink, {
                      to: "/auth/register",
                      class: "text-primary-500"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Don't have an account? Sign up ")
                      ]),
                      _: 1
                    }),
                    createVNode("br"),
                    createVNode(_component_NuxtLink, {
                      to: "/forgot-password",
                      class: "text-sm text-gray-500"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Forgot your password? ")
                      ]),
                      _: 1
                    })
                  ])
                ]),
                default: withCtx(() => [
                  createVNode("form", {
                    onSubmit: withModifiers(handleLogin, ["prevent"]),
                    class: "space-y-4"
                  }, [
                    createVNode(_component_UFormField, {
                      label: "Email",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: unref(form).email,
                          "onUpdate:modelValue": ($event) => unref(form).email = $event,
                          type: "email",
                          placeholder: "Enter your email",
                          class: "w-full",
                          required: "",
                          icon: "i-lucide-at-sign"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UFormField, {
                      label: "Password",
                      required: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UInput, {
                          modelValue: unref(form).password,
                          "onUpdate:modelValue": ($event) => unref(form).password = $event,
                          type: "password",
                          placeholder: "Enter your password",
                          class: "w-full",
                          required: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UCheckbox, {
                      modelValue: unref(form).remember,
                      "onUpdate:modelValue": ($event) => unref(form).remember = $event,
                      label: "Remember me"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    unref(error) ? (openBlock(), createBlock(_component_UAlert, {
                      key: 0,
                      color: "red",
                      title: unref(error),
                      "close-button": false
                    }, null, 8, ["title"])) : createCommentVNode("", true),
                    createVNode(_component_UButton, {
                      type: "submit",
                      loading: unref(loading),
                      size: "lg",
                      class: "w-full"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Login ")
                      ]),
                      _: 1
                    }, 8, ["loading"])
                  ], 32)
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
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-ClQs5IAy.mjs.map
