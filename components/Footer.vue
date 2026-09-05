<template>
  <footer class="py-8 px-4 sm:px-6 lg:px-8 border-t border-purple-500/20 bg-slate-900/80">
    <div class="container mx-auto">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="text-center md:text-left">
          <p class="text-gray-400 text-sm">
            © {{ currentYear }} Portfolio. All rights reserved.
          </p>
        </div>
        <div class="flex gap-4">
          <a
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="w-10 h-10 rounded-lg bg-slate-800 hover:bg-purple-600 flex items-center justify-center transition-all duration-300 hover:scale-110 border border-purple-500/20 hover:border-purple-500"
            :aria-label="social.name"
          >
            <Icon :name="social.icon" class="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()

const socialLinks = [
  { name: 'LinkedIn', icon: 'mdi:linkedin', url: 'https://linkedin.com' },
  { name: 'GitHub', icon: 'mdi:github', url: 'https://github.com' },
  { name: 'Instagram', icon: 'mdi:instagram', url: 'https://instagram.com' },
  { name: 'Facebook', icon: 'mdi:facebook', url: 'https://facebook.com' },
]
</script>
