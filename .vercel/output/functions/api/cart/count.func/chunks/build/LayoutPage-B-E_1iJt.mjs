import { _ as _sfc_main$6 } from './Container-DJ2zbRf-.mjs';
import { a as useToast, x as useRoute, b as useRouter, u as useHead, d as _sfc_main$e, e as _sfc_main$8$1, o as useAppConfig, G as usePortal, q as useFormField, H as useFieldGroup, C as useComponentIcons, t as tv, I as isArrayOfArray, y as _sfc_main$b, r as get, J as _sfc_main$c, K as getDisplayValue, _ as __nuxt_component_0$1 } from './server.mjs';
import { _ as _sfc_main$9 } from './SelectMenu-C5QjXK1B.mjs';
import { _ as _sfc_main$7 } from './Input-DomsB7QD.mjs';
import { _ as _sfc_main$8 } from './Badge-DZtstYnH.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, unref, isRef, createTextVNode, createVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSlots, toRef, renderSlot, watch, nextTick, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderSlot, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseEqual, ssrLooseContain } from 'vue/server-renderer';
import { u as useProducts } from './useProducts-Dyx4NQUU.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import { useForwardPropsEmits, SelectRoot, SelectTrigger, SelectPortal, SelectContent, SelectGroup, SelectLabel, SelectSeparator, SelectItem, SelectItemText, SelectItemIndicator, SelectArrow } from 'reka-ui';
import { G as defu } from '../_/nitro.mjs';
import { reactivePick } from '@vueuse/core';
import { a as __nuxt_component_9 } from './ProductCard-DH2uBlVk.mjs';
import { _ as _sfc_main$a } from './Card-D31Cx9o-.mjs';
import { u as useCart } from './useCart-YbNJw6-2.mjs';

