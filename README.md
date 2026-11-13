# Villa template

A one-page site for a private villa, built with Nuxt 4 and deployed as static files on Netlify.
The demo ships two villas, a summer coast house and a winter chalet, with an animated switch between them.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run generate   # static build in .output/public (what Netlify runs)
```

## Make it a client's site

Everything a client changes lives in two places.

1. **Photos and film** go in `public/media/`. Use JPGs around 2000 px wide and one short muted MP4 for the hero (about 10 to 15 seconds, 1600 px wide, under 6 MB), plus one still frame of it as the poster.
2. **Text, colours and picture choices** go in one file per villa in `villas/`. Copy `villas/coast.ts`, rename it, and edit it. `villas/types.ts` explains every field.

Then list the villa in `villas/index.ts`. The first villa is the home page. Any further villa gets its own page at `/<slug>` and a button on the season switch. With one villa the switch disappears.

Run `npm run placeholders` after adding photos (the build does this too). It writes the blurred previews to `villas/placeholders.json`.

## How pictures load

- Every picture is served as AVIF or WebP in four widths, and the browser picks the one that fits the screen. On Netlify this is done by the Netlify Image CDN, locally and on other hosts by IPX during the build.
- A tiny blurred preview shows first and the real picture fades in over it.
- The hero poster is preloaded. The hero film starts only after the page is visible, and is skipped for visitors who use data saver or reduced motion.
- Pictures further down load shortly before they scroll into view. The suite hover pictures load when the list is near.

## Inquiry form

The form uses Netlify Forms. After the first deploy, open the site in Netlify, go to Forms, and add an email notification so inquiries reach the owner.

## Where things are

| Path | What |
|---|---|
| `villas/` | Content and colours, one file per villa |
| `public/media/` | Photos and film |
| `app/components/Villa*.vue` | The page sections |
| `app/composables/useVillaMotion.ts` | All scroll animation |
| `app/assets/css/main.css` | Layout and type |
| `netlify.toml` | Netlify build settings |
