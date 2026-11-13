<script setup lang="ts">
import type { Villa } from '~~/villas'
defineProps<{ villa: Villa }>()
const pad = (n: number) => String(n).padStart(2, '0')
</script>

<template>
  <section id="rooms" class="gal" data-cursor="Scroll">
    <div class="gal-ghost display" aria-hidden="true">Rooms Rooms</div>
    <div class="gal-head wrap mono"><span>Walk through the house</span><span><span class="gal-n">01</span> / {{ pad(villa.gallery.length) }}</span></div>
    <div class="gal-track">
      <figure v-for="(g, i) in villa.gallery" :key="g.src" class="gal-item" :style="{ '--ar': g.ratio, '--h': g.height }">
        <!-- the first two load with the page, the rest just before they slide in -->
        <div class="fig"><SmartImg :src="g.src" :alt="g.alt" fit="wide" :eager="i < 2" /></div>
        <figcaption class="mono"><span>{{ pad(i + 1) }}</span><span>{{ g.alt }}</span></figcaption>
      </figure>
      <div class="gal-end">
        <div class="display">Then<br><em>stay a while</em></div>
        <a v-magnet class="cta mono" href="#inquire">Ask about dates</a>
      </div>
    </div>
    <div class="gal-bar"><i /></div>
  </section>
</template>
