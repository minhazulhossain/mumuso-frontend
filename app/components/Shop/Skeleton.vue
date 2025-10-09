<template>
    <div :class="type === 'flex' ? 'flex' : 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3'" class="gap-6">
      <div class="" v-for="n in count" :key="n">
        <div class="grid gap-2 border rounded-sm border-gray-200 bg-white">
          <div class="p-0 border-b border-gray-200">
            <USkeleton class="h-32 w-full bg-gray-300 animate-pulse" />
          </div>
          <div class="p-4 border-b border-gray-200">
            <USkeleton class="h-6 mb-2 w-[200px]" />
            <USkeleton class="h-3 mb-2 w-[50px]" />
            <div class="flex justify-between items-center">

              <USkeleton class="h-7 w-[100px]" />

              <USkeleton class="h-3 w-[30px]" />

            </div>
          </div>
          <div class="p-4">
            <div class="flex justify-between items-center">

              <USkeleton class="h-7 w-[78%]" />

              <USkeleton class="h-7 w-[20%]" />

            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
  defineProps<{
    count ?: number
    type ?: string
  }>()
</script>