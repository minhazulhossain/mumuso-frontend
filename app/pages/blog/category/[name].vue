<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Category Header -->
    <div class="bg-primary-600 text-white py-16">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-bold mb-2">{{ categoryName }}</h1>
        <p class="text-lg opacity-90">{{ total }} articles in this category</p>
      </div>
    </div>

    <div class="container mx-auto px-4 py-12">
      <!-- Loading State -->
      <div v-if="pending" class="flex justify-center py-20">
        <UIcon name="i-heroicons-arrow-path" class="animate-spin text-4xl text-primary-500" />
      </div>

      <!-- Posts Grid -->
      <div v-else-if="posts.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <UCard
          v-for="post in posts"
          :key="post.slug"
          class="hover:shadow-xl transition-shadow cursor-pointer"
          @click="navigateTo(`/blog/${post.slug}`)"
        >
          <template #header>
            <img
              v-if="post.image_url"
              :src="post.image_url"
              :alt="post.title"
              class="w-full h-48 object-cover"
            />
          </template>

          <div class="space-y-3">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white line-clamp-2">
              {{ post.title }}
            </h3>

            <p class="text-gray-600 dark:text-gray-400 line-clamp-3">
              {{ post.short_description }}
            </p>

            <div class="flex items-center gap-1 text-sm text-gray-500 pt-4 border-t border-gray-200 dark:border-gray-700">
              <UIcon name="i-heroicons-calendar" />
              {{ formatDate(post.created_at) }}
            </div>
          </div>
        </UCard>
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
const route = useRoute()
const { fetchPosts } = useBlogAPI()

const categoryName = computed(() => route.params.name as string)
const currentPage = ref(1)

const { data, pending } = await useAsyncData(
  `category-${categoryName.value}`,
  () => fetchPosts(categoryName.value, currentPage.value),
  { watch: [currentPage] }
)

const posts = computed(() => data.value?.posts || [])
const total = computed(() => data.value?.total || 0)
const totalPages = computed(() => data.value?.totalPages || 1)

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

useHead({
  title: () => `${categoryName.value} | Tech Blog`,
  meta: [
    { name: 'description', content: () => `Browse all ${categoryName.value} articles` }
  ]
})
</script>
