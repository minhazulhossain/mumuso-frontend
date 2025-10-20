<template>
  <div>
    <!-- Hero Section -->
    <section
        class="relative overflow-hidden bg-gradient-to-br from-white via-primary-50 to-primary-100 dark:from-gray-950 dark:via-primary-950 dark:to-gray-900">

      <HeroSlider
          v-if="heroBanners"
          :banners="heroBanners"
          :autoplay="true"
          :interval="10000000"
          height="600px"
      />

    </section>

    <section class="py-24">
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

// Page-specific SEO
useSeoMeta({
  title: 'Home - Build Amazing Apps with Nuxt UI',
  description: 'Create beautiful, responsive web applications using Nuxt 4 and Nuxt UI. Fast, accessible, and modern by default.',
  ogTitle: 'Build Amazing Apps with Nuxt UI',
})


</script>