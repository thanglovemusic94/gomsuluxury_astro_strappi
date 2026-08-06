import type { StrapiApp } from '@strapi/strapi/admin';

/** Khóa localStorage Strapi dùng cho ngôn ngữ giao diện Admin */
const LANGUAGE_LOCAL_STORAGE_KEY = 'strapi-admin-language';

/** Ngôn ngữ giao diện mặc định: tiếng Việt */
const DEFAULT_ADMIN_LOCALE = 'vi';

const brandTranslations = {
  vi: {
    'app.components.LeftMenu.navbrand.title': 'Gốm Sứ CMS',
    'app.components.LeftMenu.navbrand.workplace': 'Nội dung đa ngôn ngữ',
    'global.localeToggle.label': 'Ngôn ngữ nội dung',
    // Nhãn content-types (khóa = displayName trong schema)
    Article: 'Bài viết',
    Product: 'Sản phẩm',
    Category: 'Danh mục',
    Attribute: 'Thuộc tính',
    Promotion: 'Khuyến mãi',
    Event: 'Sự kiện',
    Page: 'Trang',
    Menu: 'Menu',
    'Site Setting': 'Cài đặt site',
  },
  en: {
    'app.components.LeftMenu.navbrand.title': 'Gom Su CMS',
    'app.components.LeftMenu.navbrand.workplace': 'Multilingual content',
    'global.localeToggle.label': 'Content locale',
    Article: 'Article',
    Product: 'Product',
    Category: 'Category',
    Attribute: 'Attribute',
    Promotion: 'Promotion',
    Event: 'Event',
    Page: 'Page',
    Menu: 'Menu',
    'Site Setting': 'Site Setting',
  },
  ja: {
    'app.components.LeftMenu.navbrand.title': 'ゴム・スー CMS',
    'app.components.LeftMenu.navbrand.workplace': '多言語コンテンツ',
    'global.localeToggle.label': 'コンテンツ言語',
    Article: '記事',
    Product: '商品',
    Category: 'カテゴリ',
    Attribute: '属性',
    Promotion: 'プロモーション',
    Event: 'イベント',
    Page: 'ページ',
    Menu: 'メニュー',
    'Site Setting': 'サイト設定',
  },
} as const;

/**
 * Đặt tiếng Việt làm ngôn ngữ giao diện khi chưa có lựa chọn
 * (lần đầu mở Admin / chưa chọn trong Profile).
 * Chạy trong bootstrap — trước khi Strapi đọc localStorage trong render().
 */
function ensureDefaultAdminLocale() {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return;
  }

  const current = localStorage.getItem(LANGUAGE_LOCAL_STORAGE_KEY);
  if (!current) {
    localStorage.setItem(LANGUAGE_LOCAL_STORAGE_KEY, DEFAULT_ADMIN_LOCALE);
  }
}

export default {
  config: {
    locales: ['vi', 'en', 'ja'],
    translations: brandTranslations,
  },
  bootstrap(_app: StrapiApp) {
    ensureDefaultAdminLocale();
  },
};
