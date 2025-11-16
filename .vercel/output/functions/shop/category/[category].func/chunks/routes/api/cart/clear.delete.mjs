import { d as defineEventHandler, g as getUserSession, m as makeAuthenticatedRequest, l as clearGuestCart } from '../../../_/nitro.mjs';
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

const clear_delete = defineEventHandler(async (event) => {
  var _a;
  const session = await getUserSession(event);
  if ((_a = session == null ? void 0 : session.user) == null ? void 0 : _a.token) {
    return await makeAuthenticatedRequest(event, "cart/clear", {
      method: "DELETE",
      requireAuth: false
    });
  }
  return await clearGuestCart(event);
});

export { clear_delete as default };
//# sourceMappingURL=clear.delete.mjs.map
