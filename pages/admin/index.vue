<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">Dashboard</h1>
      <p class="text-gray-400">Ringkasan Portfolio</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-slate-800/50 rounded-lg p-6 border border-purple-500/20 hover:border-purple-500/50 transition-colors">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-400 text-sm mb-1">Total Proyek</p>
            <p class="text-3xl font-bold text-white">{{ stats.projects }}</p>
          </div>
          <div class="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <Icon name="heroicons:briefcase" class="w-6 h-6 text-purple-400" />
          </div>
        </div>
      </div>
      
      <div class="bg-slate-800/50 rounded-lg p-6 border border-purple-500/20 hover:border-purple-500/50 transition-colors">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-400 text-sm mb-1">Keahlian</p>
            <p class="text-3xl font-bold text-white">{{ stats.skills }}</p>
          </div>
          <div class="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
            <Icon name="heroicons:star" class="w-6 h-6 text-green-400" />
          </div>
        </div>
      </div>
      
      <div class="bg-slate-800/50 rounded-lg p-6 border border-purple-500/20 hover:border-purple-500/50 transition-colors">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-400 text-sm mb-1">Artikel Blog</p>
            <p class="text-3xl font-bold text-white">{{ stats.blogs }}</p>
          </div>
          <div class="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
            <Icon name="heroicons:document-text" class="w-6 h-6 text-blue-400" />
          </div>
        </div>
      </div>
      
      <div class="bg-slate-800/50 rounded-lg p-6 border border-purple-500/20 hover:border-purple-500/50 transition-colors">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-400 text-sm mb-1">Pesan Kontak</p>
            <p class="text-3xl font-bold text-white">{{ stats.messages }}</p>
            <p v-if="stats.unreadMessages > 0" class="text-xs text-red-400 mt-1">{{ stats.unreadMessages }} belum dibaca</p>
          </div>
          <div class="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
            <Icon name="heroicons:envelope" class="w-6 h-6 text-orange-400" />
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <NuxtLink
        to="/admin/projects"
        class="bg-slate-800/50 rounded-lg p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/20 group"
      >
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
            <Icon name="heroicons:briefcase" class="w-6 h-6 text-purple-400" />
          </div>
          <div class="flex-1">
            <h3 class="font-semibold text-white mb-1">Kelola Proyek</h3>
            <p class="text-sm text-gray-400">Tambah atau edit proyek portfolio</p>
          </div>
          <Icon name="heroicons:arrow-right" class="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
        </div>
      </NuxtLink>

      <NuxtLink
        to="/admin/blog"
        class="bg-slate-800/50 rounded-lg p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/20 group"
      >
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
            <Icon name="heroicons:document-text" class="w-6 h-6 text-blue-400" />
          </div>
          <div class="flex-1">
            <h3 class="font-semibold text-white mb-1">Kelola Blog</h3>
            <p class="text-sm text-gray-400">Tulis atau edit artikel blog</p>
          </div>
          <Icon name="heroicons:arrow-right" class="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
        </div>
      </NuxtLink>

      <NuxtLink
        to="/admin/contact"
        class="bg-slate-800/50 rounded-lg p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/20 group"
      >
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center group-hover:bg-orange-500/30 transition-colors relative">
            <Icon name="heroicons:envelope" class="w-6 h-6 text-orange-400" />
            <span v-if="stats.unreadMessages > 0" class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
              {{ stats.unreadMessages > 9 ? '9+' : stats.unreadMessages }}
            </span>
          </div>
          <div class="flex-1">
            <h3 class="font-semibold text-white mb-1">Pesan Kontak</h3>
            <p class="text-sm text-gray-400">Lihat pesan dari pengunjung</p>
          </div>
          <Icon name="heroicons:arrow-right" class="w-5 h-5 text-gray-400 group-hover:text-orange-400 transition-colors" />
        </div>
      </NuxtLink>
    </div>

    <!-- Recent Activity -->
    <div class="bg-slate-800/50 rounded-lg p-6 border border-purple-500/20">
      <h2 class="text-xl font-bold text-white mb-4">Aktivitas Terbaru</h2>
      <div class="space-y-3">
        <div
          v-for="activity in recentActivities"
          :key="activity.id"
          class="flex items-center gap-4 p-3 bg-slate-900/50 rounded-lg border border-gray-700/50"
        >
          <div class="w-10 h-10 rounded-lg flex items-center justify-center"
            :class="{
              'bg-purple-500/20': activity.type === 'project',
              'bg-blue-500/20': activity.type === 'blog',
              'bg-green-500/20': activity.type === 'skill',
              'bg-orange-500/20': activity.type === 'contact'
            }"
          >
            <Icon
              :name="activity.icon"
              class="w-5 h-5"
              :class="{
                'text-purple-400': activity.type === 'project',
                'text-blue-400': activity.type === 'blog',
                'text-green-400': activity.type === 'skill',
                'text-orange-400': activity.type === 'contact'
              }"
            />
          </div>
          <div class="flex-1">
            <p class="text-white text-sm">{{ activity.message }}</p>
            <p class="text-xs text-gray-500 mt-1">{{ activity.time }}</p>
          </div>
        </div>
        
        <div v-if="recentActivities.length === 0" class="text-center py-8 text-gray-400">
          Belum ada aktivitas
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const { token, initAuth } = useAuth()
const stats = ref({
  projects: 0,
  skills: 0,
  blogs: 0,
  messages: 0,
  unreadMessages: 0
})

