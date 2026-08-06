import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    locales: ['vi', 'en'],
    translations: {
      vi: {
        'app.components.LeftMenu.navbrand.title': 'Gốm Sứ CMS',
      },
    },
  },
  bootstrap() {},
};
