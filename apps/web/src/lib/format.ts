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
