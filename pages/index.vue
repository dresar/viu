<template>
  <div class="min-h-screen">
    <Navbar />
    <Hero />
    <About />
    <Education />
    <Skills />
    <Projects />
    <Experience />
    <Certificates />
    <Blog />
    <Contact />
    <Footer />
    <WhatsAppFloat />
  </div>
</template>

<script setup>
useHead({
  title: 'Portfolio - Personal Website',
  meta: [
    { name: 'description', content: 'Personal Portfolio Website' }
  ]
})
</script>
