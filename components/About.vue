<template>
  <section
    id="tentang"
    class="py-20 px-4 sm:px-6 lg:px-8 relative"
  >
    <div class="container mx-auto">
      <div class="text-center mb-12" v-motion-fade>
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          Tentang <span class="text-gradient">Saya</span>
        </h2>
        <div class="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
      </div>

      <div v-if="about" class="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
        <!-- Image -->
        <div class="relative" v-motion-slide-left>
          <div class="relative rounded-2xl overflow-hidden border-2 border-purple-500/30">
            <img
              :src="about.fotoNonFormal || about.fotoFormal || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop'"
              alt="About Me"
              class="w-full h-auto object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"></div>
          </div>
        </div>

        <!-- Content -->
        <div class="space-y-6" v-motion-slide-right>
          <div>
            <h3 v-if="about.nama" class="text-2xl font-bold text-white mb-2">{{ about.nama }}</h3>
            <p v-if="about.jabatan" class="text-xl text-purple-400 font-semibold mb-4">{{ about.jabatan }}</p>
            <p v-if="about.seorangApa" class="text-lg text-gray-300 mb-4">{{ about.seorangApa }}</p>
            
            <div v-if="about.deskripsiSingkat" class="text-lg text-gray-300 mb-4">
              {{ about.deskripsiSingkat }}
            </div>
            
            <div v-if="about.deskripsi" class="text-gray-300 prose prose-invert max-w-none" v-html="about.deskripsi"></div>
            
            <!-- Contact Info -->
            <div v-if="about.email || about.telepon || about.alamat" class="mt-6 space-y-2">
              <p v-if="about.email" class="text-sm text-gray-400 flex items-center gap-2">
                <Icon name="heroicons:envelope" class="w-4 h-4" />
                {{ about.email }}
              </p>
              <p v-if="about.telepon" class="text-sm text-gray-400 flex items-center gap-2">
                <Icon name="heroicons:phone" class="w-4 h-4" />
                {{ about.telepon }}
              </p>
              <p v-if="about.alamat" class="text-sm text-gray-400 flex items-center gap-2">
                <Icon name="heroicons:map-pin" class="w-4 h-4" />
                {{ about.alamat }}
              </p>
            </div>

            <!-- Social Links -->
            <div v-if="hasSocialMedia" class="flex gap-4 mt-6">
              <a
                v-if="about.githubUrl"
                :href="about.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 rounded-full bg-slate-800 hover:bg-purple-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <Icon name="mdi:github" class="w-5 h-5" />
              </a>
              <a
                v-if="about.linkedinUrl"
                :href="about.linkedinUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 rounded-full bg-slate-800 hover:bg-purple-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Icon name="mdi:linkedin" class="w-5 h-5" />
              </a>
              <a
                v-if="about.instagramUrl"
                :href="about.instagramUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 rounded-full bg-slate-800 hover:bg-purple-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Icon name="mdi:instagram" class="w-5 h-5" />
              </a>
              <a
                v-if="about.facebookUrl"
                :href="about.facebookUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="w-10 h-10 rounded-full bg-slate-800 hover:bg-purple-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Icon name="mdi:facebook" class="w-5 h-5" />
              </a>
            </div>
            
            <!-- Stats -->
            <div v-if="stats" class="grid grid-cols-2 gap-4 pt-6">
              <div class="bg-slate-800/50 rounded-lg p-4 border border-purple-500/20">
                <div class="text-3xl font-bold text-purple-400 mb-1">{{ stats.projects || 0 }}+</div>
                <div class="text-sm text-gray-400">Proyek Selesai</div>
              </div>
              <div class="bg-slate-800/50 rounded-lg p-4 border border-purple-500/20">
                <div class="text-3xl font-bold text-green-400 mb-1">{{ stats.experience || 0 }}+</div>
                <div class="text-sm text-gray-400">Tahun Pengalaman</div>
              </div>
              <div v-if="stats.courses" class="bg-slate-800/50 rounded-lg p-4 border border-purple-500/20">
                <div class="text-3xl font-bold text-blue-400 mb-1">{{ stats.courses || 0 }}+</div>
                <div class="text-sm text-gray-400">Kursus Khusus</div>
              </div>
              <div v-if="stats.clients" class="bg-slate-800/50 rounded-lg p-4 border border-purple-500/20">
                <div class="text-3xl font-bold text-orange-400 mb-1">{{ stats.clients || 0 }}+</div>
                <div class="text-sm text-gray-400">Klien Puas</div>
              </div>
            </div>

            <!-- CV Download -->
            <div v-if="about.cvUrl" class="mt-6">
              <a
                :href="about.cvUrl"
                target="_blank"
                class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg font-semibold text-white hover:from-purple-700 hover:to-purple-800 transition-all duration-300"
              >
                <Icon name="heroicons:arrow-down-tray" class="w-5 h-5" />
                Unduh CV/Resume
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="text-center py-12 text-gray-400">
        Data sedang dimuat...
      </div>
    </div>
  </section>
</template>

<script setup>
const about = ref(null)

const stats = computed(() => {
  if (!about.value?.stats) return null
  try {
    return typeof about.value.stats === 'string' 
      ? JSON.parse(about.value.stats) 
      : about.value.stats
  } catch {
    return null
  }
})

const hasSocialMedia = computed(() => {
  return about.value && (
    about.value.githubUrl ||
    about.value.linkedinUrl ||
    about.value.facebookUrl ||
    about.value.instagramUrl
  )
})

const fetchAbout = async () => {
  try {
    about.value = await $fetch('/api/about')
  } catch (error) {
    console.error('Error fetching about:', error)
  }
}

onMounted(() => {
  fetchAbout()
})
</script>