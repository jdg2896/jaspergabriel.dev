import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://jaspergabriel.dev',
  build: {
    inlineStylesheets: 'auto',
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
