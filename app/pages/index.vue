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
    <section class="py-12 md:py-16 bg-white dark:bg-gray-950">
      <UContainer>
        <CategoriesGrid />
      </UContainer>
    </section>

    <!-- Promotions Section -->
    <section class="py-12 md:py-16 bg-gray-50 dark:bg-gray-900">
      <UContainer>
        <PromotionGrid />
      </UContainer>
    </section>

    <!-- Best Selling Section -->
    <section class="py-12 md:py-16 bg-white dark:bg-gray-950">
      <UContainer>
        <ProductCarousel
            title="Best Selling"
            :items="products"
            :loading="loading"
        />
      </UContainer>
    </section>

    <!-- New Arrivals Section -->
    <section class="py-12 md:py-16 bg-success-500 dark:bg-success-600">
      <UContainer>
        <ProductCarousel
            title="New Arrivals"
            :items="products"
            :loading="loading"
        />
      </UContainer>
    </section>

    <!-- Banners Section -->
    <section class="py-12 md:py-16 bg-white dark:bg-gray-950">
      <UContainer>
        <BannersGrid />
      </UContainer>
    </section>

    <!-- Trending Section -->
    <section class="py-12 md:py-16 bg-gray-50 dark:bg-gray-900">
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

<script setup>
const { fetchHeroBanners } = useContent()
const { data: heroBanners, pending } = await fetchHeroBanners()

const { products, loading, fetchProducts } = useProducts()

onMounted(async () => {
  await fetchProducts()
})
</script>
