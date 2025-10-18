<template>
  <div class="border-t border-gray-200">
    <UContainer>
      <div class="flex">
        <UNavigationMenu :items="items" class="w-full justify-center hidden md:inline-flex" :ui="{ list: 'gap-x-5', link: 'uppercase tracking-wide' }"/>
        <CartSidebar/>
      </div>
    </UContainer>
  </div>
</template>
<script setup lang="ts">

const { fetchCategories } = useContent()

const [items ] = await Promise.all([
  fetchCategories(),
])

</script>