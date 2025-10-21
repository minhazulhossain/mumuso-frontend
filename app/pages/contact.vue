<script setup lang="ts">
const { fetchSettings } = useSettings()
const { data: settings } = await fetchSettings()

// SEO for contact page using the helper composable
useSEO({
  title: 'Contact Us',
  description: `Get in touch with ${settings.value?.company.name || settings.value?.site.name || 'us'}. We'd love to hear from you!`,
  keywords: 'contact, support, customer service, help',
})
</script>

<template>
  <UContainer>
    <div class=" mx-auto px-4 py-12">
      <h1 class="text-4xl font-bold mb-8">Contact Us</h1>

      <!-- Company Information -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
        <h2 class="text-2xl font-semibold mb-6">Get in Touch</h2>

        <div class="grid md:grid-cols-2 gap-8">
          <!-- Contact Details -->
          <div class="space-y-4">
            <div v-if="settings?.company.name">
              <h3 class="font-semibold text-gray-900 dark:text-white">Company</h3>
              <p class="text-gray-600 dark:text-gray-400">
                {{ settings.company.name }}
              </p>
            </div>

            <div v-if="settings?.company.address">
              <h3 class="font-semibold text-gray-900 dark:text-white">Address</h3>
              <p class="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                {{ settings.company.address }}
              </p>
            </div>

            <div v-if="settings?.site.contact_email">
              <h3 class="font-semibold text-gray-900 dark:text-white">Email</h3>
              <a
                  :href="`mailto:${settings.site.contact_email}`"
                  class="text-primary-600 hover:text-blue-800 dark:text-primary-400"
              >
                {{ settings.site.contact_email }}
              </a>
            </div>

            <div v-if="settings?.company.phone">
              <h3 class="font-semibold text-gray-900 dark:text-white">Phone</h3>
              <a
                  :href="`tel:${settings.company.phone}`"
                  class="text-primary-600 hover:text-blue-800 dark:text-primary-400"
              >
                {{ settings.company.phone }}
              </a>
            </div>
          </div>

          <!-- Contact Form -->
          <div>
            <form class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-2">Name</label>
                <input
                    type="text"
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Your name"
                >
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">Email</label>
                <input
                    type="email"
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="your@email.com"
                >
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">Message</label>
                <textarea
                    rows="4"
                    class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Your message..."
                />
              </div>

              <button
                  type="submit"
                  class="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- Social Media Section -->
      <div v-if="settings?.social_media?.length" class="bg-gray-50 dark:bg-gray-900 rounded-lg p-8">
        <h2 class="text-2xl font-semibold mb-4">Follow Us</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          Connect with us on social media
        </p>
        <SocialMediaLinks
            :links="settings.social_media"
            show-username
            icon-size="w-8 h-8"
        />
      </div>
    </div>
  </UContainer>
</template>