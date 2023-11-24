<template>
  <div class="relative">
    <div :class="['absolute inset-0 flex items-center', 'gap-'+props.gap]" aria-hidden="true">
      <div class="w-full border-t border-gray-300" />
      <div class="w-full border-t border-gray-300" />
    </div>
    <div class="relative flex  justify-center">
      <span class="bg-transparent px-3 text-2xl font-semibold font-montserrat text-text-400">{{props.text}}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['text','gap'])
</script>

<style scoped>

</style>