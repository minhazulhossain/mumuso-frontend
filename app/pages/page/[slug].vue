<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">

    <ClientOnly fallback-tag="div">
      <UContainer class="py-12">
        <!-- Error State -->
        <div v-if="error" class="text-center py-16">
          <UIcon name="i-heroicons-exclamation-triangle" class="text-4xl text-red-500 mb-4" />
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Page Not Found</h1>
          <p class="text-gray-600 dark:text-gray-400 mb-6">{{ error }}</p>
          <UButton to="/" color="primary">Back to Home</UButton>
        </div>

        <!-- Loading State -->
        <div v-else-if="loading" class="space-y-4">
          <USkeleton class="h-10 w-64" />
          <USkeleton class="h-6 w-full" />
          <USkeleton class="h-6 w-full" />
          <USkeleton class="h-6 w-3/4" />
        </div>

        <!-- Page Content -->
        <div v-else-if="page">
          <!-- Page Title -->
          <div class="mb-8">
            <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">{{ page.title }}</h1>
            <div class="h-1 w-16 rounded" style="background-color: #46B989;" />
          </div>

          <!-- Page Content -->
          <div class="page-content text-gray-700 dark:text-gray-300">
            <div
              v-for="(block, index) in page.content"
              :key="index"
            >
              <!-- Hero Section -->
              <template v-if="block.type === 'hero'">
                <div
                  class="relative mb-12 rounded-lg overflow-hidden h-96"
                  :style="{ backgroundImage: `url(${block.data.background_image_url})` }"
                >
                  <!-- Hero overlay -->
                  <div class="absolute inset-0 bg-black/40" />

                  <!-- Hero content -->
                  <div class="relative h-full flex items-center" :class="{ 'justify-start pl-12': block.data.alignment === 'left', 'justify-end pr-12': block.data.alignment === 'right', 'justify-center': block.data.alignment === 'center' }">
                    <div class="text-white max-w-2xl" :class="{ 'text-left': block.data.alignment === 'left', 'text-right': block.data.alignment === 'right', 'text-center': block.data.alignment === 'center' }">
                      <h2 class="text-4xl font-bold mb-3">{{ block.data.title }}</h2>
                      <p class="text-xl mb-6 text-gray-100">{{ block.data.subtitle }}</p>
                      <UButton
                        v-if="block.data.cta_text"
                        :to="block.data.cta_link || undefined"
                        class="bg-white text-gray-900 hover:bg-gray-100"
                      >
                        {{ block.data.cta_text }}
                      </UButton>
                    </div>
                  </div>
                </div>
              </template>

              <!-- Rich Text Content -->
              <template v-else-if="block.type === 'rich_text'">
                <div
                  class="prose prose-invert max-w-none mb-8 leading-relaxed"
                  v-html="sanitizeHtml(block.data.content)"
                />
              </template>

              <!-- Image Content -->
              <template v-else-if="block.type === 'image'">
                <div class="my-8">
                  <NuxtImg
                    :src="block.data.image_url"
                    :alt="block.data.alt || 'Content image'"
                    class="w-full rounded-lg"
                    sizes="sm:100vw md:80vw lg:70vw"
                  />
                  <p v-if="block.data.caption" class="text-sm text-gray-600 dark:text-gray-400 mt-3">
                    {{ block.data.caption }}
                  </p>
                </div>
              </template>

              <!-- Video Content -->
              <template v-else-if="block.type === 'video'">
                <div class="my-8">
                  <div class="relative w-full overflow-hidden rounded-lg" style="aspect-ratio: 16 / 9;">
                    <iframe
                      :src="getYoutubeEmbedUrl(block.data.video_url)"
                      class="absolute top-0 left-0 w-full h-full"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    />
                  </div>
                  <p v-if="block.data.caption" class="text-sm text-gray-600 dark:text-gray-400 mt-3">
                    {{ block.data.caption }}
                  </p>
                </div>
              </template>

              <!-- Heading Content -->
              <template v-else-if="block.type === 'heading'">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  {{ block.data.text }}
                </h2>
              </template>

              <!-- List Content -->
              <template v-else-if="block.type === 'list'">
                <ul v-if="block.data.style === 'unordered'" class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-8">
                  <li v-for="(item, i) in block.data.items" :key="i">{{ item }}</li>
                </ul>
                <ol v-else class="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-8">
                  <li v-for="(item, i) in block.data.items" :key="i">{{ item }}</li>
                </ol>
              </template>
            </div>
          </div>

          <!-- Back to Home -->
          <div class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <UButton to="/">← Back to Home</UButton>
          </div>
        </div>
      </UContainer>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const page = ref<any>(null)
