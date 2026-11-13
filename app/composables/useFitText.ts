/** Scales a one-line title so it spans its container, capped by a share of the screen height. */
export const useFitText = (el: Ref<HTMLElement | null>, maxVh = 0.46) => {
  const fit = () => {
    const t = el.value
    const box = t?.parentElement
    if (!t || !box) return
    const cs = getComputedStyle(box)
    const avail = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)
    t.style.fontSize = '100px'
    const w = t.scrollWidth
    if (w) t.style.fontSize = Math.min((100 * avail) / w * 0.995, innerHeight * maxVh) + 'px'
  }
  onMounted(() => {
    fit()
    addEventListener('resize', fit)
    document.fonts?.ready.then(fit)
  })
  onBeforeUnmount(() => removeEventListener('resize', fit))
  return fit
}
