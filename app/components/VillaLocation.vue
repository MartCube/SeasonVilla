<script setup lang="ts">
import type { Villa } from '~~/villas'
defineProps<{ villa: Villa }>()
</script>

<template>
  <div>
    <div class="marq" aria-hidden="true">
      <div class="marq-in display"><span v-for="(m, i) in [...villa.marquee, ...villa.marquee]" :key="i">{{ m }}</span></div>
    </div>
    <section id="place" class="loc wrap">
      <div class="fig" data-clip><SmartImg :src="villa.location.img.src" :alt="villa.location.img.alt" fit="half" data-par /></div>
      <div>
        <span class="mono accent">The place</span>
        <h2 class="display">{{ villa.location.title }}</h2>
        <div class="loc-coord">{{ villa.coords }}</div>
        <ul class="rows">
          <li v-for="l in villa.location.rows" :key="l.label" data-reveal><span>{{ l.label }}</span><b>{{ l.value }}</b></li>
        </ul>
      </div>
    </section>
  </div>
</template>
