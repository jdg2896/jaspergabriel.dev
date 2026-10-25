# Security

This is a personal blog, and I keep it small on purpose: static pages, one tiny API, no
accounts, no cookies, no forms, and no third-party scripts.

## Reporting a vulnerability

Email jasper.d.gabriel@gmail.com with what you found and how to reproduce it. Please don't
open a public issue for a security problem.

I maintain this alone in my spare time, so replies are best effort, usually within a week.
There's no bug bounty, but I'm happy to credit you once it's fixed.

## Scope

In scope:

- jaspergabriel.dev, served by the Cloudflare Worker in `worker/index.ts`
- The toast API, `/api/toast/:slug` (GET, POST, DELETE)
- This repository's build, CI workflows, and dependencies

Out of scope:

- Toast counts being nudged by hand. They're for fun, not a security boundary.
- Volumetric DDoS, which Cloudflare handles
- Missing headers or best practices with no demonstrated impact
- Cross-posted copies of my posts on dev.to, Hashnode, or freeCodeCamp
- Social engineering, or anything that needs physical access to my devices

## What's in place

**Attack surface.** Everything is static except `/api/toast/:slug`. It stores one thing: a
count per post in Cloudflare D1. The site sets no cookies and loads no third-party scripts;
`localStorage` only remembers your theme and which posts you've toasted.

**Toast API.**
- Slugs are validated and queries are parameterized.
- POST and DELETE are rejected unless the `Origin` header is this site, so other sites can't
  send toasts from their visitors' browsers.
- Writes are rate limited to 10 a minute per IP.
- A row is only created for a post that exists.
- Counts never go below zero.
- Worker logs are on so I can spot abuse.

**Response headers** (`public/_headers`). A CSP that blocks framing, plugins, and `<base>` and
form hijacking, plus `X-Frame-Options`, `nosniff`, a strict referrer policy, a Permissions-Policy
that turns off camera, microphone and location, and HSTS.

**Supply chain.**
- pnpm blocks dependency install scripts unless explicitly allowed, and fails on new ones.
- New versions aren't installed until they're 3 days old.
- Transitive dependencies must come from the npm registry, never git URLs or tarballs.
- Releases published with weaker provenance than earlier ones are refused.
- Dependabot waits out the same cooldown. Patch and minor bumps auto-merge only after CI passes;
  majors get a manual review.
- GitHub Actions are pinned to commit SHAs.
- CI runs with a read-only token and no secrets, so a malicious dependency in a PR has nothing
  to steal and nowhere to push.

**Hosting.** The site is served only at jaspergabriel.dev; workers.dev and preview URLs are off.

## Keeping it this way

New features should add as little attack surface as possible. Anything that adds a route,
stores data, sets a cookie, or loads a third-party script needs a good reason, and this file
gets updated with it.
