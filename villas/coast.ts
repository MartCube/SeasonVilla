import type { Villa } from './types'

export const coast: Villa = {
  slug: 'summer',
  season: 'Summer',
  name: { first: 'Villa', last: 'Maris' },
  place: 'Costa Serena',
  coords: '43°42′ N · 7°21′ E',
  seo: {
    title: 'Villa Maris · Private villa on the Costa Serena',
    description: 'A white house above the water with five suites, an 18 m pool and a path to a private cove. Rented whole, by the week.'
  },
  theme: {
    dark: false, bg: '#E9F1EF', ink: '#06242C', mute: '#3E5D64', line: 'rgba(6,36,44,.18)',
    panel: '#06242C', onPanel: '#E9F1EF', accent: '#0B6E78', spark: '#F0B429'
  },
  hero: {
    video: '/media/coast.mp4',
    poster: '/media/coast-poster.jpg',
    tag: 'A white house above the water, kept for one party at a time.'
  },
  manifesto: 'Five suites, one long green pool and a path down to the cove. *Nothing on the calendar* unless you ask for it.',
  intro: 'The house comes with its own team of four. Breakfast is on the terrace, the boat is at the jetty, and the afternoon belongs to whoever gets to the hammock first.',
  introImg: { src: '/media/c-villa.jpg', alt: 'The villa and its pool on a sunny day' },
  facts: [
    { value: '10', label: 'Guests' }, { value: '5', label: 'Suites' },
    { value: '18 m', label: 'Pool' }, { value: '4 min', label: 'To the cove' }
  ],
  gallery: [
    { src: '/media/c-living.jpg', alt: 'The great room', ratio: '3/2', height: '62svh' },
    { src: '/media/c-terrace.jpg', alt: 'Upper terrace', ratio: '3/4', height: '52svh' },
    { src: '/media/c-pool.jpg', alt: 'The pool at noon', ratio: '16/9', height: '58svh' },
    { src: '/media/c-entry.jpg', alt: 'Garden gate', ratio: '3/4', height: '60svh' },
    { src: '/media/c-hall.jpg', alt: 'The long hall', ratio: '3/2', height: '50svh' },
    { src: '/media/c-lemon.jpg', alt: 'Lemon court', ratio: '3/2', height: '56svh' },
    { src: '/media/c-sunset.jpg', alt: 'Study, 20:40', ratio: '3/2', height: '48svh' }
  ],
  suitesLead: 'Every suite has its own bathroom, linen bedding and a door to the garden or the terrace.',
  suites: [
    { name: 'Mare', spec: '48 m² · King', note: 'Sea terrace, freestanding bath', img: '/media/c-bed1.jpg' },
    { name: 'Giardino', spec: '40 m² · King or twin', note: 'Garden door, rain shower', img: '/media/c-bed2.jpg' },
    { name: 'Limone', spec: '32 m² · Queen', note: 'Courtyard view, the quiet one', img: '/media/c-bed3.jpg' },
    { name: 'Scoglio', spec: '36 m² · King', note: 'Corner windows over the rocks', img: '/media/c-lounge.jpg' },
    { name: 'Pineta', spec: '30 m² · Twin', note: 'Under the pines, for the children', img: '/media/c-hall.jpg' }
  ],
  dayTitle: 'A day at Maris',
  day: [
    { time: '07:30', title: 'First swim', text: 'The pool is still and the sea is flat. Coffee is already on the terrace wall.', img: '/media/c-pool2.jpg' },
    { time: '11:00', title: 'Down to the cove', text: 'Ninety-two steps through the pines to clear water and warm rock.', img: '/media/c-cliff.jpg' },
    { time: '15:00', title: 'Out on the boat', text: 'The skipper knows the empty beaches. Lunch is grilled on board.', img: '/media/c-aerial.jpg' },
    { time: '20:30', title: 'The long table', text: 'Fish from the harbour, wine from up the hill, and the light going pink.', img: '/media/c-sea.jpg' }
  ],
  marquee: ['Summer', 'held still', 'Salt', 'lime wash', 'Late light', 'slow mornings'],
  location: {
    title: 'The quiet side of the bay',
    img: { src: '/media/c-coast.jpg', alt: 'Villas among pines along the blue coast' },
    rows: [
      { label: 'International airport', value: '35 min' }, { label: 'Harbour town and market', value: '10 min' },
      { label: 'Marina', value: '15 min' }, { label: 'Private cove', value: '4 min on foot' }
    ]
  },
  inquiry: { line1: 'Come for', line2: 'the summer', season: 'May to October · Saturday to Saturday', dates: '12 to 19 June', party: '8 adults, 2 children' },
  credits: 'Concept site with sample content. Photos and film by Unsplash and Pexels contributors.'
}
