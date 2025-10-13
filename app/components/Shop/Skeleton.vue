<!-- ShopSkeleton.vue - Grid/List Loader -->
<template>
  <div>
    <!-- Grid Skeleton -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
      <ShopProductCardSkeleton v-for="i in count" :key="i" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  count?: number
}>()
</script>