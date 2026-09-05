export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated, initAuth } = useAuth()
  
  // Initialize auth from localStorage
  if (process.client) {
    initAuth()
  }
  
  // Wait a bit for state to sync
  if (!isAuthenticated.value) {
    // Check localStorage directly as fallback
    if (process.client) {
      const token = localStorage.getItem('token')
      if (!token) {
        return navigateTo('/login')
      }
    } else {
      return navigateTo('/login')
    }
  }
})
