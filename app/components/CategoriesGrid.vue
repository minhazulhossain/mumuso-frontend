<template>
  <div>
    <!-- Loading state for entire carousel -->
    <div v-if="loading" class="space-y-4">
      <USkeleton class="h-48 w-full" />
    </div>

    <!-- Carousel with data -->
    <UCarousel
        v-else
        v-slot="{ item }"
        loop
        dots
        :slides-to-scroll="3"
        :items="categories"
        :ui="{
        item: 'basis-[29%] md:basis-1/8 lg:basis-1/8',
        dot: 'w-10 h-2 data-[state=active]:bg-success-600 data-[state=active]:w-20'
      }"
    >
      <NuxtLink :to="`/categories/${item?.slug}`">
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
          <p class="mb-0 text-sm leading-none">{{ item?.name }}</p>
        </UCard>
      </NuxtLink>
    </UCarousel>
  </div>
</template>

<script setup lang="ts">

const { fetchFeaturedCategories } = useContent()
const { data: categories, pending } = await fetchFeaturedCategories()

const loading = ref(false)

const loadedImages = ref<Record<string, boolean>>({})

const handleImageLoad = (src: string) => {
  loadedImages.value[src] = true
}

</script>