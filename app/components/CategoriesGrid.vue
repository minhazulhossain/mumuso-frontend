<template>
    <pre>
      {{ items }}
    </pre>
</template>

<script setup lang="ts">

const { fetchCategories } = useContent()

const [items ] = await Promise.all([
  fetchCategories(),
])
</script>