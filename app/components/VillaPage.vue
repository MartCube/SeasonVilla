<script setup lang="ts">
import type { Villa } from '~~/villas'
const props = defineProps<{ villa: Villa }>()

useSeoMeta({
  title: () => props.villa.seo.title,
  description: () => props.villa.seo.description,
  ogTitle: () => props.villa.seo.title,
  ogDescription: () => props.villa.seo.description,
  ogImage: () => props.villa.hero.poster
})

const root = ref<HTMLElement | null>(null)
useVillaMotion(root)

// in-page links glide instead of jumping
const { $motion } = useNuxtApp()
const glide = (e: MouseEvent) => {
  const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
  const target = a && document.querySelector<HTMLElement>(a.getAttribute('href')!)
  if (!target || !$motion?.lenis) return
  e.preventDefault()
  $motion.lenis.scrollTo(target, { duration: 1.6 })
}
</script>

<template>
  <div ref="root" @click="glide">
    <SiteNav :villa="villa" />
    <main>
      <VillaHero :villa="villa" />
      <VillaManifesto :villa="villa" />
      <VillaGallery :villa="villa" />
      <VillaSuites :villa="villa" />
      <VillaDay :villa="villa" />
      <VillaLocation :villa="villa" />
      <VillaInquiry :villa="villa" />
    </main>
    <VillaFooter :villa="villa" />
  </div>
</template>
