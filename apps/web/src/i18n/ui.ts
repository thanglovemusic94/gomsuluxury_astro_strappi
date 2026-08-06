export const locales = ['vi', 'en', 'ja'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'vi';

export const localeLabels: Record<Locale, string> = {
  vi: 'VI',
  en: 'EN',
  ja: 'JP',
};

export const localeHtmlLang: Record<Locale, string> = {
  vi: 'vi',
  en: 'en',
  ja: 'ja',
};

export const localeOg: Record<Locale, string> = {
  vi: 'vi_VN',
  en: 'en_US',
  ja: 'ja_JP',
};

export const localeIntl: Record<Locale, string> = {
  vi: 'vi-VN',
  en: 'en-US',
  ja: 'ja-JP',
};

export const ui = {
  vi: {
    brand: 'Gốm Sứ Luxury',
    tagline: 'Nghệ thuật đất nung cho không gian sống tinh tế',
    nav: {
      home: 'Trang chủ',
      products: 'Sản phẩm',
      events: 'Sự kiện',
      articles: 'Bài viết',
      about: 'Giới thiệu',
      contact: 'Liên hệ',
    },
    cta: {
      explore: 'Khám phá bộ sưu tập',
      viewAll: 'Xem tất cả',
      details: 'Xem chi tiết',
      register: 'Đăng ký tham dự',
      contact: 'Tư vấn ngay',
    },
    home: {
      heroTitle: 'Gốm thủ công,\nlinh hồn không gian',
      heroBody: 'Bộ sưu tập men celadon và đất nung thủ công — chọn lọc từng đường nét cho ngôi nhà của bạn.',
      hot: 'Sản phẩm hot',
      featuredEvents: 'Sự kiện nổi bật',
      craft: 'Từ bàn xoay đến bàn ăn',
      craftBody: 'Mỗi sản phẩm được nung ở nhiệt độ cao, giữ độ bền và sắc men sâu theo năm tháng.',
    },
    products: {
      title: 'Sản phẩm',
      subtitle: 'Bình, chén, đĩa và vật dụng trang trí thủ công',
      hot: 'Hot',
      stock: 'Còn hàng',
      outOfStock: 'Hết hàng',
      sku: 'Mã SP',
      attributes: 'Thuộc tính',
      related: 'Có thể bạn thích',
    },
    events: {
      title: 'Sự kiện',
      subtitle: 'Workshop, triển lãm và trải nghiệm làm gốm',
      when: 'Thời gian',
      where: 'Địa điểm',
    },
    articles: {
      title: 'Bài viết',
      subtitle: 'Câu chuyện nghề gốm, men và không gian sống',
      by: 'Tác giả',
      related: 'Bài viết khác',
      readMore: 'Đọc tiếp',
      empty: 'Chưa có bài viết. Thêm và Publish trong Strapi Admin → Content Manager → Article.',
      missingLocale: 'Ngôn ngữ này chưa có bài đã Publish. Mở Article → chọn locale → Publish.',
    },
    footer: {
      rights: 'Tất cả quyền được bảo lưu.',
      follow: 'Theo dõi',
    },
    langLabel: 'Ngôn ngữ',
    menuOpen: 'Mở menu',
    menuClose: 'Đóng menu',
  },
  en: {
    brand: 'Gom Su Luxury',
    tagline: 'Handcrafted ceramics for refined living spaces',
    nav: {
      home: 'Home',
      products: 'Products',
      events: 'Events',
      articles: 'Journal',
      about: 'About',
      contact: 'Contact',
    },
    cta: {
      explore: 'Explore the collection',
      viewAll: 'View all',
      details: 'View details',
      register: 'Register',
      contact: 'Talk to us',
    },
    home: {
      heroTitle: 'Handcrafted clay,\nquiet luxury at home',
      heroBody: 'A curated celadon and stoneware collection — tactile forms made for everyday ceremony.',
      hot: 'Hot pieces',
      featuredEvents: 'Featured events',
      craft: 'From the wheel to your table',
      craftBody: 'High-fired vessels with lasting glaze depth, shaped one piece at a time.',
    },
    products: {
      title: 'Products',
      subtitle: 'Vases, bowls, plates and decorative objects',
      hot: 'Hot',
      stock: 'In stock',
      outOfStock: 'Sold out',
      sku: 'SKU',
      attributes: 'Attributes',
      related: 'You may also like',
    },
    events: {
      title: 'Events',
      subtitle: 'Workshops, exhibitions and clay experiences',
      when: 'When',
      where: 'Where',
    },
    articles: {
      title: 'Journal',
      subtitle: 'Stories on craft, glaze and living with ceramics',
      by: 'Author',
      related: 'More stories',
      readMore: 'Read more',
      empty: 'No articles yet. Add and Publish in Strapi Admin → Content Manager → Article.',
      missingLocale: 'No published article for this language. Open Article → switch locale → Publish.',
    },
    footer: {
      rights: 'All rights reserved.',
      follow: 'Follow',
    },
    langLabel: 'Language',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
  },
  ja: {
    brand: 'ゴム・スー・ラグジュアリー',
    tagline: '丁寧な暮らしのための手仕事の陶磁器',
    nav: {
      home: 'ホーム',
      products: '作品',
      events: 'イベント',
      articles: '読みもの',
      about: '私たちについて',
      contact: 'お問い合わせ',
    },
    cta: {
      explore: 'コレクションを見る',
      viewAll: 'すべて見る',
      details: '詳細を見る',
      register: '参加申し込み',
      contact: '相談する',
    },
    home: {
      heroTitle: '手仕事の器が、\n空間の静けさになる',
      heroBody: '青磁と炻器のコレクション。日常の所作に寄り添う、丁寧なフォルムを選んでいます。',
      hot: '注目の作品',
      featuredEvents: '注目のイベント',
      craft: 'ロクロから食卓へ',
      craftBody: '高温で焼き締め、年月とともに深まる釉の表情を大切にしています。',
    },
    products: {
      title: '作品',
      subtitle: '花器、碗、皿、装飾の器',
      hot: 'HOT',
      stock: '在庫あり',
      outOfStock: '売り切れ',
      sku: '品番',
      attributes: '仕様',
      related: 'こちらもおすすめ',
    },
    events: {
      title: 'イベント',
      subtitle: 'ワークショップ、展示、陶芸体験',
      when: '日時',
      where: '場所',
    },
    articles: {
      title: '読みもの',
      subtitle: '釉薬、窯、暮らしと器の物語',
      by: '著者',
      related: 'その他の記事',
      readMore: '続きを読む',
      empty: '記事がありません。Strapi Admin → Content Manager → Article で追加・Publishしてください。',
      missingLocale: 'この言語の公開記事がありません。Article → 言語切替 → Publish してください。',
    },
    footer: {
      rights: 'All rights reserved.',
      follow: 'フォロー',
    },
    langLabel: '言語',
    menuOpen: 'メニューを開く',
    menuClose: 'メニューを閉じる',
  },
} as const;

export function t(locale: Locale) {
  return ui[locale] || ui.vi;
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localePaths() {
  return locales.map((lang) => ({ params: { lang } }));
}
