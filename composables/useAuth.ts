export const useAuth = () => {
  const user = useState('user', () => {
    if (process.client) {
      const stored = localStorage.getItem('user')
      return stored ? JSON.parse(stored) : null
    }
    return null
  })
  
  const token = useState('token', () => {
    if (process.client) {
      return localStorage.getItem('token') || null
    }
    return null
  })

  const login = async (username: string, password: string) => {
    try {
      const response = await $fetch('/api/auth/login', {
        method: 'POST',
        body: { username, password }
      })
      
      if (response.success) {
        token.value = response.token
        user.value = response.user
        if (process.client) {
          localStorage.setItem('token', response.token)
          localStorage.setItem('user', JSON.stringify(response.user))
        }
        return { success: true }
      }
      return { success: false, error: 'Login failed' }
    } catch (error: any) {
      return { success: false, error: error.data?.statusMessage || error.message || 'Login failed' }
    }
  }

  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await $fetch('/api/auth/register', {
        method: 'POST',
        body: { username, email, password }
      })
      
      if (response.success) {
        return { success: true }
      }
    } catch (error: any) {
      return { success: false, error: error.data?.statusMessage || 'Registration failed' }
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    if (process.client) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
    navigateTo('/login')
  }

  const initAuth = () => {
    if (process.client) {
      const storedToken = localStorage.getItem('token')
      const storedUser = localStorage.getItem('user')
      if (storedToken && storedUser) {
        token.value = storedToken
        user.value = JSON.parse(storedUser)
      }
    }
  }

  // Auto-init on client side
  if (process.client) {
    initAuth()
  }

  const isAuthenticated = computed(() => !!token.value)

  return {
    user: readonly(user),
    token: readonly(token),
    login,
    register,
    logout,
    initAuth,
    isAuthenticated
  }
}
