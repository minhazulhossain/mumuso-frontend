<template>
  <div>
    <!-- Loading state for entire carousel -->
    <!-- Carousel with data -->
    <ClientOnly>
      <Swiper
          v-if="promoItems.length > 0"
          :modules="[Pagination]"
          :slides-per-view="1.4"
          :space-between="12"
          :loop="promoItems.length > 4"
          :pagination="{ clickable: true }"
          :breakpoints="{
            640: { slidesPerView: 2, spaceBetween: 10 },
            768: { slidesPerView: 3, spaceBetween: 10 },
          }"
          class="promotion-carousel px-2 sm:px-4 lg:px-6"
      >
        <SwiperSlide v-for="item in promoItems" :key="item.id">
          <NuxtLink to="/categories/kids">
            <UCard :ui="{ root: 'rounded-none mb-2', header: 'p-0 sm:px-0', body:'p-2 sm:p-3' }">
              <template #header>
                <div class="relative w-full aspect-[380/288] bg-gray-100">
                  <NuxtImg
                      :src="item.img"
                      :class="[
                    'w-full h-full object-cover transition-opacity duration-300',
                  ]"
                      :alt="item.name"
                      width="380"
                      height="288"
                      sizes="xs:60vw sm:40vw md:40vw"
                      loading="lazy"
                      format="webp"
                  />
                </div>
              </template>
              <p class="text-sm">{{ item.description }}</p>
            </UCard>
          </NuxtLink>
        </SwiperSlide>
      </Swiper>
      <template #fallback>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2 sm:px-4 lg:px-6">
          <div v-for="i in 4" :key="i" class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div class="relative w-full aspect-[380/288] bg-gray-100">
              <USkeleton class="w-full h-full absolute inset-0" />
            </div>
            <div class="p-3 space-y-2">
              <USkeleton class="h-4 w-3/4" />
              <USkeleton class="h-4 w-1/2" />
            </div>
          </div>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination } from 'swiper/modules'

interface Product {
  id: number
  img?: string
  name: string
  description?: string
  short_description?: string
  image?: string
  image_thumb?: string
}

// Fallback data for development
const fallbackProducts: Product[] = [
  {
    id: 1,
    img: '/promo/1.jpg',
    name: 'Mini Fan',
    description: 'Beat the heat in style with this adorably appealing Mini Fan from the house of MUMUSO.'
  },
  {
    id: 2,
    img: '/promo/2.jpg',
    name: 'Portable Fan',
    description: 'Beat the heat in style with this adorably appealing Mini Fan from the house of MUMUSO.'
  },
  {
    id: 3,
    img: '/promo/3.jpg',
    name: 'Desk Fan',
    description: 'Beat the heat in style with this adorably appealing Mini Fan from the house of MUMUSO.'
  },
  {
    id: 4,
    img: '/promo/1.jpg',
    name: 'USB Fan',
    description: 'Beat the heat in style with this adorably appealing Mini Fan from the house of MUMUSO.'
  },
  {
    id: 5,
    img: '/promo/2.jpg',
    name: 'Hand Fan',
    description: 'Beat the heat in style with this adorably appealing Mini Fan from the house of MUMUSO.'
  },
  {
    id: 6,
    img: '/promo/3.jpg',
    name: 'Clip Fan',
    description: 'Beat the heat in style with this adorably appealing Mini Fan from the house of MUMUSO.'
  }
]

const promoItems = computed(() => {
  return fallbackProducts.map((item) => ({
    id: item.id,
    name: item.name,
    img: item.img || '/promo/1.jpg',
    description: item.description || ''
  }))
})
</script>
