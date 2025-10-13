<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm p-4 flex gap-4">
    <!-- Image Skeleton -->
    <div class="w-24 h-24 flex-shrink-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent dark:via-gray-500 opacity-20 animate-shimmer"/>
    </div>

    <!-- Content Skeleton -->
    <div class="flex-1 space-y-3">
      <!-- Title -->
      <div class="space-y-2">
        <div class="h-4 w-3/4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse"/>
      </div>

      <!-- Description -->
      <div class="space-y-2">
        <div class="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse"/>
        <div class="h-3 w-5/6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse"/>
      </div>

      <!-- Meta Info -->
      <div class="flex gap-4 pt-2">
        <div class="h-3 w-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse"/>
        <div class="h-3 w-24 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse"/>
      </div>
    </div>

    <!-- Actions Skeleton -->
    <div class="flex flex-col gap-2 justify-center">
      <div class="h-9 w-24 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse"/>
      <div class="h-8 w-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse"/>
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