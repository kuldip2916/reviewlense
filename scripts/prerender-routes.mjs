// GitHub Pages serves a physical file with HTTP 200, but an unknown path falls
// back to 404.html with a 404 STATUS — which fails reachability checks (e.g. the
// Chrome Web Store "Support URL is not reachable" validator) even though the SPA
// renders fine in a browser.
//
// Fix: emit a real index.html at each route path so every deep link returns 200.
// Each copy is just the SPA shell; React Router renders the correct route from
// the URL on the client.

import { copyFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';

const DIST = 'dist';
const SRC = join(DIST, 'index.html');

if (!existsSync(SRC)) {
  console.error(`✗ ${SRC} not found — did vite build run?`);
  process.exit(1);
}

// Keep in sync with the <Route> paths in src/App.tsx (static segments only).
const ROUTES = [
  'features',
  'faq',
  'privacy',
  'blog',
  'welcome',
  'goodbye',
  'stats',
  'analyze',
  // Known blog posts (dynamic /blog/:slug) — list each published slug.
  'blog/how-to-spot-fake-amazon-reviews-2026',
  'blog/best-fakespot-alternatives-2026',
  'blog/are-online-reviews-fake',
];

let n = 0;
for (const route of ROUTES) {
  const out = join(DIST, route, 'index.html');
  mkdirSync(dirname(out), { recursive: true });
  copyFileSync(SRC, out);
  n++;
}
console.log(`✓ prerendered ${n} route shells (each returns HTTP 200)`);
