<template>
  <div>
    <label class="block text-sm font-medium text-gray-300 mb-2">
      <slot name="label">{{ label }}</slot>
    </label>
    
    <div class="space-y-2">
      <!-- Upload Button -->
      <div class="flex items-center gap-4">
        <label class="cursor-pointer">
          <input
            type="file"
            :accept="accept"
            @change="handleFileSelect"
            class="hidden"
            ref="fileInput"
          />
          <span class="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold transition-colors">
            <Icon name="heroicons:photo" class="w-5 h-5" />
            {{ uploading ? 'Mengupload...' : 'Pilih File' }}
          </span>
        </label>
        
        <input
          v-model="urlValue"
          type="text"
          class="flex-1 px-4 py-2 bg-slate-900 border border-gray-700 rounded-lg text-white"
          placeholder="atau masukkan URL langsung"
        />
      </div>

      <!-- Preview -->
      <div v-if="urlValue" class="mt-2">
        <label class="text-xs text-gray-400">{{ previewLabel }}:</label>
        <div class="mt-1 relative inline-block">
          <img
            :src="urlValue"
            :alt="label"
            class="w-32 h-32 object-cover rounded-lg border border-gray-700"
            @error="imageError = true"
          />
          <button
            v-if="urlValue && !imageError"
            @click="urlValue = ''"
            class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white text-xs"
            type="button"
          >
            <Icon name="heroicons:x-mark" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: 'Upload File'
  },
  previewLabel: {
    type: String,
    default: 'Preview'
  },
  accept: {
    type: String,
    default: 'image/*'
  }
})

const emit = defineEmits(['update:modelValue'])
const { token } = useAuth()

const fileInput = ref(null)
const uploading = ref(false)
const imageError = ref(false)

const urlValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const handleFileSelect = async (event) => {
  const file = event.target.files?.[0]
  if (!file) return

  uploading.value = true
  imageError.value = false

  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await $fetch('/api/upload', {
      method: 'POST',
      body: formData,
      headers: token.value ? { Authorization: `Bearer ${token.value}` } : {}
    })

    if (response.success) {
      urlValue.value = response.url
      alert('File berhasil diupload!')
    }
  } catch (error) {
    console.error('Upload error:', error)
    alert('Gagal mengupload file. Silakan coba lagi atau masukkan URL langsung.')
  } finally {
    uploading.value = false
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  }
}
</script>
