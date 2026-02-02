<template>
  <footer
      class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pb-[calc(76px+env(safe-area-inset-bottom))] md:pb-0"
      v-if="settings">
    <UContainer>
      <!-- Main Footer Content -->
      <div class="py-8 md:py-16">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Brand Section -->
          <div class="space-y-4 sm:col-span-2 lg:col-span-1 text-center sm:text-left">
            <div class="flex items-center justify-center sm:justify-start space-x-3">
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
            <p class="text-gray-600 dark:text-gray-400 text-sm max-w-xs mx-auto" v-if="settings?.footer?.description">
              {{ settings?.footer?.description }}
            </p>
            <div v-if="settings?.footer?.show_social" class="space-y-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Follow Us
              </h3>
              <div class="flex justify-center sm:justify-start">
                <SocialMediaLinks icon-size="w-5 h-5"/>
              </div>
            </div>
          </div>

          <!-- Footer Navigation Sections (Dynamic from Menu Builder) -->
          <template v-if="loadingMenus">
            <div v-for="i in 2" :key="'sk-'+i" class="space-y-4">
              <USkeleton class="h-4 w-32" />
              <ul class="space-y-3">
                <li v-for="j in 4" :key="'sk-item-'+i+'-'+j">
                  <USkeleton class="h-3 w-40" />
                </li>
              </ul>
            </div>
          </template>
          <template v-else>
            <div v-for="menu in displayMenus" :key="menu.slug" class="space-y-4">
              <div class="hidden sm:block">
                <h3 class="font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wider mb-2">
                  {{ menu.name }}
                </h3>
                <ul class="space-y-3">
                  <li v-for="item in menu.items" :key="item.id">
                    <NuxtLink
                        :to="item.url || '#'"
                        :external="isExternalUrl(item.url)"
                        :target="isExternalUrl(item.url) ? '_blank' : undefined"
                        class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors flex items-center"
                    >
                      {{ item.title }}

                    </NuxtLink>
                  </li>
                </ul>
              </div>
              <details class="sm:hidden border-b border-gray-200 dark:border-gray-800 pb-3">
                <summary
                    class="font-semibold text-gray-900 dark:text-white text-sm uppercase tracking-wider cursor-pointer mb-2">
                  {{ menu.name }}
                </summary>
                <ul class="space-y-3 mt-3">
                  <li v-for="item in menu.items" :key="item.id">
                    <NuxtLink
                        :to="item.url || '#'"
                        :external="isExternalUrl(item.url)"
                        :target="isExternalUrl(item.url) ? '_blank' : undefined"
                        class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors flex items-center"
                    >
                      {{ item.label }}
                      <UIcon
                          v-if="isExternalUrl(item.url)"
                          name="i-heroicons-arrow-top-right-on-square"
                          class="w-3 h-3 ml-1"
                      />
                    </NuxtLink>
                  </li>
                </ul>
              </details>
            </div>
          </template>

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
          <div class="flex items-center space-x-6" v-if="settings?.footer?.menu_items">
            <NuxtLink
                v-for="item in settings.footer.menu_items"
                :key="item.id"
                :to="item.url"
                class="text-sm transition-colors"
                :class="[
                $route.path === item.url
                  ? 'text-indigo-600 dark:text-indigo-400 font-medium'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              ]"
            >
              {{ item.label }}
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
const {fetchMenus} = useMenus()

const currentYear = new Date().getFullYear()
const toast = useToast()

// Dynamic menus from backend
const displayMenus = ref<any[]>([])
const loadingMenus = ref(true)

// Define which footer menus to display (adjust these menu slugs as needed)
const FOOTER_MENU_SLUGS = ['footer-product-menu', 'footer-company-menu']

// Check if URL is external
const isExternalUrl = (url: string): boolean => {
  if (!url) return false
  return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//')
}

// Fetch footer menus on mount
const loadFooterMenus = async () => {
  loadingMenus.value = true
  try {
    const menus = await fetchMenus(FOOTER_MENU_SLUGS)

    // Filter and limit to 3 menus
    displayMenus.value = FOOTER_MENU_SLUGS
      .map(slug => menus[slug])
      .filter(menu => menu)
      .slice(0, 3)

    console.log('[footer] Loaded menus:', displayMenus.value)
  } catch (err) {
    console.error('[footer] Error loading menus:', err)
    // Fallback to empty menus
    displayMenus.value = []
  } finally {
    loadingMenus.value = false
  }
}

const handleNewsLetterSuccess = () => {
  toast.add({
    title: 'Subscribed!',
    description: 'Please check your email to confirm.',
    color: 'success',
  })
}

// Load menus on mount
onMounted(async () => {
  await loadFooterMenus()
})
</script>
