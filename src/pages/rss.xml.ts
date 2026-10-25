import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { FEED_DESCRIPTION, FEED_TITLE, getFeedPosts } from "../utils/feed";

export async function GET(context: APIContext) {
  const posts = await getFeedPosts(context.site!);

  return rss({
    title: FEED_TITLE,
    description: FEED_DESCRIPTION,
    site: context.site!,
    xmlns: { atom: "http://www.w3.org/2005/Atom" },
    customData: [
      "<language>en</language>",
      `<atom:link href="${new URL("rss.xml", context.site)}" rel="self" type="application/rss+xml"/>`,
    ].join(""),
    items: posts.map(({ post, url, content }) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: url,
      categories: post.data.tags,
      content,
    })),
  });
}
