import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePostImages from './src/plugins/rehype-post-images.mjs';
import { writeFile } from 'node:fs/promises';

// Cloudflare adds a page's trailing slash with a 307, which search engines
// read as temporary. A _redirects rule for each built page makes it a 301,
// so links missing the slash (some dev.to canonicals) pass on their credit.
const permanentSlashRedirects = {
  name: 'permanent-slash-redirects',
  hooks: {
    'astro:build:done': async ({ pages, dir }) => {
      const rules = pages
        .map(({ pathname }) => pathname)
        .filter((path) => path.endsWith('/') && path !== '404/')
        .map((path) => `/${path.slice(0, -1)} /${path} 301`);
      await writeFile(new URL('_redirects', dir), rules.join('\n') + '\n');
    },
  },
};

// Plain text of a hast node, minus anything already appended (the anchor)
const textOf = (node) =>
  node.type === 'text' ? node.value : (node.children ?? []).map(textOf).join('');

export default defineConfig({
  site: 'https://jaspergabriel.dev',
  integrations: [sitemap(), permanentSlashRedirects],
  // Downloaded from Google at build time and served from this site, so a
  // first visit doesn't wait on two more origins before it can paint
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: [400, 500, 600],
      // No italic file: the browser slants the upright one for <em> and
      // blockquotes. A second file would split the bandwidth the preload
      // needs to beat first paint, or arrive too late for optional (below)
      // when italic text first needs it.
      styles: ['normal'],
      subsets: ['latin'],
      // global.css defines a hand-tuned Arial fallback ('Inter Fallback')
      fallbacks: ['Inter Fallback', 'system-ui', '-apple-system', 'sans-serif'],
      optimizedFallbacks: false,
      // With the preload in BaseHead, Chrome holds first paint briefly for
      // Inter instead of painting Arial and swapping it out; on a connection
      // too slow for that, the page keeps the fallback rather than changing
      // under the reader.
      display: 'optional',
    },
  ],
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
          // A bar above each block holds its copy button. It's rendered at
          // build time so enabling it doesn't shift the page; the script in
          // BlogPostLayout wires it up, and BaseHead hides it without JS.
          root(node) {
            // Token styles are only final here. GitHub Light's comment gray
            // is 4.25:1 on the warm paper code block; one step darker clears 4.5:1.
            const deepenComments = (n) => {
              if (typeof n.properties?.style === 'string') {
                n.properties.style = n.properties.style.replace(
                  '--shiki-light:#6E7781',
                  '--shiki-light:#636C76',
                );
              }
              n.children?.forEach(deepenComments);
            };
            deepenComments(node);

            node.children = [
              {
                type: 'element',
                tagName: 'div',
                properties: { className: ['code-block'] },
                children: [
                  {
                    type: 'element',
                    tagName: 'div',
                    properties: { className: ['code-block__bar'] },
                    children: [
                      {
                        type: 'element',
                        tagName: 'button',
                        properties: { type: 'button', className: ['code-copy'], ariaLabel: 'Copy code' },
                        children: [{ type: 'text', value: 'Copy' }],
                      },
                    ],
                  },
                  ...node.children,
                ],
              },
            ];
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
  // Matches how Cloudflare serves the built directories, so links never
  // bounce through a /about -> /about/ redirect
  trailingSlash: 'always',
  build: {
    // The whole stylesheet is a few KB, so a first visit paints without
    // waiting on a separate request for it
    inlineStylesheets: 'always',
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
