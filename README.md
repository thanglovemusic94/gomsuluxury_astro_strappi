# gomsuluxury — Astro + Strapi

Website gốm sứ luxury: frontend **Astro** (SEO + tốc độ) + CMS **Strapi 5** (nội dung đa ngôn ngữ, sản phẩm, sự kiện, menu, trang).

## Kiến trúc đề xuất

```
Vercel (Astro SSG)  <── webhook rebuild ──  VPS Docker
        │                                      │
        └──── fetch API / media ────────►  Strapi + Postgres
                                           (+ volume uploads hoặc S3)
```

- **Astro trên Vercel**: static generation → nhanh, SEO mạnh, CDN toàn cầu.
- **Strapi trên VPS (Docker)**: admin nhập liệu, i18n `vi`/`en`, media, webhook khi publish.
- Không bắt buộc chạy Astro trên VPS; `docker compose --profile full` chỉ để preview local/VPS nếu cần.

## Yêu cầu đã phủ

| # | Yêu cầu | Cách làm |
|---|---------|----------|
| 1 | Đẹp | UI celadon/porcelain, hero full-bleed, motion reveal |
| 2 | SEO mạnh + đo chỉ số khi nhập | Component `shared.seo` + `seoScore`/`seoNotes` tự tính khi Save |
| 3 | Nhanh | Astro SSG + sitemap + tối ưu ảnh/static |
| 4 | Đa ngôn ngữ khi nhập | Strapi i18n (`vi` mặc định, `en`) trên Product/Event/Page/Menu… |
| 5 | Quản lý menu, trang | Content-types `menu`, `page` |
| 6 | SP, thuộc tính, KM, tồn kho, hot | `product`, `attribute`, `promotion`, `stock`, `isHot` |
| 7 | Event + trang riêng | `event` + `/[lang]/su-kien/[slug]` |

## Cấu trúc repo

```
apps/
  cms/     Strapi 5
  web/     Astro 7 + Tailwind 4 + React (SEO widget sẵn sàng mở rộng)
docker-compose.yml
```

## Chạy local

### 1) Strapi CMS

```bash
cd apps/cms
cp .env.example .env   # nếu chưa có .env
npm install
npm run develop
```

Mở `http://localhost:1337/admin` → tạo admin → Settings → Internationalization (vi/en).

Content-Types đã có sẵn: Product, Category, Attribute, Promotion, Event, Page, Menu, Site Setting.

Public `find`/`findOne` được bootstrap tự mở.

### 2) Astro Web

```bash
cd apps/web
cp .env.example .env
npm install
npm run dev
```

Mở `http://localhost:4321/vi` — nếu Strapi chưa có data, site dùng **demo data** để xem UI.

## Docker (VPS — Strapi)

```bash
# Ở root repo
cp apps/cms/.env.example apps/cms/.env
# Sửa APP_KEYS, secrets, DATABASE_PASSWORD, CORS_ORIGIN (domain Vercel)

docker compose up -d --build db cms
```

- CMS: `http://VPS_IP:1337`
- DB Postgres volume: `strapi-db`
- Uploads volume: `strapi-uploads`

Preview Astro bằng Nginx trên VPS (tuỳ chọn):

```bash
docker compose --profile full up -d --build
```

## Deploy Astro lên Vercel

1. Import repo, **Root Directory** = `apps/web`
2. Env:
   - `PUBLIC_STRAPI_URL=https://cms.domain-cua-ban.com`
   - `PUBLIC_SITE_URL=https://domain-frontend.vercel.app`
   - (tuỳ chọn) `STRAPI_API_TOKEN` nếu API không public
3. Trong Strapi → Webhooks: khi `entry.publish` gọi **Vercel Deploy Hook** để rebuild SSG.

## SEO khi nhập liệu (CMS)

Component **SEO** trên Product / Event / Page / Category / Promotion:

- `metaTitle`, `metaDescription`, `focusKeyword`, `keywords`, `ogImage`, `canonicalUrl`, `noIndex`
- Khi **Save**, lifecycle tính `seoScore` (0–100) và `seoNotes` (gợi ý độ dài title/description, từ khóa, OG, slug…)

## Gợi ý thêm (nên làm tiếp)

1. **Media S3/R2/Cloudinary** — đừng chỉ lưu disk VPS; CDN ảnh ổn định hơn.
2. **Webhook Strapi → Vercel Deploy Hook** — nội dung publish là site cập nhật.
3. **JSON-LD** đã có Product/Event; bổ sung `Organization`, `BreadcrumbList`.
4. **Search** — Pagefind (static) hoặc Meilisearch nếu catalogue lớn.
5. **Zalo OA / form tư vấn** — CTA chuyển đổi cho ngành gốm (không cần cart ngay).
6. **Backup Postgres** hàng ngày (cron + volume snapshot).
7. **Cloudflare** trước VPS Strapi (TLS, WAF, rate-limit admin).
8. **Redirect www/non-www**, hreflang (đã có cơ bản), Core Web Vitals monitor.
9. **Role CMS**: Editor / Marketer / Inventory riêng quyền.
10. **Giỏ hàng / đơn hàng** (phase 2): Stripe/PayOS hoặc chỉ “Đặt qua Zalo”.

## Scripts gốc

```bash
npm run dev:web
npm run dev:cms
npm run build:web
npm run docker:up
```
