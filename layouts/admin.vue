<template>
  <div class="min-h-screen bg-slate-900 flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-slate-800 border-r border-purple-500/20 min-h-screen flex-shrink-0 overflow-y-auto sticky top-0">
      <div class="p-6">
        <div class="flex items-center gap-3 mb-8">
          <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
            <Icon name="heroicons:shield-check" class="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 class="text-xl font-bold text-white">Admin Panel</h1>
            <p class="text-xs text-gray-400">Portfolio CMS</p>
          </div>
        </div>
        
        <nav class="space-y-4">
          <!-- Dashboard -->
          <a
            @click.prevent="navigateTo('/admin')"
            class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mb-2 cursor-pointer"
            :class="$route.path === '/admin' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'text-gray-300 hover:bg-slate-700'"
          >
            <Icon name="heroicons:squares-2x2" class="w-5 h-5" />
            <span class="font-medium">Dashboard</span>
          </a>

          <!-- Portfolio Sections -->
          <div>
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-4">Portfolio</p>
            <div class="space-y-1">
              <a
                @click.prevent="navigateTo('/admin/about')"
                class="flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm cursor-pointer"
                :class="$route.path === '/admin/about' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'text-gray-300 hover:bg-slate-700'"
              >
                <Icon name="heroicons:user-circle" class="w-4 h-4" />
                Tentang Saya
              </a>
              
              <a
                @click.prevent="navigateTo('/admin/education')"
                class="flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm cursor-pointer"
                :class="$route.path === '/admin/education' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'text-gray-300 hover:bg-slate-700'"
              >
                <Icon name="heroicons:academic-cap" class="w-4 h-4" />
                Pendidikan
              </a>
              
              <a
                @click.prevent="navigateTo('/admin/skills')"
                class="flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm cursor-pointer"
                :class="$route.path === '/admin/skills' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'text-gray-300 hover:bg-slate-700'"
              >
                <Icon name="heroicons:star" class="w-4 h-4" />
                Keahlian
              </a>
              
              <a
                @click.prevent="navigateTo('/admin/projects')"
                class="flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm cursor-pointer"
                :class="$route.path === '/admin/projects' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'text-gray-300 hover:bg-slate-700'"
              >
                <Icon name="heroicons:briefcase" class="w-4 h-4" />
                Proyek
              </a>
              
              <a
                @click.prevent="navigateTo('/admin/experience')"
                class="flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm cursor-pointer"
                :class="$route.path === '/admin/experience' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'text-gray-300 hover:bg-slate-700'"
              >
                <Icon name="heroicons:building-office" class="w-4 h-4" />
                Pengalaman
              </a>
              
              <a
                @click.prevent="navigateTo('/admin/certificates')"
                class="flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm cursor-pointer"
                :class="$route.path === '/admin/certificates' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'text-gray-300 hover:bg-slate-700'"
              >
                <Icon name="heroicons:trophy" class="w-4 h-4" />
                Sertifikat
              </a>
            </div>
          </div>

          <!-- Content Management -->
          <div>
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-4">Content</p>
            <div class="space-y-1">
              <a
                @click.prevent="navigateTo('/admin/blog')"
                class="flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm cursor-pointer"
                :class="$route.path === '/admin/blog' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'text-gray-300 hover:bg-slate-700'"
              >
                <Icon name="heroicons:document-text" class="w-4 h-4" />
                Blog
              </a>
              
              <a
                @click.prevent="navigateTo('/admin/contact')"
                class="flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm cursor-pointer"
                :class="$route.path === '/admin/contact' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' : 'text-gray-300 hover:bg-slate-700'"
              >
                <Icon name="heroicons:envelope" class="w-4 h-4" />
                <span>Kontak</span>
                <span v-if="unreadCount > 0" class="ml-auto px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">{{ unreadCount }}</span>
              </a>
            </div>
          </div>
        </nav>
      </div>
      
      <div class="p-6 border-t border-gray-700 space-y-2">
        <NuxtLink
          to="/"
          target="_blank"
          class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-300 hover:bg-slate-700 transition-colors text-sm"
        >
          <Icon name="heroicons:globe-alt" class="w-4 h-4" />
          Lihat Website
        </NuxtLink>
        <button
          @click="handleLogout"
          class="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-colors text-sm"
        >
          <Icon name="heroicons:arrow-right-on-rectangle" class="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 min-h-screen overflow-x-hidden">
      <div class="p-8">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
const { logout, isAuthenticated, token, initAuth } = useAuth()
const router = useRouter()
const unreadCount = ref(0)

onMounted(() => {
  // Initialize auth first
  initAuth()
  
  // Check auth after a small delay to allow state to sync
  setTimeout(() => {
    if (!isAuthenticated.value) {
      // Double check localStorage
      if (process.client && !localStorage.getItem('token')) {
        router.push('/login')
      }
    } else {
      fetchUnreadCount()
    }
  }, 100)
})

const fetchUnreadCount = async () => {
  try {
    if (token.value) {
      const contacts = await $fetch('/api/admin/contact', {
        headers: { Authorization: `Bearer ${token.value}` }
      })
      unreadCount.value = contacts.filter(c => !c.read).length
    }
  } catch (error) {
    console.error('Error fetching unread count:', error)
  }
}

const handleLogout = () => {
  logout()
}
</script>