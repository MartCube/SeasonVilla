import type { RouterConfig } from '@nuxt/schema'
import { createWebHashHistory } from 'vue-router'

// Normal builds use real URLs ("/winter"). The preview build has no server
// behind it, so it keeps the page address and puts the route after a "#".
export default {
  history: () => (useRuntimeConfig().public.preview ? createWebHashHistory() : null)
} satisfies RouterConfig
