<template>
  <div>
    <section
      v-if="homePending"
      class="py-16 bg-gradient-to-br from-white via-primary-50 to-primary-100 dark:from-gray-950 dark:via-primary-950 dark:to-gray-900"
    >
      <UContainer class="flex flex-col gap-6">
        <USkeleton class="h-10 w-52" />
        <USkeleton class="h-64 w-full" />
      </UContainer>
    </section>

    <section
      v-else
      v-for="section in sections"
      :key="section.id"
      :class="sectionBackground(section.type)"
      class="py-8 sm:py-10 md:py-14 lg:py-16"
    >
      <!-- Hero -->
      <template v-if="section.type === 'hero_banners'">
        <HeroSlider
          :banners="section.data || []"
          :autoplay="true"
          :loading="false"
        />
      </template>

      <!-- Product Sections -->
      <template v-else-if="isProductSection(section.type)">
        <UContainer>
          <ProductCarousel
            :title="section.title"
            :items="resolveSectionProducts(section)"
            :loading="productsPending && !Array.isArray(section.data)"
            :view-all-url="sectionViewAllUrl(section.type)"
          />
        </UContainer>
      </template>

      <!-- Category Grid -->
      <template v-else-if="section.type === 'category_grid'">
        <UContainer>
          <CategoriesGrid :categories="section.data || []" />
        </UContainer>
      </template>

      <!-- Custom HTML -->
      <template v-else-if="section.type === 'custom_html'">
        <UContainer>
          <div class="prose prose-primary dark:prose-invert max-w-none" v-html="section.data?.html"></div>
        </UContainer>
      </template>

      <!-- Page Content -->
      <template v-else-if="section.type === 'page_content'">
        <UContainer>
          <div class="prose prose-primary dark:prose-invert max-w-none">
            <h2 class="text-2xl font-semibold mb-2">{{ section.data?.title || section.title }}</h2>
            <div v-html="section.data?.content"></div>
          </div>
        </UContainer>
      </template>

      <!-- Fallback -->
      <template v-else>
        <UContainer>
          <div class="bg-white dark:bg-gray-900 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 p-6">
            <p class="text-sm text-gray-500">Unhandled section type: {{ section.type }}</p>
          </div>
        </UContainer>
      </template>
    </section>
  </div>
</template>

<script setup lang="ts">
const { fetchHome } = useContent()
const { data: homeSections, pending: homePending } = await fetchHome()

const sections = computed(() => homeSections.value || [])
const HOME_PRODUCTS_LIMIT = 10

const isProductSection = (type: string) => {
  return ['featured_products', 'latest_products', 'best_selling_products', 'trending_products'].includes(type)
}

const sectionQueryFromType = (type: string): Record<string, string> => {
  switch (type) {
    case 'featured_products':
      return { featured: 'true', sort_by: 'featured' }
    case 'latest_products':
      return { sort_by: 'newest' }
    case 'best_selling_products':
      return { best_selling: 'true', top: String(HOME_PRODUCTS_LIMIT), sort_by: 'best-selling' }
    case 'trending_products':
      return { sort_by: 'best-selling' }
    default:
      return { sort_by: 'featured' }
  }
}

const sectionViewAllUrl = (type: string) => {
  switch (type) {
    case 'featured_products':
      return '/shop?sort_by=featured'
    case 'latest_products':
      return '/shop?sort_by=newest'
    case 'best_selling_products':
      return '/shop?best_selling=true'
    case 'trending_products':
      return '/shop?sort_by=best-selling'
    default:
      return '/shop'
  }
}

const { data: sectionProductsData, pending: productsPending } = await useAsyncData('index-new-section-products', async () => {
  const productSections = sections.value.filter((section: any) => isProductSection(section.type))
  const results = await Promise.all(
    productSections.map(async (section: any) => {
      if (Array.isArray(section?.data) && section.data.length > 0) {
        return [String(section.id), section.data] as const
      }

      const response = await $fetch<{ data?: any[] }>('/api/products', {
        query: {
          page: '1',
          per_page: String(HOME_PRODUCTS_LIMIT),
          ...sectionQueryFromType(section.type)
        }
      })

      return [String(section.id), Array.isArray(response?.data) ? response.data : []] as const
    })
  )

  return Object.fromEntries(results)
})

const resolveSectionProducts = (section: any) => {
  if (Array.isArray(section?.data) && section.data.length > 0) {
    return section.data
  }
  return sectionProductsData.value?.[String(section.id)] || []
}

const sectionBackground = (type: string) => {
  switch (type) {
    case 'hero_banners':
      return 'relative overflow-hidden bg-gradient-to-br from-white via-primary-50 to-primary-100 dark:from-gray-950 dark:via-primary-950 dark:to-gray-900'
    case 'featured_products':
      return 'bg-primary-50'
    case 'latest_products':
      return 'bg-white dark:bg-gray-950'
    case 'best_selling_products':
      return 'bg-white dark:bg-gray-950'
    case 'trending_products':
      return 'bg-gray-50 dark:bg-gray-900'
    case 'category_grid':
      return 'bg-gray-50 dark:bg-gray-900'
    default:
      return 'bg-white dark:bg-gray-950'
  }
}
</script>
