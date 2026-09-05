<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4">
    <div class="w-full max-w-md">
      <div class="bg-slate-800/50 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20 shadow-2xl">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gradient mb-2">Admin Login</h1>
          <p class="text-gray-400">Masuk ke admin panel</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Username
            </label>
            <input
              v-model="form.username"
              type="text"
              required
              class="w-full px-4 py-3 bg-slate-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="Masukkan username"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              v-model="form.password"
              type="password"
              required
              class="w-full px-4 py-3 bg-slate-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="Masukkan password"
            />
          </div>

          <div v-if="error" class="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-400 text-sm">
            {{ error }}
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg font-semibold text-white hover:from-purple-700 hover:to-purple-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading">Memproses...</span>
            <span v-else>Masuk</span>
          </button>
        </form>

        <!-- Demo Login Button -->
        <div class="mt-4">
          <button
            @click="handleDemoLogin"
            :disabled="loading"
            class="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 rounded-lg font-semibold text-white hover:from-green-700 hover:to-green-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Icon name="heroicons:sparkles" class="w-5 h-5" />
            <span>Demo Login (Admin)</span>
          </button>
          <p class="text-xs text-gray-500 text-center mt-2">Gunakan kredensial default untuk login cepat</p>
        </div>

        <div class="mt-6 text-center">
          <button
            @click="showRegister = !showRegister"
            class="text-purple-400 hover:text-purple-300 text-sm"
          >
            {{ showRegister ? 'Sudah punya akun? Login' : 'Belum punya akun? Daftar' }}
          </button>
        </div>

        <!-- Register Form -->
        <form v-if="showRegister" @submit.prevent="handleRegister" class="mt-6 space-y-6 pt-6 border-t border-gray-700">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Username
            </label>
            <input
              v-model="registerForm.username"
              type="text"
              required
              class="w-full px-4 py-3 bg-slate-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="Masukkan username"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              v-model="registerForm.email"
              type="email"
              required
              class="w-full px-4 py-3 bg-slate-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="Masukkan email"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              v-model="registerForm.password"
              type="password"
              required
              class="w-full px-4 py-3 bg-slate-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="Masukkan password"
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 rounded-lg font-semibold text-white hover:from-green-700 hover:to-green-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading">Mendaftar...</span>
            <span v-else>Daftar</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})

const { login, register: registerUser } = useAuth()
const router = useRouter()

const form = ref({
  username: '',
  password: ''
})

const registerForm = ref({
  username: '',
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')
const showRegister = ref(false)

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  
  const result = await login(form.value.username, form.value.password)
  
  if (result.success) {
    router.push('/admin')
  } else {
    error.value = result.error
  }
  
  loading.value = false
}

const handleRegister = async () => {
  loading.value = true
  error.value = ''
  
  const result = await registerUser(
    registerForm.value.username,
    registerForm.value.email,
    registerForm.value.password
  )
  
  if (result.success) {
    error.value = 'Registrasi berhasil! Silakan login.'
    showRegister.value = false
    registerForm.value = { username: '', email: '', password: '' }
  } else {
    error.value = result.error
  }
  
  loading.value = false
}

const handleDemoLogin = async () => {
  loading.value = true
  error.value = ''
  
  // Use default admin credentials
  form.value.username = 'admin'
  form.value.password = 'admin123'
  
  const result = await login('admin', 'admin123')
  
  if (result.success) {
    router.push('/admin')
  } else {
    error.value = result.error || 'Gagal login dengan kredensial demo'
  }
  
  loading.value = false
}
</script>
