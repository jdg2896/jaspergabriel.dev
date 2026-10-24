import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// Post images are remote (Cloudinary), so Astro's image pipeline doesn't touch
// them. Defer their loading, and let Cloudinary negotiate format and quality.
// SVG diagrams are left as-is so they stay vector.
function rehypePostImages() {
  const visit = (node) => {
    if (node.type === 'element' && node.tagName === 'img') {
      const props = node.properties;
      props.loading = 'lazy';
      props.decoding = 'async';
      const src = String(props.src ?? '');
      if (src.includes('res.cloudinary.com/') && !/\.svg($|\?)/i.test(src)) {
        props.src = src.replace('/image/upload/', '/image/upload/f_auto,q_auto/');
      }
    }
    node.children?.forEach(visit);
  };
  return visit;
}

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
