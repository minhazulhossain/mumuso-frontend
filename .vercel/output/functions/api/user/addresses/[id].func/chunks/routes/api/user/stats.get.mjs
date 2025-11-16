import { d as defineEventHandler, w as requireUserSession } from '../../../_/nitro.mjs';
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

const stats_get = defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  return {};
});

export { stats_get as default };
//# sourceMappingURL=stats.get.mjs.map
