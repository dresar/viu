<template>
  <section
    id="pendidikan"
    class="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50"
  >
    <div class="container mx-auto">
      <div class="text-center mb-12" v-motion-fade>
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          <span class="text-gradient">Pendidikan</span> Saya
        </h2>
        <div class="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
      </div>

      <div class="max-w-4xl mx-auto space-y-6">
        <div
          v-for="(edu, index) in educations"
          :key="edu.id"
          class="bg-slate-800/50 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all"
          v-motion-slide-bottom
          :delay="index * 100"
        >
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
              <Icon name="heroicons:academic-cap" class="w-6 h-6 text-purple-400" />
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-bold text-white mb-1">{{ edu.degree }}</h3>
              <p class="text-purple-400 font-semibold mb-2">{{ edu.institution }}</p>
              <p v-if="edu.field" class="text-gray-400 mb-2">{{ edu.field }}</p>
              <p class="text-sm text-gray-500 mb-2">{{ edu.startDate }} - {{ edu.endDate || 'Sekarang' }}</p>
              <p v-if="edu.grade" class="text-sm text-gray-400">Nilai/IPK: {{ edu.grade }}</p>
              <p v-if="edu.description" class="text-gray-300 mt-3">{{ edu.description }}</p>
            </div>
          </div>
        </div>
        
        <div v-if="educations.length === 0" class="text-center py-8 text-gray-400">
          Data pendidikan sedang dimuat...
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const educations = ref([])

const fetchEducations = async () => {
  try {
    educations.value = await $fetch('/api/education')
  } catch (error) {
    console.error('Error fetching educations:', error)
  }
}

onMounted(() => {
  fetchEducations()
})
</script>
