import type { APIContext } from "astro";
import { FEED_DESCRIPTION, FEED_TITLE, getFeedPosts } from "../utils/feed";

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// The same posts as /rss.xml, for readers that prefer Atom
export async function GET(context: APIContext) {
  const site = context.site!;
  const posts = await getFeedPosts(site);
  const updatedOf = ({ post }: (typeof posts)[number]) => post.data.updatedDate ?? post.data.pubDate;
  const feedUpdated = posts.reduce((latest, p) => Math.max(latest, updatedOf(p).valueOf()), 0);

  const entries = posts.map((p) => {
    const { post, url, content } = p;
    return `  <entry>
    <title>${escape(post.data.title)}</title>
    <link href="${url}" rel="alternate" type="text/html"/>
    <id>${url}</id>
    <published>${post.data.pubDate.toISOString()}</published>
    <updated>${updatedOf(p).toISOString()}</updated>
    <summary>${escape(post.data.description)}</summary>
${post.data.tags.map((tag) => `    <category term="${escape(tag)}"/>`).join("\n")}
    <content type="html">${escape(content)}</content>
  </entry>`;
  });

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escape(FEED_TITLE)}</title>
  <subtitle>${escape(FEED_DESCRIPTION)}</subtitle>
  <link href="${site.href}" rel="alternate" type="text/html"/>
  <link href="${new URL("atom.xml", site)}" rel="self" type="application/atom+xml"/>
  <id>${site.href}</id>
  <updated>${new Date(feedUpdated).toISOString()}</updated>
  <author>
    <name>Jasper Gabriel</name>
    <uri>${new URL("about/", site)}</uri>
  </author>
${entries.join("\n")}
</feed>
`;

  return new Response(xml, { headers: { "Content-Type": "application/atom+xml; charset=utf-8" } });
}
