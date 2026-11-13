// The magnet effect only exists in the browser; this keeps server rendering quiet.
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('magnet', {})
})
