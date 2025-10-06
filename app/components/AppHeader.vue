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

        <!-- Right side actions -->
        <div class="flex items-center space-x-3">


          <!-- Theme toggle -->
          <UButton
              :icon="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
              color="gray"
              variant="ghost"
              size="sm"
              @click="toggleColorMode"
          />

          <!-- CTA Button -->
          <UserMenu/>

          <CartSidebar/>

          <!-- Mobile menu button -->
          <LazyMobileMenu/>
        </div>
      </div>
      <HeaderDesktop />
    </UContainer>
  </header>
</template>

<script setup>
import {useCart} from "~/composables/useCart.js";

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

</script>