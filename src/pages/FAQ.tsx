import { useState, useEffect, useRef } from 'react';

/* ─── Animated fade-in ──────────────────────────────── */
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return <div ref={ref}>{children}</div>;
}

/* ─── Accordion item ────────────────────────────────── */
function AccordionItem({ question, answer, isOpen, onToggle }: {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{
      borderBottom: '1px solid var(--border)',
      overflow: 'hidden',
    }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.25rem 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          gap: '1rem',
        }}
      >
        <span style={{
          fontSize: '1rem',
          fontWeight: 600,
          color: isOpen ? 'var(--accent)' : 'var(--text-primary)',
          lineHeight: 1.4,
          transition: 'color 0.2s',
        }}>
          {question}
        </span>
        <span style={{
          flexShrink: 0,
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          background: isOpen ? 'var(--accent)' : 'var(--surface-2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.75rem',
          color: isOpen ? '#fff' : 'var(--text-secondary)',
          transition: 'all 0.2s',
          transform: isOpen ? 'rotate(45deg)' : 'none',
        }}>
          +
        </span>
      </button>
      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? '500px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.35s ease',
        }}
      >
        <div style={{
          paddingBottom: '1.25rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
          fontSize: '0.9375rem',
        }}>
          {answer}
        </div>
      </div>
    </div>
  );
}

/* ─── Category section ───────────────────────────────── */
interface FAQItem {
  q: string;
  a: React.ReactNode;
}
interface Category {
  icon: string;
  label: string;
  items: FAQItem[];
}

