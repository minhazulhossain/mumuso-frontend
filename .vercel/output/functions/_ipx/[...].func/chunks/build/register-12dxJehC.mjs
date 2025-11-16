import { _ as _sfc_main$1 } from './Container-DJ2zbRf-.mjs';
import { _ as _sfc_main$2 } from './Card-D31Cx9o-.mjs';
import { _ as _sfc_main$3 } from './Form-CfudII3J.mjs';
import { _ as _sfc_main$4 } from './FormField-D7jUvIQZ.mjs';
import { _ as _sfc_main$5 } from './Input-DomsB7QD.mjs';
import { a as useToast, e as _sfc_main$8, E as _sfc_main$7, d as _sfc_main$e, _ as __nuxt_component_0$1, v as navigateTo } from './server.mjs';
import { defineComponent, ref, reactive, computed, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    const { register } = useAuth();
    const toast = useToast();
    const showPassword = ref(false);
    const showPasswordConfirm = ref(false);
    const form = reactive({
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    });
    function checkStrength(str) {
      const requirements = [
        { regex: /.{8,}/, text: "At least 8 characters" },
        { regex: /\d/, text: "At least 1 number" },
        { regex: /[a-z]/, text: "At least 1 lowercase letter" },
        { regex: /[A-Z]/, text: "At least 1 uppercase letter" }
      ];
      return requirements.map((req) => ({ met: req.regex.test(str), text: req.text }));
    }
    const strength = computed(() => checkStrength(form.password));
    const score = computed(() => strength.value.filter((req) => req.met).length);
    const color = computed(() => {
      if (score.value === 0) return "neutral";
      if (score.value <= 1) return "error";
      if (score.value <= 2) return "warning";
      if (score.value === 3) return "warning";
      return "success";
    });
    const text = computed(() => {
      if (score.value === 0) return "Enter a password";
      if (score.value <= 2) return "Weak password";
      if (score.value === 3) return "Medium password";
      return "Strong password";
    });
    async function validate(data) {
      const errors = [];
      if (!data.name?.length) {
        errors.push({ name: "name", message: "Full name is required" });
      }
      if (!data.email?.length) {
        errors.push({ name: "email", message: "Email is required" });
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push({ name: "email", message: "Invalid email format" });
      }
      if (!data.password?.length) {
        errors.push({ name: "password", message: "Password is required" });
      } else if (score.value < 4) {
        errors.push({ name: "password", message: "Password does not meet requirements" });
      }
      if (!data.password_confirmation?.length) {
        errors.push({ name: "password_confirmation", message: "Please confirm your password" });
      } else if (data.password !== data.password_confirmation) {
        errors.push({ name: "password_confirmation", message: "Passwords do not match" });
      }
      return errors;
    }
    const handleRegister = async () => {
      try {
        await register(form);
        toast.add({
          title: "Success",
          description: "Registration successful! Welcome aboard.",
          color: "success"
        });
        await navigateTo("/");
      } catch (error) {
        toast.add({
          title: "Registration Failed",
          description: error.message || "Something went wrong",
          color: "error"
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = _sfc_main$1;
      const _component_UCard = _sfc_main$2;
      const _component_UForm = _sfc_main$3;
      const _component_UFormField = _sfc_main$4;
      const _component_UInput = _sfc_main$5;
      const _component_UButton = _sfc_main$8;
      const _component_UProgress = _sfc_main$7;
      const _component_UIcon = _sfc_main$e;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_UContainer, mergeProps({ class: "max-w-md mx-auto py-12" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UCard, null, {
              header: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h1 class="text-2xl font-bold text-center"${_scopeId2}>Register</h1>`);
                } else {
                  return [
                    createVNode("h1", { class: "text-2xl font-bold text-center" }, "Register")
                  ];
                }
              }),
              footer: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-center space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_NuxtLink, {
                    to: "/auth/login",
                    class: "text-primary-500 hover:underline"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Have an account? Sign in `);
                      } else {
                        return [
                          createTextVNode(" Have an account? Sign in ")
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
                        to: "/auth/login",
                        class: "text-primary-500 hover:underline"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Have an account? Sign in ")
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UForm, {
                    state: unref(form),
                    validate,
                    onSubmit: handleRegister
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UFormField, {
                          label: "Full Name",
                          required: "",
                          name: "name"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UInput, {
                                modelValue: unref(form).name,
                                "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                placeholder: "Enter your full name",
                                class: "w-full"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UInput, {
                                  modelValue: unref(form).name,
                                  "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                  placeholder: "Enter your full name",
                                  class: "w-full"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UFormField, {
                          label: "Email",
                          required: "",
                          help: "We won't share your email with anyone",
                          name: "email"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UInput, {
                                modelValue: unref(form).email,
                                "onUpdate:modelValue": ($event) => unref(form).email = $event,
                                placeholder: "Enter your email",
                                class: "w-full",
                                icon: "i-lucide-at-sign",
                                type: "email"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UInput, {
                                  modelValue: unref(form).email,
                                  "onUpdate:modelValue": ($event) => unref(form).email = $event,
                                  placeholder: "Enter your email",
                                  class: "w-full",
                                  icon: "i-lucide-at-sign",
                                  type: "email"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UFormField, {
                          label: "Password",
                          required: "",
                          name: "password"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UInput, {
                                modelValue: unref(form).password,
                                "onUpdate:modelValue": ($event) => unref(form).password = $event,
                                placeholder: "Password",
                                color: unref(color),
                                type: unref(showPassword) ? "text" : "password",
                                "aria-invalid": unref(score) < 4,
                                "aria-describedby": "password-strength",
                                ui: { trailing: "pe-1" },
                                class: "w-full"
                              }, {
                                trailing: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_UButton, {
                                      color: "neutral",
                                      variant: "link",
                                      size: "sm",
                                      icon: unref(showPassword) ? "i-lucide-eye-off" : "i-lucide-eye",
                                      "aria-label": unref(showPassword) ? "Hide password" : "Show password",
                                      "aria-pressed": unref(showPassword),
                                      "aria-controls": "password",
                                      onClick: ($event) => showPassword.value = !unref(showPassword)
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_UButton, {
                                        color: "neutral",
                                        variant: "link",
                                        size: "sm",
                                        icon: unref(showPassword) ? "i-lucide-eye-off" : "i-lucide-eye",
                                        "aria-label": unref(showPassword) ? "Hide password" : "Show password",
                                        "aria-pressed": unref(showPassword),
                                        "aria-controls": "password",
                                        onClick: ($event) => showPassword.value = !unref(showPassword)
                                      }, null, 8, ["icon", "aria-label", "aria-pressed", "onClick"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UInput, {
                                  modelValue: unref(form).password,
                                  "onUpdate:modelValue": ($event) => unref(form).password = $event,
                                  placeholder: "Password",
                                  color: unref(color),
                                  type: unref(showPassword) ? "text" : "password",
                                  "aria-invalid": unref(score) < 4,
                                  "aria-describedby": "password-strength",
                                  ui: { trailing: "pe-1" },
                                  class: "w-full"
                                }, {
                                  trailing: withCtx(() => [
                                    createVNode(_component_UButton, {
                                      color: "neutral",
                                      variant: "link",
                                      size: "sm",
                                      icon: unref(showPassword) ? "i-lucide-eye-off" : "i-lucide-eye",
                                      "aria-label": unref(showPassword) ? "Hide password" : "Show password",
                                      "aria-pressed": unref(showPassword),
                                      "aria-controls": "password",
                                      onClick: ($event) => showPassword.value = !unref(showPassword)
                                    }, null, 8, ["icon", "aria-label", "aria-pressed", "onClick"])
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue", "color", "type", "aria-invalid"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UProgress, {
                          color: unref(color),
                          indicator: unref(text),
                          "model-value": unref(score),
                          max: 4,
                          size: "sm",
                          class: "mt-2"
                        }, null, _parent4, _scopeId3));
                        _push4(`<p id="password-strength" class="text-sm font-medium"${_scopeId3}>${ssrInterpolate(unref(text))}. Must contain: </p><ul class="space-y-1" aria-label="Password requirements"${_scopeId3}><!--[-->`);
                        ssrRenderList(unref(strength), (req, index) => {
                          _push4(`<li class="${ssrRenderClass([req.met ? "text-success" : "text-muted", "flex items-center gap-0.5"])}"${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_UIcon, {
                            name: req.met ? "i-lucide-circle-check" : "i-lucide-circle-x",
                            class: "size-4 shrink-0"
                          }, null, _parent4, _scopeId3));
                          _push4(`<span class="text-xs font-light"${_scopeId3}>${ssrInterpolate(req.text)} <span class="sr-only"${_scopeId3}>${ssrInterpolate(req.met ? " - Requirement met" : " - Requirement not met")}</span></span></li>`);
                        });
                        _push4(`<!--]--></ul>`);
                        _push4(ssrRenderComponent(_component_UFormField, {
                          label: "Confirm Password",
                          required: "",
                          name: "password_confirmation",
                          class: "mt-4"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UInput, {
                                modelValue: unref(form).password_confirmation,
                                "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                                placeholder: "Re-enter your password",
                                type: unref(showPasswordConfirm) ? "text" : "password",
                                ui: { trailing: "pe-1" },
                                class: "w-full"
                              }, {
                                trailing: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_UButton, {
                                      color: "neutral",
                                      variant: "link",
                                      size: "sm",
                                      icon: unref(showPasswordConfirm) ? "i-lucide-eye-off" : "i-lucide-eye",
                                      "aria-label": unref(showPasswordConfirm) ? "Hide password" : "Show password",
                                      "aria-pressed": unref(showPasswordConfirm),
                                      onClick: ($event) => showPasswordConfirm.value = !unref(showPasswordConfirm)
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_UButton, {
                                        color: "neutral",
                                        variant: "link",
                                        size: "sm",
                                        icon: unref(showPasswordConfirm) ? "i-lucide-eye-off" : "i-lucide-eye",
                                        "aria-label": unref(showPasswordConfirm) ? "Hide password" : "Show password",
                                        "aria-pressed": unref(showPasswordConfirm),
                                        onClick: ($event) => showPasswordConfirm.value = !unref(showPasswordConfirm)
                                      }, null, 8, ["icon", "aria-label", "aria-pressed", "onClick"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UInput, {
                                  modelValue: unref(form).password_confirmation,
                                  "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                                  placeholder: "Re-enter your password",
                                  type: unref(showPasswordConfirm) ? "text" : "password",
                                  ui: { trailing: "pe-1" },
                                  class: "w-full"
                                }, {
                                  trailing: withCtx(() => [
                                    createVNode(_component_UButton, {
                                      color: "neutral",
                                      variant: "link",
                                      size: "sm",
                                      icon: unref(showPasswordConfirm) ? "i-lucide-eye-off" : "i-lucide-eye",
                                      "aria-label": unref(showPasswordConfirm) ? "Hide password" : "Show password",
                                      "aria-pressed": unref(showPasswordConfirm),
                                      onClick: ($event) => showPasswordConfirm.value = !unref(showPasswordConfirm)
                                    }, null, 8, ["icon", "aria-label", "aria-pressed", "onClick"])
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue", "type"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UButton, {
                          type: "submit",
                          size: "lg",
                          icon: "i-lucide-rocket",
                          class: "w-full mt-4 block",
                          disabled: unref(score) < 4,
                          "loading-auto": ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Register `);
                            } else {
                              return [
                                createTextVNode(" Register ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UFormField, {
                            label: "Full Name",
                            required: "",
                            name: "name"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UInput, {
                                modelValue: unref(form).name,
                                "onUpdate:modelValue": ($event) => unref(form).name = $event,
                                placeholder: "Enter your full name",
                                class: "w-full"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UFormField, {
                            label: "Email",
                            required: "",
                            help: "We won't share your email with anyone",
                            name: "email"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UInput, {
                                modelValue: unref(form).email,
                                "onUpdate:modelValue": ($event) => unref(form).email = $event,
                                placeholder: "Enter your email",
                                class: "w-full",
                                icon: "i-lucide-at-sign",
                                type: "email"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UFormField, {
                            label: "Password",
                            required: "",
                            name: "password"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UInput, {
                                modelValue: unref(form).password,
                                "onUpdate:modelValue": ($event) => unref(form).password = $event,
                                placeholder: "Password",
                                color: unref(color),
                                type: unref(showPassword) ? "text" : "password",
                                "aria-invalid": unref(score) < 4,
                                "aria-describedby": "password-strength",
                                ui: { trailing: "pe-1" },
                                class: "w-full"
                              }, {
                                trailing: withCtx(() => [
                                  createVNode(_component_UButton, {
                                    color: "neutral",
                                    variant: "link",
                                    size: "sm",
                                    icon: unref(showPassword) ? "i-lucide-eye-off" : "i-lucide-eye",
                                    "aria-label": unref(showPassword) ? "Hide password" : "Show password",
                                    "aria-pressed": unref(showPassword),
                                    "aria-controls": "password",
                                    onClick: ($event) => showPassword.value = !unref(showPassword)
                                  }, null, 8, ["icon", "aria-label", "aria-pressed", "onClick"])
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue", "color", "type", "aria-invalid"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UProgress, {
                            color: unref(color),
                            indicator: unref(text),
                            "model-value": unref(score),
                            max: 4,
                            size: "sm",
                            class: "mt-2"
                          }, null, 8, ["color", "indicator", "model-value"]),
                          createVNode("p", {
                            id: "password-strength",
                            class: "text-sm font-medium"
                          }, toDisplayString(unref(text)) + ". Must contain: ", 1),
                          createVNode("ul", {
                            class: "space-y-1",
                            "aria-label": "Password requirements"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(strength), (req, index) => {
                              return openBlock(), createBlock("li", {
                                key: index,
                                class: ["flex items-center gap-0.5", req.met ? "text-success" : "text-muted"]
                              }, [
                                createVNode(_component_UIcon, {
                                  name: req.met ? "i-lucide-circle-check" : "i-lucide-circle-x",
                                  class: "size-4 shrink-0"
                                }, null, 8, ["name"]),
                                createVNode("span", { class: "text-xs font-light" }, [
                                  createTextVNode(toDisplayString(req.text) + " ", 1),
                                  createVNode("span", { class: "sr-only" }, toDisplayString(req.met ? " - Requirement met" : " - Requirement not met"), 1)
                                ])
                              ], 2);
                            }), 128))
                          ]),
                          createVNode(_component_UFormField, {
                            label: "Confirm Password",
                            required: "",
                            name: "password_confirmation",
                            class: "mt-4"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UInput, {
                                modelValue: unref(form).password_confirmation,
                                "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                                placeholder: "Re-enter your password",
                                type: unref(showPasswordConfirm) ? "text" : "password",
                                ui: { trailing: "pe-1" },
                                class: "w-full"
                              }, {
                                trailing: withCtx(() => [
                                  createVNode(_component_UButton, {
                                    color: "neutral",
                                    variant: "link",
                                    size: "sm",
                                    icon: unref(showPasswordConfirm) ? "i-lucide-eye-off" : "i-lucide-eye",
                                    "aria-label": unref(showPasswordConfirm) ? "Hide password" : "Show password",
                                    "aria-pressed": unref(showPasswordConfirm),
                                    onClick: ($event) => showPasswordConfirm.value = !unref(showPasswordConfirm)
                                  }, null, 8, ["icon", "aria-label", "aria-pressed", "onClick"])
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue", "type"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UButton, {
                            type: "submit",
                            size: "lg",
                            icon: "i-lucide-rocket",
                            class: "w-full mt-4 block",
                            disabled: unref(score) < 4,
                            "loading-auto": ""
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Register ")
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UForm, {
                      state: unref(form),
                      validate,
                      onSubmit: handleRegister
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UFormField, {
                          label: "Full Name",
                          required: "",
                          name: "name"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UInput, {
                              modelValue: unref(form).name,
                              "onUpdate:modelValue": ($event) => unref(form).name = $event,
                              placeholder: "Enter your full name",
                              class: "w-full"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UFormField, {
                          label: "Email",
                          required: "",
                          help: "We won't share your email with anyone",
                          name: "email"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UInput, {
                              modelValue: unref(form).email,
                              "onUpdate:modelValue": ($event) => unref(form).email = $event,
                              placeholder: "Enter your email",
                              class: "w-full",
                              icon: "i-lucide-at-sign",
                              type: "email"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UFormField, {
                          label: "Password",
                          required: "",
                          name: "password"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UInput, {
                              modelValue: unref(form).password,
                              "onUpdate:modelValue": ($event) => unref(form).password = $event,
                              placeholder: "Password",
                              color: unref(color),
                              type: unref(showPassword) ? "text" : "password",
                              "aria-invalid": unref(score) < 4,
                              "aria-describedby": "password-strength",
                              ui: { trailing: "pe-1" },
                              class: "w-full"
                            }, {
                              trailing: withCtx(() => [
                                createVNode(_component_UButton, {
                                  color: "neutral",
                                  variant: "link",
                                  size: "sm",
                                  icon: unref(showPassword) ? "i-lucide-eye-off" : "i-lucide-eye",
                                  "aria-label": unref(showPassword) ? "Hide password" : "Show password",
                                  "aria-pressed": unref(showPassword),
                                  "aria-controls": "password",
                                  onClick: ($event) => showPassword.value = !unref(showPassword)
                                }, null, 8, ["icon", "aria-label", "aria-pressed", "onClick"])
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue", "color", "type", "aria-invalid"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UProgress, {
                          color: unref(color),
                          indicator: unref(text),
                          "model-value": unref(score),
                          max: 4,
                          size: "sm",
                          class: "mt-2"
                        }, null, 8, ["color", "indicator", "model-value"]),
                        createVNode("p", {
                          id: "password-strength",
                          class: "text-sm font-medium"
                        }, toDisplayString(unref(text)) + ". Must contain: ", 1),
                        createVNode("ul", {
                          class: "space-y-1",
                          "aria-label": "Password requirements"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(strength), (req, index) => {
                            return openBlock(), createBlock("li", {
                              key: index,
                              class: ["flex items-center gap-0.5", req.met ? "text-success" : "text-muted"]
                            }, [
                              createVNode(_component_UIcon, {
                                name: req.met ? "i-lucide-circle-check" : "i-lucide-circle-x",
                                class: "size-4 shrink-0"
                              }, null, 8, ["name"]),
                              createVNode("span", { class: "text-xs font-light" }, [
                                createTextVNode(toDisplayString(req.text) + " ", 1),
                                createVNode("span", { class: "sr-only" }, toDisplayString(req.met ? " - Requirement met" : " - Requirement not met"), 1)
                              ])
                            ], 2);
                          }), 128))
                        ]),
                        createVNode(_component_UFormField, {
                          label: "Confirm Password",
                          required: "",
                          name: "password_confirmation",
                          class: "mt-4"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UInput, {
                              modelValue: unref(form).password_confirmation,
                              "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                              placeholder: "Re-enter your password",
                              type: unref(showPasswordConfirm) ? "text" : "password",
                              ui: { trailing: "pe-1" },
                              class: "w-full"
                            }, {
                              trailing: withCtx(() => [
                                createVNode(_component_UButton, {
                                  color: "neutral",
                                  variant: "link",
                                  size: "sm",
                                  icon: unref(showPasswordConfirm) ? "i-lucide-eye-off" : "i-lucide-eye",
                                  "aria-label": unref(showPasswordConfirm) ? "Hide password" : "Show password",
                                  "aria-pressed": unref(showPasswordConfirm),
                                  onClick: ($event) => showPasswordConfirm.value = !unref(showPasswordConfirm)
                                }, null, 8, ["icon", "aria-label", "aria-pressed", "onClick"])
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue", "type"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UButton, {
                          type: "submit",
                          size: "lg",
                          icon: "i-lucide-rocket",
                          class: "w-full mt-4 block",
                          disabled: unref(score) < 4,
                          "loading-auto": ""
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Register ")
                          ]),
                          _: 1
                        }, 8, ["disabled"])
                      ]),
                      _: 1
                    }, 8, ["state"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UCard, null, {
                header: withCtx(() => [
                  createVNode("h1", { class: "text-2xl font-bold text-center" }, "Register")
                ]),
                footer: withCtx(() => [
                  createVNode("div", { class: "text-center space-y-2" }, [
                    createVNode(_component_NuxtLink, {
                      to: "/auth/login",
                      class: "text-primary-500 hover:underline"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Have an account? Sign in ")
                      ]),
                      _: 1
                    })
                  ])
                ]),
                default: withCtx(() => [
                  createVNode(_component_UForm, {
                    state: unref(form),
                    validate,
                    onSubmit: handleRegister
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UFormField, {
                        label: "Full Name",
                        required: "",
                        name: "name"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UInput, {
                            modelValue: unref(form).name,
                            "onUpdate:modelValue": ($event) => unref(form).name = $event,
                            placeholder: "Enter your full name",
                            class: "w-full"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UFormField, {
                        label: "Email",
                        required: "",
                        help: "We won't share your email with anyone",
                        name: "email"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UInput, {
                            modelValue: unref(form).email,
                            "onUpdate:modelValue": ($event) => unref(form).email = $event,
                            placeholder: "Enter your email",
                            class: "w-full",
                            icon: "i-lucide-at-sign",
                            type: "email"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UFormField, {
                        label: "Password",
                        required: "",
                        name: "password"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UInput, {
                            modelValue: unref(form).password,
                            "onUpdate:modelValue": ($event) => unref(form).password = $event,
                            placeholder: "Password",
                            color: unref(color),
                            type: unref(showPassword) ? "text" : "password",
                            "aria-invalid": unref(score) < 4,
                            "aria-describedby": "password-strength",
                            ui: { trailing: "pe-1" },
                            class: "w-full"
                          }, {
                            trailing: withCtx(() => [
                              createVNode(_component_UButton, {
                                color: "neutral",
                                variant: "link",
                                size: "sm",
                                icon: unref(showPassword) ? "i-lucide-eye-off" : "i-lucide-eye",
                                "aria-label": unref(showPassword) ? "Hide password" : "Show password",
                                "aria-pressed": unref(showPassword),
                                "aria-controls": "password",
                                onClick: ($event) => showPassword.value = !unref(showPassword)
                              }, null, 8, ["icon", "aria-label", "aria-pressed", "onClick"])
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue", "color", "type", "aria-invalid"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UProgress, {
                        color: unref(color),
                        indicator: unref(text),
                        "model-value": unref(score),
                        max: 4,
                        size: "sm",
                        class: "mt-2"
                      }, null, 8, ["color", "indicator", "model-value"]),
                      createVNode("p", {
                        id: "password-strength",
                        class: "text-sm font-medium"
                      }, toDisplayString(unref(text)) + ". Must contain: ", 1),
                      createVNode("ul", {
                        class: "space-y-1",
                        "aria-label": "Password requirements"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(strength), (req, index) => {
                          return openBlock(), createBlock("li", {
                            key: index,
                            class: ["flex items-center gap-0.5", req.met ? "text-success" : "text-muted"]
                          }, [
                            createVNode(_component_UIcon, {
                              name: req.met ? "i-lucide-circle-check" : "i-lucide-circle-x",
                              class: "size-4 shrink-0"
                            }, null, 8, ["name"]),
                            createVNode("span", { class: "text-xs font-light" }, [
                              createTextVNode(toDisplayString(req.text) + " ", 1),
                              createVNode("span", { class: "sr-only" }, toDisplayString(req.met ? " - Requirement met" : " - Requirement not met"), 1)
                            ])
                          ], 2);
                        }), 128))
                      ]),
                      createVNode(_component_UFormField, {
                        label: "Confirm Password",
                        required: "",
                        name: "password_confirmation",
                        class: "mt-4"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UInput, {
                            modelValue: unref(form).password_confirmation,
                            "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                            placeholder: "Re-enter your password",
                            type: unref(showPasswordConfirm) ? "text" : "password",
                            ui: { trailing: "pe-1" },
                            class: "w-full"
                          }, {
                            trailing: withCtx(() => [
                              createVNode(_component_UButton, {
                                color: "neutral",
                                variant: "link",
                                size: "sm",
                                icon: unref(showPasswordConfirm) ? "i-lucide-eye-off" : "i-lucide-eye",
                                "aria-label": unref(showPasswordConfirm) ? "Hide password" : "Show password",
                                "aria-pressed": unref(showPasswordConfirm),
                                onClick: ($event) => showPasswordConfirm.value = !unref(showPasswordConfirm)
                              }, null, 8, ["icon", "aria-label", "aria-pressed", "onClick"])
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue", "type"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UButton, {
                        type: "submit",
                        size: "lg",
                        icon: "i-lucide-rocket",
                        class: "w-full mt-4 block",
                        disabled: unref(score) < 4,
                        "loading-auto": ""
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Register ")
                        ]),
                        _: 1
                      }, 8, ["disabled"])
                    ]),
                    _: 1
                  }, 8, ["state"])
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=register-12dxJehC.mjs.map
