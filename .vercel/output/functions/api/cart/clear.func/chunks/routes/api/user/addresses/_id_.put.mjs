import { d as defineEventHandler, g as getUserSession, c as createError, f as getRouterParam, v as readBody, a as useRuntimeConfig } from '../../../../_/nitro.mjs';
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

const _id__put = defineEventHandler(async (event) => {
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
    const id = getRouterParam(event, "id");
    const body = await readBody(event);
    return await $fetch(`${config.public.apiBase}user/addresses/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${session.user.token}`
      },
      body
    });
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: ((_b = error.data) == null ? void 0 : _b.message) || "Failed to update address"
    });
  }
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
