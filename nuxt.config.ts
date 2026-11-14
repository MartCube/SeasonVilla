import { villas } from './villas'

// `npm run preview:static` sets this: a build with relative paths and hash links
// that runs from any folder or share link, for showing the site before it is deployed.
const preview = process.env.VILLA_PREVIEW === '1'

// One template, many villas. Content lives in /villas, media in /public/media.
export default defineNuxtConfig({
  compatibilityDate: '2026-01-01',
  devtools: { enabled: false },
  modules: ['@nuxt/image'],
  css: [
    '@fontsource/instrument-serif/latin-400.css',
    '@fontsource/instrument-serif/latin-400-italic.css',
    '@fontsource-variable/manrope/wght.css',
    '@fontsource/dm-mono/latin-400.css',
    '~/assets/css/main.css'
  ],
  image: {
    // Locally and in `nuxt generate` images are optimized by IPX.
    // On Netlify the module switches to the Netlify Image CDN by itself.
    format: preview ? ['webp'] : ['avif', 'webp'],
    ...(preview ? { provider: 'preview', providers: { preview: { provider: '~/providers/preview.ts' } } } : {}),
    quality: 72,
    // Four widths per picture; the browser picks the right one for the screen.
    screens: { sm: 640, md: 1024, lg: 1600, xl: 2200 }
  },
  // hash links need the page to be drawn in the browser
  ...(preview ? { ssr: false, router: { options: { hashMode: true } } } : {}),
  runtimeConfig: { public: { preview } },
  app: {
    ...(preview ? { cdnURL: './', buildAssetsDir: '/static/' } : {}),
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' }],
      // Marks the page as animated before first paint, so nothing flashes in its final state.
      script: [{ innerHTML: "var d=document.documentElement;d.classList.add('has-js');if(!matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('has-motion')" }]
    }
  },
  nitro: {
    prerender: { routes: preview ? ['/'] : ['/', ...villas.slice(1).map(v => '/' + v.slug)] }
  }
})
