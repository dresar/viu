<template>
  <div>
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-white mb-2">Blog</h1>
        <p class="text-gray-400">Kelola artikel blog</p>
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
      <h3 class="text-lg font-semibold text-white mb-4">{{ editingId ? 'Edit' : 'Tambah' }} Artikel</h3>
      <form @submit.prevent="saveBlog" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Judul</label>
          <input v-model="form.title" type="text" required class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Slug (otomatis dari judul)</label>
          <input v-model="form.slug" type="text" class="w-full px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white" />
        </div>
        <div>
          <RichTextEditor
            v-model="form.excerpt"
            label="Excerpt (ringkasan)"
          />
        </div>
        <div>
          <MediaUpload
            v-model="form.image"
            label="Gambar Artikel"
            preview-label="Preview"
            accept="image/*"
          />
        </div>
        <div>
          <RichTextEditor
            v-model="form.content"
            label="Konten Artikel *"
          />
        </div>
        <div>
          <label class="flex items-center gap-2">
            <input v-model="form.published" type="checkbox" class="rounded border-gray-600 text-purple-600" />
            <span class="text-sm text-gray-300">Published</span>
          </label>
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
        v-for="blog in blogs"
        :key="blog.id"
        class="bg-slate-800/50 rounded-lg p-6 border border-purple-500/20"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <h3 class="text-xl font-bold text-white">{{ blog.title }}</h3>
              <span
                v-if="blog.published"
                class="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded"
              >
                Published
              </span>
              <span
                v-else
                class="px-2 py-1 text-xs bg-gray-500/20 text-gray-400 rounded"
              >
                Draft
              </span>
            </div>
            <p v-if="blog.excerpt" class="text-gray-400 mb-2">{{ blog.excerpt }}</p>
            <p class="text-sm text-gray-500">Slug: {{ blog.slug }}</p>
            <p class="text-xs text-gray-600 mt-2">{{ new Date(blog.createdAt).toLocaleDateString('id-ID') }}</p>
          </div>
          <div class="flex gap-2">
            <button @click="editBlog(blog)" class="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg">
              <Icon name="heroicons:pencil" class="w-5 h-5" />
            </button>
            <button @click="deleteBlog(blog.id)" class="p-2 text-red-400 hover:bg-red-500/20 rounded-lg">
              <Icon name="heroicons:trash" class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      <div v-if="blogs.length === 0" class="text-center py-8 text-gray-400">
        Belum ada artikel
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
const blogs = ref([])
const showForm = ref(false)
const editingId = ref(null)
const form = ref(getEmptyForm())

function getEmptyForm() {
  return {
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    image: '',
    published: false
  }
}

const fetchBlogs = async () => {
  try {
    blogs.value = await $fetch('/api/admin/blog', {
      headers: { Authorization: `Bearer ${token.value}` }
    })
  } catch (error) {
    console.error('Error:', error)
  }
}

const saveBlog = async () => {
  try {
    if (editingId.value) {
      await $fetch(`/api/admin/blog/${editingId.value}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token.value}` },
        body: form.value
      })
    } else {
      await $fetch('/api/admin/blog', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token.value}` },
        body: form.value
      })
    }
    await fetchBlogs()
    showForm.value = false
    editingId.value = null
    form.value = getEmptyForm()
  } catch (error) {
    alert('Gagal menyimpan data')
  }
}

const editBlog = (blog) => {
  editingId.value = blog.id
  form.value = { ...blog }
  showForm.value = true
}

const deleteBlog = async (id) => {
  if (!confirm('Yakin ingin menghapus?')) return
  try {
    await $fetch(`/api/admin/blog/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token.value}` }
    })
    alert('Data berhasil dihapus!')
    await fetchBlogs()
    window.location.reload()
  } catch (error) {
    alert('Gagal menghapus data')
  }
}

onMounted(() => {
  fetchBlogs()
})
</script>
