// Points every dev.to cross-post's canonical URL at its post on this site,
// so search engines rank this site's copy over dev.to's.
//   DEV_API_KEY=... node scripts/devto-canonicals.mjs           (dry run)
//   DEV_API_KEY=... node scripts/devto-canonicals.mjs --apply   (update)
// Posts are matched to articles by their `originalUrl` front matter.
import { readdirSync, readFileSync } from 'node:fs';

const SITE = 'https://jaspergabriel.dev';
const API = 'https://dev.to/api';
const apply = process.argv.includes('--apply');

const key = process.env.DEV_API_KEY;
if (!key) {
  console.error('Set DEV_API_KEY (dev.to → Settings → Extensions → DEV Community API Keys)');
  process.exit(1);
}
const headers = { 'api-key': key, 'Content-Type': 'application/json', Accept: 'application/vnd.forem.api-v1+json' };

const dir = 'src/content/blog';
const expected = new Map();
for (const file of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
  const original = readFileSync(`${dir}/${file}`, 'utf8').match(/^originalUrl:\s*"?([^"\n]+)"?/m)?.[1];
  if (original) expected.set(original, `${SITE}/blog/${file.slice(0, -3)}/`);
}

const res = await fetch(`${API}/articles/me/all?per_page=1000`, { headers });
if (!res.ok) {
  console.error(`dev.to returned ${res.status}: ${await res.text()}`);
  process.exit(1);
}
const articles = await res.json();

let changes = 0;
let failed = 0;
for (const article of articles) {
  const canonical = expected.get(article.url);
  if (!canonical || article.canonical_url === canonical) continue;
  changes++;
  console.log(`${article.title}\n  ${article.canonical_url ?? '(none)'}\n  → ${canonical}`);
  if (!apply) continue;

  // Articles written with front matter keep canonical_url in the body, and
  // that copy wins over the field, so update it there when present.
  const body = article.body_markdown ?? '';
  const update = /^---[\s\S]*?^canonical_url:/m.test(body)
    ? { body_markdown: body.replace(/^canonical_url:.*$/m, `canonical_url: ${canonical}`) }
    : { canonical_url: canonical };
  const put = await fetch(`${API}/articles/${article.id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ article: update }),
  });
  if (put.ok) {
    console.log('  updated');
  } else {
    failed++;
    console.log(`  failed: ${put.status} ${await put.text()}`);
  }
  // dev.to rate-limits article updates
  await new Promise((r) => setTimeout(r, 1500));
}

const matched = articles.filter((a) => expected.has(a.url)).length;
const summary = apply ? `${changes - failed} changed, ${failed} failed` : `${changes} to change (re-run with --apply)`;
console.log(`\n${matched} of ${expected.size} posts found on dev.to; ${summary}`);
if (failed) process.exitCode = 1;
