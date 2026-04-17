import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Frown, ShieldCheck } from '../components/Icons';

const CHROME_STORE_URL =
  'https://chromewebstore.google.com/detail/reviewlens-fake-review-de/ncneomnblmiefoplgpcpkjijkhpafkei';

// Zero-dependency exit survey: submit opens the user's mail client with the
// form content pre-filled. No backend, no third-party embed, works offline.
// To upgrade later: swap <ExitSurvey/> with a Tally iframe or a fetch() POST
// to a Cloudflare Worker (see Phase B of the retention plan).
const FEEDBACK_EMAIL = 'kuldip2916@gmail.com';

const REASON_OPTIONS = [
  "I didn't understand how to use it",
  "It didn't work on the sites I shop on",
  "I didn't find enough value in the scores",
  "It was too slow or glitchy",
  "Privacy concerns",
  "I found a better tool",
  'Other',
];

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

      {/* Native exit survey — mailto-backed, zero setup required */}
      <section
        style={{
          padding: '1rem 1.5rem 4rem',
          maxWidth: 640,
          margin: '0 auto',
        }}
      >
        <FadeIn delay={80}>
          <ExitSurvey />
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

function ExitSurvey() {
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = 'ReviewLens — exit feedback';
    const body = [
      'Reason: ' + (reason || '(not selected)'),
      '',
      'Anything else:',
      details || '(none)',
      '',
      '---',
      'Sent from the ReviewLens goodbye page.',
    ].join('\n');
    const href =
      'mailto:' +
      encodeURIComponent(FEEDBACK_EMAIL) +
      '?subject=' +
      encodeURIComponent(subject) +
      '&body=' +
      encodeURIComponent(body);
    window.location.href = href;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        className="card"
        style={{
          padding: '2rem 1.5rem',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, transparent 70%)',
          borderColor: 'rgba(99,102,241,0.25)',
        }}
      >
        <div style={{ fontSize: 28, marginBottom: 8 }}>✉️</div>
        <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6, color: 'var(--text)' }}>
          Your mail client should have opened
        </h3>
        <p style={{ color: 'var(--sub)', fontSize: 14, lineHeight: 1.65 }}>
          If nothing happened, email us directly at{' '}
          <a href={`mailto:${FEEDBACK_EMAIL}`} style={{ color: 'var(--accent)' }}>
            {FEEDBACK_EMAIL}
          </a>
          . Thank you — every reply genuinely shapes what gets built next.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card"
      style={{
        padding: '1.5rem',
        background: 'var(--surface)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
      }}
    >
      <div>
        <label
          htmlFor="exit-reason"
          style={{
            display: 'block',
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--text)',
            marginBottom: 8,
          }}
        >
          What made you uninstall?
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {REASON_OPTIONS.map((opt) => (
            <label
              key={opt}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 12px',
                border: '1px solid var(--border)',
                borderRadius: 10,
                background: reason === opt ? 'rgba(99,102,241,0.08)' : 'transparent',
                borderColor: reason === opt ? 'rgba(99,102,241,0.4)' : 'var(--border)',
                cursor: 'pointer',
                fontSize: 14,
                color: 'var(--text)',
                transition: 'background 0.15s, border-color 0.15s',
              }}
            >
              <input
                type="radio"
                name="exit-reason"
                value={opt}
                checked={reason === opt}
                onChange={() => setReason(opt)}
                style={{ accentColor: '#6366f1' }}
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label
          htmlFor="exit-details"
          style={{
            display: 'block',
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--text)',
            marginBottom: 8,
          }}
        >
          Anything else you'd like us to know? <span style={{ color: 'var(--muted)', fontWeight: 400 }}>(optional)</span>
        </label>
        <textarea
          id="exit-details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          rows={4}
          placeholder="What would have made you keep it?"
          style={{
            width: '100%',
            padding: '10px 12px',
            borderRadius: 10,
            border: '1px solid var(--border)',
            background: 'var(--bg2)',
            color: 'var(--text)',
            fontSize: 14,
            fontFamily: 'inherit',
            resize: 'vertical',
            minHeight: 90,
          }}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <button
          type="submit"
          className="btn-primary"
          disabled={!reason && !details}
          style={{
            opacity: !reason && !details ? 0.5 : 1,
            cursor: !reason && !details ? 'not-allowed' : 'pointer',
          }}
        >
          Send feedback
        </button>
        <span style={{ fontSize: 12, color: 'var(--muted)' }}>
          Opens your mail client — no account needed.
        </span>
      </div>
    </form>
  );
}
