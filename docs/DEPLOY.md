# Deploy guide — Gốm Sứ Luxury

## Khuyến nghị kiến trúc

| Thành phần | Nơi chạy | Lý do |
|------------|----------|-------|
| Astro frontend | **Vercel** | CDN, SSG, preview PR, deploy hook |
| Strapi CMS | **VPS Docker** | Persist DB, uploads, admin ổn định |
| Postgres | VPS (compose) | Production DB |
| Media | S3 / R2 / Cloudinary (khuyến nghị) | Tránh đầy disk VPS |

Đúng hướng: **Strapi + Postgres trên VPS**, **Astro trên Vercel**.

## VPS — Strapi

1. Cài Docker + Docker Compose
2. Clone repo, cấu hình `apps/cms/.env` (secrets mạnh, `DATABASE_CLIENT=postgres`)
3. `CORS_ORIGIN` gồm domain Vercel
4. `docker compose up -d --build db cms`
5. Mở firewall chỉ `80/443` (qua reverse proxy), **không** public 1337 nếu có Nginx/Caddy
6. Reverse proxy ví dụ `cms.domain.com` → `127.0.0.1:1337` + Let's Encrypt

## Vercel — Astro

1. Root Directory: `apps/web`
2. Env: `PUBLIC_STRAPI_URL`, `PUBLIC_SITE_URL`
3. Tạo Deploy Hook trong Vercel
4. Strapi Webhook `entry.publish` / `entry.unpublish` → gọi Deploy Hook

## Checklist sau go-live

- [ ] Locales `vi` (default) + `en`
- [ ] Public permissions find/findOne
- [ ] Site Setting + Header Menu
- [ ] Ít nhất 1 sản phẩm hot + 1 sự kiện
- [ ] OG image mặc định
- [ ] Backup Postgres cron
- [ ] Monitoring uptime CMS
