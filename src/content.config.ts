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
    // Historical record of the dev.to cross-post; not rendered anywhere.
    originalUrl: z.url().optional(),
    // Set only when another platform's copy is canonical (e.g. freeCodeCamp
    // terms); drives both the canonical tag and the attribution line.
    canonicalUrl: z.url().optional(),
  }),
});

export const collections = { blog };
