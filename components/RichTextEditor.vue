<template>
  <ClientOnly>
    <div class="rich-text-editor">
      <label v-if="label" class="block text-sm font-medium text-gray-300 mb-2">
        {{ label }}
      </label>
      
      <div class="bg-slate-900 border border-gray-700 rounded-lg overflow-hidden shadow-lg">
        <QuillEditor
          v-model:content="content"
          contentType="html"
          :options="editorOptions"
          theme="snow"
          class="quill-editor"
          @update:content="handleUpdate"
        />
      </div>
    </div>
    <template #fallback>
      <div class="bg-slate-900 border border-gray-700 rounded-lg p-4 min-h-[300px] flex items-center justify-center">
        <div class="text-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto mb-2"></div>
          <p class="text-gray-400">Memuat editor...</p>
        </div>
      </div>
    </template>
  </ClientOnly>
</template>

<script setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const content = computed({
  get: () => props.modelValue || '',
  set: (value) => emit('update:modelValue', value)
})

const editorOptions = {
  modules: {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'align': [] }],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video'],
      ['clean']
    ]
  },
  placeholder: 'Tulis deskripsi lengkap di sini...',
  theme: 'snow'
}

const handleUpdate = (value) => {
  emit('update:modelValue', value)
}
</script>

<style scoped>
.rich-text-editor {
  width: 100%;
}

.quill-editor :deep(.ql-container) {
  min-height: 300px;
  max-height: 600px;
  overflow-y: auto;
  font-size: 15px;
  color: #e2e8f0;
  background: #0f172a;
  border: none;
  border-top: 1px solid #334155;
}

.quill-editor :deep(.ql-editor) {
  min-height: 300px;
  color: #e2e8f0;
  padding: 1.5rem;
}

.quill-editor :deep(.ql-editor.ql-blank::before) {
  color: #64748b;
  font-style: normal;
}

.quill-editor :deep(.ql-toolbar) {
  background: #1e293b;
  border: none;
  border-bottom: 1px solid #334155;
  padding: 0.75rem;
}

.quill-editor :deep(.ql-toolbar .ql-stroke) {
  stroke: #cbd5e1;
}

.quill-editor :deep(.ql-toolbar .ql-fill) {
  fill: #cbd5e1;
}

.quill-editor :deep(.ql-toolbar .ql-picker-label) {
  color: #cbd5e1;
}

.quill-editor :deep(.ql-toolbar button:hover),
.quill-editor :deep(.ql-toolbar button.ql-active) {
  background: #8b5cf6;
  border-radius: 4px;
}

.quill-editor :deep(.ql-toolbar button:hover .ql-stroke),
.quill-editor :deep(.ql-toolbar button.ql-active .ql-stroke) {
  stroke: #ffffff;
}

.quill-editor :deep(.ql-toolbar button:hover .ql-fill),
.quill-editor :deep(.ql-toolbar button.ql-active .ql-fill) {
  fill: #ffffff;
}

.quill-editor :deep(.ql-toolbar .ql-picker-item:hover) {
  background: #8b5cf6;
  color: #ffffff;
}

.quill-editor :deep(.ql-snow .ql-picker) {
  color: #cbd5e1;
}

.quill-editor :deep(.ql-snow .ql-picker-options) {
  background: #1e293b;
  border: 1px solid #334155;
}

/* Scrollbar styling */
.quill-editor :deep(.ql-container)::-webkit-scrollbar {
  width: 8px;
}

.quill-editor :deep(.ql-container)::-webkit-scrollbar-track {
  background: #1e293b;
}

.quill-editor :deep(.ql-container)::-webkit-scrollbar-thumb {
  background: #475569;
  border-radius: 4px;
}

.quill-editor :deep(.ql-container)::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}
</style>