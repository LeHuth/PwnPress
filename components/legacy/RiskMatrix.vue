<template>
  <div class="grid grid-cols-2 gap-10 mx-auto" aria-label="Sidebar">
    <ul role="list" class="space-y-4">
      <li @click="selected_probability=index" v-for="(item, index) in probabilities" :key="item.name">
        <a :href="item.href" :class="[selected_probability === index ? 'bg-accent-400 text-secondary-400' : 'text-text-400 hover:bg-bg-300', 'group flex justify-center items-center gap-x-3 rounded-2xl p-1.5 h-8 text-base font-semibold transition']">{{ item.name }}</a>
      </li>
    </ul>
    <ul role="list" class=" space-y-4">
      <li @click="selected_damage=index" v-for="(item, index) in damages" :key="item.name">
        <a :href="item.href" :class="[selected_damage === index ? 'bg-accent-400 text-secondary-400' : 'text-text-400 hover:bg-bg-300', 'group flex justify-center items-center gap-x-3 rounded-2xl p-1.5 h-8 text-base font-semibold transition']">{{ item.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup>
const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Documents', href: '#', current: false },
  { name: 'Reports', href: '#', current: false },
]

const props = defineProps(['damages','probabilities'])
const selected_damage = ref(null)
const selected_probability = ref(null)

const emits = defineEmits(['damage_change', 'probability_change'])

watch(selected_damage,(value)=>{
  emits('damage_change', value)
})
watch(selected_probability,(value)=>{
  emits('probability_change', value)
})

</script>

<style scoped>

</style>