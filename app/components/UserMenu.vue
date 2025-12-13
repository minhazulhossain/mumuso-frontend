<template>

  <div>
    <UButton v-if="!user"
             to="/auth/login"
             size="sm"
             class="hidden sm:inline-flex uppercase"
             icon="i-heroicons-user"
             variant="ghost"
    >My Account</UButton>


    <UDropdownMenu v-else
        :items="items"
        :ui="{
      content: 'w-48'
    }"
    >

      <UButton :label="user?.name" icon="i-lucide-menu" color="neutral" variant="outline" />
    </UDropdownMenu>

  </div>


</template>



<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const {user, clear: clearSession} = useUserSession()

const items = ref<DropdownMenuItem[][]>([
  [
    {
      label: user.value?.name,
      avatar: {
        src: 'https://github.com/benjamincanac.png'
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
      label: 'Billing',
      icon: 'i-lucide-credit-card'
    },
    {
      label: 'Settings',
      icon: 'i-lucide-cog',
      kbds: [',']
    }
  ],
  [
    {
      label: 'Team',
      icon: 'i-lucide-users'
    },
    {
      label: 'Invite users',
      icon: 'i-lucide-user-plus',
      children: [
        [
          {
            label: 'Email',
            icon: 'i-lucide-mail'
          },
          {
            label: 'Message',
            icon: 'i-lucide-message-square'
          }
        ],
        [
          {
            label: 'More',
            icon: 'i-lucide-circle-plus'
          }
        ]
      ]
    },
    {
      label: 'New team',
      icon: 'i-lucide-plus',
      kbds: ['meta', 'n']
    }
  ],
  [
    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      to: 'https://github.com/nuxt/ui',
      target: '_blank'
    },
    {
      label: 'Support',
      icon: 'i-lucide-life-buoy',
      to: '/'
    },
    {
      label: 'API',
      icon: 'i-lucide-cloud',
      disabled: true
    }
  ],
  [
    {
      label: 'Logout',
      icon: 'i-lucide-log-out',
      onSelect(e) {
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