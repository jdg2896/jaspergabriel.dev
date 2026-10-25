import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { render, type CollectionEntry } from "astro:content";
import { fromHtml } from "hast-util-from-html";
import { toHtml } from "hast-util-to-html";
import { SKIP, visit } from "unist-util-visit";
import type { Element } from "hast";
import { getPosts } from "./posts";

// Shared by /rss.xml and /atom.xml, so both formats carry the same posts
export const FEED_TITLE = "Jasper Gabriel";
export const FEED_DESCRIPTION =
  "Thoughts on software engineering, side projects, and whatever else is on my mind.";

export interface FeedPost {
  post: CollectionEntry<"blog">;
  url: string;
  // The full post as standalone HTML for a feed reader
  content: string;
}

const hasClass = (node: Element, name: string) =>
  ([] as unknown[]).concat(node.properties.className ?? []).includes(name);

// Feed readers show a post outside the site: page controls (copy buttons,
// heading anchors) do nothing there, and relative links and image paths
// would resolve against the reader, not this site.
function forFeed(html: string, base: string): string {
  const tree = fromHtml(html, { fragment: true });
  const absolute = (value: unknown) => new URL(String(value), base).href;

  visit(tree, "element", (node, index, parent) => {
    if (hasClass(node, "code-block__bar") || hasClass(node, "heading-anchor")) {
      parent?.children.splice(index!, 1);
      return [SKIP, index];
    }
    const props = node.properties;
    delete props.tabIndex;
    // Shiki colors code through CSS variables only the site's stylesheet sets
    if (typeof props.style === "string" && props.style.includes("--shiki")) delete props.style;
    if (node.tagName === "a" && props.href) props.href = absolute(props.href);
    if (node.tagName === "img") {
      if (props.src) props.src = absolute(props.src);
      if (props.srcSet) {
        props.srcSet = String(props.srcSet)
          .split(",")
          .map((candidate) => {
            const [url, descriptor] = candidate.trim().split(/\s+/);
            return [absolute(url), descriptor].filter(Boolean).join(" ");
          })
          .join(", ");
      }
    }
  });

  return toHtml(tree);
}

// Newest first, each rendered exactly as its page renders it
export async function getFeedPosts(site: URL): Promise<FeedPost[]> {
  const container = await AstroContainer.create();
  const posts = await getPosts();
  posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return Promise.all(
    posts.map(async (post) => {
      const url = new URL(`/blog/${post.id}/`, site).href;
      const { Content } = await render(post);
      const html = await container.renderToString(Content);
      return { post, url, content: forFeed(html, url) };
    }),
  );
}
