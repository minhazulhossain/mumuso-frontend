<template>
  <div class="hidden md:block border-t border-gray-200">
    <UContainer>
      <div class="flex">
        <UNavigationMenu
          :items="desktopItems"
          class="w-full justify-center hidden md:inline-flex"
          :ui="{ list: 'gap-x-5', link: 'uppercase tracking-wide' }"
        />
        <CartSidebar/>
      </div>
    </UContainer>
  </div>
</template>
<script setup lang="ts">

const props = defineProps<{
  items?: Array<any>
}>()

const MAX_VISIBLE_ITEMS = 7

const desktopItems = computed(() => {
  const items = Array.isArray(props.items) ? props.items : []
  if (items.length <= MAX_VISIBLE_ITEMS) return items

  const visibleItems = items.slice(0, MAX_VISIBLE_ITEMS)
  const overflowItems = items.slice(MAX_VISIBLE_ITEMS)

  return [
    ...visibleItems,
    {
      label: 'More',
      children: overflowItems
    }
  ]
})

</script>
