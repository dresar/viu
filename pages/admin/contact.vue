<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-white mb-2">Pesan Kontak</h1>
      <p class="text-gray-400">Kelola pesan dari pengunjung</p>
    </div>

    <div class="space-y-4">
      <div
        v-for="contact in contacts"
        :key="contact.id"
        class="bg-slate-800/50 rounded-lg p-6 border"
        :class="contact.read ? 'border-gray-700' : 'border-purple-500/50'"
      >
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <h3 class="text-lg font-bold text-white">{{ contact.name }}</h3>
              <span
                v-if="!contact.read"
                class="px-2 py-1 text-xs bg-purple-500/20 text-purple-400 rounded"
              >
                Baru
              </span>
            </div>
            <p class="text-purple-400">{{ contact.email }}</p>
            <p class="text-sm text-gray-500 mt-2">{{ new Date(contact.createdAt).toLocaleString('id-ID') }}</p>
          </div>
          <div class="flex gap-2">
            <button
              v-if="!contact.read"
              @click="markAsRead(contact.id)"
              class="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
            >
              Tandai Dibaca
            </button>
            <button
              @click="deleteContact(contact.id)"
              class="p-2 text-red-400 hover:bg-red-500/20 rounded-lg"
            >
              <Icon name="heroicons:trash" class="w-5 h-5" />
            </button>
          </div>
        </div>
        <div class="bg-slate-900 rounded-lg p-4 mt-4">
          <p class="text-gray-300 whitespace-pre-wrap">{{ contact.message }}</p>
        </div>
      </div>
      
      <div v-if="contacts.length === 0" class="text-center py-8 text-gray-400">
        Belum ada pesan
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
const contacts = ref([])

const fetchContacts = async () => {
  try {
    contacts.value = await $fetch('/api/admin/contact', {
      headers: { Authorization: `Bearer ${token.value}` }
    })
  } catch (error) {
    console.error('Error:', error)
  }
}

const markAsRead = async (id) => {
  try {
    await $fetch(`/api/admin/contact/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token.value}` },
      body: { read: true }
    })
    alert('Status berhasil diperbarui!')
    await fetchContacts()
    window.location.reload()
  } catch (error) {
    alert('Gagal memperbarui status')
  }
}

const deleteContact = async (id) => {
  if (!confirm('Yakin ingin menghapus pesan ini?')) return
  try {
    await $fetch(`/api/admin/contact/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token.value}` }
    })
    alert('Pesan berhasil dihapus!')
    await fetchContacts()
    window.location.reload()
  } catch (error) {
    alert('Gagal menghapus pesan')
  }
}

onMounted(() => {
  fetchContacts()
})
</script>
