<template>
  <section
    id="proyek"
    class="py-20 px-4 sm:px-6 lg:px-8"
  >
    <div class="container mx-auto">
      <div class="text-center mb-12" v-motion-fade>
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          <span class="text-gradient">Proyek</span> Terbaru
        </h2>
        <div class="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
        <p class="mt-4 text-gray-400 max-w-2xl mx-auto">
          Koleksi proyek yang telah saya kerjakan
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <ProjectCard
          v-for="(project, index) in projects"
          :key="project.id"
          :project="project"
          v-motion-slide-bottom
          :delay="index * 100"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
const projects = ref([])

const fetchProjects = async () => {
  try {
    projects.value = await $fetch('/api/projects')
  } catch (error) {
    console.error('Error fetching projects:', error)
  }
}

onMounted(() => {
  fetchProjects()
})
</script>
