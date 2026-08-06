import type { Locale } from '../i18n/ui';
import { t } from '../i18n/ui';
import type { EventItem, Menu, PageItem, Product, SiteSetting } from './types';
import { demoImages, media } from './demo-images';

function L<T>(locale: Locale, map: Record<Locale, T>): T {
  return map[locale] ?? map.vi;
}

export function demoSettings(locale: Locale): SiteSetting {
  const siteName = L(locale, {
    vi: 'Gốm Sứ Luxury',
    en: 'Gom Su Luxury',
    ja: 'ゴム・スー・ラグジュアリー',
  });

  return {
    siteName,
    tagline: L(locale, {
      vi: 'Tự hào gốm Việt — vẻ đẹp thuần Việt, đẳng cấp toàn cầu',
      en: 'Proudly Vietnamese ceramics — heritage forms, contemporary calm',
      ja: 'ベトナムの誇りある陶磁器 — 伝統の形と現代の静けさ',
    }),
    phone: '083 7571 758',
    email: 'hello@gomsuluxury.vn',
    address: L(locale, {
      vi: 'Khu đô thị Viglacera Xuân Phương, Nam Từ Liêm, Hà Nội',
      en: 'Viglacera Xuan Phuong Urban Area, Nam Tu Liem, Hanoi',
      ja: 'ハノイ・ナムトゥリエム、ヴィグラセラ・スアンフオン都市区',
    }),
    zaloUrl: 'https://zalo.me/0837571758',
    facebookUrl: 'https://www.facebook.com/gomsuluxury',
    instagramUrl: 'https://www.tiktok.com/@gomluxury',
    logo: media(demoImages.logoMark, siteName, 192, 192),
    heroImage: media(
      demoImages.hero,
      L(locale, { vi: 'Gốm Sứ Luxury', en: 'Gom Su Luxury ceramics', ja: 'ゴム・スーの器' }),
      1449,
      2560
    ),
    craftImage: media(
      demoImages.craft,
      L(locale, { vi: 'Nghệ nhân và gốm Bát Tràng', en: 'Bat Trang artisan ceramics', ja: 'バットチャンの手仕事' }),
      1280,
      1280
    ),
    defaultSeo: {
      metaTitle: L(locale, {
        vi: 'Gốm Sứ Luxury | Tự Hào Gốm Việt',
        en: 'Gom Su Luxury | Proudly Vietnamese Ceramics',
        ja: 'ゴム・スー・ラグジュアリー | ベトナムの陶磁器',
      }),
      metaDescription: L(locale, {
        vi: 'Gốm sứ Bát Tràng cao cấp: ấm chén, khay trà, hũ trà và tượng linh vật từ Gốm Sứ Luxury.',
        en: 'Premium Bat Trang ceramics: tea sets, trays, jars and figurines from Gom Su Luxury.',
        ja: 'バットチャンの高級陶磁器。茶器、茶盤、茶入、霊獣を取り揃えています。',
      }),
      ogImage: media(demoImages.og, siteName, 1400, 788),
    },
  };
}

export function demoMenus(locale: Locale): Menu[] {
  const copy = t(locale);
  return [
    {
      title: L(locale, { vi: 'Menu chính', en: 'Header', ja: 'メインメニュー' }),
      slug: 'header',
      location: 'header',
      items: [
        { label: copy.nav.home, url: `/${locale}`, order: 1 },
        { label: copy.nav.products, url: `/${locale}/san-pham`, order: 2 },
        { label: copy.nav.events, url: `/${locale}/su-kien`, order: 3 },
        { label: copy.nav.articles, url: `/${locale}/bai-viet`, order: 4 },
        { label: copy.nav.about, url: `/${locale}/gioi-thieu`, order: 5 },
      ],
    },
  ];
}

