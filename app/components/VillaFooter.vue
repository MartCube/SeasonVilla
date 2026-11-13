<script setup lang="ts">
import type { Villa } from '~~/villas'
defineProps<{ villa: Villa }>()
const name = ref<HTMLElement | null>(null)
useFitText(name)
</script>

<template>
  <footer class="foot wrap">
    <p ref="name" class="foot-name display" aria-hidden="true"><SplitChars :text="villa.name.first" />&nbsp;<em><SplitChars :text="villa.name.last" /></em></p>
    <div class="foot-row mono"><span>{{ villa.place }}</span><span>{{ villa.credits }}</span></div>
  </footer>
</template>
