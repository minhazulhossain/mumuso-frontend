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
  const ids = [
    settings.value?.seo.google_tag_manager_id?.trim(),
    settings.value?.seo.google_analytics_id?.trim()
  ].filter(Boolean) as string[]

  return ids.find((id) => id.startsWith('GTM-')) || ''
})

const googleAnalyticsId = computed(() => {
  const ids = [
    settings.value?.seo.google_analytics_id?.trim(),
    settings.value?.seo.google_tag_manager_id?.trim()
  ].filter(Boolean) as string[]

  return ids.find((id) => id.startsWith('G-')) || ''
})

useHead(() => {
  const scripts: Array<Record<string, any>> = []

  if (googleTagManagerId.value) {
    scripts.push({
      key: 'gtm-init',
      innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${googleTagManagerId.value}');`
    })
  }

  if (googleAnalyticsId.value) {
    scripts.push(
      {
        key: 'gtag-src',
        async: true,
        src: `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId.value}`
      },
      {
        key: 'gtag-init',
        innerHTML: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${googleAnalyticsId.value}');
        `
      }
    )
  }

  return {
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        href: settings.value?.branding?.favicon || '/favicon.ico'
      }
    ],
    script: scripts
  }
})

useSEO({
  title: `${settings.value?.company.name || settings.value?.site.name || 'us'}`,
  description: ``,
  keywords: '',
})

</script>
