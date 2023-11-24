<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">

import {useAuthStore} from "~/store/auth";

const auth = useAuthStore()

</script>
