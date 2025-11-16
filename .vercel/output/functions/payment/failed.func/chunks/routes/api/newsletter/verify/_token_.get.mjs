import { d as defineEventHandler, f as getRouterParam, a as useRuntimeConfig, c as createError } from '../../../../_/nitro.mjs';
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

const _token__get = defineEventHandler(async (event) => {
  var _a;
  const config = useRuntimeConfig();
  const token = getRouterParam(event, "token");
  try {
    return await $fetch(`${config.public.apiBase}newsletter/verify/${token}`, {
      headers: {
        "Accept": "application/json"
      }
    });
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: ((_a = error.data) == null ? void 0 : _a.message) || "Verification failed"
    });
  }
});

export { _token__get as default };
//# sourceMappingURL=_token_.get.mjs.map
