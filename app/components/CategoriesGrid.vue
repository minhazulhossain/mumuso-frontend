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
        item: 'basis-1/3 md:basis-1/4 lg:basis-1/6',
        dot: 'w-10 h-2 data-[state=active]:bg-success-600 data-[state=active]:w-20'
      }"
    >
      <UCard variant="soft" :ui="{ root: 'ring-0 shadow-sm', header: 'p-0 sm:px-0' }" >
        <template #header>
          <div class="relative w-full aspect-[380/288] bg-gray-100">
            <!-- Skeleton loader for individual images -->
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
      </UCard>
    </UCarousel>
  </div>
</template>

<script setup lang="ts">
interface Category {
  id: number
  slug: string
  img: string
  name: string,
}

// Fallback data for development
const fallbackCategories: Category[] = [
  {
    id: 1,
    slug:'beauty',
    img: 'https://picsum.photos/380/288?random=1',
    name: 'Beauty'
  },
  {
    id: 2,
    slug:'beauty',
    img: 'https://picsum.photos/380/288?random=2',
    name: 'Skin Care'
  },
  {
    id: 3,
    slug:'beauty',
    img: 'https://picsum.photos/380/288?random=3',
    name: 'Eye Care'
  },
  {
    id: 4,
    slug:'beauty',
    img: 'https://picsum.photos/380/288?random=4',
    name: 'Hair Care'
  },
  {
    id: 5,
    slug:'beauty',
    img: 'https://picsum.photos/380/288?random=5',
    name: 'Craft'
  },
  {
    id: 6,
    slug:'beauty',
    img: 'https://picsum.photos/380/288?random=6',
    name: 'Lip Care'
  },
  {
    id: 7,
    slug:'beauty',
    img: 'https://picsum.photos/380/288?random=7',
    name: 'Accessories'
  }
]

const loading = ref(false)
const categories = ref<Category[]>(fallbackCategories)
const loadedImages = ref<Record<string, boolean>>({})

// Fetch categories from API
const fetchCategories = async () => {
  loading.value = true
  try {
    // Replace with your actual API endpoint
    // const { data } = await useFetch<Category[]>('/api/categories')
    // categories.value = data.value || fallbackCategories

    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    categories.value = fallbackCategories
  } catch (error) {
    console.error('Error fetching categories:', error)
    // Keep fallback data on error
    categories.value = fallbackCategories
  } finally {
    loading.value = false
  }
}

const handleImageLoad = (src: string) => {
  loadedImages.value[src] = true
}

// Uncomment when API is ready
// onMounted(() => {
//   fetchCategories()
// })
</script>