import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

const site = process.env.PUBLIC_SITE_URL || 'https://gomsuluxury.vercel.app';

export default defineConfig({
  site,
  output: 'static',
  adapter: vercel(),
  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: 'vi',
        locales: {
          vi: 'vi-VN',
          en: 'en-US',
          ja: 'ja-JP',
        },
      },
    }),
  ],
  image: {
    domains: ['localhost', '127.0.0.1', 'images.unsplash.com'],
    remotePatterns: [{ protocol: 'https' }, { protocol: 'http' }],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
