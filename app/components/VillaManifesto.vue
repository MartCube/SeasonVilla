<script setup lang="ts">
import type { Villa } from '~~/villas'
const props = defineProps<{ villa: Villa }>()

// "*like this*" in the villa file becomes the highlighted phrase
const parts = computed(() => props.villa.manifesto.split('*').map((text, i) => ({ em: i % 2 === 1, words: text.trim().split(/\s+/).filter(Boolean) })))
</script>

<template>
  <section id="house" class="manifesto wrap">
    <span class="mono accent">The house</span>
    <h2 class="words">
      <template v-for="(p, i) in parts" :key="i">
        <em v-if="p.em"><template v-for="(w, k) in p.words" :key="k"><span class="w">{{ w }}</span>{{ ' ' }}</template></em>
        <template v-else><template v-for="(w, k) in p.words" :key="k"><span class="w">{{ w }}</span>{{ ' ' }}</template></template>
      </template>
    </h2>
    <div class="manifesto-row">
      <p data-reveal>{{ villa.intro }}</p>
      <div class="fig" data-clip><SmartImg :src="villa.introImg.src" :alt="villa.introImg.alt" fit="half" data-par /></div>
    </div>
    <div class="facts">
      <div v-for="f in villa.facts" :key="f.label" class="fact" data-reveal><b>{{ f.value }}</b><span class="mono">{{ f.label }}</span></div>
    </div>
  </section>
</template>
