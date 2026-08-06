import type { Locale } from '../i18n/ui';
import { locales } from '../i18n/ui';
import type { Article, EventItem, Menu, PageItem, Product, SiteSetting, StrapiMedia } from './types';
import { demoEvents, demoMenus, demoPages, demoProducts, demoSettings } from './demo-data';

const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = import.meta.env.STRAPI_API_TOKEN || '';

type StrapiListResponse<T> = {
  data: Array<T & { id: number }>;
  meta?: unknown;
};

function mediaUrl(media?: StrapiMedia | null) {
  if (!media?.url) return undefined;
  if (media.url.startsWith('http')) return media.url;
  return `${STRAPI_URL}${media.url}`;
}

function normalizeMedia(raw: any): StrapiMedia | null {
  if (!raw) return null;
  const item = raw.data || raw;
  if (!item) return null;
  const attrs = item.attributes || item;
  return {
    url: mediaUrl({ url: attrs.url }) || attrs.url,
    alternativeText: attrs.alternativeText,
    width: attrs.width,
    height: attrs.height,
  };
}

function normalizeMediaList(raw: any): StrapiMedia[] {
  if (!raw) return [];
  const list = Array.isArray(raw) ? raw : raw.data || [];
  return list.map((item: any) => normalizeMedia(item)).filter(Boolean) as StrapiMedia[];
}

