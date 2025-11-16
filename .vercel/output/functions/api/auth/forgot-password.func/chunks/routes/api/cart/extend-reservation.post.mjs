import { d as defineEventHandler, g as getUserSession, m as makeAuthenticatedRequest } from '../../../_/nitro.mjs';
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

const extendReservation_post = defineEventHandler(async (event) => {
  var _a;
  const session = await getUserSession(event);
  if (!((_a = session == null ? void 0 : session.user) == null ? void 0 : _a.token)) {
    return { success: true, message: "Guest cart does not require reservation" };
  }
  return await makeAuthenticatedRequest(event, "cart/extend-reservation", {
    method: "POST"
  });
});

export { extendReservation_post as default };
//# sourceMappingURL=extend-reservation.post.mjs.map
