<script setup lang="ts">
// First-visit curtain. The counter follows real loading: it finishes when the
// hero picture and the fonts are in, then lifts and lets the hero play.
const villa = useVilla()
const ready = useStageReady()
const el = ref<HTMLElement | null>(null)
const count = ref(0)
const done = ref(false)
const pad = (n: number) => String(n).padStart(2, '0')

onMounted(async () => {
  const { $motion } = useNuxtApp()
  if ($motion.reduce) { done.value = true; ready.value = true; return }
  const { gsap, lenis } = $motion
  lenis?.stop()
  const n = { v: 0 }
  const set = () => { count.value = Math.round(n.v) }
  gsap.fromTo(el.value!.querySelector('.ch'), { yPercent: 110 }, { yPercent: 0, duration: 1.2, ease: 'expo.out', delay: 0.1 })
  // creep toward 85 while loading, then run to 100 once everything is in
  const creep = gsap.to(n, { v: 85, duration: 2.2, ease: 'power2.out', onUpdate: set })
  await Promise.all([waitForHero(), new Promise(r => setTimeout(r, 1300))])
  creep.kill()
  gsap.timeline({ onComplete: () => { done.value = true } })
    .to(n, { v: 100, duration: 0.5, ease: 'power2.inOut', onUpdate: set })
    .to(el.value, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.2, ease: 'expo.inOut' })
    .add(() => { ready.value = true; lenis?.start() }, '-=0.9')
})
</script>

<template>
  <div ref="el" class="pre" :class="{ done }" aria-hidden="true">
    <div class="pre-row"><span class="mono">{{ villa.place }}</span><span class="mono">{{ villa.coords }}</span></div>
    <div class="pre-row">
      <div class="display pre-name"><span class="ch">{{ villa.name.first }} {{ villa.name.last }}</span></div>
      <div class="pre-count">{{ pad(count) }}</div>
    </div>
  </div>
</template>
