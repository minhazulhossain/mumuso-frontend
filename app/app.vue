<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
        <CartSidebar />
    </NuxtLayout>
  </UApp>
</template>
<script setup>
// Global app configuration
useHead({
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }
  ]
})

// Global SEO configuration
useSeoMeta({
  titleTemplate: '%s - NuxtUI App',
  description: 'Modern web application built with Nuxt 4 and Nuxt UI',
  ogDescription: 'Modern web application built with Nuxt 4 and Nuxt UI',
  ogImage: '/og-image.jpg',
  twitterCard: 'summary_large_image'
})
</script>