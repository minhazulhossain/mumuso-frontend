import { d as defineEventHandler, r as readValidatedBody, g as getUserSession, m as makeAuthenticatedRequest, i as addToGuestCart } from '../../../_/nitro.mjs';
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
  slug: z.string(),
  quantity: z.number().min(1).default(1),
  variation_id: z.number().optional()
});
const add_post = defineEventHandler(async (event) => {
  var _a;
  const body = await readValidatedBody(event, bodySchema.parse);
  const session = await getUserSession(event);
  if ((_a = session == null ? void 0 : session.user) == null ? void 0 : _a.token) {
    return await makeAuthenticatedRequest(event, "cart/add", {
      method: "POST",
      body,
      requireAuth: false
    });
  }
  return await addToGuestCart(event, body.slug, body.quantity, body.variation_id);
});

export { add_post as default };
//# sourceMappingURL=add.post.mjs.map
