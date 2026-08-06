/**
 * Import products, posts, categories, menus, pages & site settings
 * from https://gomsuluxury.vn (WordPress / WooCommerce) into Strapi.
 *
 * Usage (from apps/cms, Strapi must be stopped):
 *   node scripts/import-wp.mjs
 *
 * Env:
 *   WP_PRODUCT_LIMIT=60   (default 60)
 *   WP_POST_LIMIT=21      (default 21)
 *   FORCE_REIMPORT=1      (delete existing seeded content first)
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { createStrapi } = require('@strapi/strapi');

const WP = 'https://gomsuluxury.vn';
const TMP = path.join('/tmp', 'gomsu-wp-import');
const PRODUCT_LIMIT = Number(process.env.WP_PRODUCT_LIMIT || 60);
const POST_LIMIT = Number(process.env.WP_POST_LIMIT || 21);
const FORCE = process.env.FORCE_REIMPORT === '1';

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: { Accept: 'application/json', 'User-Agent': 'GomSuLuxury-Importer/1.0' },
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const total = Number(res.headers.get('X-WP-Total') || 0);
  const data = await res.json();
  return { data, total };
}

function stripHtml(html = '') {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8211;/g, '–')
    .replace(/&#038;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function htmlToRichtext(html = '') {
  // Keep basic HTML for Strapi richtext
  return (html || '')
    .replace(/srcset="[^"]*"/gi, '')
    .replace(/sizes="[^"]*"/gi, '')
    .replace(/loading="[^"]*"/gi, '')
    .trim();
}

function slugify(input = '') {
  return String(input)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

async function downloadFile(url, destPath) {
  const res = await fetch(url, { headers: { 'User-Agent': 'GomSuLuxury-Importer/1.0' } });
  if (!res.ok) throw new Error(`download ${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, buf);
  return buf.length;
}

async function optimizeImage(srcPath, maxEdge = 1400) {
  try {
    const { default: sharp } = await import('sharp').catch(() => ({ default: null }));
    if (!sharp) return srcPath;
    const out = srcPath.replace(/(\.[a-z]+)$/i, '.opt$1').replace(/\.opt\.(png|webp)$/i, '.opt.jpg');
    const finalOut = out.endsWith('.opt.jpg') ? out : `${srcPath}.opt.jpg`;
    await sharp(srcPath)
      .rotate()
      .resize({ width: maxEdge, height: maxEdge, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(finalOut);
    return finalOut;
  } catch {
    // Pillow fallback via child_process is heavy; return original
    return srcPath;
  }
}

async function uploadFile(strapi, filePath, alt = '') {
  const stat = fs.statSync(filePath);
  const name = path.basename(filePath).replace(/\.opt\.jpg$/i, '.jpg');
  const ext = path.extname(name).toLowerCase();
  const mime =
    ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : ext === '.gif' ? 'image/gif' : 'image/jpeg';

  const uploaded = await strapi.plugin('upload').service('upload').upload({
    data: {
      fileInfo: {
        name,
        alternativeText: alt || name,
        caption: alt || '',
      },
    },
    files: {
      filepath: filePath,
      originalFilename: name,
      mimetype: mime,
      size: stat.size,
    },
  });

  const file = Array.isArray(uploaded) ? uploaded[0] : uploaded;
  return file?.id;
}

async function uploadFromUrl(strapi, url, alt, cacheKey) {
  if (!url) return null;
  const key = cacheKey || crypto.createHash('md5').update(url).digest('hex');
  const ext = path.extname(new URL(url).pathname) || '.jpg';
  const rawPath = path.join(TMP, `${key}${ext.split('?')[0] || '.jpg'}`);
  try {
    if (!fs.existsSync(rawPath)) {
      await downloadFile(url, rawPath);
    }
    const optimized = await optimizeImage(rawPath);
    return await uploadFile(strapi, optimized, alt);
  } catch (err) {
    strapi.log.warn(`[import] skip image ${url}: ${err.message}`);
    return null;
  }
}

async function clearSeeded(strapi) {
  const uids = [
    'api::product.product',
    'api::article.article',
    'api::category.category',
    'api::page.page',
    'api::menu.menu',
    'api::event.event',
  ];
  for (const uid of uids) {
    const docs = await strapi.documents(uid).findMany({ locale: '*' });
    for (const doc of docs || []) {
      try {
        await strapi.documents(uid).delete({ documentId: doc.documentId });
      } catch {
        // ignore
      }
    }
  }
}

async function ensureCategory(strapi, cat, imageId) {
  const slug = cat.slug || slugify(cat.name);
  const existing = await strapi.documents('api::category.category').findMany({
    filters: { slug: { $eq: slug } },
    locale: 'vi',
  });
  if (existing?.[0]) return existing[0];

  return strapi.documents('api::category.category').create({
    locale: 'vi',
    status: 'published',
    data: {
      name: cat.name,
      slug,
      description: stripHtml(cat.description || '').slice(0, 400) || undefined,
      image: imageId || undefined,
      seo: {
        metaTitle: cat.name,
        metaDescription: stripHtml(cat.description || cat.name).slice(0, 155),
      },
    },
  });
}

async function importCategories(strapi) {
  const { data } = await fetchJson(`${WP}/wp-json/wp/v2/product_cat?per_page=100&hide_empty=false`);
  const map = new Map();
  for (const cat of data) {
    if (!cat?.slug || cat.slug === 'uncategorized') continue;
    let imageId = null;
    // category image via media if available
    const thumbId = cat.acf?.image || cat.yoast_head_json?.og_image?.[0]?.url;
    // product_cat may have media via better REST - try meta
    const imgUrl =
      cat.yoast_head_json?.og_image?.[0]?.url ||
      null;
    if (imgUrl) imageId = await uploadFromUrl(strapi, imgUrl, cat.name, `cat-${cat.slug}`);
    const created = await ensureCategory(strapi, cat, imageId);
    map.set(cat.id, created);
    map.set(cat.slug, created);
    strapi.log.info(`[import] category ${cat.slug}`);
  }
  return map;
}

async function fetchAllProducts(limit) {
  const pageSize = 20;
  const items = [];
  let page = 1;
  while (items.length < limit) {
    const { data, total } = await fetchJson(
      `${WP}/wp-json/wc/store/v1/products?per_page=${pageSize}&page=${page}&orderby=date&order=desc`
    );
    if (!data?.length) break;
    items.push(...data);
    if (items.length >= total || data.length < pageSize) break;
    page += 1;
    await sleep(120);
  }
  return items.slice(0, limit);
}

async function importProducts(strapi, categoryMap) {
  const products = await fetchAllProducts(PRODUCT_LIMIT);
  let i = 0;
  for (const p of products) {
    i += 1;
    const slug = p.slug || slugify(p.name);
    const existing = await strapi.documents('api::product.product').findMany({
      filters: { slug: { $eq: slug } },
      locale: 'vi',
    });
    if (existing?.[0]) {
      strapi.log.info(`[import] product exists ${slug}`);
      continue;
    }

    const price = Number(p.prices?.price || 0);
    const regular = Number(p.prices?.regular_price || price);
    const imageIds = [];
    const imgs = (p.images || []).slice(0, 2);
    for (const img of imgs) {
      const id = await uploadFromUrl(strapi, img.src, img.alt || p.name, `p-${p.id}-${img.id}`);
      if (id) imageIds.push(id);
    }

    const catLinks = [];
    for (const c of p.categories || []) {
      const found = categoryMap.get(c.id) || categoryMap.get(c.slug);
      if (found?.documentId) catLinks.push(found.documentId);
    }

    const short = stripHtml(p.short_description || '').slice(0, 280);
    const desc = htmlToRichtext(p.description || p.short_description || `<p>${p.name}</p>`);

    await strapi.documents('api::product.product').create({
      locale: 'vi',
      status: 'published',
      data: {
        name: stripHtml(p.name),
        slug,
        shortDescription: short || undefined,
        description: desc,
        price,
        compareAtPrice: regular > price ? regular : undefined,
        sku: p.sku || `WP-${p.id}`,
        stock: p.is_in_stock ? 10 : 0,
        trackInventory: true,
        isHot: i <= 9,
        isFeatured: i <= 12,
        images: imageIds,
        categories: catLinks,
        seo: {
          metaTitle: stripHtml(p.name).slice(0, 60),
          metaDescription: (short || stripHtml(p.name)).slice(0, 155),
        },
      },
    });
    strapi.log.info(`[import] product ${i}/${products.length} ${slug}`);
    await sleep(50);
  }
}

async function importPosts(strapi) {
  const pageSize = 10;
  let page = 1;
  let imported = 0;
  while (imported < POST_LIMIT) {
    const { data } = await fetchJson(
      `${WP}/wp-json/wp/v2/posts?per_page=${pageSize}&page=${page}&_embed=1`
    );
    if (!data?.length) break;
    for (const post of data) {
      if (imported >= POST_LIMIT) break;
      const slug = post.slug;
      const existing = await strapi.documents('api::article.article').findMany({
        filters: { slug: { $eq: slug } },
        locale: 'vi',
      });
      if (existing?.[0]) {
        imported += 1;
        continue;
      }

      const title = stripHtml(post.title?.rendered || slug);
      const excerpt = stripHtml(post.excerpt?.rendered || '').slice(0, 300);
      const content = htmlToRichtext(post.content?.rendered || `<p>${excerpt || title}</p>`);
      const media = post._embedded?.['wp:featuredmedia']?.[0];
      const coverId = media?.source_url
        ? await uploadFromUrl(strapi, media.source_url, title, `post-${post.id}`)
        : null;

      await strapi.documents('api::article.article').create({
        locale: 'vi',
        status: 'published',
        data: {
          title,
          slug,
          excerpt: excerpt || undefined,
          content: content || `<p>${title}</p>`,
          cover: coverId || undefined,
          authorName: 'Gốm Sứ Luxury',
          displayDate: post.date ? new Date(post.date).toISOString() : undefined,
          isFeatured: imported < 3,
          tags: (post.tags || []).length ? ['bat-trang', 'gom-su'] : ['gom-su'],
          seo: {
            metaTitle: title.slice(0, 60),
            metaDescription: (excerpt || title).slice(0, 155),
          },
        },
      });
      imported += 1;
      strapi.log.info(`[import] article ${imported} ${slug}`);
      await sleep(80);
    }
    page += 1;
  }
}

async function importMenus(strapi) {
  const existing = await strapi.documents('api::menu.menu').findMany({
    filters: { slug: { $eq: 'header' } },
    locale: 'vi',
  });
  if (existing?.[0] && !FORCE) return;

  if (existing?.[0]) {
    await strapi.documents('api::menu.menu').delete({ documentId: existing[0].documentId });
  }

  await strapi.documents('api::menu.menu').create({
    locale: 'vi',
    data: {
      title: 'Menu chính',
      slug: 'header',
      location: 'header',
      items: [
        { label: 'Trang Chủ', url: '/vi', order: 1 },
        { label: 'Sản Phẩm', url: '/vi/san-pham', order: 2 },
        { label: 'Sự Kiện', url: '/vi/su-kien', order: 3 },
        { label: 'Bài Viết', url: '/vi/bai-viet', order: 4 },
        { label: 'Giới Thiệu', url: '/vi/gioi-thieu', order: 5 },
      ],
    },
  });

  // EN / JA locales for menu
  const header = await strapi.documents('api::menu.menu').findFirst({
    filters: { slug: { $eq: 'header' } },
    locale: 'vi',
  });
  if (header?.documentId) {
    try {
      await strapi.documents('api::menu.menu').update({
        documentId: header.documentId,
        locale: 'en',
        data: {
          title: 'Main menu',
          slug: 'header',
          location: 'header',
          items: [
            { label: 'Home', url: '/en', order: 1 },
            { label: 'Products', url: '/en/san-pham', order: 2 },
            { label: 'Events', url: '/en/su-kien', order: 3 },
            { label: 'Journal', url: '/en/bai-viet', order: 4 },
            { label: 'About', url: '/en/gioi-thieu', order: 5 },
          ],
        },
      });
      await strapi.documents('api::menu.menu').update({
        documentId: header.documentId,
        locale: 'ja',
        data: {
          title: 'メインメニュー',
          slug: 'header',
          location: 'header',
          items: [
            { label: 'ホーム', url: '/ja', order: 1 },
            { label: '作品', url: '/ja/san-pham', order: 2 },
            { label: 'イベント', url: '/ja/su-kien', order: 3 },
            { label: '読みもの', url: '/ja/bai-viet', order: 4 },
            { label: '私たちについて', url: '/ja/gioi-thieu', order: 5 },
          ],
        },
      });
    } catch (err) {
      strapi.log.warn(`[import] menu locale sync skipped: ${err.message}`);
    }
  }
}

async function importSiteSettings(strapi) {
  const brandDir = path.join(__dirname, '../../web/public/brand');
  const logoPath = path.join(brandDir, 'logo-mark.png');
  const heroPath = path.join(brandDir, 'hero.jpg');
  const craftPath = path.join(brandDir, 'craft.jpg');

  const logoId = fs.existsSync(logoPath) ? await uploadFile(strapi, logoPath, 'Gốm Sứ Luxury') : null;
  const heroId = fs.existsSync(heroPath) ? await uploadFile(strapi, heroPath, 'Hero') : null;
  const craftId = fs.existsSync(craftPath) ? await uploadFile(strapi, craftPath, 'Craft') : null;

  const data = {
    siteName: 'Gốm Sứ Luxury',
    tagline: 'Tự hào gốm Việt — vẻ đẹp thuần Việt, đẳng cấp toàn cầu',
    phone: '083 7571 758',
    email: 'hello@gomsuluxury.vn',
    address: 'Khu đô thị Viglacera Xuân Phương, Nam Từ Liêm, Hà Nội',
    zaloUrl: 'https://zalo.me/0837571758',
    facebookUrl: 'https://www.facebook.com/gomsuluxury',
    instagramUrl: 'https://www.tiktok.com/@gomluxury',
    logo: logoId || undefined,
    heroImage: heroId || undefined,
    craftImage: craftId || undefined,
    defaultSeo: {
      metaTitle: 'Gốm Sứ Luxury | Tự Hào Gốm Việt',
      metaDescription:
        'Gốm sứ Bát Tràng cao cấp: ấm chén, khay trà, hũ trà và tượng linh vật từ Gốm Sứ Luxury.',
    },
  };

  const existing = await strapi.documents('api::site-setting.site-setting').findFirst({
    locale: 'vi',
  });
  if (existing?.documentId) {
    await strapi.documents('api::site-setting.site-setting').update({
      documentId: existing.documentId,
      locale: 'vi',
      data,
    });
  } else {
    await strapi.documents('api::site-setting.site-setting').create({
      locale: 'vi',
      data,
    });
  }

  const doc = await strapi.documents('api::site-setting.site-setting').findFirst({ locale: 'vi' });
  if (doc?.documentId) {
    await strapi.documents('api::site-setting.site-setting').update({
      documentId: doc.documentId,
      locale: 'en',
      data: {
        siteName: 'Gom Su Luxury',
        tagline: 'Proudly Vietnamese ceramics — heritage forms, contemporary calm',
        address: 'Viglacera Xuan Phuong Urban Area, Nam Tu Liem, Hanoi',
        defaultSeo: {
          metaTitle: 'Gom Su Luxury | Proudly Vietnamese Ceramics',
          metaDescription: 'Premium Bat Trang ceramics from Gom Su Luxury.',
        },
      },
    });
    await strapi.documents('api::site-setting.site-setting').update({
      documentId: doc.documentId,
      locale: 'ja',
      data: {
        siteName: 'ゴム・スー・ラグジュアリー',
        tagline: 'ベトナムの誇りある陶磁器',
        address: 'ハノイ・ナムトゥリエム、ヴィグラセラ・スアンフオン都市区',
        defaultSeo: {
          metaTitle: 'ゴム・スー・ラグジュアリー',
          metaDescription: 'バットチャンの高級陶磁器。',
        },
      },
    });
  }
}

async function importAboutPage(strapi) {
  const { data } = await fetchJson(`${WP}/wp-json/wp/v2/pages?slug=gioi-thieu`);
  const page = data?.[0];
  const title = page ? stripHtml(page.title?.rendered) : 'Giới thiệu';
  const content = page
    ? htmlToRichtext(page.content?.rendered)
    : '<p>Gốm Sứ Luxury — tự hào gốm Việt.</p>';
  const excerpt = stripHtml(page?.excerpt?.rendered || '').slice(0, 220);

  const brandAbout = path.join(__dirname, '../../web/public/brand/about.jpg');
  const heroId = fs.existsSync(brandAbout)
    ? await uploadFile(strapi, brandAbout, 'Giới thiệu')
    : null;

  const existing = await strapi.documents('api::page.page').findMany({
    filters: { slug: { $eq: 'gioi-thieu' } },
    locale: 'vi',
  });
  if (existing?.[0]) {
    await strapi.documents('api::page.page').update({
      documentId: existing[0].documentId,
      locale: 'vi',
      status: 'published',
      data: {
        title,
        excerpt: excerpt || undefined,
        content,
        template: 'about',
        heroImage: heroId || undefined,
      },
    });
    return;
  }

  await strapi.documents('api::page.page').create({
    locale: 'vi',
    status: 'published',
    data: {
      title,
      slug: 'gioi-thieu',
      excerpt: excerpt || undefined,
      content,
      template: 'about',
      heroImage: heroId || undefined,
      seo: {
        metaTitle: `${title} | Gốm Sứ Luxury`,
        metaDescription: (excerpt || title).slice(0, 155),
      },
    },
  });
}

async function importEvent(strapi) {
  const existing = await strapi.documents('api::event.event').findMany({ locale: 'vi' });
  if (existing?.length && !FORCE) return;

  const coverPath = path.join(__dirname, '../../web/public/brand/workshop.jpg');
  const coverId = fs.existsSync(coverPath) ? await uploadFile(strapi, coverPath, 'Sự kiện') : null;

  await strapi.documents('api::event.event').create({
    locale: 'vi',
    status: 'published',
    data: {
      title: 'Trải nghiệm bàn trà Bát Tràng',
      slug: 'trai-nghiem-ban-tra-bat-trang',
      excerpt: 'Thưởng trà và tìm hiểu cách bày ấm chén tại showroom Xuân Phương.',
      content: '<p>Buổi trải nghiệm tại showroom Gốm Sứ Luxury: chọn ấm, pha trà và bố cục bàn trà.</p>',
      startDate: '2026-09-12T09:00:00.000Z',
      endDate: '2026-09-12T12:00:00.000Z',
      location: 'Showroom Gốm Sứ Luxury, Xuân Phương, Hà Nội',
      registrationUrl: 'https://zalo.me/0837571758',
      isFeatured: true,
      cover: coverId || undefined,
      seo: {
        metaTitle: 'Trải nghiệm bàn trà Bát Tràng',
        metaDescription: 'Đăng ký trải nghiệm bàn trà tại Gốm Sứ Luxury.',
      },
    },
  });
}

async function main() {
  fs.mkdirSync(TMP, { recursive: true });
  // Try install sharp lightly if missing
  try {
    require.resolve('sharp');
  } catch {
    console.log('[import] installing sharp for image optimize...');
    require('child_process').execSync('npm install sharp --no-save', {
      cwd: path.join(__dirname, '..'),
      stdio: 'inherit',
    });
  }

  const strapi = await createStrapi({ appDir: path.join(__dirname, '..'), distDir: './dist' }).load();

  try {
    const productCount = await strapi.documents('api::product.product').count({ locale: 'vi' });
    if (FORCE || productCount === 0) {
      if (FORCE) {
        strapi.log.info('[import] FORCE_REIMPORT: clearing content...');
        await clearSeeded(strapi);
      }
      strapi.log.info('[import] categories...');
      const categoryMap = await importCategories(strapi);
      strapi.log.info('[import] products...');
      await importProducts(strapi, categoryMap);
      strapi.log.info('[import] posts...');
      await importPosts(strapi);
      strapi.log.info('[import] menus / settings / about / event...');
      await importMenus(strapi);
      await importSiteSettings(strapi);
      await importAboutPage(strapi);
      await importEvent(strapi);
    } else {
      strapi.log.info(`[import] skip products (already have ${productCount}). Set FORCE_REIMPORT=1 to redo.`);
      // still ensure menus/settings/pages/posts if missing
      await importMenus(strapi);
      await importSiteSettings(strapi);
      await importAboutPage(strapi);
      await importEvent(strapi);
      await importPosts(strapi);
    }
    strapi.log.info('[import] done');
  } finally {
    await strapi.destroy();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
