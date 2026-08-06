import type { Locale } from '../i18n/ui';
import type { EventItem, Menu, PageItem, Product, SiteSetting, StrapiMedia } from './types';
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
    `/products?populate=*&sort=updatedAt:desc${filters}`,
    locale
  );
  if (!data?.data?.length) {
    const list = demoProducts(locale);
    return opts?.hot ? list.filter((p) => p.isHot) : list;
  }
  return data.data.map(mapProduct);
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
    `/events?populate=*&sort=startDate:asc`,
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

export async function getSiteSettings(locale: Locale): Promise<SiteSetting> {
  const data = await strapiFetch<{ data: any }>(`/site-setting?populate=*`, locale);
  if (!data?.data) return demoSettings(locale);
  const s = data.data.attributes ? data.data.attributes : data.data;
  return {
    siteName: s.siteName,
    tagline: s.tagline,
    phone: s.phone,
    email: s.email,
    address: s.address,
    zaloUrl: s.zaloUrl,
    facebookUrl: s.facebookUrl,
    instagramUrl: s.instagramUrl,
    defaultSeo: s.defaultSeo,
  };
}

export { STRAPI_URL, mediaUrl };
