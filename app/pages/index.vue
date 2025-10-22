<template>
  <div>
    <section
        class="relative overflow-hidden bg-gradient-to-br from-white via-primary-50 to-primary-100 dark:from-gray-950 dark:via-primary-950 dark:to-gray-900">
      <HeroSlider
          v-if="heroBanners"
          :banners="heroBanners"
          :autoplay="true"
          :interval="10000000"
      />
    </section>
    <section class="py-10 bg-white">
      <UContainer>
        <CategoriesGrid />
      </UContainer>
    </section>

    <section class="py-24">
      <UContainer>
        <PromotionGrid/>
      </UContainer>
    </section>

    <section class="py-24 pt-0">
      <UContainer>
        <ProductCarousel title="Best Selling" :items="products" :loading="loading"/>
      </UContainer>
    </section>

    <section class="py-24 bg-[#17AE6F]">
      <UContainer>
        <ProductCarousel title="New Arrivals" :items="products" :loading="loading"/>
      </UContainer>
    </section>

    <section class="py-24">
      <UContainer>
        <BannersGrid/>
      </UContainer>
    </section>

    <section class="py-24 pt-0">
      <UContainer>
        <ProductCarousel title="Trending" :items="products" :loading="loading"/>
      </UContainer>
    </section>

  </div>
</template>

<script setup>

const {fetchHeroBanners} = useContent();
const {fetchProducts, products, loading} = useProducts()
const toast = useToast()

useHead({
  title: 'Home',
})

const [heroBanners] = await Promise.all([
  fetchHeroBanners(),
])

onMounted(async () => {
  try {
    await fetchProducts()
  } catch (err) {
    console.error('Failed to load product:', err)
  }
})


</script>