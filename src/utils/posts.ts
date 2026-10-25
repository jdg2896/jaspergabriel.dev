import { getCollection } from "astro:content";

// Drafts are left out of the build but kept in `astro dev`, so a post can be
// previewed in place before it's published
export function getPosts() {
  return getCollection("blog", ({ data }) => import.meta.env.DEV || !data.draft);
}
