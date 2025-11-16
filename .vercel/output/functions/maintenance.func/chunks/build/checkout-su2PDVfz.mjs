import { _ as _sfc_main$a } from './Container-DJ2zbRf-.mjs';
import { _ as _sfc_main$b } from './Breadcrumb-BWHX8r5o.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, mergeModels, unref, isRef, createTextVNode, createVNode, createBlock, createCommentVNode, openBlock, useSlots, useModel, renderSlot, Fragment, toDisplayString, renderList, useId, resolveDynamicComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrRenderSlot, ssrInterpolate, ssrRenderVNode } from 'vue/server-renderer';
import { useForwardProps, StepperRoot, StepperItem, StepperTrigger, StepperIndicator, StepperSeparator, StepperTitle, StepperDescription, useForwardPropsEmits, RadioGroupRoot, Label, RadioGroupItem, RadioGroupIndicator } from 'reka-ui';
import { reactivePick } from '@vueuse/core';
import { a as useToast, b as useRouter, s as useSeoMeta, e as _sfc_main$8$1, o as useAppConfig, t as tv, d as _sfc_main$e, f as __nuxt_component_6$1, q as useFormField, r as get } from './server.mjs';
import { _ as _sfc_main$c } from './Badge-DZtstYnH.mjs';
import { _ as _sfc_main$d } from './FormField-D7jUvIQZ.mjs';
import { _ as _sfc_main$f } from './Input-DomsB7QD.mjs';
import { _ as _sfc_main$g } from './Checkbox-B-SowvkF.mjs';
import { _ as _sfc_main$h } from './SelectMenu-C5QjXK1B.mjs';
import { _ as _sfc_main$i } from './Textarea-BN1wHgLR.mjs';
import { u as useCart } from './useCart-YbNJw6-2.mjs';
import { u as usePayment } from './usePayment-BVr1DIZC.mjs';
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

