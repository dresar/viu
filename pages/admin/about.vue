<template>
  <div>
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-white mb-2">Tentang Saya</h1>
        <p class="text-gray-400">Kelola informasi profil dan tentang saya</p>
      </div>
      <button
        v-if="!isEditing && aboutData"
        @click="isEditing = true"
        class="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold transition-colors flex items-center gap-2"
      >
        <Icon name="heroicons:pencil" class="w-5 h-5" />
        Edit Profil
      </button>
    </div>

    <!-- Preview Mode -->
    <div v-if="!isEditing && aboutData" class="space-y-6">
      <div class="bg-slate-800/50 rounded-lg p-6 border border-purple-500/20">
        <div class="grid md:grid-cols-2 gap-8">
          <!-- Left: Info -->
          <div class="space-y-4">
            <div>
              <label class="text-sm text-gray-400">Nama</label>
              <p class="text-lg font-semibold text-white">{{ aboutData.nama || '-' }}</p>
            </div>
            <div>
              <label class="text-sm text-gray-400">Jabatan</label>
              <p class="text-lg font-semibold text-white">{{ aboutData.jabatan || '-' }}</p>
            </div>
            <div>
              <label class="text-sm text-gray-400">Seorang Apa</label>
              <p class="text-white">{{ aboutData.seorangApa || '-' }}</p>
            </div>
            <div>
              <label class="text-sm text-gray-400">Email</label>
              <p class="text-white">{{ aboutData.email || '-' }}</p>
            </div>
            <div>
              <label class="text-sm text-gray-400">Telepon</label>
              <p class="text-white">{{ aboutData.telepon || '-' }}</p>
            </div>
            <div>
              <label class="text-sm text-gray-400">WhatsApp</label>
              <p class="text-white">{{ aboutData.whatsapp || '-' }}</p>
            </div>
            <div>
              <label class="text-sm text-gray-400">Alamat</label>
              <p class="text-white">{{ aboutData.alamat || '-' }}</p>
            </div>
          </div>

          <!-- Right: Images -->
          <div class="space-y-4">
            <div v-if="aboutData.fotoFormal">
              <label class="text-sm text-gray-400">Foto Formal (Hero)</label>
              <img :src="aboutData.fotoFormal" alt="Foto Formal" class="mt-2 w-full h-64 object-cover rounded-lg" />
            </div>
            <div v-if="aboutData.fotoNonFormal">
              <label class="text-sm text-gray-400">Foto Non-Formal (About)</label>
              <img :src="aboutData.fotoNonFormal" alt="Foto Non-Formal" class="mt-2 w-full h-64 object-cover rounded-lg" />
            </div>
          </div>
        </div>

        <div v-if="aboutData.deskripsiSingkat" class="mt-6">
          <label class="text-sm text-gray-400">Deskripsi Singkat</label>
          <p class="text-white mt-2">{{ aboutData.deskripsiSingkat }}</p>
        </div>

        <div v-if="aboutData.deskripsi" class="mt-6">
          <label class="text-sm text-gray-400">Deskripsi Lengkap</label>
          <div class="text-white mt-2 prose prose-invert max-w-none" v-html="aboutData.deskripsi"></div>
        </div>
      </div>

      <!-- Social Media -->
      <div v-if="hasSocialMedia" class="bg-slate-800/50 rounded-lg p-6 border border-purple-500/20">
        <h3 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Icon name="heroicons:share" class="w-5 h-5" />
          Social Media Links
        </h3>
        <div class="grid md:grid-cols-2 gap-4">
          <div v-if="aboutData.githubUrl">
            <label class="text-sm text-gray-400 flex items-center gap-2">
              <Icon name="mdi:github" class="w-4 h-4" />
              GitHub URL
            </label>
            <a :href="aboutData.githubUrl" target="_blank" class="text-purple-400 hover:text-purple-300 text-sm break-all">{{ aboutData.githubUrl }}</a>
          </div>
          <div v-if="aboutData.linkedinUrl">
            <label class="text-sm text-gray-400 flex items-center gap-2">
              <Icon name="mdi:linkedin" class="w-4 h-4" />
              LinkedIn URL
            </label>
            <a :href="aboutData.linkedinUrl" target="_blank" class="text-purple-400 hover:text-purple-300 text-sm break-all">{{ aboutData.linkedinUrl }}</a>
          </div>
          <div v-if="aboutData.facebookUrl">
            <label class="text-sm text-gray-400 flex items-center gap-2">
              <Icon name="mdi:facebook" class="w-4 h-4" />
              Facebook URL
            </label>
            <a :href="aboutData.facebookUrl" target="_blank" class="text-purple-400 hover:text-purple-300 text-sm break-all">{{ aboutData.facebookUrl }}</a>
          </div>
          <div v-if="aboutData.instagramUrl">
            <label class="text-sm text-gray-400 flex items-center gap-2">
              <Icon name="mdi:instagram" class="w-4 h-4" />
              Instagram URL
            </label>
            <a :href="aboutData.instagramUrl" target="_blank" class="text-purple-400 hover:text-purple-300 text-sm break-all">{{ aboutData.instagramUrl }}</a>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div v-if="stats" class="bg-slate-800/50 rounded-lg p-6 border border-purple-500/20">
        <h3 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Icon name="heroicons:chart-bar" class="w-5 h-5" />
          Statistik Pencapaian
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label class="text-sm text-gray-400 flex items-center gap-2">
              <Icon name="heroicons:check-circle" class="w-4 h-4" />
              Project Selesai
            </label>
            <p class="text-2xl font-bold text-white mt-1">{{ stats.projects || 0 }}</p>
          </div>
          <div>
            <label class="text-sm text-gray-400 flex items-center gap-2">
              <Icon name="heroicons:calendar" class="w-4 h-4" />
              Tahun Pengalaman
            </label>
            <p class="text-2xl font-bold text-white mt-1">{{ stats.experience || 0 }}</p>
          </div>
          <div>
            <label class="text-sm text-gray-400 flex items-center gap-2">
              <Icon name="heroicons:academic-cap" class="w-4 h-4" />
              Kursus Khusus
            </label>
            <p class="text-2xl font-bold text-white mt-1">{{ stats.courses || 0 }}</p>
          </div>
          <div>
            <label class="text-sm text-gray-400 flex items-center gap-2">
              <Icon name="heroicons:face-smile" class="w-4 h-4" />
              Klien Puas
            </label>
            <p class="text-2xl font-bold text-white mt-1">{{ stats.clients || 0 }}</p>
          </div>
        </div>
      </div>

      <!-- CV -->
      <div v-if="aboutData.cvUrl" class="bg-slate-800/50 rounded-lg p-6 border border-purple-500/20">
        <h3 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Icon name="heroicons:document" class="w-5 h-5" />
          CV/Resume (PDF)
        </h3>
        <a :href="aboutData.cvUrl" target="_blank" class="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold">
          <Icon name="heroicons:document-arrow-down" class="w-5 h-5" />
          Lihat CV
        </a>
      </div>
    </div>

    <!-- Edit Mode -->
    <div v-if="isEditing || !aboutData" class="bg-slate-800/50 rounded-lg p-6 border border-purple-500/20">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold text-white">{{ aboutData ? 'Edit' : 'Tambah' }} Profil</h3>
        <button
          v-if="aboutData"
          @click="isEditing = false; fetchAbout()"
          class="p-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
        >
          <Icon name="heroicons:x-mark" class="w-5 h-5" />
        </button>
      </div>

      <form @submit.prevent="saveAbout" class="space-y-6">
        <div class="grid md:grid-cols-2 gap-6">
          <!-- Left Column -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Icon name="heroicons:user" class="w-4 h-4" />
                Nama *
              </label>
              <input
                v-model="form.nama"
                type="text"
                required
                class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white"
                placeholder="Eka Syarif Maulana"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Icon name="heroicons:user-circle" class="w-4 h-4" />
                Seorang Apa
              </label>
              <input
                v-model="form.seorangApa"
                type="text"
                class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white"
                placeholder="Web Development, UI UX"
              />
              <p class="text-xs text-gray-500 mt-1">Pisahkan dengan koma untuk multiple profesi</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Icon name="heroicons:envelope" class="w-4 h-4" />
                Email *
              </label>
              <input
                v-model="form.email"
                type="email"
                required
                class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Icon name="heroicons:map-pin" class="w-4 h-4" />
                Alamat
              </label>
              <input
                v-model="form.alamat"
                type="text"
                class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white"
                placeholder="Jakarta, Indonesia"
              />
            </div>

            <MediaUpload
              v-model="form.fotoFormal"
              label="Foto Formal (Hero Section)"
              preview-label="Foto saat ini"
              accept="image/*"
            />

            <div>
              <RichTextEditor
                v-model="form.deskripsiSingkat"
                label="Deskripsi Singkat (Home)"
              />
            </div>
          </div>

          <!-- Right Column -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Icon name="heroicons:briefcase" class="w-4 h-4" />
                Jabatan *
              </label>
              <input
                v-model="form.jabatan"
                type="text"
                required
                class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white"
                placeholder="FULL STACK"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Icon name="heroicons:phone" class="w-4 h-4" />
                Telepon
              </label>
              <input
                v-model="form.telepon"
                type="text"
                class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white"
                placeholder="+6282392115909"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Icon name="mdi:whatsapp" class="w-4 h-4" />
                WhatsApp
              </label>
              <input
                v-model="form.whatsapp"
                type="text"
                class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white"
                placeholder="+6282392115909"
              />
            </div>

            <MediaUpload
              v-model="form.fotoNonFormal"
              label="Foto Non-Formal (About Me)"
              preview-label="Foto about saat ini"
              accept="image/*"
            />
          </div>
        </div>

        <!-- Deskripsi Lengkap dengan Rich Text Editor -->
        <RichTextEditor
          v-model="form.deskripsi"
          label="Deskripsi Lengkap *"
        />

        <!-- Social Media Links -->
        <div class="border-t border-gray-700 pt-6">
          <h4 class="text-md font-semibold text-white mb-4 flex items-center gap-2">
            <Icon name="heroicons:share" class="w-5 h-5" />
            Social Media Links
          </h4>
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Icon name="mdi:github" class="w-4 h-4" />
                GitHub URL
              </label>
              <input
                v-model="form.githubUrl"
                type="url"
                class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white"
                placeholder="https://github.com/username"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Icon name="mdi:linkedin" class="w-4 h-4" />
                LinkedIn URL
              </label>
              <input
                v-model="form.linkedinUrl"
                type="url"
                class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white"
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Icon name="mdi:facebook" class="w-4 h-4" />
                Facebook URL
              </label>
              <input
                v-model="form.facebookUrl"
                type="url"
                class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white"
                placeholder="https://facebook.com/username"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Icon name="mdi:instagram" class="w-4 h-4" />
                Instagram URL
              </label>
              <input
                v-model="form.instagramUrl"
                type="url"
                class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white"
                placeholder="https://instagram.com/username"
              />
            </div>
          </div>
        </div>

        <!-- Statistik Pencapaian -->
        <div class="border-t border-gray-700 pt-6">
          <h4 class="text-md font-semibold text-white mb-4 flex items-center gap-2">
            <Icon name="heroicons:chart-bar" class="w-5 h-5" />
            Statistik Pencapaian
          </h4>
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Icon name="heroicons:check-circle" class="w-4 h-4" />
                Project Selesai
              </label>
              <input
                v-model.number="form.stats.projects"
                type="number"
                class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Icon name="heroicons:calendar" class="w-4 h-4" />
                Tahun Pengalaman
              </label>
              <input
                v-model.number="form.stats.experience"
                type="number"
                class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Icon name="heroicons:academic-cap" class="w-4 h-4" />
                Kursus Khusus
              </label>
              <input
                v-model.number="form.stats.courses"
                type="number"
                class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Icon name="heroicons:face-smile" class="w-4 h-4" />
                Klien Puas
              </label>
              <input
                v-model.number="form.stats.clients"
                type="number"
                class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white"
              />
            </div>
          </div>
        </div>

        <!-- CV/Resume -->
        <div class="border-t border-gray-700 pt-6">
          <h4 class="text-md font-semibold text-white mb-4 flex items-center gap-2">
            <Icon name="heroicons:document" class="w-5 h-5" />
            CV/Resume (PDF)
          </h4>
          <MediaUpload
            v-model="form.cvUrl"
            label=""
            preview-label="CV saat ini"
            accept=".pdf,application/pdf"
          />
          <p class="text-xs text-gray-500 mt-2">Upload file PDF atau masukkan URL ke file PDF CV/Resume Anda</p>
          <div v-if="form.cvUrl" class="mt-2">
            <a :href="form.cvUrl" target="_blank" class="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm font-semibold">
              <Icon name="heroicons:document-arrow-down" class="w-4 h-4" />
              Lihat CV
            </a>
          </div>
        </div>

        <div class="flex gap-2 pt-4 border-t border-gray-700">
          <button
            type="submit"
            class="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold transition-colors flex items-center gap-2"
          >
            <Icon name="heroicons:check" class="w-5 h-5" />
            Simpan
          </button>
          <button
            v-if="aboutData"
            type="button"
            @click="isEditing = false; fetchAbout()"
            class="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg text-white font-semibold transition-colors"
          >
            Batal
          </button>
        </div>
      </form>
    </div>

    <!-- Empty State -->
    <div v-if="!isEditing && !aboutData" class="bg-slate-800/50 rounded-lg p-12 border border-purple-500/20 text-center">
      <Icon name="heroicons:user-circle" class="w-16 h-16 text-gray-600 mx-auto mb-4" />
      <p class="text-gray-400 mb-4">Belum ada data profil</p>
      <button
        @click="isEditing = true"
        class="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold transition-colors"
      >
        Tambah Profil
      </button>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const { token, initAuth } = useAuth()
