<template>
  <USlideover side="left" title="Product Categories" :ui="{ content: 'w-4/6' }">
    <UButton color="neutral" variant="ghost" icon="i-heroicons-bars-3" />

    <template #body>
      <UNavigationMenu orientation="vertical" :items="items" />
    </template>
  </USlideover>
</template>
<script setup lang="ts">

defineProps({
  items: Array
})

</script>