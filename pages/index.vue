<script setup lang="ts">
const colorMode = useColorMode()
colorMode.preference = 'dark'
//https://unpkg.com/browse/@heroicons/vue@2.0.18/
</script>

<template >
  <div class="bg-background-400 h-full">
    <TwButton lg class="bg-primary-400 active:bg-primary-500 hover:bg-primary-300 text-bg-400 w-44 h-16">Button</TwButton>
    <TwButton class="bg-secondary-400 active:bg-secondary-500 hover:bg-secondary-300 text-text-400">Button</TwButton>
    <TwButton sm class="bg-accent-400 active:bg-accent-500 hover:bg-accent-300 text-bg-400">Button</TwButton>

  </div>
</template>

<style scoped>

</style>