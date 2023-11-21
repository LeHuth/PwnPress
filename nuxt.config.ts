// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules:[
      '@nuxtjs/tailwindcss',
      'nuxt-headlessui',
      '@pinia/nuxt',
      '@pinia-plugin-persistedstate/nuxt',
      '@nuxt/image',
      '@nuxtjs/color-mode',
  ],
    colorMode: {
        classSuffix: ''
    },
    image: {
        // Options
    },
    tailwindcss: {
        cssPath: '~/assets/css/tailwind.css',
        configPath: 'tailwind.config.ts',
        viewer: true,
    },
    headlessui: {
        // Options
    },
    pinia: {
        // Options
    },
})
