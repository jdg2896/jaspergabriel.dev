# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, weighted equally:

- **Fellow engineers** who arrive on a specific post from search or social, looking to learn or solve something concrete (AWS SAM CI/CD, smart-contract event listeners, reading QR codes in Node.js, open-source contribution).
- **People evaluating Jasper professionally** (hiring managers, founders, especially at early-stage startups) who use the site as a calling card to judge how he thinks, writes, and what he works on.

## Product Purpose

jaspergabriel.dev is Jasper Gabriel's personal site and blog. He's a software engineer specializing in backend systems and cloud infrastructure, with 4 years in fintech and crypto, and is now exploring cryptography, zero-knowledge proofs, and cybersecurity. The site is where he writes down what he learns about coding, career, side projects, and other interests.

Success over the next year means **rebuilding a regular writing habit** (the most recent post is from January 2024). The site should make publishing feel low-friction and worthwhile.

## Positioning

A working engineer's own notebook: first-hand write-ups of real things built, attended, and contributed to (a one-line contribution to Ethereum, AWS Startups Build Accelerator, Hashnode Bootcamp), written from a learner's point of view, not as polished thought leadership.

## Operating Context

- Posts are Markdown files in `src/content/blog/`, authored locally and deployed by building the static site.
- Readers find posts directly (search/social) more often than through the homepage, so each post page has to work on its own as a first impression.
- Readers can follow along via RSS (`/rss.xml`).

## Capabilities and Constraints

- **Stack:** Astro 6 static site, served from a Cloudflare Worker (`worker/index.ts`) with static assets; `/api/*` routes run on the worker first.
- **Toast reactions:** a per-post "toast" counter backed by Cloudflare D1 (`toasts` table: slug, count). Readers can add or remove a toast. This is a signature feature and must be kept.
- Existing features: blog index, post pages with reading time, prev/next post navigation, heading anchors, RSS feed, sitemap, static 404, light/dark theme toggle, prefetching.
- **Stay lightweight:** keep the site static-first with minimal client JS and fast loads. Don't add heavy frameworks or runtime dependencies.
- **No projects/portfolio section exists** and there is no project content for one. Don't invent one.

## Brand Commitments

- Name: Jasper Gabriel. Domain: jaspergabriel.dev.
- Voice: first-person, plain, friendly, a bit nerdy ("Hello world, I'm…"). Humble learner tone, not a guru.
- Contact and profiles: GitHub (`jdg2896`), LinkedIn (`jaspergabriel`), email jasper.d.gabriel@gmail.com.
- Favicon: `public/favicon.svg`.

## Evidence on Hand

- 14 published blog posts (Apr 2023 – Jan 2024) in `src/content/blog/`.
- About page copy in `src/pages/about.astro`.
- Toast counts in D1 (real reader reactions).
- **Absent, do not fabricate:** testimonials, employer or client names beyond what posts state, project case studies, metrics, readership numbers, newsletter.

## Product Principles

1. **Writing comes first.** Every decision should make posts easier to read and easier to publish.
2. **Each post is a front door.** Most visitors land on a single article, so that page has to introduce Jasper and point onward.
3. **Honest and first-hand.** Show real work and real learning; never inflate.
4. **Light by default.** Static, fast, and minimal JS. A feature has to justify its weight.

## Accessibility & Inclusion

Strict accessibility is a requirement: meet WCAG 2.2 AA at minimum in both light and dark themes. That covers contrast, keyboard operation (including the toast button and theme toggle), visible focus, semantic headings, and respecting `prefers-reduced-motion`.
