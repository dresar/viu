<template>
  <div>
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-white mb-2">Pengalaman Kerja</h1>
        <p class="text-gray-400">Kelola riwayat pengalaman kerja</p>
      </div>
      <button
        @click="showForm = true; editingId = null; form = getEmptyForm()"
        class="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold transition-colors flex items-center gap-2"
      >
        <Icon name="heroicons:plus" class="w-5 h-5" />
        Tambah
      </button>
    </div>

    <!-- Form -->
    <div v-if="showForm" class="bg-slate-800/50 rounded-lg p-6 border border-purple-500/20 mb-6">
      <h3 class="text-lg font-semibold text-white mb-4">{{ editingId ? 'Edit' : 'Tambah' }} Pengalaman</h3>
      <form @submit.prevent="saveExperience" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Perusahaan</label>
            <input v-model="form.company" type="text" required class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Posisi</label>
            <input v-model="form.position" type="text" required class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Tanggal Mulai</label>
            <input v-model="form.startDate" type="text" required class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white" placeholder="Jan 2020" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Tanggal Selesai</label>
            <input v-model="form.endDate" type="text" class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white" placeholder="Des 2023 atau Sekarang" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Lokasi</label>
            <input v-model="form.location" type="text" class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white" />
          </div>
          <div>
            <label class="flex items-center gap-2 mt-6">
              <input v-model="form.current" type="checkbox" class="rounded border-gray-600 text-purple-600" />
              <span class="text-sm text-gray-300">Masih Bekerja</span>
            </label>
          </div>
        </div>
        <div>
          <RichTextEditor
            v-model="form.description"
            label="Deskripsi *"
          />
        </div>
        <div class="flex gap-2">
          <button type="submit" class="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold">Simpan</button>
          <button type="button" @click="showForm = false" class="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white font-semibold">Batal</button>
        </div>
      </form>
    </div>

    <!-- List -->
    <div class="space-y-4">
      <div
        v-for="exp in experiences"
        :key="exp.id"
        class="bg-slate-800/50 rounded-lg p-6 border border-purple-500/20"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <h3 class="text-xl font-bold text-white">{{ exp.position }}</h3>
            <p class="text-purple-400 font-semibold">{{ exp.company }}</p>
            <p v-if="exp.location" class="text-gray-400 text-sm">{{ exp.location }}</p>
            <p class="text-sm text-gray-500 mt-2">{{ exp.startDate }} - {{ exp.endDate || (exp.current ? 'Sekarang' : '') }}</p>
            <p class="text-gray-300 mt-3">{{ exp.description }}</p>
          </div>
          <div class="flex gap-2">
            <button @click="editExperience(exp)" class="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg">
              <Icon name="heroicons:pencil" class="w-5 h-5" />
            </button>
            <button @click="deleteExperience(exp.id)" class="p-2 text-red-400 hover:bg-red-500/20 rounded-lg">
              <Icon name="heroicons:trash" class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      <div v-if="experiences.length === 0" class="text-center py-8 text-gray-400">
        Belum ada pengalaman kerja
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const { token } = useAuth()
const experiences = ref([])
const showForm = ref(false)
const editingId = ref(null)
const form = ref(getEmptyForm())

function getEmptyForm() {
  return {
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
    location: '',
    current: false
  }
}

const fetchExperiences = async () => {
  try {
    experiences.value = await $fetch('/api/admin/experience', {
      headers: { Authorization: `Bearer ${token.value}` }
    })
  } catch (error) {
    console.error('Error:', error)
  }
}

const saveExperience = async () => {
  try {
    if (editingId.value) {
      await $fetch(`/api/admin/experience/${editingId.value}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token.value}` },
        body: form.value
      })
    } else {
      await $fetch('/api/admin/experience', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token.value}` },
        body: form.value
      })
    }
    await fetchExperiences()
    showForm.value = false
    editingId.value = null
    form.value = getEmptyForm()
  } catch (error) {
    alert('Gagal menyimpan data')
  }
}

const editExperience = (exp) => {
  editingId.value = exp.id
  form.value = { ...exp }
  showForm.value = true
}

const deleteExperience = async (id) => {
  if (!confirm('Yakin ingin menghapus?')) return
  try {
    await $fetch(`/api/admin/experience/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token.value}` }
    })
    alert('Data berhasil dihapus!')
    await fetchExperiences()
    window.location.reload()
  } catch (error) {
    alert('Gagal menghapus data')
  }
}

onMounted(() => {
  fetchExperiences()
})
</script>
