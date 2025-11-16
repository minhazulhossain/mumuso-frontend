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
  token: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  password_confirmation: z.string().min(8)
});
const resetPassword_post = defineEventHandler(async (event) => {
  var _a;
  const config = useRuntimeConfig();
  const body = await readValidatedBody(event, bodySchema.parse);
  try {
    return await $fetch(`${config.public.apiBase}reset-password`, {
      method: "POST",
      body
    });
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: ((_a = error.data) == null ? void 0 : _a.message) || "Password reset failed"
    });
  }
});

export { resetPassword_post as default };
//# sourceMappingURL=reset-password.post.mjs.map
