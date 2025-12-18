<template>
  <div>
    <!-- Loading state for entire carousel -->
    <div v-if="loading" class="space-y-4">
      <USkeleton class="h-48 w-full" />
    </div>

    <!-- Carousel with data -->
    <UCarousel
        v-else-if="categories && categories.length > 0"
        v-slot="{ item }"
        loop
        :slides-to-scroll="slidesToScroll"
        :items="categories"
        :ui="{
        item: itemBasis,
        dot: 'w-10 h-2 data-[state=active]:bg-success-600 data-[state=active]:w-20'
      }"
    >
      <NuxtLink :to="`/categories/${item.slug}`">
        <UCard variant="soft" :ui="{ root: 'bg-transparent ring-0', header: 'p-0 sm:px-0 border-0', body:'p-0 sm:p-0 text-center' }" >
          <template #header>
            <div class="relative w-full aspect-[50/50] rounded-full">
              <!-- Actual image -->
              <NuxtImg
                  :src="item?.image ? item.image?.original : ''"
                  :class="[
                'transition-opacity w-12 md:w-16 duration-300 absolute top-[50%] left-[50%] translate-[-50%]',
              ]"
                  @load="handleImageLoad(item?.image ? item.image?.original : '')"
                  :alt="item?.name"
                  width="64"
                  height="64"
                  loading="lazy"
                  format="webp"
              />
            </div>
          </template>
          <p class="mb-0 text-sm leading-none truncate">{{ item?.name }}</p>
        </UCard>
      </NuxtLink>
    </UCarousel>
  </div>
</template>

<script setup lang="ts">

const { fetchFeaturedCategories } = useContent()
const { data: categories, pending: loading } = await fetchFeaturedCategories()

const isMobile = ref(false)
const isTablet = ref(false)

const loadedImages = ref<Record<string, boolean>>({})

const handleImageLoad = (src: string) => {
  loadedImages.value[src] = true
}

// Responsive carousel settings
const slidesToScroll = computed(() => {
  if (isMobile.value) return 4
  if (isTablet.value) return 6
  return 8
})

const itemBasis = computed(() => {
  if (isMobile.value) return 'basis-1/4'
  if (isTablet.value) return 'basis-1/6'
  return 'basis-1/8'
})

// Mobile/tablet detection
onMounted(() => {
  const updateBreakpoint = () => {
    const width = window.innerWidth
    isMobile.value = width < 768
    isTablet.value = width >= 768 && width < 1024
  }

  updateBreakpoint()
  window.addEventListener('resize', updateBreakpoint)

  onUnmounted(() => {
    window.removeEventListener('resize', updateBreakpoint)
  })
})

</script>