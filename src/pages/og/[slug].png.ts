import type { APIRoute, GetStaticPaths } from 'astro';
import { getPosts } from '../../utils/posts';
import { readFileSync } from 'node:fs';
import satori from 'satori';
import sharp from 'sharp';

// One share card per post, plus one for the rest of the site, rendered at
// build time. Satori turns the text
// into SVG paths with the committed fonts, so the build needs no network
// or system fonts; sharp (already bundled with Astro) rasterises it.

// Resolved from the project root: import.meta.url points into the bundled
// prerender chunk at build time, not at this source file.
const font = (file: string) => readFileSync(`./src/assets/fonts/${file}`);
const fonts = [
  { name: 'Inter', data: font('inter-latin-400-normal.woff'), weight: 400 as const, style: 'normal' as const },
  { name: 'Inter', data: font('inter-latin-600-normal.woff'), weight: 600 as const, style: 'normal' as const },
];

// Dark theme tokens from global.css
const colors = {
  bg: '#131210',
  text: '#e8e4dc',
  muted: '#938c80',
  border: '#2a2824',
};

export const getStaticPaths = (async () => {
  const posts = await getPosts();
  const cards = posts.map((post) => {
    const { title, description, pubDate } = post.data;
    const date = pubDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    });
    return { params: { slug: post.id }, props: { eyebrow: date, title, description } };
  });
  // Shared by every page that isn't a post (BaseHead's default image)
  cards.push({
    params: { slug: 'site' },
    props: {
      eyebrow: 'Software Engineer',
      title: 'Jasper Gabriel',
      description:
        'Backend systems and cloud infrastructure, with an interest in cryptography, zero-knowledge proofs, and cybersecurity.',
    },
  });
  return cards;
}) satisfies GetStaticPaths;

const h = (type: string, style: Record<string, unknown>, children?: unknown) => ({
  type,
  props: { style, children },
});

export const GET: APIRoute = async ({ props }) => {
  const { eyebrow, title, description } = props;

  const card = h(
    'div',
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '72px 80px',
      backgroundColor: colors.bg,
      fontFamily: 'Inter',
    },
    [
      h('div', { display: 'flex', flexDirection: 'column', gap: '28px' }, [
        h('div', { fontSize: 26, color: colors.muted }, eyebrow),
        h(
          'div',
          { fontSize: title.length > 60 ? 56 : 66, fontWeight: 600, lineHeight: 1.15, color: colors.text },
          title,
        ),
        h(
          'div',
          { display: 'block', fontFamily: 'Inter', fontSize: 30, lineHeight: 1.5, color: colors.muted, lineClamp: 2 },
          description,
        ),
      ]),
      h(
        'div',
        {
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: '28px',
          borderTop: `1px solid ${colors.border}`,
          fontSize: 26,
        },
        [
          h('div', { fontWeight: 600, color: colors.text }, 'Jasper Gabriel'),
          h('div', { color: colors.muted }, 'jaspergabriel.dev'),
        ],
      ),
    ],
  );

  const svg = await satori(card as Parameters<typeof satori>[0], { width: 1200, height: 630, fonts });
  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
