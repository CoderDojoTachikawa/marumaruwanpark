// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // 本番公開時のドメインに合わせて変更してください（サイトマップ・OGP生成に使用）
  site: 'https://tachikawa-wanpark.pages.dev',

  // Cloudflare Pages 向けの完全静的出力設定
  output: 'static',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [sitemap()],
});
