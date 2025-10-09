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

    <!-- Features Section -->
    <section class="py-24 bg-white dark:bg-gray-950">
      <UContainer>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <UCard
              v-for="feature in features"
              :key="feature.title"
              class="group hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300" :style="{ backgroundImage: `url(${feature.img})` }"
              :ui="{ body: { padding: 'p-8' } }"
          >

            <h3 class="text-xl font-semibold text-gray-200 dark:text-white mb-3">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ feature.description }}
            </p>
          </UCard>
        </div>
      </UContainer>
    </section>

    <section class="py-24 bg-white dark:bg-gray-950 bg-linear-to-r from-cyan-500 to-blue-500">
      <UContainer>
        <ProductCarousel title="Best Selling"/>
      </UContainer>
    </section>

    <section class="py-24 bg-white dark:bg-gray-950">
      <UContainer>
        <ProductCarousel title="New Arrivals"/>
      </UContainer>
    </section>
  </div>
</template>

<script setup>

const {fetchHeroBanners} = useContent()

useHead({
  title: 'Home',
})

const [heroBanners] = await Promise.all([
  fetchHeroBanners(),
])

// Page-specific SEO
useSeoMeta({
  title: 'Home - Build Amazing Apps with Nuxt UI',
  description: 'Create beautiful, responsive web applications using Nuxt 4 and Nuxt UI. Fast, accessible, and modern by default.',
  ogTitle: 'Build Amazing Apps with Nuxt UI',
})

const heroStats = [
  {value: '50K+', label: 'Developers'},
  {value: '100+', label: 'Components'},
  {value: '99.9%', label: 'Uptime'},
  {value: '24/7', label: 'Support'}
]

const features = [
  {
    title: 'Modern Design System',
    icon: 'i-heroicons-sparkles',
    description: 'Beautiful, accessible components built with Tailwind CSS and designed for the modern web.',
    img: 'https://picsum.photos/600/500?random=1'
  },
  {
    title: 'Developer Experience',
    icon: 'i-heroicons-code-bracket',
    description: 'TypeScript support, auto-completion, and excellent documentation for a smooth development experience.',
    img: 'https://picsum.photos/600/500?random=2'
  },
  {
    title: 'Performance Optimized',
    icon: 'i-heroicons-bolt',
    description: 'Optimized for speed with tree-shaking, lazy loading, and efficient bundle sizes.',
    img: 'https://picsum.photos/600/500?random=3'
  },
  {
    title: 'Fully Responsive',
    icon: 'i-heroicons-device-phone-mobile',
    description: 'Mobile-first design that works perfectly on all devices and screen sizes.',
    img: 'https://picsum.photos/600/500?random=4'
  },
  {
    title: 'Dark Mode Ready',
    icon: 'i-heroicons-moon',
    description: 'Built-in dark mode support with smooth transitions and consistent theming.',
    img: 'https://picsum.photos/600/500?random=5',
  },
  {
    title: 'Accessibility First',
    icon: 'i-heroicons-heart',
    description: 'WCAG compliant components ensuring your app is accessible to everyone.',
    img: 'https://picsum.photos/600/500?random=6'
  }
]

const techStack = [
  {name: 'Nuxt 4', icon: 'i-lucide-zap'},
  {name: 'Vue 3', icon: 'i-lucide-layers'},
  {name: 'TypeScript', icon: 'i-lucide-code'},
  {name: 'Tailwind', icon: 'i-lucide-palette'},
  {name: 'Nuxt UI', icon: 'i-lucide-layout'},
  {name: 'Vite', icon: 'i-lucide-lightning'}
]

</script>