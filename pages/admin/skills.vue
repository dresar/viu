<template>
  <div>
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-white mb-2">Keahlian</h1>
        <p class="text-gray-400">Kelola daftar keahlian dan skill</p>
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
      <h3 class="text-lg font-semibold text-white mb-4">{{ editingId ? 'Edit' : 'Tambah' }} Keahlian</h3>
      <form @submit.prevent="saveSkill" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Nama</label>
            <input v-model="form.name" type="text" required class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Icon (mdi: atau heroicons:)</label>
            <input v-model="form.icon" type="text" class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white" placeholder="mdi:vuejs" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Level (0-100)</label>
            <input v-model.number="form.level" type="number" min="0" max="100" required class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Kategori</label>
            <input v-model="form.category" type="text" class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white" placeholder="Frontend, Backend, dll" />
          </div>
        </div>
        <div class="flex gap-2">
          <button type="submit" class="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold">Simpan</button>
          <button type="button" @click="showForm = false" class="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white font-semibold">Batal</button>
        </div>
      </form>
    </div>

    <!-- List -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="skill in skills"
        :key="skill.id"
        class="bg-slate-800/50 rounded-lg p-6 border border-purple-500/20"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-3">
            <div v-if="skill.icon" class="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Icon :name="skill.icon" class="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 class="font-semibold text-white">{{ skill.name }}</h3>
              <p v-if="skill.category" class="text-sm text-gray-400">{{ skill.category }}</p>
            </div>
          </div>
          <div class="flex gap-2">
            <button @click="editSkill(skill)" class="p-1 text-blue-400 hover:bg-blue-500/20 rounded">
              <Icon name="heroicons:pencil" class="w-4 h-4" />
            </button>
            <button @click="deleteSkill(skill.id)" class="p-1 text-red-400 hover:bg-red-500/20 rounded">
              <Icon name="heroicons:trash" class="w-4 h-4" />
            </button>
          </div>
        </div>
        <div class="w-full bg-slate-700 rounded-full h-2">
          <div
            class="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
            :style="{ width: `${skill.level}%` }"
          ></div>
        </div>
        <p class="text-xs text-gray-400 mt-2">{{ skill.level }}%</p>
      </div>
      
      <div v-if="skills.length === 0" class="col-span-full text-center py-8 text-gray-400">
        Belum ada keahlian
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
const skills = ref([])
const showForm = ref(false)
const editingId = ref(null)
const form = ref(getEmptyForm())

function getEmptyForm() {
  return { name: '', icon: '', level: 0, category: '' }
}

const fetchSkills = async () => {
  try {
    skills.value = await $fetch('/api/admin/skills', {
      headers: { Authorization: `Bearer ${token.value}` }
    })
  } catch (error) {
    console.error('Error:', error)
  }
}

const saveSkill = async () => {
  try {
    if (editingId.value) {
      await $fetch(`/api/admin/skills/${editingId.value}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token.value}` },
        body: form.value
      })
    } else {
      await $fetch('/api/admin/skills', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token.value}` },
        body: form.value
      })
    }
    alert('Data berhasil disimpan!')
    await fetchSkills()
    showForm.value = false
    editingId.value = null
    form.value = getEmptyForm()
    window.location.reload()
  } catch (error) {
    alert('Gagal menyimpan data')
  }
}

const editSkill = (skill) => {
  editingId.value = skill.id
  form.value = { ...skill }
  showForm.value = true
}

const deleteSkill = async (id) => {
  if (!confirm('Yakin ingin menghapus?')) return
  try {
    await $fetch(`/api/admin/skills/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token.value}` }
    })
    alert('Data berhasil dihapus!')
    await fetchSkills()
    window.location.reload()
  } catch (error) {
    alert('Gagal menghapus data')
  }
}

onMounted(() => {
  fetchSkills()
})
</script>
