<script setup lang="ts">
import type { Villa } from '~~/villas'
defineProps<{ villa: Villa }>()

const onDark = ref(true)
const hidden = ref(false)
let lastY = 0
const onScroll = () => {
  const y = scrollY
  hidden.value = y > lastY && y > 300
  lastY = y
  // white text over the film and the dark bands, ink over light sections
  onDark.value = [...document.querySelectorAll('.hero, .gal, .day, .inq')].some((el) => {
    const r = el.getBoundingClientRect()
    return r.top <= 40 && r.bottom > 40
  })
}
onMounted(() => { onScroll(); addEventListener('scroll', onScroll, { passive: true }) })
onBeforeUnmount(() => removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="nav" :class="{ 'on-dark': onDark, 'is-hidden': hidden }">
    <a href="#top" class="brand">{{ villa.name.first }} {{ villa.name.last }}</a>
    <nav class="nav-links mono" aria-label="Sections">
      <a href="#house">The house</a><a href="#rooms">Rooms</a><a href="#suites">Suites</a><a href="#day">A day</a><a href="#place">Place</a>
    </nav>
    <a v-magnet href="#inquire" class="cta mono">Inquire</a>
  </header>
</template>
