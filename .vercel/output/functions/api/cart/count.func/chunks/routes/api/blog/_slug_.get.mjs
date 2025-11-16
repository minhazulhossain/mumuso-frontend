import { d as defineEventHandler, f as getRouterParam, c as createError } from '../../../_/nitro.mjs';
import { posts } from '../_posts.mjs';
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

const _slug__get = defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  await new Promise((resolve) => setTimeout(resolve, 400));
  const post = posts.find((p) => p.slug === slug);
  if (!post) {
    throw createError({
      statusCode: 404,
      message: "Post not found"
    });
  }
  return post;
});

export { _slug__get as default };
//# sourceMappingURL=_slug_.get.mjs.map
