<template>
  <div>
    <!-- Hero Section -->
    <section
        class="relative overflow-hidden bg-gradient-to-br from-white via-primary-50 to-primary-100 dark:from-gray-950 dark:via-primary-950 dark:to-gray-900"
    >
      <HeroSlider
          :banners="heroBanners || []"
          :autoplay="true"
          :loading="homePending || heroFallbackPending"
      />
    </section>

    <!-- Categories Section -->
    <section
        ref="categoriesSection"
        class="py-6 sm:py-8 md:py-12 lg:py-16 bg-white dark:bg-gray-950"
    >
      <UContainer class="transition-all duration-1000" :class="sectionStates.categories">
        <CategoriesGrid />
      </UContainer>
    </section>

    <!-- Promotions Section -->
    <section
        ref="promotionsSection"
        class="py-6 sm:py-10 md:py-14 lg:py-16 bg-gray-50 dark:bg-gray-900"
    >
      <UContainer class="transition-all duration-1000" :class="sectionStates.promotions">
        <PromotionGrid />
      </UContainer>
    </section>

    <!-- Featured Grid Section -->
    <section
        ref="featuredGridSection"
        class="py-8 sm:py-10 md:py-14 lg:py-16 bg-primary-50"
    >
      <UContainer class="transition-all duration-1000" :class="sectionStates.featuredGrid">
        <div class="flex items-center justify-between mb-4 sm:mb-6">
          <h2 class="text-2xl font-medium text-gray-900">Featured Picks</h2>
          <UButton to="/shop?sort_by=featured" variant="ghost" color="primary" size="sm">
            View More
          </UButton>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          <div
              v-for="(item, index) in featuredProducts"
              :key="item.id"
              :class="index >= 6 ? 'hidden lg:block' : ''"
          >
            <ShopProductCard :product="item" />
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Best Selling Section -->
    <section
        ref="bestSellingSection"
        class="py-8 sm:py-10 md:py-14 lg:py-16 bg-white dark:bg-gray-950"
    >
      <UContainer class="transition-all duration-1000" :class="sectionStates.bestSelling">
        <ProductCarousel
            title="Best Selling"
            :items="bestSellingProducts"
            :loading="productsPending"
            :view-all-url="`/shop?best_selling=true`"
        />
      </UContainer>
    </section>

    <!-- New Arrivals Section -->
    <section
        ref="newArrivalsSection"
        class="py-6 sm:py-10 md:py-14 lg:py-16 bg-[#33b68f] dark:bg-success-600"
    >
      <UContainer class="transition-all duration-1000" :class="sectionStates.newArrivals">
        <ProductCarousel
            title="New Arrivals"
            :items="newArrivalProducts"
            :loading="productsPending"
            :view-all-url="`/shop?sort_by=newest`"
            title-class="text-white"
            link-class="text-white/90 hover:text-white"
        />
      </UContainer>
    </section>

    <!-- Banners Section -->
    <section
        ref="bannersSection"
        class="py-6 sm:py-10 md:py-14 lg:py-16 bg-white dark:bg-gray-950"
    >
      <UContainer class="transition-all duration-1000" :class="sectionStates.banners">
        <BannersGrid />
      </UContainer>
    </section>

    <!-- Trending Section -->
    <section
        ref="trendingSection"
        class="py-6 sm:py-10 md:py-14 lg:py-16 bg-gray-50 dark:bg-gray-900"
    >
      <UContainer class="transition-all duration-1000" :class="sectionStates.trending">
        <ProductCarousel
            title="Trending"
            :items="trendingProducts"
            :loading="productsPending"
            :view-all-url="`/shop?sort_by=best-selling`"
        />
      </UContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
const { fetchHome, fetchHeroBanners } = useContent()
const { data: homeSections, pending: homePending } = await fetchHome()
const { data: fallbackHeroBanners, pending: heroFallbackPending } = await fetchHeroBanners()

