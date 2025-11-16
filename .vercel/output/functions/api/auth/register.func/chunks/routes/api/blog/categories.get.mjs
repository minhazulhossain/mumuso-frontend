import { d as defineEventHandler } from '../../../_/nitro.mjs';
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

const categories_get = defineEventHandler(async () => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [
    { name: "Tutorial", count: 15 },
    { name: "Vue", count: 12 },
    { name: "Backend", count: 8 },
    { name: "DevOps", count: 6 },
    { name: "Testing", count: 5 }
  ];
});

export { categories_get as default };
//# sourceMappingURL=categories.get.mjs.map
