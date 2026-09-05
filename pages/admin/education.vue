<template>
  <div>
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-white mb-2">Pendidikan</h1>
        <p class="text-gray-400">Kelola riwayat pendidikan</p>
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
      <h3 class="text-lg font-semibold text-white mb-4">{{ editingId ? 'Edit' : 'Tambah' }} Pendidikan</h3>
      <form @submit.prevent="saveEducation" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Institusi</label>
            <input v-model="form.institution" type="text" required class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Gelar</label>
            <input v-model="form.degree" type="text" required class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Bidang</label>
            <input v-model="form.field" type="text" class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Nilai/IPK</label>
            <input v-model="form.grade" type="text" class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Tanggal Mulai</label>
            <input v-model="form.startDate" type="text" required class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white" placeholder="2020" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Tanggal Selesai</label>
            <input v-model="form.endDate" type="text" class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white" placeholder="2024 atau Sekarang" />
          </div>
        </div>
        <div>
          <RichTextEditor
            v-model="form.description"
            label="Deskripsi"
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
        v-for="edu in educations"
        :key="edu.id"
        class="bg-slate-800/50 rounded-lg p-6 border border-purple-500/20"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <h3 class="text-xl font-bold text-white">{{ edu.degree }}</h3>
            <p class="text-purple-400 font-semibold">{{ edu.institution }}</p>
            <p v-if="edu.field" class="text-gray-400">{{ edu.field }}</p>
            <p class="text-sm text-gray-500 mt-2">{{ edu.startDate }} - {{ edu.endDate || 'Sekarang' }}</p>
            <p v-if="edu.grade" class="text-sm text-gray-400 mt-1">Nilai: {{ edu.grade }}</p>
            <p v-if="edu.description" class="text-gray-300 mt-2">{{ edu.description }}</p>
          </div>
          <div class="flex gap-2">
            <button
              @click="editEducation(edu)"
              class="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg"
            >
              <Icon name="heroicons:pencil" class="w-5 h-5" />
            </button>
            <button
              @click="deleteEducation(edu.id)"
              class="p-2 text-red-400 hover:bg-red-500/20 rounded-lg"
            >
              <Icon name="heroicons:trash" class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      <div v-if="educations.length === 0" class="text-center py-8 text-gray-400">
        Belum ada data pendidikan
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
const educations = ref([])
const showForm = ref(false)
const editingId = ref(null)
const form = ref(getEmptyForm())

function getEmptyForm() {
  return {
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    description: '',
    grade: ''
  }
}

const fetchEducations = async () => {
  try {
    educations.value = await $fetch('/api/admin/education', {
      headers: { Authorization: `Bearer ${token.value}` }
    })
  } catch (error) {
    console.error('Error:', error)
  }
}

const saveEducation = async () => {
  try {
    if (editingId.value) {
      await $fetch(`/api/admin/education/${editingId.value}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token.value}` },
        body: form.value
      })
    } else {
      await $fetch('/api/admin/education', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token.value}` },
        body: form.value
      })
    }
    alert('Data berhasil disimpan!')
    await fetchEducations()
    showForm.value = false
    editingId.value = null
    form.value = getEmptyForm()
    window.location.reload()
  } catch (error) {
    alert('Gagal menyimpan data')
  }
}

const editEducation = (edu) => {
  editingId.value = edu.id
  form.value = { ...edu }
  showForm.value = true
}

const deleteEducation = async (id) => {
  if (!confirm('Yakin ingin menghapus?')) return
  try {
    await $fetch(`/api/admin/education/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token.value}` }
    })
    alert('Data berhasil dihapus!')
    await fetchEducations()
    window.location.reload()
  } catch (error) {
    alert('Gagal menghapus data')
  }
}

onMounted(() => {
  fetchEducations()
})
</script>
