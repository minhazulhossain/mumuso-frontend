<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div v-if="pending" class="flex justify-center items-center min-h-screen">
      <UIcon name="i-heroicons-arrow-path" class="animate-spin text-4xl text-primary-500" />
    </div>

    <article v-else-if="post" class="container mx-auto px-4 py-12 max-w-4xl">
      <!-- Back Button -->
      <UButton
        icon="i-heroicons-arrow-left"
        variant="ghost"
        class="mb-6"
        @click="navigateTo('/blog')"
      >
        Back to posts
      </UButton>

      <!-- Hero Image -->
      <img
        :src="post.image"
        :alt="post.title"
        class="w-full h-96 object-cover rounded-lg mb-8"
      />

      <!-- Article Header -->
      <header class="mb-8">
        <UBadge color="primary" variant="subtle" class="mb-4">
          {{ post.category }}
        </UBadge>
        
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {{ post.title }}
        </h1>

        <div class="flex items-center gap-6 text-gray-600 dark:text-gray-400">
          <div class="flex items-center gap-2">
            <UAvatar :src="post.author.avatar" size="sm" />
            <span>{{ post.author.name }}</span>
          </div>
          <div class="flex items-center gap-1">
            <UIcon name="i-heroicons-calendar" />
            <span>{{ formatDate(post.publishedAt) }}</span>
          </div>
          <div class="flex items-center gap-1">
            <UIcon name="i-heroicons-clock" />
            <span>{{ post.readTime }} min read</span>
          </div>
        </div>

        <!-- Tags -->
        <div class="flex gap-2 mt-4">
          <UBadge
            v-for="tag in post.tags"
            :key="tag"
            color="gray"
            variant="subtle"
          >
            #{{ tag }}
          </UBadge>
        </div>
      </header>

      <!-- Article Content -->
      <div
        class="prose prose-lg dark:prose-invert max-w-none mb-12"
        v-html="post.content"
      />

      <!-- Similar Posts -->
      <div class="border-t border-gray-200 dark:border-gray-700 pt-12">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Similar Posts
        </h2>
        
        <div v-if="similarPostsPending" class="flex justify-center py-10">
          <UIcon name="i-heroicons-arrow-path" class="animate-spin text-3xl text-primary-500" />
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UCard
            v-for="similarPost in similarPosts"
            :key="similarPost.id"
            class="hover:shadow-lg transition-shadow cursor-pointer"
            @click="navigateTo(`/blog/${similarPost.slug}`)"
          >
            <template #header>
              <img
                :src="similarPost.image"
                :alt="similarPost.title"
                class="w-full h-40 object-cover"
              />
            </template>

            <div class="space-y-2">
              <UBadge color="primary" variant="subtle">
                {{ similarPost.category }}
              </UBadge>
              
              <h3 class="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
                {{ similarPost.title }}
              </h3>
              
              <p class="text-gray-600 dark:text-gray-400 line-clamp-2 text-sm">
                {{ similarPost.excerpt }}
              </p>

              <div class="flex items-center gap-1 text-sm text-gray-500">
                <UIcon name="i-heroicons-clock" />
                {{ similarPost.readTime }} min
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { fetchPost, fetchPosts } = useBlogAPI()

const { data: post, pending } = await useAsyncData(
  `post-${route.params.slug}`,
  () => fetchPost(route.params.slug as string)
)

const { data: similarPostsData, pending: similarPostsPending } = await useAsyncData(
  `similar-${route.params.slug}`,
  () => fetchPosts(post.value?.category, 1, 4)
)

const similarPosts = computed(() => 
  similarPostsData.value?.posts.filter(p => p.id !== post.value?.id).slice(0, 2) || []
)

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

useHead({
  title: () => post.value ? `${post.value.title} | Tech Blog` : 'Loading...',
  meta: [
    { name: 'description', content: () => post.value?.excerpt || '' }
  ]
})
</script>