import { X as executeAsync } from '../_/nitro.mjs';
import { R as defineNuxtRouteMiddleware, v as navigateTo } from './server.mjs';
import { u as useAuth } from './useAuth-leGUVdDb.mjs';
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
import 'vue';
import 'vue-router';
import 'tailwindcss/colors';
import '@iconify/vue';
import 'vue/server-renderer';
import 'reka-ui';
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

const guest = defineNuxtRouteMiddleware(async (to, from) => {
  let __temp, __restore;
  const { loggedIn, fetch } = useAuth();
  [__temp, __restore] = executeAsync(() => fetch()), await __temp, __restore();
  if (loggedIn.value) {
    return navigateTo("/");
  }
});

export { guest as default };
//# sourceMappingURL=guest-CsQEy2H1.mjs.map
