/**
 * Repair product↔category links that point at draft category rows.
 * Strapi public API only returns relations to published categories.
 *
 * Usage (Strapi may be running; SQLite file lock usually allows reads/writes briefly):
 *   node scripts/fix-category-links.cjs
 */
const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '../.tmp/data.db');
if (!fs.existsSync(dbPath)) {
  console.error('[fix] missing', dbPath);
  process.exit(1);
}

const db = new Database(dbPath);
const cats = db
  .prepare('SELECT id, document_id, slug, published_at FROM categories')
  .all();

const byDoc = new Map();
for (const c of cats) {
  const row = byDoc.get(c.document_id) || {};
  if (c.published_at == null) row.draft = c.id;
  else row.pub = c.id;
  row.slug = c.slug;
  byDoc.set(c.document_id, row);
}

const links = db.prepare('SELECT id, product_id, category_id FROM products_categories_lnk').all();
const update = db.prepare(
  'UPDATE products_categories_lnk SET category_id = ? WHERE id = ?'
);
const del = db.prepare('DELETE FROM products_categories_lnk WHERE id = ?');
const exists = db.prepare(
  'SELECT 1 AS ok FROM products_categories_lnk WHERE product_id = ? AND category_id = ?'
);

let fixed = 0;
const tx = db.transaction(() => {
  for (const link of links) {
    const cat = cats.find((c) => c.id === link.category_id);
    if (!cat || cat.published_at != null) continue;
    const pubId = byDoc.get(cat.document_id)?.pub;
    if (!pubId || pubId === link.category_id) continue;
    if (exists.get(link.product_id, pubId)) {
      del.run(link.id);
    } else {
      update.run(pubId, link.id);
    }
    fixed += 1;
  }
});
tx();

const published = db
  .prepare(
    `SELECT COUNT(*) AS n FROM products p
     WHERE p.published_at IS NOT NULL
     AND NOT EXISTS (
       SELECT 1 FROM products_categories_lnk l
       JOIN categories c ON c.id = l.category_id
       WHERE l.product_id = p.id AND c.published_at IS NOT NULL
     )`
  )
  .get();

console.log(`[fix] remapped ${fixed} draft category links -> published`);
console.log(`[fix] published products still without published category: ${published.n}`);
db.close();
process.exit(published.n > 0 ? 1 : 0);
