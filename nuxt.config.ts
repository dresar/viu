// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-12-05',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@vueuse/motion/nuxt'
  ],
  css: ['~/assets/css/main.css'],
  nitro: {
    experimental: {
      wasm: true
    }
  },
  vite: {
    optimizeDeps: {
      include: ['@vueup/vue-quill', 'quill']
    },
    server: {
      fs: {
        strict: false
      }
    }
  },
  build: {
    transpile: ['@vueup/vue-quill']
  },
  app: {
    head: {
      title: 'Portfolio - Personal Website',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Personal Portfolio Website' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})