/* ─── Page ───────────────────────────────────────────── */
export default function FAQ() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [openKey, setOpenKey] = useState<string | null>('general-0');
  const [activeCategory, setActiveCategory] = useState('general');

  const categories: Record<string, Category> = {
    general: {
      icon: '💡',
      label: 'General',
      items: [
        {
          q: 'What is ReviewLens?',
          a: 'ReviewLens is a free Chrome extension that analyses product listings on Amazon, Walmart, eBay, and Etsy. It combines review authenticity signals, Reddit community sentiment, and price history to give you an honest, unbiased verdict before you buy.',
        },
        {
          q: 'Is ReviewLens free?',
          a: 'Yes — 100% free, forever. There are no premium tiers, no subscriptions, and no hidden charges. The extension is open-source and will remain free.',
        },
        {
          q: 'Do I need to create an account?',
          a: 'No. ReviewLens requires zero sign-up. Install it, visit a product page, and click the icon. That\'s it.',
        },
        {
          q: 'Which platforms are supported?',
          a: (
            <span>
              ReviewLens currently works on <strong style={{ color: 'var(--text-primary)' }}>Amazon</strong>, <strong style={{ color: 'var(--text-primary)' }}>Walmart</strong>, <strong style={{ color: 'var(--text-primary)' }}>eBay</strong>, and <strong style={{ color: 'var(--text-primary)' }}>Etsy</strong>. We plan to add more platforms based on user feedback.
            </span>
          ),
        },
        {
          q: 'How accurate is the analysis?',
          a: 'ReviewLens uses five independent signals that correlate strongly with fake-review patterns identified in academic research. No automated tool is perfect — we recommend using the score as one input, not the sole decision factor. For high-value purchases, reading a sample of Reddit discussions directly is always a good idea.',
        },
      ],
    },
    scores: {
      icon: '📊',
      label: 'Scores & Signals',
      items: [
        {
          q: 'What does the overall score mean?',
          a: 'The overall score (0–100) is a weighted combination: 70% from the review authenticity analysis and 30% from Reddit sentiment. It maps to letter grades: A (80+), B (65+), C (50+), D (35+), F (below 35). A lower score means more red flags — it doesn\'t necessarily mean the product is bad, just that its reviews may be unreliable.',
        },
        {
          q: 'What signals are used for the authenticity score?',
          a: (
            <span>
              Four signals contribute to the authenticity score:
              <br /><br />
              <strong style={{ color: 'var(--text-primary)' }}>1. Verified purchase ratio</strong> — What % of reviews are from verified buyers.<br />
              <strong style={{ color: 'var(--text-primary)' }}>2. Review burst detection</strong> — Abnormal spikes in review volume over time.<br />
              <strong style={{ color: 'var(--text-primary)' }}>3. Rating clustering</strong> — Unnatural concentration at 5-stars with few mid-range ratings.<br />
              <strong style={{ color: 'var(--text-primary)' }}>4. Generic phrasing</strong> — Template-like or AI-generated review language patterns.
            </span>
          ),
        },
        {
          q: 'How does Reddit sentiment work?',
          a: 'ReviewLens searches Reddit for posts that genuinely discuss the product using a relevance scoring system: ASIN/product ID matches score highest, brand mentions score next, and common product nouns score lowest. Spam and deal-posting subreddits are excluded. Sentiment is calculated using upvote weight × positivity score.',
        },
        {
          q: 'What does "insufficient data" mean on the price chart?',
          a: 'The price tracking feature works by recording the price each time you visit a product page. "Insufficient data" means this is the first (or second) time you\'ve visited — there isn\'t enough history yet to calculate a trend. Visit the same product a few days later and a trend will appear. For longer history, you\'d need an external API like Keepa (not currently integrated).',
        },
        {
          q: 'Why is the Reddit score sometimes 50 even for good products?',
          a: 'A score of 50 means ReviewLens found no Reddit discussions for this product. This is neutral — not positive or negative. It\'s common for niche or lesser-known products. When no posts are found, we default to a neutral 50 so the Reddit component doesn\'t unfairly penalise the overall score.',
        },
      ],
    },
    privacy: {
      icon: '🔒',
      label: 'Privacy & Data',
      items: [
        {
          q: 'What data does ReviewLens collect?',
          a: 'ReviewLens collects no personal data. The only data stored is price history for products you visit — this stays entirely on your device in Chrome\'s local storage. No data is sent to any server operated by us.',
        },
        {
          q: 'Do you sell or share my data?',
          a: 'No. We don\'t collect personal data, so there\'s nothing to sell or share. ReviewLens has no backend servers that receive browsing data.',
        },
        {
          q: 'What network requests does the extension make?',
          a: (
            <span>
              ReviewLens makes requests to:
              <br /><br />
              • <strong style={{ color: 'var(--text-primary)' }}>Amazon\'s unofficial reviews API</strong> — to fetch review data<br />
              • <strong style={{ color: 'var(--text-primary)' }}>Reddit\'s public search API</strong> — to find product discussions<br />
              • <strong style={{ color: 'var(--text-primary)' }}>Walmart, eBay, Etsy</strong> — platform-specific review endpoints<br />
              <br />
              No requests are made to ReviewLens servers. All processing happens locally in your browser.
            </span>
          ),
        },
        {
          q: 'Can I delete stored price history?',
          a: 'Yes. Open Chrome DevTools on any page → Application → Storage → Local Storage → chrome-extension://... and you can view and delete any stored price data. We\'re working on adding a built-in clear button in a future update.',
        },
        {
          q: 'Why does the extension need access to Amazon/Walmart/eBay/Etsy?',
          a: 'The extension needs host permissions to inject the ReviewLens button into product pages and to read the current page price and product ID. It does not read, collect, or transmit any other page content.',
        },
      ],
    },
    technical: {
      icon: '⚙️',
      label: 'Technical',
      items: [
        {
          q: 'Why does analysis sometimes take 10–15 seconds?',
          a: 'ReviewLens runs several analyses in parallel: review fetching and scoring, Reddit search across multiple queries, and price tracking. The Reddit search is typically the slowest step, as it queries multiple Reddit API endpoints. Results are cached for 24 hours so repeat visits are instant.',
        },
        {
          q: 'Why does the popup show "Loading..." but never finish?',
          a: 'This can happen if the extension\'s background service worker has gone inactive (Chrome suspends them after ~30 seconds). Try closing and reopening the popup. If it persists, go to chrome://extensions, find ReviewLens, click the reload button (↺), and try again.',
        },
        {
          q: 'Does it work in Incognito mode?',
          a: 'Not by default — Chrome extensions are disabled in Incognito unless you explicitly allow it. Go to chrome://extensions → ReviewLens → Details → toggle "Allow in Incognito" on.',
        },
        {
          q: 'The price is showing wrong. How does price extraction work?',
          a: 'ReviewLens runs a small script inside the product page\'s DOM to extract the displayed price. If the page uses an unusual layout or lazy-loads pricing, the script may not find it. In that case, no price is recorded for that visit — the chart will simply have one less data point.',
        },
        {
          q: 'Is the source code available?',
          a: 'Yes! ReviewLens is open-source. You can review the code, report issues, or contribute on GitHub. We believe in full transparency — especially for a tool that touches your shopping data.',
        },
      ],
    },
  };

  const toggle = (cat: string, idx: number) => {
    const key = `${cat}-${idx}`;
    setOpenKey(prev => prev === key ? null : key);
  };

  return (
    <main style={{ paddingTop: '5rem' }}>
      {/* Hero */}
      <section style={{ padding: '5rem 1.5rem 3rem', textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
        <FadeIn>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.4rem 1rem', borderRadius: '2rem',
            background: 'var(--accent-subtle)', border: '1px solid var(--accent-border)',
            fontSize: '0.8rem', color: 'var(--accent)', marginBottom: '1.5rem',
          }}>
            ✦ Help Center
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '1rem' }}>
            Frequently asked <span className="gradient-text">questions</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            Everything you need to know about how ReviewLens works, what it analyses, and how it keeps your data private.
          </p>
        </FadeIn>
      </section>

      {/* Content */}
      <section style={{ padding: '2rem 1.5rem 6rem', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '3rem', alignItems: 'start' }}>
          {/* Sidebar nav */}
          <FadeIn>
            <div style={{ position: 'sticky', top: '6rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem', fontWeight: 600 }}>
                Categories
              </div>
              {Object.entries(categories).map(([key, cat]) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveCategory(key);
                    document.getElementById(`cat-${key}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    width: '100%',
                    padding: '0.6rem 0.75rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    background: activeCategory === key ? 'var(--accent-subtle)' : 'transparent',
                    color: activeCategory === key ? 'var(--accent)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: activeCategory === key ? 600 : 400,
                    textAlign: 'left',
                    marginBottom: '0.25rem',
                    transition: 'all 0.2s',
                  }}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Questions */}
          <div>
            {Object.entries(categories).map(([catKey, cat], ci) => (
              <FadeIn key={catKey} delay={ci * 60}>
                <div id={`cat-${catKey}`} style={{ marginBottom: '3rem', scrollMarginTop: '7rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '1.25rem' }}>{cat.icon}</span>
                    <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {cat.label}
                    </h2>
                  </div>
                  <div className="card" style={{ padding: '0 1.5rem' }}>
                    {cat.items.map((item, idx) => (
                      <AccordionItem
                        key={idx}
                        question={item.q}
                        answer={item.a}
                        isOpen={openKey === `${catKey}-${idx}`}
                        onToggle={() => toggle(catKey, idx)}
                      />
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Still have questions */}
        <FadeIn delay={200}>
          <div className="card" style={{
            marginTop: '2rem',
            padding: '2rem',
            textAlign: 'center',
            background: 'linear-gradient(135deg, var(--accent-subtle) 0%, transparent 60%)',
            borderColor: 'var(--accent-border)',
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🤔</div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Still have questions?
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
              Open an issue on GitHub or reach out — we read everything.
            </p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Open a GitHub Issue
            </a>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
