<template>
  <div>
    <!-- Loading state for entire carousel -->
    <div v-if="loading" class="space-y-4">
      <USkeleton class="h-64 w-full" />
    </div>

    <!-- Carousel with data -->
    <UCarousel
        v-else
        v-slot="{ item }"
        loop
        wheel-gestures
        :items="products"
        :ui="{
        item: 'basis-[40%]'
      }"
    >
      <UCard :ui="{ root: '', header: 'p-0 sm:px-0' }">
        <template #header>
          <div class="relative w-full aspect-[380/288] bg-gray-100">
            <!-- Skeleton loader -->
            <USkeleton
                v-if="!loadedImages[item.img]"
                class="w-full h-full absolute inset-0"
                :ui="{ background: 'bg-gray-200' }"
            />

            <!-- Actual image -->
            <img
                :src="item.img"
                :class="[
                'w-full h-full object-cover transition-opacity duration-300',
                loadedImages[item.img] ? 'opacity-100' : 'opacity-0'
              ]"
                @load="handleImageLoad(item.img)"
                :alt="item.name"
            >
          </div>
        </template>

        <p>{{ item.description }}</p>
      </UCard>
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
    img: 'https://picsum.photos/380/288?random=1',
    name: 'Mini Fan',
    description: 'Beat the heat in style with this adorably appealing Mini Fan from the house of MUMUSO.'
  },
  {
    id: 2,
    img: 'https://picsum.photos/380/288?random=2',
    name: 'Portable Fan',
    description: 'Beat the heat in style with this adorably appealing Mini Fan from the house of MUMUSO.'
  },
  {
    id: 3,
    img: 'https://picsum.photos/380/288?random=3',
    name: 'Desk Fan',
    description: 'Beat the heat in style with this adorably appealing Mini Fan from the house of MUMUSO.'
  },
  {
    id: 4,
    img: 'https://picsum.photos/380/288?random=4',
    name: 'USB Fan',
    description: 'Beat the heat in style with this adorably appealing Mini Fan from the house of MUMUSO.'
  },
  {
    id: 5,
    img: 'https://picsum.photos/380/288?random=5',
    name: 'Hand Fan',
    description: 'Beat the heat in style with this adorably appealing Mini Fan from the house of MUMUSO.'
  },
  {
    id: 6,
    img: 'https://picsum.photos/380/288?random=6',
    name: 'Clip Fan',
    description: 'Beat the heat in style with this adorably appealing Mini Fan from the house of MUMUSO.'
  }
]

const loading = ref(false)
const products = ref<Product[]>(fallbackProducts)
const loadedImages = ref<Record<string, boolean>>({})

// Fetch products from API
const fetchProducts = async () => {
  loading.value = true
  try {
    // Replace with your actual API endpoint
    // const { data } = await useFetch<Product[]>('/api/products/featured')
    // products.value = data.value || fallbackProducts

    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    products.value = fallbackProducts
  } catch (error) {
    console.error('Error fetching products:', error)
    // Keep fallback data on error
    products.value = fallbackProducts
  } finally {
    loading.value = false
  }
}

const handleImageLoad = (src: string) => {
  loadedImages.value[src] = true
}

// Uncomment when API is ready
// onMounted(() => {
//   fetchProducts()
// })
</script>