import type { StrapiMedia } from './types';

/** Brand assets sourced from gomsuluxury.vn (local `/public/brand`) */
const brand = (file: string) => `/brand/${file}`;

export const demoImages = {
  logo: brand('logo.png'),
  logoMark: brand('logo-mark.png'),
  hero: brand('hero.jpg'),
  heroAlt: brand('hero-alt.jpg'),
  craft: brand('craft.jpg'),
  studio: brand('studio.jpg'),
  about: brand('about.jpg'),
  workshop: brand('workshop.jpg'),
  og: brand('og.jpg'),
  vase: brand('product-1.jpg'),
  vaseAlt: brand('product-2.jpg'),
  bowls: brand('product-3.jpg'),
  plate: brand('product-4.jpg'),
  figurine: brand('product-5.jpg'),
  teaJar: brand('product-6.jpg'),
  glazeNight: brand('studio.jpg'),
  catAmChen: brand('cat-am-chen.jpg'),
  catKhayTra: brand('cat-khay-tra.jpg'),
  catTuong: brand('cat-tuong.jpg'),
  catHuTra: brand('cat-hu-tra.jpg'),
} as const;

export function media(url: string, alt: string, width = 1000, height = 1250): StrapiMedia {
  return { url, alternativeText: alt, width, height };
}
