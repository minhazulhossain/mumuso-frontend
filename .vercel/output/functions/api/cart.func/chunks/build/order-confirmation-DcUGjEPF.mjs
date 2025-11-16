import { _ as _sfc_main$1 } from './Container-DJ2zbRf-.mjs';
import { x as useRoute, b as useRouter, s as useSeoMeta, d as _sfc_main$e, e as _sfc_main$8 } from './server.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createTextVNode, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
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
  __name: "order-confirmation",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    const orderNumber = ref(route.query.order || "ORD-123456789");
    const customerEmail = ref("customer@example.com");
    const orderDate = ref((/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }));
    const estimatedDelivery = ref(new Date(Date.now() + 7 * 24 * 60 * 60 * 1e3).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }));
    const orderItems = ref([
      {
        id: "1",
        name: "Premium Wireless Headphones",
        image: "https://placehold.co/80x80",
        price: 199.99,
        quantity: 1
      },
      {
        id: "2",
        name: "Smart Watch Series 8",
        image: "https://placehold.co/80x80",
        price: 399.99,
        quantity: 1
      }
    ]);
    const shippingAddress = ref({
      name: "John Doe",
      address1: "123 Main Street",
      address2: "Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States"
    });
    const billingAddress = ref({
      name: "John Doe",
      address1: "123 Main Street",
      address2: "Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States"
    });
    const paymentMethod = ref("Credit Card");
    const cardLast4 = ref("4242");
    const shippingMethod = ref("Standard Shipping");
    const shippingDescription = ref("5-7 business days");
    const subtotal = computed(() => {
      return orderItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
    });
    const shipping = ref(0);
    const tax = computed(() => subtotal.value * 10 / 100);
    const total = computed(() => subtotal.value + shipping.value + tax.value);
    const handlePrint = () => {
      (void 0).print();
    };
    useSeoMeta({
      title: `Order Confirmation - ${orderNumber.value}`,
      description: "Your order has been confirmed and is being processed"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = _sfc_main$1;
      const _component_UIcon = _sfc_main$e;
      const _component_UButton = _sfc_main$8;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 dark:bg-gray-900 py-12" }, _attrs))} data-v-ad9aca43>`);
      _push(ssrRenderComponent(_component_UContainer, { class: "max-w-4xl" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="text-center mb-8" data-v-ad9aca43${_scopeId}><div class="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full mb-4" data-v-ad9aca43${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-check-circle",
              class: "text-5xl text-green-500"
            }, null, _parent2, _scopeId));
            _push2(`</div><h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2" data-v-ad9aca43${_scopeId}> Order Confirmed! </h1><p class="text-lg text-gray-600 dark:text-gray-400" data-v-ad9aca43${_scopeId}> Thank you for your purchase. Your order has been received. </p></div><div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-6" data-v-ad9aca43${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-gray-200 dark:border-gray-700" data-v-ad9aca43${_scopeId}><div data-v-ad9aca43${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400 mb-1" data-v-ad9aca43${_scopeId}>Order Number</p><p class="text-xl font-bold text-gray-900 dark:text-white" data-v-ad9aca43${_scopeId}>${ssrInterpolate(unref(orderNumber))}</p></div><div data-v-ad9aca43${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400 mb-1" data-v-ad9aca43${_scopeId}>Order Date</p><p class="text-lg font-semibold text-gray-900 dark:text-white" data-v-ad9aca43${_scopeId}>${ssrInterpolate(unref(orderDate))}</p></div><div data-v-ad9aca43${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400 mb-1" data-v-ad9aca43${_scopeId}>Estimated Delivery</p><p class="text-lg font-semibold text-gray-900 dark:text-white" data-v-ad9aca43${_scopeId}>${ssrInterpolate(unref(estimatedDelivery))}</p></div><div data-v-ad9aca43${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400 mb-1" data-v-ad9aca43${_scopeId}>Total Amount</p><p class="text-xl font-bold text-primary-500" data-v-ad9aca43${_scopeId}>$${ssrInterpolate(unref(total).toFixed(2))}</p></div></div><div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg" data-v-ad9aca43${_scopeId}><div class="flex items-start gap-3" data-v-ad9aca43${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-envelope",
              class: "text-blue-500 text-xl mt-0.5"
            }, null, _parent2, _scopeId));
            _push2(`<div data-v-ad9aca43${_scopeId}><p class="font-medium text-blue-900 dark:text-blue-100" data-v-ad9aca43${_scopeId}>Confirmation Email Sent</p><p class="text-sm text-blue-700 dark:text-blue-300 mt-1" data-v-ad9aca43${_scopeId}> We&#39;ve sent a confirmation email to <strong data-v-ad9aca43${_scopeId}>${ssrInterpolate(unref(customerEmail))}</strong> with your order details and tracking information. </p></div></div></div></div><div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-6" data-v-ad9aca43${_scopeId}><h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6" data-v-ad9aca43${_scopeId}>Order Items</h2><div class="space-y-4" data-v-ad9aca43${_scopeId}><!--[-->`);
            ssrRenderList(unref(orderItems), (item) => {
              _push2(`<div class="flex gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0" data-v-ad9aca43${_scopeId}><img${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.name)} class="w-20 h-20 object-cover rounded-lg" data-v-ad9aca43${_scopeId}><div class="flex-1" data-v-ad9aca43${_scopeId}><p class="font-semibold text-gray-900 dark:text-white" data-v-ad9aca43${_scopeId}>${ssrInterpolate(item.name)}</p><p class="text-sm text-gray-500 dark:text-gray-400 mt-1" data-v-ad9aca43${_scopeId}> Quantity: ${ssrInterpolate(item.quantity)}</p><p class="text-sm text-gray-500 dark:text-gray-400" data-v-ad9aca43${_scopeId}> $${ssrInterpolate(item.price.toFixed(2))} each </p></div><div class="text-right" data-v-ad9aca43${_scopeId}><p class="font-bold text-gray-900 dark:text-white" data-v-ad9aca43${_scopeId}> $${ssrInterpolate((item.price * item.quantity).toFixed(2))}</p></div></div>`);
            });
            _push2(`<!--]--></div><div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-2" data-v-ad9aca43${_scopeId}><div class="flex justify-between text-gray-600 dark:text-gray-400" data-v-ad9aca43${_scopeId}><span data-v-ad9aca43${_scopeId}>Subtotal</span><span data-v-ad9aca43${_scopeId}>$${ssrInterpolate(unref(subtotal).toFixed(2))}</span></div><div class="flex justify-between text-gray-600 dark:text-gray-400" data-v-ad9aca43${_scopeId}><span data-v-ad9aca43${_scopeId}>Shipping</span><span data-v-ad9aca43${_scopeId}>${ssrInterpolate(unref(shipping) === 0 ? "FREE" : `$${unref(shipping).toFixed(2)}`)}</span></div><div class="flex justify-between text-gray-600 dark:text-gray-400" data-v-ad9aca43${_scopeId}><span data-v-ad9aca43${_scopeId}>Tax</span><span data-v-ad9aca43${_scopeId}>$${ssrInterpolate(unref(tax).toFixed(2))}</span></div><div class="flex justify-between text-xl font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-700" data-v-ad9aca43${_scopeId}><span data-v-ad9aca43${_scopeId}>Total</span><span class="text-primary-500" data-v-ad9aca43${_scopeId}>$${ssrInterpolate(unref(total).toFixed(2))}</span></div></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6" data-v-ad9aca43${_scopeId}><div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6" data-v-ad9aca43${_scopeId}><div class="flex items-center gap-2 mb-4" data-v-ad9aca43${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-truck",
              class: "text-primary-500 text-xl"
            }, null, _parent2, _scopeId));
            _push2(`<h3 class="text-lg font-bold text-gray-900 dark:text-white" data-v-ad9aca43${_scopeId}>Shipping Address</h3></div><div class="text-gray-600 dark:text-gray-400 space-y-1" data-v-ad9aca43${_scopeId}><p class="font-medium text-gray-900 dark:text-white" data-v-ad9aca43${_scopeId}>${ssrInterpolate(unref(shippingAddress).name)}</p><p data-v-ad9aca43${_scopeId}>${ssrInterpolate(unref(shippingAddress).address1)}</p>`);
            if (unref(shippingAddress).address2) {
              _push2(`<p data-v-ad9aca43${_scopeId}>${ssrInterpolate(unref(shippingAddress).address2)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<p data-v-ad9aca43${_scopeId}>${ssrInterpolate(unref(shippingAddress).city)}, ${ssrInterpolate(unref(shippingAddress).state)} ${ssrInterpolate(unref(shippingAddress).zipCode)}</p><p data-v-ad9aca43${_scopeId}>${ssrInterpolate(unref(shippingAddress).country)}</p></div></div><div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6" data-v-ad9aca43${_scopeId}><div class="flex items-center gap-2 mb-4" data-v-ad9aca43${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-credit-card",
              class: "text-primary-500 text-xl"
            }, null, _parent2, _scopeId));
            _push2(`<h3 class="text-lg font-bold text-gray-900 dark:text-white" data-v-ad9aca43${_scopeId}>Billing Address</h3></div><div class="text-gray-600 dark:text-gray-400 space-y-1" data-v-ad9aca43${_scopeId}><p class="font-medium text-gray-900 dark:text-white" data-v-ad9aca43${_scopeId}>${ssrInterpolate(unref(billingAddress).name)}</p><p data-v-ad9aca43${_scopeId}>${ssrInterpolate(unref(billingAddress).address1)}</p>`);
            if (unref(billingAddress).address2) {
              _push2(`<p data-v-ad9aca43${_scopeId}>${ssrInterpolate(unref(billingAddress).address2)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<p data-v-ad9aca43${_scopeId}>${ssrInterpolate(unref(billingAddress).city)}, ${ssrInterpolate(unref(billingAddress).state)} ${ssrInterpolate(unref(billingAddress).zipCode)}</p><p data-v-ad9aca43${_scopeId}>${ssrInterpolate(unref(billingAddress).country)}</p></div></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" data-v-ad9aca43${_scopeId}><div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6" data-v-ad9aca43${_scopeId}><div class="flex items-center gap-2 mb-4" data-v-ad9aca43${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-wallet",
              class: "text-primary-500 text-xl"
            }, null, _parent2, _scopeId));
            _push2(`<h3 class="text-lg font-bold text-gray-900 dark:text-white" data-v-ad9aca43${_scopeId}>Payment Method</h3></div><div class="text-gray-600 dark:text-gray-400" data-v-ad9aca43${_scopeId}><p class="font-medium text-gray-900 dark:text-white" data-v-ad9aca43${_scopeId}>${ssrInterpolate(unref(paymentMethod))}</p>`);
            if (unref(cardLast4)) {
              _push2(`<p class="text-sm mt-1" data-v-ad9aca43${_scopeId}> Card ending in ••${ssrInterpolate(unref(cardLast4))}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6" data-v-ad9aca43${_scopeId}><div class="flex items-center gap-2 mb-4" data-v-ad9aca43${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-cube",
              class: "text-primary-500 text-xl"
            }, null, _parent2, _scopeId));
            _push2(`<h3 class="text-lg font-bold text-gray-900 dark:text-white" data-v-ad9aca43${_scopeId}>Shipping Method</h3></div><div class="text-gray-600 dark:text-gray-400" data-v-ad9aca43${_scopeId}><p class="font-medium text-gray-900 dark:text-white" data-v-ad9aca43${_scopeId}>${ssrInterpolate(unref(shippingMethod))}</p><p class="text-sm mt-1" data-v-ad9aca43${_scopeId}>${ssrInterpolate(unref(shippingDescription))}</p></div></div></div><div class="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg shadow-sm p-8 text-white mb-6" data-v-ad9aca43${_scopeId}><h2 class="text-2xl font-bold mb-4" data-v-ad9aca43${_scopeId}>What&#39;s Next?</h2><div class="grid grid-cols-1 md:grid-cols-3 gap-6" data-v-ad9aca43${_scopeId}><div class="flex gap-3" data-v-ad9aca43${_scopeId}><div class="flex-shrink-0" data-v-ad9aca43${_scopeId}><div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center" data-v-ad9aca43${_scopeId}><span class="font-bold text-lg" data-v-ad9aca43${_scopeId}>1</span></div></div><div data-v-ad9aca43${_scopeId}><h3 class="font-semibold mb-1" data-v-ad9aca43${_scopeId}>Order Processing</h3><p class="text-sm text-white/90" data-v-ad9aca43${_scopeId}>We&#39;re preparing your order for shipment</p></div></div><div class="flex gap-3" data-v-ad9aca43${_scopeId}><div class="flex-shrink-0" data-v-ad9aca43${_scopeId}><div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center" data-v-ad9aca43${_scopeId}><span class="font-bold text-lg" data-v-ad9aca43${_scopeId}>2</span></div></div><div data-v-ad9aca43${_scopeId}><h3 class="font-semibold mb-1" data-v-ad9aca43${_scopeId}>Shipping Notification</h3><p class="text-sm text-white/90" data-v-ad9aca43${_scopeId}>You&#39;ll receive tracking info via email</p></div></div><div class="flex gap-3" data-v-ad9aca43${_scopeId}><div class="flex-shrink-0" data-v-ad9aca43${_scopeId}><div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center" data-v-ad9aca43${_scopeId}><span class="font-bold text-lg" data-v-ad9aca43${_scopeId}>3</span></div></div><div data-v-ad9aca43${_scopeId}><h3 class="font-semibold mb-1" data-v-ad9aca43${_scopeId}>Delivery</h3><p class="text-sm text-white/90" data-v-ad9aca43${_scopeId}>Enjoy your purchase!</p></div></div></div></div><div class="flex flex-col sm:flex-row gap-4 justify-center" data-v-ad9aca43${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              to: "/",
              size: "lg",
              variant: "soft",
              icon: "i-heroicons-home"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Back to Home `);
                } else {
                  return [
                    createTextVNode(" Back to Home ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              to: "/shop",
              size: "lg",
              variant: "soft",
              icon: "i-heroicons-shopping-bag"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Continue Shopping `);
                } else {
                  return [
                    createTextVNode(" Continue Shopping ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              onClick: handlePrint,
              size: "lg",
              color: "secondary",
              icon: "i-heroicons-printer"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Print Order `);
                } else {
                  return [
                    createTextVNode(" Print Order ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="text-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700" data-v-ad9aca43${_scopeId}><p class="text-gray-600 dark:text-gray-400 mb-2" data-v-ad9aca43${_scopeId}>Need help with your order?</p>`);
            _push2(ssrRenderComponent(_component_UButton, {
              to: "/support",
              variant: "link",
              icon: "i-heroicons-question-mark-circle"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Contact Support `);
                } else {
                  return [
                    createTextVNode(" Contact Support ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "text-center mb-8" }, [
                createVNode("div", { class: "inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full mb-4" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-check-circle",
                    class: "text-5xl text-green-500"
                  })
                ]),
                createVNode("h1", { class: "text-3xl font-bold text-gray-900 dark:text-white mb-2" }, " Order Confirmed! "),
                createVNode("p", { class: "text-lg text-gray-600 dark:text-gray-400" }, " Thank you for your purchase. Your order has been received. ")
              ]),
              createVNode("div", { class: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-6" }, [
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-gray-200 dark:border-gray-700" }, [
                  createVNode("div", null, [
                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400 mb-1" }, "Order Number"),
                    createVNode("p", { class: "text-xl font-bold text-gray-900 dark:text-white" }, toDisplayString(unref(orderNumber)), 1)
                  ]),
                  createVNode("div", null, [
                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400 mb-1" }, "Order Date"),
                    createVNode("p", { class: "text-lg font-semibold text-gray-900 dark:text-white" }, toDisplayString(unref(orderDate)), 1)
                  ]),
                  createVNode("div", null, [
                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400 mb-1" }, "Estimated Delivery"),
                    createVNode("p", { class: "text-lg font-semibold text-gray-900 dark:text-white" }, toDisplayString(unref(estimatedDelivery)), 1)
                  ]),
                  createVNode("div", null, [
                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400 mb-1" }, "Total Amount"),
                    createVNode("p", { class: "text-xl font-bold text-primary-500" }, "$" + toDisplayString(unref(total).toFixed(2)), 1)
                  ])
                ]),
                createVNode("div", { class: "mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg" }, [
                  createVNode("div", { class: "flex items-start gap-3" }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-envelope",
                      class: "text-blue-500 text-xl mt-0.5"
                    }),
                    createVNode("div", null, [
                      createVNode("p", { class: "font-medium text-blue-900 dark:text-blue-100" }, "Confirmation Email Sent"),
                      createVNode("p", { class: "text-sm text-blue-700 dark:text-blue-300 mt-1" }, [
                        createTextVNode(" We've sent a confirmation email to "),
                        createVNode("strong", null, toDisplayString(unref(customerEmail)), 1),
                        createTextVNode(" with your order details and tracking information. ")
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode("div", { class: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-6" }, [
                createVNode("h2", { class: "text-xl font-bold text-gray-900 dark:text-white mb-6" }, "Order Items"),
                createVNode("div", { class: "space-y-4" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(orderItems), (item) => {
                    return openBlock(), createBlock("div", {
                      key: item.id,
                      class: "flex gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0"
                    }, [
                      createVNode("img", {
                        src: item.image,
                        alt: item.name,
                        class: "w-20 h-20 object-cover rounded-lg"
                      }, null, 8, ["src", "alt"]),
                      createVNode("div", { class: "flex-1" }, [
                        createVNode("p", { class: "font-semibold text-gray-900 dark:text-white" }, toDisplayString(item.name), 1),
                        createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400 mt-1" }, " Quantity: " + toDisplayString(item.quantity), 1),
                        createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, " $" + toDisplayString(item.price.toFixed(2)) + " each ", 1)
                      ]),
                      createVNode("div", { class: "text-right" }, [
                        createVNode("p", { class: "font-bold text-gray-900 dark:text-white" }, " $" + toDisplayString((item.price * item.quantity).toFixed(2)), 1)
                      ])
                    ]);
                  }), 128))
                ]),
                createVNode("div", { class: "mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-2" }, [
                  createVNode("div", { class: "flex justify-between text-gray-600 dark:text-gray-400" }, [
                    createVNode("span", null, "Subtotal"),
                    createVNode("span", null, "$" + toDisplayString(unref(subtotal).toFixed(2)), 1)
                  ]),
                  createVNode("div", { class: "flex justify-between text-gray-600 dark:text-gray-400" }, [
                    createVNode("span", null, "Shipping"),
                    createVNode("span", null, toDisplayString(unref(shipping) === 0 ? "FREE" : `$${unref(shipping).toFixed(2)}`), 1)
                  ]),
                  createVNode("div", { class: "flex justify-between text-gray-600 dark:text-gray-400" }, [
                    createVNode("span", null, "Tax"),
                    createVNode("span", null, "$" + toDisplayString(unref(tax).toFixed(2)), 1)
                  ]),
                  createVNode("div", { class: "flex justify-between text-xl font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-700" }, [
                    createVNode("span", null, "Total"),
                    createVNode("span", { class: "text-primary-500" }, "$" + toDisplayString(unref(total).toFixed(2)), 1)
                  ])
                ])
              ]),
              createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6" }, [
                createVNode("div", { class: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6" }, [
                  createVNode("div", { class: "flex items-center gap-2 mb-4" }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-truck",
                      class: "text-primary-500 text-xl"
                    }),
                    createVNode("h3", { class: "text-lg font-bold text-gray-900 dark:text-white" }, "Shipping Address")
                  ]),
                  createVNode("div", { class: "text-gray-600 dark:text-gray-400 space-y-1" }, [
                    createVNode("p", { class: "font-medium text-gray-900 dark:text-white" }, toDisplayString(unref(shippingAddress).name), 1),
                    createVNode("p", null, toDisplayString(unref(shippingAddress).address1), 1),
                    unref(shippingAddress).address2 ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(unref(shippingAddress).address2), 1)) : createCommentVNode("", true),
                    createVNode("p", null, toDisplayString(unref(shippingAddress).city) + ", " + toDisplayString(unref(shippingAddress).state) + " " + toDisplayString(unref(shippingAddress).zipCode), 1),
                    createVNode("p", null, toDisplayString(unref(shippingAddress).country), 1)
                  ])
                ]),
                createVNode("div", { class: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6" }, [
                  createVNode("div", { class: "flex items-center gap-2 mb-4" }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-credit-card",
                      class: "text-primary-500 text-xl"
                    }),
                    createVNode("h3", { class: "text-lg font-bold text-gray-900 dark:text-white" }, "Billing Address")
                  ]),
                  createVNode("div", { class: "text-gray-600 dark:text-gray-400 space-y-1" }, [
                    createVNode("p", { class: "font-medium text-gray-900 dark:text-white" }, toDisplayString(unref(billingAddress).name), 1),
                    createVNode("p", null, toDisplayString(unref(billingAddress).address1), 1),
                    unref(billingAddress).address2 ? (openBlock(), createBlock("p", { key: 0 }, toDisplayString(unref(billingAddress).address2), 1)) : createCommentVNode("", true),
                    createVNode("p", null, toDisplayString(unref(billingAddress).city) + ", " + toDisplayString(unref(billingAddress).state) + " " + toDisplayString(unref(billingAddress).zipCode), 1),
                    createVNode("p", null, toDisplayString(unref(billingAddress).country), 1)
                  ])
                ])
              ]),
              createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" }, [
                createVNode("div", { class: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6" }, [
                  createVNode("div", { class: "flex items-center gap-2 mb-4" }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-wallet",
                      class: "text-primary-500 text-xl"
                    }),
                    createVNode("h3", { class: "text-lg font-bold text-gray-900 dark:text-white" }, "Payment Method")
                  ]),
                  createVNode("div", { class: "text-gray-600 dark:text-gray-400" }, [
                    createVNode("p", { class: "font-medium text-gray-900 dark:text-white" }, toDisplayString(unref(paymentMethod)), 1),
                    unref(cardLast4) ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-sm mt-1"
                    }, " Card ending in ••" + toDisplayString(unref(cardLast4)), 1)) : createCommentVNode("", true)
                  ])
                ]),
                createVNode("div", { class: "bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6" }, [
                  createVNode("div", { class: "flex items-center gap-2 mb-4" }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-cube",
                      class: "text-primary-500 text-xl"
                    }),
                    createVNode("h3", { class: "text-lg font-bold text-gray-900 dark:text-white" }, "Shipping Method")
                  ]),
                  createVNode("div", { class: "text-gray-600 dark:text-gray-400" }, [
                    createVNode("p", { class: "font-medium text-gray-900 dark:text-white" }, toDisplayString(unref(shippingMethod)), 1),
                    createVNode("p", { class: "text-sm mt-1" }, toDisplayString(unref(shippingDescription)), 1)
                  ])
                ])
              ]),
              createVNode("div", { class: "bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg shadow-sm p-8 text-white mb-6" }, [
                createVNode("h2", { class: "text-2xl font-bold mb-4" }, "What's Next?"),
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [
                  createVNode("div", { class: "flex gap-3" }, [
                    createVNode("div", { class: "flex-shrink-0" }, [
                      createVNode("div", { class: "w-10 h-10 bg-white/20 rounded-full flex items-center justify-center" }, [
                        createVNode("span", { class: "font-bold text-lg" }, "1")
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("h3", { class: "font-semibold mb-1" }, "Order Processing"),
                      createVNode("p", { class: "text-sm text-white/90" }, "We're preparing your order for shipment")
                    ])
                  ]),
                  createVNode("div", { class: "flex gap-3" }, [
                    createVNode("div", { class: "flex-shrink-0" }, [
                      createVNode("div", { class: "w-10 h-10 bg-white/20 rounded-full flex items-center justify-center" }, [
                        createVNode("span", { class: "font-bold text-lg" }, "2")
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("h3", { class: "font-semibold mb-1" }, "Shipping Notification"),
                      createVNode("p", { class: "text-sm text-white/90" }, "You'll receive tracking info via email")
                    ])
                  ]),
                  createVNode("div", { class: "flex gap-3" }, [
                    createVNode("div", { class: "flex-shrink-0" }, [
                      createVNode("div", { class: "w-10 h-10 bg-white/20 rounded-full flex items-center justify-center" }, [
                        createVNode("span", { class: "font-bold text-lg" }, "3")
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("h3", { class: "font-semibold mb-1" }, "Delivery"),
                      createVNode("p", { class: "text-sm text-white/90" }, "Enjoy your purchase!")
                    ])
                  ])
                ])
              ]),
              createVNode("div", { class: "flex flex-col sm:flex-row gap-4 justify-center" }, [
                createVNode(_component_UButton, {
                  to: "/",
                  size: "lg",
                  variant: "soft",
                  icon: "i-heroicons-home"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Back to Home ")
                  ]),
                  _: 1
                }),
                createVNode(_component_UButton, {
                  to: "/shop",
                  size: "lg",
                  variant: "soft",
                  icon: "i-heroicons-shopping-bag"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Continue Shopping ")
                  ]),
                  _: 1
                }),
                createVNode(_component_UButton, {
                  onClick: handlePrint,
                  size: "lg",
                  color: "secondary",
                  icon: "i-heroicons-printer"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Print Order ")
                  ]),
                  _: 1
                })
              ]),
              createVNode("div", { class: "text-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700" }, [
                createVNode("p", { class: "text-gray-600 dark:text-gray-400 mb-2" }, "Need help with your order?"),
                createVNode(_component_UButton, {
                  to: "/support",
                  variant: "link",
                  icon: "i-heroicons-question-mark-circle"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Contact Support ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/order-confirmation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const orderConfirmation = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ad9aca43"]]);

export { orderConfirmation as default };
//# sourceMappingURL=order-confirmation-DcUGjEPF.mjs.map