const isEditing = ref(false)
const aboutData = ref(null)
const loading = ref(false)

const form = ref({
  nama: '',
  seorangApa: '',
  email: '',
  alamat: '',
  jabatan: '',
  telepon: '',
  whatsapp: '',
  fotoFormal: '',
  fotoNonFormal: '',
  deskripsiSingkat: '',
  deskripsi: '',
  githubUrl: '',
  linkedinUrl: '',
  facebookUrl: '',
  instagramUrl: '',
  stats: {
    projects: 0,
    experience: 0,
    courses: 0,
    clients: 0
  },
  cvUrl: ''
})


const stats = computed(() => {
  if (!aboutData.value?.stats) return null
  try {
    return typeof aboutData.value.stats === 'string' 
      ? JSON.parse(aboutData.value.stats) 
      : aboutData.value.stats
  } catch {
    return null
  }
})

const hasSocialMedia = computed(() => {
  return aboutData.value && (
    aboutData.value.githubUrl ||
    aboutData.value.linkedinUrl ||
    aboutData.value.facebookUrl ||
    aboutData.value.instagramUrl
  )
})

const fetchAbout = async () => {
  loading.value = true
  try {
    const data = await $fetch('/api/admin/about', {
      headers: { Authorization: `Bearer ${token.value}` }
    })
    
    if (data) {
      aboutData.value = data
      const parsedStats = data.stats ? (typeof data.stats === 'string' ? JSON.parse(data.stats) : data.stats) : {}
      
      form.value = {
        nama: data.nama || '',
        seorangApa: data.seorangApa || '',
        email: data.email || '',
        alamat: data.alamat || '',
        jabatan: data.jabatan || '',
        telepon: data.telepon || '',
        whatsapp: data.whatsapp || '',
        fotoFormal: data.fotoFormal || '',
        fotoNonFormal: data.fotoNonFormal || '',
        deskripsiSingkat: data.deskripsiSingkat || '',
        deskripsi: data.deskripsi || '',
        githubUrl: data.githubUrl || '',
        linkedinUrl: data.linkedinUrl || '',
        facebookUrl: data.facebookUrl || '',
        instagramUrl: data.instagramUrl || '',
        stats: {
          projects: parsedStats.projects || 0,
          experience: parsedStats.experience || 0,
          courses: parsedStats.courses || 0,
          clients: parsedStats.clients || 0
        },
        cvUrl: data.cvUrl || ''
      }
      
    }
  } catch (error) {
    console.error('Error fetching about:', error)
  } finally {
    loading.value = false
  }
}

const saveAbout = async () => {
  loading.value = true
  try {
    const dataToSave = {
      ...form.value,
      stats: JSON.stringify(form.value.stats)
    }
    
    await $fetch('/api/admin/about', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.value}` },
      body: dataToSave
    })
    
    alert('Data berhasil disimpan!')
    isEditing.value = false
    await fetchAbout()
    // Reload untuk melihat perubahan
    window.location.reload()
  } catch (error) {
    console.error('Error saving about:', error)
    alert('Gagal menyimpan data')
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  initAuth()
  await new Promise(resolve => setTimeout(resolve, 200))
  if (token.value) {
    await fetchAbout()
  }
})

</script>
