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
  email: z.string().email(),
  password: z.string().min(6)
});
const login_post = defineEventHandler(async (event) => {
  var _a;
  const config = useRuntimeConfig();
  const { email, password } = await readValidatedBody(event, bodySchema.parse);
  try {
    const response = await $fetch(`${config.public.apiBase}login`, {
      method: "POST",
      body: { email, password }
    });
    return await setupUserSession(event, response);
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 401,
      message: ((_a = error.data) == null ? void 0 : _a.message) || "Invalid credentials"
    });
  }
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
