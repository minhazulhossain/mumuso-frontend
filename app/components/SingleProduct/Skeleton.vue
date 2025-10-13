<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
    <!-- Image Skeleton -->
    <div class="space-y-4">
      <USkeleton class="aspect-square w-full rounded-lg"/>
      <div class="grid grid-cols-4 gap-2">
        <USkeleton v-for="i in 4" :key="i" class="aspect-square w-full rounded-lg"/>
      </div>
    </div>

    <!-- Details Skeleton -->
    <div class="space-y-6">
      <div class="flex items-center gap-2">
        <USkeleton class="h-6 w-20 rounded-full"/>
        <USkeleton class="h-6 w-16 rounded-full"/>
      </div>
      <div>
        <USkeleton class="h-10 w-3/4 mb-2"/>
        <USkeleton class="h-6 w-32"/>
      </div>
      <div class="flex items-baseline gap-4">
        <USkeleton class="h-12 w-32"/>
        <USkeleton class="h-8 w-24"/>
      </div>
      <USkeleton class="h-6 w-48"/>
      <div class="space-y-2">
        <USkeleton class="h-4 w-full"/>
        <USkeleton class="h-4 w-full"/>
        <USkeleton class="h-4 w-2/3"/>
      </div>
      <USkeleton class="h-32 w-full rounded-lg"/>
      <USkeleton class="h-12 w-32"/>
      <USkeleton class="h-14 w-full rounded-lg"/>
    </div>
  </div>
</template>