<template>
    <div class="min-h-screen flex flex-col bg-white dark:bg-gray-950">
    <AppHeader />
    
    <main class="flex-1">
      <slot />
    </main>
    
    <AppFooter />
  </div>
</template>

<script setup>
// Global layout composables and setup can go here
const colorMode = useColorMode()

// You can add global layout logic here
// For example, managing authentication state, etc.
</script>