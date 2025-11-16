import { d as defineEventHandler, g as getUserSession, m as makeAuthenticatedRequest, j as getGuestCart } from '../../_/nitro.mjs';
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

const index_get = defineEventHandler(async (event) => {
  var _a;
  const session = await getUserSession(event);
  if ((_a = session == null ? void 0 : session.user) == null ? void 0 : _a.token) {
    return await makeAuthenticatedRequest(event, "cart", {
      requireAuth: false
    });
  }
  return await getGuestCart(event);
});

export { index_get as default };
//# sourceMappingURL=index.get2.mjs.map
