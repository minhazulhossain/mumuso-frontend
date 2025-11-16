import { d as defineEventHandler, f as getRouterParam, h as getQuery, g as getUserSession, m as makeAuthenticatedRequest, o as removeFromGuestCart } from '../../../../_/nitro.mjs';
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

const _slug__delete = defineEventHandler(async (event) => {
  var _a;
  const slug = getRouterParam(event, "slug");
  const query = getQuery(event);
  const variation_id = query.variation_id ? Number(query.variation_id) : void 0;
  const session = await getUserSession(event);
  if ((_a = session == null ? void 0 : session.user) == null ? void 0 : _a.token) {
    let url = `cart/remove/${slug}`;
    if (variation_id) {
      url += `?variation_id=${variation_id}`;
    }
    return await makeAuthenticatedRequest(event, url, {
      method: "DELETE",
      requireAuth: false
    });
  }
  return await removeFromGuestCart(event, slug, variation_id);
});

export { _slug__delete as default };
//# sourceMappingURL=_slug_.delete.mjs.map
