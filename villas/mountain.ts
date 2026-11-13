import type { Villa } from './types'

export const mountain: Villa = {
  slug: 'winter',
  season: 'Winter',
  name: { first: 'Chalet', last: 'Aurel' },
  place: 'Val Aurel · 1,650 m',
  coords: '46°29′ N · 9°50′ E',
  seo: {
    title: 'Chalet Aurel · Private ski chalet in Val Aurel',
    description: 'A timber chalet for twelve with six bedrooms, a spa under the eaves and the lift eighty metres from the door. Fully catered, by the week.'
  },
  theme: {
    dark: true, bg: '#0C0F11', ink: '#EEE9E0', mute: '#A8A297', line: 'rgba(238,233,224,.18)',
    panel: '#171C1F', onPanel: '#EEE9E0', accent: '#E39A5B', spark: '#E39A5B'
  },
  hero: {
    video: '/media/mtn.mp4',
    poster: '/media/mtn-poster.jpg',
    tag: 'A private chalet for twelve, with the fire lit and first tracks at the door.'
  },
  manifesto: 'Old timber, six bedrooms and a spa under the eaves. *The boots are warm* before you wake.',
  intro: 'A chef, a host and a driver live in for the week. Guides meet you at the door, the lift is eighty metres away, and the hot tub is at 38 degrees when you come back.',
  introImg: { src: '/media/m-chalet.jpg', alt: 'Timber chalet in fresh snow' },
  facts: [
    { value: '12', label: 'Guests' }, { value: '6', label: 'Bedrooms' },
    { value: '80 m', label: 'To the lift' }, { value: '38°', label: 'Hot tub' }
  ],
  gallery: [
    { src: '/media/m-living.jpg', alt: 'The great room', ratio: '3/2', height: '62svh' },
    { src: '/media/m-dining.jpg', alt: 'Long table', ratio: '3/4', height: '54svh' },
    { src: '/media/m-kitchen.jpg', alt: 'Kitchen, valley side', ratio: '3/2', height: '56svh' },
    { src: '/media/m-lake.jpg', alt: 'The lake cabin', ratio: '3/4', height: '60svh' },
    { src: '/media/m-fire.jpg', alt: 'Fire room', ratio: '3/2', height: '52svh' },
    { src: '/media/m-ski.jpg', alt: 'Ski room', ratio: '3/2', height: '48svh' },
    { src: '/media/m-spa.jpg', alt: 'Spa floor', ratio: '4/3', height: '58svh' }
  ],
  suitesLead: 'Six en-suite rooms on two floors, each with wool throws, shutters and a view down the valley.',
  suites: [
    { name: 'The Master', spec: '52 m² · King', note: 'Open fire, copper bath, balcony', img: '/media/m-bed1.jpg' },
    { name: 'Forest', spec: '34 m² · King', note: 'Reading nook in the window', img: '/media/m-bed2.jpg' },
    { name: 'Valley', spec: '34 m² · King or twin', note: 'Morning sun, valley side', img: '/media/m-window.jpg' },
    { name: 'Larch', spec: '30 m² · Queen', note: 'Under the old beams', img: '/media/m-forest.jpg' },
    { name: 'Bunk Loft', spec: '40 m² · Four bunks', note: 'A den for the children', img: '/media/m-chalet2.jpg' }
  ],
  dayTitle: 'A day at Aurel',
  day: [
    { time: '08:00', title: 'First tracks', text: 'Your guide is at the door. The lift opens and the piste is still corduroy.', img: '/media/m-peak.jpg' },
    { time: '12:30', title: 'Lunch on the mountain', text: 'A table in the sun at the hut above the trees, skis parked in the snow.', img: '/media/m-chalet2.jpg' },
    { time: '16:30', title: 'Fire and water', text: 'Sauna, steam, then the hot tub with the peaks turning orange.', img: '/media/m-spa.jpg' },
    { time: '20:00', title: 'Dinner by the chef', text: 'Five courses at the long table. The cellar is open.', img: '/media/m-fire.jpg' }
  ],
  marquee: ['Above', 'the snow line', 'Timber', 'wool', 'Firelight', 'first tracks'],
  location: {
    title: 'At the top of the valley',
    img: { src: '/media/m-hero.jpg', alt: 'Snow covered peaks at golden hour' },
    rows: [
      { label: 'Ski lift', value: '80 m' }, { label: 'Village and bakery', value: '6 min' },
      { label: 'International airport', value: '1 h 40' }, { label: 'Heliport', value: '10 min' }
    ]
  },
  inquiry: { line1: 'Come for', line2: 'the snow', season: 'December to April · Saturday to Saturday', dates: '16 to 23 January', party: '12 guests' },
  credits: 'Concept site with sample content. Photos and film by Unsplash and Pexels contributors.'
}
