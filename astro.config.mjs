import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePostImages from './src/plugins/rehype-post-images.mjs';

export default defineConfig({
  site: 'https://jaspergabriel.dev',
  integrations: [sitemap()],
  markdown: {
    // Dual themes emit --shiki-light/--shiki-dark vars; global.css picks one
    // per site theme so code blocks follow the toggle.
    shikiConfig: {
      themes: { light: 'github-light-default', dark: 'github-dark-default' },
      defaultColor: false,
    },
    rehypePlugins: [
      // Astro normally injects heading IDs after user plugins run, so they
      // must be added explicitly here for autolink to see them.
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: {
            className: ['heading-anchor'],
            ariaHidden: 'true',
            tabIndex: -1,
          },
          content: { type: 'text', value: '#' },
        },
      ],
      rehypePostImages,
    ],
  },
  build: {
    inlineStylesheets: 'auto',
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
