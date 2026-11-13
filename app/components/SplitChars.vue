<script setup lang="ts">
// Each letter in its own mask so titles can rise letter by letter.
defineProps<{ text: string }>()
</script>

<template>
  <span v-for="(c, i) in [...text]" :key="i" class="mask"><span class="ch">{{ c === ' ' ? ' ' : c }}</span></span>
</template>
