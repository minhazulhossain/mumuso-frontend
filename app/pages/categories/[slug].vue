<template>
  <ShopLayoutPage :title="category?.name"
                  :hide-category-filter="true"
                  :sub-title="category?.description" :loading-content="pending"/>
</template>
<script setup lang="ts">

const {fetchCategory} = useContent()
const route = useRoute()

onMounted(async () => {
  await fetchCategory(route.params.slug as string)
})


const {data: category, pending} = await fetchCategory(route.params.slug as string)

</script>