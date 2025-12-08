<template>
  <ShopLayoutPage
    :title="categoryTitle"
    :sub-title="`Browse our ${categoryTitle} collection`"
    :hide-category-filter="true"
    :initial-category="route.params.category as string"
  />
</template>

<script setup lang="ts">
const route = useRoute()

const categoryTitle = computed(() => {
  const category = route.params.category as string
  return category.charAt(0).toUpperCase() + category.slice(1)
})

useHead({
  title: `${categoryTitle.value} - Shop`,
  meta: [
    { name: 'description', content: `Browse our ${categoryTitle.value} products` }
  ]
})
</script>