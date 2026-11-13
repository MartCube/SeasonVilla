import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

// Smooth scrolling and the animation engine, set up once for the whole site.
export default defineNuxtPlugin((nuxtApp) => {
  gsap.registerPlugin(ScrollTrigger)
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches
  const state = { velocity: 0 }
  let lenis: Lenis | null = null

  if (!reduce) {
    lenis = new Lenis({ lerp: 0.085 })
    lenis.on('scroll', (e: Lenis) => { state.velocity = e.velocity; ScrollTrigger.update() })
    gsap.ticker.add(t => lenis!.raf(t * 1000))
    gsap.ticker.lagSmoothing(0)
  }

  // v-magnet: the element leans toward the pointer
  nuxtApp.vueApp.directive('magnet', {
    mounted(el: HTMLElement) {
      if (reduce || !fine) return
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect()
        gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.35, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.5, ease: 'power3' })
      })
      el.addEventListener('mouseleave', () => gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1,.4)' }))
    }
  })

  return { provide: { motion: { gsap, ScrollTrigger, lenis, state, reduce, fine } } }
})
