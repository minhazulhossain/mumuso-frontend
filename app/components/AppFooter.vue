<template>
  <footer class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800" v-if="settings">
    <UContainer>
      <!-- Main Footer Content -->
      <div class="py-8 md:py-16">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Brand Section -->
          <div class="space-y-4">
            <div class="flex items-center space-x-3">
              <template v-if="settings?.branding.logo">
                <NuxtImg
                    :src="settings.branding.logo"
                    :alt="settings.site.name"
                    :class="['h-10 md:h-14 w-auto dark:hidden']"
                    loading="eager"
                    format="webp"
                />
                <NuxtImg
                    v-if="settings.branding.logo_dark"
                    :src="settings.branding.logo_dark"
                    :alt="settings.site.name"
                    :class="['w-auto hidden dark:block']"
                    loading="eager"
                    format="webp"
                />
                <NuxtImg
                    v-else
                    :src="settings.branding.logo"
                    :alt="settings.site.name"
                    :class="['w-auto hidden dark:block']"
                    loading="eager"
                    format="webp"
                />
              </template>
            </div>
            <p class="text-gray-600 dark:text-gray-400 text-sm max-w-xs" v-if="settings?.footer?.description">
              {{ settings?.footer?.description }}
            </p>
            <div v-if="settings?.footer?.show_social" class="space-y-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Follow Us
              </h3>
              <SocialMediaLinks icon-size="w-5 h-5" />
            </div>
          </div>

          <!-- Footer Navigation Sections -->
          <div v-for="section in footerSections" :key="section.title" class="space-y-4">
            <h3 class="font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wider">
              {{ section.title }}
            </h3>
            <ul class="space-y-3">
              <li v-for="link in section.links" :key="link.name">
                <NuxtLink
                  :to="link.to"
                  :external="link.external"
                  :target="link.external ? '_blank' : undefined"
                  class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors flex items-center"
                >
                  {{ link.name }}
                  <UIcon
                    v-if="link.external"
                    name="i-heroicons-arrow-top-right-on-square"
                    class="w-3 h-3 ml-1"
                  />
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div class="space-y-4">
            <h3 class="font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wider">
              Get Something Beautiful
            </h3>
            <NewsletterForm @success="handleNewsLetterSuccess"/>
          </div>
        </div>
      </div>

      <!-- Bottom Footer -->
      <div class="py-6 border-t border-gray-200 dark:border-gray-800">
        <div class="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            {{ settings?.footer?.copyright || `© ${currentYear} All rights reserved.` }}
          </p>

          <div class="flex items-center space-x-6">
            <NuxtLink
              to="/"
              class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </NuxtLink>
            <NuxtLink
              to="/"
              class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </NuxtLink>
            <NuxtLink
              to="/"
              class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors"
            >
              Cookies
            </NuxtLink>
          </div>
        </div>
      </div>
    </UContainer>
  </footer>
</template>

<script setup lang="ts">
import type {Settings} from '#shared/types'

const settings = inject<Settings>('settings')

const currentYear = new Date().getFullYear()
const newsletterEmail = ref('')
const isSubscribing = ref(false)

const toast = useToast()


const subscribeNewsletter = async () => {
  if (!newsletterEmail.value) return

  isSubscribing.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))

  const toast = useToast()
  toast.add({
    title: 'Subscribed!',
    description: 'Thank you for subscribing to our newsletter.',
    icon: 'i-heroicons-check-circle',
    color: 'success'
  })

  newsletterEmail.value = ''
  isSubscribing.value = false
}

const handleNewsLetterSuccess = () => {
  toast.add({
    title: 'Subscribed!',
    description: 'Please check your email to confirm.',
    color: 'success',
  })
}

const footerSections = [
  {
    title: 'Product',
    links: [
      { name: 'Shop', to: '/shop' },
      { name: 'Pricing', to: '/' },
      { name: 'Documentation', to: '/' },
      { name: 'API Reference', to: '/' },
      { name: 'Changelog', to: '/' }
    ]
  },
  {
    title: 'Company',
    links: [
      { name: 'About', to: '/' },
      { name: 'Blog', to: '/blog' },
      { name: 'Careers', to: '/' },
      { name: 'Press Kit', to: '/' },
      { name: 'Contact', to: '/contact' }
    ]
  },
]
</script>