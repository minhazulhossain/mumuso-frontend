<template>
  <div>
    <section
        class="relative overflow-hidden bg-gradient-to-br from-white via-primary-50 to-primary-100 dark:from-gray-950 dark:via-primary-950 dark:to-gray-900">
      <HeroSlider
          v-if="heroBanners"
          :banners="heroBanners"
          :autoplay="true"
          :loading="pending"
      />

    </section>
    <section class="py-10 bg-white">
      <UContainer class="px-0">
        <CategoriesGrid/>
      </UContainer>
    </section>

    <section class="py-6 md:py-14">
      <UContainer class="px-0">
        <PromotionGrid/>
      </UContainer>
    </section>

    <section class="py-6 md:py-14 pt-0 md:pt-0">
      <UContainer class="px-0">
        <ProductCarousel title="Best Selling" :items="products" :loading="loading"/>
      </UContainer>
    </section>

    <section class="py-6 md:py-14 bg-[#17AE6F]">
      <UContainer class="px-0">
        <ProductCarousel title="New Arrivals" :items="products" :loading="loading"/>
      </UContainer>
    </section>

    <section class="py-6 md:py-14">
      <UContainer>
        <BannersGrid/>
      </UContainer>
    </section>

    <section class="py-6 md:py-14 pt-0 md:pt-0">
      <UContainer>
        <ProductCarousel title="Trending" :items="products" :loading="loading"/>
      </UContainer>
    </section>

  </div>
</template>

<script setup>

const {fetchHeroBanners} = useContent();
const {data: heroBanners, pending} = await fetchHeroBanners()

const {
  products,
  categories,
  loading,
  error,
  getAllCategories,
  fetchProducts
} = useProducts()

onMounted(async () => {
  await fetchProducts()
})

</script>