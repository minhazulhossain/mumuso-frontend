import { d as defineEventHandler, n as getCartCount } from '../../../_/nitro.mjs';
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

const count_get = defineEventHandler(async (event) => {
  return {
    count: await getCartCount(event)
  };
});

export { count_get as default };
//# sourceMappingURL=count.get.mjs.map
