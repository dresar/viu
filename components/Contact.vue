<template>
  <section
    id="kontak"
    class="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50"
  >
    <div class="container mx-auto max-w-4xl">
      <div class="text-center mb-12" v-motion-fade>
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          <span class="text-gradient">Kontak</span> Saya
        </h2>
        <div class="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
        <p class="mt-4 text-gray-400 max-w-2xl mx-auto">
          Tertarik untuk berkolaborasi? Mari kita berdiskusi!
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-8">
        <!-- Contact Info -->
        <div class="space-y-6" v-motion-slide-left>
          <div>
            <h3 class="text-xl font-semibold mb-4 text-white">Informasi Kontak</h3>
            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Icon name="heroicons:envelope" class="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p class="text-sm text-gray-400">Email</p>
                  <p class="text-white font-medium">contact@example.com</p>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Icon name="heroicons:phone" class="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p class="text-sm text-gray-400">Phone</p>
                  <p class="text-white font-medium">+62 812 3456 7890</p>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Icon name="heroicons:map-pin" class="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p class="text-sm text-gray-400">Location</p>
                  <p class="text-white font-medium">Jakarta, Indonesia</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Social Links -->
          <div>
            <h3 class="text-xl font-semibold mb-4 text-white">Media Sosial</h3>
            <div class="flex gap-4">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="w-12 h-12 rounded-lg bg-slate-800 hover:bg-purple-600 flex items-center justify-center transition-all duration-300 hover:scale-110 border border-purple-500/20 hover:border-purple-500"
                :aria-label="social.name"
              >
                <Icon :name="social.icon" class="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="bg-slate-800/50 rounded-xl p-6 border border-purple-500/20" v-motion-slide-right>
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-300 mb-2">
                Nama
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="Nama Anda"
              />
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label for="message" class="block text-sm font-medium text-gray-300 mb-2">
                Pesan
              </label>
              <textarea
                id="message"
                v-model="form.message"
                required
                rows="5"
                class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                placeholder="Tulis pesan Anda di sini..."
              ></textarea>
            </div>
            <button
              type="submit"
              class="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg font-semibold text-white hover:from-purple-700 hover:to-purple-800 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Icon name="heroicons:paper-airplane" class="w-5 h-5" />
              Kirim Pesan
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const form = ref({
  name: '',
  email: '',
  message: '',
})

const socialLinks = [
  { name: 'LinkedIn', icon: 'mdi:linkedin', url: 'https://linkedin.com' },
  { name: 'GitHub', icon: 'mdi:github', url: 'https://github.com' },
  { name: 'Instagram', icon: 'mdi:instagram', url: 'https://instagram.com' },
  { name: 'Twitter', icon: 'mdi:twitter', url: 'https://twitter.com' },
]

const handleSubmit = async () => {
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: form.value
    })
    alert('Terima kasih! Pesan Anda telah dikirim.')
    form.value = { name: '', email: '', message: '' }
  } catch (error) {
    alert('Gagal mengirim pesan. Silakan coba lagi.')
  }
}
</script>
