<template>
  <UApp>
    <!-- Google Tag Manager (noscript)-->
    <noscript v-if="googleTagManagerId">
      <iframe
          :src="`https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}`"
          height="0"
          width="0"
          style="display:none;visibility:hidden"
      />
    </noscript>
    <NuxtLoadingIndicator/>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </UApp>
</template>
<script setup lang="ts">
import type { Cart } from '#shared/types'

const { fetchSettings } = useSettings()
const cart = useCart()
const route = useRoute()

onMounted(() => {
  cart.initCart()
})

onUnmounted(() => {
  cart.destroyCart()
})

const { data: settings, pending, error } = await fetchSettings()

// Provide settings and cart globally to all child components
provide('settings', settings)
provide('cart', cart)

watch(() => route.fullPath, () => {
  if (cart.isCartOpen.value) {
    cart.isCartOpen.value = false
  }
})

watch(() => settings.value?.site.active, (isActive) => {
  if (isActive === false) {
    navigateTo('/maintenance')
  }
}, {immediate: true})

const googleTagManagerId = computed(() => {
  const rawId = settings.value?.seo.google_tag_manager_id?.trim()
  return rawId?.startsWith('GTM-') ? rawId : ''
})

const googleAnalyticsId = computed(() => {
  const analyticsId = settings.value?.seo.google_analytics_id?.trim()
  if (analyticsId?.startsWith('G-')) {
    return analyticsId
  }

  const fallbackId = settings.value?.seo.google_tag_manager_id?.trim()
  return fallbackId?.startsWith('G-') ? fallbackId : ''
})

useHead(() => {
  return {
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        href: settings.value?.branding?.favicon || '/favicon.ico'
      }
    ],
    script: googleAnalyticsId.value
      ? [
        {
          async: true,
          src: `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId.value}`
        },
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAnalyticsId.value}');
          `
        }
      ]
      : []
  }
})

useSEO({
  title: `${settings.value?.company.name || settings.value?.site.name || 'us'}`,
  description: ``,
  keywords: '',
})

</script>
