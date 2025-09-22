<template>
  <div>
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-white via-primary-50 to-primary-100 dark:from-gray-950 dark:via-primary-950 dark:to-gray-900">
      <UContainer>
        <div class="py-24 sm:py-32 lg:py-40">
          <div class="text-center">
            <UBadge color="primary" variant="subtle" class="mb-6">
              <UIcon name="i-heroicons-sparkles" class="w-4 h-4 mr-1" />
              Built with Nuxt 4 + UI
            </UBadge>
            
            <h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
              Build Amazing Apps with
              <span class="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 bg-clip-text text-transparent">
                Nuxt UI
              </span>
            </h1>
            
            <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Create beautiful, responsive web applications using the power of Nuxt 4 and the elegant components of Nuxt UI. 
              Fast, accessible, and modern by default.
            </p>
            
            <div class="mt-10 flex items-center justify-center gap-x-6 flex-wrap">
              <UButton size="xl" to="/about">
                Get Started
                <template #trailing>
                  <UIcon name="i-heroicons-arrow-right" />
                </template>
              </UButton>
              <UButton variant="outline" size="xl" to="/services" color="gray">
                View Demo
                <template #trailing>
                  <UIcon name="i-heroicons-play" />
                </template>
              </UButton>
            </div>

            <!-- Stats -->
            <div class="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div v-for="stat in heroStats" :key="stat.label" class="text-center">
                <div class="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400">
                  {{ stat.value }}
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {{ stat.label }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Features Section -->
    <section class="py-24 bg-white dark:bg-gray-950">
      <UContainer>
        <div class="text-center mb-16">
          <UBadge color="primary" variant="subtle" class="mb-4">Features</UBadge>
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Everything you need to build modern apps
          </h2>
          <p class="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover the powerful features that make development faster and more enjoyable.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <UCard 
            v-for="feature in features" 
            :key="feature.title" 
            class="group hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300"
            :ui="{ body: { padding: 'p-8' } }"
          >
            <div class="mb-6">
              <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <UIcon :name="feature.icon" class="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {{ feature.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ feature.description }}
            </p>
          </UCard>
        </div>
      </UContainer>
    </section>

    <!-- Tech Stack Section -->
    <section class="py-24 bg-gray-50 dark:bg-gray-900">
      <UContainer>
        <div class="text-center mb-16">
          <UBadge color="primary" variant="subtle" class="mb-4">Tech Stack</UBadge>
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Built with modern technologies
          </h2>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          <div 
            v-for="tech in techStack" 
            :key="tech.name"
            class="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl hover:shadow-lg transition-shadow"
          >
            <UIcon :name="tech.icon" class="w-12 h-12 text-gray-600 dark:text-gray-300 mb-3" />
            <span class="text-sm font-medium text-gray-900 dark:text-white">{{ tech.name }}</span>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- CTA Section -->
    <section class="py-24 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400">
      <UContainer>
        <div class="text-center">
          <h2 class="text-3xl font-bold text-white sm:text-4xl">
            Ready to get started?
          </h2>
          <p class="mt-4 text-lg text-primary-100">
            Join thousands of developers building with Nuxt UI
          </p>
          <div class="mt-8 flex items-center justify-center gap-4 flex-wrap">
            <UButton size="xl" color="white" to="/contact">
              Start Your Project
              <template #trailing>
                <UIcon name="i-heroicons-rocket-launch" />
              </template>
            </UButton>
            <UButton size="xl" variant="outline" color="white" to="/docs">
              View Documentation
            </UButton>
          </div>
        </div>
      </UContainer>
    </section>
  </div>
</template>

<script setup>
// Page-specific head configuration
useHead({
  title: 'Home',
})

// Page-specific SEO
useSeoMeta({
  title: 'Home - Build Amazing Apps with Nuxt UI',
  description: 'Create beautiful, responsive web applications using Nuxt 4 and Nuxt UI. Fast, accessible, and modern by default.',
  ogTitle: 'Build Amazing Apps with Nuxt UI',
})

const heroStats = [
  { value: '50K+', label: 'Developers' },
  { value: '100+', label: 'Components' },
  { value: '99.9%', label: 'Uptime' },
  { value: '24/7', label: 'Support' }
]

const features = [
  {
    title: 'Modern Design System',
    icon: 'i-heroicons-sparkles',
    description: 'Beautiful, accessible components built with Tailwind CSS and designed for the modern web.'
  },
  {
    title: 'Developer Experience',
    icon: 'i-heroicons-code-bracket',
    description: 'TypeScript support, auto-completion, and excellent documentation for a smooth development experience.'
  },
  {
    title: 'Performance Optimized',
    icon: 'i-heroicons-bolt',
    description: 'Optimized for speed with tree-shaking, lazy loading, and efficient bundle sizes.'
  },
  {
    title: 'Fully Responsive',
    icon: 'i-heroicons-device-phone-mobile',
    description: 'Mobile-first design that works perfectly on all devices and screen sizes.'
  },
  {
    title: 'Dark Mode Ready',
    icon: 'i-heroicons-moon',
    description: 'Built-in dark mode support with smooth transitions and consistent theming.'
  },
  {
    title: 'Accessibility First',
    icon: 'i-heroicons-heart',
    description: 'WCAG compliant components ensuring your app is accessible to everyone.'
  }
]

const techStack = [
  { name: 'Nuxt 4', icon: 'i-lucide-zap' },
  { name: 'Vue 3', icon: 'i-lucide-layers' },
  { name: 'TypeScript', icon: 'i-lucide-code' },
  { name: 'Tailwind', icon: 'i-lucide-palette' },
  { name: 'Nuxt UI', icon: 'i-lucide-layout' },
  { name: 'Vite', icon: 'i-lucide-lightning' }
]
</script>