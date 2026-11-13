<script setup lang="ts">
import type { Villa } from '~~/villas'
defineProps<{ villa: Villa }>()

const pad = (n: number) => String(n).padStart(2, '0')

// The pictures that follow the pointer stay unloaded (their box is not displayed)
// until the list is about to scroll into view on a device with a mouse.
const root = ref<HTMLElement | null>(null)
const near = ref(false)
const active = ref('')
const show = ref(false)
onMounted(() => {
  const io = new IntersectionObserver((e) => { if (e.some(x => x.isIntersecting)) { near.value = matchMedia('(hover:hover) and (pointer:fine)').matches; io.disconnect() } }, { rootMargin: '100% 0px' })
  if (root.value) io.observe(root.value)
})
</script>

<template>
  <section id="suites" ref="root" class="suites wrap">
    <div class="sec-head"><h2 class="display">Where you <em>sleep</em></h2><p>{{ villa.suitesLead }}</p></div>
    <div>
      <a
        v-for="(r, i) in villa.suites" :key="r.name" class="suite" href="#inquire" data-cursor="View"
        @mouseenter="active = r.img; show = true" @mouseleave="show = false"
      >
        <span class="mono num">{{ pad(i + 1) }}</span>
        <h3>{{ r.name }}</h3>
        <span class="meta mono"><span>{{ r.spec }}</span><span>{{ r.note }}</span></span>
        <span class="fig thumb"><SmartImg :src="r.img" fit="small" /></span>
      </a>
    </div>
    <Teleport to="body">
      <div class="floater" :class="{ on: show, armed: near }" aria-hidden="true">
        <NuxtImg v-for="r in villa.suites" :key="r.img" :src="r.img" alt="" width="480" height="600" fit="cover" format="webp" loading="lazy" :class="{ on: active === r.img }" />
      </div>
    </Teleport>
  </section>
</template>
