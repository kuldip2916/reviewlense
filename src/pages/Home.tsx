import { useEffect, useRef, useState } from 'react';
import { ShieldCheck, Search, Globe, TrendingUp, Star, CheckCircle, BarChart, AlertTriangle, Zap, DollarSign, Type, Copy, MessageCircle, Lock, Target, ArrowUpCircle, Clock, Filter, Lightbulb, Frown, Hourglass, RedditIcon, Eye, Scale } from '../components/Icons';

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
interface MockRedditPost {
  subreddit: string;
  title: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  url: string;
}
interface MockupProps {
  score: number;
  flags: { type: string; sev: 'high' | 'medium' | 'low'; label: string }[];
  platform: string;
  price: string;
  reddit: {
    sentimentScore: number;
    postCount: number;
    topSubreddits: string[];
    posts: MockRedditPost[];
  };
}

function ExtensionMockup({ score, flags, platform, price, reddit }: MockupProps) {
  const accent = platform === 'Amazon' ? '#f59e0b' : platform === 'Walmart' ? '#0071CE' : platform === 'eBay' ? '#e53238' : '#f1641e';
  const sentColor = reddit.sentimentScore >= 70 ? '#22c55e' : reddit.sentimentScore >= 40 ? '#f59e0b' : '#ef4444';
  const sentLabel = reddit.sentimentScore >= 70 ? 'Mostly positive' : reddit.sentimentScore >= 40 ? 'Mixed' : 'Mostly negative';

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
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Search size={16} color="#fff" />
          </div>
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
              { label: 'Reddit Sentiment',    val: reddit.sentimentScore },
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

        {/* Reddit Community Sentiment */}
        <div style={{
          marginTop: 8, background: '#0b0f18', border: '1px solid #1a2535',
          borderRadius: 10, overflow: 'hidden',
        }}>
          {/* Reddit header */}
          <div style={{
            padding: '8px 12px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            borderBottom: '1px solid #1a2535',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <RedditIcon size={14} />
              <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8' }}>Reddit Sentiment</span>
            </div>
            <div style={{
              fontSize: 13, fontWeight: 700, color: sentColor,
              background: `${sentColor}18`, border: `1px solid ${sentColor}30`,
              borderRadius: 6, padding: '2px 6px', lineHeight: 1.3,
            }}>
              {reddit.sentimentScore}<span style={{ fontSize: 9, color: '#475569', fontWeight: 400 }}>/100</span>
            </div>
          </div>

          <div style={{ padding: '8px 12px' }}>
            {/* Sentiment label + bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 10, fontWeight: 600, color: sentColor }}>{sentLabel}</span>
              <span style={{ fontSize: 9, color: '#475569' }}>{reddit.postCount} discussions</span>
            </div>
            <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 99, marginBottom: 8, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${reddit.sentimentScore}%`, background: sentColor, borderRadius: 99 }} />
            </div>

            {/* Subreddit pills */}
            {reddit.topSubreddits.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 8 }}>
                {reddit.topSubreddits.map(sub => (
                  <span key={sub} style={{
                    fontSize: 9, color: '#818cf8', fontWeight: 600,
                    background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)',
                    borderRadius: 20, padding: '1px 7px',
                  }}>r/{sub}</span>
                ))}
              </div>
            )}

            {/* Top posts with links */}
            {reddit.posts.slice(0, 3).map((post, i) => {
              const pColor = post.sentiment === 'positive' ? '#22c55e' : post.sentiment === 'negative' ? '#ef4444' : '#475569';
              return (
                <div key={i} style={{
                  padding: '6px 0',
                  borderTop: i === 0 ? '1px solid #1a2535' : undefined,
                  borderBottom: i < Math.min(reddit.posts.length, 3) - 1 ? '1px solid #1a2535' : undefined,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 2 }}>
                    <span style={{ fontSize: 9, color: '#818cf8', fontWeight: 600 }}>r/{post.subreddit}</span>
                    <span style={{ fontSize: 8, color: pColor, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{post.sentiment}</span>
                    {post.score > 0 && (
                      <span style={{ fontSize: 8, color: '#475569', marginLeft: 'auto' }}>↑{post.score}</span>
                    )}
                  </div>
                  <div style={{
                    fontSize: 10, color: '#94a3b8', lineHeight: 1.3,
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                  }}>
                    {post.title}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

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
function Step({ n, iconEl, title, desc }: { n: number; iconEl: React.ReactNode; title: string; desc: string }) {
  return (
    <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
      <div style={{ flexShrink: 0 }}>
        <div style={{
          width: 48, height: 48, borderRadius: 14,
          background: 'linear-gradient(135deg,rgba(99,102,241,0.2),rgba(139,92,246,0.2))',
          border: '1px solid rgba(99,102,241,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{iconEl}</div>
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
function FeatureCard({ iconEl, title, desc, tag, color }: {
  iconEl: React.ReactNode; title: string; desc: string; tag: string; color: string;
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
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{iconEl}</div>
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
function PlatformPill({ name, color, features }: { name: string; color: string; features: string[] }) {
  return (
    <div className="card" style={{ textAlign: 'center' }}>
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
   REDDIT CROSS-CHECK SECTION
   ══════════════════════════════════════════════════════════ */

const redditResults = [
  {
    subreddit: 'r/BuyItForLife',
    title: 'Finally found a water bottle that actually lasts - 3 years and zero issues',
    excerpt: 'Been using this for hiking and daily commute. The seal is still perfect, no rust, no smell. Honestly the best $28 I\'ve spent.',
    upvotes: 2847,
    comments: 143,
    sentiment: 'positive' as const,
    timeAgo: '8 months ago',
    relevanceScore: 97,
  },
  {
    subreddit: 'r/Frugal',
    title: 'This product is genuinely excellent - bought three as gifts',
    excerpt: 'Not an ad, just genuinely impressed. My whole family uses these now. Way better than the branded ones at twice the price.',
    upvotes: 1204,
    comments: 67,
    sentiment: 'positive' as const,
    timeAgo: '5 months ago',
    relevanceScore: 91,
  },
  {
    subreddit: 'r/mildlyinfuriating',
    title: 'Why does the lid on this thing crack after 6 months? Third time replacing it.',
    excerpt: 'Love the bottle but the lid design is genuinely terrible. Every single one I\'ve had has cracked at the hinge. Check the 1-star reviews - all the same issue.',
    upvotes: 889,
    comments: 214,
    sentiment: 'negative' as const,
    timeAgo: '2 months ago',
    relevanceScore: 84,
  },
  {
    subreddit: 'r/ZeroWaste',
    title: 'Switched to this from plastic - highly recommend for eco-conscious folks',
    excerpt: 'Durable, easy to clean, and the company uses recycled packaging. A few people in comments mentioned the lid issue but mine has been fine so far.',
    upvotes: 632,
    comments: 41,
    sentiment: 'positive' as const,
    timeAgo: '4 months ago',
    relevanceScore: 78,
  },
];

function RedditCard({ post, delay }: { post: typeof redditResults[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  const isPos = post.sentiment === 'positive';

  return (
    <div ref={ref} style={{
      background: 'var(--surface-1)',
      border: `1px solid ${isPos ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)'}`,
      borderRadius: 14,
      padding: '1.25rem 1.5rem',
      transition: 'border-color 0.2s, transform 0.2s',
      cursor: 'default',
    }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = isPos ? 'rgba(34,197,94,0.4)' : 'rgba(239,68,68,0.4)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = isPos ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', gap: 8, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Reddit alien icon */}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="#ff4500" style={{ flexShrink: 0 }}>
            <circle cx="10" cy="10" r="10" fill="#ff4500"/>
            <path fill="white" d="M16.67 10a1.46 1.46 0 00-2.47-1 7.12 7.12 0 00-3.85-1.23l.65-3.08 2.13.45a1 1 0 101.07-1 1 1 0 00-.96.68l-2.38-.5a.16.16 0 00-.19.12l-.73 3.44a7.14 7.14 0 00-3.89 1.23 1.46 1.46 0 10-1.61 2.39 2.87 2.87 0 000 .44c0 2.24 2.61 4.06 5.83 4.06s5.83-1.82 5.83-4.06a2.87 2.87 0 000-.44 1.46 1.46 0 00.47-1zm-9.07 1.23a1 1 0 111 1 1 1 0 01-1-1zm5.56 2.65a3.47 3.47 0 01-2.32.68 3.47 3.47 0 01-2.32-.68.17.17 0 01.23-.23 3.14 3.14 0 002.09.55 3.14 3.14 0 002.09-.55.17.17 0 01.23.23zm-.22-1.65a1 1 0 111-1 1 1 0 01-1 1z"/>
          </svg>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#ff6314' }}>{post.subreddit}</span>
          <span style={{ fontSize: 12, color: '#475569' }}>· {post.timeAgo}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 20,
            background: isPos ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
            color: isPos ? '#22c55e' : '#ef4444',
            border: `1px solid ${isPos ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)'}`,
          }}>
            {isPos ? '▲ Positive' : '▼ Critical'}
          </span>
          <span style={{ fontSize: 11, color: '#475569', background: 'var(--surface-2)', padding: '3px 7px', borderRadius: 20 }}>
            {post.relevanceScore}% match
          </span>
        </div>
      </div>

      {/* Title */}
      <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f1f5f9', marginBottom: '0.5rem', lineHeight: 1.4 }}>
        {post.title}
      </h4>

      {/* Excerpt */}
      <p style={{ fontSize: '0.825rem', color: '#64748b', lineHeight: 1.6, marginBottom: '0.875rem' }}>
        "{post.excerpt}"
      </p>

      {/* Footer stats */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#475569', fontSize: 12 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 19V6M5 12l7-7 7 7"/>
          </svg>
          <span style={{ fontWeight: 600, color: '#94a3b8' }}>{post.upvotes.toLocaleString()}</span>
          <span>upvotes</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#475569', fontSize: 12 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span>{post.comments} comments</span>
        </div>
      </div>
    </div>
  );
}

function RedditSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const positiveCount = redditResults.filter(r => r.sentiment === 'positive').length;
  const negativeCount = redditResults.filter(r => r.sentiment === 'negative').length;
  const totalUpvotes = redditResults.reduce((s, r) => s + r.upvotes, 0);
  const sentimentScore = Math.round((positiveCount / redditResults.length) * 100);

  return (
    <section style={{ padding: '0 24px 100px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Section header */}
        <div ref={headerRef} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap' }}>
          <div>
            <div className="section-tag" style={{ display: 'inline-block', marginBottom: 16 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 20 20" fill="#ff4500">
                  <circle cx="10" cy="10" r="10" fill="#ff4500"/>
                  <path fill="white" d="M16.67 10a1.46 1.46 0 00-2.47-1 7.12 7.12 0 00-3.85-1.23l.65-3.08 2.13.45a1 1 0 101.07-1 1 1 0 00-.96.68l-2.38-.5a.16.16 0 00-.19.12l-.73 3.44a7.14 7.14 0 00-3.89 1.23 1.46 1.46 0 10-1.61 2.39 2.87 2.87 0 000 .44c0 2.24 2.61 4.06 5.83 4.06s5.83-1.82 5.83-4.06a2.87 2.87 0 000-.44 1.46 1.46 0 00.47-1zm-9.07 1.23a1 1 0 111 1 1 1 0 01-1-1zm5.56 2.65a3.47 3.47 0 01-2.32.68 3.47 3.47 0 01-2.32-.68.17.17 0 01.23-.23 3.14 3.14 0 002.09.55 3.14 3.14 0 002.09-.55.17.17 0 01.23.23zm-.22-1.65a1 1 0 111-1 1 1 0 01-1 1z"/>
                </svg>
                Reddit Cross-Check
              </span>
            </div>
            <h2 className="section-title">
              Real people.<br />
              <span className="gradient-text">Real opinions.</span>
            </h2>
            <p className="section-sub" style={{ marginTop: 12, maxWidth: 520 }}>
              While star ratings can be gamed, Reddit discussions rarely lie. ReviewLens scans thousands of subreddits to surface what the community <em>actually</em> thinks - the good and the bad.
            </p>
          </div>

          {/* Sentiment summary card */}
          <div style={{
            background: 'var(--surface-1)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            padding: '1.5rem 2rem',
            minWidth: 220,
            flexShrink: 0,
          }}>
            <div style={{ fontSize: 12, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 12 }}>
              Analysis summary
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
              <span style={{ fontSize: 36, fontWeight: 800, color: sentimentScore >= 70 ? '#22c55e' : '#f59e0b' }}>{sentimentScore}%</span>
              <span style={{ fontSize: 14, color: '#64748b' }}>positive</span>
            </div>
            {/* Sentiment bar */}
            <div style={{ height: 6, background: 'var(--surface-2)', borderRadius: 3, marginBottom: 16, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${sentimentScore}%`, background: 'linear-gradient(90deg, #22c55e, #84cc16)', borderRadius: 3 }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                <span style={{ color: '#64748b' }}>Threads found</span>
                <span style={{ fontWeight: 600, color: '#f1f5f9' }}>{redditResults.length}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                <span style={{ color: '#64748b' }}>Total upvotes</span>
                <span style={{ fontWeight: 600, color: '#f1f5f9' }}>{totalUpvotes.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                <span style={{ color: '#22c55e' }}>✓ Positive</span>
                <span style={{ fontWeight: 600, color: '#22c55e' }}>{positiveCount}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                <span style={{ color: '#ef4444' }}>✗ Critical</span>
                <span style={{ fontWeight: 600, color: '#ef4444' }}>{negativeCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reddit cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: 16, marginBottom: 40 }}>
          {redditResults.map((post, i) => (
            <RedditCard key={i} post={post} delay={i * 80} />
          ))}
        </div>

        {/* Bottom note */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1.25rem 2rem',
          background: 'var(--surface-1)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          flexWrap: 'wrap',
          gap: 20,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Search size={18} />
            <span style={{ fontSize: 13, color: '#64748b' }}>
              <strong style={{ color: '#94a3b8' }}>Spam-filtered</strong> - deal-posting and affiliate subreddits excluded
            </span>
          </div>
          <div style={{ width: 1, height: 24, background: 'var(--border)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Scale size={18} />
            <span style={{ fontSize: 13, color: '#64748b' }}>
              <strong style={{ color: '#94a3b8' }}>Weighted by upvotes</strong> - more votes = more influence on score
            </span>
          </div>
          <div style={{ width: 1, height: 24, background: 'var(--border)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Target size={18} />
            <span style={{ fontSize: 13, color: '#64748b' }}>
              <strong style={{ color: '#94a3b8' }}>Relevance-scored</strong> - ASIN, brand &amp; product noun matching
            </span>
          </div>
        </div>
      </div>
    </section>
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
        { type: 'cluster',    sev: 'medium' as const, label: '94% five-star ratings - unusual' },
        { type: 'reddit',     sev: 'low'    as const, label: 'No Reddit discussions found' },
      ],
      reddit: {
        sentimentScore: 28,
        postCount: 5,
        topSubreddits: ['r/amazonreviews', 'r/fakespotreviews', 'r/consumeradvice'],
        posts: [
          { subreddit: 'r/amazonreviews', title: 'This product has tons of fake 5-star reviews - beware', sentiment: 'negative' as const, score: 342, url: 'https://reddit.com/r/amazonreviews/comments/abc123' },
          { subreddit: 'r/consumeradvice', title: 'Bought this and it broke after 2 days, reviews are misleading', sentiment: 'negative' as const, score: 187, url: 'https://reddit.com/r/consumeradvice/comments/def456' },
          { subreddit: 'r/fakespotreviews', title: 'Classic review manipulation - 200+ reviews in one week', sentiment: 'negative' as const, score: 95, url: 'https://reddit.com/r/fakespotreviews/comments/ghi789' },
        ],
      },
    },
    {
      label: 'Walmart', platform: 'Walmart', score: 78, price: '$39.97',
      flags: [
        { type: 'verified',   sev: 'low'    as const, label: '82% verified purchase rate' },
        { type: 'natural',    sev: 'low'    as const, label: 'Natural star distribution' },
        { type: 'reddit',     sev: 'low'    as const, label: 'Positive Reddit sentiment' },
      ],
      reddit: {
        sentimentScore: 72,
        postCount: 8,
        topSubreddits: ['r/walmart', 'r/BuyItForLife', 'r/deals'],
        posts: [
          { subreddit: 'r/BuyItForLife', title: 'This brand has been reliable for years, great value', sentiment: 'positive' as const, score: 512, url: 'https://reddit.com/r/BuyItForLife/comments/jkl012' },
          { subreddit: 'r/walmart', title: 'Solid product, been using it for 6 months no issues', sentiment: 'positive' as const, score: 234, url: 'https://reddit.com/r/walmart/comments/mno345' },
          { subreddit: 'r/deals', title: 'Decent deal but wait for a rollback - often drops to $29', sentiment: 'neutral' as const, score: 128, url: 'https://reddit.com/r/deals/comments/pqr678' },
        ],
      },
    },
    {
      label: 'eBay',   platform: 'eBay',   score: 55, price: '$12.50',
      flags: [
        { type: 'unverified', sev: 'medium' as const, label: '61% unverified purchases' },
        { type: 'generic',    sev: 'low'    as const, label: 'Many short generic reviews' },
        { type: 'sentiment',  sev: 'low'    as const, label: 'Mixed Reddit sentiment' },
      ],
      reddit: {
        sentimentScore: 48,
        postCount: 3,
        topSubreddits: ['r/Ebay', 'r/Flipping', 'r/gadgets'],
        posts: [
          { subreddit: 'r/Ebay', title: 'Hit or miss with this seller - packaging was poor', sentiment: 'negative' as const, score: 76, url: 'https://reddit.com/r/Ebay/comments/stu901' },
          { subreddit: 'r/gadgets', title: 'Works fine for the price, nothing special', sentiment: 'neutral' as const, score: 145, url: 'https://reddit.com/r/gadgets/comments/vwx234' },
          { subreddit: 'r/Flipping', title: 'Decent item if you get a legit unit, some counterfeits out there', sentiment: 'neutral' as const, score: 63, url: 'https://reddit.com/r/Flipping/comments/yza567' },
        ],
      },
    },
    {
      label: 'Etsy',   platform: 'Etsy',   score: 91, price: '$18.00',
      flags: [
        { type: 'verified',   sev: 'low'    as const, label: '100% verified purchases' },
        { type: 'natural',    sev: 'low'    as const, label: 'Natural rating distribution' },
        { type: 'reddit',     sev: 'low'    as const, label: 'Enthusiastic Reddit community' },
      ],
      reddit: {
        sentimentScore: 89,
        postCount: 12,
        topSubreddits: ['r/Etsy', 'r/crafts', 'r/handmade'],
        posts: [
          { subreddit: 'r/Etsy', title: 'This shop is amazing - beautiful craftsmanship and fast shipping', sentiment: 'positive' as const, score: 678, url: 'https://reddit.com/r/Etsy/comments/bcd890' },
          { subreddit: 'r/crafts', title: 'Ordered a custom piece and it exceeded expectations', sentiment: 'positive' as const, score: 423, url: 'https://reddit.com/r/crafts/comments/efg123' },
          { subreddit: 'r/handmade', title: 'Love supporting small makers like this one, highly recommend', sentiment: 'positive' as const, score: 289, url: 'https://reddit.com/r/handmade/comments/hij456' },
        ],
      },
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
                ReviewLens instantly detects manipulation patterns, suspicious rating clusters, and fake buyer behavior - then cross-checks with real Reddit community sentiment.
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="https://chromewebstore.google.com/detail/reviewlens-fake-review-de/ncneomnblmiefoplgpcpkjijkhpafkei" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: 15 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                  </svg>
                  Add to Chrome - It's Free
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
            { val: '7',     label: 'Detection Signals' },
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
            <Step n={1} iconEl={<Globe size={24} />} title="Navigate to any product"
              desc="Browse Amazon, Walmart, eBay, or Etsy as you normally would. ReviewLens detects product pages automatically." />
            <Step n={2} iconEl={<Search size={24} />} title="Click the extension icon"
              desc="Hit Analyze and ReviewLens fetches review data, checks Reddit for real discussion, and runs 5 AI-powered detection signals." />
            <Step n={3} iconEl={<BarChart size={24} />} title="See your trust score"
              desc="Get a clear A-F grade with a detailed breakdown of every red flag found - and a price trend history as you revisit over time." />
          </div>
        </div>
      </section>

      {/* ══ FEATURES ══════════════════════════════════════════ */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-tag">Detection Engine</div>
            <h2 className="section-title">Seven signals.<br /><span className="gradient-text">One verdict.</span></h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            <FeatureCard
              iconEl={<TrendingUp size={24} />} color="#ef4444" tag="Signal 1"
              title="Review Burst Detection"
              desc="Spots unnatural spikes in review volume - a classic sign of sellers buying fake reviews in bulk overnight."
            />
            <FeatureCard
              iconEl={<Star size={24} />} color="#f59e0b" tag="Signal 2"
              title="Rating Clustering Analysis"
              desc="Flags products where 90%+ of ratings are 5-stars with almost no 2-3 star reviews - an impossible natural distribution."
            />
            <FeatureCard
              iconEl={<CheckCircle size={24} />} color="#22c55e" tag="Signal 3"
              title="Verified Purchase Ratio"
              desc="Calculates what proportion of reviews actually came from verified buyers - unverified reviews carry almost no trust weight."
            />
            <FeatureCard
              iconEl={<Type size={24} />} color="#6366f1" tag="Signal 4"
              title="Text Quality Analysis"
              desc="Goes beyond word count - detects generic phrasing, excessive caps, low specificity, and AI-generated language patterns in reviews."
            />
            <FeatureCard
              iconEl={<Frown size={24} />} color="#ec4899" tag="Signal 5"
              title="Sentiment-Rating Mismatch"
              desc="5 stars but says 'terrible product'? ReviewLens catches reviews where the star rating contradicts the actual text."
            />
            <FeatureCard
              iconEl={<Copy size={24} />} color="#8b5cf6" tag="Signal 6"
              title="Duplicate Review Detection"
              desc="Finds near-identical copy-pasted reviews using text similarity - a hallmark of fake review farms."
            />
            <FeatureCard
              iconEl={<RedditIcon size={24} />} color="#f97316" tag="Signal 7"
              title="Reddit Community Sentiment"
              desc="Searches Reddit for real discussions with smart relevance scoring, spam filtering, and time-weighted sentiment analysis."
            />
            <FeatureCard
              iconEl={<DollarSign size={24} />} color="#06b6d4" tag="Bonus"
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
              Every signal is weighted and combined into a single, honest trust score. No guesswork - just data.
            </p>

            <div style={{
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 16, padding: 24,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <ScoreRing score={34} size={90} animate />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#ef4444', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <AlertTriangle size={14} /> Suspicious Product
                  </div>
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

      {/* ══ HOW WE SCORE ═══════════════════════════════════════ */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-tag">Scoring Methodology</div>
            <h2 className="section-title">How your trust score<br /><span className="gradient-text">is calculated</span></h2>
            <p className="section-sub" style={{ margin: '12px auto 0', maxWidth: 600 }}>
              No black boxes. Here's exactly how ReviewLens turns raw review data into a score you can trust - explained in plain English.
            </p>
          </div>

          {/* Step 1: The formula */}
          <div className="card" style={{ padding: '2.5rem', marginBottom: 24, background: 'linear-gradient(135deg,rgba(99,102,241,0.06),transparent 60%)', borderColor: 'rgba(99,102,241,0.15)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 40, alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>The Formula</div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: '#f1f5f9', marginBottom: 12, lineHeight: 1.3 }}>
                  Two independent sources.<br />One combined score.
                </h3>
                <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7, marginBottom: 20 }}>
                  We analyse the product's own reviews for red flags (70% weight) and cross-check with real Reddit community discussions (30% weight). The two scores combine into your final trust grade.
                </p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 12, padding: '5px 12px', borderRadius: 20, background: 'rgba(99,102,241,0.12)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.25)', fontWeight: 600 }}>
                    70% Review Analysis
                  </span>
                  <span style={{ fontSize: 12, padding: '5px 12px', borderRadius: 20, background: 'rgba(255,69,0,0.1)', color: '#ff6314', border: '1px solid rgba(255,69,0,0.25)', fontWeight: 600 }}>
                    30% Reddit Sentiment
                  </span>
                </div>
              </div>
              {/* Visual formula */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 16, padding: '20px 28px', width: '100%', justifyContent: 'center',
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 28, fontWeight: 900, color: '#818cf8' }}>72</div>
                    <div style={{ fontSize: 10, color: '#475569', marginTop: 2 }}>Review Score</div>
                  </div>
                  <span style={{ fontSize: 20, color: '#334155' }}>×</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#818cf8' }}>0.7</span>
                  <span style={{ fontSize: 20, color: '#334155', margin: '0 4px' }}>+</span>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 28, fontWeight: 900, color: '#ff6314' }}>85</div>
                    <div style={{ fontSize: 10, color: '#475569', marginTop: 2 }}>Reddit Score</div>
                  </div>
                  <span style={{ fontSize: 20, color: '#334155' }}>×</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#ff6314' }}>0.3</span>
                  <span style={{ fontSize: 20, color: '#334155', margin: '0 8px' }}>=</span>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 32, fontWeight: 900, color: '#22c55e' }}>76</div>
                    <div style={{ fontSize: 10, color: '#475569', marginTop: 2 }}>Trust Score</div>
                  </div>
                </div>
                <div style={{ fontSize: 11, color: '#475569', textAlign: 'center' }}>
                  Adjusted by confidence level when fewer than 50 reviews are available
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: What we check in reviews */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 24 }}>
            {/* Review Analysis card */}
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)',
                }}>
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#f1f5f9' }}>Review Analysis</div>
                  <div style={{ fontSize: 11, color: '#475569' }}>7 signals checked per product</div>
                </div>
              </div>
              {[
                { iconEl: <TrendingUp size={16} />, label: 'Review burst detection', desc: 'Spots unnatural spikes - 50 reviews in one day is a red flag' },
                { iconEl: <Star size={16} />, label: 'Rating clustering', desc: '95% five-stars with no 2-3 stars? That\'s not natural' },
                { iconEl: <CheckCircle size={16} />, label: 'Verified purchase ratio', desc: 'More unverified reviewers = less trustworthy' },
                { iconEl: <Type size={16} />, label: 'Text quality analysis', desc: 'Detects generic, copy-paste, or AI-generated review language' },
                { iconEl: <Frown size={16} />, label: 'Sentiment-rating mismatch', desc: '5 stars but says "terrible product"? Caught.' },
                { iconEl: <Copy size={16} />, label: 'Duplicate review detection', desc: 'Finds copy-pasted reviews from fake review farms' },
                { iconEl: <Hourglass size={16} />, label: 'Temporal decay', desc: 'Recent red flags weigh more than old ones' },
              ].map(s => (
                <div key={s.label} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 14 }}>
                  <div style={{ flexShrink: 0, marginTop: 2 }}>{s.iconEl}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0', marginBottom: 2 }}>{s.label}</div>
                    <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
              <div style={{
                marginTop: 16, padding: '10px 14px', borderRadius: 10,
                background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)',
                fontSize: 12, color: '#94a3b8', lineHeight: 1.5,
              }}>
                Each red flag <strong style={{ color: '#c7d2fe' }}>multiplies</strong> the penalty - so two problems compound rather than just add up. One flag barely affects the score, but three signals together drop it significantly.
              </div>
            </div>

            {/* Reddit Cross-Check card */}
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(255,69,0,0.12)', border: '1px solid rgba(255,69,0,0.25)', fontSize: 18,
                }}>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="#ff4500">
                    <circle cx="10" cy="10" r="10" fill="#ff4500"/>
                    <path fill="white" d="M16.67 10a1.46 1.46 0 00-2.47-1 7.12 7.12 0 00-3.85-1.23l.65-3.08 2.13.45a1 1 0 101.07-1 1 1 0 00-.96.68l-2.38-.5a.16.16 0 00-.19.12l-.73 3.44a7.14 7.14 0 00-3.89 1.23 1.46 1.46 0 10-1.61 2.39 2.87 2.87 0 000 .44c0 2.24 2.61 4.06 5.83 4.06s5.83-1.82 5.83-4.06a2.87 2.87 0 000-.44 1.46 1.46 0 00.47-1zm-9.07 1.23a1 1 0 111 1 1 1 0 01-1-1zm5.56 2.65a3.47 3.47 0 01-2.32.68 3.47 3.47 0 01-2.32-.68.17.17 0 01.23-.23 3.14 3.14 0 002.09.55 3.14 3.14 0 002.09-.55.17.17 0 01.23.23zm-.22-1.65a1 1 0 111-1 1 1 0 01-1 1z"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#f1f5f9' }}>Reddit Cross-Check</div>
                  <div style={{ fontSize: 11, color: '#475569' }}>Independent community verification</div>
                </div>
              </div>
              {[
                { iconEl: <Search size={16} />, label: 'Smart product matching', desc: 'Uses product ID, brand name, and key nouns - not just the full title' },
                { iconEl: <Target size={16} />, label: 'Relevance scoring', desc: 'Every Reddit post gets a relevance score. Low-relevance posts are filtered out' },
                { iconEl: <Filter size={16} />, label: 'Spam subreddit filter', desc: '60+ deal-posting, meme, and off-topic subreddits are blocked automatically' },
                { iconEl: <ArrowUpCircle size={16} />, label: 'Upvote weighting', desc: 'A post with 2,000 upvotes influences the score more than one with 3' },
                { iconEl: <Clock size={16} />, label: 'Time-weighted sentiment', desc: 'Recent posts matter more - a review from last month outweighs one from 2 years ago' },
                { iconEl: <MessageCircle size={16} />, label: 'Positive/negative language', desc: 'We scan each post for sentiment signals using word-boundary keyword matching' },
              ].map(s => (
                <div key={s.label} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 14 }}>
                  <div style={{ flexShrink: 0, marginTop: 2 }}>{s.iconEl}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0', marginBottom: 2 }}>{s.label}</div>
                    <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
              <div style={{
                marginTop: 16, padding: '10px 14px', borderRadius: 10,
                background: 'rgba(255,69,0,0.06)', border: '1px solid rgba(255,69,0,0.12)',
                fontSize: 12, color: '#94a3b8', lineHeight: 1.5,
              }}>
                If no Reddit posts are found, the sentiment defaults to <strong style={{ color: '#fbbf24' }}>50 (neutral)</strong> so the product isn't unfairly penalised. The score is then driven entirely by review analysis.
              </div>
            </div>
          </div>

          {/* Step 3: Grade scale */}
          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Score to Grade</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
              {[
                { grade: 'A', range: '80-100', color: '#22c55e', desc: 'Highly trustworthy - buy with confidence' },
                { grade: 'B', range: '65-79', color: '#84cc16', desc: 'Mostly trustworthy - minor concerns' },
                { grade: 'C', range: '50-64', color: '#f59e0b', desc: 'Mixed signals - read reviews carefully' },
                { grade: 'D', range: '35-49', color: '#ef4444', desc: 'Suspicious - several red flags detected' },
                { grade: 'F', range: '0-34', color: '#dc2626', desc: 'Avoid - strong manipulation signals' },
              ].map(g => (
                <div key={g.grade} style={{
                  flex: '1 1 160px', padding: '14px 16px', borderRadius: 12,
                  background: `${g.color}08`, border: `1px solid ${g.color}20`,
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: g.color, marginBottom: 4 }}>{g.grade}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: g.color, marginBottom: 6 }}>{g.range}</div>
                  <div style={{ fontSize: 11, color: '#64748b', lineHeight: 1.4 }}>{g.desc}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)' }}>
              <Lightbulb size={16} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.5 }}>
                <strong style={{ color: '#e2e8f0' }}>Confidence matters:</strong> Products with fewer than 10 reviews show a "low confidence" badge. The score is pulled towards 50 (neutral) to avoid misleading you when data is limited.
              </span>
            </div>
          </div>

          {/* Data storage note */}
          <div style={{
            marginTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem 2rem', background: 'rgba(99,102,241,0.04)', border: '1px solid rgba(99,102,241,0.1)',
            borderRadius: 12, flexWrap: 'wrap', gap: 16,
          }}>
            <Lock size={18} style={{ flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>
              <strong style={{ color: '#e2e8f0' }}>All data stays in your browser.</strong> Scores, price history, and analysis results are stored in <code style={{ background: 'rgba(99,102,241,0.12)', padding: '2px 6px', borderRadius: 4, fontSize: 11, color: '#a5b4fc' }}>chrome.storage.local</code> - a secure storage area managed by Chrome itself. Nothing is sent to our servers because we don't have any.
            </span>
          </div>
        </div>
      </section>

      {/* ══ REDDIT CROSS-CHECK ════════════════════════════════ */}
      <RedditSection />

      {/* ══ PLATFORMS ═════════════════════════════════════════ */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-tag">Platform Support</div>
            <h2 className="section-title">Works everywhere<br /><span className="gradient-text">you shop</span></h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
            <PlatformPill name="Amazon" color="#f59e0b" features={['ASIN detection', 'Review burst', 'Rating clustering', 'Verified ratio', 'Reddit + price']} />
            <PlatformPill name="Walmart" color="#0071CE" features={['Item ID detection', 'Review API data', 'Star distribution', 'Verified ratio', 'Reddit + price']} />
            <PlatformPill name="eBay" color="#e53238" features={['Item ID detection', 'Catalog reviews', 'Rating clustering', 'Generic filter', 'Reddit + price']} />
            <PlatformPill name="Etsy" color="#f1641e" features={['Listing ID detect', 'Verified (all)', 'Rating histogram', 'Generic filter', 'Reddit + price']} />
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

            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center' }}>
              <Search size={48} />
            </div>
            <h2 style={{
              fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 900,
              letterSpacing: '-0.02em', marginBottom: 16, lineHeight: 1.15,
            }}>
              Stop trusting<br /><span className="gradient-text">fake 5-star reviews</span>
            </h2>
            <p style={{ fontSize: 16, color: '#64748b', marginBottom: 36, lineHeight: 1.7 }}>
              Install ReviewLens for free and shop with confidence. Available on Chrome - works on Amazon, Walmart, eBay, and Etsy.
            </p>
            <a href="https://chromewebstore.google.com/detail/reviewlens-fake-review-de/ncneomnblmiefoplgpcpkjijkhpafkei" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: 16, padding: '16px 36px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
              </svg>
              Add to Chrome - Free
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