async function strapiFetch<T>(path: string, locale: Locale): Promise<T | null> {
  try {
    const url = new URL(`${STRAPI_URL}/api${path}`);
    if (!url.searchParams.has('locale')) url.searchParams.set('locale', locale);
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (STRAPI_TOKEN) headers.Authorization = `Bearer ${STRAPI_TOKEN}`;

    const res = await fetch(url.toString(), {
      headers,
      // Static builds: fetch at build time
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function mapProduct(item: any): Product {
  const p = item.attributes ? { id: item.id, ...item.attributes } : item;
  return {
    id: p.id,
    documentId: p.documentId,
    name: p.name,
    slug: p.slug,
    shortDescription: p.shortDescription,
    description: p.description,
    price: Number(p.price || 0),
    compareAtPrice: p.compareAtPrice != null ? Number(p.compareAtPrice) : null,
    sku: p.sku,
    stock: Number(p.stock || 0),
    trackInventory: p.trackInventory,
    isHot: p.isHot,
    isFeatured: p.isFeatured,
    images: normalizeMediaList(p.images),
    attributeValues: (p.attributeValues || []).map((a: any) => ({
      name: a.name,
      value: a.value,
    })),
    categories: (p.categories?.data || p.categories || []).map((c: any) => {
      const cat = c.attributes || c;
      return { name: cat.name, slug: cat.slug };
    }),
    promotions: (p.promotions?.data || p.promotions || []).map((promo: any) => {
      const pr = promo.attributes || promo;
      return {
        title: pr.title,
        discountType: pr.discountType,
        discountValue: Number(pr.discountValue || 0),
        badgeLabel: pr.badgeLabel,
        isActive: pr.isActive,
      };
    }),
    seo: p.seo
      ? {
          ...p.seo,
          ogImage: normalizeMedia(p.seo.ogImage),
        }
      : undefined,
  };
}

function mapEvent(item: any): EventItem {
  const e = item.attributes ? { id: item.id, ...item.attributes } : item;
  return {
    id: e.id,
    documentId: e.documentId,
    title: e.title,
    slug: e.slug,
    excerpt: e.excerpt,
    content: e.content,
    startDate: e.startDate,
    endDate: e.endDate,
    location: e.location,
    registrationUrl: e.registrationUrl,
    isFeatured: e.isFeatured,
    cover: normalizeMedia(e.cover),
    seo: e.seo
      ? {
          ...e.seo,
          ogImage: normalizeMedia(e.seo.ogImage),
        }
      : undefined,
  };
}

export async function getProducts(locale: Locale, opts?: { hot?: boolean }): Promise<Product[]> {
  const filters = opts?.hot ? '&filters[isHot][$eq]=true' : '';
  const data = await strapiFetch<StrapiListResponse<any>>(
    `/products?status=published&populate=*&sort=updatedAt:desc&pagination[pageSize]=100${filters}`,
    locale
  );
  if (!data?.data?.length) {
    const list = demoProducts(locale);
    return opts?.hot ? list.filter((p) => p.isHot) : list;
  }
  // Dedupe by documentId
  const seen = new Set<string>();
  return data.data
    .map(mapProduct)
    .filter((p) => {
      const key = p.documentId || String(p.id);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

export async function getProductBySlug(locale: Locale, slug: string): Promise<Product | null> {
  const data = await strapiFetch<StrapiListResponse<any>>(
    `/products?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`,
    locale
  );
  if (data?.data?.[0]) return mapProduct(data.data[0]);
  return demoProducts(locale).find((p) => p.slug === slug) || null;
}

export async function getEvents(locale: Locale): Promise<EventItem[]> {
  const data = await strapiFetch<StrapiListResponse<any>>(
    `/events?status=published&populate=*&sort=startDate:asc`,
    locale
  );
  if (!data?.data?.length) return demoEvents(locale);
  return data.data.map(mapEvent);
}

export async function getEventBySlug(locale: Locale, slug: string): Promise<EventItem | null> {
  const data = await strapiFetch<StrapiListResponse<any>>(
    `/events?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`,
    locale
  );
  if (data?.data?.[0]) return mapEvent(data.data[0]);
  return demoEvents(locale).find((e) => e.slug === slug) || null;
}

export async function getPageBySlug(locale: Locale, slug: string): Promise<PageItem | null> {
  const data = await strapiFetch<StrapiListResponse<any>>(
    `/pages?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`,
    locale
  );
  if (data?.data?.[0]) {
    const item = data.data[0];
    const p = item.attributes ? { id: item.id, ...item.attributes } : item;
    return {
      id: p.id,
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      content: p.content,
      template: p.template,
      heroImage: normalizeMedia(p.heroImage),
      seo: p.seo,
    };
  }
  return demoPages(locale).find((p) => p.slug === slug) || null;
}

function mapArticle(item: any): Article {
  const a = item.attributes ? { id: item.id, ...item.attributes } : item;
  return {
    id: a.id,
    documentId: a.documentId,
    title: a.title,
    slug: a.slug,
    excerpt: a.excerpt,
    content: a.content,
    cover: normalizeMedia(a.cover),
    authorName: a.authorName,
    displayDate: a.displayDate,
    isFeatured: a.isFeatured,
    tags: a.tags || null,
    seo: a.seo
      ? {
          ...a.seo,
          ogImage: normalizeMedia(a.seo.ogImage),
        }
      : undefined,
  };
}

export type LocalePathMap = Partial<Record<Locale, string>>;

type CmsListResult<T> = {
  items: T[];
  /** true when Strapi responded (even if empty). false when offline/error → may use demo. */
  fromCms: boolean;
};

export async function getArticles(locale: Locale): Promise<CmsListResult<Article>> {
  const data = await strapiFetch<StrapiListResponse<any>>(
    `/articles?status=published&populate=*&sort=displayDate:desc&pagination[pageSize]=50`,
    locale
  );
  // Chỉ hiển thị bài từ CMS admin (đã Publish). Không dùng demo.
  if (data?.data) {
    // Tránh trùng khi DB có cả draft/published lệch (cùng documentId).
    const seen = new Set<string>();
    const items = data.data
      .map(mapArticle)
      .filter((article) => {
        const key = article.documentId || String(article.id);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    return { items, fromCms: true };
  }
  return { items: [], fromCms: false };
}

export async function getArticleBySlug(locale: Locale, slug: string): Promise<Article | null> {
  const data = await strapiFetch<StrapiListResponse<any>>(
    `/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`,
    locale
  );
  if (data?.data?.[0]) return mapArticle(data.data[0]);
  return null;
}

/** Build language-switcher URLs for an article (correct slug per locale). */
export async function getArticleLocalePaths(
  documentId: string | undefined,
  currentLocale: Locale,
  currentSlug: string
): Promise<LocalePathMap> {
  const paths: LocalePathMap = {};
  for (const locale of locales) {
    if (!documentId) {
      paths[locale] = `/${locale}/bai-viet`;
      continue;
    }
    const data = await strapiFetch<{ data: any }>(`/articles/${documentId}`, locale);
    const raw = data?.data;
    const publishedAt = raw?.publishedAt ?? raw?.attributes?.publishedAt;
    const slug = raw?.slug ?? raw?.attributes?.slug;
    if (publishedAt && slug) {
      paths[locale] = `/${locale}/bai-viet/${slug}`;
    } else {
      // Unpublished / missing translation → listing for that language
      paths[locale] = `/${locale}/bai-viet`;
    }
  }
  // Always keep current page as-is
  paths[currentLocale] = `/${currentLocale}/bai-viet/${currentSlug}`;
  return paths;
}

export async function getMenus(locale: Locale): Promise<Menu[]> {
  const data = await strapiFetch<StrapiListResponse<any>>(`/menus?populate=*`, locale);
  if (!data?.data?.length) return demoMenus(locale);
  return data.data.map((item: any) => {
    const m = item.attributes ? { id: item.id, ...item.attributes } : item;
    return {
      title: m.title,
      slug: m.slug,
      location: m.location,
      items: m.items || [],
    };
  });
}

export async function getCategories(locale: Locale) {
  const data = await strapiFetch<StrapiListResponse<any>>(
    `/categories?status=published&populate=*&sort=name:asc`,
    locale
  );
  if (!data?.data?.length) return [];
  return data.data.map((item: any) => {
    const c = item.attributes ? { id: item.id, ...item.attributes } : item;
    return {
      id: c.id,
      documentId: c.documentId,
      name: c.name,
      slug: c.slug,
      description: c.description,
      image: normalizeMedia(c.image),
    };
  });
}

export async function getSiteSettings(locale: Locale): Promise<SiteSetting> {
  const data = await strapiFetch<{ data: any }>(`/site-setting?populate=*`, locale);
  if (!data?.data) return demoSettings(locale);
  const s = data.data.attributes ? data.data.attributes : data.data;
  const demo = demoSettings(locale);
  return {
    siteName: s.siteName,
    tagline: s.tagline,
    phone: s.phone,
    email: s.email,
    address: s.address,
    zaloUrl: s.zaloUrl,
    facebookUrl: s.facebookUrl,
    instagramUrl: s.instagramUrl,
    logo: normalizeMedia(s.logo) || demo.logo,
    heroImage: normalizeMedia(s.heroImage) || demo.heroImage,
    craftImage: normalizeMedia(s.craftImage) || demo.craftImage,
    defaultSeo: s.defaultSeo
      ? {
          ...s.defaultSeo,
          ogImage: normalizeMedia(s.defaultSeo.ogImage) || demo.defaultSeo?.ogImage,
        }
      : demo.defaultSeo,
  };
}

export { STRAPI_URL, mediaUrl };