const sections = computed(() => homeSections.value || [])
const heroBanners = computed(() => {
  const heroSection = sections.value.find((section: any) =>
    ['hero_banners', 'hero_slider', 'hero_banner'].includes(String(section?.type || ''))
  )

  const sectionData = heroSection?.data
  if (Array.isArray(sectionData) && sectionData.length > 0) {
    return sectionData
  }

  const fallback = fallbackHeroBanners.value
  if (Array.isArray(fallback) && fallback.length > 0) {
    return fallback
  }

  return []
})

const HOME_PRODUCTS_LIMIT = 10
const findSectionData = (types: string[]) => {
  for (const type of types) {
    const data = sections.value.find((section: any) => section.type === type)?.data
    if (Array.isArray(data) && data.length > 0) {
      return data
    }
  }
  return []
}

const fetchHomeProducts = async (query: Record<string, string>) => {
  const response = await $fetch<{ data?: any[] }>('/api/products', {
    query: {
      page: '1',
      per_page: String(HOME_PRODUCTS_LIMIT),
      ...query
    }
  })
  return Array.isArray(response?.data) ? response.data : []
}

const { data: homeProductData, pending: productsPending } = await useAsyncData('home-products-sections', async () => {
  const [featuredFallback, bestSelling, newest, trending] = await Promise.all([
    fetchHomeProducts({ featured: 'true', sort_by: 'featured' }),
    fetchHomeProducts({ best_selling: 'true', top: String(HOME_PRODUCTS_LIMIT), sort_by: 'best-selling' }),
    fetchHomeProducts({ sort_by: 'newest' }),
    fetchHomeProducts({ sort_by: 'best-selling' })
  ])

  return { featuredFallback, bestSelling, newest, trending }
})

// Section references
const categoriesSection = ref(null)
const promotionsSection = ref(null)
const bestSellingSection = ref(null)
const newArrivalsSection = ref(null)
const bannersSection = ref(null)
const trendingSection = ref(null)
const featuredGridSection = ref(null)

// Section animation states
const sectionStates = ref({
  categories: '',
  promotions: '',
  featuredGrid: '',
  bestSelling: '',
  newArrivals: '',
  banners: '',
  trending: ''
})

// Ref for observer instance
let observer: IntersectionObserver | null = null

// Intersection Observer for scroll animations
const setupScrollAnimations = () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  observer = new IntersectionObserver((entries) => {
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
    { ref: featuredGridSection, key: 'featuredGrid' },
    { ref: bestSellingSection, key: 'bestSelling' },
    { ref: newArrivalsSection, key: 'newArrivals' },
    { ref: bannersSection, key: 'banners' },
    { ref: trendingSection, key: 'trending' }
  ]

  sections.forEach(({ ref: sectionRef, key }) => {
    if (sectionRef.value && observer) {
      sectionRef.value.setAttribute('data-section', key)
      observer.observe(sectionRef.value)
    }
  })
}

onMounted(() => {
  // Initialize section states with initial animation classes
  sectionStates.value = {
    categories: 'opacity-0 translate-y-8',
    promotions: 'opacity-0 translate-y-8',
    featuredGrid: 'opacity-0 translate-y-8',
    bestSelling: 'opacity-0 translate-y-8',
    newArrivals: 'opacity-0 translate-y-8',
    banners: 'opacity-0 translate-y-8',
    trending: 'opacity-0 translate-y-8'
  }

  setupScrollAnimations()
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})

const featuredProducts = computed(() => {
  const fromSections = findSectionData(['featured_products'])
  if (fromSections.length > 0) return fromSections
  return homeProductData.value?.featuredFallback || []
})

const bestSellingProducts = computed(() => {
  const fromSections = findSectionData(['best_selling_products', 'best_selling'])
  if (fromSections.length > 0) return fromSections
  return homeProductData.value?.bestSelling || []
})

const newArrivalProducts = computed(() => {
  const fromSections = findSectionData(['latest_products', 'new_arrivals_products'])
  if (fromSections.length > 0) return fromSections
  return homeProductData.value?.newest || []
})

const trendingProducts = computed(() => {
  const fromSections = findSectionData(['trending_products', 'trending'])
  if (fromSections.length > 0) return fromSections
  return homeProductData.value?.trending || []
})
</script>
