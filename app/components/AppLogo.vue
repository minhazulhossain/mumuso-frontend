<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showTagline?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  showTagline: false,
})

const settings = inject('settings')

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
    xl: 'h-16',
  }
  return sizes[props.size]
})
</script>

<template>
  <div class="flex items-center gap-3">
    <!-- Logo Images -->
    <template v-if="settings?.branding.logo">
      <img
          :src="settings.branding.logo"
          :alt="settings.site.name"
          :class="[sizeClasses, 'w-auto dark:hidden']"
      >
      <img
          v-if="settings.branding.logo_dark"
          :src="settings.branding.logo_dark"
          :alt="settings.site.name"
          :class="[sizeClasses, 'w-auto hidden dark:block']"
      >
      <img
          v-else
          :src="settings.branding.logo"
          :alt="settings.site.name"
          :class="[sizeClasses, 'w-auto hidden dark:block']"
      >
    </template>

    <!-- Text Fallback -->
    <div v-else class="flex flex-col">
      <h1
          :class="[
          'font-bold',
          size === 'sm' ? 'text-lg' : '',
          size === 'md' ? 'text-xl' : '',
          size === 'lg' ? 'text-2xl' : '',
          size === 'xl' ? 'text-3xl' : '',
        ]"
      >
        {{ settings?.site.name || 'My Website' }}
      </h1>
      <p
          v-if="showTagline && settings?.site.tagline"
          class="text-sm text-gray-600 dark:text-gray-400"
      >
        {{ settings.site.tagline }}
      </p>
    </div>
  </div>
</template>