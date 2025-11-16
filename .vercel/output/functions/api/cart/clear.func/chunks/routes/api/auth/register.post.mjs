import { d as defineEventHandler, r as readValidatedBody, a as useRuntimeConfig, s as setupUserSession, c as createError } from '../../../_/nitro.mjs';
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
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  password_confirmation: z.string().min(8)
});
const register_post = defineEventHandler(async (event) => {
  var _a;
  const config = useRuntimeConfig();
  const body = await readValidatedBody(event, bodySchema.parse);
  try {
    const response = await $fetch(`${config.public.apiBase}register`, {
      method: "POST",
      body
    });
    return await setupUserSession(event, response);
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 400,
      message: ((_a = error.data) == null ? void 0 : _a.message) || "Registration failed"
    });
  }
});

export { register_post as default };
//# sourceMappingURL=register.post.mjs.map
