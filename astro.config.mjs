import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePostImages from './src/plugins/rehype-post-images.mjs';

// Plain text of a hast node, minus anything already appended (the anchor)
const textOf = (node) =>
  node.type === 'text' ? node.value : (node.children ?? []).map(textOf).join('');

export default defineConfig({
  site: 'https://jaspergabriel.dev',
  integrations: [sitemap()],
  markdown: {
    // Dual themes emit --shiki-light/--shiki-dark vars; global.css picks one
    // per site theme so code blocks follow the toggle.
    shikiConfig: {
      themes: { light: 'github-light-default', dark: 'github-dark-default' },
      defaultColor: false,
      // Code blocks scroll sideways, so keyboard users need to focus them
      transformers: [
        {
          pre(node) {
            node.properties.tabindex = '0';
          },
        },
      ],
    },
    rehypePlugins: [
      // Astro normally injects heading IDs after user plugins run, so they
      // must be added explicitly here for autolink to see them.
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          // Named per heading so a screen reader's link list tells them apart
          properties: (heading) => ({
            className: ['heading-anchor'],
            ariaLabel: `Link to section: ${textOf(heading).trim()}`,
          }),
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
