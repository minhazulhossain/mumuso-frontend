import { d as defineEventHandler, f as getRouterParam, r as readValidatedBody, g as getUserSession, m as makeAuthenticatedRequest, q as updateGuestCartItem } from '../../../../_/nitro.mjs';
import { z } from 'zod';
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

const bodySchema = z.object({
  quantity: z.number().min(1),
  variation_id: z.number().optional()
});
const _slug__put = defineEventHandler(async (event) => {
  var _a;
  const slug = getRouterParam(event, "slug");
  const body = await readValidatedBody(event, bodySchema.parse);
  const session = await getUserSession(event);
  if ((_a = session == null ? void 0 : session.user) == null ? void 0 : _a.token) {
    return await makeAuthenticatedRequest(event, `cart/update/${slug}`, {
      method: "PUT",
      body,
      requireAuth: false
    });
  }
  return await updateGuestCartItem(event, slug, body.quantity, body.variation_id);
});

export { _slug__put as default };
//# sourceMappingURL=_slug_.put.mjs.map
