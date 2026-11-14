import { defineProvider } from '@nuxt/image/runtime'

// Preview builds only (see nuxt.config.ts). Serves pictures that
// scripts/preview-images.mjs made ahead of time, from plain relative paths,
// so the built site also runs from a folder or a share link without a server.
const BUCKETS = [480, 640, 1024, 1600]

export default defineProvider({
  getImage: (src, { modifiers }) => {
    const name = src.split('/').pop()!.replace(/\.\w+$/, '')
    const want = Number(modifiers?.width) || 1600
    const w = BUCKETS.find(b => b >= want) ?? BUCKETS[BUCKETS.length - 1]
    return { url: `pv/${name}-${w}.webp` }
  }
})