const recentActivities = ref([])

const fetchStats = async () => {
  try {
    if (!token.value) return

    // Fetch all stats in parallel
    const [projects, skills, blogs, contacts] = await Promise.all([
      $fetch('/api/admin/projects', {
        headers: { Authorization: `Bearer ${token.value}` }
      }).catch(() => []),
      $fetch('/api/admin/skills', {
        headers: { Authorization: `Bearer ${token.value}` }
      }).catch(() => []),
      $fetch('/api/admin/blog', {
        headers: { Authorization: `Bearer ${token.value}` }
      }).catch(() => []),
      $fetch('/api/admin/contact', {
        headers: { Authorization: `Bearer ${token.value}` }
      }).catch(() => [])
    ])

    stats.value.projects = projects.length || 0
    stats.value.skills = skills.length || 0
    stats.value.blogs = blogs.length || 0
    stats.value.messages = contacts.length || 0
    stats.value.unreadMessages = contacts.filter(c => !c.read).length || 0

    // Generate recent activities
    const activities = []
    
    // Recent projects
    projects.slice(0, 3).forEach(p => {
      activities.push({
        id: `project-${p.id}`,
        type: 'project',
        icon: 'heroicons:briefcase',
        message: `Proyek "${p.title}" ${p.updatedAt ? 'diperbarui' : 'ditambahkan'}`,
        time: new Date(p.updatedAt || p.createdAt).toLocaleString('id-ID', { 
          day: 'numeric', 
          month: 'short', 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      })
    })

    // Recent blogs
    blogs.slice(0, 2).forEach(b => {
      activities.push({
        id: `blog-${b.id}`,
        type: 'blog',
        icon: 'heroicons:document-text',
        message: `Artikel "${b.title}" ${b.published ? 'dipublikasikan' : 'disimpan sebagai draft'}`,
        time: new Date(b.updatedAt || b.createdAt).toLocaleString('id-ID', { 
          day: 'numeric', 
          month: 'short', 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      })
    })

    // Recent contacts
    contacts.slice(0, 2).forEach(c => {
      activities.push({
        id: `contact-${c.id}`,
        type: 'contact',
        icon: 'heroicons:envelope',
        message: `Pesan baru dari ${c.name}`,
        time: new Date(c.createdAt).toLocaleString('id-ID', { 
          day: 'numeric', 
          month: 'short', 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      })
    })

    recentActivities.value = activities
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0, 5)

  } catch (error) {
    console.error('Error fetching stats:', error)
  }
}

onMounted(async () => {
  initAuth()
  
  // Wait a bit for token to be available
  await new Promise(resolve => setTimeout(resolve, 200))
  
  if (token.value) {
    fetchStats()
  }
})
</script>