import type { Locale } from '../i18n/ui';
import { localeIntl } from '../i18n/ui';

export function formatPrice(value: number, locale: Locale) {
  return new Intl.NumberFormat(localeIntl[locale], {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(localeIntl[locale], {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export function discountedPrice(
  price: number,
  promotions?: { discountType: 'percent' | 'fixed'; discountValue: number; isActive?: boolean }[]
) {
  const promo = promotions?.find((p) => p.isActive !== false);
  if (!promo) return price;
  if (promo.discountType === 'percent') {
    return Math.max(0, Math.round(price * (1 - promo.discountValue / 100)));
  }
  return Math.max(0, price - promo.discountValue);
}

/** Convert Strapi richtext/markdown-ish content to safe-ish HTML for display */
export function richtextToHtml(content?: string | null, mediaBase = '') {
  if (!content) return '';
  let html = content.trim();

  // Rewrite relative upload paths
  if (mediaBase) {
    html = html.replace(/(src=["'])(\/uploads\/[^"']+)/g, `$1${mediaBase}$2`);
    html = html.replace(/\]\((\/uploads\/[^)]+)\)/g, `](${mediaBase}$1)`);
  }

  // Already HTML
  if (/<[a-z][\s\S]*>/i.test(html)) return html;

  // Markdown images + paragraphs
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy" class="my-6 w-full" />');
  return html
    .split(/\n{2,}/)
    .map((block) => `<p>${block.replace(/\n/g, '<br />')}</p>`)
    .join('');
}
