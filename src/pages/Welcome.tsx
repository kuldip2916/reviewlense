import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Search, Sparkles, CheckCircle, RedditIcon, DollarSign } from '../components/Icons';

const CHROME_STORE_URL =
  'https://chromewebstore.google.com/detail/reviewlens-fake-review-de/ncneomnblmiefoplgpcpkjijkhpafkei';

// Link to Amazon's Best Sellers instead of a specific ASIN - individual product IDs
// get delisted or region-locked over time, and a dead link is worse than an extra click.
const AMAZON_BESTSELLERS_URL = 'https://www.amazon.com/gp/bestsellers/';

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return <div ref={ref}>{children}</div>;
}

interface StepProps {
  n: number;
  title: string;
  body: React.ReactNode;
  iconEl: React.ReactNode;
}
function Step({ n, title, body, iconEl }: StepProps) {
  return (
    <div
      className="card"
      style={{
        display: 'flex',
        gap: '1.25rem',
        alignItems: 'flex-start',
        padding: '1.5rem',
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: 44,
          height: 44,
          borderRadius: 12,
          background: 'rgba(99,102,241,0.12)',
          border: '1px solid rgba(99,102,241,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--accent)',
          fontWeight: 800,
          fontSize: 15,
        }}
      >
        {n}
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 6,
          }}
        >
          {iconEl}
          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)' }}>
            {title}
          </h3>
        </div>
        <div style={{ color: 'var(--sub)', fontSize: 14, lineHeight: 1.65 }}>
          {body}
        </div>
      </div>
    </div>
  );
}

