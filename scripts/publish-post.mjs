// Publishes a draft post: npm run publish [slug]
// Dates it today, checks the site builds, then commits and pushes the post
// and its images (a push to main deploys). With no slug, the only draft is used.
import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';

const dir = 'src/content/blog';
const run = (cmd, args) => execFileSync(cmd, args, { stdio: 'inherit' });
const fail = (message) => {
  console.error(message);
  process.exit(1);
};

const isDraft = (source) => /^draft: true$/m.test(source.split(/^---$/m)[1] ?? '');

let slug = process.argv[2]?.replace(/^.*\//, '').replace(/\.md$/, '');
if (!slug) {
  const drafts = readdirSync(dir)
    .filter((name) => name.endsWith('.md'))
    .filter((name) => isDraft(readFileSync(`${dir}/${name}`, 'utf8')))
    .map((name) => name.replace(/\.md$/, ''));
  if (drafts.length !== 1) {
    fail(drafts.length ? `Which draft? npm run publish <slug>\n  ${drafts.join('\n  ')}` : 'No drafts to publish');
  }
  slug = drafts[0];
}

const path = `${dir}/${slug}.md`;
if (!existsSync(path)) fail(`${path} doesn't exist`);

const original = readFileSync(path, 'utf8');
if (!isDraft(original)) fail(`${path} is already published`);

const missingAlt = original.match(/!\[\s*\]\([^)]*\)/g);
if (missingAlt) fail(`Add alt text to:\n  ${missingAlt.join('\n  ')}`);

const branch = execFileSync('git', ['branch', '--show-current'], { encoding: 'utf8' }).trim();
if (branch !== 'main') fail(`On ${branch}; only a push to main deploys`);

// Local date, as in new-post.mjs
const now = new Date();
const date = [now.getFullYear(), now.getMonth() + 1, now.getDate()]
  .map((n) => String(n).padStart(2, '0'))
  .join('-');

// The draft's pubDate is when it was started, so it's moved to today
writeFileSync(
  path,
  original.replace(/^pubDate: .*$/m, `pubDate: ${date}`).replace(/^draft: true\n/m, ''),
);

// The schema requires a description and tags once a post isn't a draft, so a
// half-filled post fails here instead of going live. A post that fails to
// render is only logged as an error, so the log is checked too.
const build = spawnSync('npx', ['astro', 'build'], { encoding: 'utf8' });
const log = build.stdout + build.stderr;
process.stdout.write(log);
if (build.status !== 0 || /\[ERROR\]/.test(log)) {
  writeFileSync(path, original);
  fail(`\nBuild failed, so ${path} is still a draft`);
}

const title = original.match(/^title: (.*)$/m)[1].replace(/^(["'])(.*)\1$/, '$2');
const paths = [path, `${dir}/${slug}`].filter(existsSync);
run('git', ['add', ...paths]);
run('git', ['commit', '-m', `docs(blog): publish "${title}"`, '--', ...paths]);
run('git', ['push']);

console.log(`\nPublished https://jaspergabriel.dev/blog/${slug}/`);
