import { d as defineEventHandler, g as getUserSession, c as createError, j as getGuestCart, k as syncGuestCartToBackend, m as makeAuthenticatedRequest } from '../../../_/nitro.mjs';
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

const checkout_post = defineEventHandler(async (event) => {
  var _a;
  const session = await getUserSession(event);
  if (!((_a = session == null ? void 0 : session.user) == null ? void 0 : _a.token)) {
    throw createError({
      statusCode: 401,
      message: "Please login to checkout"
    });
  }
  const guestCart = await getGuestCart(event);
  if (guestCart.items.length > 0) {
    await syncGuestCartToBackend(event, guestCart.items);
  }
  return await makeAuthenticatedRequest(event, "cart/checkout", {
    method: "POST"
  });
});

export { checkout_post as default };
//# sourceMappingURL=checkout.post.mjs.map
