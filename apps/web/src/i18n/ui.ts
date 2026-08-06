export const locales = ['vi', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'vi';

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
    },
    footer: {
      rights: 'All rights reserved.',
      follow: 'Follow',
    },
    langLabel: 'Language',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
  },
} as const;

export function t(locale: Locale) {
  return ui[locale] || ui.vi;
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
