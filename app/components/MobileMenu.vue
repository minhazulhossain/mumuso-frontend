<template>
  <USlideover v-model="isMenuOpen" side="right">

    <UButton
        :icon="isMenuOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'"
        color="secondary"
        variant="ghost"
        size="sm"
        class="md:hidden"
        @click="toggleMobileMenu"
    />
    <template #content>
      <UCard class="flex flex-col flex-1" :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-6 h-6 bg-gradient-to-br from-primary-500 to-primary-600 rounded-md flex items-center justify-center">
                <UIcon name="i-heroicons-cube" class="w-4 h-4 text-white" />
              </div>
              <span class="font-semibold">Navigation</span>
            </div>
            <UButton color="secondary" variant="ghost" icon="i-heroicons-x-mark" @click="isMenuOpen = false" />
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
    </template>
  </USlideover>
</template>
<script setup lang="ts">
const isMenuOpen = ref(false)
const toggleMobileMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>