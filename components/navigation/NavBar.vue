<template>
  <Disclosure as="nav" class="bg-bg-500" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex items-center">
          <div class="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">

              <button @click="changeColorMode()" type="button" class="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                <MoonIcon v-if="$colorMode.value === 'light'" class="h-5 w-5 text-text-200" aria-hidden="true" />
                <SunIcon v-else class="h-5 w-5 text-text-200" aria-hidden="true" />
              </button>
          </div>
        </div>
        <div class="my-auto">
          <TwButton v-if="!authenticated" @click="$router.push('/login')" sm class="bg-primary-400 hover:bg-primary-300">Login</TwButton>
          <TwButton v-if="authenticated" @click="logout()" sm class="bg-primary-400 hover:bg-primary-300">Log out</TwButton>
        </div>
      </div>
    </div>
  </Disclosure>
</template>

<script setup lang="ts">
  import { Disclosure } from '@headlessui/vue'
  import {SunIcon, MoonIcon} from '@heroicons/vue/20/solid'
  import {useAuthStore} from "~/store/auth.js";
  import {storeToRefs} from "pinia";
  const colorMode = useColorMode()
  const router = useRouter();
  const {  logUserOut } = useAuthStore(); // use authenticateUser action from  auth store

  const { authenticated } = storeToRefs(useAuthStore());
  const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
  ]
  const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
  ]

  const changeColorMode = () => {
    console.log(colorMode.value)
    if (colorMode.value === 'light') {
      colorMode.value = 'dark'
    } else {
      colorMode.value = 'light'
    }
  }
  const logout = async () => {
    logUserOut();
    await router.push('/login');
  };

</script>