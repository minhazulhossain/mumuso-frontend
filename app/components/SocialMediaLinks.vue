<script setup lang="ts">
import type { SocialMediaLink } from '../composables/useSettings'

const props = defineProps<{
  links?: SocialMediaLink[]
  iconSize?: string
  showUsername?: boolean
}>()

const { fetchSocialMedia } = useSettings()

// Fetch social media links if not provided via props
const { data: socialLinks, pending, error } = await fetchSocialMedia()


// Platform icons mapping (you can use actual SVG or icon library)
const platformIcons: Record<string, string> = {
  facebook: 'i-lucide-facebook',
  twitter: 'i-heroicons-x-mark',
  instagram: 'i-heroicons-camera',
  linkedin: 'i-heroicons-briefcase',
  youtube: 'i-heroicons-play-circle',
  github: 'i-heroicons-code-bracket',
  tiktok: 'i-heroicons-musical-note',
  pinterest: 'i-heroicons-pin',
  discord: 'i-heroicons-chat-bubble-left-right',
  reddit: 'i-heroicons-chat-bubble-bottom-center',
  snapchat: 'i-heroicons-camera',
  whatsapp: 'i-heroicons-chat-bubble-left-ellipsis',
  telegram: 'i-heroicons-paper-airplane',
  twitch: 'i-heroicons-video-camera',
  mastodon: 'i-heroicons-megaphone',
}

const getIcon = (platform: string) => {
  return platformIcons[platform.toLowerCase()] || 'i-heroicons-link'
}

const getPlatformName = (link: SocialMediaLink) => {
  if (link.platform === 'other' && link.platform_name) {
    return link.platform_name
  }
  return link.platform.charAt(0).toUpperCase() + link.platform.slice(1)
}
</script>

<template>
  <div class="flex items-center gap-4">
    <a
        v-for="link in socialLinks"
        :key="link.url"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        :title="getPlatformName(link)"
        class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-200"
    >
      <!-- Using UnoCSS/Heroicons classes - replace with your icon library -->
      <UIcon :name="getIcon(link.platform)" class="size-7" />

    </a>
  </div>
</template>