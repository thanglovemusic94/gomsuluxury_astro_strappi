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
      vi: 'Gốm thủ công cho không gian sống tinh tế',
      en: 'Handcrafted ceramics for refined living',
      ja: '丁寧な暮らしのための手仕事の陶磁器',
    }),
    phone: '+84 90 123 4567',
    email: 'hello@gomsuluxury.vn',
    address: L(locale, {
      vi: 'Làng gốm Bình Dương, Việt Nam',
      en: 'Binh Duong Ceramic Village, Vietnam',
      ja: 'ベトナム・ビンズオン陶芸村',
    }),
    zaloUrl: 'https://zalo.me/gomsuluxury',
    facebookUrl: 'https://facebook.com/gomsuluxury',
    instagramUrl: 'https://instagram.com/gomsuluxury',
    logo: media(demoImages.logo, siteName, 200, 200),
    heroImage: media(
      demoImages.hero,
      L(locale, { vi: 'Gốm trong xưởng', en: 'Studio ceramics', ja: '工房の器' }),
      2000,
      1333
    ),
    craftImage: media(
      demoImages.craft,
      L(locale, { vi: 'Bàn xoay gốm', en: 'Pottery wheel', ja: 'ロクロ' }),
      1400,
      1050
    ),
    defaultSeo: {
      metaTitle: L(locale, {
        vi: 'Gốm Sứ Luxury | Gốm thủ công cao cấp',
        en: 'Gom Su Luxury | Handcrafted Ceramics',
        ja: 'ゴム・スー・ラグジュアリー | 手仕事の陶磁器',
      }),
      metaDescription: L(locale, {
        vi: 'Khám phá bình celadon, bàn ăn gốm đá và workshop làm gốm từ Gốm Sứ Luxury.',
        en: 'Discover celadon vases, stoneware tableware and ceramic workshops from Gom Su Luxury.',
        ja: '青磁の花器、炻器の食器、陶芸ワークショップをご紹介します。',
      }),
      ogImage: media(demoImages.og, siteName, 1200, 630),
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
        vi: 'Bình sen men celadon',
        en: 'Celadon Lotus Vase',
        ja: '青磁 蓮の花器',
      }),
      slug: L(locale, {
        vi: 'binh-sen-men-celadon',
        en: 'celadon-lotus-vase',
        ja: 'seiji-hasu-kabin',
      }),
      shortDescription: L(locale, {
        vi: 'Bình celadon dáng sen mềm, men xanh ngọc sâu.',
        en: 'Tall celadon vase with soft lotus silhouette.',
        ja: 'やわらかな蓮のシルエットの青磁花器。',
      }),
      description: L(locale, {
        vi: '<p>Gốm đá tạo dáng thủ công, phủ men celadon. Phù hợp làm điểm nhấn nhẹ nhàng cho phòng khách.</p>',
        en: '<p>Hand-thrown stoneware finished in celadon glaze. Ideal as a quiet focal piece for living rooms.</p>',
        ja: '<p>手びねりの炻器に青磁釉をかけた花器。リビングの静かなアクセントに。</p>',
      }),
      price: 1890000,
      compareAtPrice: 2200000,
      sku: 'GSL-VASE-01',
      stock: 12,
      trackInventory: true,
      isHot: true,
      isFeatured: true,
      images: [
        media(demoImages.vase, L(locale, { vi: 'Bình sen men celadon', en: 'Celadon lotus vase', ja: '青磁 蓮の花器' })),
        media(demoImages.vaseAlt, L(locale, { vi: 'Chi tiết bình celadon', en: 'Celadon vase detail', ja: '青磁花器のディテール' })),
      ],
      attributeValues: [
        { name: L(locale, { vi: 'Men', en: 'Glaze', ja: '釉薬' }), value: 'Celadon' },
        { name: L(locale, { vi: 'Chiều cao', en: 'Height', ja: '高さ' }), value: '32 cm' },
        {
          name: L(locale, { vi: 'Chất liệu', en: 'Material', ja: '素材' }),
          value: L(locale, { vi: 'Gốm đá', en: 'Stoneware', ja: '炻器' }),
        },
      ],
      promotions: [
        {
          title: L(locale, { vi: 'Ưu đãi lò xuân', en: 'Spring kiln sale', ja: '春窯セール' }),
          discountType: 'percent',
          discountValue: 15,
          badgeLabel: '-15%',
          isActive: true,
        },
      ],
      seo: {
        metaTitle: L(locale, {
          vi: 'Bình sen men celadon | Gốm Sứ Luxury',
          en: 'Celadon Lotus Vase | Gom Su Luxury',
          ja: '青磁 蓮の花器 | ゴム・スー・ラグジュアリー',
        }),
        metaDescription: L(locale, {
          vi: 'Mua Bình sen men celadon — gốm đá thủ công với sắc men xanh ngọc.',
          en: 'Shop the Celadon Lotus Vase — handcrafted stoneware with jade-depth glaze.',
          ja: '手仕事の炻器に深い青磁釉をかけた蓮の花器。',
        }),
        focusKeyword: L(locale, { vi: 'bình celadon', en: 'celadon vase', ja: '青磁花器' }),
        seoScore: 86,
        ogImage: media(demoImages.vase, 'Celadon', 1200, 630),
      },
    },
    {
      id: 2,
      name: L(locale, { vi: 'Bộ chén mực', en: 'Ink Bowl Set', ja: '墨色ボウルセット' }),
      slug: L(locale, { vi: 'bo-chen-muc', en: 'ink-bowl-set', ja: 'sumiiro-bowl-set' }),
      shortDescription: L(locale, {
        vi: 'Bộ chén men mực mờ cho bàn ăn hằng ngày.',
        en: 'Matte charcoal bowls for everyday dining.',
        ja: '毎日の食卓のためのマットな墨色ボウル。',
      }),
      description: L(locale, {
        vi: '<p>Bộ 4 chén lồng nhau, men mực mờ dịu mắt.</p>',
        en: '<p>Four nesting bowls with a soft matte charcoal glaze.</p>',
        ja: '<p>重ねやすい4点セット。やわらかなマット釉です。</p>',
      }),
      price: 890000,
      sku: 'GSL-BOWL-04',
      stock: 28,
      isHot: true,
      images: [media(demoImages.bowls, L(locale, { vi: 'Bộ chén mực', en: 'Ink bowl set', ja: '墨色ボウル' }))],
      attributeValues: [
        { name: L(locale, { vi: 'Số lượng', en: 'Pieces', ja: '点数' }), value: '4' },
        { name: L(locale, { vi: 'Đường kính', en: 'Diameter', ja: '直径' }), value: '14 cm' },
      ],
      seo: {
        metaTitle: L(locale, {
          vi: 'Bộ chén mực | Gốm Sứ Luxury',
          en: 'Ink Bowl Set | Gom Su Luxury',
          ja: '墨色ボウルセット | ゴム・スー・ラグジュアリー',
        }),
        metaDescription: L(locale, {
          vi: 'Bộ chén gốm men mực cho bữa ăn tinh tế mỗi ngày.',
          en: 'Matte charcoal ceramic bowl set for refined everyday meals.',
          ja: '日常の食事を整えるマットな墨色ボウルセット。',
        }),
        seoScore: 78,
        ogImage: media(demoImages.bowls, 'Bowls', 1200, 630),
      },
    },
    {
      id: 3,
      name: L(locale, { vi: 'Đĩa viền đồng', en: 'Copper Rim Plate', ja: '銅縁プレート' }),
      slug: L(locale, { vi: 'dia-vien-dong', en: 'copper-rim-plate', ja: 'doubuchi-plate' }),
      shortDescription: L(locale, {
        vi: 'Đĩa sứ viền đồng xước nhẹ.',
        en: 'Porcelain plate with brushed copper rim.',
        ja: '薄い銅縁の磁器プレート。',
      }),
      price: 420000,
      sku: 'GSL-PLATE-09',
      stock: 40,
      isHot: false,
      isFeatured: true,
      images: [media(demoImages.plate, L(locale, { vi: 'Đĩa viền đồng', en: 'Copper rim plate', ja: '銅縁プレート' }))],
      attributeValues: [
        { name: L(locale, { vi: 'Đường kính', en: 'Diameter', ja: '直径' }), value: '22 cm' },
      ],
      seo: {
        metaTitle: L(locale, {
          vi: 'Đĩa viền đồng',
          en: 'Copper Rim Plate',
          ja: '銅縁プレート',
        }),
        metaDescription: L(locale, {
          vi: 'Đĩa sứ bàn ăn với điểm nhấn viền đồng tinh tế.',
          en: 'Porcelain dining plate with subtle copper accent.',
          ja: '控えめな銅縁がアクセントの磁器皿。',
        }),
        seoScore: 72,
        ogImage: media(demoImages.plate, 'Plate', 1200, 630),
      },
    },
  ];
}

