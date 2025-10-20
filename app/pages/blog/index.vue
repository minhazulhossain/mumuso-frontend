<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-success-600 to-primary-800 text-white py-20">
      <div class="container mx-auto px-4">
        <h1 class="text-5xl font-bold mb-4"> Blog</h1>
        <p class="text-xl opacity-90">Exploring the latest in web development and technology</p>
      </div>
    </div>

    <div class="container mx-auto px-4 py-12">
      <!-- Search Bar -->
      <div class="mb-8">
        <UInput
            v-model="searchQuery"
            icon="i-heroicons-magnifying-glass"
            size="xl"
            placeholder="Search articles..."
            @input="handleSearch"
        />
      </div>

      <!-- Category Filter -->
      <div class="mb-8">
        <div class="flex gap-3 flex-wrap">
          <UButton
              :variant="selectedCategory === null ? 'solid' : 'outline'"
              color="primary"
              @click="filterByCategory(null)"
          >
            All Posts
          </UButton>
          <UButton
              v-for="cat in categories"
              :key="cat.name"
              :variant="selectedCategory === cat.name ? 'solid' : 'outline'"
              color="primary"
              @click="filterByCategory(cat.name)"
          >
            {{ cat.name }} ({{ cat.count }})
          </UButton>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="flex justify-center py-20">
        <UIcon name="i-heroicons-arrow-path" class="animate-spin text-4xl text-primary-500" />
      </div>

      <!-- Posts Grid -->
      <div v-else-if="posts.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <UCard
            v-for="post in posts"
            :key="post.id"
            class="hover:shadow-xl transition-shadow cursor-pointer"
            @click="navigateTo(`/blog/${post.slug}`)"
            :ui="{ header: 'p-0 px-0 sm:px-0' }"
        >
          <template #header class="p-0">
            <img
                :src="post?.image_url"
                :alt="post.title"
                class="w-full h-110 object-cover"
            />
          </template>

          <div class="space-y-3">
            <UBadge color="primary" variant="subtle">
              {{ post.category }}
            </UBadge>

            <h3 class="text-xl font-bold text-gray-900 dark:text-white line-clamp-2">
              {{ post.title }}
            </h3>

            <p class="text-gray-600 dark:text-gray-400 line-clamp-3">
              {{ post.excerpt }}
            </p>

            <div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div class="flex items-center gap-2">
<!--                <UAvatar :src="post.author.avatar" size="xs" />-->
<!--                <span class="text-sm text-gray-600 dark:text-gray-400">{{ post.author.name }}</span>-->
              </div>
              <div class="flex items-center gap-1 text-sm text-gray-500">
                <UIcon name="i-heroicons-clock" />
                {{ post.readTime }} min
              </div>
            </div>
          </div>
        </UCard>
      </div>

      <!-- No Results -->
      <div v-else class="text-center py-20">
        <UIcon name="i-heroicons-document-text" class="text-6xl text-gray-400 mb-4" />
        <p class="text-xl text-gray-600 dark:text-gray-400">
          {{ searchQuery ? `No results found for "${searchQuery}"` : 'No posts found' }}
        </p>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex justify-center">
        <UPagination
            v-model="currentPage"
            :page-count="9"
            :total="total"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { fetchPosts, fetchCategories } = useBlogAPI()

const searchQuery = ref('')
const selectedCategory = ref<string | null>(null)
const currentPage = ref(1)

const { data: categoriesData } = await useAsyncData('categories', () => fetchCategories())
const categories = computed(() => categoriesData.value || [])

const { data, pending, refresh } = await useAsyncData(
    'posts',
    () => fetchPosts(
        selectedCategory.value || undefined,
        currentPage.value,
        searchQuery.value || undefined
    ),
    {
      watch: [currentPage, selectedCategory]
    }
)

const posts = computed(() => data.value?.posts || [])
const total = computed(() => data.value?.total || 0)
const totalPages = computed(() => data.value?.totalPages || 1)

const filterByCategory = (category: string | null) => {
  selectedCategory.value = category
  currentPage.value = 1
  searchQuery.value = '' // Clear search when filtering by category
}

let searchTimeout: NodeJS.Timeout
const handleSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    currentPage.value = 1 // Reset to first page on search
    refresh()
  }, 500)
}

useHead({
  title: 'Home | Blog',
  meta: [
    { name: 'description', content: 'Explore the latest articles on web development and technology' }
  ]
})
</script>