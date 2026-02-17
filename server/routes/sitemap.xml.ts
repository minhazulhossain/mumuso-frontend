type GenericRecord = Record<string, any>

interface SitemapUrl {
  loc: string
  lastmod?: string
  changefreq?: 'daily' | 'weekly' | 'monthly'
  priority?: number
}

const DEFAULT_SITE_URL = 'https://mumuso.com.bd'
const MAX_PAGES = 100
const PER_PAGE = 100

const toIsoDate = (value: unknown): string | undefined => {
  if (!value) return undefined
  const date = new Date(String(value))
  if (Number.isNaN(date.getTime())) return undefined
  return date.toISOString()
}

const escapeXml = (value: string): string => {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

const asArray = (payload: unknown): GenericRecord[] => {
  if (Array.isArray(payload)) return payload as GenericRecord[]
  if (payload && typeof payload === 'object') {
    const obj = payload as GenericRecord
    if (Array.isArray(obj.data)) return obj.data as GenericRecord[]
    if (Array.isArray(obj.items)) return obj.items as GenericRecord[]
  }
  return []
}

const asObject = (payload: unknown): GenericRecord | null => {
  if (!payload || typeof payload !== 'object') return null
  const obj = payload as GenericRecord
  if (obj.data && typeof obj.data === 'object' && !Array.isArray(obj.data)) {
    return obj.data as GenericRecord
  }
  return obj
}

const getMeta = (payload: unknown): GenericRecord => {
  if (!payload || typeof payload !== 'object') return {}
  const obj = payload as GenericRecord
  if (obj.meta && typeof obj.meta === 'object') return obj.meta as GenericRecord
  if (obj.pagination && typeof obj.pagination === 'object') return obj.pagination as GenericRecord
  return {}
}

const toAbsoluteUrl = (siteUrl: string, path: string): string => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return new URL(normalizedPath, siteUrl).toString()
}

const resolveSiteUrl = async (apiBase: string): Promise<string> => {
  try {
    const sitePayload = await $fetch(`${apiBase}settings/site`)
    const site = asObject(sitePayload)
    const rawUrl = site?.url
    if (typeof rawUrl === 'string' && rawUrl.trim().length > 0) {
      return rawUrl.endsWith('/') ? rawUrl : `${rawUrl}/`
    }
  } catch {
    // Ignore and use fallback
  }

  return DEFAULT_SITE_URL.endsWith('/') ? DEFAULT_SITE_URL : `${DEFAULT_SITE_URL}/`
}

const fetchPaginated = async (apiBase: string, endpoint: string): Promise<GenericRecord[]> => {
  const rows: GenericRecord[] = []

  for (let page = 1; page <= MAX_PAGES; page += 1) {
    let payload: unknown
    try {
      payload = await $fetch(`${apiBase}${endpoint}`, {
        query: {
          page,
          per_page: PER_PAGE
        }
      })
    } catch {
      break
    }

    const items = asArray(payload)
    if (!items.length) break

    rows.push(...items)

    const meta = getMeta(payload)
    const lastPage = Number(meta.last_page ?? meta.lastPage ?? page)
    if (!Number.isFinite(lastPage) || page >= lastPage) break
  }

  return rows
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const apiBaseRaw = process.env.BACKEND_API_BASE || config.public.apiBase || 'https://admin.mumuso.com.bd/api/v1/'
  const apiBase = apiBaseRaw.endsWith('/') ? apiBaseRaw : `${apiBaseRaw}/`
  const siteUrl = await resolveSiteUrl(apiBase)

  const urls = new Map<string, SitemapUrl>()

  const addUrl = (path: string, options: Omit<SitemapUrl, 'loc'> = {}) => {
    const loc = toAbsoluteUrl(siteUrl, path)
    urls.set(loc, { loc, ...options })
  }

  addUrl('/', { changefreq: 'daily', priority: 1.0 })
  addUrl('/shop', { changefreq: 'daily', priority: 0.9 })
  addUrl('/blog', { changefreq: 'weekly', priority: 0.7 })
  addUrl('/contact', { changefreq: 'monthly', priority: 0.5 })

  const [products, categories, posts] = await Promise.all([
    fetchPaginated(apiBase, 'products'),
    fetchPaginated(apiBase, 'categories'),
    fetchPaginated(apiBase, 'blog')
  ])

  for (const product of products) {
    if (!product?.slug) continue
    addUrl(`/shop/product/${product.slug}`, {
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: toIsoDate(product.updated_at ?? product.updatedAt ?? product.created_at)
    })
  }

  for (const category of categories) {
    if (!category?.slug) continue
    addUrl(`/categories/${category.slug}`, {
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: toIsoDate(category.updated_at ?? category.updatedAt ?? category.created_at)
    })
  }

  for (const post of posts) {
    if (!post?.slug) continue
    addUrl(`/blog/${post.slug}`, {
      changefreq: 'monthly',
      priority: 0.6,
      lastmod: toIsoDate(post.updated_at ?? post.updatedAt ?? post.published_at ?? post.created_at)
    })
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...Array.from(urls.values()).map((entry) => {
      const lines = [
        '<url>',
        `<loc>${escapeXml(entry.loc)}</loc>`
      ]

      if (entry.lastmod) {
        lines.push(`<lastmod>${entry.lastmod}</lastmod>`)
      }
      if (entry.changefreq) {
        lines.push(`<changefreq>${entry.changefreq}</changefreq>`)
      }
      if (typeof entry.priority === 'number') {
        lines.push(`<priority>${entry.priority.toFixed(1)}</priority>`)
      }

      lines.push('</url>')
      return lines.join('')
    }),
    '</urlset>'
  ].join('')

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return xml
})