export function demoEvents(locale: Locale): EventItem[] {
  return [
    {
      id: 1,
      title: L(locale, {
        vi: 'Workshop bàn xoay cuối tuần',
        en: 'Weekend Wheel Throwing',
        ja: '週末ロクロ体験',
      }),
      slug: L(locale, {
        vi: 'workshop-ban-xoay-cuoi-tuan',
        en: 'weekend-wheel-throwing',
        ja: 'shumatsu-rokuro-taiken',
      }),
      excerpt: L(locale, {
        vi: 'Trải nghiệm làm gốm cho người mới — mang về chiếc bình đầu tay.',
        en: 'A hands-on clay session for beginners — leave with your first vessel.',
        ja: '初心者向け陶芸体験。最初の一輪を持ち帰れます。',
      }),
      content: L(locale, {
        vi: '<p>Buổi hướng dẫn 3 giờ: căn đất, kéo thành và hoàn thiện miệng bình.</p>',
        en: '<p>Three-hour guided session covering centering, pulling walls and finishing rims.</p>',
        ja: '<p>3時間の指導。土の芯出し、壁の引き上げ、口縁の仕上げまで。</p>',
      }),
      startDate: '2026-09-12T09:00:00.000Z',
      endDate: '2026-09-12T12:00:00.000Z',
      location: L(locale, {
        vi: 'Xưởng Gốm Sứ Luxury, Bình Dương',
        en: 'Gom Su Studio, Binh Duong',
        ja: 'ゴム・スー工房（ビンズオン）',
      }),
      registrationUrl: '#',
      isFeatured: true,
      cover: media(demoImages.workshop, L(locale, { vi: 'Workshop bàn xoay', en: 'Wheel throwing workshop', ja: 'ロクロ体験' }), 1400, 900),
      seo: {
        metaTitle: L(locale, {
          vi: 'Workshop bàn xoay cuối tuần',
          en: 'Weekend Wheel Throwing Workshop',
          ja: '週末ロクロ体験',
        }),
        metaDescription: L(locale, {
          vi: 'Tham gia workshop làm gốm bàn xoay dành cho người mới bắt đầu.',
          en: 'Join our beginner-friendly ceramic wheel throwing workshop.',
          ja: '初心者歓迎のロクロ陶芸ワークショップ。',
        }),
        seoScore: 81,
        ogImage: media(demoImages.workshop, 'Workshop', 1200, 630),
      },
    },
    {
      id: 2,
      title: L(locale, {
        vi: 'Đêm men celadon',
        en: 'Celadon Glaze Evening',
        ja: '青磁の夜',
      }),
      slug: L(locale, {
        vi: 'dem-men-celadon',
        en: 'celadon-glaze-evening',
        ja: 'seiji-no-yoru',
      }),
      excerpt: L(locale, {
        vi: 'Buổi trò chuyện về lịch sử men celadon và câu chuyện lò nung.',
        en: 'Talk and tasting night on celadon history and kiln stories.',
        ja: '青磁の歴史と窯の物語を語る夕べ。',
      }),
      startDate: '2026-10-03T18:30:00.000Z',
      location: L(locale, {
        vi: 'Showroom Quận 1',
        en: 'Showroom District 1',
        ja: '1区ショールーム',
      }),
      isFeatured: true,
      cover: media(demoImages.glazeNight, L(locale, { vi: 'Đêm men celadon', en: 'Celadon evening', ja: '青磁の夜' }), 1400, 900),
      seo: {
        metaTitle: L(locale, {
          vi: 'Đêm men celadon',
          en: 'Celadon Glaze Evening',
          ja: '青磁の夜',
        }),
        metaDescription: L(locale, {
          vi: 'Buổi tối trò chuyện về truyền thống men celadon.',
          en: 'An evening talk on celadon glaze traditions.',
          ja: '青磁釉の伝統について語る夜の会。',
        }),
        seoScore: 74,
        ogImage: media(demoImages.glazeNight, 'Celadon', 1200, 630),
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
        vi: 'Ngôi nhà gốm nhỏ gắn với nghề lò Việt.',
        en: 'A small ceramic house rooted in Vietnamese kiln craft.',
        ja: 'ベトナムの窯仕事に根ざした小さな陶の家。',
      }),
      content: L(locale, {
        vi: '<p>Gốm Sứ Luxury hợp tác cùng nghệ nhân Bình Dương để tạo những món gốm bền đẹp cho nhà ở hiện đại.</p>',
        en: '<p>Gom Su Luxury collaborates with artisans in Binh Duong to create quiet, durable pieces for modern homes.</p>',
        ja: '<p>ビンズオンの職人とともに、現代の住まいに馴染む静かな器をつくっています。</p>',
      }),
      template: 'about',
      heroImage: media(demoImages.about, L(locale, { vi: 'Giới thiệu xưởng', en: 'About our studio', ja: '工房紹介' }), 1400, 900),
      seo: {
        metaTitle: L(locale, {
          vi: 'Giới thiệu Gốm Sứ Luxury',
          en: 'About Gom Su Luxury',
          ja: 'ゴム・スー・ラグジュアリーについて',
        }),
        metaDescription: L(locale, {
          vi: 'Tìm hiểu về xưởng gốm và đối tác nghệ nhân của chúng tôi.',
          en: 'Learn about our ceramic studio and artisan partners.',
          ja: '工房と職人パートナーについて。',
        }),
      },
    },
  ];
}

