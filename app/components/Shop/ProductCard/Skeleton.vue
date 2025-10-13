<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
    <!-- Image Skeleton -->
    <div class="aspect-square bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent dark:via-gray-500 opacity-20 animate-shimmer"/>
    </div>

    <!-- Content Skeleton -->
    <div class="p-4 space-y-3">
      <!-- Category Badge -->
      <div class="flex gap-2">
        <div class="h-5 w-16 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-full animate-pulse"/>
        <div class="h-5 w-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-full animate-pulse"/>
      </div>

      <!-- Title -->
      <div class="space-y-2">
        <div class="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse"/>
        <div class="h-4 w-3/4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse"/>
      </div>

      <!-- Description -->
      <div class="space-y-2 pt-2">
        <div class="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse"/>
        <div class="h-3 w-5/6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse"/>
      </div>

      <!-- Price -->
      <div class="flex items-center gap-2 pt-2">
        <div class="h-6 w-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse"/>
        <div class="h-5 w-16 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded line-through animate-pulse"/>
      </div>

      <!-- Button -->
      <div class="pt-2">
        <div class="h-9 w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}
</style>