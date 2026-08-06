#!/usr/bin/env node
/**
 * One-shot homepage parity check vs https://gomsuluxury.vn/
 * Exits 0 on pass, 1 on fail. No loops / no watch.
 *
 * Usage:
 *   node scripts/parity-home.mjs
 *   LOCAL=http://127.0.0.1:4321/vi LIVE=https://gomsuluxury.vn/ node scripts/parity-home.mjs
 */
const LIVE = process.env.LIVE || 'https://gomsuluxury.vn/';
const LOCAL = process.env.LOCAL || 'http://127.0.0.1:4321/vi';
const UA = 'GomSuLuxury-Parity/1.0';

const YT_IDS = ['mQLhC0XaOW8', 'aymsvfB8HvI', 'lxuQanY7LwQ'];

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': UA, Accept: 'text/html' },
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  return res.text();
}

function indexOf(html, needle, from = 0) {
  return html.indexOf(needle, from);
}

/** Prefer section titlebar H2 when present (Astro), else first occurrence after a floor. */
function sectionPos(html, title, floor = 0) {
  const titled = `section-titlebar__title">${title}`;
  let i = indexOf(html, titled, floor);
  if (i >= 0) return i;
  // Live WP / Flatsome often uses the bare title in a section heading.
  i = indexOf(html, title, floor);
  return i;
}

function checkOrder(label, html, markers) {
  const fails = [];
  let prev = -1;
  let floor = 0;
  for (const m of markers) {
    const pos = typeof m === 'string' ? sectionPos(html, m, floor) : m.find(html, floor);
    if (pos < 0) {
      fails.push(`missing: ${m.label || m}`);
      continue;
    }
    if (prev >= 0 && pos < prev) {
      fails.push(`order: "${m.label || m}" at ${pos} before previous ${prev}`);
    }
    prev = pos;
    floor = pos + 1;
  }
  return fails;
}

function youtubeIds(html) {
  return [...new Set([...html.matchAll(/youtube\.com\/embed\/([A-Za-z0-9_-]+)/g)].map((m) => m[1]))].sort();
}

function mustContain(label, html, needles) {
  return needles.filter((n) => !html.includes(n)).map((n) => `${label} missing: ${n}`);
}

async function main() {
  const fails = [];
  console.log(`[parity] LIVE  ${LIVE}`);
  console.log(`[parity] LOCAL ${LOCAL}`);

  const [liveHtml, localHtml] = await Promise.all([fetchText(LIVE), fetchText(LOCAL)]);

  const sectionMarkers = [
    'Ấm chén Bát Tràng',
    'Phụ Kiện Bàn Trà',
    {
      label: 'youtube mQLhC0XaOW8',
      find: (html, from) => indexOf(html, 'youtube.com/embed/mQLhC0XaOW8', from),
    },
    {
      label: 'youtube aymsvfB8HvI',
      find: (html, from) => indexOf(html, 'youtube.com/embed/aymsvfB8HvI', from),
    },
    {
      label: 'youtube lxuQanY7LwQ',
      find: (html, from) => indexOf(html, 'youtube.com/embed/lxuQanY7LwQ', from),
    },
    'Khay Trà',
    'Tượng Gốm linh vật',
    'HŨ TRÀ',
  ];

  for (const [label, html] of [
    ['LIVE', liveHtml],
    ['LOCAL', localHtml],
  ]) {
    const orderFails = checkOrder(label, html, sectionMarkers).map((f) => `[${label}] ${f}`);
    fails.push(...orderFails);
  }

  const liveYt = youtubeIds(liveHtml);
  const localYt = youtubeIds(localHtml);
  const expected = [...YT_IDS].sort();
  if (JSON.stringify(liveYt) !== JSON.stringify(expected)) {
    fails.push(`LIVE youtube ids ${JSON.stringify(liveYt)} != ${JSON.stringify(expected)}`);
  }
  if (JSON.stringify(localYt) !== JSON.stringify(expected)) {
    fails.push(`LOCAL youtube ids ${JSON.stringify(localYt)} != ${JSON.stringify(expected)}`);
  }

  fails.push(
    ...mustContain('LOCAL', localHtml, [
      'shine-beam',
      'footer-wave',
      'Danh Mục Sản Phẩm',
      '@gomluxury',
      'site-header',
      'site-footer',
      '0837',
    ])
  );

  // YouTube must sit after Phụ Kiện titlebar and before Khay Trà titlebar on LOCAL
  const pk = sectionPos(localHtml, 'Phụ Kiện Bàn Trà');
  const yt = indexOf(localHtml, 'youtube.com/embed/mQLhC0XaOW8');
  const khay = sectionPos(localHtml, 'Khay Trà', pk > 0 ? pk : 0);
  if (!(pk >= 0 && yt > pk && khay > yt)) {
    fails.push(`LOCAL YouTube placement: pk=${pk} yt=${yt} khay=${khay} (want pk < yt < khay)`);
  }

  if (fails.length) {
    console.error('[parity] FAIL');
    for (const f of fails) console.error(' -', f);
    process.exit(1);
  }
  console.log('[parity] OK — section order, YouTube ids/placement, header/footer landmarks');
  process.exit(0);
}

main().catch((err) => {
  console.error('[parity] ERROR', err.message || err);
  process.exit(1);
});