export function demoArticles(locale: Locale): Article[] {
  return [
    {
      id: 1,
      title: L(locale, {
        vi: 'Men celadon tìm độ sâu thế nào',
        en: 'How celadon finds its depth',
        ja: '青磁が深みを得るまで',
      }),
      slug: L(locale, {
        vi: 'men-celadon-tim-do-sau',
        en: 'how-celadon-finds-its-depth',
        ja: 'seiji-ga-fukami-wo-eru-made',
      }),
      excerpt: L(locale, {
        vi: 'Vài dòng về lửa khử và sắc xanh trầm của men celadon.',
        en: 'A short note on reduction firing and the quiet green of celadon.',
        ja: '還元焼成と青磁の静かな緑についての短いメモ。',
      }),
      content: L(locale, {
        vi: '<p>Celadon không chỉ là một màu — đó là bầu không khí tạo nên từ đất, công thức men và tính khí của lò.</p><p>Xưởng chúng tôi ghi chép từng mẻ nung để đuổi theo sắc xanh ngọc dịu.</p>',
        en: '<p>Celadon is not only a color — it is atmosphere created by clay body, glaze recipe and kiln temperament.</p><p>Our studio keeps notes from every firing to chase that soft jade depth.</p>',
        ja: '<p>青磁は単なる色ではなく、土、釉薬、窯の気質がつくる空気感です。</p><p>工房では焼成ごとに記録を残し、やわらかな翡翠のような深みを探しています。</p>',
      }),
      cover: media(demoImages.glazeNight, L(locale, { vi: 'Men celadon', en: 'Celadon glaze', ja: '青磁釉' }), 1400, 900),
      authorName: L(locale, { vi: 'Ghi chép xưởng', en: 'Studio notes', ja: '工房ノート' }),
      displayDate: '2026-07-18T08:00:00.000Z',
      isFeatured: true,
      tags: L(locale, {
        vi: ['men', 'lò nung'],
        en: ['glaze', 'kiln'],
        ja: ['釉薬', '窯'],
      }),
      seo: {
        metaTitle: L(locale, {
          vi: 'Men celadon tìm độ sâu thế nào',
          en: 'How celadon finds its depth',
          ja: '青磁が深みを得るまで',
        }),
        metaDescription: L(locale, {
          vi: 'Ghi chép về men celadon và lửa khử.',
          en: 'Notes on celadon glaze and reduction firing.',
          ja: '青磁釉と還元焼成についてのノート。',
        }),
        seoScore: 80,
        ogImage: media(demoImages.glazeNight, 'Celadon', 1200, 630),
      },
    },
    {
      id: 2,
      title: L(locale, {
        vi: 'Bày bàn ăn thật chậm',
        en: 'Setting a quiet table',
        ja: '静かな食卓の整え方',
      }),
      slug: L(locale, {
        vi: 'bay-ban-an-that-cham',
        en: 'setting-a-quiet-table',
        ja: 'shizuka-na-shokutaku',
      }),
      excerpt: L(locale, {
        vi: 'Chén, đĩa và khoảng trống cho nghi thức mỗi ngày.',
        en: 'Bowls, plates and negative space for everyday ceremony.',
        ja: '碗と皿、余白がつくる毎日の作法。',
      }),
      content: L(locale, {
        vi: '<p>Bàn ăn tinh tế không cần nhiều món — chỉ cần form chân thật và cầm nắm dễ chịu.</p>',
        en: '<p>A refined table does not need many objects — only honest forms that feel good in the hand.</p>',
        ja: '<p>上品な食卓に多くの器は要りません。手触りの良い素直な形があれば十分です。</p>',
      }),
      cover: media(demoImages.bowls, L(locale, { vi: 'Bàn ăn gốm', en: 'Tableware', ja: '食器' }), 1400, 900),
      authorName: L(locale, { vi: 'Biên tập', en: 'Editorial', ja: '編集' }),
      displayDate: '2026-06-02T08:00:00.000Z',
      isFeatured: false,
      tags: L(locale, { vi: ['bàn ăn'], en: ['tableware'], ja: ['食器'] }),
      seo: {
        metaTitle: L(locale, {
          vi: 'Bày bàn ăn thật chậm',
          en: 'Setting a quiet table',
          ja: '静かな食卓の整え方',
        }),
        metaDescription: L(locale, {
          vi: 'Gợi ý bày bàn với gốm thủ công.',
          en: 'Ideas for ceramic table settings.',
          ja: '手仕事の器で食卓を整えるヒント。',
        }),
        seoScore: 76,
      },
    },
  ];
}
