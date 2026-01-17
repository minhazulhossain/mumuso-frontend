<template>
  <div>
    <div v-if="loading" class="space-y-4">
      <USkeleton class="h-48 w-full" />
    </div>

    <ClientOnly v-else-if="categories && categories.length > 0">
      <Swiper
          :modules="[Pagination]"
          :slides-per-view="4"
          :space-between="12"
          :loop="categories.length > 8"
          :pagination="{ clickable: true }"
          :breakpoints="{
            768: { slidesPerView: 6, spaceBetween: 16 },
            1024: { slidesPerView: 8, spaceBetween: 20 }
          }"
          class="categories-carousel px-2 sm:px-4"
      >
        <SwiperSlide v-for="item in categories" :key="item.id">
          <NuxtLink :to="`/categories/${item.slug}`" class="group">
            <UCard variant="soft" :ui="{ root: 'bg-transparent ring-0', header: 'p-0 sm:px-0 border-0', body:'p-0 sm:p-0 text-center' }" >
              <template #header>
                <div class="relative w-full aspect-[50/50] rounded-full transition-transform duration-300 group-hover:scale-105">
                  <NuxtImg
                      :src="item?.image ? item.image?.original : ''"
                      :class="[
                    'transition-all w-12 md:w-16 duration-300 absolute top-[50%] left-[50%] translate-[-50%] group-hover:drop-shadow',
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
              <p class="mb-0 text-sm leading-4 truncate transition-colors group-hover:text-primary-600">{{ item?.name }}</p>
            </UCard>
          </NuxtLink>
        </SwiperSlide>
      </Swiper>
      <template #fallback>
        <div class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 px-2 sm:px-4">
          <div v-for="i in 8" :key="i" class="flex flex-col items-center text-center">
            <div class="w-12 h-12 bg-gray-100 dark:bg-gray-900 rounded-full mb-2">
              <USkeleton class="w-full h-full rounded-full" />
            </div>
            <USkeleton class="h-3 w-14" />
          </div>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'

const { fetchFeaturedCategories } = useContent()
const { data: categories, pending: loading } = await fetchFeaturedCategories()

const loadedImages = ref<Record<string, boolean>>({})

const handleImageLoad = (src: string) => {
  loadedImages.value[src] = true
}

</script>
