// All scroll-driven motion for a villa page, in one place.
// Everything is created inside a gsap context so leaving the page cleans it up.
export const useVillaMotion = (root: Ref<HTMLElement | null>) => {
  const { $motion } = useNuxtApp()
  const ready = useStageReady()
  let ctx: gsap.Context | null = null
  let tick: (() => void) | null = null
  let played = false

  const heroIntro = () => {
    if (played || !root.value || $motion.reduce) return
    played = true
    const { gsap } = $motion
    const q = gsap.utils.selector(root.value)
    gsap.timeline()
      .fromTo(q('.hero-media .simg'), { scale: 1.35 }, { scale: 1, duration: 2.4, ease: 'expo.out' }, 0)
      .to(q('.hero-title .ch'), { y: 0, duration: 1.5, ease: 'expo.out', stagger: 0.045 }, 0.15)
      .to(q('.hero-meta, .hero-tag'), { opacity: 1, duration: 1.2, ease: 'expo.out', stagger: 0.12 }, 0.7)
  }

  onMounted(() => {
    if ($motion.reduce || !root.value) return
    const { gsap, ScrollTrigger, state } = $motion
    const pad = (n: number) => String(n).padStart(2, '0')

    ctx = gsap.context((self) => {
      const q = self.selector!

      // hero: the film shrinks into a framed window while the name drifts up
      gsap.to('.hero-media', { clipPath: 'inset(9% 5% 14% 5% round 28px)', ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
      gsap.to('.hero-in', { yPercent: -22, autoAlpha: 0, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: '75% top', scrub: true } })

      // manifesto: words light up as you read
      gsap.fromTo('.words .w', { opacity: 0.14 }, { opacity: 1, ease: 'none', stagger: 0.08, scrollTrigger: { trigger: '.words', start: 'top 82%', end: 'bottom 48%', scrub: true } })

      // pictures: wipe in, then drift inside their frame
      q('[data-clip]').forEach((el: Element) => gsap.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 85%' } }))
      q('[data-par]').forEach((el: Element) => gsap.fromTo(el, { yPercent: -9, scale: 1.2 }, { yPercent: 9, scale: 1.2, ease: 'none', scrollTrigger: { trigger: el.closest('.fig'), start: 'top bottom', end: 'bottom top', scrub: true } }))
      q('[data-reveal]').forEach((el: Element) => gsap.fromTo(el, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%' } }))
      q('.sec-head h2, .loc h2, .inq h2, .day-intro h2').forEach((el: Element) => gsap.fromTo(el, { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%' } }))
      q('.suite').forEach((el: Element) => gsap.fromTo(el, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 92%' } }))

      // gallery: vertical scroll walks sideways through the house
      const track = q('.gal-track')[0] as HTMLElement
      const items = q('.gal-item') as HTMLElement[]
      const counter = q('.gal-n')[0] as HTMLElement
      const dist = () => Math.max(0, track.scrollWidth - innerWidth)
      const walk = gsap.to(track, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: {
          trigger: '.gal', start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1,
          onUpdate: (st) => { gsap.set('.gal-bar i', { scaleX: st.progress }); counter.textContent = pad(Math.min(items.length, 1 + Math.floor(st.progress * items.length))) }
        }
      })
      gsap.to('.gal-ghost', { xPercent: -30, ease: 'none', scrollTrigger: { trigger: '.gal', start: 'top bottom', end: () => '+=' + (dist() + innerHeight * 2), scrub: true } })
      items.forEach(it => gsap.fromTo(it.querySelector('img'), { xPercent: -8, scale: 1.18 }, { xPercent: 8, scale: 1.18, ease: 'none', scrollTrigger: { trigger: it, containerAnimation: walk, start: 'left right', end: 'right left', scrub: true } }))

      // the day: each hour wipes a new picture in and sets the clock
      const shots = q('.day-shot') as HTMLElement[]
      const steps = q('.step') as HTMLElement[]
      const clock = q('.day-clock')[0] as HTMLElement
      const setHour = (i: number) => {
        shots.forEach((s, k) => s.classList.toggle('on', k <= i))
        steps.forEach((s, k) => s.classList.toggle('on', k === i))
        clock.textContent = steps[i]!.dataset.t ?? ''
      }
      steps.forEach((s, i) => ScrollTrigger.create({ trigger: s, start: 'top 62%', end: 'bottom 62%', onEnter: () => setHour(i), onEnterBack: () => setHour(i) }))

      // footer name rises letter by letter
      gsap.fromTo('.foot-name .ch', { yPercent: 115 }, { yPercent: 0, duration: 1.4, ease: 'expo.out', stagger: 0.04, scrollTrigger: { trigger: '.foot', start: 'top 80%' } })

      // marquee: drifts on its own, pushed and skewed by scroll speed
      const m = q('.marq-in')[0] as HTMLElement
      let x = 0
      tick = () => {
        const half = m.scrollWidth / 2
        x -= 1.1 + Math.abs(state.velocity) * 0.35
        if (-x >= half) x += half
        gsap.set(m, { x, skewX: gsap.utils.clamp(-8, 8, state.velocity * -0.25) })
      }
      gsap.ticker.add(tick)
    }, root.value)

    // the suite picture follows the pointer
    const floater = document.querySelector<HTMLElement>('.floater')
    if ($motion.fine && floater) {
      const fx = gsap.quickTo(floater, 'x', { duration: 0.7, ease: 'power3' })
      const fy = gsap.quickTo(floater, 'y', { duration: 0.7, ease: 'power3' })
      const move = (e: MouseEvent) => { fx(e.clientX + 28); fy(e.clientY - floater.offsetHeight / 2) }
      root.value.querySelector('.suites')?.addEventListener('mousemove', move as EventListener)
    }

    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    addEventListener('load', () => ScrollTrigger.refresh(), { once: true })
    if (ready.value) heroIntro()
  })

  watch(ready, (r) => { if (r) heroIntro() })

  onBeforeUnmount(() => {
    if (tick) $motion.gsap.ticker.remove(tick)
    ctx?.revert()
  })
}
