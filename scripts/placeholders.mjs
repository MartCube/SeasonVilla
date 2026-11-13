// Builds tiny blurred previews for every image in public/media, so pictures
// fade in from a soft colour wash instead of popping in from blank.
import { readdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

const dir = join(process.cwd(), 'public/media')
const out = {}
for (const file of (await readdir(dir)).filter(f => /\.(jpe?g|png|webp)$/i.test(f)).sort()) {
  const img = sharp(join(dir, file))
  const { width, height } = await img.metadata()
  const buf = await img.resize(20, null, { fit: 'inside' }).blur(1.2).webp({ quality: 40 }).toBuffer()
  out['/media/' + file] = { w: width, h: height, lqip: 'data:image/webp;base64,' + buf.toString('base64') }
}
await writeFile(join(process.cwd(), 'villas/placeholders.json'), JSON.stringify(out, null, 1) + '\n')
console.log(`placeholders: ${Object.keys(out).length} images`)