export default function Welcome() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ paddingTop: '5rem', minHeight: '80vh' }}>
      {/* Hero */}
      <section
        style={{
          padding: '4rem 1.5rem 2.5rem',
          textAlign: 'center',
          maxWidth: 780,
          margin: '0 auto',
        }}
      >
        <FadeIn>
          <div className="section-tag">
            <Sparkles size={14} /> You're in - ReviewLens is installed
          </div>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '1rem',
            }}
          >
            Welcome.{' '}
            <span className="gradient-text">Here's how it works.</span>
          </h1>
          <p
            style={{
              fontSize: '1.1rem',
              color: 'var(--sub)',
              lineHeight: 1.7,
            }}
          >
            Three steps. Under a minute. Then every product page you visit on
            Amazon, Walmart, eBay, or Etsy gets a real authenticity score -
            automatically.
          </p>
        </FadeIn>
      </section>

      {/* 3 steps */}
      <section
        style={{
          padding: '1rem 1.5rem 3rem',
          maxWidth: 720,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <FadeIn delay={80}>
          <Step
            n={1}
            iconEl={<ShieldCheck size={18} color="#6366f1" />}
            title="Pin the ReviewLens icon"
            body={
              <>
                Click the puzzle-piece icon{' '}
                <span style={{ opacity: 0.6 }}>(top-right of Chrome)</span> and
                hit the pin next to <strong>ReviewLens</strong>. Keeps it one
                click away whenever you need a second opinion.
              </>
            }
          />
        </FadeIn>
        <FadeIn delay={140}>
          <Step
            n={2}
            iconEl={<Search size={18} color="#8b5cf6" />}
            title="Visit any product page"
            body={
              <>
                Amazon, Walmart, eBay, or Etsy - go to a product you're
                considering. ReviewLens starts analyzing the reviews the moment
                the page loads. No button to click.
              </>
            }
          />
        </FadeIn>
        <FadeIn delay={200}>
          <Step
            n={3}
            iconEl={<CheckCircle size={18} color="#22c55e" />}
            title="See the score appear"
            body={
              <>
                A small overlay pops up in the bottom-right corner with an A-F
                grade, a breakdown of red flags, Reddit community sentiment, and
                the product's price history. Click the toolbar icon for the
                full report.
              </>
            }
          />
        </FadeIn>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: '2rem 1.5rem 5rem',
          textAlign: 'center',
        }}
      >
        <FadeIn delay={260}>
          <div
            className="card"
            style={{
              maxWidth: 600,
              margin: '0 auto',
              padding: '2.5rem 2rem',
              background:
                'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, transparent 60%)',
              borderColor: 'rgba(99,102,241,0.25)',
            }}
          >
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                marginBottom: '0.5rem',
              }}
            >
              Try it on a real product
            </h2>
            <p
              style={{
                color: 'var(--sub)',
                marginBottom: '1.75rem',
                fontSize: 15,
              }}
            >
              We'll open Amazon's Best Sellers in a new tab. Click any product
              you're curious about - the ReviewLens overlay shows up in the
              bottom-right corner within a few seconds.
            </p>
            <a
              href={AMAZON_BESTSELLERS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              Browse Amazon Best Sellers
              <span style={{ fontSize: 18 }}>→</span>
            </a>
          </div>
        </FadeIn>
      </section>

      {/* What the score means */}
      <section
        style={{
          padding: '1rem 1.5rem 4rem',
          maxWidth: 820,
          margin: '0 auto',
        }}
      >
        <FadeIn>
          <h2
            style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 1.6rem)',
              fontWeight: 700,
              textAlign: 'center',
              marginBottom: '0.5rem',
            }}
          >
            What the score actually means
          </h2>
          <p
            style={{
              color: 'var(--sub)',
              textAlign: 'center',
              marginBottom: '2rem',
              fontSize: 15,
            }}
          >
            Every score blends{' '}
            <strong style={{ color: 'var(--accent)' }}>
              review authenticity (70%)
            </strong>{' '}
            and{' '}
            <strong style={{ color: 'var(--amber)' }}>
              Reddit community sentiment (30%)
            </strong>
            .
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '0.75rem',
            }}
          >
            {[
              {
                grade: 'A',
                range: '80-100',
                color: '#22c55e',
                label: 'Trustworthy',
              },
              {
                grade: 'B',
                range: '65-79',
                color: '#84cc16',
                label: 'Mostly solid',
              },
              {
                grade: 'C',
                range: '50-64',
                color: '#f59e0b',
                label: 'Be cautious',
              },
              {
                grade: 'D',
                range: '35-49',
                color: '#ef4444',
                label: 'Likely suspect',
              },
              {
                grade: 'F',
                range: '0-34',
                color: '#dc2626',
                label: 'Avoid',
              },
            ].map((g) => (
              <div
                key={g.grade}
                className="card"
                style={{
                  padding: '1rem',
                  textAlign: 'center',
                  borderColor: `${g.color}33`,
                  background: `${g.color}0a`,
                }}
              >
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: g.color,
                    lineHeight: 1,
                  }}
                >
                  {g.grade}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: 'var(--muted)',
                    marginTop: 4,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {g.range}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: 'var(--sub)',
                    marginTop: 6,
                  }}
                >
                  {g.label}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '1.75rem' }}>
            <Link
              to="/features"
              style={{
                color: 'var(--accent)',
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              See the full signal breakdown →
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Signals recap */}
      <section
        style={{
          padding: '1rem 1.5rem 5rem',
          maxWidth: 900,
          margin: '0 auto',
        }}
      >
        <FadeIn>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem',
            }}
          >
            {[
              {
                icon: <ShieldCheck size={22} color="#6366f1" />,
                title: '7 authenticity checks',
                body: 'Verified-purchase ratio, review bursts, rating clustering, generic phrasing, and more.',
              },
              {
                icon: <RedditIcon size={22} />,
                title: 'Reddit cross-reference',
                body: 'We search real discussions across thousands of subreddits - harder to astroturf than stars.',
              },
              {
                icon: <DollarSign size={22} color="#22c55e" />,
                title: 'Price history',
                body: 'Captures the price every visit so inflated "sale" prices get exposed over time.',
              },
            ].map((c) => (
              <div key={c.title} className="card" style={{ padding: '1.25rem' }}>
                <div style={{ marginBottom: 10 }}>{c.icon}</div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    marginBottom: 6,
                    color: 'var(--text)',
                  }}
                >
                  {c.title}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: 'var(--sub)',
                    lineHeight: 1.6,
                  }}
                >
                  {c.body}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Bottom nav */}
      <section
        style={{
          padding: '0 1.5rem 4rem',
          textAlign: 'center',
          color: 'var(--muted)',
          fontSize: 13,
        }}
      >
        <span>Questions?</span>{' '}
        <Link
          to="/faq"
          style={{ color: 'var(--sub)', textDecoration: 'underline' }}
        >
          See the FAQ
        </Link>
        <span style={{ margin: '0 10px' }}>·</span>
        <Link
          to="/privacy"
          style={{ color: 'var(--sub)', textDecoration: 'underline' }}
        >
          Privacy policy
        </Link>
        <span style={{ margin: '0 10px' }}>·</span>
        <a
          href={CHROME_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--sub)', textDecoration: 'underline' }}
        >
          Store listing
        </a>
      </section>
    </main>
  );
}
