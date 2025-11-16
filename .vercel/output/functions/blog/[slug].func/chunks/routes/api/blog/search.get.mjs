import { d as defineEventHandler, h as getQuery } from '../../../_/nitro.mjs';
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

const search_get = defineEventHandler(async (event) => {
  const query = getQuery(event);
  const searchTerm = (query.q || "").toLowerCase();
  const allPosts = posts;
  await new Promise((resolve) => setTimeout(resolve, 400));
  return allPosts.filter(
    (post) => post.title.toLowerCase().includes(searchTerm) || post.excerpt.toLowerCase().includes(searchTerm) || post.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
  );
});

export { search_get as default };
//# sourceMappingURL=search.get.mjs.map
