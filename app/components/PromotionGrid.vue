<template>
  <div>
    <!-- Loading state for entire carousel -->
    <!-- Carousel with data -->
    <UCarousel
        v-if="promoItems.length > 0"
        v-slot="{ item }"
        loop
        wheel-gestures
        align="start"
        :items="promoItems"
        :ui="{
        viewport: 'px-2 sm:px-4 lg:px-6',
        container: 'ms-0 items-stretch gap-2 sm:gap-3',
        item: '!ps-0 basis-[60%] sm:basis-[60%] md:basis-[40%] lg:basis-[calc((100%-6rem)/5)] h-full',

      }"
    >
      <NuxtLink to="/categories/kids">
        <UCard :ui="{ root: 'rounded-none mb-2', header: 'p-0 sm:px-0', body:'p-2 sm:p-3' }">
          <template #header>
            <div class="relative w-full aspect-[380/288] bg-gray-100">
              <!-- Actual image -->
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
    </UCarousel>
  </div>
</template>

<script setup lang="ts">
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