const theme$1 = {
  "slots": {
    "root": "flex gap-4",
    "header": "flex",
    "item": "group text-center relative w-full",
    "container": "relative",
    "trigger": "rounded-full font-medium text-center align-middle flex items-center justify-center font-semibold group-data-[state=completed]:text-inverted group-data-[state=active]:text-inverted text-muted bg-elevated focus-visible:outline-2 focus-visible:outline-offset-2",
    "indicator": "flex items-center justify-center size-full",
    "icon": "shrink-0",
    "separator": "absolute rounded-full group-data-[disabled]:opacity-75 bg-accented",
    "wrapper": "",
    "title": "font-medium text-default",
    "description": "text-muted text-wrap",
    "content": "size-full"
  },
  "variants": {
    "orientation": {
      "horizontal": {
        "root": "flex-col",
        "container": "flex justify-center",
        "separator": "top-[calc(50%-2px)] h-0.5",
        "wrapper": "mt-1"
      },
      "vertical": {
        "header": "flex-col gap-4",
        "item": "flex text-start",
        "separator": "start-[calc(50%-1px)] -bottom-[10px] w-0.5"
      }
    },
    "size": {
      "xs": {
        "trigger": "size-6 text-xs",
        "icon": "size-3",
        "title": "text-xs",
        "description": "text-xs",
        "wrapper": "mt-1.5"
      },
      "sm": {
        "trigger": "size-8 text-sm",
        "icon": "size-4",
        "title": "text-xs",
        "description": "text-xs",
        "wrapper": "mt-2"
      },
      "md": {
        "trigger": "size-10 text-base",
        "icon": "size-5",
        "title": "text-sm",
        "description": "text-sm",
        "wrapper": "mt-2.5"
      },
      "lg": {
        "trigger": "size-12 text-lg",
        "icon": "size-6",
        "title": "text-base",
        "description": "text-base",
        "wrapper": "mt-3"
      },
      "xl": {
        "trigger": "size-14 text-xl",
        "icon": "size-7",
        "title": "text-lg",
        "description": "text-lg",
        "wrapper": "mt-3.5"
      }
    },
    "color": {
      "primary": {
        "trigger": "group-data-[state=completed]:bg-primary group-data-[state=active]:bg-primary focus-visible:outline-primary",
        "separator": "group-data-[state=completed]:bg-primary"
      },
      "secondary": {
        "trigger": "group-data-[state=completed]:bg-secondary group-data-[state=active]:bg-secondary focus-visible:outline-secondary",
        "separator": "group-data-[state=completed]:bg-secondary"
      },
      "success": {
        "trigger": "group-data-[state=completed]:bg-success group-data-[state=active]:bg-success focus-visible:outline-success",
        "separator": "group-data-[state=completed]:bg-success"
      },
      "info": {
        "trigger": "group-data-[state=completed]:bg-info group-data-[state=active]:bg-info focus-visible:outline-info",
        "separator": "group-data-[state=completed]:bg-info"
      },
      "warning": {
        "trigger": "group-data-[state=completed]:bg-warning group-data-[state=active]:bg-warning focus-visible:outline-warning",
        "separator": "group-data-[state=completed]:bg-warning"
      },
      "error": {
        "trigger": "group-data-[state=completed]:bg-error group-data-[state=active]:bg-error focus-visible:outline-error",
        "separator": "group-data-[state=completed]:bg-error"
      },
      "neutral": {
        "trigger": "group-data-[state=completed]:bg-inverted group-data-[state=active]:bg-inverted focus-visible:outline-inverted",
        "separator": "group-data-[state=completed]:bg-inverted"
      }
    }
  },
  "compoundVariants": [
    {
      "orientation": "horizontal",
      "size": "xs",
      "class": {
        "separator": "start-[calc(50%+16px)] end-[calc(-50%+16px)]"
      }
    },
    {
      "orientation": "horizontal",
      "size": "sm",
      "class": {
        "separator": "start-[calc(50%+20px)] end-[calc(-50%+20px)]"
      }
    },
    {
      "orientation": "horizontal",
      "size": "md",
      "class": {
        "separator": "start-[calc(50%+28px)] end-[calc(-50%+28px)]"
      }
    },
    {
      "orientation": "horizontal",
      "size": "lg",
      "class": {
        "separator": "start-[calc(50%+32px)] end-[calc(-50%+32px)]"
      }
    },
    {
      "orientation": "horizontal",
      "size": "xl",
      "class": {
        "separator": "start-[calc(50%+36px)] end-[calc(-50%+36px)]"
      }
    },
    {
      "orientation": "vertical",
      "size": "xs",
      "class": {
        "separator": "top-[30px]",
        "item": "gap-1.5"
      }
    },
    {
      "orientation": "vertical",
      "size": "sm",
      "class": {
        "separator": "top-[38px]",
        "item": "gap-2"
      }
    },
    {
      "orientation": "vertical",
      "size": "md",
      "class": {
        "separator": "top-[46px]",
        "item": "gap-2.5"
      }
    },
    {
      "orientation": "vertical",
      "size": "lg",
      "class": {
        "separator": "top-[54px]",
        "item": "gap-3"
      }
    },
    {
      "orientation": "vertical",
      "size": "xl",
      "class": {
        "separator": "top-[62px]",
        "item": "gap-3.5"
      }
    }
  ],
  "defaultVariants": {
    "size": "sm",
    "color": "neutral"
  }
};
const _sfc_main$9 = {
  __name: "UStepper",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    as: { type: null, required: false },
    items: { type: Array, required: true },
    size: { type: null, required: false },
    color: { type: null, required: false },
    orientation: { type: null, required: false, default: "horizontal" },
    defaultValue: { type: [String, Number], required: false },
    disabled: { type: Boolean, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    linear: { type: Boolean, required: false, default: true }
  }, {
    "modelValue": { type: [String, Number] },
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["next", "prev"], ["update:modelValue"]),
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const modelValue = useModel(__props, "modelValue");
    const appConfig = useAppConfig();
    const rootProps = useForwardProps(reactivePick(props, "as", "orientation", "linear"));
    const ui = computed(() => tv({ extend: tv(theme$1), ...appConfig.ui?.stepper || {} })({
      orientation: props.orientation,
      size: props.size,
      color: props.color
    }));
    const currentStepIndex = computed({
      get() {
        const value = modelValue.value ?? props.defaultValue;
        return (typeof value === "string" ? props.items.findIndex((item) => item.value === value) : value) ?? 0;
      },
      set(value) {
        modelValue.value = props.items?.[value]?.value ?? value;
      }
    });
    const currentStep = computed(() => props.items?.[currentStepIndex.value]);
    const hasNext = computed(() => currentStepIndex.value < props.items?.length - 1);
    const hasPrev = computed(() => currentStepIndex.value > 0);
    __expose({
      next() {
        if (hasNext.value) {
          currentStepIndex.value += 1;
          emits("next", currentStep.value);
        }
      },
      prev() {
        if (hasPrev.value) {
          currentStepIndex.value -= 1;
          emits("prev", currentStep.value);
        }
      },
      hasNext,
      hasPrev
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(StepperRoot), mergeProps(unref(rootProps), {
        modelValue: currentStepIndex.value,
        "onUpdate:modelValue": ($event) => currentStepIndex.value = $event,
        class: ui.value.root({ class: [props.ui?.root, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="${ssrRenderClass(ui.value.header({ class: props.ui?.header }))}"${_scopeId}><!--[-->`);
            ssrRenderList(__props.items, (item, count) => {
              _push2(ssrRenderComponent(unref(StepperItem), {
                key: item.value ?? count,
                step: count,
                disabled: item.disabled || props.disabled,
                class: ui.value.item({ class: [props.ui?.item, item.ui?.item, item.class] })
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="${ssrRenderClass(ui.value.container({ class: [props.ui?.container, item.ui?.container] }))}"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(StepperTrigger), {
                      class: ui.value.trigger({ class: [props.ui?.trigger, item.ui?.trigger] })
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(StepperIndicator), {
                            class: ui.value.indicator({ class: [props.ui?.indicator, item.ui?.indicator] })
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                ssrRenderSlot(_ctx.$slots, "indicator", { item }, () => {
                                  if (item.icon) {
                                    _push5(ssrRenderComponent(_sfc_main$e, {
                                      name: item.icon,
                                      class: ui.value.icon({ class: [props.ui?.icon, item.ui?.icon] })
                                    }, null, _parent5, _scopeId4));
                                  } else {
                                    _push5(`<!--[-->${ssrInterpolate(count + 1)}<!--]-->`);
                                  }
                                }, _push5, _parent5, _scopeId4);
                              } else {
                                return [
                                  renderSlot(_ctx.$slots, "indicator", { item }, () => [
                                    item.icon ? (openBlock(), createBlock(_sfc_main$e, {
                                      key: 0,
                                      name: item.icon,
                                      class: ui.value.icon({ class: [props.ui?.icon, item.ui?.icon] })
                                    }, null, 8, ["name", "class"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                      createTextVNode(toDisplayString(count + 1), 1)
                                    ], 64))
                                  ])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(StepperIndicator), {
                              class: ui.value.indicator({ class: [props.ui?.indicator, item.ui?.indicator] })
                            }, {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, "indicator", { item }, () => [
                                  item.icon ? (openBlock(), createBlock(_sfc_main$e, {
                                    key: 0,
                                    name: item.icon,
                                    class: ui.value.icon({ class: [props.ui?.icon, item.ui?.icon] })
                                  }, null, 8, ["name", "class"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                    createTextVNode(toDisplayString(count + 1), 1)
                                  ], 64))
                                ])
                              ]),
                              _: 2
                            }, 1032, ["class"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    if (count < __props.items.length - 1) {
                      _push3(ssrRenderComponent(unref(StepperSeparator), {
                        class: ui.value.separator({ class: [props.ui?.separator, item.ui?.separator] })
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div><div class="${ssrRenderClass(ui.value.wrapper({ class: [props.ui?.wrapper, item.ui?.wrapper] }))}"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(StepperTitle), {
                      as: "div",
                      class: ui.value.title({ class: [props.ui?.title, item.ui?.title] })
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          ssrRenderSlot(_ctx.$slots, "title", { item }, () => {
                            _push4(`${ssrInterpolate(item.title)}`);
                          }, _push4, _parent4, _scopeId3);
                        } else {
                          return [
                            renderSlot(_ctx.$slots, "title", { item }, () => [
                              createTextVNode(toDisplayString(item.title), 1)
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(StepperDescription), {
                      as: "div",
                      class: ui.value.description({ class: [props.ui?.description, item.ui?.description] })
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          ssrRenderSlot(_ctx.$slots, "description", { item }, () => {
                            _push4(`${ssrInterpolate(item.description)}`);
                          }, _push4, _parent4, _scopeId3);
                        } else {
                          return [
                            renderSlot(_ctx.$slots, "description", { item }, () => [
                              createTextVNode(toDisplayString(item.description), 1)
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", {
                        class: ui.value.container({ class: [props.ui?.container, item.ui?.container] })
                      }, [
                        createVNode(unref(StepperTrigger), {
                          class: ui.value.trigger({ class: [props.ui?.trigger, item.ui?.trigger] })
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(StepperIndicator), {
                              class: ui.value.indicator({ class: [props.ui?.indicator, item.ui?.indicator] })
                            }, {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, "indicator", { item }, () => [
                                  item.icon ? (openBlock(), createBlock(_sfc_main$e, {
                                    key: 0,
                                    name: item.icon,
                                    class: ui.value.icon({ class: [props.ui?.icon, item.ui?.icon] })
                                  }, null, 8, ["name", "class"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                    createTextVNode(toDisplayString(count + 1), 1)
                                  ], 64))
                                ])
                              ]),
                              _: 2
                            }, 1032, ["class"])
                          ]),
                          _: 2
                        }, 1032, ["class"]),
                        count < __props.items.length - 1 ? (openBlock(), createBlock(unref(StepperSeparator), {
                          key: 0,
                          class: ui.value.separator({ class: [props.ui?.separator, item.ui?.separator] })
                        }, null, 8, ["class"])) : createCommentVNode("", true)
                      ], 2),
                      createVNode("div", {
                        class: ui.value.wrapper({ class: [props.ui?.wrapper, item.ui?.wrapper] })
                      }, [
                        createVNode(unref(StepperTitle), {
                          as: "div",
                          class: ui.value.title({ class: [props.ui?.title, item.ui?.title] })
                        }, {
                          default: withCtx(() => [
                            renderSlot(_ctx.$slots, "title", { item }, () => [
                              createTextVNode(toDisplayString(item.title), 1)
                            ])
                          ]),
                          _: 2
                        }, 1032, ["class"]),
                        createVNode(unref(StepperDescription), {
                          as: "div",
                          class: ui.value.description({ class: [props.ui?.description, item.ui?.description] })
                        }, {
                          default: withCtx(() => [
                            renderSlot(_ctx.$slots, "description", { item }, () => [
                              createTextVNode(toDisplayString(item.description), 1)
                            ])
                          ]),
                          _: 2
                        }, 1032, ["class"])
                      ], 2)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div>`);
            if (currentStep.value?.content || !!slots.content || currentStep.value?.slot) {
              _push2(`<div class="${ssrRenderClass(ui.value.content({ class: props.ui?.content }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, currentStep.value?.slot || "content", { item: currentStep.value }, () => {
                _push2(`${ssrInterpolate(currentStep.value?.content)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", {
                class: ui.value.header({ class: props.ui?.header })
              }, [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.items, (item, count) => {
                  return openBlock(), createBlock(unref(StepperItem), {
                    key: item.value ?? count,
                    step: count,
                    disabled: item.disabled || props.disabled,
                    class: ui.value.item({ class: [props.ui?.item, item.ui?.item, item.class] })
                  }, {
                    default: withCtx(() => [
                      createVNode("div", {
                        class: ui.value.container({ class: [props.ui?.container, item.ui?.container] })
                      }, [
                        createVNode(unref(StepperTrigger), {
                          class: ui.value.trigger({ class: [props.ui?.trigger, item.ui?.trigger] })
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(StepperIndicator), {
                              class: ui.value.indicator({ class: [props.ui?.indicator, item.ui?.indicator] })
                            }, {
                              default: withCtx(() => [
                                renderSlot(_ctx.$slots, "indicator", { item }, () => [
                                  item.icon ? (openBlock(), createBlock(_sfc_main$e, {
                                    key: 0,
                                    name: item.icon,
                                    class: ui.value.icon({ class: [props.ui?.icon, item.ui?.icon] })
                                  }, null, 8, ["name", "class"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                    createTextVNode(toDisplayString(count + 1), 1)
                                  ], 64))
                                ])
                              ]),
                              _: 2
                            }, 1032, ["class"])
                          ]),
                          _: 2
                        }, 1032, ["class"]),
                        count < __props.items.length - 1 ? (openBlock(), createBlock(unref(StepperSeparator), {
                          key: 0,
                          class: ui.value.separator({ class: [props.ui?.separator, item.ui?.separator] })
                        }, null, 8, ["class"])) : createCommentVNode("", true)
                      ], 2),
                      createVNode("div", {
                        class: ui.value.wrapper({ class: [props.ui?.wrapper, item.ui?.wrapper] })
                      }, [
                        createVNode(unref(StepperTitle), {
                          as: "div",
                          class: ui.value.title({ class: [props.ui?.title, item.ui?.title] })
                        }, {
                          default: withCtx(() => [
                            renderSlot(_ctx.$slots, "title", { item }, () => [
                              createTextVNode(toDisplayString(item.title), 1)
                            ])
                          ]),
                          _: 2
                        }, 1032, ["class"]),
                        createVNode(unref(StepperDescription), {
                          as: "div",
                          class: ui.value.description({ class: [props.ui?.description, item.ui?.description] })
                        }, {
                          default: withCtx(() => [
                            renderSlot(_ctx.$slots, "description", { item }, () => [
                              createTextVNode(toDisplayString(item.description), 1)
                            ])
                          ]),
                          _: 2
                        }, 1032, ["class"])
                      ], 2)
                    ]),
                    _: 2
                  }, 1032, ["step", "disabled", "class"]);
                }), 128))
              ], 2),
              currentStep.value?.content || !!slots.content || currentStep.value?.slot ? (openBlock(), createBlock("div", {
                key: 0,
                class: ui.value.content({ class: props.ui?.content })
              }, [
                renderSlot(_ctx.$slots, currentStep.value?.slot || "content", { item: currentStep.value }, () => [
                  createTextVNode(toDisplayString(currentStep.value?.content), 1)
                ])
              ], 2)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Stepper.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "ContactInformationForm",
  __ssrInlineRender: true,
  props: {
    modelValue: {}
  },
  emits: ["update:modelValue", "next"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const updateField = (field, value) => {
      emit("update:modelValue", {
        ...props.modelValue,
        [field]: value
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UBadge = _sfc_main$c;
      const _component_UFormField = _sfc_main$d;
      const _component_UInput = _sfc_main$f;
      const _component_UCheckbox = _sfc_main$g;
      const _component_UButton = _sfc_main$8$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6" }, _attrs))}><div class="flex items-center justify-between mb-6"><h2 class="text-xl font-bold text-gray-900 dark:text-white">Contact Information</h2>`);
      _push(ssrRenderComponent(_component_UBadge, {
        color: "primary",
        variant: "soft"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Step 1 of 3`);
          } else {
            return [
              createTextVNode("Step 1 of 3")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="space-y-4">`);
      _push(ssrRenderComponent(_component_UFormField, {
        label: "Email Address",
        required: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UInput, {
              "model-value": __props.modelValue.email,
              "onUpdate:modelValue": ($event) => updateField("email", $event),
              type: "email",
              placeholder: "john@example.com",
              size: "lg",
              icon: "i-heroicons-envelope"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UInput, {
                "model-value": __props.modelValue.email,
                "onUpdate:modelValue": ($event) => updateField("email", $event),
                type: "email",
                placeholder: "john@example.com",
                size: "lg",
                icon: "i-heroicons-envelope"
              }, null, 8, ["model-value", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UFormField, {
        label: "Phone Number",
        required: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UInput, {
              "model-value": __props.modelValue.phone,
              "onUpdate:modelValue": ($event) => updateField("phone", $event),
              type: "tel",
              placeholder: "+1 (555) 000-0000",
              size: "lg",
              icon: "i-heroicons-phone"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UInput, {
                "model-value": __props.modelValue.phone,
                "onUpdate:modelValue": ($event) => updateField("phone", $event),
                type: "tel",
                placeholder: "+1 (555) 000-0000",
                size: "lg",
                icon: "i-heroicons-phone"
              }, null, 8, ["model-value", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_UCheckbox, {
        "model-value": __props.modelValue.subscribeNewsletter,
        "onUpdate:modelValue": ($event) => updateField("subscribeNewsletter", $event)
      }, null, _parent));
      _push(`<label class="text-sm text-gray-600 dark:text-gray-400"> Email me with news and offers </label></div></div><div class="mt-6 flex justify-end">`);
      _push(ssrRenderComponent(_component_UButton, {
        onClick: ($event) => _ctx.$emit("next"),
        size: "lg",
        icon: "i-heroicons-arrow-right",
        trailing: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Continue to Shipping `);
          } else {
            return [
              createTextVNode(" Continue to Shipping ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Checkout/ContactInformationForm.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$8, { __name: "CheckoutContactInformationForm" });
const theme = {
  "slots": {
    "root": "relative",
    "fieldset": "flex gap-x-2",
    "legend": "mb-1 block font-medium text-default",
    "item": "flex items-start",
    "container": "flex items-center",
    "base": "rounded-full ring ring-inset ring-accented overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2",
    "indicator": "flex items-center justify-center size-full after:bg-default after:rounded-full",
    "wrapper": "w-full",
    "label": "block font-medium text-default",
    "description": "text-muted"
  },
  "variants": {
    "color": {
      "primary": {
        "base": "focus-visible:outline-primary",
        "indicator": "bg-primary"
      },
      "secondary": {
        "base": "focus-visible:outline-secondary",
        "indicator": "bg-secondary"
      },
      "success": {
        "base": "focus-visible:outline-success",
        "indicator": "bg-success"
      },
      "info": {
        "base": "focus-visible:outline-info",
        "indicator": "bg-info"
      },
      "warning": {
        "base": "focus-visible:outline-warning",
        "indicator": "bg-warning"
      },
      "error": {
        "base": "focus-visible:outline-error",
        "indicator": "bg-error"
      },
      "neutral": {
        "base": "focus-visible:outline-inverted",
        "indicator": "bg-inverted"
      }
    },
    "variant": {
      "list": {
        "item": ""
      },
      "card": {
        "item": "border border-muted rounded-lg"
      },
      "table": {
        "item": "border border-muted"
      }
    },
    "orientation": {
      "horizontal": {
        "fieldset": "flex-row"
      },
      "vertical": {
        "fieldset": "flex-col"
      }
    },
    "indicator": {
      "start": {
        "item": "flex-row",
        "wrapper": "ms-2"
      },
      "end": {
        "item": "flex-row-reverse",
        "wrapper": "me-2"
      },
      "hidden": {
        "base": "sr-only",
        "wrapper": "text-center"
      }
    },
    "size": {
      "xs": {
        "fieldset": "gap-y-0.5",
        "legend": "text-xs",
        "base": "size-3",
        "item": "text-xs",
        "container": "h-4",
        "indicator": "after:size-1"
      },
      "sm": {
        "fieldset": "gap-y-0.5",
        "legend": "text-xs",
        "base": "size-3.5",
        "item": "text-xs",
        "container": "h-4",
        "indicator": "after:size-1"
      },
      "md": {
        "fieldset": "gap-y-1",
        "legend": "text-sm",
        "base": "size-4",
        "item": "text-sm",
        "container": "h-5",
        "indicator": "after:size-1.5"
      },
      "lg": {
        "fieldset": "gap-y-1",
        "legend": "text-sm",
        "base": "size-4.5",
        "item": "text-sm",
        "container": "h-5",
        "indicator": "after:size-1.5"
      },
      "xl": {
        "fieldset": "gap-y-1.5",
        "legend": "text-base",
        "base": "size-5",
        "item": "text-base",
        "container": "h-6",
        "indicator": "after:size-2"
      }
    },
    "disabled": {
      "true": {
        "base": "cursor-not-allowed opacity-75",
        "label": "cursor-not-allowed opacity-75"
      }
    },
    "required": {
      "true": {
        "legend": "after:content-['*'] after:ms-0.5 after:text-error"
      }
    }
  },
  "compoundVariants": [
    {
      "size": "xs",
      "variant": [
        "card",
        "table"
      ],
      "class": {
        "item": "p-2.5"
      }
    },
    {
      "size": "sm",
      "variant": [
        "card",
        "table"
      ],
      "class": {
        "item": "p-3"
      }
    },
    {
      "size": "md",
      "variant": [
        "card",
        "table"
      ],
      "class": {
        "item": "p-3.5"
      }
    },
    {
      "size": "lg",
      "variant": [
        "card",
        "table"
      ],
      "class": {
        "item": "p-4"
      }
    },
    {
      "size": "xl",
      "variant": [
        "card",
        "table"
      ],
      "class": {
        "item": "p-4.5"
      }
    },
    {
      "orientation": "horizontal",
      "variant": "table",
      "class": {
        "item": "first-of-type:rounded-s-lg last-of-type:rounded-e-lg",
        "fieldset": "gap-0 -space-x-px"
      }
    },
    {
      "orientation": "vertical",
      "variant": "table",
      "class": {
        "item": "first-of-type:rounded-t-lg last-of-type:rounded-b-lg",
        "fieldset": "gap-0 -space-y-px"
      }
    },
    {
      "color": "primary",
      "variant": "card",
      "class": {
        "item": "has-data-[state=checked]:border-primary"
      }
    },
    {
      "color": "secondary",
      "variant": "card",
      "class": {
        "item": "has-data-[state=checked]:border-secondary"
      }
    },
    {
      "color": "success",
      "variant": "card",
      "class": {
        "item": "has-data-[state=checked]:border-success"
      }
    },
    {
      "color": "info",
      "variant": "card",
      "class": {
        "item": "has-data-[state=checked]:border-info"
      }
    },
    {
      "color": "warning",
      "variant": "card",
      "class": {
        "item": "has-data-[state=checked]:border-warning"
      }
    },
    {
      "color": "error",
      "variant": "card",
      "class": {
        "item": "has-data-[state=checked]:border-error"
      }
    },
    {
      "color": "neutral",
      "variant": "card",
      "class": {
        "item": "has-data-[state=checked]:border-inverted"
      }
    },
    {
      "color": "primary",
      "variant": "table",
      "class": {
        "item": "has-data-[state=checked]:bg-primary/10 has-data-[state=checked]:border-primary/50 has-data-[state=checked]:z-[1]"
      }
    },
    {
      "color": "secondary",
      "variant": "table",
      "class": {
        "item": "has-data-[state=checked]:bg-secondary/10 has-data-[state=checked]:border-secondary/50 has-data-[state=checked]:z-[1]"
      }
    },
    {
      "color": "success",
      "variant": "table",
      "class": {
        "item": "has-data-[state=checked]:bg-success/10 has-data-[state=checked]:border-success/50 has-data-[state=checked]:z-[1]"
      }
    },
    {
      "color": "info",
      "variant": "table",
      "class": {
        "item": "has-data-[state=checked]:bg-info/10 has-data-[state=checked]:border-info/50 has-data-[state=checked]:z-[1]"
      }
    },
    {
      "color": "warning",
      "variant": "table",
      "class": {
        "item": "has-data-[state=checked]:bg-warning/10 has-data-[state=checked]:border-warning/50 has-data-[state=checked]:z-[1]"
      }
    },
    {
      "color": "error",
      "variant": "table",
      "class": {
        "item": "has-data-[state=checked]:bg-error/10 has-data-[state=checked]:border-error/50 has-data-[state=checked]:z-[1]"
      }
    },
    {
      "color": "neutral",
      "variant": "table",
      "class": {
        "item": "has-data-[state=checked]:bg-elevated has-data-[state=checked]:border-inverted/50 has-data-[state=checked]:z-[1]"
      }
    },
    {
      "variant": [
        "card",
        "table"
      ],
      "disabled": true,
      "class": {
        "item": "cursor-not-allowed opacity-75"
      }
    }
  ],
  "defaultVariants": {
    "size": "sm",
    "color": "neutral",
    "variant": "list",
    "orientation": "vertical",
    "indicator": "start"
  }
};
const _sfc_main$7 = {
  __name: "URadioGroup",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    legend: { type: String, required: false },
    valueKey: { type: null, required: false, default: "value" },
    labelKey: { type: null, required: false, default: "label" },
    descriptionKey: { type: null, required: false, default: "description" },
    items: { type: null, required: false },
    modelValue: { type: null, required: false },
    defaultValue: { type: null, required: false },
    size: { type: null, required: false },
    variant: { type: null, required: false },
    color: { type: null, required: false },
    orientation: { type: null, required: false, default: "vertical" },
    indicator: { type: null, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    disabled: { type: Boolean, required: false },
    loop: { type: Boolean, required: false },
    name: { type: String, required: false },
    required: { type: Boolean, required: false }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const appConfig = useAppConfig();
    const rootProps = useForwardPropsEmits(reactivePick(props, "as", "loop", "required"), emits);
    const { emitFormChange, emitFormInput, color, name, size, id: _id, disabled, ariaAttrs } = useFormField(props, { bind: false });
    const id = _id.value ?? useId();
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.radioGroup || {} })({
      size: size.value,
      color: color.value,
      disabled: disabled.value,
      required: props.required,
      orientation: props.orientation,
      variant: props.variant,
      indicator: props.indicator
    }));
    function normalizeItem(item) {
      if (item === null) {
        return {
          id: `${id}:null`,
          value: void 0,
          label: void 0
        };
      }
      if (typeof item === "string" || typeof item === "number" || typeof item === "bigint") {
        return {
          id: `${id}:${item}`,
          value: String(item),
          label: String(item)
        };
      }
      const value = get(item, props.valueKey);
      const label = get(item, props.labelKey);
      const description = get(item, props.descriptionKey);
      return {
        ...item,
        value,
        label,
        description,
        id: `${id}:${value}`
      };
    }
    const normalizedItems = computed(() => {
      if (!props.items) {
        return [];
      }
      return props.items.map(normalizeItem);
    });
    function onUpdate(value) {
      const event = new Event("change", { target: { value } });
      emits("change", event);
      emitFormChange();
      emitFormInput();
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(RadioGroupRoot), mergeProps({ id: unref(id) }, unref(rootProps), {
        "model-value": __props.modelValue,
        "default-value": __props.defaultValue,
        orientation: __props.orientation,
        name: unref(name),
        disabled: unref(disabled),
        class: ui.value.root({ class: [props.ui?.root, props.class] }),
        "onUpdate:modelValue": onUpdate
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<fieldset${ssrRenderAttrs(mergeProps({
              class: ui.value.fieldset({ class: props.ui?.fieldset })
            }, unref(ariaAttrs)))}${_scopeId}>`);
            if (__props.legend || !!slots.legend) {
              _push2(`<legend class="${ssrRenderClass(ui.value.legend({ class: props.ui?.legend }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "legend", {}, () => {
                _push2(`${ssrInterpolate(__props.legend)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</legend>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(normalizedItems.value, (item) => {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(!__props.variant || __props.variant === "list" ? "div" : unref(Label)), {
                key: item.value,
                class: ui.value.item({ class: [props.ui?.item, item.ui?.item, item.class] })
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="${ssrRenderClass(ui.value.container({ class: [props.ui?.container, item.ui?.container] }))}"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(RadioGroupItem), {
                      id: item.id,
                      value: item.value,
                      disabled: item.disabled,
                      class: ui.value.base({ class: [props.ui?.base, item.ui?.base], disabled: item.disabled })
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(RadioGroupIndicator), {
                            class: ui.value.indicator({ class: [props.ui?.indicator, item.ui?.indicator] })
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(RadioGroupIndicator), {
                              class: ui.value.indicator({ class: [props.ui?.indicator, item.ui?.indicator] })
                            }, null, 8, ["class"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                    if (item.label || !!slots.label || (item.description || !!slots.description)) {
                      _push3(`<div class="${ssrRenderClass(ui.value.wrapper({ class: [props.ui?.wrapper, item.ui?.wrapper] }))}"${_scopeId2}>`);
                      if (item.label || !!slots.label) {
                        ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(!__props.variant || __props.variant === "list" ? unref(Label) : "p"), {
                          for: item.id,
                          class: ui.value.label({ class: [props.ui?.label, item.ui?.label] })
                        }, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              ssrRenderSlot(_ctx.$slots, "label", {
                                item,
                                modelValue: __props.modelValue
                              }, () => {
                                _push4(`${ssrInterpolate(item.label)}`);
                              }, _push4, _parent4, _scopeId3);
                            } else {
                              return [
                                renderSlot(_ctx.$slots, "label", {
                                  item,
                                  modelValue: __props.modelValue
                                }, () => [
                                  createTextVNode(toDisplayString(item.label), 1)
                                ])
                              ];
                            }
                          }),
                          _: 2
                        }), _parent3, _scopeId2);
                      } else {
                        _push3(`<!---->`);
                      }
                      if (item.description || !!slots.description) {
                        _push3(`<p class="${ssrRenderClass(ui.value.description({ class: [props.ui?.description, item.ui?.description] }))}"${_scopeId2}>`);
                        ssrRenderSlot(_ctx.$slots, "description", {
                          item,
                          modelValue: __props.modelValue
                        }, () => {
                          _push3(`${ssrInterpolate(item.description)}`);
                        }, _push3, _parent3, _scopeId2);
                        _push3(`</p>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      createVNode("div", {
                        class: ui.value.container({ class: [props.ui?.container, item.ui?.container] })
                      }, [
                        createVNode(unref(RadioGroupItem), {
                          id: item.id,
                          value: item.value,
                          disabled: item.disabled,
                          class: ui.value.base({ class: [props.ui?.base, item.ui?.base], disabled: item.disabled })
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(RadioGroupIndicator), {
                              class: ui.value.indicator({ class: [props.ui?.indicator, item.ui?.indicator] })
                            }, null, 8, ["class"])
                          ]),
                          _: 2
                        }, 1032, ["id", "value", "disabled", "class"])
                      ], 2),
                      item.label || !!slots.label || (item.description || !!slots.description) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: ui.value.wrapper({ class: [props.ui?.wrapper, item.ui?.wrapper] })
                      }, [
                        item.label || !!slots.label ? (openBlock(), createBlock(resolveDynamicComponent(!__props.variant || __props.variant === "list" ? unref(Label) : "p"), {
                          key: 0,
                          for: item.id,
                          class: ui.value.label({ class: [props.ui?.label, item.ui?.label] })
                        }, {
                          default: withCtx(() => [
                            renderSlot(_ctx.$slots, "label", {
                              item,
                              modelValue: __props.modelValue
                            }, () => [
                              createTextVNode(toDisplayString(item.label), 1)
                            ])
                          ]),
                          _: 2
                        }, 1032, ["for", "class"])) : createCommentVNode("", true),
                        item.description || !!slots.description ? (openBlock(), createBlock("p", {
                          key: 1,
                          class: ui.value.description({ class: [props.ui?.description, item.ui?.description] })
                        }, [
                          renderSlot(_ctx.$slots, "description", {
                            item,
                            modelValue: __props.modelValue
                          }, () => [
                            createTextVNode(toDisplayString(item.description), 1)
                          ])
                        ], 2)) : createCommentVNode("", true)
                      ], 2)) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 2
              }), _parent2, _scopeId);
            });
            _push2(`<!--]--></fieldset>`);
          } else {
            return [
              createVNode("fieldset", mergeProps({
                class: ui.value.fieldset({ class: props.ui?.fieldset })
              }, unref(ariaAttrs)), [
                __props.legend || !!slots.legend ? (openBlock(), createBlock("legend", {
                  key: 0,
                  class: ui.value.legend({ class: props.ui?.legend })
                }, [
                  renderSlot(_ctx.$slots, "legend", {}, () => [
                    createTextVNode(toDisplayString(__props.legend), 1)
                  ])
                ], 2)) : createCommentVNode("", true),
                (openBlock(true), createBlock(Fragment, null, renderList(normalizedItems.value, (item) => {
                  return openBlock(), createBlock(resolveDynamicComponent(!__props.variant || __props.variant === "list" ? "div" : unref(Label)), {
                    key: item.value,
                    class: ui.value.item({ class: [props.ui?.item, item.ui?.item, item.class] })
                  }, {
                    default: withCtx(() => [
                      createVNode("div", {
                        class: ui.value.container({ class: [props.ui?.container, item.ui?.container] })
                      }, [
                        createVNode(unref(RadioGroupItem), {
                          id: item.id,
                          value: item.value,
                          disabled: item.disabled,
                          class: ui.value.base({ class: [props.ui?.base, item.ui?.base], disabled: item.disabled })
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(RadioGroupIndicator), {
                              class: ui.value.indicator({ class: [props.ui?.indicator, item.ui?.indicator] })
                            }, null, 8, ["class"])
                          ]),
                          _: 2
                        }, 1032, ["id", "value", "disabled", "class"])
                      ], 2),
                      item.label || !!slots.label || (item.description || !!slots.description) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: ui.value.wrapper({ class: [props.ui?.wrapper, item.ui?.wrapper] })
                      }, [
                        item.label || !!slots.label ? (openBlock(), createBlock(resolveDynamicComponent(!__props.variant || __props.variant === "list" ? unref(Label) : "p"), {
                          key: 0,
                          for: item.id,
                          class: ui.value.label({ class: [props.ui?.label, item.ui?.label] })
                        }, {
                          default: withCtx(() => [
                            renderSlot(_ctx.$slots, "label", {
                              item,
                              modelValue: __props.modelValue
                            }, () => [
                              createTextVNode(toDisplayString(item.label), 1)
                            ])
                          ]),
                          _: 2
                        }, 1032, ["for", "class"])) : createCommentVNode("", true),
                        item.description || !!slots.description ? (openBlock(), createBlock("p", {
                          key: 1,
                          class: ui.value.description({ class: [props.ui?.description, item.ui?.description] })
                        }, [
                          renderSlot(_ctx.$slots, "description", {
                            item,
                            modelValue: __props.modelValue
                          }, () => [
                            createTextVNode(toDisplayString(item.description), 1)
                          ])
                        ], 2)) : createCommentVNode("", true)
                      ], 2)) : createCommentVNode("", true)
                    ]),
                    _: 2
                  }, 1032, ["class"]);
                }), 128))
              ], 16)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/RadioGroup.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "ShippingAddressForm",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    selectedShippingMethod: {},
    shippingMethods: {}
  },
  emits: ["update:modelValue", "update:selectedShippingMethod", "next", "previous"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const countries = [
      { label: "United States", value: "US" },
      { label: "Canada", value: "CA" },
      { label: "United Kingdom", value: "UK" },
      { label: "Australia", value: "AU" },
      { label: "Germany", value: "DE" },
      { label: "France", value: "FR" }
    ];
    const states = [
      { label: "California", value: "CA" },
      { label: "New York", value: "NY" },
      { label: "Texas", value: "TX" },
      { label: "Florida", value: "FL" },
      { label: "Illinois", value: "IL" },
      { label: "Pennsylvania", value: "PA" },
      { label: "Ohio", value: "OH" },
      { label: "Georgia", value: "GA" },
      { label: "North Carolina", value: "NC" },
      { label: "Michigan", value: "MI" }
    ];
    const shippingMethodOptions = computed(() => {
      return props.shippingMethods.map((method) => ({
        value: method.id,
        label: method.name,
        description: `${method.description} - ${method.price === 0 ? "FREE" : `$${method.price.toFixed(2)}`}`
      }));
    });
    const updateField = (field, value) => {
      emit("update:modelValue", {
        ...props.modelValue,
        [field]: value
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UBadge = _sfc_main$c;
      const _component_UFormField = _sfc_main$d;
      const _component_UInput = _sfc_main$f;
      const _component_USelectMenu = _sfc_main$h;
      const _component_URadioGroup = _sfc_main$7;
      const _component_UButton = _sfc_main$8$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6" }, _attrs))}><div class="flex items-center justify-between mb-6"><h2 class="text-xl font-bold text-gray-900 dark:text-white">Shipping Address</h2>`);
      _push(ssrRenderComponent(_component_UBadge, {
        color: "primary",
        variant: "soft"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Step 2 of 3`);
          } else {
            return [
              createTextVNode("Step 2 of 3")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="space-y-4"><div class="grid grid-cols-1 md:grid-cols-2 gap-4">`);
      _push(ssrRenderComponent(_component_UFormField, {
        label: "First Name",
        required: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UInput, {
              "model-value": __props.modelValue.firstName,
              "onUpdate:modelValue": ($event) => updateField("firstName", $event),
              size: "lg",
              placeholder: "John"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UInput, {
                "model-value": __props.modelValue.firstName,
                "onUpdate:modelValue": ($event) => updateField("firstName", $event),
                size: "lg",
                placeholder: "John"
              }, null, 8, ["model-value", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UFormField, {
        label: "Last Name",
        required: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UInput, {
              "model-value": __props.modelValue.lastName,
              "onUpdate:modelValue": ($event) => updateField("lastName", $event),
              size: "lg",
              placeholder: "Doe"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UInput, {
                "model-value": __props.modelValue.lastName,
                "onUpdate:modelValue": ($event) => updateField("lastName", $event),
                size: "lg",
                placeholder: "Doe"
              }, null, 8, ["model-value", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_UFormField, {
        label: "Address Line 1",
        required: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UInput, {
              "model-value": __props.modelValue.address1,
              "onUpdate:modelValue": ($event) => updateField("address1", $event),
              size: "lg",
              placeholder: "123 Main Street"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UInput, {
                "model-value": __props.modelValue.address1,
                "onUpdate:modelValue": ($event) => updateField("address1", $event),
                size: "lg",
                placeholder: "123 Main Street"
              }, null, 8, ["model-value", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UFormField, {
        label: "Address Line 2",
        hint: "Apartment, suite, etc. (optional)"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UInput, {
              "model-value": __props.modelValue.address2,
              "onUpdate:modelValue": ($event) => updateField("address2", $event),
              size: "lg",
              placeholder: "Apt 4B"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UInput, {
                "model-value": __props.modelValue.address2,
                "onUpdate:modelValue": ($event) => updateField("address2", $event),
                size: "lg",
                placeholder: "Apt 4B"
              }, null, 8, ["model-value", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="grid grid-cols-1 md:grid-cols-3 gap-4">`);
      _push(ssrRenderComponent(_component_UFormField, {
        label: "City",
        required: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UInput, {
              "model-value": __props.modelValue.city,
              "onUpdate:modelValue": ($event) => updateField("city", $event),
              size: "lg",
              placeholder: "New York"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UInput, {
                "model-value": __props.modelValue.city,
                "onUpdate:modelValue": ($event) => updateField("city", $event),
                size: "lg",
                placeholder: "New York"
              }, null, 8, ["model-value", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UFormField, {
        label: "State/Province",
        required: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_USelectMenu, {
              "model-value": __props.modelValue.state,
              "onUpdate:modelValue": ($event) => updateField("state", $event),
              items: states,
              size: "lg",
              placeholder: "Select state",
              "value-attribute": "value",
              "option-attribute": "label"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_USelectMenu, {
                "model-value": __props.modelValue.state,
                "onUpdate:modelValue": ($event) => updateField("state", $event),
                items: states,
                size: "lg",
                placeholder: "Select state",
                "value-attribute": "value",
                "option-attribute": "label"
              }, null, 8, ["model-value", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UFormField, {
        label: "ZIP/Postal Code",
        required: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UInput, {
              "model-value": __props.modelValue.zipCode,
              "onUpdate:modelValue": ($event) => updateField("zipCode", $event),
              size: "lg",
              placeholder: "10001"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UInput, {
                "model-value": __props.modelValue.zipCode,
                "onUpdate:modelValue": ($event) => updateField("zipCode", $event),
                size: "lg",
                placeholder: "10001"
              }, null, 8, ["model-value", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_UFormField, {
        label: "Country",
        required: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_USelectMenu, {
              "model-value": __props.modelValue.country,
              "onUpdate:modelValue": ($event) => updateField("country", $event),
              items: countries,
              size: "lg",
              placeholder: "Select country",
              "value-attribute": "value",
              "option-attribute": "label",
              class: "w-50"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_USelectMenu, {
                "model-value": __props.modelValue.country,
                "onUpdate:modelValue": ($event) => updateField("country", $event),
                items: countries,
                size: "lg",
                placeholder: "Select country",
                "value-attribute": "value",
                "option-attribute": "label",
                class: "w-50"
              }, null, 8, ["model-value", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="pt-4 border-t border-gray-200 dark:border-gray-700"><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Shipping Method</h3>`);
      _push(ssrRenderComponent(_component_URadioGroup, {
        "model-value": __props.selectedShippingMethod,
        "onUpdate:modelValue": ($event) => _ctx.$emit("update:selectedShippingMethod", $event),
        options: unref(shippingMethodOptions)
      }, null, _parent));
      _push(`</div></div><div class="mt-6 flex justify-between">`);
      _push(ssrRenderComponent(_component_UButton, {
        onClick: ($event) => _ctx.$emit("previous"),
        variant: "soft",
        size: "lg",
        icon: "i-heroicons-arrow-left"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Back `);
          } else {
            return [
              createTextVNode(" Back ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        onClick: ($event) => _ctx.$emit("next"),
        size: "lg",
        icon: "i-heroicons-arrow-right",
        trailing: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Continue to Payment `);
          } else {
            return [
              createTextVNode(" Continue to Payment ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Checkout/ShippingAddressForm.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_4 = Object.assign(_sfc_main$6, { __name: "CheckoutShippingAddressForm" });
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "BillingAddressForm",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    sameAsShipping: { type: Boolean }
  },
  emits: ["update:modelValue", "update:sameAsShipping"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const countries = [
      { label: "United States", value: "US" },
      { label: "Canada", value: "CA" },
      { label: "United Kingdom", value: "UK" },
      { label: "Australia", value: "AU" },
      { label: "Germany", value: "DE" },
      { label: "France", value: "FR" }
    ];
    const states = [
      { label: "California", value: "CA" },
      { label: "New York", value: "NY" },
      { label: "Texas", value: "TX" },
      { label: "Florida", value: "FL" },
      { label: "Illinois", value: "IL" },
      { label: "Pennsylvania", value: "PA" },
      { label: "Ohio", value: "OH" },
      { label: "Georgia", value: "GA" },
      { label: "North Carolina", value: "NC" },
      { label: "Michigan", value: "MI" }
    ];
    const updateField = (field, value) => {
      emit("update:modelValue", {
        ...props.modelValue,
        [field]: value
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCheckbox = _sfc_main$g;
      const _component_UFormField = _sfc_main$d;
      const _component_UInput = _sfc_main$f;
      const _component_USelectMenu = _sfc_main$h;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6" }, _attrs))}><h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Billing Address</h2><div class="flex items-center gap-2 mb-4">`);
      _push(ssrRenderComponent(_component_UCheckbox, {
        "model-value": __props.sameAsShipping,
        "onUpdate:modelValue": ($event) => _ctx.$emit("update:sameAsShipping", $event)
      }, null, _parent));
      _push(`<label class="text-sm text-gray-600 dark:text-gray-400"> Same as shipping address </label></div>`);
      if (!__props.sameAsShipping) {
        _push(`<div class="space-y-4"><div class="grid grid-cols-1 md:grid-cols-2 gap-4">`);
        _push(ssrRenderComponent(_component_UFormField, {
          label: "First Name",
          required: ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UInput, {
                "model-value": __props.modelValue.firstName,
                "onUpdate:modelValue": ($event) => updateField("firstName", $event),
                size: "lg"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UInput, {
                  "model-value": __props.modelValue.firstName,
                  "onUpdate:modelValue": ($event) => updateField("firstName", $event),
                  size: "lg"
                }, null, 8, ["model-value", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UFormField, {
          label: "Last Name",
          required: ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UInput, {
                "model-value": __props.modelValue.lastName,
                "onUpdate:modelValue": ($event) => updateField("lastName", $event),
                size: "lg"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UInput, {
                  "model-value": __props.modelValue.lastName,
                  "onUpdate:modelValue": ($event) => updateField("lastName", $event),
                  size: "lg"
                }, null, 8, ["model-value", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(_component_UFormField, {
          label: "Address Line 1",
          required: ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UInput, {
                "model-value": __props.modelValue.address1,
                "onUpdate:modelValue": ($event) => updateField("address1", $event),
                size: "lg"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UInput, {
                  "model-value": __props.modelValue.address1,
                  "onUpdate:modelValue": ($event) => updateField("address1", $event),
                  size: "lg"
                }, null, 8, ["model-value", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UFormField, { label: "Address Line 2" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UInput, {
                "model-value": __props.modelValue.address2,
                "onUpdate:modelValue": ($event) => updateField("address2", $event),
                size: "lg"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UInput, {
                  "model-value": __props.modelValue.address2,
                  "onUpdate:modelValue": ($event) => updateField("address2", $event),
                  size: "lg"
                }, null, 8, ["model-value", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="grid grid-cols-1 md:grid-cols-3 gap-4">`);
        _push(ssrRenderComponent(_component_UFormField, {
          label: "City",
          required: ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UInput, {
                "model-value": __props.modelValue.city,
                "onUpdate:modelValue": ($event) => updateField("city", $event),
                size: "lg"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UInput, {
                  "model-value": __props.modelValue.city,
                  "onUpdate:modelValue": ($event) => updateField("city", $event),
                  size: "lg"
                }, null, 8, ["model-value", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UFormField, {
          label: "State",
          required: ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_USelectMenu, {
                "model-value": __props.modelValue.state,
                "onUpdate:modelValue": ($event) => updateField("state", $event),
                options: states,
                size: "lg",
                "value-attribute": "value",
                "option-attribute": "label"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_USelectMenu, {
                  "model-value": __props.modelValue.state,
                  "onUpdate:modelValue": ($event) => updateField("state", $event),
                  options: states,
                  size: "lg",
                  "value-attribute": "value",
                  "option-attribute": "label"
                }, null, 8, ["model-value", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UFormField, {
          label: "ZIP Code",
          required: ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UInput, {
                "model-value": __props.modelValue.zipCode,
                "onUpdate:modelValue": ($event) => updateField("zipCode", $event),
                size: "lg"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UInput, {
                  "model-value": __props.modelValue.zipCode,
                  "onUpdate:modelValue": ($event) => updateField("zipCode", $event),
                  size: "lg"
                }, null, 8, ["model-value", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(_component_UFormField, {
          label: "Country",
          required: ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_USelectMenu, {
                "model-value": __props.modelValue.country,
                "onUpdate:modelValue": ($event) => updateField("country", $event),
                options: countries,
                size: "lg",
                "value-attribute": "value",
                "option-attribute": "label"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_USelectMenu, {
                  "model-value": __props.modelValue.country,
                  "onUpdate:modelValue": ($event) => updateField("country", $event),
                  options: countries,
                  size: "lg",
                  "value-attribute": "value",
                  "option-attribute": "label"
                }, null, 8, ["model-value", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Checkout/BillingAddressForm.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_5 = Object.assign(_sfc_main$5, { __name: "CheckoutBillingAddressForm" });
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "PaymentMethodForm",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    selectedPaymentMethod: {}
  },
  emits: ["update:modelValue", "update:selectedPaymentMethod"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const paymentMethods = [
      {
        id: "sslcommerz",
        name: "SSLCommerz",
        icon: "i-heroicons-shield-check",
        iconColor: "text-green-600"
      },
      {
        id: "card",
        name: "Credit Card",
        icon: "i-heroicons-credit-card",
        iconColor: "text-blue-500"
      },
      {
        id: "paypal",
        name: "PayPal",
        icon: "i-heroicons-wallet",
        iconColor: "text-blue-600"
      },
      {
        id: "apple",
        name: "Apple Pay",
        icon: "i-heroicons-device-phone-mobile",
        iconColor: "text-gray-900 dark:text-white"
      }
    ];
    const updateField = (field, value) => {
      emit("update:modelValue", {
        ...props.modelValue,
        [field]: value
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_URadioGroup = _sfc_main$7;
      const _component_UIcon = _sfc_main$e;
      const _component_UFormField = _sfc_main$d;
      const _component_UInput = _sfc_main$f;
      const _component_UCheckbox = _sfc_main$g;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6" }, _attrs))}><h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Payment Method</h2><div class="space-y-4"><div class="grid grid-cols-1 md:grid-cols-3 gap-3"><!--[-->`);
      ssrRenderList(paymentMethods, (method) => {
        _push(`<label class="${ssrRenderClass([__props.selectedPaymentMethod === method.id ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20" : "border-gray-200 dark:border-gray-700 hover:border-gray-300", "flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all"])}">`);
        _push(ssrRenderComponent(_component_URadioGroup, {
          "model-value": __props.selectedPaymentMethod,
          "onUpdate:modelValue": ($event) => _ctx.$emit("update:selectedPaymentMethod", $event),
          value: method.id,
          class: "mb-2"
        }, null, _parent));
        _push(ssrRenderComponent(_component_UIcon, {
          name: method.icon,
          class: ["text-3xl mb-2", method.iconColor]
        }, null, _parent));
        _push(`<span class="text-sm font-medium text-gray-900 dark:text-white">${ssrInterpolate(method.name)}</span></label>`);
      });
      _push(`<!--]--></div>`);
      if (__props.selectedPaymentMethod === "card") {
        _push(`<div class="space-y-4 pt-4">`);
        _push(ssrRenderComponent(_component_UFormField, {
          label: "Card Number",
          required: ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UInput, {
                "model-value": __props.modelValue.cardNumber,
                "onUpdate:modelValue": ($event) => updateField("cardNumber", $event),
                placeholder: "1234 5678 9012 3456",
                size: "lg",
                icon: "i-heroicons-credit-card",
                maxlength: "19"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UInput, {
                  "model-value": __props.modelValue.cardNumber,
                  "onUpdate:modelValue": ($event) => updateField("cardNumber", $event),
                  placeholder: "1234 5678 9012 3456",
                  size: "lg",
                  icon: "i-heroicons-credit-card",
                  maxlength: "19"
                }, null, 8, ["model-value", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UFormField, {
          label: "Cardholder Name",
          required: ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UInput, {
                "model-value": __props.modelValue.cardName,
                "onUpdate:modelValue": ($event) => updateField("cardName", $event),
                placeholder: "John Doe",
                size: "lg"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UInput, {
                  "model-value": __props.modelValue.cardName,
                  "onUpdate:modelValue": ($event) => updateField("cardName", $event),
                  placeholder: "John Doe",
                  size: "lg"
                }, null, 8, ["model-value", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="grid grid-cols-2 gap-4">`);
        _push(ssrRenderComponent(_component_UFormField, {
          label: "Expiry Date",
          required: ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UInput, {
                "model-value": __props.modelValue.expiryDate,
                "onUpdate:modelValue": ($event) => updateField("expiryDate", $event),
                placeholder: "MM/YY",
                size: "lg",
                maxlength: "5"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UInput, {
                  "model-value": __props.modelValue.expiryDate,
                  "onUpdate:modelValue": ($event) => updateField("expiryDate", $event),
                  placeholder: "MM/YY",
                  size: "lg",
                  maxlength: "5"
                }, null, 8, ["model-value", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UFormField, {
          label: "CVV",
          required: ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UInput, {
                "model-value": __props.modelValue.cvv,
                "onUpdate:modelValue": ($event) => updateField("cvv", $event),
                type: "password",
                placeholder: "123",
                size: "lg",
                maxlength: "4"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UInput, {
                  "model-value": __props.modelValue.cvv,
                  "onUpdate:modelValue": ($event) => updateField("cvv", $event),
                  type: "password",
                  placeholder: "123",
                  size: "lg",
                  maxlength: "4"
                }, null, 8, ["model-value", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_UCheckbox, {
          "model-value": __props.modelValue.saveCard,
          "onUpdate:modelValue": ($event) => updateField("saveCard", $event)
        }, null, _parent));
        _push(`<label class="text-sm text-gray-600 dark:text-gray-400"> Save card for future purchases </label></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.selectedPaymentMethod === "paypal") {
        _push(`<div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"><div class="flex items-start gap-3">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-information-circle",
          class: "text-blue-500 text-xl mt-0.5"
        }, null, _parent));
        _push(`<div><p class="font-medium text-blue-900 dark:text-blue-100">PayPal Checkout</p><p class="text-sm text-blue-700 dark:text-blue-300 mt-1"> You will be redirected to PayPal to complete your purchase securely. </p></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.selectedPaymentMethod === "apple") {
        _push(`<div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"><div class="flex items-start gap-3">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-information-circle",
          class: "text-gray-500 text-xl mt-0.5"
        }, null, _parent));
        _push(`<div><p class="font-medium text-gray-900 dark:text-white">Apple Pay</p><p class="text-sm text-gray-600 dark:text-gray-400 mt-1"> Complete your purchase quickly and securely with Apple Pay. </p></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.selectedPaymentMethod === "sslcommerz") {
        _push(`<div class="space-y-4 pt-4"><div class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"><div class="flex items-start gap-3">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-shield-check",
          class: "text-green-600 dark:text-green-400 text-xl mt-0.5"
        }, null, _parent));
        _push(`<div><p class="font-medium text-green-900 dark:text-green-100 mb-2">Secure Payment Gateway</p><p class="text-sm text-green-800 dark:text-green-200 mb-3"> You will be redirected to SSLCommerz secure payment gateway to complete your purchase. </p><p class="text-xs text-green-700 dark:text-green-300 mb-2 font-medium">Supported Payment Methods:</p><div class="grid grid-cols-3 md:grid-cols-6 gap-2"><div class="bg-white dark:bg-gray-800 rounded p-2 text-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-credit-card",
          class: "text-blue-600 mb-1"
        }, null, _parent));
        _push(`<span class="text-xs text-gray-900 dark:text-white block">Visa</span></div><div class="bg-white dark:bg-gray-800 rounded p-2 text-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-credit-card",
          class: "text-orange-600 mb-1"
        }, null, _parent));
        _push(`<span class="text-xs text-gray-900 dark:text-white block">Master</span></div><div class="bg-white dark:bg-gray-800 rounded p-2 text-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-credit-card",
          class: "text-blue-500 mb-1"
        }, null, _parent));
        _push(`<span class="text-xs text-gray-900 dark:text-white block">Amex</span></div><div class="bg-white dark:bg-gray-800 rounded p-2 text-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-device-phone-mobile",
          class: "text-pink-600 mb-1"
        }, null, _parent));
        _push(`<span class="text-xs text-gray-900 dark:text-white block">bKash</span></div><div class="bg-white dark:bg-gray-800 rounded p-2 text-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-device-phone-mobile",
          class: "text-orange-500 mb-1"
        }, null, _parent));
        _push(`<span class="text-xs text-gray-900 dark:text-white block">Nagad</span></div><div class="bg-white dark:bg-gray-800 rounded p-2 text-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-device-phone-mobile",
          class: "text-purple-600 mb-1"
        }, null, _parent));
        _push(`<span class="text-xs text-gray-900 dark:text-white block">Rocket</span></div></div></div></div></div><div class="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-lock-closed",
          class: "text-blue-600 dark:text-blue-400"
        }, null, _parent));
        _push(`<div class="text-sm"><span class="text-blue-900 dark:text-blue-100 font-medium">256-bit SSL Encryption</span><span class="text-blue-700 dark:text-blue-300 block text-xs">Your payment information is secure and encrypted</span></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Checkout/PaymentMethodForm.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_6 = Object.assign(_sfc_main$4, { __name: "CheckoutPaymentMethodForm" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "OrderNotes",
  __ssrInlineRender: true,
  props: {
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UTextarea = _sfc_main$i;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6" }, _attrs))}><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4"> Order Notes (Optional) </h3>`);
      _push(ssrRenderComponent(_component_UTextarea, {
        "model-value": __props.modelValue,
        "onUpdate:modelValue": ($event) => _ctx.$emit("update:modelValue", $event),
        placeholder: "Add any special instructions for your order...",
        rows: 4
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Checkout/OrderNotes.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_7 = Object.assign(_sfc_main$3, { __name: "CheckoutOrderNotes" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "TermsAcceptance",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCheckbox = _sfc_main$g;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6" }, _attrs))}><div class="flex items-start gap-3">`);
      _push(ssrRenderComponent(_component_UCheckbox, {
        "model-value": __props.modelValue,
        "onUpdate:modelValue": ($event) => _ctx.$emit("update:modelValue", $event),
        class: "mt-1"
      }, null, _parent));
      _push(`<label class="text-sm text-gray-600 dark:text-gray-400"> I agree to the <a href="/terms" class="text-primary-500 hover:underline" target="_blank">Terms and Conditions</a> and <a href="/privacy" class="text-primary-500 hover:underline" target="_blank">Privacy Policy</a></label></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Checkout/TermsAcceptance.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_8 = Object.assign(_sfc_main$2, { __name: "CheckoutTermsAcceptance" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "OrderSummary",
  __ssrInlineRender: true,
  props: {
    cartItems: {},
    shippingCost: {},
    taxRate: {}
  },
  setup(__props) {
    const props = __props;
    const taxRate = props.taxRate || 10;
    const subtotal = computed(() => {
      return props.cartItems.reduce((sum, item) => {
        return sum + item.product.price * item.quantity;
      }, 0);
    });
    const tax = computed(() => {
      return subtotal.value * taxRate / 100;
    });
    const total = computed(() => {
      return subtotal.value + props.shippingCost + tax.value;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = __nuxt_component_6$1;
      const _component_UBadge = _sfc_main$c;
      const _component_UIcon = _sfc_main$e;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-4" }, _attrs))}><h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2><div class="space-y-4 mb-6 max-h-96 overflow-y-auto"><!--[-->`);
      ssrRenderList(__props.cartItems, (item) => {
        _push(`<div class="flex gap-3 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0"><div class="relative">`);
        _push(ssrRenderComponent(_component_NuxtImg, {
          src: item.product.image ?? "https://placehold.co/80x80",
          alt: item.product.name,
          class: "w-16 h-16 object-cover rounded-lg",
          width: "64",
          height: "64",
          loading: "lazy",
          format: "webp"
        }, null, _parent));
        _push(ssrRenderComponent(_component_UBadge, {
          color: "primary",
          class: "absolute -top-2 -right-2 text-xs"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(item.quantity)}`);
            } else {
              return [
                createTextVNode(toDisplayString(item.quantity), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div><div class="flex-1 min-w-0"><p class="font-medium text-sm text-gray-900 dark:text-white truncate">${ssrInterpolate(item.product.name)}</p><p class="text-sm text-gray-500 dark:text-gray-400"> $${ssrInterpolate(parseFloat(item.product.price).toFixed(2))} × ${ssrInterpolate(item.quantity)}</p></div><div class="text-right"><p class="font-semibold text-gray-900 dark:text-white"> $${ssrInterpolate((item.product.price * item.quantity).toFixed(2))}</p></div></div>`);
      });
      _push(`<!--]--></div><div class="space-y-3 pb-4 border-b border-gray-200 dark:border-gray-700"><div class="flex justify-between text-gray-600 dark:text-gray-400"><span>Subtotal</span><span class="font-medium">$${ssrInterpolate(unref(subtotal).toFixed(2))}</span></div><div class="flex justify-between text-gray-600 dark:text-gray-400"><span>Shipping</span><span class="font-medium">${ssrInterpolate(__props.shippingCost === 0 ? "FREE" : `$${__props.shippingCost.toFixed(2)}`)}</span></div><div class="flex justify-between text-gray-600 dark:text-gray-400"><span>Tax (${ssrInterpolate(unref(taxRate))}%)</span><span class="font-medium">$${ssrInterpolate(unref(tax).toFixed(2))}</span></div></div><div class="pt-4 mb-6"><div class="flex justify-between items-baseline"><span class="text-lg font-semibold text-gray-900 dark:text-white">Total</span><span class="text-2xl font-bold text-primary-500">$${ssrInterpolate(unref(total).toFixed(2))}</span></div></div><div class="space-y-2 text-sm text-gray-600 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700"><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-shield-check",
        class: "text-green-500"
      }, null, _parent));
      _push(`<span>Secure 256-bit SSL encryption</span></div><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-lock-closed",
        class: "text-blue-500"
      }, null, _parent));
      _push(`<span>PCI DSS compliant</span></div><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-arrow-path",
        class: "text-orange-500"
      }, null, _parent));
      _push(`<span>30-day money-back guarantee</span></div></div><div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"><p class="text-xs text-gray-500 dark:text-gray-400 mb-3">Accepted Payment Methods</p><div class="flex gap-2 flex-wrap">`);
      _push(ssrRenderComponent(_component_UBadge, {
        color: "gray",
        variant: "soft",
        size: "sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Visa`);
          } else {
            return [
              createTextVNode("Visa")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UBadge, {
        color: "gray",
        variant: "soft",
        size: "sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Mastercard`);
          } else {
            return [
              createTextVNode("Mastercard")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UBadge, {
        color: "gray",
        variant: "soft",
        size: "sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Amex`);
          } else {
            return [
              createTextVNode("Amex")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UBadge, {
        color: "gray",
        variant: "soft",
        size: "sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`PayPal`);
          } else {
            return [
              createTextVNode("PayPal")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UBadge, {
        color: "gray",
        variant: "soft",
        size: "sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Apple Pay`);
          } else {
            return [
              createTextVNode("Apple Pay")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Checkout/OrderSummary.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_10 = Object.assign(_sfc_main$1, { __name: "CheckoutOrderSummary" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "checkout",
  __ssrInlineRender: true,
  setup(__props) {
    const toast = useToast();
    const router = useRouter();
    const { cartItems } = useCart();
    const { initiatePayment } = usePayment();
    const steps = [
      {
        value: 1,
        title: "Contact",
        description: "Your contact information",
        icon: "i-heroicons-envelope"
      },
      {
        value: 2,
        title: "Shipping",
        description: "Delivery address",
        icon: "i-heroicons-truck"
      },
      {
        value: 3,
        title: "Payment",
        description: "Payment details",
        icon: "i-heroicons-credit-card"
      }
    ];
    const currentStep = ref(1);
    const contactInfo = ref({
      email: "",
      phone: "",
      subscribeNewsletter: false
    });
    const shippingAddress = ref({
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "US"
    });
    const billingAddress = ref({
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "US"
    });
    const sameAsShipping = ref(true);
    const shippingMethods = [
      {
        id: "standard",
        name: "Standard Shipping",
        description: "5-7 business days",
        price: 0
      },
      {
        id: "express",
        name: "Express Shipping",
        description: "2-3 business days",
        price: 12.99
      },
      {
        id: "overnight",
        name: "Overnight Shipping",
        description: "Next business day",
        price: 24.99
      }
    ];
    const selectedShippingMethod = ref("standard");
    const selectedPaymentMethod = ref("sslcommerz");
    const paymentInfo = ref({
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
      saveCard: false
    });
    const orderNotes = ref("");
    const agreedToTerms = ref(false);
    const processingOrder = ref(false);
    const breadcrumbLinks = [
      { label: "Home", to: "/" },
      { label: "Cart", to: "/cart" },
      { label: "Checkout", to: "/checkout" }
    ];
    const shippingCost = computed(() => {
      const method = shippingMethods.find((m) => m.id === selectedShippingMethod.value);
      return method?.price || 0;
    });
    const validateStep1 = () => {
      if (!contactInfo.value.email || !contactInfo.value.phone) {
        toast.add({
          title: "Missing information",
          description: "Please fill in all required fields",
          color: "error"
        });
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contactInfo.value.email)) {
        toast.add({
          title: "Invalid email",
          description: "Please enter a valid email address",
          color: "error"
        });
        return false;
      }
      return true;
    };
    const validateStep2 = () => {
      if (!shippingAddress.value.firstName || !shippingAddress.value.lastName || !shippingAddress.value.address1 || !shippingAddress.value.city || !shippingAddress.value.state || !shippingAddress.value.zipCode) {
        toast.add({
          title: "Missing information",
          description: "Please fill in all required shipping fields",
          color: "error"
        });
        return false;
      }
      return true;
    };
    const validateStep3 = () => {
      if (!agreedToTerms.value) {
        toast.add({
          title: "Terms required",
          description: "Please agree to the terms and conditions",
          color: "error"
        });
        return false;
      }
      if (selectedPaymentMethod.value === "card") {
        if (!paymentInfo.value.cardNumber || !paymentInfo.value.cardName || !paymentInfo.value.expiryDate || !paymentInfo.value.cvv) {
          toast.add({
            title: "Payment information required",
            description: "Please fill in all payment details",
            color: "error"
          });
          return false;
        }
      }
      return true;
    };
    const handleNext = () => {
      let isValid = false;
      if (currentStep.value === 1) {
        isValid = validateStep1();
      } else if (currentStep.value === 2) {
        isValid = validateStep2();
      }
      if (isValid && currentStep.value < 3) {
        currentStep.value++;
        (void 0).scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    const handlePrevious = () => {
      if (currentStep.value > 1) {
        currentStep.value--;
        (void 0).scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    const handlePlaceOrder = async () => {
      if (!validateStep3()) {
        return;
      }
      processingOrder.value = true;
      try {
        const order = {
          contact: contactInfo.value,
          shipping: shippingAddress.value,
          billing: sameAsShipping.value ? shippingAddress.value : billingAddress.value,
          shippingMethod: selectedShippingMethod.value,
          paymentMethod: selectedPaymentMethod.value,
          items: cartItems.value,
          orderNotes: orderNotes.value,
          shippingCost: shippingCost.value
        };
        await new Promise((resolve) => setTimeout(resolve, 1e3));
        const orderId = Math.floor(Math.random() * 1e4);
        if (selectedPaymentMethod.value === "sslcommerz") {
          const paymentResponse = await initiatePayment(orderId);
          if (!paymentResponse) {
            toast.add({
              title: "Payment Error",
              description: "Failed to initiate payment. Please try again.",
              color: "error"
            });
            return;
          }
        } else {
          toast.add({
            title: "Order placed successfully!",
            description: `Order #${orderId}`,
            color: "success",
            icon: "i-heroicons-check-circle"
          });
          await router.push(`/order-confirmation?order=${orderId}`);
        }
      } catch (error) {
        console.error("Order placement error:", error);
        toast.add({
          title: "Order Error",
          description: error.message || "Failed to process order. Please try again.",
          color: "error"
        });
      } finally {
        processingOrder.value = false;
      }
    };
    useSeoMeta({
      title: "Checkout - Complete Your Purchase",
      description: "Secure checkout process for your order"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = _sfc_main$a;
      const _component_UBreadcrumb = _sfc_main$b;
      const _component_UStepper = _sfc_main$9;
      const _component_CheckoutContactInformationForm = __nuxt_component_3;
      const _component_CheckoutShippingAddressForm = __nuxt_component_4;
      const _component_CheckoutBillingAddressForm = __nuxt_component_5;
      const _component_CheckoutPaymentMethodForm = __nuxt_component_6;
      const _component_CheckoutOrderNotes = __nuxt_component_7;
      const _component_CheckoutTermsAcceptance = __nuxt_component_8;
      const _component_UButton = _sfc_main$8$1;
      const _component_CheckoutOrderSummary = __nuxt_component_10;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 dark:bg-gray-900 py-8" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UContainer, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mb-8"${_scopeId}><h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2"${_scopeId}>Checkout</h1>`);
            _push2(ssrRenderComponent(_component_UBreadcrumb, {
              links: breadcrumbLinks,
              class: "mt-2"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mb-8"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UStepper, {
              modelValue: unref(currentStep),
              "onUpdate:modelValue": ($event) => isRef(currentStep) ? currentStep.value = $event : null,
              items: steps,
              class: "max-w-3xl mx-auto",
              color: "primary"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="grid grid-cols-1 lg:grid-cols-3 gap-8"${_scopeId}><div class="lg:col-span-2"${_scopeId}>`);
            if (unref(currentStep) === 1) {
              _push2(ssrRenderComponent(_component_CheckoutContactInformationForm, {
                modelValue: unref(contactInfo),
                "onUpdate:modelValue": ($event) => isRef(contactInfo) ? contactInfo.value = $event : null,
                onNext: handleNext
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (unref(currentStep) === 2) {
              _push2(ssrRenderComponent(_component_CheckoutShippingAddressForm, {
                modelValue: unref(shippingAddress),
                "onUpdate:modelValue": ($event) => isRef(shippingAddress) ? shippingAddress.value = $event : null,
                "selected-shipping-method": unref(selectedShippingMethod),
                "onUpdate:selectedShippingMethod": ($event) => isRef(selectedShippingMethod) ? selectedShippingMethod.value = $event : null,
                "shipping-methods": shippingMethods,
                onNext: handleNext,
                onPrevious: handlePrevious
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (unref(currentStep) === 3) {
              _push2(`<div class="space-y-6"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_CheckoutBillingAddressForm, {
                modelValue: unref(billingAddress),
                "onUpdate:modelValue": ($event) => isRef(billingAddress) ? billingAddress.value = $event : null,
                "same-as-shipping": unref(sameAsShipping),
                "onUpdate:sameAsShipping": ($event) => isRef(sameAsShipping) ? sameAsShipping.value = $event : null
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_CheckoutPaymentMethodForm, {
                modelValue: unref(paymentInfo),
                "onUpdate:modelValue": ($event) => isRef(paymentInfo) ? paymentInfo.value = $event : null,
                "selected-payment-method": unref(selectedPaymentMethod),
                "onUpdate:selectedPaymentMethod": ($event) => isRef(selectedPaymentMethod) ? selectedPaymentMethod.value = $event : null
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_CheckoutOrderNotes, {
                modelValue: unref(orderNotes),
                "onUpdate:modelValue": ($event) => isRef(orderNotes) ? orderNotes.value = $event : null
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_CheckoutTermsAcceptance, {
                modelValue: unref(agreedToTerms),
                "onUpdate:modelValue": ($event) => isRef(agreedToTerms) ? agreedToTerms.value = $event : null
              }, null, _parent2, _scopeId));
              _push2(`<div class="flex justify-between"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UButton, {
                onClick: handlePrevious,
                variant: "soft",
                size: "lg",
                icon: "i-heroicons-arrow-left"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Back to Shipping `);
                  } else {
                    return [
                      createTextVNode(" Back to Shipping ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UButton, {
                onClick: handlePlaceOrder,
                disabled: !unref(agreedToTerms) || unref(processingOrder),
                loading: unref(processingOrder),
                size: "lg",
                icon: "i-heroicons-lock-closed"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Place Order `);
                  } else {
                    return [
                      createTextVNode(" Place Order ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="lg:col-span-1"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_CheckoutOrderSummary, {
              "cart-items": unref(cartItems) || [],
              "shipping-cost": unref(shippingCost),
              "tax-rate": 10
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "mb-8" }, [
                createVNode("h1", { class: "text-3xl font-bold text-gray-900 dark:text-white mb-2" }, "Checkout"),
                createVNode(_component_UBreadcrumb, {
                  links: breadcrumbLinks,
                  class: "mt-2"
                })
              ]),
              createVNode("div", { class: "mb-8" }, [
                createVNode(_component_UStepper, {
                  modelValue: unref(currentStep),
                  "onUpdate:modelValue": ($event) => isRef(currentStep) ? currentStep.value = $event : null,
                  items: steps,
                  class: "max-w-3xl mx-auto",
                  color: "primary"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ]),
              createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-8" }, [
                createVNode("div", { class: "lg:col-span-2" }, [
                  unref(currentStep) === 1 ? (openBlock(), createBlock(_component_CheckoutContactInformationForm, {
                    key: 0,
                    modelValue: unref(contactInfo),
                    "onUpdate:modelValue": ($event) => isRef(contactInfo) ? contactInfo.value = $event : null,
                    onNext: handleNext
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                  unref(currentStep) === 2 ? (openBlock(), createBlock(_component_CheckoutShippingAddressForm, {
                    key: 1,
                    modelValue: unref(shippingAddress),
                    "onUpdate:modelValue": ($event) => isRef(shippingAddress) ? shippingAddress.value = $event : null,
                    "selected-shipping-method": unref(selectedShippingMethod),
                    "onUpdate:selectedShippingMethod": ($event) => isRef(selectedShippingMethod) ? selectedShippingMethod.value = $event : null,
                    "shipping-methods": shippingMethods,
                    onNext: handleNext,
                    onPrevious: handlePrevious
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "selected-shipping-method", "onUpdate:selectedShippingMethod"])) : createCommentVNode("", true),
                  unref(currentStep) === 3 ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "space-y-6"
                  }, [
                    createVNode(_component_CheckoutBillingAddressForm, {
                      modelValue: unref(billingAddress),
                      "onUpdate:modelValue": ($event) => isRef(billingAddress) ? billingAddress.value = $event : null,
                      "same-as-shipping": unref(sameAsShipping),
                      "onUpdate:sameAsShipping": ($event) => isRef(sameAsShipping) ? sameAsShipping.value = $event : null
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "same-as-shipping", "onUpdate:sameAsShipping"]),
                    createVNode(_component_CheckoutPaymentMethodForm, {
                      modelValue: unref(paymentInfo),
                      "onUpdate:modelValue": ($event) => isRef(paymentInfo) ? paymentInfo.value = $event : null,
                      "selected-payment-method": unref(selectedPaymentMethod),
                      "onUpdate:selectedPaymentMethod": ($event) => isRef(selectedPaymentMethod) ? selectedPaymentMethod.value = $event : null
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "selected-payment-method", "onUpdate:selectedPaymentMethod"]),
                    createVNode(_component_CheckoutOrderNotes, {
                      modelValue: unref(orderNotes),
                      "onUpdate:modelValue": ($event) => isRef(orderNotes) ? orderNotes.value = $event : null
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode(_component_CheckoutTermsAcceptance, {
                      modelValue: unref(agreedToTerms),
                      "onUpdate:modelValue": ($event) => isRef(agreedToTerms) ? agreedToTerms.value = $event : null
                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("div", { class: "flex justify-between" }, [
                      createVNode(_component_UButton, {
                        onClick: handlePrevious,
                        variant: "soft",
                        size: "lg",
                        icon: "i-heroicons-arrow-left"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Back to Shipping ")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UButton, {
                        onClick: handlePlaceOrder,
                        disabled: !unref(agreedToTerms) || unref(processingOrder),
                        loading: unref(processingOrder),
                        size: "lg",
                        icon: "i-heroicons-lock-closed"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Place Order ")
                        ]),
                        _: 1
                      }, 8, ["disabled", "loading"])
                    ])
                  ])) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "lg:col-span-1" }, [
                  createVNode(_component_CheckoutOrderSummary, {
                    "cart-items": unref(cartItems) || [],
                    "shipping-cost": unref(shippingCost),
                    "tax-rate": 10
                  }, null, 8, ["cart-items", "shipping-cost"])
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/checkout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=checkout-su2PDVfz.mjs.map
