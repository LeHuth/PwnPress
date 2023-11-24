<script setup lang="ts">
import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/auth'; // import the auth store we just created

const { authenticateUser, logUserOut } = useAuthStore(); // use authenticateUser action from  auth store

const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const user = ref({
  username: 'kminchelle',
  password: '0lelplR',
});
const router = useRouter();

const login = async () => {
  await authenticateUser(user.value); // call authenticateUser and pass the user object
  // redirect to homepage if user is authenticated
  if (authenticated) {
    await router.push('/dashboard');
  }
};
</script>

<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-white">
    <body class="h-full">
    ```
  -->
  <div class="flex min-h-full flex-1 justify-center px-4 pb-12 pt-24 sm:px-6 lg:px-8">
    <div class="w-full max-w-sm space-y-10">
      <div>
        <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      </div>
      <form class="space-y-6" action="#" method="POST">
        <div class="relative -space-y-px rounded-2xl shadow-sm">
          <div class="pointer-events-none absolute inset-0 z-10 rounded-2xl ring-1 ring-inset ring-gray-300" />
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input v-model="user.username" id="email-address" name="username" type="text" autocomplete="username" required="" class="relative block w-full rounded-t-2xl border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Email address" />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input v-model="user.password" id="password" name="password" type="password" autocomplete="current-password" required="" class="relative block w-full rounded-b-2xl border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Password" />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
            <label for="remember-me" class="ml-3 block text-sm leading-6 text-gray-900">Remember me</label>
          </div>

          <div class="text-sm leading-6">
            <a href="#" class="font-semibold text-accent-600 hover:text-accent-200">Forgot password?</a>
          </div>
        </div>

        <div>
<!--          <button type="submit" class="flex w-full justify-center rounded-md bg-primary-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>-->
          <TwButton v-if="!authenticated" @click="login()" sm class="bg-primary-400 hover:bg-primary-300 w-full text-bg-400">Sign in</TwButton>

        </div>
      </form>

    </div>
  </div>
</template>

<style scoped>

</style>