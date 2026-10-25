// Post images live next to each post (src/content/blog/<slug>/) and go
// through Astro's image pipeline, which converts them to WebP and sets
// width/height so the browser reserves space before they load (no layout
// shift, and heading anchors land where they should).
//
// This runs before Astro's own image step, so the props set here are passed
// on to it. Screenshots are often retina-sized, so each one gets a srcset
// capped at 2x the 680px reading column; widths above the original are
// dropped by Astro, so small images aren't upscaled.

const WIDTHS = [680, 1360];
// The reading column, or the viewport minus its 16px gutters on phones
const SIZES = '(min-width: 712px) 680px, calc(100vw - 32px)';

function collectImages(node, out = []) {
  if (node.type === 'element' && node.tagName === 'img') out.push(node);
  node.children?.forEach((child) => collectImages(child, out));
  return out;
}

export default function rehypePostImages() {
  return (tree) => {
    for (const node of collectImages(tree)) {
      const props = node.properties;
      const src = String(props.src ?? '');
      props.loading = 'lazy';
      props.decoding = 'async';

      // Remote images and SVG diagrams are left as-is
      if (/^https?:\/\//.test(src) || /\.svg$/i.test(src)) continue;

      props.widths = WIDTHS;
      props.sizes = SIZES;
    }
  };
}
