import { d as defineEventHandler, h as getQuery, a as useRuntimeConfig, c as createError } from '../../_/nitro.mjs';
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

const index_get = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery(event);
  const apiBase = config.public.apiBase;
  try {
    const response = await $fetch(`${apiBase}blog`, {
      query: {
        per_page: query._limit || 9,
        page: query._page || 1,
        search: query.search,
        category: query.category
        // if you add category support later
      }
    });
    console.log("response", response);
    return {
      posts: response.data,
      total: response.meta.total,
      page: response.meta.current_page,
      totalPages: response.meta.last_page,
      perPage: response.meta.per_page
    };
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Failed to fetch blog posts"
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
