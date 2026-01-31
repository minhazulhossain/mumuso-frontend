<template>
  <div class="overflow-hidden bg-white dark:bg-gray-800 h-full flex flex-col">
    <!-- Image Skeleton -->
    <div class="relative w-full aspect-square bg-gray-100 dark:bg-gray-900 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse" />
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent dark:via-gray-500 opacity-20 animate-shimmer"/>
    </div>

    <!-- Content Skeleton -->
    <div class="p-3 space-y-2 flex-1 flex flex-col">
      <!-- Title (2 lines) -->
      <div class="space-y-2">
        <div class="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse"/>
        <div class="h-4 w-3/4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse"/>
      </div>

      <!-- Price -->
      <div class="mt-auto">
        <div class="flex items-baseline gap-2">
          <div class="h-5 w-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse"/>
          <div class="h-4 w-14 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse"/>
        </div>
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
