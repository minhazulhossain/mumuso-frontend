<template>
  <UApp>
    <!-- Google Tag Manager (noscript) -->
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
<script setup>

const {fetchSettings} = useSettings()

// Fetch all settings on app initialization
const { data: settings } = await fetchSettings()

useHead({

  title: settings.value?.site_name || 'Default Site Title',

  titleTemplate: (title) => {
    const siteName = settings.value?.site.name || 'My Website'
    return title === siteName ? title : `${title} - ${siteName}`
  },

  meta: [
    {
      name: 'description',
      content: settings.value?.site.description || 'Welcome to our website',
    },
    {
      name: 'keywords',
      content: settings.value?.seo.keywords || '',
    },
    {
      name: 'robots',
      content: settings.value?.seo.indexing ? 'index, follow' : 'noindex, nofollow',
    },
    {
      property: 'og:title',
      content: settings.value?.site.name || 'My Website',
    },
    {
      property: 'og:description',
      content: settings.value?.site.description || 'Welcome to our website',
    },
    {
      property: 'og:url',
      content: settings.value?.site.url || '',
    },
    {
      property: 'og:image',
      content: settings.value?.branding.og_image || settings.value?.branding.logo || '',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    // Twitter Card
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: settings.value?.site.name || 'My Website',
    },
    {
      name: 'twitter:description',
      content: settings.value?.site.description || 'Welcome to our website',
    },
    {
      name: 'twitter:image',
      content: settings.value?.branding.og_image || settings.value?.branding.logo || '',
    },
  ],
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {
      rel: 'canonical',
      href: settings.value?.site.url || '',
    },
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: settings.value?.branding.favicon || '/favicon.ico',
    },
  ],
  script: [
    // Google Analytics
    ...(settings.value?.seo.google_analytics_id ? [
      {
        src: `https://www.googletagmanager.com/gtag/js?id=${settings.value.seo.google_analytics_id}`,
        async: true,
      },
      {
        children: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${settings.value.seo.google_analytics_id}');
        `,
      },
    ] : []),
  ]
})

// Make settings available globally if needed
provide('settings', settings)

watch(() => settings.value?.site.active, (isActive) => {
  if (isActive === false) {
    navigateTo('/maintenance')
  }
}, { immediate: true })

</script>