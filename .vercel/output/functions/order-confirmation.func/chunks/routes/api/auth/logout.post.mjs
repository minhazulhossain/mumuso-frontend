import { d as defineEventHandler, g as getUserSession, a as useRuntimeConfig, b as clearUserSession } from '../../../_/nitro.mjs';
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

const logout_post = defineEventHandler(async (event) => {
  var _a;
  const config = useRuntimeConfig();
  const session = await getUserSession(event);
  if ((_a = session == null ? void 0 : session.user) == null ? void 0 : _a.token) {
    try {
      await $fetch(`${config.public.apiBase}logout`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${session.user.token}`,
          "Accept": "application/json"
        }
      });
    } catch (error) {
      console.error("Backend logout failed:", error);
    }
  }
  await clearUserSession(event);
  return { success: true };
});

export { logout_post as default };
//# sourceMappingURL=logout.post.mjs.map
