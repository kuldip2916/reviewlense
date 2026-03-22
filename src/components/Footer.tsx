import { Link } from 'react-router-dom';
import logoSrc from '../assets/logo.png';
import { Search } from './Icons';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '60px 24px 36px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 48, marginBottom: 56,
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <img
                src={logoSrc}
                alt="ReviewLens logo"
                style={{ width: 36, height: 36, objectFit: 'contain' }}
              />
              <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: '-0.02em' }}>
                Review<span style={{ color: '#6366f1' }}>Lens</span>
              </span>
            </div>
            <p style={{ fontSize: 13, color: '#4b5563', lineHeight: 1.7, maxWidth: 220 }}>
              Free Chrome extension that detects fake reviews on Amazon, Walmart, eBay &amp; Etsy.
            </p>
          </div>

          {/* Product */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
              Product
            </div>
            {[
              { label: 'Features', to: '/features' },
              { label: 'FAQ', to: '/faq' },
              { label: 'Privacy Policy', to: '/privacy' },
            ].map(l => (
              <Link key={l.to} to={l.to} style={{
                display: 'block', fontSize: 14, color: '#4b5563',
                marginBottom: 10, transition: 'color 0.15s',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#94a3b8'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#4b5563'}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Supported */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
              Supported Platforms
            </div>
            {[
              { label: 'Amazon', color: '#f59e0b' },
              { label: 'Walmart', color: '#0071CE' },
              { label: 'eBay', color: '#e53238' },
              { label: 'Etsy', color: '#f1641e' },
            ].map(p => (
              <div key={p.label} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: p.color }} />
                <span style={{ fontSize: 14, color: '#4b5563' }}>{p.label}</span>
              </div>
            ))}
          </div>

          {/* Install */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
              Install Free
            </div>
            <p style={{ fontSize: 13, color: '#4b5563', lineHeight: 1.7, marginBottom: 16 }}>
              Available on the Chrome Web Store. No account, no subscription.
            </p>
            <a href="https://chromewebstore.google.com/detail/reviewlens-fake-review-de/ncneomnblmiefoplgpcpkjijkhpafkei" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)',
              color: '#6366f1', borderRadius: 10, padding: '9px 16px',
              fontSize: 13, fontWeight: 600, transition: 'all 0.2s',
            }}>
              <Search size={14} color="#6366f1" /> Add to Chrome
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: 24,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 12,
        }}>
          <span style={{ fontSize: 13, color: '#374151' }}>
            © {year} ReviewLens. All rights reserved.
          </span>
          <span style={{ fontSize: 13, color: '#374151' }}>
            Built to protect shoppers from fake reviews.
          </span>
        </div>
      </div>
    </footer>
  );
}
