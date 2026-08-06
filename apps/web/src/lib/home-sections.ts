import type { Product } from './types';
import huMeta from '../data/hu-meta.json';
import khayMeta from '../data/khay-meta.json';
import pkMeta from '../data/pk-meta.json';
import tuongMeta from '../data/tuong-meta.json';

export type CatalogItem = {
  name: string;
  slug: string;
  image: string;
  price?: number | null;
  compareAtPrice?: number | null;
};

export type HomeSectionDef = {
  slug: string;
  /** Exact casing as on gomsuluxury.vn */
  titleVi: string;
  match: (product: Product) => boolean;
  fallback?: CatalogItem[];
};

function hasCat(product: Product, slug: string) {
  return (product.categories || []).some((c) => c.slug === slug);
}

function nameOf(product: Product) {
  return (product.name || '').toLowerCase();
}

function fromMeta(rows: Array<{ name: string; slug?: string; image: string; price?: string | null; regular?: string | null }>): CatalogItem[] {
  return rows.map((r) => ({
    name: (r.name || '').replace(/&#8211;/g, '–').replace(/&amp;/g, '&'),
    slug: r.slug || '',
    image: r.image,
    // WooCommerce Store API returns VND as whole numbers (no minor units).
    price: r.price != null && r.price !== '' ? Number(r.price) : null,
    compareAtPrice: r.regular != null && r.regular !== '' ? Number(r.regular) : null,
  }));
}

/** Home product rows — titles match the old WordPress site casing. */
export const homeSections: HomeSectionDef[] = [
  {
    slug: 'am-chen-bat-trang',
    titleVi: 'Ấm chén Bát Tràng',
    match: (p) =>
      hasCat(p, 'am-chen-bat-trang') ||
      /ấm\s*ch[eé]n|bát\s*tràng|bat\s*trang|thượng\s*tân\s*kiều|tây\s*thi|quả\s*hồng/i.test(nameOf(p)),
  },
  {
    slug: 'phu-kien-ban-tra-gom-su-luxury',
    titleVi: 'Phụ Kiện Bàn Trà',
    match: (p) =>
      hasCat(p, 'phu-kien-ban-tra-gom-su-luxury') ||
      (!/vòng|vong tay|hoàng đàn/.test(nameOf(p)) &&
        /phụ kiện bàn trà|nghê|quản gia|cung nhãn|chú tiểu|trà cụ|ông nghê|lão quản/i.test(nameOf(p))),
    fallback: fromMeta(pkMeta),
  },
  {
    slug: 'khay-tra',
    titleVi: 'Khay Trà',
    match: (p) => hasCat(p, 'khay-tra') || /khay\s*trà|khay\s*tra/i.test(nameOf(p)),
    fallback: fromMeta(khayMeta),
  },
  {
    slug: 'tuong-gom-linh-vat',
    titleVi: 'Tượng Gốm linh vật',
    match: (p) =>
      hasCat(p, 'tuong-gom-linh-vat') ||
      /tượng\s*gốm|tuong\s*gom|nhất\s*mã|cậu\s*vàng|linh\s*vật/i.test(nameOf(p)),
    fallback: fromMeta(tuongMeta),
  },
  {
    slug: 'hu-tra',
    titleVi: 'HŨ TRÀ',
    match: (p) => hasCat(p, 'hu-tra') || /hũ\s*(đựng\s*)?trà|lọ\s*trà|nanmu|hũ trà/i.test(nameOf(p)),
    fallback: fromMeta(huMeta),
  },
];

export function productsForSection(products: Product[], section: HomeSectionDef, used = new Set<string>()) {
  const key = (p: Product) => p.documentId || String(p.id);
  return products.filter((p) => {
    const id = key(p);
    if (used.has(id)) return false;
    if (!section.match(p)) return false;
    used.add(id);
    return true;
  });
}

export function toCatalogItems(products: Product[]): CatalogItem[] {
  return products.map((p) => {
    const image = p.images?.[0]?.url || '';
    const promo = p.promotions?.[0];
    const price = promo?.discountedPrice != null ? Number(promo.discountedPrice) : p.price;
    return {
      name: p.name,
      slug: p.slug,
      image,
      price,
      compareAtPrice: price < p.price ? p.price : p.compareAtPrice,
    };
  });
}

/** Prefer CMS products; fill with brand catalog images so rows match the old site. */
export function buildSectionItems(products: Product[], section: HomeSectionDef, used = new Set<string>(), min = 6) {
  const cms = productsForSection(products, section, used);
  const cmsSlugs = new Set(cms.map((p) => p.slug));
  const fromCms = toCatalogItems(cms).filter((i) => i.image);
  if (fromCms.length >= min) return fromCms.slice(0, 10);
  const seen = new Set(fromCms.map((i) => i.name.toLowerCase()));
  const extras = (section.fallback || [])
    .filter((i) => i.image && !seen.has(i.name.toLowerCase()))
    .map((i) => ({
      ...i,
      // Only deep-link when the product exists in CMS; otherwise go to category listing.
      slug: cmsSlugs.has(i.slug) ? i.slug : '',
    }));
  return [...fromCms, ...extras].slice(0, 10);
}
