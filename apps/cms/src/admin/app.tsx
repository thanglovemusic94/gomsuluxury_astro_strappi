import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    locales: ['vi', 'en', 'ja'],
    translations: {
      vi: {
        'app.components.LeftMenu.navbrand.title': 'Gốm Sứ CMS',
        'app.components.LeftMenu.navbrand.workplace': 'Nội dung đa ngôn ngữ',
        'global.localeToggle.label': 'Ngôn ngữ nội dung',
      },
      en: {
        'app.components.LeftMenu.navbrand.title': 'Gom Su CMS',
        'app.components.LeftMenu.navbrand.workplace': 'Multilingual content',
      },
      ja: {
        'app.components.LeftMenu.navbrand.title': 'ゴム・スー CMS',
        'app.components.LeftMenu.navbrand.workplace': '多言語コンテンツ',
      },
    },
  },
  bootstrap() {},
};
