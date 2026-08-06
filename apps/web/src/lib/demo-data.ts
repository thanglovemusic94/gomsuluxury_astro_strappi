import type { Locale } from '../i18n/ui';
import type { EventItem, Menu, PageItem, Product, SiteSetting } from './types';
import { demoImages, media } from './demo-images';

export function demoSettings(locale: Locale): SiteSetting {
  const base =
    locale === 'en'
      ? {
          siteName: 'Gom Su Luxury',
          tagline: 'Handcrafted ceramics for refined living',
          address: 'Binh Duong Ceramic Village, Vietnam',
          defaultSeo: {
            metaTitle: 'Gom Su Luxury | Handcrafted Ceramics',
            metaDescription:
              'Discover celadon vases, stoneware tableware and ceramic workshops from Gom Su Luxury.',
            ogImage: media(demoImages.og, 'Gom Su Luxury ceramics', 1200, 630),
          },
        }
      : {
          siteName: 'Gốm Sứ Luxury',
          tagline: 'Gốm thủ công cho không gian sống tinh tế',
          address: 'Làng gốm Bình Dương, Việt Nam',
          defaultSeo: {
            metaTitle: 'Gốm Sứ Luxury | Gốm thủ công cao cấp',
            metaDescription:
              'Khám phá bình celadon, bàn ăn gốm đá và workshop làm gốm từ Gốm Sứ Luxury.',
            ogImage: media(demoImages.og, 'Gốm Sứ Luxury', 1200, 630),
          },
        };

  return {
    ...base,
    phone: '+84 90 123 4567',
    email: 'hello@gomsuluxury.vn',
    zaloUrl: 'https://zalo.me/gomsuluxury',
    facebookUrl: 'https://facebook.com/gomsuluxury',
    instagramUrl: 'https://instagram.com/gomsuluxury',
    logo: media(demoImages.logo, base.siteName, 200, 200),
    heroImage: media(demoImages.hero, locale === 'en' ? 'Studio ceramics' : 'Gốm trong xưởng', 2000, 1333),
    craftImage: media(demoImages.craft, locale === 'en' ? 'Pottery wheel' : 'Bàn xoay gốm', 1400, 1050),
  };
}

export function demoMenus(locale: Locale): Menu[] {
  const isEn = locale === 'en';
  return [
    {
      title: isEn ? 'Header' : 'Menu chính',
      slug: 'header',
      location: 'header',
      items: [
        { label: isEn ? 'Home' : 'Trang chủ', url: `/${locale}`, order: 1 },
        { label: isEn ? 'Products' : 'Sản phẩm', url: `/${locale}/san-pham`, order: 2 },
        { label: isEn ? 'Events' : 'Sự kiện', url: `/${locale}/su-kien`, order: 3 },
        { label: isEn ? 'About' : 'Giới thiệu', url: `/${locale}/gioi-thieu`, order: 4 },
      ],
    },
  ];
}

