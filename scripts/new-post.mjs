// Scaffolds a draft post: npm run new "Post title"
import { existsSync, writeFileSync } from 'node:fs';

const title = process.argv.slice(2).join(' ').trim();
if (!title) {
  console.error('Usage: npm run new "Post title"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .normalize('NFKD')
  .replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

const path = `src/content/blog/${slug}.md`;
if (existsSync(path)) {
  console.error(`${path} already exists`);
  process.exit(1);
}

// Local date, so a post started late in the evening isn't dated tomorrow
const now = new Date();
const date = [now.getFullYear(), now.getMonth() + 1, now.getDate()]
  .map((n) => String(n).padStart(2, '0'))
  .join('-');

writeFileSync(
  path,
  `---
title: ${JSON.stringify(title)}
description: ""
pubDate: ${date}
tags: []
draft: true
---

`,
);

console.log(`Created ${path}`);
console.log(`Images go in src/content/blog/${slug}/ and are linked as ![alt](./${slug}/image.png)`);
console.log(`Preview with npm run dev, then npm run publish ${slug}`);
