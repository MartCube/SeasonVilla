<script setup lang="ts">
// Optimized, responsive picture with a blurred preview underneath.
// AVIF and WebP in several widths come from @nuxt/image; the preview from scripts/placeholders.mjs.
import placeholders from '~~/villas/placeholders.json'

defineOptions({ inheritAttrs: false })
const props = defineProps<{
  src: string
  alt?: string
  /** full: spans the screen · half: half the screen on desktop · wide: gallery frame · small: thumbnails */
  fit?: 'full' | 'half' | 'wide' | 'small'
  eager?: boolean
}>()

const SIZES = {
  full: 'sm:100vw md:100vw lg:100vw xl:100vw',
  half: 'sm:100vw md:50vw lg:50vw xl:50vw',
  wide: 'sm:100vw md:60vw lg:60vw xl:60vw',
  small: 'sm:100vw md:480px'
}

const ph = computed(() => (placeholders as Record<string, { w: number; h: number; lqip: string }>)[props.src])
const loaded = ref(false)
const pic = ref<{ $el: HTMLElement } | null>(null)
onMounted(() => {
  const el = pic.value?.$el?.querySelector?.('img')
  if (el?.complete && el.naturalWidth) loaded.value = true
})
</script>

<template>
  <span class="simg" :style="ph ? { backgroundImage: `url(${ph.lqip})` } : undefined">
    <NuxtPicture
      ref="pic"
      :src="src"
      :alt="alt ?? ''"
      :sizes="SIZES[fit ?? 'half']"
      densities="x1"
      :width="ph?.w"
      :height="ph?.h"
      :loading="eager ? 'eager' : 'lazy'"
      :preload="eager ? { fetchPriority: 'high' } : false"
      :img-attrs="{ class: loaded ? 'in' : undefined, decoding: 'async', fetchpriority: eager ? 'high' : undefined, ...$attrs }"
      @load="loaded = true"
    />
  </span>
</template>
