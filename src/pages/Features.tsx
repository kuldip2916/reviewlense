import { useEffect, useRef } from 'react';
import { ShieldCheck, RedditIcon, DollarSign, Zap, BarChart, Search, Sparkles } from '../components/Icons';

/* ─── Animated section wrapper ─────────────────────── */
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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return <div ref={ref}>{children}</div>;
}

/* ─── Feature Detail Card ───────────────────────────── */
interface FeatureDetailProps {
  iconEl: React.ReactNode;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
  platforms?: string[];
  accent: string;
  reversed?: boolean;
}
function FeatureDetail({ iconEl, title, tagline, description, bullets, platforms, accent, reversed }: FeatureDetailProps) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '3rem',
      alignItems: 'center',
      flexDirection: reversed ? 'row-reverse' : 'row',
    }}>
      {/* Text side */}
      <div style={{ order: reversed ? 2 : 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {iconEl}
          </div>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: accent,
            background: `${accent}18`,
            padding: '0.25rem 0.75rem',
            borderRadius: '2rem',
            border: `1px solid ${accent}30`,
          }}>{tagline}</span>
        </div>
        <h3 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          {title}
        </h3>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
          {description}
        </p>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {bullets.map((b, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-secondary)' }}>
              <span style={{ color: accent, flexShrink: 0, marginTop: '2px' }}>✓</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
        {platforms && (
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {platforms.map(p => (
              <span key={p} style={{
                fontSize: '0.75rem',
                color: 'var(--text-tertiary)',
                background: 'var(--surface-2)',
                padding: '0.25rem 0.6rem',
                borderRadius: '0.375rem',
                border: '1px solid var(--border)',
              }}>{p}</span>
            ))}
          </div>
        )}
      </div>

      {/* Visual side */}
      <div style={{ order: reversed ? 1 : 2 }}>
        <div className="card" style={{
          padding: '2rem',
          background: `linear-gradient(135deg, ${accent}08 0%, transparent 60%)`,
          borderColor: `${accent}25`,
        }}>
          <FeatureVisual title={title} accent={accent} iconEl={iconEl} />
        </div>
      </div>
    </div>
  );
}

