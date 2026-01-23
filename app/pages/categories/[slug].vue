<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div v-if="error" class="py-12">
      <UContainer>
        <div class="text-center">
          <UIcon name="i-heroicons-exclamation-triangle" class="text-4xl text-red-500 mb-3" />
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Category not available</h1>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            {{ error.message || 'Failed to load this category. Please try again.' }}
          </p>
          <div class="flex items-center justify-center gap-3">
            <UButton color="primary" @click="refresh">Try Again</UButton>
            <UButton variant="soft" to="/shop">Back to Shop</UButton>
          </div>
        </div>
      </UContainer>
    </div>

    <ShopLayoutPage
        v-else
        :title="category?.name || 'Category'"
        :hide-category-filter="true"
        :sub-title="category?.description || 'Browse products in this category'"
        :loading-content="pending"
    />
  </div>
</template>

<script setup lang="ts">
const { fetchCategory } = useContent()
const route = useRoute()

const { data: category, pending, error, refresh } = await fetchCategory(route.params.slug as string)
</script>
