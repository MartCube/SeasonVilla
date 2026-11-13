<script setup lang="ts">
import type { Villa } from '~~/villas'
const props = defineProps<{ villa: Villa }>()
const head = computed(() => { const w = props.villa.dayTitle.split(' '); return { last: w.pop(), rest: w.join(' ') } })
</script>

<template>
  <section id="day" class="day">
    <div class="day-stage">
      <div v-for="(d, i) in villa.day" :key="d.time" class="day-shot" :class="{ on: i === 0 }">
        <SmartImg :src="d.img" :alt="d.title" fit="half" />
      </div>
      <div class="day-clock">{{ villa.day[0]?.time }}</div>
    </div>
    <div class="day-steps">
      <div class="day-intro"><span class="mono spark">Hour by hour</span><h2 class="display">{{ head.rest }} <em>{{ head.last }}</em></h2></div>
      <article v-for="(d, i) in villa.day" :key="d.time" class="step" :class="{ on: i === 0 }" :data-t="d.time">
        <span class="mono spark">{{ d.time }}</span><h3>{{ d.title }}</h3><p>{{ d.text }}</p>
      </article>
    </div>
  </section>
</template>
