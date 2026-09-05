export const useCrud = (endpoint: string, tokenRef: Ref<string | null> | string | null) => {
  const { token: authToken } = useAuth()
  
  // Get token from ref or use authToken
  const getToken = () => {
    if (typeof tokenRef === 'string') return tokenRef
    if (tokenRef && 'value' in tokenRef) return tokenRef.value
    return authToken.value
  }
  const items = ref([])
  const loading = ref(false)
  const searchQuery = ref('')
  const sortBy = ref('createdAt')
  const sortOrder = ref<'asc' | 'desc'>('desc')
  const selectedItems = ref<number[]>([])
  const currentPage = ref(1)
  const itemsPerPage = ref(10)
  const totalItems = ref(0)

  const fetchItems = async () => {
    loading.value = true
    try {
      const currentToken = getToken()
      const data = await $fetch(`/api/admin/${endpoint}`, {
        headers: currentToken ? { Authorization: `Bearer ${currentToken}` } : {}
      })
      items.value = data
      totalItems.value = data.length
      loading.value = false
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error)
      loading.value = false
    }
  }

  const createItem = async (data: any) => {
    loading.value = true
    try {
      const currentToken = getToken()
      const result = await $fetch(`/api/admin/${endpoint}`, {
        method: 'POST',
        headers: currentToken ? { Authorization: `Bearer ${currentToken}` } : {},
        body: data
      })
      await fetchItems()
      loading.value = false
      return { success: true, data: result }
    } catch (error: any) {
      loading.value = false
      return { success: false, error: error.data?.statusMessage || 'Gagal membuat data' }
    }
  }

  const updateItem = async (id: number, data: any) => {
    loading.value = true
    try {
      const currentToken = getToken()
      const result = await $fetch(`/api/admin/${endpoint}/${id}`, {
        method: 'PUT',
        headers: currentToken ? { Authorization: `Bearer ${currentToken}` } : {},
        body: data
      })
      await fetchItems()
      loading.value = false
      return { success: true, data: result }
    } catch (error: any) {
      loading.value = false
      return { success: false, error: error.data?.statusMessage || 'Gagal memperbarui data' }
    }
  }

  const deleteItem = async (id: number) => {
    loading.value = true
    try {
      const currentToken = getToken()
      await $fetch(`/api/admin/${endpoint}/${id}`, {
        method: 'DELETE',
        headers: currentToken ? { Authorization: `Bearer ${currentToken}` } : {}
      })
      await fetchItems()
      loading.value = false
      return { success: true }
    } catch (error: any) {
      loading.value = false
      return { success: false, error: error.data?.statusMessage || 'Gagal menghapus data' }
    }
  }

  const bulkDelete = async () => {
    if (selectedItems.value.length === 0) return { success: false, error: 'Tidak ada item yang dipilih' }
    
    loading.value = true
    try {
      const currentToken = getToken()
      await Promise.all(
        selectedItems.value.map(id => 
          $fetch(`/api/admin/${endpoint}/${id}`, {
            method: 'DELETE',
            headers: currentToken ? { Authorization: `Bearer ${currentToken}` } : {}
          })
        )
      )
      selectedItems.value = []
      await fetchItems()
      loading.value = false
      return { success: true }
    } catch (error: any) {
      loading.value = false
      return { success: false, error: 'Gagal menghapus beberapa item' }
    }
  }

  const duplicateItem = async (id: number) => {
    const item = items.value.find(i => i.id === id)
    if (!item) return { success: false, error: 'Item tidak ditemukan' }
    
    const { id: _, createdAt, updatedAt, ...itemData } = item
    return await createItem(itemData)
  }

  const filteredItems = computed(() => {
    let filtered = [...items.value]

    // Search filter
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(item => {
        return Object.values(item).some(val => 
          val && val.toString().toLowerCase().includes(query)
        )
      })
    }

    // Sort
    filtered.sort((a, b) => {
      const aVal = a[sortBy.value]
      const bVal = b[sortBy.value]
      
      if (sortOrder.value === 'asc') {
        return aVal > bVal ? 1 : -1
      } else {
        return aVal < bVal ? 1 : -1
      }
    })

    totalItems.value = filtered.length

    // Pagination
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return filtered.slice(start, end)
  })

  const totalPages = computed(() => {
    return Math.ceil(totalItems.value / itemsPerPage.value)
  })

  const toggleSelect = (id: number) => {
    const index = selectedItems.value.indexOf(id)
    if (index > -1) {
      selectedItems.value.splice(index, 1)
    } else {
      selectedItems.value.push(id)
    }
  }

  const selectAll = () => {
    if (selectedItems.value.length === filteredItems.value.length) {
      selectedItems.value = []
    } else {
      selectedItems.value = filteredItems.value.map(item => item.id)
    }
  }

  return {
    items,
    loading,
    searchQuery,
    sortBy,
    sortOrder,
    selectedItems,
    currentPage,
    itemsPerPage,
    totalItems,
    filteredItems,
    totalPages,
    fetchItems,
    createItem,
    updateItem,
    deleteItem,
    bulkDelete,
    duplicateItem,
    toggleSelect,
    selectAll
  }
}
