<script setup lang="ts">
import { villas } from '~~/villas'
const route = useRoute()
const villa = villas.find(v => v.slug === route.params.slug)
if (!villa) throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
</script>

<template>
  <VillaPage :villa="villa!" />
</template>
