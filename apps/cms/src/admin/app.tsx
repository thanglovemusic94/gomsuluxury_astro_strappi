import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    locales: ['vi', 'en'],
    translations: {
      vi: {
        'app.components.LeftMenu.navbrand.title': 'Gốm Sứ CMS',
        'app.components.LeftMenu.navbrand.workplace': 'Nội dung đa ngôn ngữ',
        'global.localeToggle.label': 'Ngôn ngữ nội dung',
        'content-manager.containers.Edit.create': 'Tạo bản dịch',
        'content-manager.containers.Edit.copy-locale': 'Sao chép từ ngôn ngữ khác',
      },
      en: {
        'app.components.LeftMenu.navbrand.title': 'Gom Su CMS',
        'app.components.LeftMenu.navbrand.workplace': 'Multilingual content',
      },
    },
  },
  bootstrap() {},
};
