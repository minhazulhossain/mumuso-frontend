<template>

  <div class="flex items-center justify-end">
    <UButton
        v-if="!user"
        to="/auth/login"
        size="sm"
        class="hidden sm:inline-flex uppercase text-gray-900 hover:text-primary-500"
        icon="i-heroicons-user"
        variant="ghost"
    >My Account</UButton>
    <UButton
        v-if="!user"
        to="/auth/login"
        size="sm"
        class="sm:hidden"
        icon="i-heroicons-user-circle"
        variant="ghost"
        aria-label="My Account"
    />

    <UDropdownMenu
        v-else
        :items="items"
        :ui="{ content: 'w-48 right-0' }"
        :popper="{ placement: 'bottom-end' }"
    >
      <UButton
          class="sm:w-auto"
          color="neutral"
          variant="outline"
          aria-label="Account menu"
      >
        <UAvatar
            v-if="avatarSrc"
            :src="avatarSrc"
            :alt="user?.name || 'User'"
            size="xs"
            class="sm:hidden"
        />
        <UIcon v-else name="i-heroicons-user-circle" class="sm:hidden text-lg" />
        <UAvatar
            v-if="avatarSrc"
            :src="avatarSrc"
            :alt="user?.name || 'User'"
            size="xs"
            class="hidden sm:inline-flex mr-2"
        />
        <span class="hidden sm:inline" :title="user?.name || ''">{{ displayName }}</span>
      </UButton>
    </UDropdownMenu>
  </div>


</template>



<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const {user, clear: clearSession} = useUserSession()

const avatarUrl = computed(() => user.value?.avatar || '')
const defaultAvatar = 'https://github.com/benjamincanac.png'
const avatarSrc = computed(() => avatarUrl.value || defaultAvatar)
const displayName = computed(() => {
  const name = user.value?.name || ''
  if (name.length <= 10) return name
  return `${name.slice(0, 10)}…`
})

const items = ref<DropdownMenuItem[][]>([
  [
    {
      label: displayName.value || user.value?.name,
      avatar: {
        src: avatarUrl.value || undefined
      },
      type: 'label'
    }
  ],
  [
    {
      label: 'Profile',
      icon: 'i-lucide-user',
      to: '/account'
    },
    {
      label: 'Orders',
      icon: 'i-lucide-shopping-bag',
      to: '/account/orders'
    },
    {
      label: 'Wishlist',
      icon: 'i-lucide-heart',
      to: '/wishlist'
    }
  ],
  [
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      onSelect() {
          logout()
      },
    }
  ]
])

async function logout() {
  await clearSession()
  await navigateTo('/auth/login')
}


</script>
