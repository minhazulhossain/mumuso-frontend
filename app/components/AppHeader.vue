<template>
  <header class="sticky top-0 z-50 bg-white/75 dark:bg-gray-950/75 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
    <UContainer>
      <div class="flex items-center justify-between h-16">
        <!-- Logo/Brand -->
        <div class="flex items-center space-x-4">
          <NuxtLink to="/" class="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <UIcon name="i-heroicons-cube" class="w-5 h-5 text-white" />
            </div>
            <span class="text-xl font-bold text-gray-900 dark:text-white">Mumuso</span>
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
          <UButton
            icon="i-heroicons-magnifying-glass"
            color="gray"
            variant="ghost"
            size="sm"
            class="hidden sm:inline-flex"
            @click="openSearch"
          />
          
          <!-- Theme toggle -->
          <UButton
            :icon="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
            color="gray"
            variant="ghost"
            size="sm"
            @click="toggleColorMode"
          />
          
          <!-- CTA Button -->
          <UButton
            to="/auth/login"
            color="primary"
            size="sm"
            class="hidden sm:inline-flex"
          >
            Login
          </UButton>

          <UButton
              icon="i-heroicons-shopping-cart"
              color="gray"
              variant="ghost"
              @click="toggleCart"
          >
            <template #trailing>
              <UBadge v-if="cartItemsCount > 0" color="primary" variant="solid">
                {{ cartItemsCount }}
              </UBadge>
            </template>
          </UButton>

          <!-- Mobile menu button -->
          <UButton
            :icon="isMenuOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'"
            color="gray"
            variant="ghost"
            size="sm"
            class="md:hidden"
            @click="toggleMobileMenu"
          />
        </div>
      </div>

      <!-- Mobile Navigation -->
      <!-- <USlideover v-model="isMenuOpen" side="right">
        <UCard class="flex flex-col flex-1" :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
          <template #header>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-6 h-6 bg-gradient-to-br from-primary-500 to-primary-600 rounded-md flex items-center justify-center">
                  <UIcon name="i-heroicons-cube" class="w-4 h-4 text-white" />
                </div>
                <span class="font-semibold">Navigation</span>
              </div>
              <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark" @click="isMenuOpen = false" />
            </div>
          </template>

          <nav class="space-y-1">
            <NuxtLink 
              v-for="item in navigation"
              :key="item.name"
              :to="item.to"
              class="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              :class="{ 'bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300': isActiveRoute(item.to) }"
              @click="isMenuOpen = false"
            >
              <UIcon :name="item.icon" class="w-4 h-4" />
              <span>{{ item.name }}</span>
            </NuxtLink>
          </nav>

          <template #footer>
            <div class="space-y-3">
              <UButton to="/contact" color="primary" block @click="isMenuOpen = false">
                Get Started
              </UButton>
              <div class="text-center">
                <UButton
                  :icon="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
                  :label="isDark ? 'Light Mode' : 'Dark Mode'"
                  color="gray"
                  variant="ghost"
                  block
                  @click="toggleColorMode"
                />
              </div>
            </div>
          </template>
        </UCard>
      </USlideover> -->
    </UContainer>
  </header>
</template>

<script setup>
import {useCart} from "~/composables/useCart.js";

const colorMode = useColorMode()
const route = useRoute()
const { cartItemsCount, toggleCart } = useCart()

const isDark = computed(() => colorMode.value === 'dark')
const isMenuOpen = ref(false)

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const toggleMobileMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const openSearch = () => {
  // You can implement search functionality here
  const toast = useToast()
  toast.add({ 
    title: 'Search', 
    description: 'Search functionality coming soon!',
    icon: 'i-heroicons-magnifying-glass'
  })
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
    name: 'About', 
    to: '/',
    icon: 'i-heroicons-information-circle'
  },
  { 
    name: 'Services', 
    to: '/',
    icon: 'i-heroicons-briefcase'
  },
  { 
    name: 'Blog', 
    to: '/',
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