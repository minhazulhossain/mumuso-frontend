import { d as defineEventHandler, g as getUserSession, c as createError, f as getRouterParam, a as useRuntimeConfig } from '../../../../_/nitro.mjs';
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

const _transactionId__get = defineEventHandler(async (event) => {
  var _a, _b;
  const config = useRuntimeConfig();
  const session = await getUserSession(event);
  if (!((_a = session == null ? void 0 : session.user) == null ? void 0 : _a.token)) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized"
    });
  }
  try {
    const transactionId = getRouterParam(event, "transactionId");
    const response = await $fetch(`${config.public.apiBase}payment/status/${transactionId}`, {
      headers: {
        Authorization: `Bearer ${session.user.token}`
      }
    });
    return response;
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: ((_b = error.data) == null ? void 0 : _b.message) || "Failed to fetch payment status"
    });
  }
});

export { _transactionId__get as default };
//# sourceMappingURL=_transactionId_.get.mjs.map
