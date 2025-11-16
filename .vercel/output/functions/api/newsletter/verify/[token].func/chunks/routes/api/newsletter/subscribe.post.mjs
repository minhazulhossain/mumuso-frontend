import { d as defineEventHandler, r as readValidatedBody, a as useRuntimeConfig, c as createError } from '../../../_/nitro.mjs';
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
  email: z.string().email(),
  name: z.string().optional()
});
const subscribe_post = defineEventHandler(async (event) => {
  var _a;
  const config = useRuntimeConfig();
  const body = await readValidatedBody(event, bodySchema.parse);
  try {
    return await $fetch(`${config.public.apiBase}newsletter/subscribe`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body
    });
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      data: error.data,
      message: ((_a = error.data) == null ? void 0 : _a.message) || "Subscription failed"
    });
  }
});

export { subscribe_post as default };
//# sourceMappingURL=subscribe.post.mjs.map
