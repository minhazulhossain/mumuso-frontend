<template>
  <footer class="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
    <UContainer>
      <!-- Main Footer Content -->
      <div class="py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Brand Section -->
          <div class="space-y-4">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <UIcon name="i-heroicons-cube" class="w-5 h-5 text-white" />
              </div>
              <span class="text-xl font-bold text-gray-900 dark:text-white">Herlan</span>
            </div>
            <p class="text-gray-600 dark:text-gray-400 text-sm max-w-xs">
              At Herlan Store, we are dedicated to providing a premium selection of skincare and makeup brands that stand out in both quality and authenticity. Every brand we carry is carefully chosen through a rigorous selection process.
            </p>
            <div class="flex space-x-3">
              <UButton
                icon="i-lucide-github"
                color="gray"
                variant="ghost"
                size="sm"
                to="https://github.com"
                target="_blank"
                aria-label="GitHub"
              />
              <UButton
                icon="i-lucide-twitter"
                color="gray"
                variant="ghost"
                size="sm"
                to="https://twitter.com"
                target="_blank"
                aria-label="Twitter"
              />
              <UButton
                icon="i-lucide-linkedin"
                color="gray"
                variant="ghost"
                size="sm"
                to="https://linkedin.com"
                target="_blank"
                aria-label="LinkedIn"
              />
              <UButton
                icon="i-lucide-youtube"
                color="gray"
                variant="ghost"
                size="sm"
                to="https://youtube.com"
                target="_blank"
                aria-label="YouTube"
              />
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
            © {{ currentYear }} Herlan. All rights reserved.
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

      <!-- Newsletter Section (Optional) -->
<!--      <div class="py-8 border-t border-gray-200 dark:border-gray-800">-->
<!--        <div class="max-w-md mx-auto text-center">-->
<!--          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">-->
<!--            Stay Updated-->
<!--          </h3>-->
<!--          <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">-->
<!--            Get the latest updates about our products and services.-->
<!--          </p>-->
<!--          <div class="flex space-x-2">-->
<!--            <UInput -->
<!--              v-model="newsletterEmail"-->
<!--              placeholder="Enter your email"-->
<!--              class="flex-1"-->
<!--              size="sm"-->
<!--            />-->
<!--            <UButton -->
<!--              color="primary" -->
<!--              size="sm"-->
<!--              @click="subscribeNewsletter"-->
<!--              :loading="isSubscribing"-->
<!--            >-->
<!--              Subscribe-->
<!--            </UButton>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
    </UContainer>
  </footer>
</template>

<script setup>
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
    color: 'green'
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
      { name: 'Contact', to: '/' }
    ]
  },
]
</script>