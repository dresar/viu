<template>
  <section
    id="beranda"
    class="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
  >
    <!-- Animated Background Dots -->
    <div class="absolute inset-0 bg-dots opacity-20"></div>
    <div class="absolute inset-0">
      <div
        v-for="dot in animatedDots"
        :key="dot.id"
        class="absolute rounded-full animate-float"
        :style="{
          left: `${dot.left}%`,
          top: `${dot.top}%`,
          width: `${dot.size}px`,
          height: `${dot.size}px`,
          backgroundColor: dot.color,
          animationDelay: `${dot.delay}s`,
          animationDuration: `${dot.duration}s`,
        }"
      ></div>
    </div>

    <div class="container mx-auto relative z-10">
      <div class="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
        <!-- Left Column - Text Content -->
        <div class="text-center md:text-left" v-motion-slide-left>
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            <span class="block text-white">{{ heroData.nama?.split(' ')[0] || 'Eka Syarif' }}</span>
            <span class="block text-white">{{ heroData.nama?.split(' ').slice(1).join(' ') || 'Maulana' }}</span>
          </h1>
          
          <h2 class="text-2xl md:text-3xl font-bold mb-6 text-white">
            {{ heroData.jabatan || 'FULL STACK' }}
          </h2>

          <p class="text-lg md:text-xl mb-2 text-gray-300">
            Saya seorang
            <span class="text-purple-400 font-semibold"> {{ heroData.seorangApa || 'Web Development' }} |</span>
          </p>

          <p class="text-base md:text-lg text-gray-400 mb-8">
            {{ heroData.deskripsiSingkat || 'Selamat datang di portofolio saya.' }}
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 mb-8">
            <a
              v-if="heroData.cvUrl"
              :href="heroData.cvUrl"
              target="_blank"
              class="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg font-semibold text-white hover:from-purple-700 hover:to-purple-800 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/50"
            >
              <Icon name="heroicons:arrow-down-tray" class="w-5 h-5" />
              Unduh Resume
            </a>
            <button
              @click="scrollToProjects"
              class="px-6 py-3 border-2 border-orange-500 rounded-lg font-semibold text-orange-400 hover:bg-orange-500/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Icon name="heroicons:eye" class="w-5 h-5" />
              Lihat Karya
            </button>
          </div>

          <!-- Social Media Links -->
          <div class="flex justify-center md:justify-start gap-4">
            <a
              v-if="heroData.githubUrl"
              :href="heroData.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-full bg-slate-800 hover:bg-purple-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <Icon name="mdi:github" class="w-5 h-5" />
            </a>
            <a
              v-if="heroData.linkedinUrl"
              :href="heroData.linkedinUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-full bg-slate-800 hover:bg-purple-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Icon name="mdi:linkedin" class="w-5 h-5" />
            </a>
            <a
              v-if="heroData.instagramUrl"
              :href="heroData.instagramUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-full bg-slate-800 hover:bg-purple-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="Instagram"
            >
              <Icon name="mdi:instagram" class="w-5 h-5" />
            </a>
            <a
              v-if="heroData.facebookUrl"
              :href="heroData.facebookUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-full bg-slate-800 hover:bg-purple-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="Facebook"
            >
              <Icon name="mdi:facebook" class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Right Column - Image with Statistics -->
        <div class="relative" v-motion-slide-right>
          <div class="relative mx-auto max-w-sm">
            <!-- Profile Image Frame -->
            <div class="relative rounded-2xl border-2 border-white/20 p-2 bg-gradient-to-br from-purple-500/20 to-pink-500/20">
              <div class="rounded-xl overflow-hidden bg-slate-800">
                <img
                  :src="heroData.fotoFormal || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop'"
                  alt="Profile"
                  class="w-full h-auto object-cover"
                />
              </div>
            </div>

            <!-- Floating Statistics -->
            <div
              v-if="heroStats?.projects"
              class="absolute -top-4 -left-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-float"
            >
              <p class="text-sm font-semibold">{{ heroStats.projects }}+ Proyek Selesai</p>
            </div>
            <div
              v-if="heroStats?.experience"
              class="absolute -bottom-4 -right-4 bg-purple-500 text-white px-4 py-2 rounded-lg shadow-lg animate-float"
              style="animation-delay: 0.2s"
            >
              <p class="text-sm font-semibold">{{ heroStats.experience }}+ Tahun Pengalaman</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center" v-motion-fade>
        <div class="flex flex-col items-center gap-2 text-gray-400">
          <Icon name="heroicons:chevron-down" class="w-6 h-6 animate-bounce" />
          <span class="text-sm">Scroll</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const heroData = ref({})
const heroStats = ref(null)

// Generate animated dots for background
const colors = ['#fbbf24', '#f97316', '#10b981', '#a855f7', '#ef4444']
const animatedDots = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: Math.random() * 4 + 2,
  color: colors[Math.floor(Math.random() * colors.length)],
  delay: Math.random() * 3,
  duration: Math.random() * 3 + 2,
}))

const fetchHeroData = async () => {
  try {
    const data = await $fetch('/api/about')
    if (data) {
      heroData.value = data
      if (data.stats) {
        try {
          heroStats.value = typeof data.stats === 'string' ? JSON.parse(data.stats) : data.stats
        } catch {
          heroStats.value = { projects: 0, experience: 0 }
        }
      }
    }
  } catch (error) {
    console.error('Error fetching hero data:', error)
  }
}

const scrollToProjects = () => {
  const element = document.getElementById('proyek')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  fetchHeroData()
})
</script>
