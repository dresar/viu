<template>
  <div>
    <!-- Header -->
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-white mb-2">Proyek</h1>
        <p class="text-gray-400">Kelola daftar proyek portfolio</p>
      </div>
      <button
        @click="showForm = true; editingId = null; form = getEmptyForm(); tagsInput = ''"
        class="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold transition-colors flex items-center gap-2"
      >
        <Icon name="heroicons:plus" class="w-5 h-5" />
        Tambah Proyek
      </button>
    </div>

    <!-- Search, Filter, and Bulk Actions -->
    <div class="bg-slate-800/50 rounded-lg p-4 border border-purple-500/20 mb-6">
      <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
        <!-- Search -->
        <div class="flex-1 w-full md:w-auto">
          <div class="relative">
            <Icon name="heroicons:magnifying-glass" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari proyek..."
              class="w-full pl-10 pr-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        <!-- Sort -->
        <div class="flex items-center gap-2">
          <select
            v-model="sortBy"
            class="px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
          >
            <option value="createdAt">Tanggal Dibuat</option>
            <option value="title">Judul</option>
            <option value="featured">Featured</option>
          </select>
          <button
            @click="sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'"
            class="p-2 bg-slate-900 border border-gray-700 rounded-lg text-white hover:bg-slate-800 transition-colors"
          >
            <Icon :name="sortOrder === 'asc' ? 'heroicons:arrow-up' : 'heroicons:arrow-down'" class="w-5 h-5" />
          </button>
        </div>

        <!-- Bulk Actions -->
        <div v-if="selectedItems.length > 0" class="flex items-center gap-2">
          <span class="text-sm text-gray-400">{{ selectedItems.length }} dipilih</span>
          <button
            @click="handleBulkDelete"
            class="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm font-semibold transition-colors flex items-center gap-2"
          >
            <Icon name="heroicons:trash" class="w-4 h-4" />
            Hapus
          </button>
        </div>
      </div>
    </div>

    <!-- Form -->
    <div v-if="showForm" class="bg-slate-800/50 rounded-lg p-6 border border-purple-500/20 mb-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-white">{{ editingId ? 'Edit' : 'Tambah' }} Proyek</h3>
        <button
          @click="showForm = false"
          class="p-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
        >
          <Icon name="heroicons:x-mark" class="w-5 h-5" />
        </button>
      </div>
      <form @submit.prevent="saveProject" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Judul *</label>
            <input v-model="form.title" type="text" required class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white" />
          </div>
          <div>
            <MediaUpload
              v-model="form.image"
              label="Gambar Proyek"
              preview-label="Preview"
              accept="image/*"
            />
          </div>
        </div>
        <div>
          <RichTextEditor
            v-model="form.description"
            label="Deskripsi *"
          />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Tags (pisahkan dengan koma)</label>
            <input v-model="tagsInput" type="text" class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white" placeholder="Vue.js, Nuxt.js, Tailwind" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Featured</label>
            <label class="flex items-center gap-2 mt-2">
              <input v-model="form.featured" type="checkbox" class="rounded border-gray-600 text-purple-600" />
              <span class="text-sm text-gray-300">Tampilkan sebagai featured project</span>
            </label>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Demo URL</label>
            <input v-model="form.demoUrl" type="text" class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">GitHub URL</label>
            <input v-model="form.githubUrl" type="text" class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white" />
          </div>
        </div>
        <div class="flex gap-2">
          <button type="submit" class="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold flex items-center gap-2">
            <Icon name="heroicons:check" class="w-4 h-4" />
            Simpan
          </button>
          <button type="button" @click="showForm = false" class="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white font-semibold">
            Batal
          </button>
        </div>
      </form>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-12">
      <Icon name="heroicons:arrow-path" class="w-8 h-8 text-purple-400 animate-spin mx-auto mb-2" />
      <p class="text-gray-400">Memuat data...</p>
    </div>

    <!-- Projects List -->
    <div v-else>
      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div
          v-for="project in filteredItems"
          :key="project.id"
          class="bg-slate-800/50 rounded-lg overflow-hidden border transition-all"
          :class="selectedItems.includes(project.id) ? 'border-purple-500 ring-2 ring-purple-500/50' : 'border-purple-500/20 hover:border-purple-500/50'"
        >
          <div class="relative">
            <img
              v-if="project.image"
              :src="project.image"
              :alt="project.title"
              class="w-full h-48 object-cover"
            />
            <div v-else class="w-full h-48 bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center">
              <Icon name="heroicons:photo" class="w-12 h-12 text-gray-500" />
            </div>
            <div class="absolute top-2 right-2 flex gap-2">
              <input
                type="checkbox"
                :checked="selectedItems.includes(project.id)"
                @change="toggleSelect(project.id)"
                class="w-5 h-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500"
              />
              <span
                v-if="project.featured"
                class="px-2 py-1 text-xs bg-yellow-500/20 text-yellow-400 rounded border border-yellow-500/30"
              >
                Featured
              </span>
            </div>
          </div>
          <div class="p-4">
            <h3 class="font-semibold text-white mb-2 line-clamp-1">{{ project.title }}</h3>
            <p class="text-sm text-gray-400 mb-3 line-clamp-2">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2 mb-3">
              <span
                v-for="tag in (Array.isArray(project.tags) ? project.tags : [])"
                :key="tag"
                class="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded border border-purple-500/30"
              >
                {{ tag }}
              </span>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex gap-2">
                <button
                  @click="editProject(project)"
                  class="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Icon name="heroicons:pencil" class="w-4 h-4" />
                </button>
                <button
                  @click="duplicateProject(project.id)"
                  class="p-2 text-green-400 hover:bg-green-500/20 rounded-lg transition-colors"
                  title="Duplicate"
                >
                  <Icon name="heroicons:document-duplicate" class="w-4 h-4" />
                </button>
                <a
                  v-if="project.demoUrl"
                  :href="project.demoUrl"
                  target="_blank"
                  class="p-2 text-purple-400 hover:bg-purple-500/20 rounded-lg transition-colors"
                  title="Preview"
                >
                  <Icon name="heroicons:eye" class="w-4 h-4" />
                </a>
              </div>
              <button
                @click="deleteProject(project.id)"
                class="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                title="Delete"
              >
                <Icon name="heroicons:trash" class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredItems.length === 0" class="text-center py-12">
        <Icon name="heroicons:folder-open" class="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <p class="text-gray-400 mb-2">
          {{ searchQuery ? 'Tidak ada proyek yang cocok dengan pencarian' : 'Belum ada proyek' }}
        </p>
        <button
          v-if="!searchQuery"
          @click="showForm = true"
          class="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold mt-4"
        >
          Tambah Proyek Pertama
        </button>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex items-center justify-between mt-6">
        <div class="text-sm text-gray-400">
          Menampilkan {{ (currentPage - 1) * itemsPerPage + 1 }} - {{ Math.min(currentPage * itemsPerPage, totalItems) }} dari {{ totalItems }} proyek
        </div>
        <div class="flex gap-2">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="px-4 py-2 bg-slate-800 border border-gray-700 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors"
          >
            Sebelumnya
          </button>
          <span class="px-4 py-2 bg-slate-800 border border-gray-700 rounded-lg text-white">
            {{ currentPage }} / {{ totalPages }}
          </span>
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 bg-slate-800 border border-gray-700 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors"
          >
            Selanjutnya
          </button>
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
const {
  items: projects,
  loading,
  searchQuery,
  sortBy,
  sortOrder,
  selectedItems,
  currentPage,
  itemsPerPage,
  filteredItems,
  totalPages,
  totalItems,
  fetchItems,
  createItem,
  updateItem,
  deleteItem,
  bulkDelete,
  duplicateItem,
  toggleSelect
} = useCrud('projects', token)