/* ─── Per-feature visual mockups ──────────────────── */
function FeatureVisual({ title, accent, iconEl }: { title: string; accent: string; iconEl: React.ReactNode }) {
  if (title.includes('Authenticity')) {
    return (
      <div>
        <div style={{ marginBottom: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Review signal breakdown
        </div>
        {[
          { label: 'Verified purchases', val: 62, color: '#22c55e' },
          { label: 'Unique reviewer profiles', val: 88, color: '#22c55e' },
          { label: 'Review burst events', val: 23, color: '#ef4444' },
          { label: 'Generic phrasing', val: 41, color: '#f59e0b' },
        ].map(({ label, val, color }) => (
          <div key={label} style={{ marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{label}</span>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color }}>{val}%</span>
            </div>
            <div style={{ height: '4px', background: 'var(--surface-2)', borderRadius: '2px' }}>
              <div style={{ width: `${val}%`, height: '100%', background: color, borderRadius: '2px', transition: 'width 1s ease' }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (title.includes('Reddit')) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
          Community discussions found
        </div>
        {[
          { sub: 'r/BuyItForLife', score: 847, sentiment: 'positive', comment: '"Still works perfectly after 3 years"' },
          { sub: 'r/gadgets', score: 312, sentiment: 'positive', comment: '"Best bang for buck in this category"' },
          { sub: 'r/mildlyinfuriating', score: 89, sentiment: 'negative', comment: '"Quality dropped after v2 update"' },
        ].map(({ sub, score, sentiment, comment }) => (
          <div key={sub} style={{
            padding: '0.75rem',
            background: 'var(--surface-2)',
            borderRadius: '0.5rem',
            border: `1px solid ${sentiment === 'positive' ? '#22c55e20' : '#ef444420'}`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
              <span style={{ fontSize: '0.75rem', color: accent, fontWeight: 600 }}>{sub}</span>
              <span style={{ fontSize: '0.75rem', color: sentiment === 'positive' ? '#22c55e' : '#ef4444' }}>
                {sentiment === 'positive' ? '▲' : '▼'} {score}
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', margin: 0 }}>{comment}</p>
          </div>
        ))}
      </div>
    );
  }

  if (title.includes('Price')) {
    const points = [28.99, 29.99, 31.49, 27.99, 24.99, 24.99, 23.49];
    const min = Math.min(...points), max = Math.max(...points);
    const w = 260, h = 80;
    const toX = (i: number) => (i / (points.length - 1)) * w;
    const toY = (v: number) => h - ((v - min) / (max - min || 1)) * (h - 10) - 5;
    const d = points.map((v, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(v)}`).join(' ');
    const fill = `${d} L ${toX(points.length - 1)} ${h} L 0 ${h} Z`;
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Current price</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#22c55e' }}>$23.49</div>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.3rem',
            background: '#22c55e18', color: '#22c55e', padding: '0.4rem 0.75rem',
            borderRadius: '2rem', fontSize: '0.875rem', fontWeight: 600, alignSelf: 'flex-start',
          }}>↓ -19.0% in 7d</div>
        </div>
        <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
          <defs>
            <linearGradient id="fg2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <path d={fill} fill="url(#fg2)" />
          <path d={d} fill="none" stroke="#22c55e" strokeWidth={2} strokeLinecap="round" />
          <circle cx={toX(points.length - 1)} cy={toY(points[points.length - 1])} r={4} fill="#22c55e" />
        </svg>
      </div>
    );
  }

  if (title.includes('Burst')) {
    return (
      <div>
        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
          Review velocity over time
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '80px' }}>
          {[2, 3, 2, 4, 3, 2, 3, 2, 28, 31, 27, 3, 2, 3, 2, 4].map((v, i) => (
            <div key={i} style={{
              flex: 1,
              height: `${(v / 31) * 100}%`,
              background: v > 10 ? '#ef4444' : '#334155',
              borderRadius: '2px 2px 0 0',
              position: 'relative',
            }}>
              {v > 10 && (
                <div style={{
                  position: 'absolute',
                  top: '-20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: '0.55rem',
                  color: '#ef4444',
                  whiteSpace: 'nowrap',
                }}>⚠</div>
              )}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>Jan</span>
          <span style={{ fontSize: '0.7rem', color: '#ef4444' }}>← Suspicious burst</span>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>Mar</span>
        </div>
      </div>
    );
  }

  if (title.includes('Rating')) {
    const dist: Record<number, number> = { 5: 61, 4: 5, 3: 3, 2: 2, 1: 4 };
    return (
      <div>
        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
          Rating distribution analysis
        </div>
        {[5, 4, 3, 2, 1].map(star => (
          <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', width: '12px' }}>{star}★</span>
            <div style={{ flex: 1, height: '8px', background: 'var(--surface-2)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{
                width: `${dist[star]}%`,
                height: '100%',
                background: star === 5 ? '#ef4444' : '#334155',
                borderRadius: '4px',
              }} />
            </div>
            <span style={{ fontSize: '0.75rem', width: '30px', textAlign: 'right', color: star === 5 ? '#ef4444' : 'var(--text-tertiary)', fontWeight: star === 5 ? 700 : 400 }}>
              {dist[star]}%
            </span>
          </div>
        ))}
        <div style={{ marginTop: '0.75rem', padding: '0.5rem', background: '#ef444410', border: '1px solid #ef444430', borderRadius: '0.375rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>⚠ Unnatural 5-star clustering detected</span>
        </div>
      </div>
    );
  }

  // Generic fallback
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100px' }}>
      {iconEl}
    </div>
  );
}

/* ─── Comparison table ───────────────────────────────── */
function ComparisonTable() {
  const features = [
    'Fake review detection (7 signals)',
    'Reddit community cross-check',
    'Price trend tracking',
    'Sentiment-rating mismatch detection',
    'Duplicate review detection',
    'Confidence-adjusted scoring',
    'Works on 4 platforms',
    'No account required',
    'Completely free',
    'Data stays in your browser',
  ];
  const tools = ['ReviewLens', 'Fakespot', 'ReviewMeta', 'Manual research'];
  const support: Record<string, boolean[]> = {
    'ReviewLens':      [true, true, true, true, true, true, true, true, true, true],
    'Fakespot':        [true, false, false, false, false, false, false, true, false, false],
    'ReviewMeta':      [true, false, false, false, false, false, false, true, true, false],
    'Manual research': [false, true, false, false, false, false, true, true, true, true],
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: 'var(--text-tertiary)', fontWeight: 500, borderBottom: '1px solid var(--border)' }}>
              Feature
            </th>
            {tools.map(t => (
              <th key={t} style={{
                textAlign: 'center',
                padding: '0.75rem 1rem',
                borderBottom: '1px solid var(--border)',
                fontWeight: t === 'ReviewLens' ? 700 : 500,
                color: t === 'ReviewLens' ? 'var(--accent)' : 'var(--text-secondary)',
              }}>
                {t === 'ReviewLens' && <span style={{ display: 'block', fontSize: '0.6rem', marginBottom: '2px' }}>👑</span>}
                {t}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((f, i) => (
            <tr key={f} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--surface-1)' }}>
              <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)' }}>{f}</td>
              {tools.map(t => (
                <td key={t} style={{ textAlign: 'center', padding: '0.75rem 1rem' }}>
                  {support[t][i]
                    ? <span style={{ color: '#22c55e', fontSize: '1rem' }}>✓</span>
                    : <span style={{ color: '#475569', fontSize: '1rem' }}>–</span>
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────── */
export default function Features() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const features: FeatureDetailProps[] = [
    {
      iconEl: <ShieldCheck size={28} color="#6366f1" />,
      title: 'Review Authenticity Score',
      tagline: 'Core Signal',
      description: 'Our scoring engine runs 7 independent checks on every product\'s reviews and combines them using compounding penalties — so multiple red flags stack exponentially, not just add up. The result is a 0–100 score with an A–F grade you can understand at a glance.',
      bullets: [
        'Verified vs. unverified purchase ratio weighting',
        'Sentiment-rating mismatch detection (5 stars but negative text = caught)',
        'Duplicate and near-duplicate review detection via text similarity',
        'Review text quality analysis beyond simple word count',
        'Compounding penalties — multiple red flags multiply together',
        'Confidence indicator for products with few reviews',
      ],
      platforms: ['Amazon', 'Walmart', 'eBay', 'Etsy'],
      accent: '#6366f1',
    },
    {
      iconEl: <RedditIcon size={28} />,
      title: 'Reddit Community Sentiment',
      tagline: 'Social Signal',
      description: 'While star ratings can be gamed, Reddit discussions rarely lie. ReviewLens searches across thousands of subreddits to find genuine community opinions — with smart relevance scoring that filters out unrelated posts and time-weighted sentiment that prioritises recent discussions.',
      bullets: [
        'Multi-subreddit search with word-boundary relevance scoring',
        '60+ spam subreddits blocked (deal sites, memes, affiliate posts)',
        'Product ID + brand + noun matching for precision',
        'Upvote-weighted sentiment — popular posts carry more influence',
        'Temporal weighting — recent posts matter more than old ones',
        'Direct links to source Reddit discussions',
      ],
      platforms: ['Amazon', 'Walmart', 'eBay', 'Etsy'],
      accent: '#f59e0b',
      reversed: true,
    },
    {
      iconEl: <DollarSign size={28} color="#22c55e" />,
      title: 'Price Trend Tracking',
      tagline: 'Price Signal',
      description: 'Ever wonder if that "50% off sale" is real? ReviewLens tracks the price every time you visit a product, building a history to expose artificial inflation — a common dark pattern where sellers inflate the "original" price to make discounts look bigger.',
      bullets: [
        'Automatic price capture on every page visit',
        'Up to 90 days / 60 data points per product',
        'Visual sparkline chart with min / avg / high stats',
        '7-day trend direction and percentage change',
        'Multi-currency detection (USD, EUR, GBP, AUD, + 20 more)',
        'All data stored in your browser — never on our servers',
      ],
      platforms: ['Amazon', 'Walmart', 'eBay', 'Etsy'],
      accent: '#22c55e',
    },
    {
      iconEl: <Zap size={28} color="#ef4444" />,
      title: 'Review Burst Detection',
      tagline: 'Timing Signal',
      description: 'Fake review farms typically operate in bursts — flooding a product with dozens of 5-star reviews within a 24–48 hour window. ReviewLens analyses the temporal distribution of reviews and flags statistically abnormal spikes, with recent bursts weighted more heavily than older ones.',
      bullets: [
        'Chronological review velocity charting',
        'Statistical outlier detection for review clusters',
        'Severity rating: low / medium / high',
        'Temporal decay — recent bursts flagged more aggressively',
        'Multi-window analysis (daily, weekly, monthly)',
      ],
      platforms: ['Amazon', 'Walmart', 'eBay', 'Etsy'],
      accent: '#ef4444',
      reversed: true,
    },
    {
      iconEl: <BarChart size={28} color="#8b5cf6" />,
      title: 'Rating Distribution Analysis',
      tagline: 'Pattern Signal',
      description: 'Real products have a natural bell-curve distribution of ratings. When 85%+ of ratings cluster at 5 stars with almost no 2 or 3 star reviews, that\'s a red flag. ReviewLens detects these unnatural patterns and flags them clearly.',
      bullets: [
        'Full 1–5 star distribution visualisation',
        'Suspicious clustering threshold detection',
        'Bimodal distribution analysis (love/hate splits)',
        'Comparison against category averages',
        'Historical distribution drift detection',
      ],
      platforms: ['Amazon', 'Walmart', 'eBay', 'Etsy'],
      accent: '#8b5cf6',
    },
  ];

  return (
    <main style={{ paddingTop: '5rem' }}>
      {/* Hero */}
      <section style={{ padding: '5rem 1.5rem 4rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <FadeIn>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.4rem 1rem', borderRadius: '2rem',
            background: 'var(--accent-subtle)', border: '1px solid var(--accent-border)',
            fontSize: '0.8rem', color: 'var(--accent)', marginBottom: '1.5rem',
          }}>
            <Sparkles size={14} /> How ReviewLens works
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.25rem' }}>
            Seven signals.{' '}
            <span className="gradient-text">One verdict.</span>
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            ReviewLens runs 7 review checks, cross-references with Reddit community sentiment,
            and tracks price history — giving you a complete picture sellers don't want you to see.
            All scoring is transparent, compounding, and confidence-adjusted.
          </p>
        </FadeIn>
      </section>

      {/* Grade reference — linked from the in-page overlay "What does this mean?" */}
      <section
        id="grades"
        style={{ padding: '1rem 1.5rem 3rem', maxWidth: '900px', margin: '0 auto', scrollMarginTop: '5rem' }}
      >
        <FadeIn>
          <div className="card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              How the grade is calculated
            </h2>
            <p style={{ color: 'var(--text-secondary, var(--sub))', marginBottom: '1.5rem', fontSize: 15 }}>
              Every product gets a 0–100 score blending{' '}
              <strong style={{ color: 'var(--accent)' }}>review authenticity (70%)</strong>{' '}
              and <strong style={{ color: '#f59e0b' }}>Reddit community sentiment (30%)</strong>.
              The letter grade is a quick read on that blended score.
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '0.75rem',
              }}
            >
              {[
                { grade: 'A', range: '80–100', color: '#22c55e', label: 'Trustworthy' },
                { grade: 'B', range: '65–79',  color: '#84cc16', label: 'Mostly solid' },
                { grade: 'C', range: '50–64',  color: '#f59e0b', label: 'Be cautious' },
                { grade: 'D', range: '35–49',  color: '#ef4444', label: 'Likely suspect' },
                { grade: 'F', range: '0–34',   color: '#dc2626', label: 'Avoid' },
              ].map(g => (
                <div
                  key={g.grade}
                  style={{
                    padding: '1rem',
                    textAlign: 'center',
                    border: `1px solid ${g.color}33`,
                    background: `${g.color}0a`,
                    borderRadius: 12,
                  }}
                >
                  <div style={{ fontSize: 26, fontWeight: 800, color: g.color, lineHeight: 1 }}>{g.grade}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>
                    {g.range}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--sub)', marginTop: 6 }}>{g.label}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Feature sections */}
      <section style={{ padding: '2rem 1.5rem 6rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={i * 50}>
              <FeatureDetail {...f} />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section style={{ padding: '4rem 1.5rem 6rem', maxWidth: '900px', margin: '0 auto' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 700, marginBottom: '0.75rem' }}>
              How we compare
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              ReviewLens is the only free tool that combines 7 review signals, Reddit cross-checking, and price tracking in one place.
            </p>
          </div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <ComparisonTable />
          </div>
        </FadeIn>
      </section>

      {/* CTA */}
      <section style={{ padding: '5rem 1.5rem', textAlign: 'center' }}>
        <FadeIn>
          <div className="card" style={{
            maxWidth: '600px',
            margin: '0 auto',
            padding: '3rem',
            background: 'linear-gradient(135deg, var(--accent-subtle) 0%, transparent 60%)',
            borderColor: 'var(--accent-border)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Search size={40} color="#6366f1" />
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              Ready to shop smarter?
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Add ReviewLens to Chrome for free — no account, no data collection, no catch.
            </p>
            <a
              href="https://chromewebstore.google.com/detail/reviewlens-fake-review-de/ncneomnblmiefoplgpcpkjijkhpafkei"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
              </svg>
              Add to Chrome — It's Free
            </a>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
