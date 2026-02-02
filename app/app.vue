<template>
  <UApp>
    <!-- Google Tag Manager (noscript)-->
    <noscript v-if="settings?.seo.google_tag_manager_id">
      <iframe
          :src="`https://www.googletagmanager.com/ns.html?id=${settings.seo.google_tag_manager_id}`"
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

useHead(() => ({
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: settings.value?.branding?.favicon || '/favicon.ico'
    }
  ]
}))

useSEO({
  title: `${settings.value?.company.name || settings.value?.site.name || 'us'}`,
  description: ``,
  keywords: '',
})

</script>
