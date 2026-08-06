import type { Core } from '@strapi/strapi';

const PUBLIC_ACTIONS = ['find', 'findOne'] as const;

const CONTENT_TYPES = [
  'api::product.product',
  'api::category.category',
  'api::attribute.attribute',
  'api::promotion.promotion',
  'api::event.event',
  'api::page.page',
  'api::menu.menu',
  'api::article.article',
  'api::site-setting.site-setting',
] as const;

const LOCALES = [
  { code: 'vi', name: 'Vietnamese (vi)' },
  { code: 'en', name: 'English (en)' },
] as const;

async function ensurePublicPermissions(strapi: Core.Strapi) {
  const role = await strapi.db.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' },
  });

  if (!role) return;

  for (const uid of CONTENT_TYPES) {
    for (const action of PUBLIC_ACTIONS) {
      const actionId = `${uid}.${action}`;
      const existing = await strapi.db.query('plugin::users-permissions.permission').findOne({
        where: {
          role: role.id,
          action: actionId,
        },
      });

      if (!existing) {
        await strapi.db.query('plugin::users-permissions.permission').create({
          data: {
            action: actionId,
            role: role.id,
          },
        });
      }
    }
  }
}

async function ensureLocales(strapi: Core.Strapi) {
  const localeService = strapi.plugin('i18n')?.service('locales');
  if (!localeService) {
    strapi.log.warn('[i18n] Locale service not available');
    return;
  }

  const existing = await localeService.find();
  const codes = new Set((existing || []).map((item: { code: string }) => item.code));

  for (const locale of LOCALES) {
    if (!codes.has(locale.code)) {
      await localeService.create(locale);
      strapi.log.info(`[i18n] Created locale: ${locale.code}`);
    }
  }

  try {
    await localeService.setDefaultLocale({ code: 'vi' });
    strapi.log.info('[i18n] Default locale set to vi');
  } catch {
    // Default locale may already be configured
  }
}

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await ensureLocales(strapi);
    await ensurePublicPermissions(strapi);
  },
};
