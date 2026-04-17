import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoSrc from '../assets/logo.png';

const CHROME_STORE_URL = 'https://chromewebstore.google.com/detail/reviewlens-fake-review-de/ncneomnblmiefoplgpcpkjijkhpafkei';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const navLinks = [
    { label: 'Try it',      to: '/analyze' },
    { label: 'Features',    to: '/features' },
    { label: 'Blog',        to: '/blog' },
    { label: 'FAQ',         to: '/faq' },
    { label: 'Privacy',     to: '/privacy' },
  ];

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      transition: 'all 0.3s',
      background: scrolled ? 'rgba(5,7,15,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
    }}>
      <nav style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '0 24px', height: 68,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <img
            src={logoSrc}
            alt="ReviewLens logo"
            style={{ width: 38, height: 38, objectFit: 'contain', filter: 'drop-shadow(0 0 8px rgba(99,102,241,0.6))' }}
          />
          <span style={{ fontWeight: 800, fontSize: 17, letterSpacing: '-0.02em' }}>
            Review<span style={{ color: '#6366f1' }}>Lens</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="desktop-nav">
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} style={{
              padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 500,
              color: pathname === link.to ? '#f1f5f9' : '#94a3b8',
              background: pathname === link.to ? 'rgba(255,255,255,0.06)' : 'transparent',
              transition: 'all 0.15s',
            }}
              onMouseEnter={e => { if (pathname !== link.to) (e.currentTarget as HTMLElement).style.color = '#f1f5f9'; }}
              onMouseLeave={e => { if (pathname !== link.to) (e.currentTarget as HTMLElement).style.color = '#94a3b8'; }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <a href={CHROME_STORE_URL} className="btn-primary" style={{ padding: '9px 20px', fontSize: 13 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
            </svg>
            Add to Chrome
          </a>
          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            display: 'none', background: 'none', border: 'none',
            color: '#94a3b8', padding: 4,
          }} className="mobile-menu-btn">
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
              }
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: 'rgba(5,7,15,0.95)', backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '16px 24px 24px',
        }}>
          {navLinks.map(link => (
            <Link key={link.to} to={link.to} style={{
              display: 'block', padding: '12px 0',
              fontSize: 16, fontWeight: 500,
              color: pathname === link.to ? '#f1f5f9' : '#94a3b8',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>
              {link.label}
            </Link>
          ))}
          <a href={CHROME_STORE_URL} className="btn-primary" style={{ marginTop: 16, width: '100%', justifyContent: 'center' }}>
            Add to Chrome — Free
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}