export function demoProducts(locale: Locale): Product[] {
  return [
    {
      id: 1,
      name: L(locale, {
        vi: 'Bộ ấm chén Dáng Siêu — Men Thạch Hoa Viên',
        en: 'Sieu Form Tea Set — Thach Hoa Vien glaze',
        ja: 'スィエウ形茶器セット — 石花縁釉',
      }),
      slug: L(locale, {
        vi: 'bo-am-chen-dang-sieu-men-thach-hoa-vien',
        en: 'sieu-form-tea-set-thach-hoa-vien',
        ja: 'sieu-form-tea-set',
      }),
      shortDescription: L(locale, {
        vi: 'Ấm chén Bát Tràng dáng siêu, men thạch hoa viên — nghệ nhân Nguyễn Thị Hoa.',
        en: 'Bat Trang Sieu-form tea set with stone-blossom glaze by artisan Nguyen Thi Hoa.',
        ja: 'バットチャンのスィエウ形茶器。石花縁釉、職人グエン・ティ・ホア作。',
      }),
      description: L(locale, {
        vi: '<p>Bộ ấm chén gốm Bát Tràng cao cấp, men thạch hoa viên sâu màu. Phù hợp bàn trà tiếp khách và sưu tầm.</p>',
        en: '<p>A refined Bat Trang tea set with deep stone-blossom glaze — made for hosting and collecting.</p>',
        ja: '<p>深い石花縁釉のバットチャン茶器。もてなしとコレクションに。</p>',
      }),
      price: 2890000,
      compareAtPrice: 3200000,
      sku: 'GSL-AMCHEN-01',
      stock: 8,
      trackInventory: true,
      isHot: true,
      isFeatured: true,
      images: [
        media(demoImages.vase, L(locale, { vi: 'Ấm chén Dáng Siêu', en: 'Sieu form tea set', ja: 'スィエウ形茶器' })),
        media(demoImages.vaseAlt, L(locale, { vi: 'Chi tiết men thạch hoa', en: 'Glaze detail', ja: '釉のディテール' })),
      ],
      attributeValues: [
        { name: L(locale, { vi: 'Men', en: 'Glaze', ja: '釉薬' }), value: L(locale, { vi: 'Thạch Hoa Viên', en: 'Thach Hoa Vien', ja: '石花縁' }) },
        { name: L(locale, { vi: 'Xuất xứ', en: 'Origin', ja: '産地' }), value: L(locale, { vi: 'Bát Tràng', en: 'Bat Trang', ja: 'バットチャン' }) },
        { name: L(locale, { vi: 'Nghệ nhân', en: 'Artisan', ja: '職人' }), value: 'Nguyễn Thị Hoa' },
      ],
      promotions: [
        {
          title: L(locale, { vi: 'Ưu đãi bộ ấm', en: 'Tea set offer', ja: '茶器セット特典' }),
          discountType: 'percent',
          discountValue: 10,
          badgeLabel: '-10%',
          isActive: true,
        },
      ],
      seo: {
        metaTitle: L(locale, {
          vi: 'Bộ ấm chén Dáng Siêu | Gốm Sứ Luxury',
          en: 'Sieu Form Tea Set | Gom Su Luxury',
          ja: 'スィエウ形茶器 | ゴム・スー・ラグジュアリー',
        }),
        metaDescription: L(locale, {
          vi: 'Mua bộ ấm chén Bát Tràng men thạch hoa viên — nghệ nhân Nguyễn Thị Hoa.',
          en: 'Shop the Bat Trang Sieu-form tea set with Thach Hoa Vien glaze.',
          ja: 'バットチャンのスィエウ形茶器セット。',
        }),
        focusKeyword: L(locale, { vi: 'ấm chén Bát Tràng', en: 'Bat Trang tea set', ja: 'バットチャン茶器' }),
        seoScore: 88,
        ogImage: media(demoImages.vase, 'Tea set', 1200, 630),
      },
    },
    {
      id: 2,
      name: L(locale, {
        vi: 'Nhất Mã Thiên Hà Thủy',
        en: 'Nhat Ma Thien Ha Thuy',
        ja: 'ニャット・マー・ティエン・ハー・トゥイ',
      }),
      slug: L(locale, {
        vi: 'nhat-ma-thien-ha-thuy',
        en: 'nhat-ma-thien-ha-thuy',
        ja: 'nhat-ma-thien-ha-thuy',
      }),
      shortDescription: L(locale, {
        vi: 'Tượng gốm linh vật — điểm nhấn phòng khách và bàn trà.',
        en: 'Ceramic guardian figurine — a focal piece for living room and tea table.',
        ja: '霊獣の陶像。リビングや茶席の焦点に。',
      }),
      description: L(locale, {
        vi: '<p>Tượng gốm thủ công với dáng mã đáo thành công, men sâu, phù hợp trang trí và phong thủy nhẹ nhàng.</p>',
        en: '<p>Handcrafted ceramic horse figurine with deep glaze — decorative and quietly auspicious.</p>',
        ja: '<p>手仕事の馬の陶像。深い釉薬が特徴です。</p>',
      }),
      price: 4500000,
      sku: 'GSL-TUONG-01',
      stock: 5,
      trackInventory: true,
      isHot: true,
      images: [media(demoImages.bowls, L(locale, { vi: 'Nhất Mã Thiên Hà Thủy', en: 'Nhat Ma Thien Ha Thuy', ja: '霊獣の陶像' }))],
      attributeValues: [
        { name: L(locale, { vi: 'Loại', en: 'Type', ja: '種類' }), value: L(locale, { vi: 'Tượng linh vật', en: 'Figurine', ja: '霊獣' }) },
        { name: L(locale, { vi: 'Xuất xứ', en: 'Origin', ja: '産地' }), value: L(locale, { vi: 'Bát Tràng', en: 'Bat Trang', ja: 'バットチャン' }) },
      ],
      seo: {
        metaTitle: L(locale, {
          vi: 'Nhất Mã Thiên Hà Thủy | Gốm Sứ Luxury',
          en: 'Nhat Ma Thien Ha Thuy | Gom Su Luxury',
          ja: 'ニャット・マー | ゴム・スー・ラグジュアリー',
        }),
        metaDescription: L(locale, {
          vi: 'Tượng gốm linh vật Nhất Mã Thiên Hà Thủy từ Gốm Sứ Luxury.',
          en: 'Ceramic guardian figurine Nhat Ma Thien Ha Thuy from Gom Su Luxury.',
          ja: 'ゴム・スーの霊獣陶像。',
        }),
        seoScore: 82,
        ogImage: media(demoImages.bowls, 'Figurine', 1200, 630),
      },
    },
    {
      id: 3,
      name: L(locale, {
        vi: 'Khay trà gỗ nguyên tấm',
        en: 'Solid wood tea tray',
        ja: '一枚板の茶盤',
      }),
      slug: L(locale, {
        vi: 'khay-tra-go-nguyen-tam',
        en: 'solid-wood-tea-tray',
        ja: 'ichimaiita-chaban',
      }),
      shortDescription: L(locale, {
        vi: 'Khay trà gỗ nguyên tấm — nền vững cho ấm chén Bát Tràng.',
        en: 'Solid wood tea tray — a calm stage for Bat Trang tea ware.',
        ja: '一枚板の茶盤。バットチャン茶器を引き立てます。',
      }),
      description: L(locale, {
        vi: '<p>Khay trà gỗ tự nhiên, đường vân rõ, kích thước phù hợp bàn trà gia đình và showroom.</p>',
        en: '<p>Natural solid wood tray with clear grain — sized for home tea tables and showrooms.</p>',
        ja: '<p>木目の美しい一枚板茶盤。家庭の茶席にもショールームにも。</p>',
      }),
      price: 1650000,
      sku: 'GSL-KHAY-18',
      stock: 14,
      isHot: false,
      isFeatured: true,
      images: [media(demoImages.plate, L(locale, { vi: 'Khay trà gỗ', en: 'Wood tea tray', ja: '茶盤' }))],
      attributeValues: [
        { name: L(locale, { vi: 'Chất liệu', en: 'Material', ja: '素材' }), value: L(locale, { vi: 'Gỗ nguyên tấm', en: 'Solid wood', ja: '一枚板' }) },
        { name: L(locale, { vi: 'Kích thước', en: 'Size', ja: 'サイズ' }), value: '80 × 40 × 3.5 cm' },
      ],
      seo: {
        metaTitle: L(locale, {
          vi: 'Khay trà gỗ nguyên tấm',
          en: 'Solid wood tea tray',
          ja: '一枚板の茶盤',
        }),
        metaDescription: L(locale, {
          vi: 'Khay trà gỗ nguyên tấm cho bàn trà Bát Tràng.',
          en: 'Solid wood tea tray for Bat Trang tea service.',
          ja: 'バットチャン茶器のための一枚板茶盤。',
        }),
        seoScore: 76,
        ogImage: media(demoImages.plate, 'Tray', 1200, 630),
      },
    },
  ];
}

