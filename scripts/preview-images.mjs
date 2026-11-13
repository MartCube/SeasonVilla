// Makes the WebP files the preview build points at (see app/providers/preview.ts).
import { mkdir, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

const src = join(process.cwd(), 'public/media')
const out = join(process.cwd(), 'public/pv')
await mkdir(out, { recursive: true })
let n = 0
for (const file of (await readdir(src)).filter(f => /\.(jpe?g|png)$/i.test(f))) {
  const name = file.replace(/\.\w+$/, '')
  for (const w of [480, 640, 1024, 1600]) {
    await sharp(join(src, file)).resize(w, null, { withoutEnlargement: true }).webp({ quality: 72 }).toFile(join(out, `${name}-${w}.webp`))
    n++
  }
}
console.log(`preview images: ${n}`)
