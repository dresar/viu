<template>
  <section
    id="sertifikat"
    class="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50"
  >
    <div class="container mx-auto">
      <div class="text-center mb-12" v-motion-fade>
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          <span class="text-gradient">Sertifikat</span> Saya
        </h2>
        <div class="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <div
          v-for="(cert, index) in certificates"
          :key="cert.id"
          class="bg-slate-800/50 rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/20"
          v-motion-slide-bottom
          :delay="index * 100"
        >
          <img
            v-if="cert.image"
            :src="cert.image"
            :alt="cert.title"
            class="w-full h-48 object-cover"
          />
          <div class="p-6">
            <h3 class="text-lg font-bold text-white mb-2">{{ cert.title }}</h3>
            <p class="text-purple-400 font-semibold mb-2">{{ cert.issuer }}</p>
            <p class="text-sm text-gray-400 mb-2">Terbit: {{ cert.issueDate }}</p>
            <p v-if="cert.expiryDate" class="text-sm text-gray-400 mb-2">Kadaluarsa: {{ cert.expiryDate }}</p>
            <a
              v-if="cert.url"
              :href="cert.url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 mt-4"
            >
              Verifikasi Sertifikat
              <Icon name="heroicons:arrow-top-right-on-square" class="w-4 h-4" />
            </a>
          </div>
        </div>
        
        <div v-if="certificates.length === 0" class="col-span-full text-center py-8 text-gray-400">
          Data sertifikat sedang dimuat...
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const certificates = ref([])

const fetchCertificates = async () => {
  try {
    certificates.value = await $fetch('/api/certificates')
  } catch (error) {
    console.error('Error fetching certificates:', error)
  }
}

onMounted(() => {
  fetchCertificates()
})
</script>
