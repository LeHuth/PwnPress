<script setup lang="ts">

import NavBar from "~/components/navigation/NavBar.vue";
</script>

<template>
  <div class="h-full">
    <NavBar class="absolute w-full"/>
    <div class="min-h-full pt-16 flex">
      <slot></slot>
    </div>
  </div>
</template>

<style>

</style>