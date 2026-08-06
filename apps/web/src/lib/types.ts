export type SeoFields = {
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: StrapiMedia | null;
  noIndex?: boolean;
  seoScore?: number;
  seoNotes?: string;
};

export type StrapiMedia = {
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
};

export type Product = {
  id: number;
  documentId?: string;
  name: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  price: number;
  compareAtPrice?: number | null;
  sku?: string;
  stock: number;
  trackInventory?: boolean;
  isHot?: boolean;
  isFeatured?: boolean;
  images?: StrapiMedia[];
  attributeValues?: { name: string; value: string }[];
  categories?: { name: string; slug: string }[];
  promotions?: {
    title: string;
    discountType: 'percent' | 'fixed';
    discountValue: number;
    badgeLabel?: string;
    isActive?: boolean;
  }[];
  seo?: SeoFields;
};

export type EventItem = {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  startDate: string;
  endDate?: string | null;
  location?: string;
  registrationUrl?: string;
  isFeatured?: boolean;
  cover?: StrapiMedia | null;
  seo?: SeoFields;
};

export type Article = {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  cover?: StrapiMedia | null;
  authorName?: string;
  displayDate?: string | null;
  isFeatured?: boolean;
  tags?: string[] | null;
  seo?: SeoFields;
};

export type PageItem = {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  template?: string;
  heroImage?: StrapiMedia | null;
  seo?: SeoFields;
};

export type MenuItem = {
  label: string;
  url: string;
  openInNewTab?: boolean;
  order?: number;
  children?: { label: string; url: string; openInNewTab?: boolean }[];
};

export type Menu = {
  title: string;
  slug: string;
  location: 'header' | 'footer' | 'mobile';
  items: MenuItem[];
};

export type SiteSetting = {
  siteName: string;
  tagline?: string;
  phone?: string;
  email?: string;
  address?: string;
  zaloUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  logo?: StrapiMedia | null;
  heroImage?: StrapiMedia | null;
  craftImage?: StrapiMedia | null;
  defaultSeo?: SeoFields;
};