export function demoEvents(locale: Locale): EventItem[] {
  return [
    {
      id: 1,
      title: L(locale, {
        vi: 'Trải nghiệm bàn trà Bát Tràng',
        en: 'Bat Trang tea table tasting',
        ja: 'バットチャン茶席体験',
      }),
      slug: L(locale, {
        vi: 'trai-nghiem-ban-tra-bat-trang',
        en: 'bat-trang-tea-table-tasting',
        ja: 'bat-trang-chaseki',
      }),
      excerpt: L(locale, {
        vi: 'Thưởng trà và tìm hiểu cách bày ấm chén, khay trà trong không gian hiện đại.',
        en: 'Taste tea and learn how to stage tea sets and trays in a modern room.',
        ja: 'お茶を味わい、現代の空間での茶器と茶盤の整え方を学びます。',
      }),
      content: L(locale, {
        vi: '<p>Buổi trải nghiệm tại showroom Xuân Phương: chọn ấm, pha trà và bố cục bàn trà.</p>',
        en: '<p>A showroom session in Xuan Phuong: choosing a pot, brewing and composing the tea table.</p>',
        ja: '<p>スアンフオンのショールームで、急須選び・淹れ方・茶席の構成を体験。</p>',
      }),
      startDate: '2026-09-12T09:00:00.000Z',
      endDate: '2026-09-12T12:00:00.000Z',
      location: L(locale, {
        vi: 'Showroom Gốm Sứ Luxury, Xuân Phương, Hà Nội',
        en: 'Gom Su Luxury showroom, Xuan Phuong, Hanoi',
        ja: 'ゴム・スー・ショールーム（ハノイ・スアンフオン）',
      }),
      registrationUrl: 'https://zalo.me/0837571758',
      isFeatured: true,
      cover: media(demoImages.workshop, L(locale, { vi: 'Bàn trà', en: 'Tea table', ja: '茶席' }), 1400, 900),
      seo: {
        metaTitle: L(locale, {
          vi: 'Trải nghiệm bàn trà Bát Tràng',
          en: 'Bat Trang tea table tasting',
          ja: 'バットチャン茶席体験',
        }),
        metaDescription: L(locale, {
          vi: 'Đăng ký trải nghiệm bàn trà và ấm chén Bát Tràng tại Gốm Sứ Luxury.',
          en: 'Join a Bat Trang tea table experience at Gom Su Luxury.',
          ja: 'ゴム・スーでバットチャン茶席を体験。',
        }),
        seoScore: 81,
        ogImage: media(demoImages.workshop, 'Workshop', 1200, 630),
      },
    },
    {
      id: 2,
      title: L(locale, {
        vi: 'Đêm men và linh vật',
        en: 'Glaze & guardian evening',
        ja: '釉と霊獣の夜',
      }),
      slug: L(locale, {
        vi: 'dem-men-va-linh-vat',
        en: 'glaze-and-guardian-evening',
        ja: 'yuyaku-to-reiju-no-yoru',
      }),
      excerpt: L(locale, {
        vi: 'Buổi trò chuyện về men gốm và ý nghĩa tượng linh vật trên bàn trà.',
        en: 'An evening talk on ceramic glazes and guardian figurines for the tea table.',
        ja: '釉薬と茶席の霊獣について語る夕べ。',
      }),
      startDate: '2026-10-03T18:30:00.000Z',
      location: L(locale, {
        vi: 'Showroom Xuân Phương, Hà Nội',
        en: 'Xuan Phuong showroom, Hanoi',
        ja: 'スアンフオン・ショールーム（ハノイ）',
      }),
      isFeatured: true,
      cover: media(demoImages.glazeNight, L(locale, { vi: 'Men gốm', en: 'Ceramic glaze', ja: '釉薬' }), 1400, 900),
      seo: {
        metaTitle: L(locale, {
          vi: 'Đêm men và linh vật',
          en: 'Glaze & guardian evening',
          ja: '釉と霊獣の夜',
        }),
        metaDescription: L(locale, {
          vi: 'Trò chuyện về men gốm Bát Tràng và tượng linh vật.',
          en: 'Talk on Bat Trang glazes and guardian figurines.',
          ja: 'バットチャンの釉薬と霊獣についてのトーク。',
        }),
        seoScore: 74,
        ogImage: media(demoImages.glazeNight, 'Glaze', 1200, 630),
      },
    },
  ];
}