export function demoProducts(locale: Locale): Product[] {
  const isEn = locale === 'en';
  return [
    {
      id: 1,
      name: isEn ? 'Celadon Lotus Vase' : 'Bình sen men celadon',
      slug: isEn ? 'celadon-lotus-vase' : 'binh-sen-men-celadon',
      shortDescription: isEn
        ? 'Tall celadon vase with soft lotus silhouette.'
        : 'Bình celadon dáng sen mềm, men xanh ngọc sâu.',
      description: isEn
        ? '<p>Hand-thrown stoneware finished in celadon glaze. Ideal as a quiet focal piece for living rooms.</p>'
        : '<p>Gốm đá tạo dáng thủ công, phủ men celadon. Phù hợp làm điểm nhấn nhẹ nhàng cho phòng khách.</p>',
      price: 1890000,
      compareAtPrice: 2200000,
      sku: 'GSL-VASE-01',
      stock: 12,
      trackInventory: true,
      isHot: true,
      isFeatured: true,
      images: [
        media(demoImages.vase, isEn ? 'Celadon lotus vase' : 'Bình sen men celadon'),
        media(demoImages.vaseAlt, isEn ? 'Celadon vase detail' : 'Chi tiết bình celadon'),
      ],
      attributeValues: [
        { name: isEn ? 'Glaze' : 'Men', value: 'Celadon' },
        { name: isEn ? 'Height' : 'Chiều cao', value: '32 cm' },
        { name: isEn ? 'Material' : 'Chất liệu', value: isEn ? 'Stoneware' : 'Gốm đá' },
      ],
      promotions: [
        {
          title: isEn ? 'Spring kiln sale' : 'Ưu đãi lò xuân',
          discountType: 'percent',
          discountValue: 15,
          badgeLabel: '-15%',
          isActive: true,
        },
      ],
      seo: {
        metaTitle: isEn ? 'Celadon Lotus Vase | Gom Su Luxury' : 'Bình sen men celadon | Gốm Sứ Luxury',
        metaDescription: isEn
          ? 'Shop the Celadon Lotus Vase — handcrafted stoneware with jade-depth glaze.'
          : 'Mua Bình sen men celadon — gốm đá thủ công với sắc men xanh ngọc.',
        focusKeyword: isEn ? 'celadon vase' : 'bình celadon',
        seoScore: 86,
        ogImage: media(demoImages.vase, isEn ? 'Celadon vase' : 'Bình celadon', 1200, 630),
      },
    },
    {
      id: 2,
      name: isEn ? 'Ink Bowl Set' : 'Bộ chén mực',
      slug: isEn ? 'ink-bowl-set' : 'bo-chen-muc',
      shortDescription: isEn
        ? 'Matte charcoal bowls for everyday dining.'
        : 'Bộ chén men mực mờ cho bàn ăn hằng ngày.',
      description: isEn
        ? '<p>Four nesting bowls with a soft matte charcoal glaze.</p>'
        : '<p>Bộ 4 chén lồng nhau, men mực mờ dịu mắt.</p>',
      price: 890000,
      sku: 'GSL-BOWL-04',
      stock: 28,
      isHot: true,
      images: [media(demoImages.bowls, isEn ? 'Ink bowl set' : 'Bộ chén mực')],
      attributeValues: [
        { name: isEn ? 'Pieces' : 'Số lượng', value: '4' },
        { name: isEn ? 'Diameter' : 'Đường kính', value: '14 cm' },
      ],
      seo: {
        metaTitle: isEn ? 'Ink Bowl Set | Gom Su Luxury' : 'Bộ chén mực | Gốm Sứ Luxury',
        metaDescription: isEn
          ? 'Matte charcoal ceramic bowl set for refined everyday meals.'
          : 'Bộ chén gốm men mực cho bữa ăn tinh tế mỗi ngày.',
        seoScore: 78,
        ogImage: media(demoImages.bowls, isEn ? 'Bowl set' : 'Bộ chén', 1200, 630),
      },
    },
    {
      id: 3,
      name: isEn ? 'Copper Rim Plate' : 'Đĩa viền đồng',
      slug: isEn ? 'copper-rim-plate' : 'dia-vien-dong',
      shortDescription: isEn
        ? 'Porcelain plate with brushed copper rim.'
        : 'Đĩa sứ viền đồng xước nhẹ.',
      price: 420000,
      sku: 'GSL-PLATE-09',
      stock: 40,
      isHot: false,
      isFeatured: true,
      images: [media(demoImages.plate, isEn ? 'Copper rim plate' : 'Đĩa viền đồng')],
      attributeValues: [{ name: isEn ? 'Diameter' : 'Đường kính', value: '22 cm' }],
      seo: {
        metaTitle: isEn ? 'Copper Rim Plate' : 'Đĩa viền đồng',
        metaDescription: isEn
          ? 'Porcelain dining plate with subtle copper accent.'
          : 'Đĩa sứ bàn ăn với điểm nhấn viền đồng tinh tế.',
        seoScore: 72,
        ogImage: media(demoImages.plate, isEn ? 'Plate' : 'Đĩa', 1200, 630),
      },
    },
  ];
}

