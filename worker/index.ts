// Minimal local declarations so the Astro tsconfig doesn't need
// @cloudflare/workers-types for this one binding.
interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T>(): Promise<T | null>;
}
interface D1Database {
  prepare(query: string): D1PreparedStatement;
}
interface RateLimit {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}
interface Env {
  DB: D1Database;
  ASSETS: { fetch(request: Request | URL): Promise<Response> };
  TOAST_LIMITER: RateLimit;
}

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const match = url.pathname.match(/^\/api\/toast\/([^/]+)$/);
    if (!match) {
      // Unknown API routes stay JSON; anything else only reaches the
      // Worker when no static asset matched, so serve the 404 page.
      if (url.pathname.startsWith('/api/')) {
        return json({ error: 'Not found' }, 404);
      }
      return env.ASSETS.fetch(request);
    }

    const slug = match[1];
    if (slug.length > 100 || !SLUG_RE.test(slug)) {
      return json({ error: 'Invalid slug' }, 400);
    }

    if (request.method === 'GET') {
      const row = await env.DB.prepare('SELECT count FROM toasts WHERE slug = ?')
        .bind(slug)
        .first<{ count: number }>();
      return json({ count: row?.count ?? 0 });
    }

    if (request.method !== 'POST' && request.method !== 'DELETE') {
      return json({ error: 'Method not allowed' }, 405);
    }

    // A bodyless POST is a "simple" request, so CORS doesn't stop another
    // site from sending it with its visitors' browsers; browsers always set
    // Origin on POST and DELETE, so only this site's pages get through
    if (request.headers.get('Origin') !== url.origin) {
      return json({ error: 'Forbidden' }, 403);
    }

    // Per IP, so one script can't run up a count (or zero one out)
    const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown';
    const { success } = await env.TOAST_LIMITER.limit({ key: ip });
    if (!success) {
      return json({ error: 'Too many requests' }, 429);
    }

    // Only real posts get a row; otherwise any slug-shaped string would
    const post = await env.ASSETS.fetch(new URL(`/blog/${slug}/`, url));
    if (!post.ok) {
      return json({ error: 'Not found' }, 404);
    }

    if (request.method === 'POST') {
      const row = await env.DB.prepare(
        'INSERT INTO toasts (slug, count) VALUES (?, 1) ON CONFLICT(slug) DO UPDATE SET count = count + 1 RETURNING count'
      )
        .bind(slug)
        .first<{ count: number }>();
      return json({ count: row?.count ?? 1 });
    }

    const row = await env.DB.prepare(
      'UPDATE toasts SET count = MAX(count - 1, 0) WHERE slug = ? RETURNING count'
    )
      .bind(slug)
      .first<{ count: number }>();
    return json({ count: row?.count ?? 0 });
  },
};
