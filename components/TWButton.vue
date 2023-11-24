<script setup lang="ts">
const props = defineProps({
  md: {
    type: Boolean,
    default: false
  },
  sm: {
    type: Boolean,
    default: false
  },
  lg: {
    type: Boolean,
    default: false
  },
  xl: {
    type: Boolean,
    default: false
  },
})

const size = computed(() => {
  if (props.md) return 'md'
  if (props.sm) return 'sm'
  if (props.lg) return 'lg'
  if (props.xl) return 'xl'
  return 'md'
})
</script>

<template>
  <button v-if="size==='sm'" type="button" class="rounded-2xl flex justify-center transition px-5 leading-none text-sm shadow-sm font-roboto font-light min-w-[86px] h-8"><span class="flex items-center"><slot/></span></button>
  <button v-else-if="size==='md'" type="button" class="rounded-2xl flex justify-center transition px-3.5 py-2.5 leading-none text-xl shadow-sm font-roboto font-medium w-32 h-12"><span class="flex items-center"><slot/></span></button>
  <button v-else-if="size==='lg'" type="button" class="rounded-2xl flex justify-center transition px-3.5 py-2.5 leading-none text-xl shadow-sm font-roboto font-medium w-44 h-16"><span class="flex items-center"><slot/></span></button>
</template>

<style scoped>

</style>