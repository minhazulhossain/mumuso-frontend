import { _ as _sfc_main$1 } from './Container-DJ2zbRf-.mjs';
import { A as useUserSession, a as useToast, w as useAsyncData, e as _sfc_main$8, B as __nuxt_component_2$1, d as _sfc_main$e } from './server.mjs';
import { _ as _sfc_main$3 } from './Card-D31Cx9o-.mjs';
import { _ as _sfc_main$b } from './Badge-DZtstYnH.mjs';
import { _ as _sfc_main$2, a as _sfc_main$1$1, u as useKbd } from './Modal-Wzdhz3aA.mjs';
import { _ as _sfc_main$4 } from './Form-CfudII3J.mjs';
import { _ as _sfc_main$5 } from './FormField-D7jUvIQZ.mjs';
import { _ as _sfc_main$6 } from './SelectMenu-C5QjXK1B.mjs';
import { _ as _sfc_main$7 } from './Input-DomsB7QD.mjs';
import { _ as _sfc_main$9 } from './Textarea-BN1wHgLR.mjs';
import { _ as _sfc_main$a } from './Checkbox-B-SowvkF.mjs';
import { defineComponent, withAsyncContext, ref, reactive, withCtx, createTextVNode, createVNode, unref, isRef, createBlock, createCommentVNode, openBlock, toDisplayString, Fragment, renderList, computed, toValue, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { useDebounceFn, useActiveElement, useEventListener } from '@vueuse/core';
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
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import '@vue/shared';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'reka-ui/namespaced';

const useUser = () => {
  const fetchAddresses = async () => {
    return await $fetch("/api/user/addresses");
  };
  const createAddress = async (addressData) => {
    return await $fetch("/api/user/addresses", {
      method: "POST",
      body: addressData
    });
  };
  const updateAddress = async (addressId, addressData) => {
    return await $fetch(`/api/user/addresses/${addressId}`, {
      method: "PUT",
      body: addressData
    });
  };
  const deleteAddress = async (addressId) => {
    return await $fetch(`/api/user/addresses/${addressId}`, {
      method: "DELETE"
    });
  };
  const setDefaultAddress = async (addressId) => {
    return await $fetch(`/api/user/addresses/${addressId}/default`, {
      method: "PUT"
    });
  };
  return {
    fetchAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress
  };
};
const chainedShortcutRegex = /^[^-]+.*-.*[^-]+$/;
const combinedShortcutRegex = /^[^_]+.*_.*[^_]+$/;
const shiftableKeys = ["arrowleft", "arrowright", "arrowup", "arrowright", "tab", "escape", "enter", "backspace"];
function defineShortcuts(config, options = {}) {
  const chainedInputs = ref([]);
  const clearChainedInput = () => {
    chainedInputs.value.splice(0, chainedInputs.value.length);
  };
  const debouncedClearChainedInput = useDebounceFn(clearChainedInput, options.chainDelay ?? 800);
  const { macOS } = useKbd();
  const activeElement = useActiveElement();
  const onKeyDown = (e) => {
    if (!e.key) {
      return;
    }
    const alphabetKey = /^[a-z]{1}$/i.test(e.key);
    const shiftableKey = shiftableKeys.includes(e.key.toLowerCase());
    let chainedKey;
    chainedInputs.value.push(e.key);
    if (chainedInputs.value.length >= 2) {
      chainedKey = chainedInputs.value.slice(-2).join("-");
      for (const shortcut of shortcuts.value.filter((s) => s.chained)) {
        if (shortcut.key !== chainedKey) {
          continue;
        }
        if (shortcut.enabled) {
          e.preventDefault();
          shortcut.handler(e);
        }
        clearChainedInput();
        return;
      }
    }
    for (const shortcut of shortcuts.value.filter((s) => !s.chained)) {
      if (e.key.toLowerCase() !== shortcut.key) {
        continue;
      }
      if (e.metaKey !== shortcut.metaKey) {
        continue;
      }
      if (e.ctrlKey !== shortcut.ctrlKey) {
        continue;
      }
      if ((alphabetKey || shiftableKey) && e.shiftKey !== shortcut.shiftKey) {
        continue;
      }
      if (shortcut.enabled) {
        e.preventDefault();
        shortcut.handler(e);
      }
      clearChainedInput();
      return;
    }
    debouncedClearChainedInput();
  };
  const usingInput = computed(() => {
    const tagName = activeElement.value?.tagName;
    const contentEditable = activeElement.value?.contentEditable;
    const usingInput2 = !!(tagName === "INPUT" || tagName === "TEXTAREA" || contentEditable === "true" || contentEditable === "plaintext-only");
    if (usingInput2) {
      return activeElement.value?.name || true;
    }
    return false;
  });
  const shortcuts = computed(() => {
    return Object.entries(toValue(config)).map(([key, shortcutConfig]) => {
      if (!shortcutConfig) {
        return null;
      }
      let shortcut;
      if (key.includes("-") && key !== "-" && !key.includes("_") && !key.match(chainedShortcutRegex)?.length) {
        console.trace(`[Shortcut] Invalid key: "${key}"`);
      }
      if (key.includes("_") && key !== "_" && !key.match(combinedShortcutRegex)?.length) {
        console.trace(`[Shortcut] Invalid key: "${key}"`);
      }
      const chained = key.includes("-") && key !== "-" && !key.includes("_");
      if (chained) {
        shortcut = {
          key: key.toLowerCase(),
          metaKey: false,
          ctrlKey: false,
          shiftKey: false,
          altKey: false
        };
      } else {
        const keySplit = key.toLowerCase().split("_").map((k) => k);
        shortcut = {
          key: keySplit.filter((k) => !["meta", "command", "ctrl", "shift", "alt", "option"].includes(k)).join("_"),
          metaKey: keySplit.includes("meta") || keySplit.includes("command"),
          ctrlKey: keySplit.includes("ctrl"),
          shiftKey: keySplit.includes("shift"),
          altKey: keySplit.includes("alt") || keySplit.includes("option")
        };
      }
      shortcut.chained = chained;
      if (!macOS.value && shortcut.metaKey && !shortcut.ctrlKey) {
        shortcut.metaKey = false;
        shortcut.ctrlKey = true;
      }
      if (typeof shortcutConfig === "function") {
        shortcut.handler = shortcutConfig;
      } else if (typeof shortcutConfig === "object") {
        shortcut = { ...shortcut, handler: shortcutConfig.handler };
      }
      if (!shortcut.handler) {
        console.trace("[Shortcut] Invalid value");
        return null;
      }
      let enabled = true;
      if (!shortcutConfig.usingInput) {
        enabled = !usingInput.value;
      } else if (typeof shortcutConfig.usingInput === "string") {
        enabled = usingInput.value === shortcutConfig.usingInput;
      }
      shortcut.enabled = enabled;
      return shortcut;
    }).filter(Boolean);
  });
  return useEventListener("keydown", onKeyDown);
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useUserSession();
    const { fetchAddresses, createAddress, updateAddress, deleteAddress, setDefaultAddress } = useUser();
    const toast = useToast();
    const { data: addresses, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "addresses",
      () => fetchAddresses(),
      {
        lazy: true,
        server: false
      }
    )), __temp = await __temp, __restore(), __temp);
    const isAddModalOpen = ref(false);
    const isDeleteModalOpen = ref(false);
    const loading = ref(false);
    const editingAddress = ref(null);
    const deletingAddress = ref(null);
    const addressTypeItems = ref([
      {
        label: "Home",
        value: "home"
      },
      {
        label: "Work",
        value: "work"
      },
      {
        label: "Billing",
        value: "billing"
      },
      {
        label: "Shipping",
        value: "shipping"
      },
      {
        label: "Other",
        value: "other"
      }
    ]);
    const countries = ref([
      {
        label: "Bangladesh",
        value: "BD"
      },
      {
        label: "United States",
        value: "US"
      }
    ]);
    const form = reactive({
      type: addressTypeItems.value[0],
      label: "",
      first_name: "",
      last_name: "",
      address_line_1: "",
      city: "",
      state: "",
      postal_code: "",
      country: countries.value[0],
      phone: "",
      is_default: false
    });
    defineShortcuts({
      o: () => isAddModalOpen.value = !isAddModalOpen.value
    });
    const getDropdownItems = (address) => [
      [{
        label: "Set as Default",
        icon: "i-heroicons-star",
        onSelect: () => handleSetDefault(address),
        disabled: address.is_default
      }],
      [{
        label: "Edit",
        icon: "i-heroicons-pencil-square",
        onSelect() {
          handleEdit(address);
        }
      }],
      [{
        label: "Delete",
        icon: "i-heroicons-trash",
        color: "red",
        onSelect: () => handleDeleteClick(address),
        disabled: address.is_default
      }]
    ];
    const handleEdit = (address) => {
      editingAddress.value = address;
      Object.assign(form, {
        type: addressTypeItems.value[0],
        label: address.label || "",
        street: address.street,
        city: address.city,
        state: address.state,
        zip: address.zip,
        country: countries.value[0],
        phone: address.phone || "",
        is_default: address.is_default
      });
      isAddModalOpen.value = true;
    };
    const handleDeleteClick = (address) => {
      deletingAddress.value = address;
      isDeleteModalOpen.value = true;
    };
    const handleSetDefault = async (address) => {
      loading.value = true;
      try {
        await setDefaultAddress(address.id);
        await refresh();
        toast.add({
          title: "Success",
          description: "Default address updated",
          color: "success"
        });
      } catch (error2) {
        toast.add({
          title: "Error",
          description: error2.message || "Failed to update default address",
          color: "error"
        });
      } finally {
        loading.value = false;
      }
    };
    const handleSubmit = async () => {
      loading.value = true;
      try {
        if (editingAddress.value) {
          await updateAddress(editingAddress.value.id, form);
          toast.add({
            title: "Success",
            description: "Address updated successfully",
            color: "success"
          });
        } else {
          await createAddress(form);
          toast.add({
            title: "Success",
            description: "Address added successfully",
            color: "success"
          });
        }
        await refresh();
        closeModal();
      } catch (error2) {
        toast.add({
          title: "Error",
          description: error2.message || "Failed to save address",
          color: "error"
        });
      } finally {
        loading.value = false;
      }
    };
    const confirmDelete = async () => {
      loading.value = true;
      try {
        await deleteAddress(deletingAddress.value.id);
        await refresh();
        toast.add({
          title: "Success",
          description: "Address deleted successfully",
          color: "success"
        });
        isDeleteModalOpen.value = false;
      } catch (error2) {
        toast.add({
          title: "Error",
          description: error2.message || "Failed to delete address",
          color: "error"
        });
      } finally {
        loading.value = false;
      }
    };
    const closeModal = () => {
      isAddModalOpen.value = false;
      editingAddress.value = null;
      Object.assign(form, {
        type: "Home",
        label: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        phone: "",
        is_default: false
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = _sfc_main$1;
      const _component_UButton = _sfc_main$8;
      const _component_ClientOnly = __nuxt_component_2$1;
      const _component_UIcon = _sfc_main$e;
      const _component_UCard = _sfc_main$3;
      const _component_UBadge = _sfc_main$b;
      const _component_UDropdownMenu = _sfc_main$1$1;
      const _component_UModal = _sfc_main$2;
      const _component_UForm = _sfc_main$4;
      const _component_UFormField = _sfc_main$5;
      const _component_USelectMenu = _sfc_main$6;
      const _component_UInput = _sfc_main$7;
      const _component_UTextarea = _sfc_main$9;
      const _component_UCheckbox = _sfc_main$a;
      _push(ssrRenderComponent(_component_UContainer, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="my-5"${_scopeId}><div class="flex items-center justify-between mb-6"${_scopeId}><h1 class="text-2xl font-bold"${_scopeId}>My Addresses</h1>`);
            _push2(ssrRenderComponent(_component_UButton, {
              icon: "i-heroicons-plus",
              onClick: ($event) => isAddModalOpen.value = true
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Add New Address `);
                } else {
                  return [
                    createTextVNode(" Add New Address ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_ClientOnly, null, {
              fallback: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex justify-center py-12"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-arrow-path",
                    class: "animate-spin text-4xl text-primary-500"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex justify-center py-12" }, [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-arrow-path",
                        class: "animate-spin text-4xl text-primary-500"
                      })
                    ])
                  ];
                }
              })
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_UModal, {
              open: unref(isAddModalOpen),
              "onUpdate:open": ($event) => isRef(isAddModalOpen) ? isAddModalOpen.value = $event : null,
              dismissible: !unref(loading),
              title: "Add/Update Address",
              description: "Address add/update"
            }, {
              content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UCard, null, {
                    header: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center gap-3"${_scopeId3}><div class="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UIcon, {
                          name: unref(editingAddress) ? "i-heroicons-pencil-square" : "i-heroicons-map-pin",
                          class: "text-primary-600 dark:text-primary-400 text-xl"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div${_scopeId3}><h2 class="text-xl font-bold text-gray-900 dark:text-white"${_scopeId3}>${ssrInterpolate(unref(editingAddress) ? "Edit Address" : "Add New Address")}</h2><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId3}>${ssrInterpolate(unref(editingAddress) ? "Update your address details" : "Fill in your address information")}</p></div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center gap-3" }, [
                            createVNode("div", { class: "p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg" }, [
                              createVNode(_component_UIcon, {
                                name: unref(editingAddress) ? "i-heroicons-pencil-square" : "i-heroicons-map-pin",
                                class: "text-primary-600 dark:text-primary-400 text-xl"
                              }, null, 8, ["name"])
                            ]),
                            createVNode("div", null, [
                              createVNode("h2", { class: "text-xl font-bold text-gray-900 dark:text-white" }, toDisplayString(unref(editingAddress) ? "Edit Address" : "Add New Address"), 1),
                              createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, toDisplayString(unref(editingAddress) ? "Update your address details" : "Fill in your address information"), 1)
                            ])
                          ])
                        ];
                      }
                    }),
                    footer: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex flex-col-reverse sm:flex-row justify-end gap-3"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UButton, {
                          color: "secondary",
                          variant: "outline",
                          onClick: closeModal,
                          disabled: unref(loading),
                          size: "lg",
                          block: "",
                          class: "sm:w-auto"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Cancel `);
                            } else {
                              return [
                                createTextVNode(" Cancel ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UButton, {
                          type: "submit",
                          onClick: handleSubmit,
                          loading: unref(loading),
                          size: "lg",
                          icon: "i-heroicons-check",
                          block: "",
                          class: "sm:w-auto"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(unref(editingAddress) ? "Update Address" : "Add Address")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(editingAddress) ? "Update Address" : "Add Address"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex flex-col-reverse sm:flex-row justify-end gap-3" }, [
                            createVNode(_component_UButton, {
                              color: "secondary",
                              variant: "outline",
                              onClick: closeModal,
                              disabled: unref(loading),
                              size: "lg",
                              block: "",
                              class: "sm:w-auto"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Cancel ")
                              ]),
                              _: 1
                            }, 8, ["disabled"]),
                            createVNode(_component_UButton, {
                              type: "submit",
                              onClick: handleSubmit,
                              loading: unref(loading),
                              size: "lg",
                              icon: "i-heroicons-check",
                              block: "",
                              class: "sm:w-auto"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(editingAddress) ? "Update Address" : "Add Address"), 1)
                              ]),
                              _: 1
                            }, 8, ["loading"])
                          ])
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UForm, {
                          state: unref(form),
                          onSubmit: handleSubmit,
                          class: "space-y-5"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="space-y-4 pb-4 border-b border-gray-200 dark:border-gray-700"${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_UFormField, {
                                label: "Address Type",
                                required: "",
                                name: "type"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_USelectMenu, {
                                      modelValue: unref(form).type,
                                      "onUpdate:modelValue": ($event) => unref(form).type = $event,
                                      items: unref(addressTypeItems),
                                      placeholder: "Select address type",
                                      icon: "i-heroicons-tag",
                                      size: "lg",
                                      class: "w-full"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_USelectMenu, {
                                        modelValue: unref(form).type,
                                        "onUpdate:modelValue": ($event) => unref(form).type = $event,
                                        items: unref(addressTypeItems),
                                        placeholder: "Select address type",
                                        icon: "i-heroicons-tag",
                                        size: "lg",
                                        class: "w-full"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_UFormField, {
                                label: "First Name",
                                required: "",
                                name: "first_name"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_UInput, {
                                      modelValue: unref(form).first_name,
                                      "onUpdate:modelValue": ($event) => unref(form).first_name = $event,
                                      placeholder: "First Name",
                                      icon: "i-heroicons-building-office-2",
                                      size: "lg"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_UInput, {
                                        modelValue: unref(form).first_name,
                                        "onUpdate:modelValue": ($event) => unref(form).first_name = $event,
                                        placeholder: "First Name",
                                        icon: "i-heroicons-building-office-2",
                                        size: "lg"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UFormField, {
                                label: "Last Name",
                                required: "",
                                name: "last_name"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_UInput, {
                                      modelValue: unref(form).last_name,
                                      "onUpdate:modelValue": ($event) => unref(form).last_name = $event,
                                      placeholder: "Last Name",
                                      icon: "i-heroicons-map",
                                      size: "lg"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_UInput, {
                                        modelValue: unref(form).last_name,
                                        "onUpdate:modelValue": ($event) => unref(form).last_name = $event,
                                        placeholder: "Last Name",
                                        icon: "i-heroicons-map",
                                        size: "lg"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div><div class="space-y-4"${_scopeId4}><div class="flex items-center gap-2 mb-2"${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_UIcon, {
                                name: "i-heroicons-home",
                                class: "text-gray-400"
                              }, null, _parent5, _scopeId4));
                              _push5(`<h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300"${_scopeId4}>Location Details</h3></div>`);
                              _push5(ssrRenderComponent(_component_UFormField, {
                                label: "Street Address",
                                required: "",
                                name: "street"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_UTextarea, {
                                      modelValue: unref(form).address_line_1,
                                      "onUpdate:modelValue": ($event) => unref(form).address_line_1 = $event,
                                      placeholder: "Enter your street address, apartment, suite, etc.",
                                      class: "w-full",
                                      rows: 2,
                                      size: "lg",
                                      autoresize: ""
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_UTextarea, {
                                        modelValue: unref(form).address_line_1,
                                        "onUpdate:modelValue": ($event) => unref(form).address_line_1 = $event,
                                        placeholder: "Enter your street address, apartment, suite, etc.",
                                        class: "w-full",
                                        rows: 2,
                                        size: "lg",
                                        autoresize: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_UFormField, {
                                label: "City",
                                required: "",
                                name: "city"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_UInput, {
                                      modelValue: unref(form).city,
                                      "onUpdate:modelValue": ($event) => unref(form).city = $event,
                                      placeholder: "City",
                                      icon: "i-heroicons-building-office-2",
                                      size: "lg"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_UInput, {
                                        modelValue: unref(form).city,
                                        "onUpdate:modelValue": ($event) => unref(form).city = $event,
                                        placeholder: "City",
                                        icon: "i-heroicons-building-office-2",
                                        size: "lg"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UFormField, {
                                label: "State / Province",
                                required: "",
                                name: "state"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_UInput, {
                                      modelValue: unref(form).state,
                                      "onUpdate:modelValue": ($event) => unref(form).state = $event,
                                      placeholder: "State or Province",
                                      icon: "i-heroicons-map",
                                      size: "lg"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_UInput, {
                                        modelValue: unref(form).state,
                                        "onUpdate:modelValue": ($event) => unref(form).state = $event,
                                        placeholder: "State or Province",
                                        icon: "i-heroicons-map",
                                        size: "lg"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_UFormField, {
                                label: "ZIP / Postal Code",
                                required: "",
                                name: "zip"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_UInput, {
                                      modelValue: unref(form).postal_code,
                                      "onUpdate:modelValue": ($event) => unref(form).postal_code = $event,
                                      placeholder: "e.g., 12345",
                                      icon: "i-heroicons-hashtag",
                                      size: "lg"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_UInput, {
                                        modelValue: unref(form).postal_code,
                                        "onUpdate:modelValue": ($event) => unref(form).postal_code = $event,
                                        placeholder: "e.g., 12345",
                                        icon: "i-heroicons-hashtag",
                                        size: "lg"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UFormField, {
                                label: "Country",
                                required: "",
                                name: "country"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_USelectMenu, {
                                      modelValue: unref(form).country,
                                      "onUpdate:modelValue": ($event) => unref(form).country = $event,
                                      items: unref(countries),
                                      placeholder: "Country",
                                      icon: "i-heroicons-globe-alt",
                                      size: "lg",
                                      class: "w-full"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_USelectMenu, {
                                        modelValue: unref(form).country,
                                        "onUpdate:modelValue": ($event) => unref(form).country = $event,
                                        items: unref(countries),
                                        placeholder: "Country",
                                        icon: "i-heroicons-globe-alt",
                                        size: "lg",
                                        class: "w-full"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div><div class="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700"${_scopeId4}><div class="flex items-center gap-2 mb-2"${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_UIcon, {
                                name: "i-heroicons-phone",
                                class: "text-gray-400"
                              }, null, _parent5, _scopeId4));
                              _push5(`<h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300"${_scopeId4}>Contact Information</h3></div>`);
                              _push5(ssrRenderComponent(_component_UFormField, {
                                label: "Phone Number (Optional)",
                                name: "phone",
                                hint: "Include country code for international"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_UInput, {
                                      modelValue: unref(form).phone,
                                      "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                                      placeholder: "+1 (234) 567-8900",
                                      icon: "i-heroicons-device-phone-mobile",
                                      size: "lg",
                                      type: "tel",
                                      class: "w-full"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_UInput, {
                                        modelValue: unref(form).phone,
                                        "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                                        placeholder: "+1 (234) 567-8900",
                                        icon: "i-heroicons-device-phone-mobile",
                                        size: "lg",
                                        type: "tel",
                                        class: "w-full"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div><div class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4"${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_UCheckbox, {
                                modelValue: unref(form).is_default,
                                "onUpdate:modelValue": ($event) => unref(form).is_default = $event,
                                label: "Set as default address",
                                ui: {
                                  label: "text-sm font-medium text-gray-700 dark:text-gray-300"
                                }
                              }, {
                                label: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="flex items-center gap-2"${_scopeId5}><span class="text-sm font-medium text-gray-700 dark:text-gray-300"${_scopeId5}> Set as default address </span>`);
                                    if (unref(form).is_default) {
                                      _push6(ssrRenderComponent(_component_UBadge, {
                                        color: "primary",
                                        variant: "subtle",
                                        size: "xs"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(` Default `);
                                          } else {
                                            return [
                                              createTextVNode(" Default ")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      _push6(`<!---->`);
                                    }
                                    _push6(`</div><p class="text-xs text-gray-500 dark:text-gray-400 mt-1"${_scopeId5}> This address will be selected by default for orders </p>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "flex items-center gap-2" }, [
                                        createVNode("span", { class: "text-sm font-medium text-gray-700 dark:text-gray-300" }, " Set as default address "),
                                        unref(form).is_default ? (openBlock(), createBlock(_component_UBadge, {
                                          key: 0,
                                          color: "primary",
                                          variant: "subtle",
                                          size: "xs"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Default ")
                                          ]),
                                          _: 1
                                        })) : createCommentVNode("", true)
                                      ]),
                                      createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400 mt-1" }, " This address will be selected by default for orders ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "space-y-4 pb-4 border-b border-gray-200 dark:border-gray-700" }, [
                                  createVNode(_component_UFormField, {
                                    label: "Address Type",
                                    required: "",
                                    name: "type"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_USelectMenu, {
                                        modelValue: unref(form).type,
                                        "onUpdate:modelValue": ($event) => unref(form).type = $event,
                                        items: unref(addressTypeItems),
                                        placeholder: "Select address type",
                                        icon: "i-heroicons-tag",
                                        size: "lg",
                                        class: "w-full"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [
                                  createVNode(_component_UFormField, {
                                    label: "First Name",
                                    required: "",
                                    name: "first_name"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_UInput, {
                                        modelValue: unref(form).first_name,
                                        "onUpdate:modelValue": ($event) => unref(form).first_name = $event,
                                        placeholder: "First Name",
                                        icon: "i-heroicons-building-office-2",
                                        size: "lg"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UFormField, {
                                    label: "Last Name",
                                    required: "",
                                    name: "last_name"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_UInput, {
                                        modelValue: unref(form).last_name,
                                        "onUpdate:modelValue": ($event) => unref(form).last_name = $event,
                                        placeholder: "Last Name",
                                        icon: "i-heroicons-map",
                                        size: "lg"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode("div", { class: "space-y-4" }, [
                                  createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                    createVNode(_component_UIcon, {
                                      name: "i-heroicons-home",
                                      class: "text-gray-400"
                                    }),
                                    createVNode("h3", { class: "text-sm font-semibold text-gray-700 dark:text-gray-300" }, "Location Details")
                                  ]),
                                  createVNode(_component_UFormField, {
                                    label: "Street Address",
                                    required: "",
                                    name: "street"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_UTextarea, {
                                        modelValue: unref(form).address_line_1,
                                        "onUpdate:modelValue": ($event) => unref(form).address_line_1 = $event,
                                        placeholder: "Enter your street address, apartment, suite, etc.",
                                        class: "w-full",
                                        rows: 2,
                                        size: "lg",
                                        autoresize: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [
                                  createVNode(_component_UFormField, {
                                    label: "City",
                                    required: "",
                                    name: "city"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_UInput, {
                                        modelValue: unref(form).city,
                                        "onUpdate:modelValue": ($event) => unref(form).city = $event,
                                        placeholder: "City",
                                        icon: "i-heroicons-building-office-2",
                                        size: "lg"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UFormField, {
                                    label: "State / Province",
                                    required: "",
                                    name: "state"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_UInput, {
                                        modelValue: unref(form).state,
                                        "onUpdate:modelValue": ($event) => unref(form).state = $event,
                                        placeholder: "State or Province",
                                        icon: "i-heroicons-map",
                                        size: "lg"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [
                                  createVNode(_component_UFormField, {
                                    label: "ZIP / Postal Code",
                                    required: "",
                                    name: "zip"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_UInput, {
                                        modelValue: unref(form).postal_code,
                                        "onUpdate:modelValue": ($event) => unref(form).postal_code = $event,
                                        placeholder: "e.g., 12345",
                                        icon: "i-heroicons-hashtag",
                                        size: "lg"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UFormField, {
                                    label: "Country",
                                    required: "",
                                    name: "country"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_USelectMenu, {
                                        modelValue: unref(form).country,
                                        "onUpdate:modelValue": ($event) => unref(form).country = $event,
                                        items: unref(countries),
                                        placeholder: "Country",
                                        icon: "i-heroicons-globe-alt",
                                        size: "lg",
                                        class: "w-full"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode("div", { class: "space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700" }, [
                                  createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                    createVNode(_component_UIcon, {
                                      name: "i-heroicons-phone",
                                      class: "text-gray-400"
                                    }),
                                    createVNode("h3", { class: "text-sm font-semibold text-gray-700 dark:text-gray-300" }, "Contact Information")
                                  ]),
                                  createVNode(_component_UFormField, {
                                    label: "Phone Number (Optional)",
                                    name: "phone",
                                    hint: "Include country code for international"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_UInput, {
                                        modelValue: unref(form).phone,
                                        "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                                        placeholder: "+1 (234) 567-8900",
                                        icon: "i-heroicons-device-phone-mobile",
                                        size: "lg",
                                        type: "tel",
                                        class: "w-full"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode("div", { class: "bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4" }, [
                                  createVNode(_component_UCheckbox, {
                                    modelValue: unref(form).is_default,
                                    "onUpdate:modelValue": ($event) => unref(form).is_default = $event,
                                    label: "Set as default address",
                                    ui: {
                                      label: "text-sm font-medium text-gray-700 dark:text-gray-300"
                                    }
                                  }, {
                                    label: withCtx(() => [
                                      createVNode("div", { class: "flex items-center gap-2" }, [
                                        createVNode("span", { class: "text-sm font-medium text-gray-700 dark:text-gray-300" }, " Set as default address "),
                                        unref(form).is_default ? (openBlock(), createBlock(_component_UBadge, {
                                          key: 0,
                                          color: "primary",
                                          variant: "subtle",
                                          size: "xs"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Default ")
                                          ]),
                                          _: 1
                                        })) : createCommentVNode("", true)
                                      ]),
                                      createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400 mt-1" }, " This address will be selected by default for orders ")
                                    ]),
                                    _: 1
                                  }, 8, ["modelValue", "onUpdate:modelValue"])
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UForm, {
                            state: unref(form),
                            onSubmit: handleSubmit,
                            class: "space-y-5"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "space-y-4 pb-4 border-b border-gray-200 dark:border-gray-700" }, [
                                createVNode(_component_UFormField, {
                                  label: "Address Type",
                                  required: "",
                                  name: "type"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_USelectMenu, {
                                      modelValue: unref(form).type,
                                      "onUpdate:modelValue": ($event) => unref(form).type = $event,
                                      items: unref(addressTypeItems),
                                      placeholder: "Select address type",
                                      icon: "i-heroicons-tag",
                                      size: "lg",
                                      class: "w-full"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [
                                createVNode(_component_UFormField, {
                                  label: "First Name",
                                  required: "",
                                  name: "first_name"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UInput, {
                                      modelValue: unref(form).first_name,
                                      "onUpdate:modelValue": ($event) => unref(form).first_name = $event,
                                      placeholder: "First Name",
                                      icon: "i-heroicons-building-office-2",
                                      size: "lg"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UFormField, {
                                  label: "Last Name",
                                  required: "",
                                  name: "last_name"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UInput, {
                                      modelValue: unref(form).last_name,
                                      "onUpdate:modelValue": ($event) => unref(form).last_name = $event,
                                      placeholder: "Last Name",
                                      icon: "i-heroicons-map",
                                      size: "lg"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode("div", { class: "space-y-4" }, [
                                createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                  createVNode(_component_UIcon, {
                                    name: "i-heroicons-home",
                                    class: "text-gray-400"
                                  }),
                                  createVNode("h3", { class: "text-sm font-semibold text-gray-700 dark:text-gray-300" }, "Location Details")
                                ]),
                                createVNode(_component_UFormField, {
                                  label: "Street Address",
                                  required: "",
                                  name: "street"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UTextarea, {
                                      modelValue: unref(form).address_line_1,
                                      "onUpdate:modelValue": ($event) => unref(form).address_line_1 = $event,
                                      placeholder: "Enter your street address, apartment, suite, etc.",
                                      class: "w-full",
                                      rows: 2,
                                      size: "lg",
                                      autoresize: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [
                                createVNode(_component_UFormField, {
                                  label: "City",
                                  required: "",
                                  name: "city"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UInput, {
                                      modelValue: unref(form).city,
                                      "onUpdate:modelValue": ($event) => unref(form).city = $event,
                                      placeholder: "City",
                                      icon: "i-heroicons-building-office-2",
                                      size: "lg"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UFormField, {
                                  label: "State / Province",
                                  required: "",
                                  name: "state"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UInput, {
                                      modelValue: unref(form).state,
                                      "onUpdate:modelValue": ($event) => unref(form).state = $event,
                                      placeholder: "State or Province",
                                      icon: "i-heroicons-map",
                                      size: "lg"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [
                                createVNode(_component_UFormField, {
                                  label: "ZIP / Postal Code",
                                  required: "",
                                  name: "zip"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UInput, {
                                      modelValue: unref(form).postal_code,
                                      "onUpdate:modelValue": ($event) => unref(form).postal_code = $event,
                                      placeholder: "e.g., 12345",
                                      icon: "i-heroicons-hashtag",
                                      size: "lg"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UFormField, {
                                  label: "Country",
                                  required: "",
                                  name: "country"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_USelectMenu, {
                                      modelValue: unref(form).country,
                                      "onUpdate:modelValue": ($event) => unref(form).country = $event,
                                      items: unref(countries),
                                      placeholder: "Country",
                                      icon: "i-heroicons-globe-alt",
                                      size: "lg",
                                      class: "w-full"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode("div", { class: "space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700" }, [
                                createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                  createVNode(_component_UIcon, {
                                    name: "i-heroicons-phone",
                                    class: "text-gray-400"
                                  }),
                                  createVNode("h3", { class: "text-sm font-semibold text-gray-700 dark:text-gray-300" }, "Contact Information")
                                ]),
                                createVNode(_component_UFormField, {
                                  label: "Phone Number (Optional)",
                                  name: "phone",
                                  hint: "Include country code for international"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UInput, {
                                      modelValue: unref(form).phone,
                                      "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                                      placeholder: "+1 (234) 567-8900",
                                      icon: "i-heroicons-device-phone-mobile",
                                      size: "lg",
                                      type: "tel",
                                      class: "w-full"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode("div", { class: "bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4" }, [
                                createVNode(_component_UCheckbox, {
                                  modelValue: unref(form).is_default,
                                  "onUpdate:modelValue": ($event) => unref(form).is_default = $event,
                                  label: "Set as default address",
                                  ui: {
                                    label: "text-sm font-medium text-gray-700 dark:text-gray-300"
                                  }
                                }, {
                                  label: withCtx(() => [
                                    createVNode("div", { class: "flex items-center gap-2" }, [
                                      createVNode("span", { class: "text-sm font-medium text-gray-700 dark:text-gray-300" }, " Set as default address "),
                                      unref(form).is_default ? (openBlock(), createBlock(_component_UBadge, {
                                        key: 0,
                                        color: "primary",
                                        variant: "subtle",
                                        size: "xs"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Default ")
                                        ]),
                                        _: 1
                                      })) : createCommentVNode("", true)
                                    ]),
                                    createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400 mt-1" }, " This address will be selected by default for orders ")
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue"])
                              ])
                            ]),
                            _: 1
                          }, 8, ["state"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UCard, null, {
                      header: withCtx(() => [
                        createVNode("div", { class: "flex items-center gap-3" }, [
                          createVNode("div", { class: "p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg" }, [
                            createVNode(_component_UIcon, {
                              name: unref(editingAddress) ? "i-heroicons-pencil-square" : "i-heroicons-map-pin",
                              class: "text-primary-600 dark:text-primary-400 text-xl"
                            }, null, 8, ["name"])
                          ]),
                          createVNode("div", null, [
                            createVNode("h2", { class: "text-xl font-bold text-gray-900 dark:text-white" }, toDisplayString(unref(editingAddress) ? "Edit Address" : "Add New Address"), 1),
                            createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, toDisplayString(unref(editingAddress) ? "Update your address details" : "Fill in your address information"), 1)
                          ])
                        ])
                      ]),
                      footer: withCtx(() => [
                        createVNode("div", { class: "flex flex-col-reverse sm:flex-row justify-end gap-3" }, [
                          createVNode(_component_UButton, {
                            color: "secondary",
                            variant: "outline",
                            onClick: closeModal,
                            disabled: unref(loading),
                            size: "lg",
                            block: "",
                            class: "sm:w-auto"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Cancel ")
                            ]),
                            _: 1
                          }, 8, ["disabled"]),
                          createVNode(_component_UButton, {
                            type: "submit",
                            onClick: handleSubmit,
                            loading: unref(loading),
                            size: "lg",
                            icon: "i-heroicons-check",
                            block: "",
                            class: "sm:w-auto"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(editingAddress) ? "Update Address" : "Add Address"), 1)
                            ]),
                            _: 1
                          }, 8, ["loading"])
                        ])
                      ]),
                      default: withCtx(() => [
                        createVNode(_component_UForm, {
                          state: unref(form),
                          onSubmit: handleSubmit,
                          class: "space-y-5"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "space-y-4 pb-4 border-b border-gray-200 dark:border-gray-700" }, [
                              createVNode(_component_UFormField, {
                                label: "Address Type",
                                required: "",
                                name: "type"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_USelectMenu, {
                                    modelValue: unref(form).type,
                                    "onUpdate:modelValue": ($event) => unref(form).type = $event,
                                    items: unref(addressTypeItems),
                                    placeholder: "Select address type",
                                    icon: "i-heroicons-tag",
                                    size: "lg",
                                    class: "w-full"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [
                              createVNode(_component_UFormField, {
                                label: "First Name",
                                required: "",
                                name: "first_name"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_UInput, {
                                    modelValue: unref(form).first_name,
                                    "onUpdate:modelValue": ($event) => unref(form).first_name = $event,
                                    placeholder: "First Name",
                                    icon: "i-heroicons-building-office-2",
                                    size: "lg"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UFormField, {
                                label: "Last Name",
                                required: "",
                                name: "last_name"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_UInput, {
                                    modelValue: unref(form).last_name,
                                    "onUpdate:modelValue": ($event) => unref(form).last_name = $event,
                                    placeholder: "Last Name",
                                    icon: "i-heroicons-map",
                                    size: "lg"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("div", { class: "space-y-4" }, [
                              createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                createVNode(_component_UIcon, {
                                  name: "i-heroicons-home",
                                  class: "text-gray-400"
                                }),
                                createVNode("h3", { class: "text-sm font-semibold text-gray-700 dark:text-gray-300" }, "Location Details")
                              ]),
                              createVNode(_component_UFormField, {
                                label: "Street Address",
                                required: "",
                                name: "street"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_UTextarea, {
                                    modelValue: unref(form).address_line_1,
                                    "onUpdate:modelValue": ($event) => unref(form).address_line_1 = $event,
                                    placeholder: "Enter your street address, apartment, suite, etc.",
                                    class: "w-full",
                                    rows: 2,
                                    size: "lg",
                                    autoresize: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [
                              createVNode(_component_UFormField, {
                                label: "City",
                                required: "",
                                name: "city"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_UInput, {
                                    modelValue: unref(form).city,
                                    "onUpdate:modelValue": ($event) => unref(form).city = $event,
                                    placeholder: "City",
                                    icon: "i-heroicons-building-office-2",
                                    size: "lg"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UFormField, {
                                label: "State / Province",
                                required: "",
                                name: "state"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_UInput, {
                                    modelValue: unref(form).state,
                                    "onUpdate:modelValue": ($event) => unref(form).state = $event,
                                    placeholder: "State or Province",
                                    icon: "i-heroicons-map",
                                    size: "lg"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [
                              createVNode(_component_UFormField, {
                                label: "ZIP / Postal Code",
                                required: "",
                                name: "zip"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_UInput, {
                                    modelValue: unref(form).postal_code,
                                    "onUpdate:modelValue": ($event) => unref(form).postal_code = $event,
                                    placeholder: "e.g., 12345",
                                    icon: "i-heroicons-hashtag",
                                    size: "lg"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UFormField, {
                                label: "Country",
                                required: "",
                                name: "country"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_USelectMenu, {
                                    modelValue: unref(form).country,
                                    "onUpdate:modelValue": ($event) => unref(form).country = $event,
                                    items: unref(countries),
                                    placeholder: "Country",
                                    icon: "i-heroicons-globe-alt",
                                    size: "lg",
                                    class: "w-full"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("div", { class: "space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700" }, [
                              createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                                createVNode(_component_UIcon, {
                                  name: "i-heroicons-phone",
                                  class: "text-gray-400"
                                }),
                                createVNode("h3", { class: "text-sm font-semibold text-gray-700 dark:text-gray-300" }, "Contact Information")
                              ]),
                              createVNode(_component_UFormField, {
                                label: "Phone Number (Optional)",
                                name: "phone",
                                hint: "Include country code for international"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_UInput, {
                                    modelValue: unref(form).phone,
                                    "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                                    placeholder: "+1 (234) 567-8900",
                                    icon: "i-heroicons-device-phone-mobile",
                                    size: "lg",
                                    type: "tel",
                                    class: "w-full"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("div", { class: "bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4" }, [
                              createVNode(_component_UCheckbox, {
                                modelValue: unref(form).is_default,
                                "onUpdate:modelValue": ($event) => unref(form).is_default = $event,
                                label: "Set as default address",
                                ui: {
                                  label: "text-sm font-medium text-gray-700 dark:text-gray-300"
                                }
                              }, {
                                label: withCtx(() => [
                                  createVNode("div", { class: "flex items-center gap-2" }, [
                                    createVNode("span", { class: "text-sm font-medium text-gray-700 dark:text-gray-300" }, " Set as default address "),
                                    unref(form).is_default ? (openBlock(), createBlock(_component_UBadge, {
                                      key: 0,
                                      color: "primary",
                                      variant: "subtle",
                                      size: "xs"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Default ")
                                      ]),
                                      _: 1
                                    })) : createCommentVNode("", true)
                                  ]),
                                  createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400 mt-1" }, " This address will be selected by default for orders ")
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
                            ])
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UModal, {
              open: unref(isDeleteModalOpen),
              "onUpdate:open": ($event) => isRef(isDeleteModalOpen) ? isDeleteModalOpen.value = $event : null
            }, {
              content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UCard, null, {
                    header: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center gap-3"${_scopeId3}><div class="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UIcon, {
                          name: "i-heroicons-exclamation-triangle",
                          class: "text-red-600 dark:text-red-400 text-xl"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div><div${_scopeId3}><h2 class="text-xl font-bold text-gray-900 dark:text-white"${_scopeId3}>Delete Address</h2><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId3}>This action cannot be undone</p></div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center gap-3" }, [
                            createVNode("div", { class: "p-2 bg-red-50 dark:bg-red-900/20 rounded-lg" }, [
                              createVNode(_component_UIcon, {
                                name: "i-heroicons-exclamation-triangle",
                                class: "text-red-600 dark:text-red-400 text-xl"
                              })
                            ]),
                            createVNode("div", null, [
                              createVNode("h2", { class: "text-xl font-bold text-gray-900 dark:text-white" }, "Delete Address"),
                              createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "This action cannot be undone")
                            ])
                          ])
                        ];
                      }
                    }),
                    footer: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex flex-col-reverse sm:flex-row justify-end gap-3"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UButton, {
                          color: "secondary",
                          variant: "outline",
                          onClick: ($event) => isDeleteModalOpen.value = false,
                          disabled: unref(loading),
                          size: "lg",
                          block: "",
                          class: "sm:w-auto"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Cancel `);
                            } else {
                              return [
                                createTextVNode(" Cancel ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UButton, {
                          color: "error",
                          onClick: confirmDelete,
                          loading: unref(loading),
                          size: "lg",
                          icon: "i-heroicons-trash",
                          block: "",
                          class: "sm:w-auto"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Delete Address `);
                            } else {
                              return [
                                createTextVNode(" Delete Address ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex flex-col-reverse sm:flex-row justify-end gap-3" }, [
                            createVNode(_component_UButton, {
                              color: "secondary",
                              variant: "outline",
                              onClick: ($event) => isDeleteModalOpen.value = false,
                              disabled: unref(loading),
                              size: "lg",
                              block: "",
                              class: "sm:w-auto"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Cancel ")
                              ]),
                              _: 1
                            }, 8, ["onClick", "disabled"]),
                            createVNode(_component_UButton, {
                              color: "error",
                              onClick: confirmDelete,
                              loading: unref(loading),
                              size: "lg",
                              icon: "i-heroicons-trash",
                              block: "",
                              class: "sm:w-auto"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Delete Address ")
                              ]),
                              _: 1
                            }, 8, ["loading"])
                          ])
                        ];
                      }
                    }),
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-4"${_scopeId3}><div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"${_scopeId3}><p class="text-sm text-red-800 dark:text-red-200"${_scopeId3}> Are you sure you want to delete this address? All associated data will be permanently removed from your account. </p></div>`);
                        if (unref(deletingAddress)) {
                          _push4(`<div class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4"${_scopeId3}><h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"${_scopeId3}>Address Details:</h3><div class="text-sm text-gray-600 dark:text-gray-400 space-y-1"${_scopeId3}><p class="font-medium"${_scopeId3}>${ssrInterpolate(unref(deletingAddress).type)} - ${ssrInterpolate(unref(deletingAddress).label)}</p><p${_scopeId3}>${ssrInterpolate(unref(deletingAddress).street)}</p><p${_scopeId3}>${ssrInterpolate(unref(deletingAddress).city)}, ${ssrInterpolate(unref(deletingAddress).state)} ${ssrInterpolate(unref(deletingAddress).zip)}</p></div></div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-4" }, [
                            createVNode("div", { class: "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4" }, [
                              createVNode("p", { class: "text-sm text-red-800 dark:text-red-200" }, " Are you sure you want to delete this address? All associated data will be permanently removed from your account. ")
                            ]),
                            unref(deletingAddress) ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4"
                            }, [
                              createVNode("h3", { class: "text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" }, "Address Details:"),
                              createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400 space-y-1" }, [
                                createVNode("p", { class: "font-medium" }, toDisplayString(unref(deletingAddress).type) + " - " + toDisplayString(unref(deletingAddress).label), 1),
                                createVNode("p", null, toDisplayString(unref(deletingAddress).street), 1),
                                createVNode("p", null, toDisplayString(unref(deletingAddress).city) + ", " + toDisplayString(unref(deletingAddress).state) + " " + toDisplayString(unref(deletingAddress).zip), 1)
                              ])
                            ])) : createCommentVNode("", true)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UCard, null, {
                      header: withCtx(() => [
                        createVNode("div", { class: "flex items-center gap-3" }, [
                          createVNode("div", { class: "p-2 bg-red-50 dark:bg-red-900/20 rounded-lg" }, [
                            createVNode(_component_UIcon, {
                              name: "i-heroicons-exclamation-triangle",
                              class: "text-red-600 dark:text-red-400 text-xl"
                            })
                          ]),
                          createVNode("div", null, [
                            createVNode("h2", { class: "text-xl font-bold text-gray-900 dark:text-white" }, "Delete Address"),
                            createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "This action cannot be undone")
                          ])
                        ])
                      ]),
                      footer: withCtx(() => [
                        createVNode("div", { class: "flex flex-col-reverse sm:flex-row justify-end gap-3" }, [
                          createVNode(_component_UButton, {
                            color: "secondary",
                            variant: "outline",
                            onClick: ($event) => isDeleteModalOpen.value = false,
                            disabled: unref(loading),
                            size: "lg",
                            block: "",
                            class: "sm:w-auto"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Cancel ")
                            ]),
                            _: 1
                          }, 8, ["onClick", "disabled"]),
                          createVNode(_component_UButton, {
                            color: "error",
                            onClick: confirmDelete,
                            loading: unref(loading),
                            size: "lg",
                            icon: "i-heroicons-trash",
                            block: "",
                            class: "sm:w-auto"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Delete Address ")
                            ]),
                            _: 1
                          }, 8, ["loading"])
                        ])
                      ]),
                      default: withCtx(() => [
                        createVNode("div", { class: "space-y-4" }, [
                          createVNode("div", { class: "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4" }, [
                            createVNode("p", { class: "text-sm text-red-800 dark:text-red-200" }, " Are you sure you want to delete this address? All associated data will be permanently removed from your account. ")
                          ]),
                          unref(deletingAddress) ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4"
                          }, [
                            createVNode("h3", { class: "text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" }, "Address Details:"),
                            createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400 space-y-1" }, [
                              createVNode("p", { class: "font-medium" }, toDisplayString(unref(deletingAddress).type) + " - " + toDisplayString(unref(deletingAddress).label), 1),
                              createVNode("p", null, toDisplayString(unref(deletingAddress).street), 1),
                              createVNode("p", null, toDisplayString(unref(deletingAddress).city) + ", " + toDisplayString(unref(deletingAddress).state) + " " + toDisplayString(unref(deletingAddress).zip), 1)
                            ])
                          ])) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "my-5" }, [
                createVNode("div", { class: "flex items-center justify-between mb-6" }, [
                  createVNode("h1", { class: "text-2xl font-bold" }, "My Addresses"),
                  createVNode(_component_UButton, {
                    icon: "i-heroicons-plus",
                    onClick: ($event) => isAddModalOpen.value = true
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Add New Address ")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ]),
                createVNode(_component_ClientOnly, null, {
                  fallback: withCtx(() => [
                    createVNode("div", { class: "flex justify-center py-12" }, [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-arrow-path",
                        class: "animate-spin text-4xl text-primary-500"
                      })
                    ])
                  ]),
                  default: withCtx(() => [
                    unref(pending) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex justify-center py-12"
                    }, [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-arrow-path",
                        class: "animate-spin text-4xl text-primary-500"
                      })
                    ])) : unref(error) ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "text-center py-12"
                    }, [
                      createVNode("p", { class: "text-red-500" }, "Error: " + toDisplayString(unref(error).message), 1)
                    ])) : !unref(addresses)?.length ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: "text-center py-12"
                    }, [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-map-pin",
                        class: "text-6xl text-gray-300 mb-4"
                      }),
                      createVNode("p", { class: "text-gray-500 mb-4" }, "No addresses added yet"),
                      createVNode(_component_UButton, {
                        onClick: ($event) => isAddModalOpen.value = true
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Add Your First Address")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ])) : (openBlock(), createBlock("div", {
                      key: 3,
                      class: "grid grid-cols-1 md:grid-cols-2 gap-4"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(addresses), (address) => {
                        return openBlock(), createBlock(_component_UCard, {
                          key: address.id,
                          class: { "ring-2 ring-primary-500": address.is_default }
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "space-y-3" }, [
                              createVNode("div", { class: "flex items-start justify-between" }, [
                                createVNode("div", null, [
                                  createVNode("div", { class: "flex items-center gap-2" }, [
                                    createVNode("h3", { class: "font-semibold text-lg" }, toDisplayString(address.type), 1),
                                    address.is_default ? (openBlock(), createBlock(_component_UBadge, {
                                      key: 0,
                                      color: "primary",
                                      variant: "subtle"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Default ")
                                      ]),
                                      _: 1
                                    })) : createCommentVNode("", true)
                                  ]),
                                  createVNode("p", { class: "text-sm text-gray-500" }, toDisplayString(address.label), 1)
                                ]),
                                createVNode(_component_UDropdownMenu, {
                                  items: getDropdownItems(address)
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UButton, {
                                      icon: "i-heroicons-ellipsis-vertical",
                                      variant: "ghost",
                                      color: "secondary"
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["items"])
                              ]),
                              createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400 space-y-1" }, [
                                createVNode("p", null, toDisplayString(address.street), 1),
                                createVNode("p", null, toDisplayString(address.city) + ", " + toDisplayString(address.state) + " " + toDisplayString(address.zip), 1),
                                createVNode("p", null, toDisplayString(address.country), 1),
                                address.phone ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "flex items-center gap-1"
                                }, [
                                  createVNode(_component_UIcon, {
                                    name: "i-heroicons-phone",
                                    class: "size-4"
                                  }),
                                  createTextVNode(" " + toDisplayString(address.phone), 1)
                                ])) : createCommentVNode("", true)
                              ])
                            ])
                          ]),
                          _: 2
                        }, 1032, ["class"]);
                      }), 128))
                    ]))
                  ]),
                  _: 1
                })
              ]),
              createVNode(_component_UModal, {
                open: unref(isAddModalOpen),
                "onUpdate:open": ($event) => isRef(isAddModalOpen) ? isAddModalOpen.value = $event : null,
                dismissible: !unref(loading),
                title: "Add/Update Address",
                description: "Address add/update"
              }, {
                content: withCtx(() => [
                  createVNode(_component_UCard, null, {
                    header: withCtx(() => [
                      createVNode("div", { class: "flex items-center gap-3" }, [
                        createVNode("div", { class: "p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg" }, [
                          createVNode(_component_UIcon, {
                            name: unref(editingAddress) ? "i-heroicons-pencil-square" : "i-heroicons-map-pin",
                            class: "text-primary-600 dark:text-primary-400 text-xl"
                          }, null, 8, ["name"])
                        ]),
                        createVNode("div", null, [
                          createVNode("h2", { class: "text-xl font-bold text-gray-900 dark:text-white" }, toDisplayString(unref(editingAddress) ? "Edit Address" : "Add New Address"), 1),
                          createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, toDisplayString(unref(editingAddress) ? "Update your address details" : "Fill in your address information"), 1)
                        ])
                      ])
                    ]),
                    footer: withCtx(() => [
                      createVNode("div", { class: "flex flex-col-reverse sm:flex-row justify-end gap-3" }, [
                        createVNode(_component_UButton, {
                          color: "secondary",
                          variant: "outline",
                          onClick: closeModal,
                          disabled: unref(loading),
                          size: "lg",
                          block: "",
                          class: "sm:w-auto"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Cancel ")
                          ]),
                          _: 1
                        }, 8, ["disabled"]),
                        createVNode(_component_UButton, {
                          type: "submit",
                          onClick: handleSubmit,
                          loading: unref(loading),
                          size: "lg",
                          icon: "i-heroicons-check",
                          block: "",
                          class: "sm:w-auto"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(editingAddress) ? "Update Address" : "Add Address"), 1)
                          ]),
                          _: 1
                        }, 8, ["loading"])
                      ])
                    ]),
                    default: withCtx(() => [
                      createVNode(_component_UForm, {
                        state: unref(form),
                        onSubmit: handleSubmit,
                        class: "space-y-5"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "space-y-4 pb-4 border-b border-gray-200 dark:border-gray-700" }, [
                            createVNode(_component_UFormField, {
                              label: "Address Type",
                              required: "",
                              name: "type"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_USelectMenu, {
                                  modelValue: unref(form).type,
                                  "onUpdate:modelValue": ($event) => unref(form).type = $event,
                                  items: unref(addressTypeItems),
                                  placeholder: "Select address type",
                                  icon: "i-heroicons-tag",
                                  size: "lg",
                                  class: "w-full"
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [
                            createVNode(_component_UFormField, {
                              label: "First Name",
                              required: "",
                              name: "first_name"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_UInput, {
                                  modelValue: unref(form).first_name,
                                  "onUpdate:modelValue": ($event) => unref(form).first_name = $event,
                                  placeholder: "First Name",
                                  icon: "i-heroicons-building-office-2",
                                  size: "lg"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UFormField, {
                              label: "Last Name",
                              required: "",
                              name: "last_name"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_UInput, {
                                  modelValue: unref(form).last_name,
                                  "onUpdate:modelValue": ($event) => unref(form).last_name = $event,
                                  placeholder: "Last Name",
                                  icon: "i-heroicons-map",
                                  size: "lg"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("div", { class: "space-y-4" }, [
                            createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                              createVNode(_component_UIcon, {
                                name: "i-heroicons-home",
                                class: "text-gray-400"
                              }),
                              createVNode("h3", { class: "text-sm font-semibold text-gray-700 dark:text-gray-300" }, "Location Details")
                            ]),
                            createVNode(_component_UFormField, {
                              label: "Street Address",
                              required: "",
                              name: "street"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_UTextarea, {
                                  modelValue: unref(form).address_line_1,
                                  "onUpdate:modelValue": ($event) => unref(form).address_line_1 = $event,
                                  placeholder: "Enter your street address, apartment, suite, etc.",
                                  class: "w-full",
                                  rows: 2,
                                  size: "lg",
                                  autoresize: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [
                            createVNode(_component_UFormField, {
                              label: "City",
                              required: "",
                              name: "city"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_UInput, {
                                  modelValue: unref(form).city,
                                  "onUpdate:modelValue": ($event) => unref(form).city = $event,
                                  placeholder: "City",
                                  icon: "i-heroicons-building-office-2",
                                  size: "lg"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UFormField, {
                              label: "State / Province",
                              required: "",
                              name: "state"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_UInput, {
                                  modelValue: unref(form).state,
                                  "onUpdate:modelValue": ($event) => unref(form).state = $event,
                                  placeholder: "State or Province",
                                  icon: "i-heroicons-map",
                                  size: "lg"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [
                            createVNode(_component_UFormField, {
                              label: "ZIP / Postal Code",
                              required: "",
                              name: "zip"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_UInput, {
                                  modelValue: unref(form).postal_code,
                                  "onUpdate:modelValue": ($event) => unref(form).postal_code = $event,
                                  placeholder: "e.g., 12345",
                                  icon: "i-heroicons-hashtag",
                                  size: "lg"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UFormField, {
                              label: "Country",
                              required: "",
                              name: "country"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_USelectMenu, {
                                  modelValue: unref(form).country,
                                  "onUpdate:modelValue": ($event) => unref(form).country = $event,
                                  items: unref(countries),
                                  placeholder: "Country",
                                  icon: "i-heroicons-globe-alt",
                                  size: "lg",
                                  class: "w-full"
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("div", { class: "space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700" }, [
                            createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                              createVNode(_component_UIcon, {
                                name: "i-heroicons-phone",
                                class: "text-gray-400"
                              }),
                              createVNode("h3", { class: "text-sm font-semibold text-gray-700 dark:text-gray-300" }, "Contact Information")
                            ]),
                            createVNode(_component_UFormField, {
                              label: "Phone Number (Optional)",
                              name: "phone",
                              hint: "Include country code for international"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_UInput, {
                                  modelValue: unref(form).phone,
                                  "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                                  placeholder: "+1 (234) 567-8900",
                                  icon: "i-heroicons-device-phone-mobile",
                                  size: "lg",
                                  type: "tel",
                                  class: "w-full"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("div", { class: "bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4" }, [
                            createVNode(_component_UCheckbox, {
                              modelValue: unref(form).is_default,
                              "onUpdate:modelValue": ($event) => unref(form).is_default = $event,
                              label: "Set as default address",
                              ui: {
                                label: "text-sm font-medium text-gray-700 dark:text-gray-300"
                              }
                            }, {
                              label: withCtx(() => [
                                createVNode("div", { class: "flex items-center gap-2" }, [
                                  createVNode("span", { class: "text-sm font-medium text-gray-700 dark:text-gray-300" }, " Set as default address "),
                                  unref(form).is_default ? (openBlock(), createBlock(_component_UBadge, {
                                    key: 0,
                                    color: "primary",
                                    variant: "subtle",
                                    size: "xs"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Default ")
                                    ]),
                                    _: 1
                                  })) : createCommentVNode("", true)
                                ]),
                                createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400 mt-1" }, " This address will be selected by default for orders ")
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"])
                          ])
                        ]),
                        _: 1
                      }, 8, ["state"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["open", "onUpdate:open", "dismissible"]),
              createVNode(_component_UModal, {
                open: unref(isDeleteModalOpen),
                "onUpdate:open": ($event) => isRef(isDeleteModalOpen) ? isDeleteModalOpen.value = $event : null
              }, {
                content: withCtx(() => [
                  createVNode(_component_UCard, null, {
                    header: withCtx(() => [
                      createVNode("div", { class: "flex items-center gap-3" }, [
                        createVNode("div", { class: "p-2 bg-red-50 dark:bg-red-900/20 rounded-lg" }, [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-exclamation-triangle",
                            class: "text-red-600 dark:text-red-400 text-xl"
                          })
                        ]),
                        createVNode("div", null, [
                          createVNode("h2", { class: "text-xl font-bold text-gray-900 dark:text-white" }, "Delete Address"),
                          createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "This action cannot be undone")
                        ])
                      ])
                    ]),
                    footer: withCtx(() => [
                      createVNode("div", { class: "flex flex-col-reverse sm:flex-row justify-end gap-3" }, [
                        createVNode(_component_UButton, {
                          color: "secondary",
                          variant: "outline",
                          onClick: ($event) => isDeleteModalOpen.value = false,
                          disabled: unref(loading),
                          size: "lg",
                          block: "",
                          class: "sm:w-auto"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Cancel ")
                          ]),
                          _: 1
                        }, 8, ["onClick", "disabled"]),
                        createVNode(_component_UButton, {
                          color: "error",
                          onClick: confirmDelete,
                          loading: unref(loading),
                          size: "lg",
                          icon: "i-heroicons-trash",
                          block: "",
                          class: "sm:w-auto"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Delete Address ")
                          ]),
                          _: 1
                        }, 8, ["loading"])
                      ])
                    ]),
                    default: withCtx(() => [
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode("div", { class: "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4" }, [
                          createVNode("p", { class: "text-sm text-red-800 dark:text-red-200" }, " Are you sure you want to delete this address? All associated data will be permanently removed from your account. ")
                        ]),
                        unref(deletingAddress) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4"
                        }, [
                          createVNode("h3", { class: "text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" }, "Address Details:"),
                          createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400 space-y-1" }, [
                            createVNode("p", { class: "font-medium" }, toDisplayString(unref(deletingAddress).type) + " - " + toDisplayString(unref(deletingAddress).label), 1),
                            createVNode("p", null, toDisplayString(unref(deletingAddress).street), 1),
                            createVNode("p", null, toDisplayString(unref(deletingAddress).city) + ", " + toDisplayString(unref(deletingAddress).state) + " " + toDisplayString(unref(deletingAddress).zip), 1)
                          ])
                        ])) : createCommentVNode("", true)
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["open", "onUpdate:open"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BKDzSnrt.mjs.map
