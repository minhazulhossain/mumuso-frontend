<template>
  <div>
    <!-- Loading state for entire carousel -->
    <div v-if="loading" class="space-y-4">
      <USkeleton class="h-64 w-full"/>
    </div>

    <!-- Carousel with data -->
    <UCarousel
        v-else-if="products && products.length > 0"
        v-slot="{ item }"
        loop
        wheel-gestures
        :items="products"
        :ui="{
        item: 'basis-[66%] sm:basis-[60%] md:basis-[40%] ps-0 sm:ps-2 pe-2 sm:pe-4',

      }"
    >
      <NuxtLink to="/categories/kids">
        <UCard :ui="{ root: 'rounded-none mb-2', header: 'p-0 sm:px-0', body:'p-2 sm:p-4' }">
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
  img: string
  name: string
  description: string
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

const loading = ref(false)
const products = ref<Product[]>(fallbackProducts)
const loadedImages = ref<Record<string, boolean>>({})

const handleImageLoad = (src: string) => {
  loadedImages.value[src] = true
}

// Fetch promotional products on mount
onMounted(async () => {
  loading.value = true
  try {
    const { data: fetchedProducts } = await useFetch<{data: Product[]}>('/api/products?featured=true&limit=6')
    products.value = fetchedProducts.value?.data || fallbackProducts
  } catch (error) {
    console.error('Error fetching promotional products:', error)
    products.value = fallbackProducts
  } finally {
    loading.value = false
  }
})
</script>