import { d as defineEventHandler, g as getUserSession, e as refreshUserSession } from '../../../_/nitro.mjs';
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

const session_get = defineEventHandler(async (event) => {
  var _a;
  const session = await getUserSession(event);
  if (!((_a = session == null ? void 0 : session.user) == null ? void 0 : _a.token)) {
    return { user: null };
  }
  const user = await refreshUserSession(event);
  return {
    user
  };
});

export { session_get as default };
//# sourceMappingURL=session.get.mjs.map
