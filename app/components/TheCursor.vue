<script setup lang="ts">
// A small dot that grows into a labelled disc over anything marked data-cursor="Label".
const el = ref<HTMLElement | null>(null)
const label = ref('')
const big = ref(false)
const live = ref(false)

onMounted(() => {
  const { $motion } = useNuxtApp()
  if ($motion.reduce || !$motion.fine) return
  const x = $motion.gsap.quickTo(el.value, 'x', { duration: 0.25, ease: 'power3' })
  const y = $motion.gsap.quickTo(el.value, 'y', { duration: 0.25, ease: 'power3' })
  addEventListener('mousemove', (e) => {
    live.value = true
    x(e.clientX); y(e.clientY)
    const hit = (e.target as HTMLElement).closest?.<HTMLElement>('[data-cursor]')
    big.value = !!hit
    if (hit) label.value = hit.dataset.cursor ?? ''
  })
})
</script>

<template>
  <div ref="el" class="cursor" :class="{ big, live }" aria-hidden="true"><span>{{ label }}</span></div>
</template>
