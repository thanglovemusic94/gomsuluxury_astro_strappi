# Import dữ liệu từ gomsuluxury.vn (WordPress)

Script: `apps/cms/scripts/import-wp.cjs`

## Chạy

Strapi phải **tắt** (tránh khóa SQLite):

```bash
cd apps/cms
# dừng npm run develop trước
FORCE_REIMPORT=1 WP_PRODUCT_LIMIT=40 WP_POST_LIMIT=21 npm run import:wp
# rồi bật lại
npm run develop
```

## Import những gì

- Danh mục sản phẩm (product_cat)
- Sản phẩm WooCommerce + ảnh (mặc định 40)
- Bài viết / posts + ảnh cover (mặc định 21)
- Menu header (vi)
- Site Setting (logo, hero, craft, SĐT, địa chỉ Xuân Phương)
- Trang Giới thiệu
- 1 sự kiện demo showroom

## Ghi chú

- Chỉ tạo locale **vi** cho sản phẩm/bài viết (có thể Fill in from another locale trong Admin).
- Ảnh được tối ưu (sharp) trước khi upload vào Media Library.
- Chạy lại không `FORCE_REIMPORT` sẽ **đồng bộ lại category links** (không xóa sản phẩm), vẫn bổ sung settings/menu/posts nếu thiếu.
- Nếu API `/api/products?populate[categories]=true` trả về nhiều sản phẩm không có category: chạy `node scripts/fix-category-links.cjs` (sửa link nhầm bản draft).

## Parity check (một lần, không loop)

Từ root repo, web đang chạy ở `:4321`:

```bash
node scripts/parity-home.mjs
```

So landmarks trang chủ local với https://gomsuluxury.vn/ rồi thoát 0/1.