const loading = ref(false)
const error = ref<string | null>(null)

// Sanitize HTML to prevent XSS (using DOMPurify if available)
const sanitizeHtml = (html: string) => {
  if (!process.client) return html

  // Try to use DOMPurify if available
  try {
    const DOMPurify = require('dompurify')
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        'p', 'br', 'strong', 'b', 'em', 'i', 'u',
        'h2', 'h3', 'h4', 'h5', 'h6',
        'ul', 'ol', 'li',
        'a', 'img',
        'blockquote',
        'code', 'pre'
      ],
      ALLOWED_ATTR: ['href', 'target', 'rel', 'src', 'alt', 'class']
    })
  } catch {
    // Fallback: just return the HTML as-is (content is from trusted backend)
    // For production, install dompurify: npm install dompurify
    return html
  }
}

// Convert YouTube URL to embed URL
const getYoutubeEmbedUrl = (url: string) => {
  if (!url) return ''

  // Handle different YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?\s]+)/
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`
    }
  }

  // If already an embed URL, return as-is
  if (url.includes('youtube.com/embed/')) {
    return url
  }

  return ''
}

// Fetch page content
const fetchPage = async () => {
  const slug = route.params.slug as string

  loading.value = true
  error.value = null

  try {
    const response = await $fetch<{
      data: any
      status: boolean
      message: string
    }>(`/api/pages/${slug}`)

    if (!response.data) {
      error.value = 'Page not found'
      return
    }

    page.value = response.data

    // Check if page is active
    if (!page.value.is_active) {
      error.value = 'This page is not available'
      page.value = null
      return
    }
  } catch (err: any) {
    error.value = err.data?.message || 'Failed to load page'
    console.error('Error fetching page:', err)
  } finally {
    loading.value = false
  }
}

// Initialize on mount
onMounted(async () => {
  await fetchPage()
})

// Watch for slug changes
watch(() => route.params.slug, async () => {
  page.value = null
  await fetchPage()
})

// SEO
const pageTitle = computed(() => page.value?.title || 'Page')
const pageDesc  = computed(() =>
    page.value?.description
        ? `${page.value.title} - ${page.value.description}`
        : `${pageTitle.value} - Learn more`
)
useSeoMeta({
  title: () => pageTitle.value,
  description: () =>  `${pageTitle.value} - ${pageDesc.value || 'Learn more'}`,

})
</script>

<style>
/* Page content styling */

/* Links */
:global(.page-content) a {
  color: #46B989;
  text-decoration: none;
}

:global(.page-content) a:hover {
  text-decoration: underline;
}

/* Headings */
:global(.page-content) h2 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

:global(.page-content) h3 {
  font-size: 1.25rem;
  font-weight: bold;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

:global(.page-content) h4 {
  font-size: 1.125rem;
  font-weight: bold;
  margin-top: 1.25rem;
  margin-bottom: 0.625rem;
}

/* Paragraphs */
:global(.page-content) p {
  margin-bottom: 1rem;
  line-height: 1.625;
}

/* Lists */
:global(.page-content) ul,
:global(.page-content) ol {
  margin-bottom: 1rem;
  margin-left: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

:global(.page-content) li {
  line-height: 1.625;
}

/* Blockquotes */
:global(.page-content) blockquote {
  border-left: 4px solid #46B989;
  padding-left: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-style: italic;
  margin: 1rem 0;
}

/* Code blocks */
:global(.page-content) code {
  background-color: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-family: monospace;
}

:global(.page-content) pre {
  background-color: #111827;
  color: #f3f4f6;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

/* Images */
:global(.page-content) img {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
}

/* Hero section adjustments */
:global(.page-content) .hero-section {
  margin-bottom: 2rem;
}

/* Spacing for content blocks */
:global(.page-content) > div {
  margin-bottom: 1.5rem;
}
</style>