export function demoPages(locale: Locale): PageItem[] {
  return [
    {
      id: 1,
      title: L(locale, { vi: 'Giới thiệu', en: 'About', ja: '私たちについて' }),
      slug: 'gioi-thieu',
      excerpt: L(locale, {
        vi: 'Gốm Sứ Luxury — tự hào gốm Việt: vẻ đẹp thuần Việt, đẳng cấp toàn cầu.',
        en: 'Gom Su Luxury — proudly Vietnamese ceramics with global presence.',
        ja: 'ゴム・スー・ラグジュアリー — ベトナムの誇りある陶磁器。',
      }),
      content: L(locale, {
        vi: '<p>Tại Gốm Sứ Luxury, chúng tôi tin rằng mỗi sản phẩm gốm sứ là một bản giao hưởng giữa đất, nước, lửa và đôi bàn tay người nghệ nhân Việt.</p><p>Lấy cảm hứng từ tinh hoa gốm cổ truyền Bát Tràng, kết hợp tư duy thiết kế đương đại, chúng tôi kiến tạo những tuyệt phẩm gốm sứ cao cấp — nơi hội tụ vẻ đẹp truyền thống và khí chất sang trọng hiện đại.</p><p>Showroom: Khu đô thị Viglacera Xuân Phương, Nam Từ Liêm, Hà Nội · Hotline: 083 7571 758 · Giờ mở cửa: 08:00–17:00.</p>',
        en: '<p>At Gom Su Luxury, every ceramic piece is a dialogue between earth, water, fire and the Vietnamese artisan’s hand.</p><p>Inspired by Bat Trang heritage and contemporary design, we curate refined tea ware and decorative ceramics for modern living.</p><p>Showroom: Viglacera Xuan Phuong, Nam Tu Liem, Hanoi · Hotline: 083 7571 758 · Hours: 08:00–17:00.</p>',
        ja: '<p>ゴム・スーでは、器は土・水・火、そしてベトナムの職人の手の対話だと考えています。</p><p>バットチャンの伝統と現代のデザインを重ね、暮らしに寄り添う茶器と装飾の器を選んでいます。</p><p>ショールーム：ハノイ・ナムトゥリエム、ヴィグラセラ・スアンフオン · Tel: 083 7571 758 · 営業時間 08:00–17:00。</p>',
      }),
      template: 'about',
      heroImage: media(demoImages.about, L(locale, { vi: 'Giới thiệu Gốm Sứ Luxury', en: 'About Gom Su Luxury', ja: 'ゴム・スーについて' }), 1600, 1600),
      seo: {
        metaTitle: L(locale, {
          vi: 'Giới thiệu Gốm Sứ Luxury | Tự Hào Gốm Việt',
          en: 'About Gom Su Luxury | Proudly Vietnamese Ceramics',
          ja: 'ゴム・スー・ラグジュアリーについて',
        }),
        metaDescription: L(locale, {
          vi: 'Tìm hiểu Gốm Sứ Luxury — gốm Bát Tràng cao cấp tại Xuân Phương, Hà Nội.',
          en: 'Learn about Gom Su Luxury — premium Bat Trang ceramics in Hanoi.',
          ja: 'ハノイのゴム・スー — バットチャンの高級陶磁器。',
        }),
      },
    },
  ];
}
