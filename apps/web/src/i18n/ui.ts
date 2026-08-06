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
    tagline: 'Tự hào gốm Việt — vẻ đẹp thuần Việt, đẳng cấp toàn cầu',
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
      contact: 'Tư vấn Zalo',
    },
    home: {
      heroTitle: 'Tự hào\ngốm Việt',
      heroBody:
        'Tinh hoa gốm Bát Tràng — ấm chén, bàn trà và linh vật — hội tụ nghề cổ truyền với thiết kế đương đại.',
      hot: 'Sản phẩm nổi bật',
      featuredEvents: 'Sự kiện nổi bật',
      craft: 'Đất · nước · lửa · tay nghề',
      craftBody:
        'Mỗi sản phẩm là bản giao hưởng giữa đất, nước, lửa và đôi bàn tay nghệ nhân Việt.',
      collections: 'Bộ sưu tập',
      collectionsTitle: 'Chọn theo không gian trà',
      categories: {
        amChen: 'Ấm chén Bát Tràng',
        phuKien: 'Phụ kiện bàn trà',
        tuong: 'Tượng gốm linh vật',
        huTra: 'Hũ trà',
      },
      testimonials: 'Khách hàng nói gì',
      testimonialsTitle: 'Đánh giá từ người yêu gốm',
      reviews: [
        {
          quote: 'Hàng ok, chất lượng tốt, mẫu mã đẹp, tư vấn nhiệt tình, giao hàng nhanh.',
          author: 'Khách hàng',
        },
        {
          quote: 'Shop rất tận tâm, chuyên nghiệp. Sản phẩm cái nào mình cũng ưng bụng.',
          author: 'Khách hàng thân thiết',
        },
        {
          quote: 'Đóng gói cẩn thận, giao nhanh, rất ưng cách phục vụ — sẽ ủng hộ tiếp.',
          author: 'Khách hàng',
        },
      ],
    },
    products: {
      title: 'Sản phẩm',
      subtitle: 'Ấm chén Bát Tràng, khay trà, hũ trà và tượng gốm linh vật',
      hot: 'Nổi bật',
      stock: 'Còn hàng',
      outOfStock: 'Hết hàng',
      sku: 'Mã SP',
      attributes: 'Thuộc tính',
      related: 'Có thể bạn thích',
    },
    events: {
      title: 'Sự kiện',
      subtitle: 'Workshop, triển lãm và trải nghiệm trà · gốm',
      when: 'Thời gian',
      where: 'Địa điểm',
    },
    articles: {
      title: 'Bài viết',
      subtitle: 'Câu chuyện nghề gốm Bát Tràng, men và bàn trà',
      by: 'Tác giả',
      related: 'Bài viết khác',
      readMore: 'Đọc tiếp',
      empty: 'Chưa có bài viết. Thêm và Publish trong Strapi Admin → Content Manager → Article.',
      missingLocale: 'Ngôn ngữ này chưa có bài đã Publish. Mở Article → chọn locale → Publish.',
    },
    footer: {
      rights: 'Tất cả quyền được bảo lưu.',
      follow: 'Theo dõi',
      hours: '08:00 – 17:00',
    },
    trust: {
      title: 'Cam kết từ showroom',
      items: [
        { title: 'Tư vấn tận tâm', body: 'Chọn ấm chén và bàn trà phù hợp không gian của bạn.' },
        { title: 'Đóng gói cẩn thận', body: 'Giao hàng nhanh, bảo vệ từng món gốm trên đường.' },
        { title: 'Gốm Bát Tràng', body: 'Tinh hoa nghề Việt — từ nghệ nhân đến bàn trà.' },
      ],
    },
    langLabel: 'Ngôn ngữ',
    menuOpen: 'Mở menu',
    menuClose: 'Đóng menu',
  },
  en: {
    brand: 'Gom Su Luxury',
    tagline: 'Proudly Vietnamese ceramics — heritage forms, contemporary calm',
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
      contact: 'Chat on Zalo',
    },
    home: {
      heroTitle: 'Proudly\nVietnamese clay',
      heroBody:
        'Bat Trang tea sets, trays and guardian figurines — traditional craft with contemporary presence.',
      hot: 'Featured pieces',
      featuredEvents: 'Featured events',
      craft: 'Earth · water · fire · craft',
      craftBody:
        'Each piece is a quiet dialogue between clay, water, fire and the artisan’s hand.',
      collections: 'Collections',
      collectionsTitle: 'Shop the tea table',
      categories: {
        amChen: 'Bat Trang tea sets',
        phuKien: 'Tea accessories',
        tuong: 'Guardian figurines',
        huTra: 'Tea jars',
      },
      testimonials: 'From our guests',
      testimonialsTitle: 'What collectors say',
      reviews: [
        {
          quote: 'Great quality, beautiful forms, thoughtful advice and fast delivery.',
          author: 'Customer',
        },
        {
          quote: 'Attentive and professional. Every piece I chose felt right.',
          author: 'Returning guest',
        },
        {
          quote: 'Careful packaging and warm service — I’ll be back.',
          author: 'Customer',
        },
      ],
    },
    products: {
      title: 'Products',
      subtitle: 'Bat Trang tea sets, trays, jars and ceramic figurines',
      hot: 'Featured',
      stock: 'In stock',
      outOfStock: 'Sold out',
      sku: 'SKU',
      attributes: 'Attributes',
      related: 'You may also like',
    },
    events: {
      title: 'Events',
      subtitle: 'Workshops, exhibitions and tea · clay experiences',
      when: 'When',
      where: 'Where',
    },
    articles: {
      title: 'Journal',
      subtitle: 'Stories on Bat Trang craft, glaze and the tea table',
      by: 'Author',
      related: 'More stories',
      readMore: 'Read more',
      empty: 'No articles yet. Add and Publish in Strapi Admin → Content Manager → Article.',
      missingLocale: 'No published article for this language. Open Article → switch locale → Publish.',
    },
    footer: {
      rights: 'All rights reserved.',
      follow: 'Follow',
      hours: '08:00 – 17:00',
    },
    trust: {
      title: 'From our showroom',
      items: [
        { title: 'Thoughtful advice', body: 'We help you choose tea ware that fits your space.' },
        { title: 'Careful packing', body: 'Fast delivery with protected ceramics on the way.' },
        { title: 'Bat Trang craft', body: 'Vietnamese kiln heritage — from artisan to tea table.' },
      ],
    },
    langLabel: 'Language',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
  },
  ja: {
    brand: 'ゴム・スー・ラグジュアリー',
    tagline: 'ベトナムの誇りある陶磁器 — 伝統の形と現代の静けさ',
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
      contact: 'Zaloで相談',
    },
    home: {
      heroTitle: 'ベトナムの器を、\n誇りとともに',
      heroBody:
        'バットチャンの茶器、茶盤、霊獣。伝統の手仕事と現代の佇まいを重ねています。',
      hot: '注目の作品',
      featuredEvents: '注目のイベント',
      craft: '土 · 水 · 火 · 手仕事',
      craftBody: '一点一点が、土・水・火、そして職人の手の対話です。',
      collections: 'コレクション',
      collectionsTitle: '茶の席から選ぶ',
      categories: {
        amChen: 'バットチャン茶器',
        phuKien: '茶席の道具',
        tuong: '霊獣の陶像',
        huTra: '茶入',
      },
      testimonials: 'お客様の声',
      testimonialsTitle: '愛用者からの言葉',
      reviews: [
        {
          quote: '品質が良く、形が美しく、相談も丁寧。配送も早いです。',
          author: 'お客様',
        },
        {
          quote: 'とても誠実でプロフェッショナル。選んだ器がどれも気に入りました。',
          author: 'リピーター',
        },
        {
          quote: '梱包が丁寧で対応も温かい。またお願いします。',
          author: 'お客様',
        },
      ],
    },
    products: {
      title: '作品',
      subtitle: 'バットチャン茶器、茶盤、茶入、霊獣の陶像',
      hot: '注目',
      stock: '在庫あり',
      outOfStock: '売り切れ',
      sku: '品番',
      attributes: '仕様',
      related: 'こちらもおすすめ',
    },
    events: {
      title: 'イベント',
      subtitle: 'ワークショップ、展示、茶と陶の体験',
      when: '日時',
      where: '場所',
    },
    articles: {
      title: '読みもの',
      subtitle: 'バットチャンの器、釉薬、茶席の物語',
      by: '著者',
      related: 'その他の記事',
      readMore: '続きを読む',
      empty: '記事がありません。Strapi Admin → Content Manager → Article で追加・Publishしてください。',
      missingLocale: 'この言語の公開記事がありません。Article → 言語切替 → Publish してください。',
    },
    footer: {
      rights: 'All rights reserved.',
      follow: 'フォロー',
      hours: '08:00 – 17:00',
    },
    trust: {
      title: 'ショールームからのお約束',
      items: [
        { title: '丁寧な相談', body: '空間に合う茶器選びをお手伝いします。' },
        { title: '安心の梱包', body: '丁寧に梱包し、迅速にお届けします。' },
        { title: 'バットチャンの技', body: 'ベトナムの窯の伝統を茶席へ。' },
      ],
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
