import { villas } from '~~/villas'

/** True once the curtain (first load or season wipe) has lifted and the hero may play. */
export const useStageReady = () => useState('stage-ready', () => false)

/** The villa for the current URL. */
export const useVilla = () => {
  const route = useRoute()
  return computed(() => villas.find(v => v.slug === route.params.slug) ?? villas[0]!)
}

/** Resolves when the hero picture is on screen, or after a short wait at most. */
export const waitForHero = (max = 5000) => new Promise<void>((resolve) => {
  const done = () => resolve()
  const timer = setTimeout(done, max)
  const img = document.querySelector<HTMLImageElement>('.hero-media img')
  const fonts = document.fonts?.ready ?? Promise.resolve()
  const pic = !img || (img.complete && img.naturalWidth)
    ? Promise.resolve()
    : new Promise<void>((r) => { img.addEventListener('load', () => r(), { once: true }); img.addEventListener('error', () => r(), { once: true }) })
  Promise.all([fonts, pic]).then(() => { clearTimeout(timer); done() })
})

/** Villa colours as CSS variables on <html>, so the whole page (and the body) follows. */
export const useTheme = () => {
  const villa = useVilla()
  useHead({
    htmlAttrs: {
      style: computed(() => {
        const t = villa.value.theme
        return `--bg:${t.bg};--ink:${t.ink};--mute:${t.mute};--line:${t.line};--panel:${t.panel};--on-panel:${t.onPanel};--accent:${t.accent};--spark:${t.spark};color-scheme:${t.dark ? 'dark' : 'light'}`
      })
    }
  })
}
