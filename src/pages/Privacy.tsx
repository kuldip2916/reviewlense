import { useEffect } from 'react';
import { ShieldOff, Globe, Radio, Gift } from '../components/Icons';

/* ─── Section component ─────────────────────────────── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '3rem' }}>
      <h2 style={{
        fontSize: '1.25rem',
        fontWeight: 700,
        color: 'var(--text-primary)',
        marginBottom: '1rem',
        paddingBottom: '0.75rem',
        borderBottom: '1px solid var(--border)',
      }}>
        {title}
      </h2>
      <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.9375rem' }}>
        {children}
      </div>
    </section>
  );
}

/* ─── Info card ─────────────────────────────────────── */
function InfoCard({ icon, title, description, color }: { icon: React.ReactNode; title: string; description: string; color: string }) {
  return (
    <div style={{
      padding: '1.25rem',
      background: `${color}08`,
      border: `1px solid ${color}20`,
      borderRadius: '0.75rem',
      display: 'flex',
      gap: '1rem',
      alignItems: 'flex-start',
    }}>
      <div style={{ flexShrink: 0 }}>{icon}</div>
      <div>
        <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem', fontSize: '0.9rem' }}>{title}</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{description}</div>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────── */
export default function Privacy() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main style={{ paddingTop: '5rem' }}>
      {/* Hero */}
      <section style={{ padding: '4rem 1.5rem 3rem', textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.4rem 1rem', borderRadius: '2rem',
          background: 'var(--accent-subtle)', border: '1px solid var(--accent-border)',
          fontSize: '0.8rem', color: 'var(--accent)', marginBottom: '1.5rem',
        }}>
          ✦ Privacy Policy
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '1rem' }}>
          Your privacy is not{' '}
          <span className="gradient-text">a feature request</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          ReviewLens was built with a simple principle: we shouldn't know anything about you
          or what you buy. Here's exactly how we make that work.
        </p>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.825rem', marginTop: '1rem' }}>
          Last updated: March 1, 2026
        </p>
      </section>

      {/* Quick summary cards */}
      <section style={{ padding: '0 1.5rem 3rem', maxWidth: '850px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <InfoCard
            icon={<ShieldOff size={24} color="#22c55e" />}
            title="No personal data collected"
            description="We don't collect your name, email, browsing history, or any personally identifiable information."
            color="#22c55e"
          />
          <InfoCard
            icon={<Globe size={24} color="#6366f1" />}
            title="Everything stays in your browser"
            description="Price history and cached results are stored in chrome.storage.local — a secure area inside Chrome itself, not as files on your hard drive. Never sent to our servers."
            color="#6366f1"
          />
          <InfoCard
            icon={<Radio size={24} color="#f59e0b" />}
            title="No ReviewLens servers"
            description="All API calls go directly from your browser to Amazon, Walmart, eBay, Etsy, and Reddit. We are not in the middle."
            color="#f59e0b"
          />
          <InfoCard
            icon={<Gift size={24} color="#ec4899" />}
            title="No monetisation of data"
            description="We have no advertising business model. ReviewLens is free because it costs us nothing to run — there are no servers to pay for."
            color="#ec4899"
          />
        </div>
      </section>

      {/* Policy body */}
      <div style={{ padding: '0 1.5rem 6rem', maxWidth: '750px', margin: '0 auto' }}>
        <div className="card" style={{ padding: '2.5rem 3rem' }}>

          <Section title="1. Who We Are">
            <p>
              ReviewLens is a free, open-source Chrome extension created to help consumers make
              better-informed purchasing decisions. The extension is not operated by a company with
              a data-collection business model. There are no backend servers, no user accounts,
              and no data pipelines.
            </p>
          </Section>

          <Section title="2. What Data We Collect">
            <p style={{ marginBottom: '1rem' }}>
              <strong style={{ color: 'var(--text-primary)' }}>We collect no personal data.</strong>
            </p>
            <p style={{ marginBottom: '1rem' }}>
              The only data stored by ReviewLens is:
            </p>
            <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
              <li>
                <strong style={{ color: 'var(--text-primary)' }}>Price history</strong> — The price of product pages you visit while the extension is active. Stored in <code style={{ background: 'var(--surface-2)', padding: '0.1em 0.3em', borderRadius: '3px', fontSize: '0.875em', color: 'var(--accent)' }}>chrome.storage.local</code> with the key format <code style={{ background: 'var(--surface-2)', padding: '0.1em 0.3em', borderRadius: '3px', fontSize: '0.875em', color: 'var(--accent)' }}>price_{'{'}platform{'}'}_{'{'} productId{'}'}</code>.
              </li>
              <li>
                <strong style={{ color: 'var(--text-primary)' }}>Analysis cache</strong> — The results of review analysis (score, flags, Reddit sentiment) cached for 24 hours to avoid repeated API calls. Stored in <code style={{ background: 'var(--surface-2)', padding: '0.1em 0.3em', borderRadius: '3px', fontSize: '0.875em', color: 'var(--accent)' }}>chrome.storage.local</code>.
              </li>
            </ul>
            <div style={{ padding: '1rem 1.25rem', background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: '0.75rem', marginBottom: '1rem' }}>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong style={{ color: 'var(--text-primary)' }}>What is chrome.storage.local?</strong>
              </p>
              <p style={{ fontSize: '0.875rem' }}>
                It's a secure storage area built into Chrome itself, managed by the browser. It is <strong style={{ color: 'var(--text-primary)' }}>not</strong> the same as saving files on your computer's hard drive. This data lives inside Chrome's own internal database, is only accessible by the ReviewLens extension, and is automatically deleted when you uninstall the extension. No files are created on your desktop, documents folder, or anywhere else on your file system.
              </p>
            </div>
            <p>
              This data never leaves your browser. It is not transmitted to any server operated by ReviewLens.
            </p>
          </Section>

          <Section title="3. Third-Party API Calls">
            <p style={{ marginBottom: '1rem' }}>
              To provide its analysis, ReviewLens makes network requests directly from your browser to the following third-party services:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
              {[
                { name: 'Amazon', url: 'amazon.com', desc: 'Fetches product reviews for Amazon listings. Subject to Amazon\'s Privacy Policy.' },
                { name: 'Walmart', url: 'walmart.com', desc: 'Fetches product reviews for Walmart listings. Subject to Walmart\'s Privacy Policy.' },
                { name: 'eBay', url: 'ebay.com', desc: 'Fetches product reviews for eBay listings. Subject to eBay\'s Privacy Policy.' },
                { name: 'Etsy', url: 'etsy.com', desc: 'Fetches product reviews for Etsy listings. Subject to Etsy\'s Privacy Policy.' },
                { name: 'Reddit', url: 'reddit.com', desc: 'Searches for product discussions using Reddit\'s public search API. Subject to Reddit\'s Privacy Policy.' },
              ].map(({ name, url, desc }) => (
                <div key={name} style={{
                  padding: '0.875rem 1rem',
                  background: 'var(--surface-2)',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  gap: '0.75rem',
                  alignItems: 'flex-start',
                }}>
                  <div style={{ minWidth: '80px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.875rem' }}>{name}</span>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{url}</div>
                  </div>
                  <div style={{ fontSize: '0.85rem' }}>{desc}</div>
                </div>
              ))}
            </div>
            <p>
              These requests include standard HTTP headers (including your IP address as seen by those services) and are subject to those platforms' own privacy policies. ReviewLens does not control or receive the data those services process.
            </p>
          </Section>

          <Section title="4. Permissions Explained">
            <p style={{ marginBottom: '1rem' }}>
              ReviewLens requests the following Chrome permissions:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
              {[
                { perm: 'storage', reason: 'To save price history and analysis cache in chrome.storage.local (inside the browser, not on your hard drive).' },
                { perm: 'scripting', reason: 'To inject a small script into product pages that reads the displayed price and product ID.' },
                { perm: 'tabs', reason: 'To detect when you navigate to a supported product page so ReviewLens can activate.' },
                { perm: 'host permissions (amazon, walmart, ebay, etsy)', reason: 'Required to fetch review data and inject the ReviewLens button on product pages.' },
              ].map(({ perm, reason }) => (
                <div key={perm} style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  gap: '0.75rem',
                  alignItems: 'flex-start',
                  padding: '0.75rem 1rem',
                  background: 'var(--surface-2)',
                  borderRadius: '0.5rem',
                }}>
                  <code style={{
                    background: 'var(--accent-subtle)',
                    color: 'var(--accent)',
                    padding: '0.15em 0.5em',
                    borderRadius: '3px',
                    fontSize: '0.8rem',
                    whiteSpace: 'nowrap',
                  }}>{perm}</code>
                  <span style={{ fontSize: '0.85rem' }}>{reason}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section title="5. Data Retention & Deletion">
            <p style={{ marginBottom: '1rem' }}>
              Data stored in your browser by ReviewLens is retained as follows:
            </p>
            <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
              <li><strong style={{ color: 'var(--text-primary)' }}>Price history:</strong> Maximum 60 data points per product, maximum 90 days. Oldest entries are automatically pruned.</li>
              <li><strong style={{ color: 'var(--text-primary)' }}>Analysis cache:</strong> Expires after 24 hours and is replaced on the next visit.</li>
            </ul>
            <p style={{ marginBottom: '1rem' }}>
              To delete all ReviewLens data manually:
            </p>
            <ol style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li>Open Chrome DevTools (F12 or Cmd+Option+I)</li>
              <li>Go to the <strong style={{ color: 'var(--text-primary)' }}>Application</strong> tab</li>
              <li>Expand <strong style={{ color: 'var(--text-primary)' }}>Storage → Local Storage</strong></li>
              <li>Find the entry starting with <code style={{ background: 'var(--surface-2)', padding: '0.1em 0.3em', borderRadius: '3px', fontSize: '0.875em', color: 'var(--accent)' }}>chrome-extension://</code></li>
              <li>Select and delete any keys starting with <code style={{ background: 'var(--surface-2)', padding: '0.1em 0.3em', borderRadius: '3px', fontSize: '0.875em', color: 'var(--accent)' }}>price_</code> or <code style={{ background: 'var(--surface-2)', padding: '0.1em 0.3em', borderRadius: '3px', fontSize: '0.875em', color: 'var(--accent)' }}>cache_</code></li>
            </ol>
          </Section>

          <Section title="6. Anonymous Usage Telemetry">
            <p style={{ marginBottom: '1rem' }}>
              Starting with v1.7, ReviewLens sends a small number of anonymous
              aggregate counters to our own Cloudflare Worker so we can
              understand how the extension is used and where to improve it.
              This is the entire list of what's sent:
            </p>
            <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
              <li>
                <strong style={{ color: 'var(--text-primary)' }}>install</strong> —
                the extension was installed. Payload: <code>{'{ version, locale }'}</code>.
              </li>
              <li>
                <strong style={{ color: 'var(--text-primary)' }}>first_analysis</strong> —
                the first product you ever analyzed. Payload: <code>{'{ platform, grade }'}</code>
                — e.g. <code>amazon</code>, <code>B</code>. Never the product ID or URL.
              </li>
              <li>
                <strong style={{ color: 'var(--text-primary)' }}>analysis_complete</strong> —
                any subsequent analysis. Payload: <code>{'{ platform, grade, flag_count }'}</code>.
              </li>
              <li>
                <strong style={{ color: 'var(--text-primary)' }}>popup_opened_unsupported</strong> —
                you clicked the icon on a site that isn't one of the four
                supported stores. Payload: <code>{'{ domain }'}</code>, bucketed to
                <code>amazon / walmart / ebay / etsy / other</code>. Helps us
                prioritise which new site to add next.
              </li>
              <li>
                <strong style={{ color: 'var(--text-primary)' }}>overlay_dismissed</strong> —
                you closed the floating overlay on a product page. No payload.
              </li>
            </ul>
            <p style={{ marginBottom: '1rem' }}>
              <strong style={{ color: 'var(--text-primary)' }}>What is never sent:</strong>{' '}
              product IDs, URLs, page titles, review text, prices, IP addresses,
              cookies, browser fingerprints, or any other personal data.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              The receiving server (a Cloudflare Worker under our control) does
              not log IP addresses. Counters are aggregated per UTC day and
              automatically deleted after 90 days.
            </p>
            <p>
              <strong style={{ color: 'var(--text-primary)' }}>Opt out any time.</strong>{' '}
              Click the small dot next to the version in the bottom-left of the
              ReviewLens popup. When it's grey, telemetry is off. When it's
              green, it's on.
            </p>
          </Section>

          <Section title="7. Children's Privacy">
            <p>
              ReviewLens does not knowingly collect information from anyone under the age of 13.
              The extension does not require user registration and collects no personal information
              from any user, regardless of age.
            </p>
          </Section>

          <Section title="8. Changes to This Policy">
            <p>
              If we make material changes to this privacy policy, we will update the "Last updated"
              date at the top of this page and, where appropriate, notify users through the Chrome
              Web Store extension update mechanism.
            </p>
          </Section>

          <Section title="9. Contact">
            <p>
              Questions about this privacy policy? Open an issue on our GitHub repository.
              We read everything.
            </p>
            <div style={{ marginTop: '1rem' }}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--accent)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub — Open an Issue
              </a>
            </div>
          </Section>

        </div>
      </div>
    </main>
  );
}
