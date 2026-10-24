import { readFileSync, writeFileSync } from 'node:fs';
import { inferRemoteSize } from 'astro/assets/utils';

// Post images are remote, so Astro's image pipeline doesn't touch them.
// This plugin defers their loading, asks Cloudinary for a negotiated format
// and a size capped at 2x the reading column, and sets width/height so the
// browser reserves space before they load (no layout shift, and heading
// anchors land where they should).
//
// Dimensions are cached in src/data/image-sizes.json, keyed by the original
// URL. Only images missing from the cache are probed (a few header bytes
// each), so builds stay offline once a post's images have been seen.

const CACHE_URL = new URL('../data/image-sizes.json', import.meta.url);
const CLOUDINARY_UPLOAD = '/image/upload/';
// 2x the 680px reading column
const CLOUDINARY_TRANSFORM = 'f_auto,q_auto,c_limit,w_1360/';

let cache;
let dirty = false;

function loadCache() {
  if (cache) return cache;
  try {
    cache = JSON.parse(readFileSync(CACHE_URL, 'utf8'));
  } catch {
    cache = {};
  }
  return cache;
}

function saveCache() {
  if (!dirty) return;
  const sorted = Object.fromEntries(Object.entries(cache).sort(([a], [b]) => a.localeCompare(b)));
  writeFileSync(CACHE_URL, JSON.stringify(sorted, null, 2) + '\n');
  dirty = false;
}

// inferRemoteSize only handles raster formats, so read SVGs' own
// width/height (or viewBox) from the markup
async function svgSize(src) {
  const res = await fetch(src);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const tag = (await res.text()).match(/<svg\b[^>]*>/i)?.[0] ?? '';
  const attr = (name) => parseFloat(tag.match(new RegExp(`\\s${name}="([\\d.]+)(px)?"`))?.[1]);
  const viewBox = tag.match(/viewBox="[\d.-]+[\s,]+[\d.-]+[\s,]+([\d.]+)[\s,]+([\d.]+)"/);
  return {
    width: Math.round(attr('width') || parseFloat(viewBox?.[1])),
    height: Math.round(attr('height') || parseFloat(viewBox?.[2])),
  };
}

async function getSize(src) {
  const sizes = loadCache();
  if (sizes[src]) return sizes[src];
  try {
    const { width, height } = /\.svg($|\?)/i.test(src) ? await svgSize(src) : await inferRemoteSize(src);
    if (!width || !height) return null;
    sizes[src] = { width, height };
    dirty = true;
    return sizes[src];
  } catch (err) {
    // Offline or unreachable: ship the image without dimensions
    console.warn(`[rehype-post-images] couldn't size ${src}: ${err.message}`);
    return null;
  }
}

function collectImages(node, out = []) {
  if (node.type === 'element' && node.tagName === 'img') out.push(node);
  node.children?.forEach((child) => collectImages(child, out));
  return out;
}

export default function rehypePostImages() {
  return async (tree) => {
    const images = collectImages(tree);

    await Promise.all(
      images.map(async (node) => {
        const props = node.properties;
        const src = String(props.src ?? '');
        props.loading = 'lazy';
        props.decoding = 'async';

        if (!/^https?:\/\//.test(src)) return;

        const size = await getSize(src);
        if (size) {
          props.width = size.width;
          props.height = size.height;
        }

        // SVG diagrams are left as-is so they stay vector
        if (src.includes('res.cloudinary.com/') && !/\.svg($|\?)/i.test(src)) {
          props.src = src.replace(CLOUDINARY_UPLOAD, CLOUDINARY_UPLOAD + CLOUDINARY_TRANSFORM);
        }
      }),
    );

    saveCache();
  };
}
