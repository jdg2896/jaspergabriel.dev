# jaspergabriel.dev

My personal site and blog, where I write about what I'm learning in software, cloud, and
security. Built with [Astro](https://astro.build) and served from a Cloudflare Worker.

## Run it locally

```sh
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # static output in dist/
```

## Write a post

```sh
pnpm run new "Post title"   # creates a draft in src/content/blog/
pnpm dev                    # preview it
pnpm run publish            # dates it, checks the build, commits, and pushes
```

A push to `main` deploys the site.

## Toasts

Each post has a toast button. Counts are stored in Cloudflare D1 and served by
`worker/index.ts` at `/api/toast/:slug`.
