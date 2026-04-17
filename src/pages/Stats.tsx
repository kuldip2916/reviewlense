import { useEffect, useState } from 'react';

// Cloudflare Worker stats endpoint. Requires STATS_TOKEN (set via
// `npx wrangler secret put STATS_TOKEN` in /telemetry-worker/).
const STATS_ENDPOINT = 'https://reviewlens-telemetry.reviewlens-telemetry.workers.dev/stats/summary';

interface SummaryResponse {
  window_days: number;
  totals: {
    install: number;
    first_analysis: number;
    analysis_complete: number;
    popup_opened_unsupported: number;
    overlay_dismissed: number;
  };
  activation_rate: number;
  dead_end_rate: number;
  overlay_dismiss_rate: number;
  platform_distribution: Record<string, number>;
  grade_distribution: Record<string, number>;
  unsupported_domain_distribution: Record<string, number>;
  locale_distribution: Record<string, number>;
  per_day: Array<{
    day: string;
    install: number;
    first_analysis: number;
    analysis_complete: number;
    popup_opened_unsupported: number;
    overlay_dismissed: number;
  }>;
}

export default function Stats() {
  // Token can come from URL (?t=xxx — bookmarkable) or a localStorage cache.
  const [token, setToken] = useState<string>(() => {
    const urlToken = new URLSearchParams(window.location.hash.split('?')[1] ?? '').get('t');
    if (urlToken) localStorage.setItem('rl_stats_token', urlToken);
    return urlToken ?? localStorage.getItem('rl_stats_token') ?? '';
  });
  const [tokenInput, setTokenInput] = useState('');
  const [data, setData] = useState<SummaryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState(30);

  useEffect(() => {
    if (!token) return;
    if (STATS_ENDPOINT.includes('REPLACE_WITH')) {
      setError('Stats endpoint not yet configured. Deploy the Worker and update STATS_ENDPOINT in Stats.tsx.');
      return;
    }
    setError(null);
    setData(null);
    fetch(`${STATS_ENDPOINT}?token=${encodeURIComponent(token)}&days=${days}`)
      .then(async (r) => {
        if (r.status === 401) throw new Error('Wrong token. Check STATS_TOKEN in wrangler.toml.');
        if (!r.ok) throw new Error(`Request failed: ${r.status}`);
        return r.json();
      })
      .then(setData)
      .catch((e) => setError(e instanceof Error ? e.message : String(e)));
  }, [token, days]);

  // Gate
  if (!token) {
    return (
      <main style={{ paddingTop: '5rem', minHeight: '80vh' }}>
        <section style={{ padding: '4rem 1.5rem', maxWidth: 440, margin: '0 auto' }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Stats</h1>
          <p style={{ color: 'var(--sub)', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
            Enter the stats token (configured as STATS_TOKEN in the Worker).
          </p>
          <input
            autoFocus
            type="password"
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            placeholder="token"
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: 10,
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              color: 'var(--text)',
              fontSize: 14,
              fontFamily: 'inherit',
              marginBottom: 12,
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && tokenInput.trim()) {
                localStorage.setItem('rl_stats_token', tokenInput.trim());
                setToken(tokenInput.trim());
              }
            }}
          />
          <button
            className="btn-primary"
            onClick={() => {
              if (!tokenInput.trim()) return;
              localStorage.setItem('rl_stats_token', tokenInput.trim());
              setToken(tokenInput.trim());
            }}
          >
            View stats
          </button>
          <p style={{ color: 'var(--muted)', fontSize: 12, marginTop: 14, lineHeight: 1.6 }}>
            Tip: bookmark <code>/stats?t=YOUR_TOKEN</code> for one-click access.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main style={{ paddingTop: '5rem', minHeight: '80vh' }}>
      <section style={{ padding: '3rem 1.5rem', maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700 }}>ReviewLens stats</h1>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <select
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value, 10))}
              style={{
                padding: '8px 10px', borderRadius: 8,
                border: '1px solid var(--border)',
                background: 'var(--surface)', color: 'var(--text)',
                fontSize: 13, fontFamily: 'inherit',
              }}
            >
              <option value={7}>Last 7 days</option>
              <option value={14}>Last 14 days</option>
              <option value={30}>Last 30 days</option>
              <option value={90}>Last 90 days</option>
            </select>
            <button
              onClick={() => {
                localStorage.removeItem('rl_stats_token');
                setToken('');
                setTokenInput('');
              }}
              style={{
                padding: '8px 10px', borderRadius: 8,
                border: '1px solid var(--border)',
                background: 'transparent', color: 'var(--sub)',
                fontSize: 12, cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              Sign out
            </button>
          </div>
        </div>

        {error && (
          <div
            style={{
              padding: '1rem', borderRadius: 10,
              border: '1px solid rgba(239,68,68,0.3)',
              background: 'rgba(239,68,68,0.08)',
              color: '#ef4444', fontSize: 14, marginBottom: 16,
            }}
          >
            {error}
          </div>
        )}

        {!data && !error && (
          <div style={{ color: 'var(--sub)', fontSize: 14 }}>Loading…</div>
        )}

        {data && (
          <>
            {/* Top-line metrics */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
                gap: 12,
                marginBottom: 32,
              }}
            >
              <Metric label="Installs" value={data.totals.install} accent="#6366f1" />
              <Metric
                label="Activation"
                value={formatPct(data.activation_rate)}
                sub={`${data.totals.first_analysis} first analyses`}
                accent="#22c55e"
              />
              <Metric
                label="Analyses"
                value={data.totals.analysis_complete}
                sub={`over ${days} days`}
                accent="#8b5cf6"
              />
              <Metric
                label="Dead-ends"
                value={formatPct(data.dead_end_rate)}
                sub="unsupported popup opens"
                accent="#f59e0b"
              />
              <Metric
                label="Overlay dismiss"
                value={formatPct(data.overlay_dismiss_rate)}
                sub={`${data.totals.overlay_dismissed} closes`}
                accent="#ef4444"
              />
            </div>

            {/* Per-day chart */}
            <SectionCard title="Daily activity">
              <DailyChart data={data.per_day} />
            </SectionCard>

            {/* Distributions */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 16,
                marginTop: 24,
              }}
            >
              <SectionCard title="Platform split">
                <BarList data={data.platform_distribution} accent="#6366f1" />
              </SectionCard>
              <SectionCard title="Grade distribution">
                <BarList data={data.grade_distribution} accent="#22c55e" />
              </SectionCard>
              <SectionCard title="Unsupported domains (where users wish we worked)">
                <BarList data={data.unsupported_domain_distribution} accent="#f59e0b" />
              </SectionCard>
              <SectionCard title="Locale">
                <BarList data={data.locale_distribution} accent="#8b5cf6" />
              </SectionCard>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

/* ─── Visual helpers ──────────────────────────────────────── */

function Metric({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent: string;
}) {
  return (
    <div
      className="card"
      style={{
        padding: '1rem 1.25rem',
        borderLeft: `3px solid ${accent}`,
      }}
    >
      <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontSize: 24, fontWeight: 800, color: accent, fontVariantNumeric: 'tabular-nums', lineHeight: 1.2 }}>
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 11, color: 'var(--sub)', marginTop: 4 }}>{sub}</div>
      )}
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card" style={{ padding: '1.25rem' }}>
      <div style={{ fontSize: 12, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function BarList({ data, accent }: { data: Record<string, number>; accent: string }) {
  const entries = Object.entries(data).sort(([, a], [, b]) => b - a);
  const max = entries.reduce((m, [, v]) => Math.max(m, v), 1);
  if (entries.length === 0) {
    return <div style={{ color: 'var(--muted)', fontSize: 12 }}>No data yet</div>;
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {entries.map(([k, v]) => (
        <div key={k} style={{ fontSize: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
            <span style={{ color: 'var(--sub)' }}>{k}</span>
            <span style={{ color: 'var(--text)', fontVariantNumeric: 'tabular-nums' }}>{v}</span>
          </div>
          <div style={{ height: 4, background: 'var(--surface)', borderRadius: 2 }}>
            <div
              style={{
                width: `${(v / max) * 100}%`,
                height: '100%',
                background: accent,
                borderRadius: 2,
                transition: 'width 0.4s ease',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function DailyChart({ data }: { data: SummaryResponse['per_day'] }) {
  const sorted = [...data].sort((a, b) => a.day.localeCompare(b.day));
  const maxAnalyses = Math.max(1, ...sorted.map((d) => d.analysis_complete));

  return (
    <div style={{ overflowX: 'auto' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 3,
          height: 140,
          minWidth: sorted.length * 14,
        }}
      >
        {sorted.map((d) => {
          const h = Math.max(2, (d.analysis_complete / maxAnalyses) * 120);
          return (
            <div key={d.day} style={{ flex: 1, minWidth: 10, position: 'relative' }}>
              <div
                title={`${d.day}\nAnalyses: ${d.analysis_complete}\nInstalls: ${d.install}\nFirst: ${d.first_analysis}`}
                style={{
                  height: h,
                  background: 'linear-gradient(180deg, #6366f1, #8b5cf6)',
                  borderRadius: '3px 3px 0 0',
                  cursor: 'help',
                }}
              />
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 10, color: 'var(--muted)' }}>
        <span>{sorted[0]?.day ?? ''}</span>
        <span>{sorted[sorted.length - 1]?.day ?? ''}</span>
      </div>
      <div style={{ fontSize: 11, color: 'var(--sub)', marginTop: 10 }}>
        Bars = analyses per day. Hover for full breakdown.
      </div>
    </div>
  );
}

function formatPct(r: number): string {
  if (!isFinite(r) || r === 0) return '0%';
  return `${(r * 100).toFixed(1)}%`;
}
