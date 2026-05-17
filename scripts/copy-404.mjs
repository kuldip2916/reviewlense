// SPA fallback for GitHub Pages.
//
// GitHub Pages doesn't natively support history-API SPA routing — a direct
// visit to /reviewlense/features returns its built-in 404 page instead of
// loading our React app. The trick: ship dist/404.html as a copy of
// dist/index.html. When a user lands on any unknown path, GitHub serves the
// 404.html (which IS the SPA), the bundle boots, React Router takes over,
// and the user sees the right route — all in one round trip.
//
// Runs after `vite build` as part of `npm run build`.

import { copyFileSync, existsSync } from 'node:fs';

const src = 'dist/index.html';
const dst = 'dist/404.html';

if (!existsSync(src)) {
  console.error(`✗ ${src} not found. Did vite build fail?`);
  process.exit(1);
}

copyFileSync(src, dst);
console.log(`✓ ${dst} created as SPA fallback`);
