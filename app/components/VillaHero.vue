<script setup lang="ts">
import type { Villa } from '~~/villas'
const props = defineProps<{ villa: Villa }>()

const title = ref<HTMLElement | null>(null)
const video = ref<HTMLVideoElement | null>(null)
const playing = ref(false)
useFitText(title)

// The film is never in the first download. It starts only after the page is
// showing, and not at all for visitors who asked for less data or less motion.
const ready = useStageReady()
const startFilm = () => {
  const v = video.value
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
  if (!v || v.src || saveData || matchMedia('(prefers-reduced-motion: reduce)').matches) return
  // the preview build runs from relative paths
  v.src = useRuntimeConfig().public.preview ? props.villa.hero.video.slice(1) : props.villa.hero.video
  v.play().catch(() => {})
}
onMounted(() => { if (ready.value) startFilm() })
watch(ready, (r) => { if (r) startFilm() })
</script>

<template>
  <section id="top" class="hero">
    <div class="hero-media">
      <SmartImg :src="villa.hero.poster" :alt="`Aerial view of ${villa.place}`" fit="full" eager />
      <video ref="video" :class="{ on: playing }" muted loop playsinline preload="none" aria-hidden="true" @playing="playing = true" />
    </div>
    <div class="hero-in wrap">
      <div class="hero-meta mono"><span>{{ villa.place }}</span><span>{{ villa.coords }}</span></div>
      <h1 ref="title" class="hero-title display">
        <span class="sr-only">{{ villa.name.first }} {{ villa.name.last }}</span>
        <span aria-hidden="true"><SplitChars :text="villa.name.first" />&nbsp;<span class="it"><SplitChars :text="villa.name.last" /></span></span>
      </h1>
      <div class="hero-tag"><p>{{ villa.hero.tag }}</p><span class="scrollcue mono"><i />Scroll</span></div>
    </div>
  </section>
</template>
