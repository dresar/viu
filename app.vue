<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const { initAuth } = useAuth()

// Initialize auth immediately on client
if (process.client) {
  initAuth()
}

onMounted(() => {
  if (process.client) {
    initAuth()
  }
})
</script>
