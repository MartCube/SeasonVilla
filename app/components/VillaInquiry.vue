<script setup lang="ts">
import type { Villa } from '~~/villas'
const props = defineProps<{ villa: Villa }>()

// Netlify Forms: the form below is found at build time, and submissions land in
// the Netlify dashboard (and by email, once a notification is set there).
const state = ref<'idle' | 'sending' | 'sent' | 'error'>('idle')
const send = async (e: Event) => {
  const form = e.target as HTMLFormElement
  const data = new URLSearchParams(new FormData(form) as unknown as Record<string, string>)
  state.value = 'sending'
  try {
    const res = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: data.toString() })
    if (!res.ok) throw new Error(String(res.status))
    state.value = 'sent'
    form.reset()
  } catch {
    state.value = 'error'
  }
}
const villaName = computed(() => `${props.villa.name.first} ${props.villa.name.last}`)
</script>

<template>
  <section id="inquire" class="inq">
    <div class="wrap inq-grid">
      <div><span class="mono">{{ villa.inquiry.season }}</span><h2 class="display">{{ villa.inquiry.line1 }}<br><em>{{ villa.inquiry.line2 }}</em></h2></div>
      <form name="inquiry" method="POST" data-netlify="true" netlify-honeypot="company" @submit.prevent="send">
        <input type="hidden" name="form-name" value="inquiry">
        <input type="hidden" name="villa" :value="villaName">
        <p class="sr-only"><label>Leave this empty <input name="company" tabindex="-1" autocomplete="off"></label></p>
        <div class="field"><label class="mono" for="f-name">Name</label><input id="f-name" name="name" autocomplete="name" required></div>
        <div class="field"><label class="mono" for="f-mail">Email</label><input id="f-mail" name="email" type="email" autocomplete="email" required></div>
        <div class="field"><label class="mono" for="f-dates">Dates</label><input id="f-dates" name="dates" :placeholder="villa.inquiry.dates"></div>
        <div class="field"><label class="mono" for="f-party">Party</label><input id="f-party" name="party" :placeholder="villa.inquiry.party"></div>
        <div class="field full"><label class="mono" for="f-msg">Anything we should know</label><textarea id="f-msg" name="message" rows="2" /></div>
        <button v-magnet class="send mono" type="submit" :disabled="state === 'sending'">{{ state === 'sending' ? 'Sending' : 'Send' }}<br>inquiry</button>
        <p class="note" role="status">
          <template v-if="state === 'sent'">Thank you. We reply within one working day.</template>
          <template v-else-if="state === 'error'">That did not go through. Please try again in a moment.</template>
        </p>
      </form>
    </div>
  </section>
</template>
