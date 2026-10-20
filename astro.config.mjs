// @ts-check
import { defineConfig } from 'astro/config';

import preact from "@astrojs/preact";
import rehypeExternalLinks from 'rehype-external-links';
import tailwindcss from "@tailwindcss/vite";


// https://astro.build/config
export default defineConfig({
  site: 'https://franra18.github.io',
  base: '/blog/',
  integrations: [preact()],
  markdown: {
    // github-dark por defecto deja los comentarios en 3:1; esta variante pasa AA
    shikiConfig: { theme: 'github-dark-default' },
    rehypePlugins: [[rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }]],
  },
  vite: {
    plugins: [tailwindcss()],
  },

});
