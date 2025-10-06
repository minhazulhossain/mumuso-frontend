<template>
  <header
      class="sticky top-0 z-50 bg-white/75 dark:bg-gray-950/75 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
    <UContainer>
      <div class="flex items-center justify-between h-16">
        <!-- Logo/Brand -->
        <div class="flex items-center space-x-4">
          <NuxtLink to="/" class="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div
                class="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <UIcon name="i-heroicons-cube" class="w-5 h-5 text-white"/>
            </div>
            <span class="text-xl font-bold text-gray-900 dark:text-white">Herlan</span>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <NuxtLink
              v-for="item in navigation"
              :key="item.name"
              :to="item.to"
              class="relative text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors group"
              :class="{ 'text-primary-600 dark:text-primary-400': isActiveRoute(item.to) }"
          >
            {{ item.name }}
            <span
                v-if="isActiveRoute(item.to)"
                class="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-500 rounded-full"
            />
          </NuxtLink>
        </nav>

        <!-- Right side actions -->
        <div class="flex items-center space-x-3">
          <!-- Search Button -->
<!--          <UButton-->
<!--              icon="i-heroicons-magnifying-glass"-->
<!--              color="gray"-->
<!--              variant="ghost"-->
<!--              size="sm"-->
<!--              class="hidden sm:inline-flex"-->
<!--              @click="openSearch"-->
<!--          />-->
        <GlobalSearch />
          <!-- Theme toggle -->
          <UButton
              :icon="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
              color="gray"
              variant="ghost"
              size="sm"
              @click="toggleColorMode"
          />

          <!-- CTA Button -->
          <UserMenu />


                      <CartSidebar />


          <!-- Mobile menu button -->
          <LazyMobileMenu />
        </div>
      </div>

    </UContainer>
  </header>
</template>

<script setup>
import {useCart} from "~/composables/useCart.js";
import GlobalSearch from "./GlobalSearch.vue";

const colorMode = useColorMode()
const route = useRoute()
const {cartItemsCount, toggleCart} = useCart()

const isDark = computed(() => colorMode.value === 'dark')

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const openSearch = () => {

}

const isActiveRoute = (path) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}

const navigation = [
  {
    name: 'Home',
    to: '/',
    icon: 'i-heroicons-home'
  },
  {
    name: 'Shop',
    to: '/shop',
    icon: 'i-heroicons-information-circle'
  },
  {
    name: 'Services',
    to: '/',
    icon: 'i-heroicons-briefcase'
  },
  {
    name: 'Blog',
    to: '/blog',
    icon: 'i-heroicons-document-text'
  },
  {
    name: 'Contact',
    to: '/',
    icon: 'i-heroicons-envelope'
  }
]

// Close mobile menu when route changes
watch(() => route.path, () => {
  isMenuOpen.value = false
})
</script>