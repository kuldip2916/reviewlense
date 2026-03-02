import { useEffect, useRef, useState } from 'react';

/* ── Animated Score Ring ──────────────────────────────────── */
function ScoreRing({ score, size = 110, animate = false }: { score: number; size?: number; animate?: boolean }) {
  const [displayed, setDisplayed] = useState(animate ? 0 : score);
  const color = score >= 80 ? '#22c55e' : score >= 60 ? '#84cc16' : score >= 40 ? '#f59e0b' : '#ef4444';
  const grade = score >= 80 ? 'A' : score >= 65 ? 'B' : score >= 50 ? 'C' : score >= 35 ? 'D' : 'F';
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const filled = (displayed / 100) * circ;

  useEffect(() => {
    if (!animate) return;
    let start: number | null = null;
    const duration = 1400;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(ease * score));
      if (progress < 1) requestAnimationFrame(step);
    };
    const timeout = setTimeout(() => requestAnimationFrame(step), 300);
    return () => clearTimeout(timeout);
  }, [score, animate]);

  return (
    <svg width={size} height={size} style={{ display: 'block' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={8}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={8}
        strokeLinecap="round" strokeDasharray={`${filled} ${circ}`}
        transform={`rotate(-90 ${size/2} ${size/2})`}
        style={{ transition: 'stroke-dasharray 0.05s linear' }}
      />
      <text x={size/2} y={size/2 - 7} textAnchor="middle" dominantBaseline="middle"
        fill={color} fontSize={28} fontWeight={800} fontFamily="Inter,sans-serif">{grade}</text>
      <text x={size/2} y={size/2 + 14} textAnchor="middle" dominantBaseline="middle"
        fill={color} fontSize={11} opacity={0.7} fontFamily="Inter,sans-serif">{displayed}/100</text>
    </svg>
  );
}

/* ── Floating extension popup mockup ─────────────────────── */
function ExtensionMockup({ score, flags, platform, price }: {
  score: number;
  flags: { type: string; sev: 'high' | 'medium' | 'low'; label: string }[];
  platform: string;
  price: string;
}) {
  const accent = platform === 'Amazon' ? '#f59e0b' : platform === 'Walmart' ? '#0071CE' : platform === 'eBay' ? '#e53238' : '#f1641e';
  return (
    <div style={{
      width: 320, background: '#0b0b18', borderRadius: 16,
      border: '1px solid rgba(255,255,255,0.08)',
      boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.15)',
      overflow: 'hidden', fontFamily: 'Inter,sans-serif',
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg,#1a1040,#0f0f22)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '12px 14px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 7,
            background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13,
          }}>🔍</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, color: '#f1f5f9' }}>ReviewLens</div>
            <div style={{ fontSize: 9, color: '#64748b' }}>Fake Review Detector</div>
          </div>
        </div>
        <span style={{
          fontSize: 9, fontWeight: 700, color: accent,
          background: `${accent}18`, border: `1px solid ${accent}30`,
          borderRadius: 20, padding: '2px 8px',
        }}>{platform}</span>
      </div>

      <div style={{ padding: 14 }}>
        {/* Score row */}
        <div style={{
          display: 'flex', gap: 12, alignItems: 'center',
          background: 'linear-gradient(135deg,#12121f,#1a1030)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 12, padding: 12, marginBottom: 12,
        }}>
          <ScoreRing score={score} size={80} animate />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 9, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>
              Overall Trust Score
            </div>
            {[
              { label: 'Review Authenticity', val: Math.round(score * 0.95) },
              { label: 'Reddit Sentiment',    val: Math.round(score * 1.1 > 100 ? 100 : score * 1.1) },
            ].map(b => (
              <div key={b.label} style={{ marginBottom: 6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  <span style={{ fontSize: 9, color: '#64748b' }}>{b.label}</span>
                  <span style={{ fontSize: 9, fontWeight: 700, color: '#22c55e' }}>{b.val}</span>
                </div>
                <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 99 }}>
                  <div style={{ height: '100%', width: `${b.val}%`, background: '#22c55e', borderRadius: 99 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flags */}
        {flags.map((f, i) => (
          <div key={i} style={{
            display: 'flex', gap: 8, alignItems: 'flex-start',
            background: f.sev === 'high' ? 'rgba(239,68,68,0.07)' : f.sev === 'medium' ? 'rgba(245,158,11,0.07)' : 'rgba(34,197,94,0.06)',
            border: `1px solid ${f.sev === 'high' ? 'rgba(239,68,68,0.2)' : f.sev === 'medium' ? 'rgba(245,158,11,0.2)' : 'rgba(34,197,94,0.18)'}`,
            borderRadius: 8, padding: '8px 10px', marginBottom: 6,
          }}>
            <span style={{ fontSize: 11, color: f.sev === 'high' ? '#ef4444' : f.sev === 'medium' ? '#f59e0b' : '#22c55e' }}>
              {f.sev === 'high' || f.sev === 'medium' ? '✕' : '✓'}
            </span>
            <span style={{ fontSize: 11, color: f.sev === 'high' ? '#ef4444' : f.sev === 'medium' ? '#f59e0b' : '#22c55e', fontWeight: 600 }}>
              {f.label}
            </span>
          </div>
        ))}

        {/* Price */}
        <div style={{
          marginTop: 8, padding: '10px 12px',
          background: '#0b131e', border: '1px solid #1a2535', borderRadius: 10,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <div style={{ fontSize: 8, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 2 }}>Price History</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#f1f5f9' }}>{price}</div>
          </div>
          <span style={{
            fontSize: 10, fontWeight: 700, color: '#22c55e',
            background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)',
            borderRadius: 99, padding: '3px 9px',
          }}>↓ Dropped</span>
        </div>
      </div>
    </div>
  );
}

/* ── Step card ────────────────────────────────────────────── */
function Step({ n, icon, title, desc }: { n: number; icon: string; title: string; desc: string }) {
  return (
    <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
      <div style={{ flexShrink: 0 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 14,
          background: 'linear-gradient(135deg,rgba(99,102,241,0.2),rgba(139,92,246,0.2))',
          border: '1px solid rgba(99,102,241,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22,
        }}>{icon}</div>
      </div>
      <div>
        <div style={{ fontSize: 11, color: '#6366f1', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
          Step {n}
        </div>
        <div style={{ fontSize: 17, fontWeight: 700, color: '#f1f5f9', marginBottom: 6 }}>{title}</div>
        <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7 }}>{desc}</div>
      </div>
    </div>
  );
}

/* ── Feature card ─────────────────────────────────────────── */
function FeatureCard({ icon, title, desc, tag, color }: {
  icon: string; title: string; desc: string; tag: string; color: string;
}) {
  return (
    <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg,${color}00,${color},${color}00)`,
      }} />
      <div style={{
        width: 44, height: 44, borderRadius: 12, marginBottom: 16,
        background: `${color}15`, border: `1px solid ${color}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
      }}>{icon}</div>
      <div style={{
        display: 'inline-block', fontSize: 9, fontWeight: 700, color, textTransform: 'uppercase',
        letterSpacing: '0.1em', background: `${color}12`, border: `1px solid ${color}25`,
        borderRadius: 99, padding: '2px 9px', marginBottom: 10,
      }}>{tag}</div>
      <div style={{ fontSize: 17, fontWeight: 700, color: '#f1f5f9', marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7 }}>{desc}</div>
    </div>
  );
}

