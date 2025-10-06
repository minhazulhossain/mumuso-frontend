<template>
  <UNavigationMenu :items="items" class="w-full justify-center hidden md:inline-flex" :ui="{ list: 'gap-x-5', link: 'uppercase tracking-wide' }"/>
</template>
<script setup lang="ts">

const { fetchCategories } = useContent()

const [items ] = await Promise.all([
  fetchCategories(),
])

</script>