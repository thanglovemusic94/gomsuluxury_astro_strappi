import type { StrapiMedia } from './types';

/** Unsplash ceramics imagery for local demo / preview */
const u = (id: string, w: number, h?: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ''}&q=80`;

export const demoImages = {
  logo: u('photo-1578749556568-bc2c40e68b61', 200, 200),
  hero: u('photo-1610701596007-11502861dcfa', 2000),
  craft: u('photo-1565193566173-7a0ee3dbe261', 1400),
  vase: u('photo-1618220179428-22790b461013', 1000),
  vaseAlt: u('photo-1578749556568-bc2c40e68b61', 1000),
  bowls: u('photo-1493106641515-6b5631de4bb9', 1000),
  plate: u('photo-1544787219-7f47ccb76574', 1000),
  workshop: u('photo-1581783342308-f792dbdd27c5', 1400),
  glazeNight: u('photo-1459411552884-841db9b3cc2a', 1400),
  about: u('photo-1556910103-1c02745aae4d', 1400),
  og: u('photo-1503602642458-232111445657', 1200),
} as const;

export function media(url: string, alt: string, width = 1000, height = 1250): StrapiMedia {
  return { url, alternativeText: alt, width, height };
}
