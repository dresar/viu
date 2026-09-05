<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-purple-500/20"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 md:h-20">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <NuxtLink to="/" class="text-xl md:text-2xl font-bold text-gradient">
            Portfolio
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-1">
          <a
            v-for="item in navItems"
            :key="item.id"
            :href="item.href"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-purple-500/20 cursor-pointer"
            :class="activeSection === item.id ? 'bg-purple-500/30 text-purple-300' : 'text-gray-300 hover:text-white'"
            @click.prevent="scrollToSection(item.id)"
          >
            {{ item.label }}
          </a>
        </div>

        <!-- Dark Mode Toggle & Mobile Menu Button -->
        <div class="flex items-center space-x-4">
          <button
            @click="toggleDarkMode"
            class="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            <Icon
              :name="isDark ? 'heroicons:moon' : 'heroicons:sun'"
              class="w-5 h-5"
            />
          </button>

          <!-- Mobile Menu Button -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
            aria-label="Toggle menu"
          >
            <Icon
              :name="mobileMenuOpen ? 'heroicons:x-mark' : 'heroicons:bars-3'"
              class="w-6 h-6"
            />
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div
        v-if="mobileMenuOpen"
        class="md:hidden py-4 space-y-2"
      >
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="item.href"
          class="block px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
          :class="activeSection === item.id ? 'bg-purple-500/30 text-purple-300' : 'text-gray-300 hover:bg-purple-500/20 hover:text-white'"
          @click.prevent="scrollToSection(item.id); mobileMenuOpen = false"
        >
          {{ item.label }}
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
const isDark = ref(true)
const mobileMenuOpen = ref(false)
const activeSection = ref('beranda')

const navItems = [
  { id: 'beranda', label: 'Beranda', href: '#beranda' },
  { id: 'tentang', label: 'Tentang Saya', href: '#tentang' },
  { id: 'pendidikan', label: 'Pendidikan', href: '#pendidikan' },
  { id: 'keahlian', label: 'Keahlian', href: '#keahlian' },
  { id: 'proyek', label: 'Proyek', href: '#proyek' },
  { id: 'pengalaman', label: 'Pengalaman', href: '#pengalaman' },
  { id: 'sertifikat', label: 'Sertifikat', href: '#sertifikat' },
  { id: 'blog', label: 'Blog', href: '#blog' },
  { id: 'kontak', label: 'Kontak', href: '#kontak' },
]

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const scrollToSection = (sectionId) => {
  if (!process.client) return
  
  // Remove # from sectionId if present
  const id = typeof sectionId === 'string' ? sectionId.replace('#', '') : sectionId
  
  // Use requestAnimationFrame for better performance
  requestAnimationFrame(() => {
    const element = document.getElementById(id)
    
    if (element) {
      const offset = 100 // Navbar height + padding
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - offset

      // Immediate scroll without delay
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      
      // Update URL hash
      history.pushState(null, null, `#${id}`)
    } else {
      // Fallback: try scrolling after a short delay (for dynamic content)
      setTimeout(() => {
        const retryElement = document.getElementById(id)
        if (retryElement) {
          const offset = 100
          const elementPosition = retryElement.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = elementPosition - offset
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
          history.pushState(null, null, `#${id}`)
        }
      }, 100)
    }
  })
}

onMounted(() => {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  }

  // Track active section on scroll (throttled for performance)
  let scrollTimeout = null
  const handleScroll = () => {
    if (scrollTimeout) return
    scrollTimeout = setTimeout(() => {
      const sections = navItems.map(item => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 100

      sections.forEach((section, index) => {
        if (section) {
          const offsetTop = section.offsetTop
          const offsetHeight = section.offsetHeight
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            activeSection.value = navItems[index].id
          }
        }
      })
      scrollTimeout = null
    }, 50) // Throttle to 50ms
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    if (scrollTimeout) clearTimeout(scrollTimeout)
  })
})
</script>
