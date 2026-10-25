import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // Position in the home page's "Featured posts" (1 first); unset to leave out
    featured: z.number().int().positive().optional(),
    // Historical record of the dev.to cross-post; not rendered anywhere.
    originalUrl: z.url().optional(),
    // Set only when another platform's copy is canonical (e.g. freeCodeCamp
    // terms); drives both the canonical tag and the attribution line.
    canonicalUrl: z.url().optional(),
  })
    // A draft can start bare, but a published post needs a description (its
    // meta description and feed summary) and tags (for related posts)
    .refine((post) => post.draft || post.description.trim() !== "", {
      message: "Add a description before publishing",
      path: ["description"],
    })
    .refine((post) => post.draft || post.tags.length > 0, {
      message: "Add at least one tag before publishing",
      path: ["tags"],
    }),
});

export const collections = { blog };
