<script setup lang="ts">
import { villas } from '~~/villas'
useTheme()
</script>

<template>
  <div>
    <div class="grain" aria-hidden="true" />
    <ThePreloader />
    <TheCursor />
    <SeasonSwitch v-if="villas.length > 1" />
    <NuxtPage />
  </div>
</template>
