<template>
  <section
    id="blog"
    class="py-20 px-4 sm:px-6 lg:px-8"
  >
    <div class="container mx-auto">
      <div class="text-center mb-12" v-motion-fade>
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          <span class="text-gradient">Blog</span> Terbaru
        </h2>
        <div class="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <div
          v-for="(blog, index) in blogs"
          :key="blog.id"
          class="bg-slate-800/50 rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/20 group"
          v-motion-slide-bottom
          :delay="index * 100"
        >
          <img
            v-if="blog.image"
            :src="blog.image"
            :alt="blog.title"
            class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div class="p-6">
            <h3 class="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
              {{ blog.title }}
            </h3>
            <p v-if="blog.excerpt" class="text-gray-400 mb-4 line-clamp-2">{{ blog.excerpt }}</p>
            <p class="text-sm text-gray-500 mb-4">
              {{ new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }) }}
            </p>
            <NuxtLink
              :to="`/blog/${blog.slug}`"
              class="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold"
            >
              Baca Selengkapnya
              <Icon name="heroicons:arrow-right" class="w-4 h-4" />
            </NuxtLink>
          </div>
        </div>
        
        <div v-if="blogs.length === 0" class="col-span-full text-center py-8 text-gray-400">
          Belum ada artikel blog
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const blogs = ref([])

const fetchBlogs = async () => {
  try {
    blogs.value = await $fetch('/api/blog')
  } catch (error) {
    console.error('Error fetching blogs:', error)
  }
}

onMounted(() => {
  fetchBlogs()
})
</script>