const showForm = ref(false)
const editingId = ref(null)
const form = ref(getEmptyForm())
const tagsInput = ref('')

function getEmptyForm() {
  return {
    title: '',
    description: '',
    image: '',
    tags: [],
    demoUrl: '',
    githubUrl: '',
    featured: false
  }
}

const saveProject = async () => {
  const tags = tagsInput.value.split(',').map(t => t.trim()).filter(t => t)
  const projectData = { ...form.value, tags }
  
  let result
  if (editingId.value) {
    result = await updateItem(editingId.value, projectData)
  } else {
    result = await createItem(projectData)
  }
  
  if (result.success) {
    showForm.value = false
    editingId.value = null
    form.value = getEmptyForm()
    tagsInput.value = ''
  } else {
    alert(result.error || 'Gagal menyimpan proyek')
  }
}

const editProject = (project) => {
  editingId.value = project.id
  form.value = { ...project }
  tagsInput.value = Array.isArray(project.tags) ? project.tags.join(', ') : ''
  showForm.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const deleteProject = async (id) => {
  if (!confirm('Yakin ingin menghapus proyek ini?')) return
  const result = await deleteItem(id)
  if (result.success) {
    alert('Proyek berhasil dihapus!')
    window.location.reload()
  } else {
    alert(result.error || 'Gagal menghapus proyek')
  }
}

const duplicateProject = async (id) => {
  const result = await duplicateItem(id)
  if (result.success) {
    alert('Proyek berhasil diduplikasi!')
  } else {
    alert(result.error || 'Gagal menduplikasi proyek')
  }
}

const handleBulkDelete = async () => {
  if (!confirm(`Yakin ingin menghapus ${selectedItems.value.length} proyek yang dipilih?`)) return
  const result = await bulkDelete()
  if (result.success) {
    alert('Proyek berhasil dihapus!')
    window.location.reload()
  } else {
    alert(result.error || 'Gagal menghapus proyek')
  }
}

onMounted(async () => {
  const { token: authToken, initAuth } = useAuth()
  initAuth()
  
  // Wait a bit for token to be available
  await new Promise(resolve => setTimeout(resolve, 200))
  
  if (authToken.value) {
    fetchItems()
  }
})
</script>