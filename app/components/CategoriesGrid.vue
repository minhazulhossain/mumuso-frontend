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
        item: 'basis-[21%] md:basis-1/8 lg:basis-1/8',
        dot: 'w-10 h-2 data-[state=active]:bg-success-600 data-[state=active]:w-20'
      }"
    >
      <UCard variant="soft" :ui="{ root: 'bg-transparent ring-0', header: 'p-0 sm:px-0 border-0', body:'p-0 text-center' }" >
        <template #header>
          <div class="relative w-full aspect-[300/300] rounded-full bg-gray-100">
            <!-- Actual image -->
            <NuxtImg
                :src="item.img"
                :class="[
                'transition-opacity w-12 md:w-16 duration-300 absolute top-[50%] left-[50%] translate-[-50%]',
              ]"
                @load="handleImageLoad(item.img)"
                :alt="item.name"
                width="64"
                height="64"
                loading="lazy"
                format="webp"
            />
          </div>
        </template>
        <p class="mb-0 text-sm">{{ item.name }}</p>
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
    img: '/icons/1.png',
    name: 'Beauty'
  },
  {
    id: 2,
    slug:'beauty',
    img: '/icons/2.png',
    name: 'Skin Care'
  },
  {
    id: 3,
    slug:'beauty',
    img: '/icons/1.png',
    name: 'Eye Care'
  },
  {
    id: 4,
    slug:'beauty',
    img: '/icons/2.png',
    name: 'Hair Care'
  },
  {
    id: 5,
    slug:'beauty',
    img: '/icons/1.png',
    name: 'Craft '
  },
  {
    id: 6,
    slug:'beauty',
    img: '/icons/1.png',
    name: 'Eye Care'
  },
  {
    id: 7,
    slug:'beauty',
    img: '/icons/2.png',
    name: 'Hair Care'
  },
  {
    id: 8,
    slug:'beauty',
    img: '/icons/1.png',
    name: 'Craft '
  },
  {
    id: 9,
    slug:'beauty',
    img: '/icons/1.png',
    name: 'Eye Care'
  },
  {
    id: 10,
    slug:'beauty',
    img: '/icons/2.png',
    name: 'Hair Care'
  },
  {
    id: 11,
    slug:'beauty',
    img: '/icons/1.png',
    name: 'Craft '
  },
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