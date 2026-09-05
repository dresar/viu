<template>
  <section
    id="pengalaman"
    class="py-20 px-4 sm:px-6 lg:px-8"
  >
    <div class="container mx-auto">
      <div class="text-center mb-12" v-motion-fade>
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          <span class="text-gradient">Pengalaman</span> Kerja
        </h2>
        <div class="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
      </div>

      <div class="max-w-4xl mx-auto space-y-6">
        <div
          v-for="(exp, index) in experiences"
          :key="exp.id"
          class="bg-slate-800/50 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all relative"
          v-motion-slide-bottom
          :delay="index * 100"
        >
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
              <Icon name="heroicons:briefcase" class="w-6 h-6 text-orange-400" />
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-bold text-white mb-1">{{ exp.position }}</h3>
              <p class="text-purple-400 font-semibold mb-2">{{ exp.company }}</p>
              <p v-if="exp.location" class="text-gray-400 text-sm mb-2">{{ exp.location }}</p>
              <p class="text-sm text-gray-500 mb-3">{{ exp.startDate }} - {{ exp.endDate || (exp.current ? 'Sekarang' : '') }}</p>
              <p class="text-gray-300 leading-relaxed">{{ exp.description }}</p>
            </div>
          </div>
        </div>
        
        <div v-if="experiences.length === 0" class="text-center py-8 text-gray-400">
          Data pengalaman sedang dimuat...
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const experiences = ref([])

const fetchExperiences = async () => {
  try {
    experiences.value = await $fetch('/api/experience')
  } catch (error) {
    console.error('Error fetching experiences:', error)
  }
}

onMounted(() => {
  fetchExperiences()
})
</script>
