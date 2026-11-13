export interface Img { src: string; alt: string }

export interface Villa {
  /** URL segment. The first villa in villas/index.ts is served at "/". */
  slug: string
  /** Label on the season switch and on the transition screen. */
  season: string
  name: { first: string; last: string }
  place: string
  coords: string
  seo: { title: string; description: string }
  /** Colours for this villa. `dark: true` sets dark form controls and scrollbars. */
  theme: { dark: boolean; bg: string; ink: string; mute: string; line: string; panel: string; onPanel: string; accent: string; spark: string }
  hero: { video: string; poster: string; tag: string }
  /** Wrap the phrase to highlight in *asterisks*. */
  manifesto: string
  intro: string
  introImg: Img
  facts: { value: string; label: string }[]
  /** ratio is CSS aspect-ratio, height is a CSS length (svh works well). */
  gallery: (Img & { ratio: string; height: string })[]
  suitesLead: string
  suites: { name: string; spec: string; note: string; img: string }[]
  dayTitle: string
  day: { time: string; title: string; text: string; img: string }[]
  /** Alternating solid and outlined words. */
  marquee: string[]
  location: { title: string; img: Img; rows: { label: string; value: string }[] }
  inquiry: { line1: string; line2: string; season: string; dates: string; party: string }
  credits: string
}
