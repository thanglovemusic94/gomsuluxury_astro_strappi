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
- Chạy lại không `FORCE_REIMPORT` sẽ bỏ qua sản phẩm đã có, vẫn bổ sung settings/menu nếu thiếu.
