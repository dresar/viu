<template>
  <a
    href="https://wa.me/6281234567890"
    target="_blank"
    rel="noopener noreferrer"
    class="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 group"
    aria-label="WhatsApp"
    v-motion-slide-bottom
  >
    <Icon name="mdi:whatsapp" class="w-7 h-7 text-white" />
    <span class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-slate-900"></span>
  </a>
</template>
