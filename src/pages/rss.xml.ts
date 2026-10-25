import rss from "@astrojs/rss";
import { getPosts } from "../utils/posts";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = await getPosts();
  posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: "Jasper Gabriel",
    description:
      "Thoughts on software engineering, side projects, and whatever else is on my mind.",
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
    })),
  });
}