export function demoEvents(locale: Locale): EventItem[] {
  const isEn = locale === 'en';
  return [
    {
      id: 1,
      title: isEn ? 'Weekend Wheel Throwing' : 'Workshop bàn xoay cuối tuần',
      slug: isEn ? 'weekend-wheel-throwing' : 'workshop-ban-xoay-cuoi-tuan',
      excerpt: isEn
        ? 'A hands-on clay session for beginners — leave with your first vessel.'
        : 'Trải nghiệm làm gốm cho người mới — mang về chiếc bình đầu tay.',
      content: isEn
        ? '<p>Three-hour guided session covering centering, pulling walls and finishing rims.</p>'
        : '<p>Buổi hướng dẫn 3 giờ: căn đất, kéo thành và hoàn thiện miệng bình.</p>',
      startDate: '2026-09-12T09:00:00.000Z',
      endDate: '2026-09-12T12:00:00.000Z',
      location: isEn ? 'Gom Su Studio, Binh Duong' : 'Xưởng Gốm Sứ Luxury, Bình Dương',
      registrationUrl: '#',
      isFeatured: true,
      cover: media(demoImages.workshop, isEn ? 'Wheel throwing workshop' : 'Workshop bàn xoay', 1400, 900),
      seo: {
        metaTitle: isEn ? 'Weekend Wheel Throwing Workshop' : 'Workshop bàn xoay cuối tuần',
        metaDescription: isEn
          ? 'Join our beginner-friendly ceramic wheel throwing workshop.'
          : 'Tham gia workshop làm gốm bàn xoay dành cho người mới bắt đầu.',
        seoScore: 81,
        ogImage: media(demoImages.workshop, 'Workshop', 1200, 630),
      },
    },
    {
      id: 2,
      title: isEn ? 'Celadon Glaze Evening' : 'Đêm men celadon',
      slug: isEn ? 'celadon-glaze-evening' : 'dem-men-celadon',
      excerpt: isEn
        ? 'Talk and tasting night on celadon history and kiln stories.'
        : 'Buổi trò chuyện về lịch sử men celadon và câu chuyện lò nung.',
      startDate: '2026-10-03T18:30:00.000Z',
      location: isEn ? 'Showroom District 1' : 'Showroom Quận 1',
      isFeatured: true,
      cover: media(demoImages.glazeNight, isEn ? 'Celadon evening' : 'Đêm men celadon', 1400, 900),
      seo: {
        metaTitle: isEn ? 'Celadon Glaze Evening' : 'Đêm men celadon',
        metaDescription: isEn
          ? 'An evening talk on celadon glaze traditions.'
          : 'Buổi tối trò chuyện về truyền thống men celadon.',
        seoScore: 74,
        ogImage: media(demoImages.glazeNight, 'Celadon', 1200, 630),
      },
    },
  ];
}

export function demoPages(locale: Locale): PageItem[] {
  const isEn = locale === 'en';
  return [
    {
      id: 1,
      title: isEn ? 'About' : 'Giới thiệu',
      slug: 'gioi-thieu',
      excerpt: isEn
        ? 'A small ceramic house rooted in Vietnamese kiln craft.'
        : 'Ngôi nhà gốm nhỏ gắn với nghề lò Việt.',
      content: isEn
        ? '<p>Gom Su Luxury collaborates with artisans in Binh Duong to create quiet, durable pieces for modern homes.</p>'
        : '<p>Gốm Sứ Luxury hợp tác cùng nghệ nhân Bình Dương để tạo những món gốm bền đẹp cho nhà ở hiện đại.</p>',
      template: 'about',
      heroImage: media(demoImages.about, isEn ? 'About our studio' : 'Giới thiệu xưởng', 1400, 900),
      seo: {
        metaTitle: isEn ? 'About Gom Su Luxury' : 'Giới thiệu Gốm Sứ Luxury',
        metaDescription: isEn
          ? 'Learn about our ceramic studio and artisan partners.'
          : 'Tìm hiểu về xưởng gốm và đối tác nghệ nhân của chúng tôi.',
      },
    },
  ];
}
