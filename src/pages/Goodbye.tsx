import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Frown, ShieldCheck } from '../components/Icons';

const CHROME_STORE_URL =
  'https://chromewebstore.google.com/detail/reviewlens-fake-review-de/ncneomnblmiefoplgpcpkjijkhpafkei';

// Tally form — inline embed of form ID pbPA4E.
// Responses land in the Tally dashboard: https://tally.so/forms/pbPA4E/submissions
const TALLY_EMBED_URL =
  'https://tally.so/embed/pbPA4E?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1';

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

export default function Goodbye() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ paddingTop: '5rem', minHeight: '80vh' }}>
      {/* Hero */}
      <section
        style={{
          padding: '4rem 1.5rem 2rem',
          textAlign: 'center',
          maxWidth: 720,
          margin: '0 auto',
        }}
      >
        <FadeIn>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 56,
              height: 56,
              borderRadius: 16,
              background: 'rgba(99,102,241,0.1)',
              border: '1px solid rgba(99,102,241,0.25)',
              marginBottom: '1.25rem',
            }}
          >
            <Frown size={28} color="#6366f1" />
          </div>
          <h1
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: '0.75rem',
            }}
          >
            Sorry to see you go.
          </h1>
          <p
            style={{
              fontSize: '1.05rem',
              color: 'var(--sub)',
              lineHeight: 1.7,
            }}
          >
            ReviewLens is still tiny and every piece of feedback shapes what
            gets built next. If you have 20 seconds, it would genuinely help.
          </p>
        </FadeIn>
      </section>

      {/* Tally exit survey — inline embed, responses land in tally.so/forms/pbPA4E */}
      <section
        style={{
          padding: '1rem 1.5rem 4rem',
          maxWidth: 640,
          margin: '0 auto',
        }}
      >
        <FadeIn delay={80}>
          <div
            className="card"
            style={{
              padding: '1rem',
              background: 'var(--surface)',
              overflow: 'hidden',
            }}
          >
            <iframe
              src={TALLY_EMBED_URL}
              loading="lazy"
              width="100%"
              height="520"
              frameBorder={0}
              title="ReviewLens exit survey"
              style={{
                border: 0,
                width: '100%',
                minHeight: 520,
                background: 'transparent',
                display: 'block',
              }}
            />
          </div>
        </FadeIn>
      </section>

      {/* Come back CTA */}
      <section
        style={{
          padding: '0 1.5rem 5rem',
          textAlign: 'center',
          maxWidth: 640,
          margin: '0 auto',
        }}
      >
        <FadeIn delay={160}>
          <div
            className="card"
            style={{
              padding: '1.75rem 1.5rem',
              background:
                'linear-gradient(135deg, rgba(34,197,94,0.08) 0%, transparent 70%)',
              borderColor: 'rgba(34,197,94,0.2)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                marginBottom: 10,
              }}
            >
              <ShieldCheck size={20} color="#22c55e" />
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: 'var(--text)',
                }}
              >
                Changed your mind?
              </div>
            </div>
            <p
              style={{
                color: 'var(--sub)',
                fontSize: 14,
                lineHeight: 1.65,
                marginBottom: '1.25rem',
              }}
            >
              ReviewLens is free and always will be. No account, no tracking of
              what you shop for — everything stays in your browser.
            </p>
            <a
              href={CHROME_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              Reinstall ReviewLens
            </a>
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
        <Link
          to="/"
          style={{ color: 'var(--sub)', textDecoration: 'underline' }}
        >
          Back to homepage
        </Link>
        <span style={{ margin: '0 10px' }}>·</span>
        <Link
          to="/faq"
          style={{ color: 'var(--sub)', textDecoration: 'underline' }}
        >
          FAQ
        </Link>
        <span style={{ margin: '0 10px' }}>·</span>
        <Link
          to="/privacy"
          style={{ color: 'var(--sub)', textDecoration: 'underline' }}
        >
          Privacy
        </Link>
      </section>
    </main>
  );
}