/* ── Platform pill ────────────────────────────────────────── */
function PlatformPill({ name, color, icon, features }: { name: string; color: string; icon: string; features: string[] }) {
  return (
    <div className="card" style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 36, marginBottom: 12 }}>{icon}</div>
      <div style={{
        fontSize: 14, fontWeight: 700, color,
        background: `${color}15`, border: `1px solid ${color}30`,
        borderRadius: 99, padding: '4px 14px', display: 'inline-block', marginBottom: 14,
      }}>{name}</div>
      <ul style={{ listStyle: 'none', textAlign: 'left' }}>
        {features.map(f => (
          <li key={f} style={{ fontSize: 13, color: '#64748b', padding: '4px 0', display: 'flex', gap: 6, alignItems: 'center' }}>
            <span style={{ color: '#22c55e', fontWeight: 700 }}>✓</span> {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Signal bar ───────────────────────────────────────────── */
function SignalBar({ label, value, color }: { label: string; value: number; color: string }) {
  const [w, setW] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setW(value); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);
  return (
    <div ref={ref} style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
        <span style={{ fontSize: 13, color: '#94a3b8' }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color }}>{value}%</span>
      </div>
      <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${w}%`, background: color, borderRadius: 99,
          transition: 'width 1s cubic-bezier(0.4,0,0.2,1)',
        }} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   HOME PAGE
   ══════════════════════════════════════════════════════════ */
export default function Home() {
  const [activeProduct, setActiveProduct] = useState(0);

  const products = [
    {
      label: 'Amazon', platform: 'Amazon', score: 34, price: '$24.99',
      flags: [
        { type: 'burst',      sev: 'high'   as const, label: 'Sudden review spike detected' },
        { type: 'cluster',    sev: 'medium' as const, label: '94% five-star ratings — unusual' },
        { type: 'reddit',     sev: 'low'    as const, label: 'No Reddit discussions found' },
      ],
    },
    {
      label: 'Walmart', platform: 'Walmart', score: 78, price: '$39.97',
      flags: [
        { type: 'verified',   sev: 'low'    as const, label: '82% verified purchase rate' },
        { type: 'natural',    sev: 'low'    as const, label: 'Natural star distribution' },
        { type: 'reddit',     sev: 'low'    as const, label: 'Positive Reddit sentiment' },
      ],
    },
    {
      label: 'eBay',   platform: 'eBay',   score: 55, price: '$12.50',
      flags: [
        { type: 'unverified', sev: 'medium' as const, label: '61% unverified purchases' },
        { type: 'generic',    sev: 'low'    as const, label: 'Many short generic reviews' },
        { type: 'sentiment',  sev: 'low'    as const, label: 'Mixed Reddit sentiment' },
      ],
    },
    {
      label: 'Etsy',   platform: 'Etsy',   score: 91, price: '$18.00',
      flags: [
        { type: 'verified',   sev: 'low'    as const, label: '100% verified purchases' },
        { type: 'natural',    sev: 'low'    as const, label: 'Natural rating distribution' },
        { type: 'reddit',     sev: 'low'    as const, label: 'Enthusiastic Reddit community' },
      ],
    },
  ];

  const current = products[activeProduct];

  return (
    <main>
      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        padding: '120px 24px 80px',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 64, alignItems: 'center',
          }}>
            {/* Left: copy */}
            <div style={{ animation: 'fadeUp 0.7s ease both' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontSize: 12, fontWeight: 700, color: '#6366f1',
                background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)',
                borderRadius: 99, padding: '5px 14px', marginBottom: 24, letterSpacing: '0.06em', textTransform: 'uppercase',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'pulse-ring 1.5s ease infinite' }} />
                Free Chrome Extension
              </div>

              <h1 style={{
                fontSize: 'clamp(36px, 6vw, 64px)',
                fontWeight: 900, lineHeight: 1.08,
                letterSpacing: '-0.03em', marginBottom: 24,
              }}>
                Don't get fooled<br />
                by <span className="gradient-text">fake reviews</span>
              </h1>

              <p style={{ fontSize: 18, color: '#64748b', lineHeight: 1.75, marginBottom: 36, maxWidth: 480 }}>
                ReviewLens instantly detects manipulation patterns, suspicious rating clusters, and fake buyer behavior — then cross-checks with real Reddit community sentiment.
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="#install" className="btn-primary" style={{ fontSize: 15 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                  </svg>
                  Add to Chrome — It's Free
                </a>
                <a href="#how-it-works" className="btn-secondary">
                  See how it works →
                </a>
              </div>

              {/* Trust line */}
              <div style={{ display: 'flex', gap: 20, marginTop: 32, flexWrap: 'wrap' }}>
                {['No account needed', 'No data collected', '100% free'].map(t => (
                  <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#4b5563' }}>
                    <span style={{ color: '#22c55e', fontWeight: 700 }}>✓</span> {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: interactive demo */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, animation: 'fadeUp 0.7s 0.15s ease both' }}>
              {/* Platform tabs */}
              <div style={{
                display: 'flex', gap: 4,
                background: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: 4,
                border: '1px solid rgba(255,255,255,0.07)',
              }}>
                {products.map((p, i) => {
                  const accent = p.platform === 'Amazon' ? '#f59e0b' : p.platform === 'Walmart' ? '#0071CE' : p.platform === 'eBay' ? '#e53238' : '#f1641e';
                  return (
                    <button key={p.label} onClick={() => setActiveProduct(i)} style={{
                      padding: '7px 14px', borderRadius: 8, border: 'none', fontSize: 12, fontWeight: 700,
                      cursor: 'pointer', transition: 'all 0.2s',
                      background: activeProduct === i ? `${accent}18` : 'transparent',
                      color: activeProduct === i ? accent : '#4b5563',
                      outline: activeProduct === i ? `1px solid ${accent}35` : 'none',
                    }}>
                      {p.label}
                    </button>
                  );
                })}
              </div>

              {/* Popup mockup */}
              <div style={{ animation: 'float 4s ease-in-out infinite', filter: 'drop-shadow(0 24px 60px rgba(99,102,241,0.2))' }}>
                <ExtensionMockup key={activeProduct} {...current} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATS BAR ═════════════════════════════════════════ */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '20px 24px' }}>
        <div style={{
          maxWidth: 1000, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 24, textAlign: 'center',
        }}>
          {[
            { val: '4',     label: 'Platforms Supported' },
            { val: '5',     label: 'Detection Signals' },
            { val: 'Live',  label: 'Reddit Sentiment' },
            { val: '100%',  label: 'Free Forever' },
          ].map(s => (
            <div key={s.label}>
              <div className="shimmer-text" style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 4 }}>{s.val}</div>
              <div style={{ fontSize: 12, color: '#374151', fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ HOW IT WORKS ══════════════════════════════════════ */}
      <section id="how-it-works" style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="section-tag">How It Works</div>
            <h2 className="section-title">Analysis in seconds,<br /><span className="gradient-text">not hours</span></h2>
            <p className="section-sub" style={{ margin: '0 auto' }}>
              ReviewLens works silently in the background. One click is all it takes.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 40 }}>
            <Step n={1} icon="🌐" title="Navigate to any product"
              desc="Browse Amazon, Walmart, eBay, or Etsy as you normally would. ReviewLens detects product pages automatically." />
            <Step n={2} icon="🔍" title="Click the extension icon"
              desc="Hit Analyze and ReviewLens fetches review data, checks Reddit for real discussion, and runs 5 AI-powered detection signals." />
            <Step n={3} icon="📊" title="See your trust score"
              desc="Get a clear A–F grade with a detailed breakdown of every red flag found — and a price trend history as you revisit over time." />
          </div>
        </div>
      </section>

      {/* ══ FEATURES ══════════════════════════════════════════ */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-tag">Detection Engine</div>
            <h2 className="section-title">Five signals.<br /><span className="gradient-text">One verdict.</span></h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            <FeatureCard
              icon="📈" color="#ef4444" tag="Signal 1"
              title="Review Burst Detection"
              desc="Spots unnatural spikes in review volume — a classic sign of sellers buying fake reviews in bulk overnight."
            />
            <FeatureCard
              icon="⭐" color="#f59e0b" tag="Signal 2"
              title="Rating Clustering Analysis"
              desc="Flags products where 90%+ of ratings are 5-stars with almost no 2–3 star reviews — an impossible natural distribution."
            />
            <FeatureCard
              icon="✅" color="#22c55e" tag="Signal 3"
              title="Verified Purchase Ratio"
              desc="Calculates what proportion of reviews actually came from verified buyers — unverified reviews carry almost no trust weight."
            />
            <FeatureCard
              icon="💬" color="#6366f1" tag="Signal 4"
              title="Generic Review Filter"
              desc="Detects suspiciously short, templated reviews — a hallmark of copy-paste review farms that flood products with fake praise."
            />
            <FeatureCard
              icon="🟠" color="#f97316" tag="Signal 5"
              title="Reddit Community Sentiment"
              desc="Searches Reddit for real, organic discussions about the product. Real buyers talk freely on Reddit — fake reviews don't follow them there."
            />
            <FeatureCard
              icon="💰" color="#06b6d4" tag="Bonus"
              title="Price History Tracking"
              desc="Records the price every time you visit a product. Over time, reveals whether that 'sale' is genuine or an inflated fake discount."
            />
          </div>
        </div>
      </section>

      {/* ══ SIGNAL DEMO ════════════════════════════════════════ */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 48, alignItems: 'center',
        }}>
          {/* Left: score visual */}
          <div>
            <div className="section-tag">Live Analysis</div>
            <h2 className="section-title" style={{ marginBottom: 16 }}>
              See what's<br /><span className="gradient-text">really going on</span>
            </h2>
            <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.7, marginBottom: 28 }}>
              Every signal is weighted and combined into a single, honest trust score. No guesswork — just data.
            </p>

            <div style={{
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 16, padding: 24,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <ScoreRing score={34} size={90} animate />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#ef4444', marginBottom: 4 }}>⚠ Suspicious Product</div>
                  <div style={{ fontSize: 12, color: '#4b5563' }}>3 red flags detected · Low trust</div>
                </div>
              </div>
              <SignalBar label="Review Authenticity" value={28} color="#ef4444" />
              <SignalBar label="Verified Purchases"  value={41} color="#f59e0b" />
              <SignalBar label="Reddit Sentiment"    value={50} color="#f59e0b" />
              <SignalBar label="Rating Distribution" value={18} color="#ef4444" />
            </div>
          </div>

          {/* Right: genuine product */}
          <div>
            <div style={{
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(34,197,94,0.15)',
              borderRadius: 16, padding: 24, marginBottom: 20,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <ScoreRing score={91} size={90} animate />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#22c55e', marginBottom: 4 }}>✓ Highly Trustworthy</div>
                  <div style={{ fontSize: 12, color: '#4b5563' }}>All signals pass · Buy with confidence</div>
                </div>
              </div>
              <SignalBar label="Review Authenticity" value={95} color="#22c55e" />
              <SignalBar label="Verified Purchases"  value={92} color="#22c55e" />
              <SignalBar label="Reddit Sentiment"    value={88} color="#22c55e" />
              <SignalBar label="Rating Distribution" value={87} color="#84cc16" />
            </div>
            <p style={{ fontSize: 13, color: '#374151', textAlign: 'center', lineHeight: 1.6 }}>
              Same category, different trust scores.<br />ReviewLens tells you which one to buy.
            </p>
          </div>
        </div>
      </section>

      {/* ══ PLATFORMS ═════════════════════════════════════════ */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-tag">Platform Support</div>
            <h2 className="section-title">Works everywhere<br /><span className="gradient-text">you shop</span></h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
            <PlatformPill name="Amazon" color="#f59e0b" icon="📦" features={['ASIN detection', 'Review burst', 'Rating clustering', 'Verified ratio', 'Reddit + price']} />
            <PlatformPill name="Walmart" color="#0071CE" icon="🛒" features={['Item ID detection', 'Review API data', 'Star distribution', 'Verified ratio', 'Reddit + price']} />
            <PlatformPill name="eBay" color="#e53238" icon="🏷️" features={['Item ID detection', 'Catalog reviews', 'Rating clustering', 'Generic filter', 'Reddit + price']} />
            <PlatformPill name="Etsy" color="#f1641e" icon="🎨" features={['Listing ID detect', 'Verified (all)', 'Rating histogram', 'Generic filter', 'Reddit + price']} />
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ══════════════════════════════════════════ */}
      <section style={{ padding: '0 24px 120px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            background: 'linear-gradient(135deg,rgba(99,102,241,0.12),rgba(139,92,246,0.08))',
            border: '1px solid rgba(99,102,241,0.2)',
            borderRadius: 28, padding: '64px 40px',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Glow orb */}
            <div style={{
              position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)',
              width: 200, height: 200, borderRadius: '50%',
              background: 'radial-gradient(circle,rgba(99,102,241,0.2),transparent 70%)',
              pointerEvents: 'none',
            }} />

            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <h2 style={{
              fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 900,
              letterSpacing: '-0.02em', marginBottom: 16, lineHeight: 1.15,
            }}>
              Stop trusting<br /><span className="gradient-text">fake 5-star reviews</span>
            </h2>
            <p style={{ fontSize: 16, color: '#64748b', marginBottom: 36, lineHeight: 1.7 }}>
              Install ReviewLens for free and shop with confidence. Available on Chrome — works on Amazon, Walmart, eBay, and Etsy.
            </p>
            <a href="#install" className="btn-primary" style={{ fontSize: 16, padding: '16px 36px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
              </svg>
              Add to Chrome — Free
            </a>
            <div style={{ fontSize: 12, color: '#374151', marginTop: 16 }}>
              No account · No subscription · No data collected
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
