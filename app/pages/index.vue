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

      <!-- Featured / Latest Products -->
      <template v-else-if="section.type === 'featured_products' || section.type === 'latest_products'">
        <UContainer>
          <div class="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <p v-if="section.subtitle" class="text-sm uppercase tracking-wide text-primary-600">{{ section.subtitle }}</p>
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">{{ section.title }}</h2>
            </div>
            <UButton
              :to="section.type === 'featured_products' ? '/shop?sort_by=featured' : '/shop?sort_by=newest'"
              variant="ghost"
              color="primary"
              size="sm"
            >
              View More
            </UButton>
          </div>
          <ProductCarousel
            :title="section.title"
            :items="section.data || []"
            :loading="false"
            :view-all-url="section.type === 'featured_products' ? '/shop?sort_by=featured' : '/shop?sort_by=newest'"
          />
        </UContainer>
      </template>

      <!-- Category Grid -->
      <template v-else-if="section.type === 'category_grid'">
        <UContainer>
          <div class="flex items-center justify-between mb-4 sm:mb-6" v-if="section.title">
            <div>
              <p v-if="section.subtitle" class="text-sm uppercase tracking-wide text-primary-600">{{ section.subtitle }}</p>
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">{{ section.title }}</h2>
            </div>
          </div>
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

const sectionBackground = (type: string) => {
  switch (type) {
    case 'hero_banners':
      return 'relative overflow-hidden bg-gradient-to-br from-white via-primary-50 to-primary-100 dark:from-gray-950 dark:via-primary-950 dark:to-gray-900'
    case 'featured_products':
      return 'bg-primary-50'
    case 'latest_products':
      return 'bg-white dark:bg-gray-950'
    case 'category_grid':
      return 'bg-gray-50 dark:bg-gray-900'
    default:
      return 'bg-white dark:bg-gray-950'
  }
}
</script>