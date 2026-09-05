<template>
  <div>
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-white mb-2">Sertifikat</h1>
        <p class="text-gray-400">Kelola daftar sertifikat</p>
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
      <h3 class="text-lg font-semibold text-white mb-4">{{ editingId ? 'Edit' : 'Tambah' }} Sertifikat</h3>
      <form @submit.prevent="saveCertificate" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Judul</label>
            <input v-model="form.title" type="text" required class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Penerbit</label>
            <input v-model="form.issuer" type="text" required class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Tanggal Terbit</label>
            <input v-model="form.issueDate" type="text" required class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white" placeholder="Jan 2023" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Tanggal Kadaluarsa (opsional)</label>
            <input v-model="form.expiryDate" type="text" class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Credential ID</label>
            <input v-model="form.credential" type="text" class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">URL Verifikasi</label>
            <input v-model="form.url" type="text" class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white" />
          </div>
          <div>
            <MediaUpload
              v-model="form.image"
              label="Gambar Sertifikat"
              preview-label="Preview"
              accept="image/*"
            />
          </div>
        </div>
        <div class="flex gap-2">
          <button type="submit" class="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold">Simpan</button>
          <button type="button" @click="showForm = false" class="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white font-semibold">Batal</button>
        </div>
      </form>
    </div>

    <!-- List -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="cert in certificates"
        :key="cert.id"
        class="bg-slate-800/50 rounded-lg overflow-hidden border border-purple-500/20"
      >
        <img v-if="cert.image" :src="cert.image" :alt="cert.title" class="w-full h-48 object-cover" />
        <div class="p-4">
          <div class="flex items-start justify-between mb-2">
            <div class="flex-1">
              <h3 class="font-semibold text-white">{{ cert.title }}</h3>
              <p class="text-purple-400 text-sm">{{ cert.issuer }}</p>
            </div>
            <div class="flex gap-2">
              <button @click="editCertificate(cert)" class="p-1 text-blue-400 hover:bg-blue-500/20 rounded">
                <Icon name="heroicons:pencil" class="w-4 h-4" />
              </button>
              <button @click="deleteCertificate(cert.id)" class="p-1 text-red-400 hover:bg-red-500/20 rounded">
                <Icon name="heroicons:trash" class="w-4 h-4" />
              </button>
            </div>
          </div>
          <p class="text-sm text-gray-400 mb-2">Terbit: {{ cert.issueDate }}</p>
          <p v-if="cert.expiryDate" class="text-sm text-gray-400 mb-2">Kadaluarsa: {{ cert.expiryDate }}</p>
          <p v-if="cert.credential" class="text-xs text-gray-500">ID: {{ cert.credential }}</p>
          <a
            v-if="cert.url"
            :href="cert.url"
            target="_blank"
            class="text-xs text-purple-400 hover:text-purple-300 mt-2 inline-block"
          >
            Verifikasi →
          </a>
        </div>
      </div>
      
      <div v-if="certificates.length === 0" class="col-span-full text-center py-8 text-gray-400">
        Belum ada sertifikat
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
const certificates = ref([])
const showForm = ref(false)
const editingId = ref(null)
const form = ref(getEmptyForm())

function getEmptyForm() {
  return {
    title: '',
    issuer: '',
    issueDate: '',
    expiryDate: '',
    credential: '',
    url: '',
    image: ''
  }
}

const fetchCertificates = async () => {
  try {
    certificates.value = await $fetch('/api/admin/certificates', {
      headers: { Authorization: `Bearer ${token.value}` }
    })
  } catch (error) {
    console.error('Error:', error)
  }
}

const saveCertificate = async () => {
  try {
    if (editingId.value) {
      await $fetch(`/api/admin/certificates/${editingId.value}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token.value}` },
        body: form.value
      })
    } else {
      await $fetch('/api/admin/certificates', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token.value}` },
        body: form.value
      })
    }
    alert('Data berhasil disimpan!')
    await fetchCertificates()
    showForm.value = false
    editingId.value = null
    form.value = getEmptyForm()
    window.location.reload()
  } catch (error) {
    alert('Gagal menyimpan data')
  }
}

const editCertificate = (cert) => {
  editingId.value = cert.id
  form.value = { ...cert }
  showForm.value = true
}

const deleteCertificate = async (id) => {
  if (!confirm('Yakin ingin menghapus?')) return
  try {
    await $fetch(`/api/admin/certificates/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token.value}` }
    })
    alert('Data berhasil dihapus!')
    await fetchCertificates()
    window.location.reload()
  } catch (error) {
    alert('Gagal menghapus data')
  }
}

onMounted(() => {
  fetchCertificates()
})
</script>
