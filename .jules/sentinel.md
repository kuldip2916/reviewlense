## 2025-04-04 - Static Frontend Security Headers
**Vulnerability:** Missing Content Security Policy (CSP) headers in a static React app (Vite).
**Learning:** In purely static sites with no backend defined in code, adding a `Content-Security-Policy` meta tag to `index.html` provides a good baseline defense-in-depth against XSS.
**Prevention:** Always include basic CSP meta tags in `index.html` for static site generation.