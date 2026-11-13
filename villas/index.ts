import type { Villa } from './types'
import { coast } from './coast'
import { mountain } from './mountain'

/**
 * The villas this site shows. The first one is the home page ("/"),
 * every other one gets its own page at "/<slug>" and a button on the season switch.
 * A client site with a single property keeps one entry and the switch disappears.
 */
export const villas: Villa[] = [coast, mountain]

export type { Villa }
