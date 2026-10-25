# AGENTS.md

Jasper Gabriel's personal site and blog, jaspergabriel.dev. A static Astro 7 site served by a
Cloudflare Worker, which also runs a small toast-reaction API on D1.

Read these before changing anything visible:

- `PRODUCT.md`: who the site is for, voice, constraints, and what not to fabricate.
- `DESIGN.md`: colors, type, spacing, and components. Match it; don't invent new tokens.

## Commands

Use pnpm (version pinned by `packageManager`) and the Node version in `.node-version`.

```sh
pnpm install --frozen-lockfile
pnpm dev                       # http://localhost:4321
pnpm build                     # typechecks, then builds; must pass, CI runs it on every PR
pnpm check                     # typecheck only (astro check, also covers worker/)
pnpm exec wrangler deploy --dry-run   # CI also checks the Worker config
pnpm run new "Post title"      # scaffold a draft in src/content/blog/
pnpm run publish [slug]        # date, build, commit, and push a draft
```

There are no tests or linters. `pnpm build` is the check: it typechecks the project and
validates post front matter against `src/content.config.ts`.

## Layout

- `src/content/blog/*.md`: posts. A post's images live in a folder named after its slug.
- `src/pages/`: routes, including RSS/Atom feeds and generated OG images (`og/[slug].png.ts`).
- `src/layouts/`, `src/components/`, `src/styles/global.css`: UI.
- `src/plugins/`: rehype plugins wired up in `astro.config.mjs`.
- `worker/index.ts`: serves `dist/` and handles `/api/toast/:slug`. Schema in `worker/schema.sql`.
- `scripts/`: the `new`/`publish` helpers and a dev.to canonical-URL script.

## Rules

- Keep it light: static-first, minimal client JS, no new frameworks or heavy runtime deps.
- Keep the attack surface small (see `SECURITY.md`). Adding a route, stored data, a cookie, or a
  third-party script needs Jasper's sign-off and an update to `SECURITY.md`.
- WCAG 2.2 AA in both light and dark themes, keyboard operable, respect reduced motion.
- Never invent content: no fake posts, projects, metrics, testimonials, or employers.
- A push to `main` deploys the live site. Don't push to `main` or run `pnpm run publish` unless
  Jasper asks; work on a branch and open a PR.
- Dependencies: `pnpm-workspace.yaml` blocks install scripts and versions under 3 days old on
  purpose. Don't loosen those settings to make an install pass.
- Comments explain why, briefly. Match the surrounding code's style.
- Commits use Conventional Commits with a scope, e.g. `fix(about): ...`, `feat(seo): ...`.

## Skills

- `clarity` (`.agents/skills/clarity`, symlinked into `.claude/skills/`): use it when drafting,
  rewriting, or reviewing posts and other reader-facing prose. Keep Jasper's first-person,
  plain voice and don't add facts he didn't provide. Update with `npx skills update clarity`.
- Impeccable is installed as a Claude Code plugin, not in this repo. Its state lives in
  `.impeccable/`, `PRODUCT.md`, and `DESIGN.md`.
