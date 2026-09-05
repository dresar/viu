<template>
  <div class="bg-slate-800/50 rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 group">
    <!-- Thumbnail -->
    <div class="relative overflow-hidden h-48">
      <img
        :src="project.image"
        :alt="project.title"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>

    <!-- Content -->
    <div class="p-6">
      <h3 class="text-xl font-bold mb-2 text-white group-hover:text-purple-400 transition-colors">
        {{ project.title }}
      </h3>
      <p class="text-gray-400 text-sm mb-4 line-clamp-3">
        {{ project.description }}
      </p>

      <!-- Tags -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="tag in project.tags"
          :key="tag"
          class="px-3 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30"
        >
          {{ tag }}
        </span>
      </div>

      <!-- Links -->
      <div class="flex gap-4">
        <a
          :href="project.demoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg text-sm font-semibold text-white hover:from-purple-700 hover:to-purple-800 transition-all duration-300 flex-1 justify-center"
        >
          <Icon name="heroicons:globe-alt" class="w-4 h-4" />
          Demo
        </a>
        <a
          :href="project.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg text-sm font-semibold text-gray-300 hover:border-purple-500 hover:text-purple-400 transition-all duration-300"
        >
          <Icon name="mdi:github" class="w-4 h-4" />
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true,
  },
})
</script>
