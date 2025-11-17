<template>
  <div>
    <!-- Hero Section -->
    <section
        class="relative overflow-hidden bg-gradient-to-br from-white via-primary-50 to-primary-100 dark:from-gray-950 dark:via-primary-950 dark:to-gray-900"
    >
      <HeroSlider
          v-if="heroBanners"
          :banners="heroBanners"
          :autoplay="true"
          :loading="pending"
      />
    </section>

    <!-- Categories Section -->
    <section
        ref="categoriesSection"
        class="py-4 sm:py-8 md:py-12 lg:py-16 bg-white dark:bg-gray-950 transition-all duration-1000"
        :class="sectionStates.categories"
    >
      <UContainer>
        <CategoriesGrid />
      </UContainer>
    </section>

    <!-- Promotions Section -->
    <section
        ref="promotionsSection"
        class="py-6 sm:py-10 md:py-14 lg:py-16 bg-gray-50 dark:bg-gray-900 transition-all duration-1000"
        :class="sectionStates.promotions"
    >
      <UContainer>
        <PromotionGrid />
      </UContainer>
    </section>

    <!-- Best Selling Section -->
    <section
        ref="bestSellingSection"
        class="py-6 sm:py-10 md:py-14 lg:py-16 bg-white dark:bg-gray-950 transition-all duration-1000"
        :class="sectionStates.bestSelling"
    >
      <UContainer>
        <ProductCarousel
            title="Best Selling"
            :items="products"
            :loading="loading"
        />
      </UContainer>
    </section>

    <!-- New Arrivals Section -->
    <section
        ref="newArrivalsSection"
        class="py-6 sm:py-10 md:py-14 lg:py-16 bg-success-500 dark:bg-success-600 transition-all duration-1000"
        :class="sectionStates.newArrivals"
    >
      <UContainer>
        <ProductCarousel
            title="New Arrivals"
            :items="products"
            :loading="loading"
        />
      </UContainer>
    </section>

    <!-- Banners Section -->
    <section
        ref="bannersSection"
        class="py-6 sm:py-10 md:py-14 lg:py-16 bg-white dark:bg-gray-950 transition-all duration-1000"
        :class="sectionStates.banners"
    >
      <UContainer>
        <BannersGrid />
      </UContainer>
    </section>

    <!-- Trending Section -->
    <section
        ref="trendingSection"
        class="py-6 sm:py-10 md:py-14 lg:py-16 bg-gray-50 dark:bg-gray-900 transition-all duration-1000"
        :class="sectionStates.trending"
    >
      <UContainer>
        <ProductCarousel
            title="Trending"
            :items="products"
            :loading="loading"
        />
      </UContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
const { fetchHeroBanners } = useContent()
const { data: heroBanners, pending } = await fetchHeroBanners()

const { products, loading, fetchProducts } = useProducts()

// Section references
const categoriesSection = ref(null)
const promotionsSection = ref(null)
const bestSellingSection = ref(null)
const newArrivalsSection = ref(null)
const bannersSection = ref(null)
const trendingSection = ref(null)

// Section animation states
const sectionStates = ref({
  categories: '',
  promotions: '',
  bestSelling: '',
  newArrivals: '',
  banners: '',
  trending: ''
})

// Intersection Observer for scroll animations
const setupScrollAnimations = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add animation classes when section enters viewport
        const element = entry.target as HTMLElement
        const sectionKey = element.getAttribute('data-section')

        if (sectionKey) {
          sectionStates.value[sectionKey as keyof typeof sectionStates.value] = 'opacity-100 translate-y-0'
        }
      }
    })
  }, observerOptions)

  // Observe all section elements
  const sections = [
    { ref: categoriesSection, key: 'categories' },
    { ref: promotionsSection, key: 'promotions' },
    { ref: bestSellingSection, key: 'bestSelling' },
    { ref: newArrivalsSection, key: 'newArrivals' },
    { ref: bannersSection, key: 'banners' },
    { ref: trendingSection, key: 'trending' }
  ]

  sections.forEach(({ ref: sectionRef, key }) => {
    if (sectionRef.value) {
      sectionRef.value.setAttribute('data-section', key)
      observer.observe(sectionRef.value)
    }
  })

  onUnmounted(() => {
    observer.disconnect()
  })
}

onMounted(async () => {
  await fetchProducts()

  // Initialize section states with initial animation classes
  sectionStates.value = {
    categories: 'opacity-0 translate-y-8',
    promotions: 'opacity-0 translate-y-8',
    bestSelling: 'opacity-0 translate-y-8',
    newArrivals: 'opacity-0 translate-y-8',
    banners: 'opacity-0 translate-y-8',
    trending: 'opacity-0 translate-y-8'
  }

  setupScrollAnimations()
})
</script>
