<template>
  <section
    id="keahlian"
    class="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50"
  >
    <div class="container mx-auto">
      <div class="text-center mb-12" v-motion-fade>
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          <span class="text-gradient">Keahlian</span> & Teknologi
        </h2>
        <div class="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
        <p class="mt-4 text-gray-400 max-w-2xl mx-auto">
          Teknologi dan tools yang saya gunakan dalam pengembangan aplikasi
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        <div
          v-for="(skill, index) in skills"
          :key="skill.name"
          class="bg-slate-800/50 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
          v-motion-slide-bottom
          :delay="index * 50"
        >
          <div class="flex flex-col items-center text-center space-y-3">
            <div class="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
              <Icon :name="skill.icon" class="w-8 h-8 text-purple-400" />
            </div>
            <h3 class="font-semibold text-white">{{ skill.name }}</h3>
            <div class="w-full bg-slate-700 rounded-full h-2">
              <div
                class="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                :style="{ width: `${skill.level}%` }"
              ></div>
            </div>
            <span class="text-xs text-gray-400">{{ skill.level }}%</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const skills = ref([])

const fetchSkills = async () => {
  try {
    skills.value = await $fetch('/api/skills')
  } catch (error) {
    console.error('Error fetching skills:', error)
  }
}

onMounted(() => {
  fetchSkills()
})
</script>
