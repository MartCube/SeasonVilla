<script setup lang="ts">
import { villas } from '~~/villas'

// Moves between villas with a full-screen wipe that grows from the button.
const current = useVilla()
const ready = useStageReady()
const wipe = ref<HTMLElement | null>(null)
const label = ref('')
let busy = false
const path = (i: number) => (i === 0 ? '/' : '/' + villas[i]!.slug)

// warm the other page and its hero picture so the switch feels instant
onMounted(() => villas.forEach((v, i) => { if (v.slug !== current.value.slug) preloadRouteComponents(path(i)) }))

const go = async (i: number, e: MouseEvent) => {
  const next = villas[i]!
  if (busy || next.slug === current.value.slug) return
  const { $motion } = useNuxtApp()
  if ($motion.reduce) { await navigateTo(path(i)); scrollTo(0, 0); return }
  busy = true
  const { gsap, lenis, ScrollTrigger } = $motion
  const el = wipe.value!
  const at = `${e.clientX || innerWidth / 2}px ${e.clientY || innerHeight}px`
  label.value = next.season
  Object.assign(el.style, { display: 'flex', background: next.theme.bg, color: next.theme.ink })
  const text = el.firstElementChild

  await gsap.timeline()
    .fromTo(el, { clipPath: `circle(0% at ${at})`, yPercent: 0 }, { clipPath: `circle(150% at ${at})`, duration: 1.1, ease: 'expo.inOut' })
    .fromTo(text, { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, ease: 'expo.out' }, 0.35)
  ready.value = false
  await navigateTo(path(i))
  lenis?.scrollTo(0, { immediate: true, force: true })
  scrollTo(0, 0)
  await nextTick()
  await waitForHero(3000)
  ScrollTrigger.refresh()
  ready.value = true
  await gsap.timeline()
    .to(text, { yPercent: -60, opacity: 0, duration: 0.6, ease: 'expo.in' }, 0.15)
    .to(el, { yPercent: -100, duration: 1, ease: 'expo.inOut' }, 0.55)
  el.style.display = 'none'
  busy = false
}
</script>

<template>
  <div>
    <div class="season mono" role="group" aria-label="Season">
      <button v-for="(v, i) in villas" :key="v.slug" type="button" :aria-pressed="v.slug === current.slug" @click="go(i, $event)">{{ v.season }}</button>
    </div>
    <div ref="wipe" class="wipe" aria-hidden="true"><div class="display">{{ label }}</div></div>
  </div>
</template>