const maxPriceLimit = 1e4;
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "Sidebar",
  __ssrInlineRender: true,
  props: {
    filters: {}
  },
  emits: ["apply-filters", "clear-filters", "update:filters"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { getAllCategories } = useProducts();
    const localFilters = ref({
      category: "all",
      featured: void 0,
      in_stock: void 0,
      min_price: void 0,
      max_price: void 0,
      on_sale: false
    });
    const tempMinPrice = ref("");
    const tempMaxPrice = ref("");
    const isUpdatingFromProps = ref(false);
    const inStockCount = ref(0);
    const quickPriceRanges = [
      { label: "Under $50", min: 0, max: 50 },
      { label: "$50-$100", min: 50, max: 100 },
      { label: "$100-$500", min: 100, max: 500 },
      { label: "$500+", min: 500, max: null }
    ];
    const categoryOptions = computed(() => {
      const categories = getAllCategories.value.map((cat) => ({
        value: cat.slug,
        label: cat.name,
        icon: "i-heroicons-tag"
      }));
      return [
        { value: "all", label: "All Categories", icon: "i-heroicons-squares-2x2" },
        ...categories
      ];
    });
    const selectedCategory = computed({
      get: () => {
        const slug = localFilters.value.category || "all";
        return categoryOptions.value.find((cat) => cat.value === slug) || categoryOptions.value[0];
      },
      set: (option) => {
        localFilters.value.category = option.value;
      }
    });
    const displayMinPrice = computed(() => {
      return localFilters.value.min_price || 0;
    });
    const displayMaxPrice = computed(() => {
      return localFilters.value.max_price || maxPriceLimit;
    });
    const hasActiveFilters = computed(() => {
      return localFilters.value.category && localFilters.value.category !== "all" || localFilters.value.featured !== void 0 || localFilters.value.in_stock !== void 0 || localFilters.value.min_price || localFilters.value.max_price || localFilters.value.on_sale === true;
    });
    const activeFilterCount = computed(() => {
      let count = 0;
      if (localFilters.value.category && localFilters.value.category !== "all") count++;
      if (localFilters.value.featured !== void 0) count++;
      if (localFilters.value.in_stock !== void 0) count++;
      if (localFilters.value.min_price || localFilters.value.max_price) count++;
      if (localFilters.value.on_sale === true) count++;
      return count;
    });
    const getCategoryLabel = (slug) => {
      if (!slug || slug === "all") return "All Categories";
      const category = categoryOptions.value.find((c) => c.value === slug);
      return category?.label || slug;
    };
    const isActivePriceRange = (range) => {
      const min = Number(localFilters.value.min_price) || 0;
      const max = Number(localFilters.value.max_price) || maxPriceLimit;
      if (range.max === null) {
        return min >= range.min && max === maxPriceLimit;
      }
      return min === range.min && max === range.max;
    };
    const setQuickPrice = (range) => {
      localFilters.value.min_price = range.min;
      localFilters.value.max_price = range.max || maxPriceLimit;
      tempMinPrice.value = range.min;
      tempMaxPrice.value = range.max || maxPriceLimit;
    };
    const updatePriceFilters = () => {
      const minVal = Number(tempMinPrice.value);
      const maxVal = Number(tempMaxPrice.value);
      if (tempMinPrice.value !== "" && !isNaN(minVal) && minVal >= 0) {
        localFilters.value.min_price = minVal;
      } else if (tempMinPrice.value === "") {
        localFilters.value.min_price = void 0;
      }
      if (tempMaxPrice.value !== "" && !isNaN(maxVal) && maxVal >= 0) {
        localFilters.value.max_price = maxVal;
      } else if (tempMaxPrice.value === "") {
        localFilters.value.max_price = void 0;
      }
      if (localFilters.value.min_price !== void 0 && localFilters.value.max_price !== void 0 && Number(localFilters.value.min_price) > Number(localFilters.value.max_price)) {
        const temp = localFilters.value.min_price;
        localFilters.value.min_price = localFilters.value.max_price;
        localFilters.value.max_price = temp;
        tempMinPrice.value = localFilters.value.min_price;
        tempMaxPrice.value = localFilters.value.max_price;
      }
    };
    const handleApplyFilters = () => {
      const filtersToApply = { ...localFilters.value };
      if (filtersToApply.category === "all") {
        filtersToApply.category = void 0;
      }
      if (filtersToApply.on_sale === false) {
        filtersToApply.on_sale = void 0;
      }
      emit("apply-filters", filtersToApply);
      emit("update:filters", filtersToApply);
    };
    const handleClearFilters = () => {
      localFilters.value = {
        category: "all",
        featured: void 0,
        in_stock: void 0,
        min_price: void 0,
        max_price: void 0,
        on_sale: false
      };
      tempMinPrice.value = "";
      tempMaxPrice.value = "";
      emit("clear-filters");
      emit("update:filters", { ...localFilters.value });
    };
    watch(
      () => localFilters.value.min_price,
      (newVal) => {
        if (newVal !== void 0 && newVal !== tempMinPrice.value) {
          tempMinPrice.value = newVal;
        }
      }
    );
    watch(
      () => localFilters.value.max_price,
      (newVal) => {
        if (newVal !== void 0 && newVal !== tempMaxPrice.value) {
          tempMaxPrice.value = newVal;
        }
      }
    );
    watch(
      () => props.filters,
      (newFilters) => {
        if (newFilters && !isUpdatingFromProps.value) {
          isUpdatingFromProps.value = true;
          localFilters.value = {
            category: newFilters.category || "all",
            featured: newFilters.featured,
            in_stock: newFilters.in_stock,
            min_price: newFilters.min_price,
            max_price: newFilters.max_price,
            on_sale: newFilters.on_sale || false
          };
          tempMinPrice.value = newFilters.min_price || "";
          tempMaxPrice.value = newFilters.max_price || "";
          nextTick(() => {
            isUpdatingFromProps.value = false;
          });
        }
      },
      { deep: true, immediate: true }
    );
    let applyTimeout = null;
    watch(
      localFilters,
      () => {
        if (isUpdatingFromProps.value) return;
        if (applyTimeout) {
          clearTimeout(applyTimeout);
        }
        applyTimeout = setTimeout(() => {
          handleApplyFilters();
        }, 800);
      },
      { deep: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$8$1;
      const _component_USelectMenu = _sfc_main$9;
      const _component_UIcon = _sfc_main$e;
      const _component_UInput = _sfc_main$7;
      const _component_UBadge = _sfc_main$8;
      _push(`<aside${ssrRenderAttrs(mergeProps({ class: "lg:w-64 flex-shrink-0" }, _attrs))} data-v-a73ad2c5><div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm lg:sticky lg:top-4" data-v-a73ad2c5><div class="flex items-center justify-between mb-4" data-v-a73ad2c5><h2 class="text-lg font-semibold text-gray-900 dark:text-white" data-v-a73ad2c5>Filters</h2>`);
      if (unref(hasActiveFilters)) {
        _push(ssrRenderComponent(_component_UButton, {
          size: "xs",
          color: "secondary",
          variant: "ghost",
          icon: "i-heroicons-x-mark",
          onClick: handleClearFilters
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Clear `);
            } else {
              return [
                createTextVNode(" Clear ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="mb-6" data-v-a73ad2c5><label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block" data-v-a73ad2c5> Category </label>`);
      _push(ssrRenderComponent(_component_USelectMenu, {
        modelValue: unref(selectedCategory),
        "onUpdate:modelValue": ($event) => isRef(selectedCategory) ? selectedCategory.value = $event : null,
        items: unref(categoryOptions),
        "value-attribute": "value",
        "option-attribute": "name",
        placeholder: "All categories",
        class: "w-full"
      }, {
        label: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(getCategoryLabel(unref(localFilters).category))}`);
          } else {
            return [
              createTextVNode(toDisplayString(getCategoryLabel(unref(localFilters).category)), 1)
            ];
          }
        }),
        option: withCtx(({ option }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-2" data-v-a73ad2c5${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: option.icon,
              class: "text-gray-400 flex-shrink-0"
            }, null, _parent2, _scopeId));
            _push2(`<span data-v-a73ad2c5${_scopeId}>${ssrInterpolate(option.label)}</span></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-2" }, [
                createVNode(_component_UIcon, {
                  name: option.icon,
                  class: "text-gray-400 flex-shrink-0"
                }, null, 8, ["name"]),
                createVNode("span", null, toDisplayString(option.label), 1)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="mb-6" data-v-a73ad2c5><label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block" data-v-a73ad2c5> Product Type </label><div class="space-y-2" data-v-a73ad2c5><label class="flex items-center gap-2 cursor-pointer" data-v-a73ad2c5><input type="radio"${ssrRenderAttr("value", void 0)}${ssrIncludeBooleanAttr(ssrLooseEqual(unref(localFilters).featured, void 0)) ? " checked" : ""} class="form-radio text-primary-500" data-v-a73ad2c5><span class="text-sm text-gray-700 dark:text-gray-300" data-v-a73ad2c5>All Products</span></label><label class="flex items-center gap-2 cursor-pointer" data-v-a73ad2c5><input type="radio"${ssrRenderAttr("value", true)}${ssrIncludeBooleanAttr(ssrLooseEqual(unref(localFilters).featured, true)) ? " checked" : ""} class="form-radio text-primary-500" data-v-a73ad2c5><span class="text-sm text-gray-700 dark:text-gray-300" data-v-a73ad2c5>Featured Only</span></label><label class="flex items-center gap-2 cursor-pointer" data-v-a73ad2c5><input type="radio"${ssrRenderAttr("value", false)}${ssrIncludeBooleanAttr(ssrLooseEqual(unref(localFilters).featured, false)) ? " checked" : ""} class="form-radio text-primary-500" data-v-a73ad2c5><span class="text-sm text-gray-700 dark:text-gray-300" data-v-a73ad2c5>Regular Products</span></label></div></div><div class="mb-6" data-v-a73ad2c5><label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block" data-v-a73ad2c5> Price Range </label><div class="flex justify-between text-xs text-gray-500 mb-2" data-v-a73ad2c5><span data-v-a73ad2c5>$${ssrInterpolate(unref(displayMinPrice))}</span><span data-v-a73ad2c5>$${ssrInterpolate(unref(displayMaxPrice))}</span></div><div class="flex gap-2 mb-3" data-v-a73ad2c5>`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(tempMinPrice),
        "onUpdate:modelValue": ($event) => isRef(tempMinPrice) ? tempMinPrice.value = $event : null,
        type: "number",
        placeholder: "Min",
        min: "0",
        max: unref(tempMaxPrice) || maxPriceLimit,
        icon: "i-heroicons-currency-dollar",
        onBlur: updatePriceFilters
      }, null, _parent));
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: unref(tempMaxPrice),
        "onUpdate:modelValue": ($event) => isRef(tempMaxPrice) ? tempMaxPrice.value = $event : null,
        type: "number",
        placeholder: "Max",
        min: unref(tempMinPrice) || 0,
        max: maxPriceLimit,
        icon: "i-heroicons-currency-dollar",
        onBlur: updatePriceFilters
      }, null, _parent));
      _push(`</div><div class="flex flex-wrap gap-2" data-v-a73ad2c5><!--[-->`);
      ssrRenderList(quickPriceRanges, (range) => {
        _push(ssrRenderComponent(_component_UButton, {
          key: range.label,
          size: "xs",
          variant: isActivePriceRange(range) ? "solid" : "soft",
          color: "primary",
          onClick: ($event) => setQuickPrice(range)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(range.label)}`);
            } else {
              return [
                createTextVNode(toDisplayString(range.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div><div class="mb-6" data-v-a73ad2c5><label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block" data-v-a73ad2c5> Availability </label><div class="space-y-2" data-v-a73ad2c5><label class="flex items-center gap-2 cursor-pointer" data-v-a73ad2c5><input type="radio"${ssrRenderAttr("value", void 0)}${ssrIncludeBooleanAttr(ssrLooseEqual(unref(localFilters).in_stock, void 0)) ? " checked" : ""} class="form-radio text-primary-500" data-v-a73ad2c5><span class="text-sm text-gray-700 dark:text-gray-300" data-v-a73ad2c5>All Products</span></label><label class="flex items-center justify-between cursor-pointer" data-v-a73ad2c5><span class="flex items-center gap-2" data-v-a73ad2c5><input type="radio"${ssrRenderAttr("value", true)}${ssrIncludeBooleanAttr(ssrLooseEqual(unref(localFilters).in_stock, true)) ? " checked" : ""} class="form-radio text-primary-500" data-v-a73ad2c5><span class="text-sm text-gray-700 dark:text-gray-300" data-v-a73ad2c5>In Stock</span></span>`);
      if (unref(inStockCount) > 0) {
        _push(ssrRenderComponent(_component_UBadge, {
          color: "success",
          variant: "soft",
          size: "xs"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(inStockCount))}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(inStockCount)), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</label><label class="flex items-center gap-2 cursor-pointer" data-v-a73ad2c5><input type="radio"${ssrRenderAttr("value", false)}${ssrIncludeBooleanAttr(ssrLooseEqual(unref(localFilters).in_stock, false)) ? " checked" : ""} class="form-radio text-primary-500" data-v-a73ad2c5><span class="text-sm text-gray-700 dark:text-gray-300" data-v-a73ad2c5>Out of Stock</span></label></div></div><div class="mb-6" data-v-a73ad2c5><label class="flex items-center gap-2 cursor-pointer" data-v-a73ad2c5><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(unref(localFilters).on_sale) ? ssrLooseContain(unref(localFilters).on_sale, null) : unref(localFilters).on_sale) ? " checked" : ""} class="form-checkbox text-primary-500 rounded" data-v-a73ad2c5><span class="flex items-center gap-2" data-v-a73ad2c5><span class="text-sm text-gray-700 dark:text-gray-300" data-v-a73ad2c5>On Sale / Discounted</span>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-tag",
        class: "text-red-500 w-4 h-4"
      }, null, _parent));
      _push(`</span></label></div><div class="space-y-2" data-v-a73ad2c5>`);
      _push(ssrRenderComponent(_component_UButton, {
        onClick: handleApplyFilters,
        color: "primary",
        block: "",
        icon: "i-heroicons-funnel"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Apply Filters `);
          } else {
            return [
              createTextVNode(" Apply Filters ")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(hasActiveFilters)) {
        _push(ssrRenderComponent(_component_UButton, {
          onClick: handleClearFilters,
          color: "secondary",
          variant: "soft",
          block: "",
          icon: "i-heroicons-x-mark"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Clear All Filters `);
            } else {
              return [
                createTextVNode(" Clear All Filters ")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(hasActiveFilters)) {
        _push(`<div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700" data-v-a73ad2c5><p class="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2" data-v-a73ad2c5> Active Filters (${ssrInterpolate(unref(activeFilterCount))}) </p><div class="space-y-1 text-xs text-gray-600 dark:text-gray-400" data-v-a73ad2c5>`);
        if (unref(localFilters).category && unref(localFilters).category !== "all") {
          _push(`<div data-v-a73ad2c5> • Category: ${ssrInterpolate(getCategoryLabel(unref(localFilters).category))}</div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(localFilters).featured !== void 0) {
          _push(`<div data-v-a73ad2c5> • ${ssrInterpolate(unref(localFilters).featured ? "Featured" : "Regular")} Products </div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(localFilters).in_stock !== void 0) {
          _push(`<div data-v-a73ad2c5> • ${ssrInterpolate(unref(localFilters).in_stock ? "In Stock" : "Out of Stock")}</div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(localFilters).min_price || unref(localFilters).max_price) {
          _push(`<div data-v-a73ad2c5> • Price: $${ssrInterpolate(unref(localFilters).min_price || 0)} - $${ssrInterpolate(unref(localFilters).max_price || maxPriceLimit)}</div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(localFilters).on_sale) {
          _push(`<div data-v-a73ad2c5> • On Sale Only </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></aside>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Shop/Sidebar.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$5, [["__scopeId", "data-v-a73ad2c5"]]), { __name: "ShopSidebar" });
const theme = {
  "slots": {
    "base": [
      "relative group rounded-md inline-flex items-center focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "leading": "absolute inset-y-0 start-0 flex items-center",
    "leadingIcon": "shrink-0 text-dimmed",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailing": "absolute inset-y-0 end-0 flex items-center",
    "trailingIcon": "shrink-0 text-dimmed",
    "value": "truncate pointer-events-none",
    "placeholder": "truncate text-dimmed",
    "arrow": "fill-default",
    "content": "max-h-60 w-(--reka-select-trigger-width) bg-default shadow-lg rounded-md ring ring-default overflow-hidden data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-select-content-transform-origin) pointer-events-auto flex flex-col",
    "viewport": "relative divide-y divide-default scroll-py-1 overflow-y-auto flex-1",
    "group": "p-1 isolate",
    "empty": "text-center text-muted",
    "label": "font-semibold text-highlighted",
    "separator": "-mx-1 my-1 h-px bg-border",
    "item": [
      "group relative w-full flex items-center select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75 text-default data-highlighted:not-data-disabled:text-highlighted data-highlighted:not-data-disabled:before:bg-elevated/50",
      "transition-colors before:transition-colors"
    ],
    "itemLeadingIcon": [
      "shrink-0 text-dimmed group-data-highlighted:not-group-data-disabled:text-default",
      "transition-colors"
    ],
    "itemLeadingAvatar": "shrink-0",
    "itemLeadingAvatarSize": "",
    "itemLeadingChip": "shrink-0",
    "itemLeadingChipSize": "",
    "itemTrailing": "ms-auto inline-flex gap-1.5 items-center",
    "itemTrailingIcon": "shrink-0",
    "itemLabel": "truncate"
  },
  "variants": {
    "fieldGroup": {
      "horizontal": "not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1]",
      "vertical": "not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none focus-visible:z-[1]"
    },
    "size": {
      "xs": {
        "base": "px-2 py-1 text-xs gap-1",
        "leading": "ps-2",
        "trailing": "pe-2",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4",
        "label": "p-1 text-[10px]/3 gap-1",
        "item": "p-1 text-xs gap-1",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemLeadingChip": "size-4",
        "itemLeadingChipSize": "sm",
        "itemTrailingIcon": "size-4",
        "empty": "p-1 text-xs"
      },
      "sm": {
        "base": "px-2.5 py-1.5 text-xs gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4",
        "label": "p-1.5 text-[10px]/3 gap-1.5",
        "item": "p-1.5 text-xs gap-1.5",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemLeadingChip": "size-4",
        "itemLeadingChipSize": "sm",
        "itemTrailingIcon": "size-4",
        "empty": "p-1.5 text-xs"
      },
      "md": {
        "base": "px-2.5 py-1.5 text-sm gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5",
        "label": "p-1.5 text-xs gap-1.5",
        "item": "p-1.5 text-sm gap-1.5",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemLeadingChip": "size-5",
        "itemLeadingChipSize": "md",
        "itemTrailingIcon": "size-5",
        "empty": "p-1.5 text-sm"
      },
      "lg": {
        "base": "px-3 py-2 text-sm gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5",
        "label": "p-2 text-xs gap-2",
        "item": "p-2 text-sm gap-2",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemLeadingChip": "size-5",
        "itemLeadingChipSize": "md",
        "itemTrailingIcon": "size-5",
        "empty": "p-2 text-sm"
      },
      "xl": {
        "base": "px-3 py-2 text-base gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs",
        "trailingIcon": "size-6",
        "label": "p-2 text-sm gap-2",
        "item": "p-2 text-base gap-2",
        "itemLeadingIcon": "size-6",
        "itemLeadingAvatarSize": "xs",
        "itemLeadingChip": "size-6",
        "itemLeadingChipSize": "lg",
        "itemTrailingIcon": "size-6",
        "empty": "p-2 text-base"
      }
    },
    "variant": {
      "outline": "text-highlighted bg-default ring ring-inset ring-accented",
      "soft": "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
      "subtle": "text-highlighted bg-elevated ring ring-inset ring-accented",
      "ghost": "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
      "none": "text-highlighted bg-transparent"
    },
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "leading": {
      "true": ""
    },
    "trailing": {
      "true": ""
    },
    "loading": {
      "true": ""
    },
    "highlight": {
      "true": ""
    },
    "type": {
      "file": "file:me-1.5 file:font-medium file:text-muted file:outline-none"
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus:ring-2 focus:ring-inset focus:ring-primary"
    },
    {
      "color": "secondary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus:ring-2 focus:ring-inset focus:ring-secondary"
    },
    {
      "color": "success",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus:ring-2 focus:ring-inset focus:ring-success"
    },
    {
      "color": "info",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus:ring-2 focus:ring-inset focus:ring-info"
    },
    {
      "color": "warning",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus:ring-2 focus:ring-inset focus:ring-warning"
    },
    {
      "color": "error",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus:ring-2 focus:ring-inset focus:ring-error"
    },
    {
      "color": "primary",
      "highlight": true,
      "class": "ring ring-inset ring-primary"
    },
    {
      "color": "secondary",
      "highlight": true,
      "class": "ring ring-inset ring-secondary"
    },
    {
      "color": "success",
      "highlight": true,
      "class": "ring ring-inset ring-success"
    },
    {
      "color": "info",
      "highlight": true,
      "class": "ring ring-inset ring-info"
    },
    {
      "color": "warning",
      "highlight": true,
      "class": "ring ring-inset ring-warning"
    },
    {
      "color": "error",
      "highlight": true,
      "class": "ring ring-inset ring-error"
    },
    {
      "color": "neutral",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "focus:ring-2 focus:ring-inset focus:ring-inverted"
    },
    {
      "color": "neutral",
      "highlight": true,
      "class": "ring ring-inset ring-inverted"
    },
    {
      "leading": true,
      "size": "xs",
      "class": "ps-7"
    },
    {
      "leading": true,
      "size": "sm",
      "class": "ps-8"
    },
    {
      "leading": true,
      "size": "md",
      "class": "ps-9"
    },
    {
      "leading": true,
      "size": "lg",
      "class": "ps-10"
    },
    {
      "leading": true,
      "size": "xl",
      "class": "ps-11"
    },
    {
      "trailing": true,
      "size": "xs",
      "class": "pe-7"
    },
    {
      "trailing": true,
      "size": "sm",
      "class": "pe-8"
    },
    {
      "trailing": true,
      "size": "md",
      "class": "pe-9"
    },
    {
      "trailing": true,
      "size": "lg",
      "class": "pe-10"
    },
    {
      "trailing": true,
      "size": "xl",
      "class": "pe-11"
    },
    {
      "loading": true,
      "leading": true,
      "class": {
        "leadingIcon": "animate-spin"
      }
    },
    {
      "loading": true,
      "leading": false,
      "trailing": true,
      "class": {
        "trailingIcon": "animate-spin"
      }
    }
  ],
  "defaultVariants": {
    "size": "sm",
    "color": "neutral",
    "variant": "outline"
  }
};
const _sfc_main$4 = /* @__PURE__ */ Object.assign({ inheritAttrs: false }, {
  __name: "USelect",
  __ssrInlineRender: true,
  props: {
    id: { type: String, required: false },
    placeholder: { type: String, required: false },
    color: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    trailingIcon: { type: [String, Object], required: false },
    selectedIcon: { type: [String, Object], required: false },
    content: { type: Object, required: false },
    arrow: { type: [Boolean, Object], required: false },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    valueKey: { type: null, required: false, default: "value" },
    labelKey: { type: null, required: false, default: "label" },
    items: { type: null, required: false },
    defaultValue: { type: null, required: false },
    modelValue: { type: null, required: false },
    multiple: { type: Boolean, required: false },
    highlight: { type: Boolean, required: false },
    autofocus: { type: Boolean, required: false },
    autofocusDelay: { type: Number, required: false, default: 0 },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    open: { type: Boolean, required: false },
    defaultOpen: { type: Boolean, required: false },
    autocomplete: { type: String, required: false },
    disabled: { type: Boolean, required: false },
    name: { type: String, required: false },
    required: { type: Boolean, required: false },
    icon: { type: [String, Object], required: false },
    avatar: { type: Object, required: false },
    leading: { type: Boolean, required: false },
    leadingIcon: { type: [String, Object], required: false },
    trailing: { type: Boolean, required: false },
    loading: { type: Boolean, required: false },
    loadingIcon: { type: [String, Object], required: false }
  },
  emits: ["update:open", "change", "blur", "focus", "update:modelValue"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const appConfig = useAppConfig();
    const rootProps = useForwardPropsEmits(reactivePick(props, "open", "defaultOpen", "disabled", "autocomplete", "required", "multiple"), emits);
    const portalProps = usePortal(toRef(() => props.portal));
    const contentProps = toRef(() => defu(props.content, { side: "bottom", sideOffset: 8, collisionPadding: 8, position: "popper" }));
    const arrowProps = toRef(() => props.arrow);
    const { emitFormChange, emitFormInput, emitFormBlur, emitFormFocus, size: formGroupSize, color, id, name, highlight, disabled, ariaAttrs } = useFormField(props);
    const { orientation, size: fieldGroupSize } = useFieldGroup(props);
    const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(toRef(() => defu(props, { trailingIcon: appConfig.ui.icons.chevronDown })));
    const selectSize = computed(() => fieldGroupSize.value || formGroupSize.value);
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.select || {} })({
      color: color.value,
      variant: props.variant,
      size: selectSize?.value,
      loading: props.loading,
      highlight: highlight.value,
      leading: isLeading.value || !!props.avatar || !!slots.leading,
      trailing: isTrailing.value || !!slots.trailing,
      fieldGroup: orientation.value
    }));
    const groups = computed(
      () => props.items?.length ? isArrayOfArray(props.items) ? props.items : [props.items] : []
    );
    const items = computed(() => groups.value.flatMap((group) => group));
    function displayValue(value) {
      if (props.multiple && Array.isArray(value)) {
        const displayedValues = value.map((item) => getDisplayValue(items.value, item, {
          labelKey: props.labelKey,
          valueKey: props.valueKey
        })).filter((v) => v != null && v !== "");
        return displayedValues.length > 0 ? displayedValues.join(", ") : void 0;
      }
      return getDisplayValue(items.value, value, {
        labelKey: props.labelKey,
        valueKey: props.valueKey
      });
    }
    const triggerRef = ref(null);
    function onUpdate(value) {
      const event = new Event("change", { target: { value } });
      emits("change", event);
      emitFormChange();
      emitFormInput();
    }
    function onUpdateOpen(value) {
      if (!value) {
        const event = new FocusEvent("blur");
        emits("blur", event);
        emitFormBlur();
      } else {
        const event = new FocusEvent("focus");
        emits("focus", event);
        emitFormFocus();
      }
    }
    function isSelectItem(item) {
      return typeof item === "object" && item !== null;
    }
    __expose({
      triggerRef
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(SelectRoot), mergeProps({ name: unref(name) }, unref(rootProps), {
        autocomplete: __props.autocomplete,
        disabled: unref(disabled),
        "default-value": __props.defaultValue,
        "model-value": __props.modelValue,
        "onUpdate:modelValue": onUpdate,
        "onUpdate:open": onUpdateOpen
      }, _attrs), {
        default: withCtx(({ modelValue, open }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(SelectTrigger), mergeProps({
              id: unref(id),
              ref_key: "triggerRef",
              ref: triggerRef,
              class: ui.value.base({ class: [props.ui?.base, props.class] })
            }, { ..._ctx.$attrs, ...unref(ariaAttrs) }), {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(isLeading) || !!__props.avatar || !!slots.leading) {
                    _push3(`<span class="${ssrRenderClass(ui.value.leading({ class: props.ui?.leading }))}"${_scopeId2}>`);
                    ssrRenderSlot(_ctx.$slots, "leading", {
                      modelValue,
                      open,
                      ui: ui.value
                    }, () => {
                      if (unref(isLeading) && unref(leadingIconName)) {
                        _push3(ssrRenderComponent(_sfc_main$e, {
                          name: unref(leadingIconName),
                          class: ui.value.leadingIcon({ class: props.ui?.leadingIcon })
                        }, null, _parent3, _scopeId2));
                      } else if (!!__props.avatar) {
                        _push3(ssrRenderComponent(_sfc_main$b, mergeProps({
                          size: props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                        }, __props.avatar, {
                          class: ui.value.itemLeadingAvatar({ class: props.ui?.itemLeadingAvatar })
                        }), null, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                    }, _push3, _parent3, _scopeId2);
                    _push3(`</span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  ssrRenderSlot(_ctx.$slots, "default", {
                    modelValue,
                    open
                  }, () => {
                    _push3(`<!--[-->`);
                    ssrRenderList([displayValue(modelValue)], (displayedModelValue) => {
                      _push3(`<!--[-->`);
                      if (displayedModelValue !== void 0 && displayedModelValue !== null) {
                        _push3(`<span class="${ssrRenderClass(ui.value.value({ class: props.ui?.value }))}"${_scopeId2}>${ssrInterpolate(displayedModelValue)}</span>`);
                      } else {
                        _push3(`<span class="${ssrRenderClass(ui.value.placeholder({ class: props.ui?.placeholder }))}"${_scopeId2}>${ssrInterpolate(__props.placeholder ?? " ")}</span>`);
                      }
                      _push3(`<!--]-->`);
                    });
                    _push3(`<!--]-->`);
                  }, _push3, _parent3, _scopeId2);
                  if (unref(isTrailing) || !!slots.trailing) {
                    _push3(`<span class="${ssrRenderClass(ui.value.trailing({ class: props.ui?.trailing }))}"${_scopeId2}>`);
                    ssrRenderSlot(_ctx.$slots, "trailing", {
                      modelValue,
                      open,
                      ui: ui.value
                    }, () => {
                      if (unref(trailingIconName)) {
                        _push3(ssrRenderComponent(_sfc_main$e, {
                          name: unref(trailingIconName),
                          class: ui.value.trailingIcon({ class: props.ui?.trailingIcon })
                        }, null, _parent3, _scopeId2));
                      } else {
                        _push3(`<!---->`);
                      }
                    }, _push3, _parent3, _scopeId2);
                    _push3(`</span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    unref(isLeading) || !!__props.avatar || !!slots.leading ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: ui.value.leading({ class: props.ui?.leading })
                    }, [
                      renderSlot(_ctx.$slots, "leading", {
                        modelValue,
                        open,
                        ui: ui.value
                      }, () => [
                        unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$e, {
                          key: 0,
                          name: unref(leadingIconName),
                          class: ui.value.leadingIcon({ class: props.ui?.leadingIcon })
                        }, null, 8, ["name", "class"])) : !!__props.avatar ? (openBlock(), createBlock(_sfc_main$b, mergeProps({
                          key: 1,
                          size: props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                        }, __props.avatar, {
                          class: ui.value.itemLeadingAvatar({ class: props.ui?.itemLeadingAvatar })
                        }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                      ])
                    ], 2)) : createCommentVNode("", true),
                    renderSlot(_ctx.$slots, "default", {
                      modelValue,
                      open
                    }, () => [
                      (openBlock(true), createBlock(Fragment, null, renderList([displayValue(modelValue)], (displayedModelValue) => {
                        return openBlock(), createBlock(Fragment, { key: displayedModelValue }, [
                          displayedModelValue !== void 0 && displayedModelValue !== null ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: ui.value.value({ class: props.ui?.value })
                          }, toDisplayString(displayedModelValue), 3)) : (openBlock(), createBlock("span", {
                            key: 1,
                            class: ui.value.placeholder({ class: props.ui?.placeholder })
                          }, toDisplayString(__props.placeholder ?? " "), 3))
                        ], 64);
                      }), 128))
                    ]),
                    unref(isTrailing) || !!slots.trailing ? (openBlock(), createBlock("span", {
                      key: 1,
                      class: ui.value.trailing({ class: props.ui?.trailing })
                    }, [
                      renderSlot(_ctx.$slots, "trailing", {
                        modelValue,
                        open,
                        ui: ui.value
                      }, () => [
                        unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$e, {
                          key: 0,
                          name: unref(trailingIconName),
                          class: ui.value.trailingIcon({ class: props.ui?.trailingIcon })
                        }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                      ])
                    ], 2)) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(SelectPortal), unref(portalProps), {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(SelectContent), mergeProps({
                    class: ui.value.content({ class: props.ui?.content })
                  }, contentProps.value), {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        ssrRenderSlot(_ctx.$slots, "content-top", {}, null, _push4, _parent4, _scopeId3);
                        _push4(`<div role="presentation" class="${ssrRenderClass(ui.value.viewport({ class: props.ui?.viewport }))}"${_scopeId3}><!--[-->`);
                        ssrRenderList(groups.value, (group, groupIndex) => {
                          _push4(ssrRenderComponent(unref(SelectGroup), {
                            key: `group-${groupIndex}`,
                            class: ui.value.group({ class: props.ui?.group })
                          }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(group, (item, index) => {
                                  _push5(`<!--[-->`);
                                  if (isSelectItem(item) && item.type === "label") {
                                    _push5(ssrRenderComponent(unref(SelectLabel), {
                                      class: ui.value.label({ class: [props.ui?.label, item.ui?.label, item.class] })
                                    }, {
                                      default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(`${ssrInterpolate(unref(get)(item, props.labelKey))}`);
                                        } else {
                                          return [
                                            createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  } else if (isSelectItem(item) && item.type === "separator") {
                                    _push5(ssrRenderComponent(unref(SelectSeparator), {
                                      class: ui.value.separator({ class: [props.ui?.separator, item.ui?.separator, item.class] })
                                    }, null, _parent5, _scopeId4));
                                  } else {
                                    _push5(ssrRenderComponent(unref(SelectItem), {
                                      class: ui.value.item({ class: [props.ui?.item, isSelectItem(item) && item.ui?.item, isSelectItem(item) && item.class] }),
                                      disabled: isSelectItem(item) && item.disabled,
                                      value: isSelectItem(item) ? unref(get)(item, props.valueKey) : item,
                                      onSelect: ($event) => isSelectItem(item) && item.onSelect?.($event)
                                    }, {
                                      default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          ssrRenderSlot(_ctx.$slots, "item", {
                                            item,
                                            index
                                          }, () => {
                                            ssrRenderSlot(_ctx.$slots, "item-leading", {
                                              item,
                                              index
                                            }, () => {
                                              if (isSelectItem(item) && item.icon) {
                                                _push6(ssrRenderComponent(_sfc_main$e, {
                                                  name: item.icon,
                                                  class: ui.value.itemLeadingIcon({ class: [props.ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                                                }, null, _parent6, _scopeId5));
                                              } else if (isSelectItem(item) && item.avatar) {
                                                _push6(ssrRenderComponent(_sfc_main$b, mergeProps({
                                                  size: item.ui?.itemLeadingAvatarSize || props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                                }, { ref_for: true }, item.avatar, {
                                                  class: ui.value.itemLeadingAvatar({ class: [props.ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                                                }), null, _parent6, _scopeId5));
                                              } else if (isSelectItem(item) && item.chip) {
                                                _push6(ssrRenderComponent(_sfc_main$c, mergeProps({
                                                  size: item.ui?.itemLeadingChipSize || props.ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                                  inset: "",
                                                  standalone: ""
                                                }, { ref_for: true }, item.chip, {
                                                  class: ui.value.itemLeadingChip({ class: [props.ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
                                                }), null, _parent6, _scopeId5));
                                              } else {
                                                _push6(`<!---->`);
                                              }
                                            }, _push6, _parent6, _scopeId5);
                                            _push6(ssrRenderComponent(unref(SelectItemText), {
                                              class: ui.value.itemLabel({ class: [props.ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                                            }, {
                                              default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                                if (_push7) {
                                                  ssrRenderSlot(_ctx.$slots, "item-label", {
                                                    item,
                                                    index
                                                  }, () => {
                                                    _push7(`${ssrInterpolate(isSelectItem(item) ? unref(get)(item, props.labelKey) : item)}`);
                                                  }, _push7, _parent7, _scopeId6);
                                                } else {
                                                  return [
                                                    renderSlot(_ctx.$slots, "item-label", {
                                                      item,
                                                      index
                                                    }, () => [
                                                      createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1)
                                                    ])
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent6, _scopeId5));
                                            _push6(`<span class="${ssrRenderClass(ui.value.itemTrailing({ class: [props.ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] }))}"${_scopeId5}>`);
                                            ssrRenderSlot(_ctx.$slots, "item-trailing", {
                                              item,
                                              index
                                            }, null, _push6, _parent6, _scopeId5);
                                            _push6(ssrRenderComponent(unref(SelectItemIndicator), { "as-child": "" }, {
                                              default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                                if (_push7) {
                                                  _push7(ssrRenderComponent(_sfc_main$e, {
                                                    name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                    class: ui.value.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                                  }, null, _parent7, _scopeId6));
                                                } else {
                                                  return [
                                                    createVNode(_sfc_main$e, {
                                                      name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                      class: ui.value.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                                    }, null, 8, ["name", "class"])
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent6, _scopeId5));
                                            _push6(`</span>`);
                                          }, _push6, _parent6, _scopeId5);
                                        } else {
                                          return [
                                            renderSlot(_ctx.$slots, "item", {
                                              item,
                                              index
                                            }, () => [
                                              renderSlot(_ctx.$slots, "item-leading", {
                                                item,
                                                index
                                              }, () => [
                                                isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$e, {
                                                  key: 0,
                                                  name: item.icon,
                                                  class: ui.value.itemLeadingIcon({ class: [props.ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                                                }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$b, mergeProps({
                                                  key: 1,
                                                  size: item.ui?.itemLeadingAvatarSize || props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                                }, { ref_for: true }, item.avatar, {
                                                  class: ui.value.itemLeadingAvatar({ class: [props.ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                                                }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$c, mergeProps({
                                                  key: 2,
                                                  size: item.ui?.itemLeadingChipSize || props.ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                                  inset: "",
                                                  standalone: ""
                                                }, { ref_for: true }, item.chip, {
                                                  class: ui.value.itemLeadingChip({ class: [props.ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
                                                }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                                              ]),
                                              createVNode(unref(SelectItemText), {
                                                class: ui.value.itemLabel({ class: [props.ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                                              }, {
                                                default: withCtx(() => [
                                                  renderSlot(_ctx.$slots, "item-label", {
                                                    item,
                                                    index
                                                  }, () => [
                                                    createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1)
                                                  ])
                                                ]),
                                                _: 2
                                              }, 1032, ["class"]),
                                              createVNode("span", {
                                                class: ui.value.itemTrailing({ class: [props.ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
                                              }, [
                                                renderSlot(_ctx.$slots, "item-trailing", {
                                                  item,
                                                  index
                                                }),
                                                createVNode(unref(SelectItemIndicator), { "as-child": "" }, {
                                                  default: withCtx(() => [
                                                    createVNode(_sfc_main$e, {
                                                      name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                      class: ui.value.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                                    }, null, 8, ["name", "class"])
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ], 2)
                                            ])
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  }
                                  _push5(`<!--]-->`);
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
                                    return openBlock(), createBlock(Fragment, {
                                      key: `group-${groupIndex}-${index}`
                                    }, [
                                      isSelectItem(item) && item.type === "label" ? (openBlock(), createBlock(unref(SelectLabel), {
                                        key: 0,
                                        class: ui.value.label({ class: [props.ui?.label, item.ui?.label, item.class] })
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (openBlock(), createBlock(unref(SelectSeparator), {
                                        key: 1,
                                        class: ui.value.separator({ class: [props.ui?.separator, item.ui?.separator, item.class] })
                                      }, null, 8, ["class"])) : (openBlock(), createBlock(unref(SelectItem), {
                                        key: 2,
                                        class: ui.value.item({ class: [props.ui?.item, isSelectItem(item) && item.ui?.item, isSelectItem(item) && item.class] }),
                                        disabled: isSelectItem(item) && item.disabled,
                                        value: isSelectItem(item) ? unref(get)(item, props.valueKey) : item,
                                        onSelect: ($event) => isSelectItem(item) && item.onSelect?.($event)
                                      }, {
                                        default: withCtx(() => [
                                          renderSlot(_ctx.$slots, "item", {
                                            item,
                                            index
                                          }, () => [
                                            renderSlot(_ctx.$slots, "item-leading", {
                                              item,
                                              index
                                            }, () => [
                                              isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$e, {
                                                key: 0,
                                                name: item.icon,
                                                class: ui.value.itemLeadingIcon({ class: [props.ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                                              }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$b, mergeProps({
                                                key: 1,
                                                size: item.ui?.itemLeadingAvatarSize || props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                              }, { ref_for: true }, item.avatar, {
                                                class: ui.value.itemLeadingAvatar({ class: [props.ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                                              }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$c, mergeProps({
                                                key: 2,
                                                size: item.ui?.itemLeadingChipSize || props.ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                                inset: "",
                                                standalone: ""
                                              }, { ref_for: true }, item.chip, {
                                                class: ui.value.itemLeadingChip({ class: [props.ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
                                              }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                                            ]),
                                            createVNode(unref(SelectItemText), {
                                              class: ui.value.itemLabel({ class: [props.ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                                            }, {
                                              default: withCtx(() => [
                                                renderSlot(_ctx.$slots, "item-label", {
                                                  item,
                                                  index
                                                }, () => [
                                                  createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1)
                                                ])
                                              ]),
                                              _: 2
                                            }, 1032, ["class"]),
                                            createVNode("span", {
                                              class: ui.value.itemTrailing({ class: [props.ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
                                            }, [
                                              renderSlot(_ctx.$slots, "item-trailing", {
                                                item,
                                                index
                                              }),
                                              createVNode(unref(SelectItemIndicator), { "as-child": "" }, {
                                                default: withCtx(() => [
                                                  createVNode(_sfc_main$e, {
                                                    name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                    class: ui.value.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                                  }, null, 8, ["name", "class"])
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ], 2)
                                          ])
                                        ]),
                                        _: 2
                                      }, 1032, ["class", "disabled", "value", "onSelect"]))
                                    ], 64);
                                  }), 128))
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]--></div>`);
                        ssrRenderSlot(_ctx.$slots, "content-bottom", {}, null, _push4, _parent4, _scopeId3);
                        if (!!__props.arrow) {
                          _push4(ssrRenderComponent(unref(SelectArrow), mergeProps(arrowProps.value, {
                            class: ui.value.arrow({ class: props.ui?.arrow })
                          }), null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          renderSlot(_ctx.$slots, "content-top"),
                          createVNode("div", {
                            role: "presentation",
                            class: ui.value.viewport({ class: props.ui?.viewport })
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(groups.value, (group, groupIndex) => {
                              return openBlock(), createBlock(unref(SelectGroup), {
                                key: `group-${groupIndex}`,
                                class: ui.value.group({ class: props.ui?.group })
                              }, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
                                    return openBlock(), createBlock(Fragment, {
                                      key: `group-${groupIndex}-${index}`
                                    }, [
                                      isSelectItem(item) && item.type === "label" ? (openBlock(), createBlock(unref(SelectLabel), {
                                        key: 0,
                                        class: ui.value.label({ class: [props.ui?.label, item.ui?.label, item.class] })
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (openBlock(), createBlock(unref(SelectSeparator), {
                                        key: 1,
                                        class: ui.value.separator({ class: [props.ui?.separator, item.ui?.separator, item.class] })
                                      }, null, 8, ["class"])) : (openBlock(), createBlock(unref(SelectItem), {
                                        key: 2,
                                        class: ui.value.item({ class: [props.ui?.item, isSelectItem(item) && item.ui?.item, isSelectItem(item) && item.class] }),
                                        disabled: isSelectItem(item) && item.disabled,
                                        value: isSelectItem(item) ? unref(get)(item, props.valueKey) : item,
                                        onSelect: ($event) => isSelectItem(item) && item.onSelect?.($event)
                                      }, {
                                        default: withCtx(() => [
                                          renderSlot(_ctx.$slots, "item", {
                                            item,
                                            index
                                          }, () => [
                                            renderSlot(_ctx.$slots, "item-leading", {
                                              item,
                                              index
                                            }, () => [
                                              isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$e, {
                                                key: 0,
                                                name: item.icon,
                                                class: ui.value.itemLeadingIcon({ class: [props.ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                                              }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$b, mergeProps({
                                                key: 1,
                                                size: item.ui?.itemLeadingAvatarSize || props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                              }, { ref_for: true }, item.avatar, {
                                                class: ui.value.itemLeadingAvatar({ class: [props.ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                                              }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$c, mergeProps({
                                                key: 2,
                                                size: item.ui?.itemLeadingChipSize || props.ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                                inset: "",
                                                standalone: ""
                                              }, { ref_for: true }, item.chip, {
                                                class: ui.value.itemLeadingChip({ class: [props.ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
                                              }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                                            ]),
                                            createVNode(unref(SelectItemText), {
                                              class: ui.value.itemLabel({ class: [props.ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                                            }, {
                                              default: withCtx(() => [
                                                renderSlot(_ctx.$slots, "item-label", {
                                                  item,
                                                  index
                                                }, () => [
                                                  createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1)
                                                ])
                                              ]),
                                              _: 2
                                            }, 1032, ["class"]),
                                            createVNode("span", {
                                              class: ui.value.itemTrailing({ class: [props.ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
                                            }, [
                                              renderSlot(_ctx.$slots, "item-trailing", {
                                                item,
                                                index
                                              }),
                                              createVNode(unref(SelectItemIndicator), { "as-child": "" }, {
                                                default: withCtx(() => [
                                                  createVNode(_sfc_main$e, {
                                                    name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                    class: ui.value.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                                  }, null, 8, ["name", "class"])
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ], 2)
                                          ])
                                        ]),
                                        _: 2
                                      }, 1032, ["class", "disabled", "value", "onSelect"]))
                                    ], 64);
                                  }), 128))
                                ]),
                                _: 2
                              }, 1032, ["class"]);
                            }), 128))
                          ], 2),
                          renderSlot(_ctx.$slots, "content-bottom"),
                          !!__props.arrow ? (openBlock(), createBlock(unref(SelectArrow), mergeProps({ key: 0 }, arrowProps.value, {
                            class: ui.value.arrow({ class: props.ui?.arrow })
                          }), null, 16, ["class"])) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(SelectContent), mergeProps({
                      class: ui.value.content({ class: props.ui?.content })
                    }, contentProps.value), {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "content-top"),
                        createVNode("div", {
                          role: "presentation",
                          class: ui.value.viewport({ class: props.ui?.viewport })
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(groups.value, (group, groupIndex) => {
                            return openBlock(), createBlock(unref(SelectGroup), {
                              key: `group-${groupIndex}`,
                              class: ui.value.group({ class: props.ui?.group })
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
                                  return openBlock(), createBlock(Fragment, {
                                    key: `group-${groupIndex}-${index}`
                                  }, [
                                    isSelectItem(item) && item.type === "label" ? (openBlock(), createBlock(unref(SelectLabel), {
                                      key: 0,
                                      class: ui.value.label({ class: [props.ui?.label, item.ui?.label, item.class] })
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (openBlock(), createBlock(unref(SelectSeparator), {
                                      key: 1,
                                      class: ui.value.separator({ class: [props.ui?.separator, item.ui?.separator, item.class] })
                                    }, null, 8, ["class"])) : (openBlock(), createBlock(unref(SelectItem), {
                                      key: 2,
                                      class: ui.value.item({ class: [props.ui?.item, isSelectItem(item) && item.ui?.item, isSelectItem(item) && item.class] }),
                                      disabled: isSelectItem(item) && item.disabled,
                                      value: isSelectItem(item) ? unref(get)(item, props.valueKey) : item,
                                      onSelect: ($event) => isSelectItem(item) && item.onSelect?.($event)
                                    }, {
                                      default: withCtx(() => [
                                        renderSlot(_ctx.$slots, "item", {
                                          item,
                                          index
                                        }, () => [
                                          renderSlot(_ctx.$slots, "item-leading", {
                                            item,
                                            index
                                          }, () => [
                                            isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$e, {
                                              key: 0,
                                              name: item.icon,
                                              class: ui.value.itemLeadingIcon({ class: [props.ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                                            }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$b, mergeProps({
                                              key: 1,
                                              size: item.ui?.itemLeadingAvatarSize || props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                            }, { ref_for: true }, item.avatar, {
                                              class: ui.value.itemLeadingAvatar({ class: [props.ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                                            }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$c, mergeProps({
                                              key: 2,
                                              size: item.ui?.itemLeadingChipSize || props.ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                              inset: "",
                                              standalone: ""
                                            }, { ref_for: true }, item.chip, {
                                              class: ui.value.itemLeadingChip({ class: [props.ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
                                            }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                                          ]),
                                          createVNode(unref(SelectItemText), {
                                            class: ui.value.itemLabel({ class: [props.ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                                          }, {
                                            default: withCtx(() => [
                                              renderSlot(_ctx.$slots, "item-label", {
                                                item,
                                                index
                                              }, () => [
                                                createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1)
                                              ])
                                            ]),
                                            _: 2
                                          }, 1032, ["class"]),
                                          createVNode("span", {
                                            class: ui.value.itemTrailing({ class: [props.ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
                                          }, [
                                            renderSlot(_ctx.$slots, "item-trailing", {
                                              item,
                                              index
                                            }),
                                            createVNode(unref(SelectItemIndicator), { "as-child": "" }, {
                                              default: withCtx(() => [
                                                createVNode(_sfc_main$e, {
                                                  name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                  class: ui.value.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                                }, null, 8, ["name", "class"])
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ], 2)
                                        ])
                                      ]),
                                      _: 2
                                    }, 1032, ["class", "disabled", "value", "onSelect"]))
                                  ], 64);
                                }), 128))
                              ]),
                              _: 2
                            }, 1032, ["class"]);
                          }), 128))
                        ], 2),
                        renderSlot(_ctx.$slots, "content-bottom"),
                        !!__props.arrow ? (openBlock(), createBlock(unref(SelectArrow), mergeProps({ key: 0 }, arrowProps.value, {
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
              createVNode(unref(SelectTrigger), mergeProps({
                id: unref(id),
                ref_key: "triggerRef",
                ref: triggerRef,
                class: ui.value.base({ class: [props.ui?.base, props.class] })
              }, { ..._ctx.$attrs, ...unref(ariaAttrs) }), {
                default: withCtx(() => [
                  unref(isLeading) || !!__props.avatar || !!slots.leading ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: ui.value.leading({ class: props.ui?.leading })
                  }, [
                    renderSlot(_ctx.$slots, "leading", {
                      modelValue,
                      open,
                      ui: ui.value
                    }, () => [
                      unref(isLeading) && unref(leadingIconName) ? (openBlock(), createBlock(_sfc_main$e, {
                        key: 0,
                        name: unref(leadingIconName),
                        class: ui.value.leadingIcon({ class: props.ui?.leadingIcon })
                      }, null, 8, ["name", "class"])) : !!__props.avatar ? (openBlock(), createBlock(_sfc_main$b, mergeProps({
                        key: 1,
                        size: props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                      }, __props.avatar, {
                        class: ui.value.itemLeadingAvatar({ class: props.ui?.itemLeadingAvatar })
                      }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                    ])
                  ], 2)) : createCommentVNode("", true),
                  renderSlot(_ctx.$slots, "default", {
                    modelValue,
                    open
                  }, () => [
                    (openBlock(true), createBlock(Fragment, null, renderList([displayValue(modelValue)], (displayedModelValue) => {
                      return openBlock(), createBlock(Fragment, { key: displayedModelValue }, [
                        displayedModelValue !== void 0 && displayedModelValue !== null ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: ui.value.value({ class: props.ui?.value })
                        }, toDisplayString(displayedModelValue), 3)) : (openBlock(), createBlock("span", {
                          key: 1,
                          class: ui.value.placeholder({ class: props.ui?.placeholder })
                        }, toDisplayString(__props.placeholder ?? " "), 3))
                      ], 64);
                    }), 128))
                  ]),
                  unref(isTrailing) || !!slots.trailing ? (openBlock(), createBlock("span", {
                    key: 1,
                    class: ui.value.trailing({ class: props.ui?.trailing })
                  }, [
                    renderSlot(_ctx.$slots, "trailing", {
                      modelValue,
                      open,
                      ui: ui.value
                    }, () => [
                      unref(trailingIconName) ? (openBlock(), createBlock(_sfc_main$e, {
                        key: 0,
                        name: unref(trailingIconName),
                        class: ui.value.trailingIcon({ class: props.ui?.trailingIcon })
                      }, null, 8, ["name", "class"])) : createCommentVNode("", true)
                    ])
                  ], 2)) : createCommentVNode("", true)
                ]),
                _: 2
              }, 1040, ["id", "class"]),
              createVNode(unref(SelectPortal), unref(portalProps), {
                default: withCtx(() => [
                  createVNode(unref(SelectContent), mergeProps({
                    class: ui.value.content({ class: props.ui?.content })
                  }, contentProps.value), {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, "content-top"),
                      createVNode("div", {
                        role: "presentation",
                        class: ui.value.viewport({ class: props.ui?.viewport })
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(groups.value, (group, groupIndex) => {
                          return openBlock(), createBlock(unref(SelectGroup), {
                            key: `group-${groupIndex}`,
                            class: ui.value.group({ class: props.ui?.group })
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(group, (item, index) => {
                                return openBlock(), createBlock(Fragment, {
                                  key: `group-${groupIndex}-${index}`
                                }, [
                                  isSelectItem(item) && item.type === "label" ? (openBlock(), createBlock(unref(SelectLabel), {
                                    key: 0,
                                    class: ui.value.label({ class: [props.ui?.label, item.ui?.label, item.class] })
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(get)(item, props.labelKey)), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["class"])) : isSelectItem(item) && item.type === "separator" ? (openBlock(), createBlock(unref(SelectSeparator), {
                                    key: 1,
                                    class: ui.value.separator({ class: [props.ui?.separator, item.ui?.separator, item.class] })
                                  }, null, 8, ["class"])) : (openBlock(), createBlock(unref(SelectItem), {
                                    key: 2,
                                    class: ui.value.item({ class: [props.ui?.item, isSelectItem(item) && item.ui?.item, isSelectItem(item) && item.class] }),
                                    disabled: isSelectItem(item) && item.disabled,
                                    value: isSelectItem(item) ? unref(get)(item, props.valueKey) : item,
                                    onSelect: ($event) => isSelectItem(item) && item.onSelect?.($event)
                                  }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, "item", {
                                        item,
                                        index
                                      }, () => [
                                        renderSlot(_ctx.$slots, "item-leading", {
                                          item,
                                          index
                                        }, () => [
                                          isSelectItem(item) && item.icon ? (openBlock(), createBlock(_sfc_main$e, {
                                            key: 0,
                                            name: item.icon,
                                            class: ui.value.itemLeadingIcon({ class: [props.ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })
                                          }, null, 8, ["name", "class"])) : isSelectItem(item) && item.avatar ? (openBlock(), createBlock(_sfc_main$b, mergeProps({
                                            key: 1,
                                            size: item.ui?.itemLeadingAvatarSize || props.ui?.itemLeadingAvatarSize || ui.value.itemLeadingAvatarSize()
                                          }, { ref_for: true }, item.avatar, {
                                            class: ui.value.itemLeadingAvatar({ class: [props.ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })
                                          }), null, 16, ["size", "class"])) : isSelectItem(item) && item.chip ? (openBlock(), createBlock(_sfc_main$c, mergeProps({
                                            key: 2,
                                            size: item.ui?.itemLeadingChipSize || props.ui?.itemLeadingChipSize || ui.value.itemLeadingChipSize(),
                                            inset: "",
                                            standalone: ""
                                          }, { ref_for: true }, item.chip, {
                                            class: ui.value.itemLeadingChip({ class: [props.ui?.itemLeadingChip, item.ui?.itemLeadingChip] })
                                          }), null, 16, ["size", "class"])) : createCommentVNode("", true)
                                        ]),
                                        createVNode(unref(SelectItemText), {
                                          class: ui.value.itemLabel({ class: [props.ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })
                                        }, {
                                          default: withCtx(() => [
                                            renderSlot(_ctx.$slots, "item-label", {
                                              item,
                                              index
                                            }, () => [
                                              createTextVNode(toDisplayString(isSelectItem(item) ? unref(get)(item, props.labelKey) : item), 1)
                                            ])
                                          ]),
                                          _: 2
                                        }, 1032, ["class"]),
                                        createVNode("span", {
                                          class: ui.value.itemTrailing({ class: [props.ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })
                                        }, [
                                          renderSlot(_ctx.$slots, "item-trailing", {
                                            item,
                                            index
                                          }),
                                          createVNode(unref(SelectItemIndicator), { "as-child": "" }, {
                                            default: withCtx(() => [
                                              createVNode(_sfc_main$e, {
                                                name: __props.selectedIcon || unref(appConfig).ui.icons.check,
                                                class: ui.value.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })
                                              }, null, 8, ["name", "class"])
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ], 2)
                                      ])
                                    ]),
                                    _: 2
                                  }, 1032, ["class", "disabled", "value", "onSelect"]))
                                ], 64);
                              }), 128))
                            ]),
                            _: 2
                          }, 1032, ["class"]);
                        }), 128))
                      ], 2),
                      renderSlot(_ctx.$slots, "content-bottom"),
                      !!__props.arrow ? (openBlock(), createBlock(unref(SelectArrow), mergeProps({ key: 0 }, arrowProps.value, {
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
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/ui/dist/runtime/components/Select.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow" }, _attrs))} data-v-22f01bc3><div class="aspect-square bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse relative overflow-hidden" data-v-22f01bc3><div class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent dark:via-gray-500 opacity-20 animate-shimmer" data-v-22f01bc3></div></div><div class="p-4 space-y-3" data-v-22f01bc3><div class="flex gap-2" data-v-22f01bc3><div class="h-5 w-16 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-full animate-pulse" data-v-22f01bc3></div><div class="h-5 w-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-full animate-pulse" data-v-22f01bc3></div></div><div class="space-y-2" data-v-22f01bc3><div class="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse" data-v-22f01bc3></div><div class="h-4 w-3/4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse" data-v-22f01bc3></div></div><div class="space-y-2 pt-2" data-v-22f01bc3><div class="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse" data-v-22f01bc3></div><div class="h-3 w-5/6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse" data-v-22f01bc3></div></div><div class="flex items-center gap-2 pt-2" data-v-22f01bc3><div class="h-6 w-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse" data-v-22f01bc3></div><div class="h-5 w-16 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded line-through animate-pulse" data-v-22f01bc3></div></div><div class="pt-2" data-v-22f01bc3><div class="h-9 w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse" data-v-22f01bc3></div></div></div></div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Shop/ProductCard/Skeleton.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_7 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-22f01bc3"]]), { __name: "ShopProductCardSkeleton" });
const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm p-4 flex gap-4" }, _attrs))} data-v-deb35274><div class="w-24 h-24 flex-shrink-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse relative overflow-hidden" data-v-deb35274><div class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent dark:via-gray-500 opacity-20 animate-shimmer" data-v-deb35274></div></div><div class="flex-1 space-y-3" data-v-deb35274><div class="space-y-2" data-v-deb35274><div class="h-4 w-3/4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse" data-v-deb35274></div></div><div class="space-y-2" data-v-deb35274><div class="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse" data-v-deb35274></div><div class="h-3 w-5/6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse" data-v-deb35274></div></div><div class="flex gap-4 pt-2" data-v-deb35274><div class="h-3 w-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse" data-v-deb35274></div><div class="h-3 w-24 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse" data-v-deb35274></div></div></div><div class="flex flex-col gap-2 justify-center" data-v-deb35274><div class="h-9 w-24 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse" data-v-deb35274></div><div class="h-8 w-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse" data-v-deb35274></div></div></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Shop/ProductList/Skeleton.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_8 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-deb35274"]]), { __name: "ShopProductListSkeleton" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ProductListItem",
  __ssrInlineRender: true,
  props: {
    product: {}
  },
  emits: ["add-to-cart", "add-to-wishlist"],
  setup(__props) {
    const handleImageError = (event) => {
      const target = event.target;
      target.src = "https://placehold.co/600x600";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_UCard = _sfc_main$a;
      const _component_UBadge = _sfc_main$8;
      const _component_UIcon = _sfc_main$e;
      const _component_UButton = _sfc_main$8$1;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        to: `/shop/product/${__props.product.slug}`,
        class: "group block"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UCard, { class: "hover:shadow-lg transition-shadow duration-200" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex gap-4"${_scopeId2}><div class="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 relative"${_scopeId2}><picture${_scopeId2}>`);
                  if (__props.product.image_webp) {
                    _push3(`<source${ssrRenderAttr("srcset", __props.product.image_webp)} type="image/webp"${_scopeId2}>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<img${ssrRenderAttr("src", __props.product.image || __props.product.image_thumb)}${ssrRenderAttr("alt", __props.product.name)} class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" loading="lazy"${_scopeId2}></picture>`);
                  if (__props.product.has_discount) {
                    _push3(`<div class="absolute top-2 right-2"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UBadge, {
                      color: "error",
                      variant: "solid",
                      size: "sm"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` -${ssrInterpolate(__props.product.discount_percentage)}% `);
                        } else {
                          return [
                            createTextVNode(" -" + toDisplayString(__props.product.discount_percentage) + "% ", 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="flex-1 flex flex-col justify-between min-w-0"${_scopeId2}><div${_scopeId2}><div class="flex items-center gap-2 mb-2 flex-wrap"${_scopeId2}>`);
                  if (__props.product.is_featured) {
                    _push3(ssrRenderComponent(_component_UBadge, {
                      color: "warning",
                      variant: "soft",
                      size: "xs"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Featured `);
                        } else {
                          return [
                            createTextVNode(" Featured ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (__props.product.categories && __props.product.categories.length > 0) {
                    _push3(`<!--[-->`);
                    ssrRenderList(__props.product.categories.slice(0, 2), (category) => {
                      _push3(ssrRenderComponent(_component_UBadge, {
                        key: category.id,
                        color: "primary",
                        variant: "soft",
                        size: "xs"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(category.name)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(category.name), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><h3 class="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors line-clamp-2 mb-2"${_scopeId2}>${ssrInterpolate(__props.product.name)}</h3>`);
                  if (__props.product.short_description) {
                    _push3(`<p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2"${_scopeId2}>${ssrInterpolate(__props.product.short_description)}</p>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (__props.product.rating) {
                    _push3(`<div class="flex items-center gap-2 mb-2"${_scopeId2}><div class="flex items-center"${_scopeId2}><!--[-->`);
                    ssrRenderList(5, (i) => {
                      _push3(ssrRenderComponent(_component_UIcon, {
                        key: i,
                        name: "i-heroicons-star-solid",
                        class: [i <= __props.product.rating ? "text-yellow-400" : "text-gray-300", "w-4 h-4"]
                      }, null, _parent3, _scopeId2));
                    });
                    _push3(`<!--]--></div><span class="text-xs text-gray-500"${_scopeId2}> (${ssrInterpolate(__props.product.reviews_count || 0)} reviews) </span></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div><div class="flex items-center justify-between"${_scopeId2}><div${_scopeId2}><div class="flex items-baseline gap-2 mb-2"${_scopeId2}><span class="text-2xl font-bold text-primary-600 dark:text-primary-400"${_scopeId2}> $${ssrInterpolate(parseFloat(__props.product.price).toFixed(2))}</span>`);
                  if (__props.product.compare_price) {
                    _push3(`<span class="text-sm text-gray-400 line-through"${_scopeId2}> $${ssrInterpolate(parseFloat(__props.product.compare_price).toFixed(2))}</span>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_UBadge, {
                    color: __props.product.in_stock ? "success" : "error",
                    variant: "soft",
                    size: "xs"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(__props.product.in_stock ? "In Stock" : "Out of Stock")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(__props.product.in_stock ? "In Stock" : "Out of Stock"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="flex gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UButton, {
                    onClick: ($event) => _ctx.$emit("add-to-cart", __props.product.id, 1),
                    icon: "i-heroicons-shopping-cart",
                    color: "primary",
                    disabled: !__props.product.in_stock
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Add to Cart `);
                      } else {
                        return [
                          createTextVNode(" Add to Cart ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UButton, {
                    icon: "i-heroicons-heart",
                    color: "secondary",
                    variant: "soft",
                    onClick: ($event) => _ctx.$emit("add-to-wishlist", __props.product.id)
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex gap-4" }, [
                      createVNode("div", { class: "w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 relative" }, [
                        createVNode("picture", null, [
                          __props.product.image_webp ? (openBlock(), createBlock("source", {
                            key: 0,
                            srcset: __props.product.image_webp,
                            type: "image/webp"
                          }, null, 8, ["srcset"])) : createCommentVNode("", true),
                          createVNode("img", {
                            src: __props.product.image || __props.product.image_thumb,
                            alt: __props.product.name,
                            class: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-300",
                            loading: "lazy",
                            onError: handleImageError
                          }, null, 40, ["src", "alt"])
                        ]),
                        __props.product.has_discount ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "absolute top-2 right-2"
                        }, [
                          createVNode(_component_UBadge, {
                            color: "error",
                            variant: "solid",
                            size: "sm"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" -" + toDisplayString(__props.product.discount_percentage) + "% ", 1)
                            ]),
                            _: 1
                          })
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "flex-1 flex flex-col justify-between min-w-0" }, [
                        createVNode("div", null, [
                          createVNode("div", { class: "flex items-center gap-2 mb-2 flex-wrap" }, [
                            __props.product.is_featured ? (openBlock(), createBlock(_component_UBadge, {
                              key: 0,
                              color: "warning",
                              variant: "soft",
                              size: "xs"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Featured ")
                              ]),
                              _: 1
                            })) : createCommentVNode("", true),
                            __props.product.categories && __props.product.categories.length > 0 ? (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(__props.product.categories.slice(0, 2), (category) => {
                              return openBlock(), createBlock(_component_UBadge, {
                                key: category.id,
                                color: "primary",
                                variant: "soft",
                                size: "xs"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(category.name), 1)
                                ]),
                                _: 2
                              }, 1024);
                            }), 128)) : createCommentVNode("", true)
                          ]),
                          createVNode("h3", { class: "font-semibold text-lg text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors line-clamp-2 mb-2" }, toDisplayString(__props.product.name), 1),
                          __props.product.short_description ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2"
                          }, toDisplayString(__props.product.short_description), 1)) : createCommentVNode("", true),
                          __props.product.rating ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "flex items-center gap-2 mb-2"
                          }, [
                            createVNode("div", { class: "flex items-center" }, [
                              (openBlock(), createBlock(Fragment, null, renderList(5, (i) => {
                                return createVNode(_component_UIcon, {
                                  key: i,
                                  name: "i-heroicons-star-solid",
                                  class: [i <= __props.product.rating ? "text-yellow-400" : "text-gray-300", "w-4 h-4"]
                                }, null, 8, ["class"]);
                              }), 64))
                            ]),
                            createVNode("span", { class: "text-xs text-gray-500" }, " (" + toDisplayString(__props.product.reviews_count || 0) + " reviews) ", 1)
                          ])) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("div", null, [
                            createVNode("div", { class: "flex items-baseline gap-2 mb-2" }, [
                              createVNode("span", { class: "text-2xl font-bold text-primary-600 dark:text-primary-400" }, " $" + toDisplayString(parseFloat(__props.product.price).toFixed(2)), 1),
                              __props.product.compare_price ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "text-sm text-gray-400 line-through"
                              }, " $" + toDisplayString(parseFloat(__props.product.compare_price).toFixed(2)), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode(_component_UBadge, {
                              color: __props.product.in_stock ? "success" : "error",
                              variant: "soft",
                              size: "xs"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(__props.product.in_stock ? "In Stock" : "Out of Stock"), 1)
                              ]),
                              _: 1
                            }, 8, ["color"])
                          ]),
                          createVNode("div", { class: "flex gap-2" }, [
                            createVNode(_component_UButton, {
                              onClick: withModifiers(($event) => _ctx.$emit("add-to-cart", __props.product.id, 1), ["prevent"]),
                              icon: "i-heroicons-shopping-cart",
                              color: "primary",
                              disabled: !__props.product.in_stock
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Add to Cart ")
                              ]),
                              _: 1
                            }, 8, ["onClick", "disabled"]),
                            createVNode(_component_UButton, {
                              icon: "i-heroicons-heart",
                              color: "secondary",
                              variant: "soft",
                              onClick: withModifiers(($event) => _ctx.$emit("add-to-wishlist", __props.product.id), ["prevent"])
                            }, null, 8, ["onClick"])
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UCard, { class: "hover:shadow-lg transition-shadow duration-200" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex gap-4" }, [
                    createVNode("div", { class: "w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 relative" }, [
                      createVNode("picture", null, [
                        __props.product.image_webp ? (openBlock(), createBlock("source", {
                          key: 0,
                          srcset: __props.product.image_webp,
                          type: "image/webp"
                        }, null, 8, ["srcset"])) : createCommentVNode("", true),
                        createVNode("img", {
                          src: __props.product.image || __props.product.image_thumb,
                          alt: __props.product.name,
                          class: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-300",
                          loading: "lazy",
                          onError: handleImageError
                        }, null, 40, ["src", "alt"])
                      ]),
                      __props.product.has_discount ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "absolute top-2 right-2"
                      }, [
                        createVNode(_component_UBadge, {
                          color: "error",
                          variant: "solid",
                          size: "sm"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" -" + toDisplayString(__props.product.discount_percentage) + "% ", 1)
                          ]),
                          _: 1
                        })
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "flex-1 flex flex-col justify-between min-w-0" }, [
                      createVNode("div", null, [
                        createVNode("div", { class: "flex items-center gap-2 mb-2 flex-wrap" }, [
                          __props.product.is_featured ? (openBlock(), createBlock(_component_UBadge, {
                            key: 0,
                            color: "warning",
                            variant: "soft",
                            size: "xs"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Featured ")
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          __props.product.categories && __props.product.categories.length > 0 ? (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(__props.product.categories.slice(0, 2), (category) => {
                            return openBlock(), createBlock(_component_UBadge, {
                              key: category.id,
                              color: "primary",
                              variant: "soft",
                              size: "xs"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(category.name), 1)
                              ]),
                              _: 2
                            }, 1024);
                          }), 128)) : createCommentVNode("", true)
                        ]),
                        createVNode("h3", { class: "font-semibold text-lg text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors line-clamp-2 mb-2" }, toDisplayString(__props.product.name), 1),
                        __props.product.short_description ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2"
                        }, toDisplayString(__props.product.short_description), 1)) : createCommentVNode("", true),
                        __props.product.rating ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "flex items-center gap-2 mb-2"
                        }, [
                          createVNode("div", { class: "flex items-center" }, [
                            (openBlock(), createBlock(Fragment, null, renderList(5, (i) => {
                              return createVNode(_component_UIcon, {
                                key: i,
                                name: "i-heroicons-star-solid",
                                class: [i <= __props.product.rating ? "text-yellow-400" : "text-gray-300", "w-4 h-4"]
                              }, null, 8, ["class"]);
                            }), 64))
                          ]),
                          createVNode("span", { class: "text-xs text-gray-500" }, " (" + toDisplayString(__props.product.reviews_count || 0) + " reviews) ", 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("div", null, [
                          createVNode("div", { class: "flex items-baseline gap-2 mb-2" }, [
                            createVNode("span", { class: "text-2xl font-bold text-primary-600 dark:text-primary-400" }, " $" + toDisplayString(parseFloat(__props.product.price).toFixed(2)), 1),
                            __props.product.compare_price ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "text-sm text-gray-400 line-through"
                            }, " $" + toDisplayString(parseFloat(__props.product.compare_price).toFixed(2)), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode(_component_UBadge, {
                            color: __props.product.in_stock ? "success" : "error",
                            variant: "soft",
                            size: "xs"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(__props.product.in_stock ? "In Stock" : "Out of Stock"), 1)
                            ]),
                            _: 1
                          }, 8, ["color"])
                        ]),
                        createVNode("div", { class: "flex gap-2" }, [
                          createVNode(_component_UButton, {
                            onClick: withModifiers(($event) => _ctx.$emit("add-to-cart", __props.product.id, 1), ["prevent"]),
                            icon: "i-heroicons-shopping-cart",
                            color: "primary",
                            disabled: !__props.product.in_stock
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Add to Cart ")
                            ]),
                            _: 1
                          }, 8, ["onClick", "disabled"]),
                          createVNode(_component_UButton, {
                            icon: "i-heroicons-heart",
                            color: "secondary",
                            variant: "soft",
                            onClick: withModifiers(($event) => _ctx.$emit("add-to-wishlist", __props.product.id), ["prevent"])
                          }, null, 8, ["onClick"])
                        ])
                      ])
                    ])
                  ])
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Shop/ProductListItem.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_10 = Object.assign(_sfc_main$1, { __name: "ShopProductListItem" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LayoutPage",
  __ssrInlineRender: true,
  props: {
    title: {},
    subTitle: {},
    loadingContent: { type: Boolean }
  },
  setup(__props) {
    const {
      products,
      pagination,
      loading,
      error,
      fetchProducts,
      changePage: apiChangePage,
      getAllCategories
    } = useProducts();
    const { addToCart } = useCart();
    const toast = useToast();
    useRoute();
    const router = useRouter();
    const searchQuery = ref("");
    const sortBy = ref("featured");
    const viewMode = ref("grid");
    const activeFilters = ref({
      category: "all",
      featured: void 0,
      in_stock: void 0,
      min_price: void 0,
      max_price: void 0
    });
    const sortOptions = [
      { value: "newest", label: "Newest First" },
      { value: "featured", label: "Featured First" },
      { value: "price-asc", label: "Price: Low to High" },
      { value: "price-desc", label: "Price: High to Low" },
      { value: "name-asc", label: "Name: A-Z" },
      { value: "name-desc", label: "Name: Z-A" }
    ];
    const hasActiveFilters = computed(() => {
      return activeFilters.value.category && activeFilters.value.category !== "all" || activeFilters.value.featured !== void 0 || activeFilters.value.in_stock !== void 0 || activeFilters.value.min_price || activeFilters.value.max_price;
    });
    const getCategoryName = (slug) => {
      const category = getAllCategories.value.find((c) => c.slug === slug);
      return category?.name || slug;
    };
    const buildFiltersObject = () => {
      const filters = {};
      if (activeFilters.value.category && activeFilters.value.category !== "all") {
        filters.category = activeFilters.value.category;
      }
      if (activeFilters.value.featured !== void 0) {
        filters.featured = activeFilters.value.featured;
      }
      if (activeFilters.value.in_stock !== void 0) {
        filters.in_stock = activeFilters.value.in_stock;
      }
      if (activeFilters.value.min_price) {
        filters.min_price = activeFilters.value.min_price;
      }
      if (activeFilters.value.max_price) {
        filters.max_price = activeFilters.value.max_price;
      }
      if (searchQuery.value) {
        filters.search = searchQuery.value;
      }
      if (sortBy.value) {
        filters.sort_by = sortBy.value;
      }
      return filters;
    };
    const loadProducts = async () => {
      const filters = buildFiltersObject();
      await router.push({
        query: {
          ...filters,
          page: pagination.value?.currentPage || 1
        }
      });
      await fetchProducts(filters);
    };
    const applyFilters = async (filters) => {
      activeFilters.value = { ...filters };
      await loadProducts();
    };
    const clearAllFilters = async () => {
      activeFilters.value = {
        category: "all",
        featured: void 0,
        in_stock: void 0,
        min_price: void 0,
        max_price: void 0
      };
      searchQuery.value = "";
      sortBy.value = "featured";
      await router.push({ query: {} });
      await loadProducts();
    };
    const removeFilter = async (filterKey) => {
      if (filterKey === "category") {
        activeFilters.value.category = "all";
      } else {
        activeFilters.value[filterKey] = void 0;
      }
      await loadProducts();
    };
    const changePage = async (page) => {
      await apiChangePage(page, buildFiltersObject());
      (void 0).scrollTo({ top: 0, behavior: "smooth" });
    };
    const handleAddToCart = async (productId, quantity) => {
      try {
        await addToCart(productId, quantity);
        toast.add({
          title: "Success",
          description: "Product added to cart",
          color: "success",
          icon: "i-heroicons-check-circle"
        });
      } catch (err) {
        toast.add({
          title: "Error",
          description: "Failed to add product to cart",
          color: "error",
          icon: "i-heroicons-exclamation-circle"
        });
      }
    };
    let searchTimeout;
    const debouncedSearch = () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        loadProducts();
      }, 500);
    };
    useHead({
      title: "Shop - Premium Products",
      meta: [
        { name: "description", content: "Browse our collection of premium products" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = _sfc_main$6;
      const _component_ShopSidebar = __nuxt_component_1;
      const _component_UInput = _sfc_main$7;
      const _component_USelect = _sfc_main$4;
      const _component_UBadge = _sfc_main$8;
      const _component_UIcon = _sfc_main$e;
      const _component_UButton = _sfc_main$8$1;
      const _component_ShopProductCardSkeleton = __nuxt_component_7;
      const _component_ShopProductListSkeleton = __nuxt_component_8;
      const _component_ShopProductCard = __nuxt_component_9;
      const _component_ShopProductListItem = __nuxt_component_10;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 dark:bg-gray-900" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UContainer, { class: "py-8" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mb-8"${_scopeId}><h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2"${_scopeId}>${ssrInterpolate(__props.title)}</h1><p class="text-gray-600 dark:text-gray-400"${_scopeId}>${ssrInterpolate(__props.subTitle)}</p></div><div class="flex flex-col lg:flex-row gap-8"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_ShopSidebar, {
              filters: unref(activeFilters),
              "onUpdate:filters": ($event) => isRef(activeFilters) ? activeFilters.value = $event : null,
              onApplyFilters: applyFilters,
              onClearFilters: clearAllFilters
            }, null, _parent2, _scopeId));
            _push2(`<div class="flex-1"${_scopeId}><div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm mb-6"${_scopeId}><div class="flex flex-col sm:flex-row gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: unref(searchQuery),
              "onUpdate:modelValue": [($event) => isRef(searchQuery) ? searchQuery.value = $event : null, debouncedSearch],
              icon: "i-heroicons-magnifying-glass",
              placeholder: "Search products...",
              class: "flex-1"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_USelect, {
              modelValue: unref(sortBy),
              "onUpdate:modelValue": [($event) => isRef(sortBy) ? sortBy.value = $event : null, loadProducts],
              items: sortOptions,
              class: "sm:w-48"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            if (unref(hasActiveFilters)) {
              _push2(`<div class="flex flex-wrap gap-2 mt-4"${_scopeId}>`);
              if (unref(activeFilters).category && unref(activeFilters).category !== "all") {
                _push2(ssrRenderComponent(_component_UBadge, {
                  color: "primary",
                  variant: "soft",
                  onClick: ($event) => removeFilter("category"),
                  class: "cursor-pointer"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(getCategoryName(unref(activeFilters).category))} `);
                      _push3(ssrRenderComponent(_component_UIcon, {
                        name: "i-heroicons-x-mark",
                        class: "ml-1 w-3 h-3"
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createTextVNode(toDisplayString(getCategoryName(unref(activeFilters).category)) + " ", 1),
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-x-mark",
                          class: "ml-1 w-3 h-3"
                        })
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (unref(activeFilters).featured) {
                _push2(ssrRenderComponent(_component_UBadge, {
                  color: "warning",
                  variant: "soft",
                  onClick: ($event) => removeFilter("featured"),
                  class: "cursor-pointer"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Featured `);
                      _push3(ssrRenderComponent(_component_UIcon, {
                        name: "i-heroicons-x-mark",
                        class: "ml-1 w-3 h-3"
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createTextVNode(" Featured "),
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-x-mark",
                          class: "ml-1 w-3 h-3"
                        })
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (unref(activeFilters).in_stock !== void 0) {
                _push2(ssrRenderComponent(_component_UBadge, {
                  color: "success",
                  variant: "soft",
                  onClick: ($event) => removeFilter("in_stock"),
                  class: "cursor-pointer"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(unref(activeFilters).in_stock ? "In Stock" : "Out of Stock")} `);
                      _push3(ssrRenderComponent(_component_UIcon, {
                        name: "i-heroicons-x-mark",
                        class: "ml-1 w-3 h-3"
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createTextVNode(toDisplayString(unref(activeFilters).in_stock ? "In Stock" : "Out of Stock") + " ", 1),
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-x-mark",
                          class: "ml-1 w-3 h-3"
                        })
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (unref(activeFilters).min_price) {
                _push2(ssrRenderComponent(_component_UBadge, {
                  color: "primary",
                  variant: "soft",
                  onClick: ($event) => removeFilter("min_price"),
                  class: "cursor-pointer"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Min: $${ssrInterpolate(unref(activeFilters).min_price)} `);
                      _push3(ssrRenderComponent(_component_UIcon, {
                        name: "i-heroicons-x-mark",
                        class: "ml-1 w-3 h-3"
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createTextVNode(" Min: $" + toDisplayString(unref(activeFilters).min_price) + " ", 1),
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-x-mark",
                          class: "ml-1 w-3 h-3"
                        })
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (unref(activeFilters).max_price) {
                _push2(ssrRenderComponent(_component_UBadge, {
                  color: "primary",
                  variant: "soft",
                  onClick: ($event) => removeFilter("max_price"),
                  class: "cursor-pointer"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Max: $${ssrInterpolate(unref(activeFilters).max_price)} `);
                      _push3(ssrRenderComponent(_component_UIcon, {
                        name: "i-heroicons-x-mark",
                        class: "ml-1 w-3 h-3"
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createTextVNode(" Max: $" + toDisplayString(unref(activeFilters).max_price) + " ", 1),
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-x-mark",
                          class: "ml-1 w-3 h-3"
                        })
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(_component_UButton, {
                size: "xs",
                color: "secondary",
                variant: "ghost",
                onClick: clearAllFilters
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Clear All `);
                  } else {
                    return [
                      createTextVNode(" Clear All ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (__props.loadingContent) {
              _push2(`<div${_scopeId}>`);
              if (unref(viewMode) === "grid") {
                _push2(`<div class="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3"${_scopeId}><!--[-->`);
                ssrRenderList(9, (i) => {
                  _push2(ssrRenderComponent(_component_ShopProductCardSkeleton, { key: i }, null, _parent2, _scopeId));
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<div class="space-y-4"${_scopeId}><!--[-->`);
                ssrRenderList(6, (i) => {
                  _push2(ssrRenderComponent(_component_ShopProductListSkeleton, { key: i }, null, _parent2, _scopeId));
                });
                _push2(`<!--]--></div>`);
              }
              _push2(`</div>`);
            } else if (unref(error)) {
              _push2(`<div class="text-center py-16"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-exclamation-triangle",
                class: "text-4xl text-red-500 mb-4"
              }, null, _parent2, _scopeId));
              _push2(`<p class="text-red-600 dark:text-red-400"${_scopeId}>${ssrInterpolate(unref(error))}</p>`);
              _push2(ssrRenderComponent(_component_UButton, {
                onClick: loadProducts,
                color: "primary",
                class: "mt-4"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Try Again`);
                  } else {
                    return [
                      createTextVNode("Try Again")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!--[--><div class="flex items-center justify-between mb-4"${_scopeId}><div class="text-sm text-gray-600 dark:text-gray-400"${_scopeId}> Showing ${ssrInterpolate(unref(products).length)} `);
              if (unref(pagination)) {
                _push2(`<span${_scopeId}>of ${ssrInterpolate(unref(pagination).total)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(` products </div><div class="flex gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UButton, {
                variant: unref(viewMode) === "grid" ? "solid" : "soft",
                color: "primary",
                icon: "i-heroicons-squares-2x2",
                size: "sm",
                onClick: ($event) => viewMode.value = "grid"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UButton, {
                variant: unref(viewMode) === "list" ? "solid" : "soft",
                color: "primary",
                icon: "i-heroicons-list-bullet",
                size: "sm",
                onClick: ($event) => viewMode.value = "list"
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
              if (unref(products).length > 0 && unref(viewMode) === "grid") {
                _push2(`<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3"${_scopeId}><!--[-->`);
                ssrRenderList(unref(products), (product) => {
                  _push2(ssrRenderComponent(_component_ShopProductCard, {
                    key: product.id,
                    product,
                    onAddToCart: handleAddToCart
                  }, null, _parent2, _scopeId));
                });
                _push2(`<!--]--></div>`);
              } else if (unref(products).length > 0 && unref(viewMode) === "list") {
                _push2(`<div class="space-y-4"${_scopeId}><!--[-->`);
                ssrRenderList(unref(products), (product) => {
                  _push2(ssrRenderComponent(_component_ShopProductListItem, {
                    key: product.id,
                    product,
                    onAddToCart: handleAddToCart
                  }, null, _parent2, _scopeId));
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<div class="text-center py-16"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-shopping-bag",
                  class: "text-6xl text-gray-300 mb-4"
                }, null, _parent2, _scopeId));
                _push2(`<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2"${_scopeId}>No products found</h3><p class="text-gray-600 dark:text-gray-400 mb-4"${_scopeId}>Try adjusting your filters</p>`);
                _push2(ssrRenderComponent(_component_UButton, {
                  onClick: clearAllFilters,
                  color: "primary"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`Clear Filters`);
                    } else {
                      return [
                        createTextVNode("Clear Filters")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`</div>`);
              }
              if (unref(pagination) && unref(pagination).lastPage > 1) {
                _push2(`<div class="mt-8"${_scopeId}><div class="flex flex-col sm:flex-row items-center justify-between gap-4"${_scopeId}><div class="text-sm text-gray-600 dark:text-gray-400"${_scopeId}> Showing ${ssrInterpolate(unref(pagination).from)} to ${ssrInterpolate(unref(pagination).to)} of ${ssrInterpolate(unref(pagination).total)} results </div><div class="flex gap-2"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UButton, {
                  onClick: ($event) => changePage(1),
                  disabled: unref(pagination).currentPage === 1 || unref(loading),
                  icon: "i-heroicons-chevron-double-left",
                  color: "primary",
                  variant: "soft",
                  size: "sm"
                }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_UButton, {
                  onClick: ($event) => changePage(unref(pagination).currentPage - 1),
                  disabled: unref(pagination).currentPage === 1 || unref(loading),
                  icon: "i-heroicons-chevron-left",
                  color: "primary",
                  variant: "soft"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Previous `);
                    } else {
                      return [
                        createTextVNode(" Previous ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(`<div class="flex items-center px-4 text-sm text-gray-600 dark:text-gray-400"${_scopeId}> Page ${ssrInterpolate(unref(pagination).currentPage)} of ${ssrInterpolate(unref(pagination).lastPage)}</div>`);
                _push2(ssrRenderComponent(_component_UButton, {
                  onClick: ($event) => changePage(unref(pagination).currentPage + 1),
                  disabled: unref(pagination).currentPage === unref(pagination).lastPage || unref(loading),
                  icon: "i-heroicons-chevron-right",
                  trailing: "",
                  color: "primary",
                  variant: "soft"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Next `);
                    } else {
                      return [
                        createTextVNode(" Next ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_UButton, {
                  onClick: ($event) => changePage(unref(pagination).lastPage),
                  disabled: unref(pagination).currentPage === unref(pagination).lastPage || unref(loading),
                  icon: "i-heroicons-chevron-double-right",
                  trailing: "",
                  color: "primary",
                  variant: "soft",
                  size: "sm"
                }, null, _parent2, _scopeId));
                _push2(`</div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--]-->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "mb-8" }, [
                createVNode("h1", { class: "text-3xl font-bold text-gray-900 dark:text-white mb-2" }, toDisplayString(__props.title), 1),
                createVNode("p", { class: "text-gray-600 dark:text-gray-400" }, toDisplayString(__props.subTitle), 1)
              ]),
              createVNode("div", { class: "flex flex-col lg:flex-row gap-8" }, [
                createVNode(_component_ShopSidebar, {
                  filters: unref(activeFilters),
                  "onUpdate:filters": ($event) => isRef(activeFilters) ? activeFilters.value = $event : null,
                  onApplyFilters: applyFilters,
                  onClearFilters: clearAllFilters
                }, null, 8, ["filters", "onUpdate:filters"]),
                createVNode("div", { class: "flex-1" }, [
                  createVNode("div", { class: "bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm mb-6" }, [
                    createVNode("div", { class: "flex flex-col sm:flex-row gap-4" }, [
                      createVNode(_component_UInput, {
                        modelValue: unref(searchQuery),
                        "onUpdate:modelValue": [($event) => isRef(searchQuery) ? searchQuery.value = $event : null, debouncedSearch],
                        icon: "i-heroicons-magnifying-glass",
                        placeholder: "Search products...",
                        class: "flex-1"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_USelect, {
                        modelValue: unref(sortBy),
                        "onUpdate:modelValue": [($event) => isRef(sortBy) ? sortBy.value = $event : null, loadProducts],
                        items: sortOptions,
                        class: "sm:w-48"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    unref(hasActiveFilters) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex flex-wrap gap-2 mt-4"
                    }, [
                      unref(activeFilters).category && unref(activeFilters).category !== "all" ? (openBlock(), createBlock(_component_UBadge, {
                        key: 0,
                        color: "primary",
                        variant: "soft",
                        onClick: ($event) => removeFilter("category"),
                        class: "cursor-pointer"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(getCategoryName(unref(activeFilters).category)) + " ", 1),
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-x-mark",
                            class: "ml-1 w-3 h-3"
                          })
                        ]),
                        _: 1
                      }, 8, ["onClick"])) : createCommentVNode("", true),
                      unref(activeFilters).featured ? (openBlock(), createBlock(_component_UBadge, {
                        key: 1,
                        color: "warning",
                        variant: "soft",
                        onClick: ($event) => removeFilter("featured"),
                        class: "cursor-pointer"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Featured "),
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-x-mark",
                            class: "ml-1 w-3 h-3"
                          })
                        ]),
                        _: 1
                      }, 8, ["onClick"])) : createCommentVNode("", true),
                      unref(activeFilters).in_stock !== void 0 ? (openBlock(), createBlock(_component_UBadge, {
                        key: 2,
                        color: "success",
                        variant: "soft",
                        onClick: ($event) => removeFilter("in_stock"),
                        class: "cursor-pointer"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(activeFilters).in_stock ? "In Stock" : "Out of Stock") + " ", 1),
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-x-mark",
                            class: "ml-1 w-3 h-3"
                          })
                        ]),
                        _: 1
                      }, 8, ["onClick"])) : createCommentVNode("", true),
                      unref(activeFilters).min_price ? (openBlock(), createBlock(_component_UBadge, {
                        key: 3,
                        color: "primary",
                        variant: "soft",
                        onClick: ($event) => removeFilter("min_price"),
                        class: "cursor-pointer"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Min: $" + toDisplayString(unref(activeFilters).min_price) + " ", 1),
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-x-mark",
                            class: "ml-1 w-3 h-3"
                          })
                        ]),
                        _: 1
                      }, 8, ["onClick"])) : createCommentVNode("", true),
                      unref(activeFilters).max_price ? (openBlock(), createBlock(_component_UBadge, {
                        key: 4,
                        color: "primary",
                        variant: "soft",
                        onClick: ($event) => removeFilter("max_price"),
                        class: "cursor-pointer"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Max: $" + toDisplayString(unref(activeFilters).max_price) + " ", 1),
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-x-mark",
                            class: "ml-1 w-3 h-3"
                          })
                        ]),
                        _: 1
                      }, 8, ["onClick"])) : createCommentVNode("", true),
                      createVNode(_component_UButton, {
                        size: "xs",
                        color: "secondary",
                        variant: "ghost",
                        onClick: clearAllFilters
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Clear All ")
                        ]),
                        _: 1
                      })
                    ])) : createCommentVNode("", true)
                  ]),
                  __props.loadingContent ? (openBlock(), createBlock("div", { key: 0 }, [
                    unref(viewMode) === "grid" ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3"
                    }, [
                      (openBlock(), createBlock(Fragment, null, renderList(9, (i) => {
                        return createVNode(_component_ShopProductCardSkeleton, { key: i });
                      }), 64))
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "space-y-4"
                    }, [
                      (openBlock(), createBlock(Fragment, null, renderList(6, (i) => {
                        return createVNode(_component_ShopProductListSkeleton, { key: i });
                      }), 64))
                    ]))
                  ])) : unref(error) ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "text-center py-16"
                  }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-exclamation-triangle",
                      class: "text-4xl text-red-500 mb-4"
                    }),
                    createVNode("p", { class: "text-red-600 dark:text-red-400" }, toDisplayString(unref(error)), 1),
                    createVNode(_component_UButton, {
                      onClick: loadProducts,
                      color: "primary",
                      class: "mt-4"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Try Again")
                      ]),
                      _: 1
                    })
                  ])) : (openBlock(), createBlock(Fragment, { key: 2 }, [
                    createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                      createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400" }, [
                        createTextVNode(" Showing " + toDisplayString(unref(products).length) + " ", 1),
                        unref(pagination) ? (openBlock(), createBlock("span", { key: 0 }, "of " + toDisplayString(unref(pagination).total), 1)) : createCommentVNode("", true),
                        createTextVNode(" products ")
                      ]),
                      createVNode("div", { class: "flex gap-2" }, [
                        createVNode(_component_UButton, {
                          variant: unref(viewMode) === "grid" ? "solid" : "soft",
                          color: "primary",
                          icon: "i-heroicons-squares-2x2",
                          size: "sm",
                          onClick: ($event) => viewMode.value = "grid"
                        }, null, 8, ["variant", "onClick"]),
                        createVNode(_component_UButton, {
                          variant: unref(viewMode) === "list" ? "solid" : "soft",
                          color: "primary",
                          icon: "i-heroicons-list-bullet",
                          size: "sm",
                          onClick: ($event) => viewMode.value = "list"
                        }, null, 8, ["variant", "onClick"])
                      ])
                    ]),
                    unref(products).length > 0 && unref(viewMode) === "grid" ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(products), (product) => {
                        return openBlock(), createBlock(_component_ShopProductCard, {
                          key: product.id,
                          product,
                          onAddToCart: handleAddToCart
                        }, null, 8, ["product"]);
                      }), 128))
                    ])) : unref(products).length > 0 && unref(viewMode) === "list" ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "space-y-4"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(products), (product) => {
                        return openBlock(), createBlock(_component_ShopProductListItem, {
                          key: product.id,
                          product,
                          onAddToCart: handleAddToCart
                        }, null, 8, ["product"]);
                      }), 128))
                    ])) : (openBlock(), createBlock("div", {
                      key: 2,
                      class: "text-center py-16"
                    }, [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-shopping-bag",
                        class: "text-6xl text-gray-300 mb-4"
                      }),
                      createVNode("h3", { class: "text-xl font-semibold text-gray-900 dark:text-white mb-2" }, "No products found"),
                      createVNode("p", { class: "text-gray-600 dark:text-gray-400 mb-4" }, "Try adjusting your filters"),
                      createVNode(_component_UButton, {
                        onClick: clearAllFilters,
                        color: "primary"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Clear Filters")
                        ]),
                        _: 1
                      })
                    ])),
                    unref(pagination) && unref(pagination).lastPage > 1 ? (openBlock(), createBlock("div", {
                      key: 3,
                      class: "mt-8"
                    }, [
                      createVNode("div", { class: "flex flex-col sm:flex-row items-center justify-between gap-4" }, [
                        createVNode("div", { class: "text-sm text-gray-600 dark:text-gray-400" }, " Showing " + toDisplayString(unref(pagination).from) + " to " + toDisplayString(unref(pagination).to) + " of " + toDisplayString(unref(pagination).total) + " results ", 1),
                        createVNode("div", { class: "flex gap-2" }, [
                          createVNode(_component_UButton, {
                            onClick: ($event) => changePage(1),
                            disabled: unref(pagination).currentPage === 1 || unref(loading),
                            icon: "i-heroicons-chevron-double-left",
                            color: "primary",
                            variant: "soft",
                            size: "sm"
                          }, null, 8, ["onClick", "disabled"]),
                          createVNode(_component_UButton, {
                            onClick: ($event) => changePage(unref(pagination).currentPage - 1),
                            disabled: unref(pagination).currentPage === 1 || unref(loading),
                            icon: "i-heroicons-chevron-left",
                            color: "primary",
                            variant: "soft"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Previous ")
                            ]),
                            _: 1
                          }, 8, ["onClick", "disabled"]),
                          createVNode("div", { class: "flex items-center px-4 text-sm text-gray-600 dark:text-gray-400" }, " Page " + toDisplayString(unref(pagination).currentPage) + " of " + toDisplayString(unref(pagination).lastPage), 1),
                          createVNode(_component_UButton, {
                            onClick: ($event) => changePage(unref(pagination).currentPage + 1),
                            disabled: unref(pagination).currentPage === unref(pagination).lastPage || unref(loading),
                            icon: "i-heroicons-chevron-right",
                            trailing: "",
                            color: "primary",
                            variant: "soft"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Next ")
                            ]),
                            _: 1
                          }, 8, ["onClick", "disabled"]),
                          createVNode(_component_UButton, {
                            onClick: ($event) => changePage(unref(pagination).lastPage),
                            disabled: unref(pagination).currentPage === unref(pagination).lastPage || unref(loading),
                            icon: "i-heroicons-chevron-double-right",
                            trailing: "",
                            color: "primary",
                            variant: "soft",
                            size: "sm"
                          }, null, 8, ["onClick", "disabled"])
                        ])
                      ])
                    ])) : createCommentVNode("", true)
                  ], 64))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Shop/LayoutPage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main, { __name: "ShopLayoutPage" });

export { __nuxt_component_0 as _ };
//# sourceMappingURL=LayoutPage-B-E_1iJt.mjs.map
