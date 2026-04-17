import { Link } from 'react-router-dom';
import { ArrowRight } from '../components/Icons';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: 'how-to-spot-fake-amazon-reviews-2026',
    title: 'How to Spot Fake Amazon Reviews in 2026',
    date: 'April 1, 2026',
    readTime: '6 min read',
    excerpt:
      'Fake reviews on Amazon have gotten smarter. Here are the patterns to watch for — and what tools can help you see through them.',
    category: 'Guide',
  },
  {
    slug: 'best-fakespot-alternatives-2026',
    title: 'Best Fakespot Alternatives in 2026 (Free & Paid)',
    date: 'March 28, 2026',
    readTime: '5 min read',
    excerpt:
      "Fakespot shut down in July 2025. Here's what actually works now for checking if product reviews are real.",
    category: 'Roundup',
  },
  {
    slug: 'are-online-reviews-fake',
    title: 'Are Online Reviews Fake? How to Tell in Seconds',
    date: 'March 25, 2026',
    readTime: '4 min read',
    excerpt:
      "Nearly 40% of online reviews are estimated to be fake. Here's how to protect yourself before you buy.",
    category: 'Guide',
  },
];

export default function Blog() {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Guide':
        return { bg: 'rgba(99, 102, 241, 0.15)', text: '#a5b4fc' };
      case 'Roundup':
        return { bg: 'rgba(34, 197, 94, 0.15)', text: '#86efac' };
      case 'Tutorial':
        return { bg: 'rgba(249, 115, 22, 0.15)', text: '#fdba74' };
      default:
        return { bg: 'rgba(148, 163, 184, 0.15)', text: '#cbd5e1' };
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#050710',
        color: '#f1f5f9',
        fontFamily: 'Inter, sans-serif',
        paddingTop: 120,
        paddingBottom: 80,
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 20px',
          marginBottom: 80,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h1
            style={{
              fontSize: 56,
              fontWeight: 900,
              marginBottom: 16,
              color: '#ffffff',
              lineHeight: 1.2,
              background: 'linear-gradient(135deg, #ffffff, #cbd5e1)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Blog
          </h1>
          <p
            style={{
              fontSize: 20,
              color: '#94a3b8',
              maxWidth: 600,
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Tips, guides, and insights on spotting fake reviews and shopping smarter.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 20px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 32,
            marginBottom: 0,
          }}
        >
          {blogPosts.map((post) => {
            const categoryColor = getCategoryColor(post.category);
            return (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: 12,
                    padding: 32,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition:
                      'all 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = 'rgba(99, 102, 241, 0.4)';
                    el.style.background = 'rgba(99, 102, 241, 0.05)';
                    el.style.boxShadow =
                      '0 0 0 1px rgba(99, 102, 241, 0.2), 0 16px 40px rgba(99, 102, 241, 0.1)';
                    el.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                    el.style.background = 'rgba(255, 255, 255, 0.03)';
                    el.style.boxShadow = 'none';
                    el.style.transform = 'translateY(0)';
                  }}
                >
                  {/* Category Badge */}
                  <div style={{ marginBottom: 16 }}>
                    <span
                      style={{
                        display: 'inline-block',
                        background: categoryColor.bg,
                        color: categoryColor.text,
                        padding: '6px 12px',
                        borderRadius: 6,
                        fontSize: 12,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {post.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h2
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      marginBottom: 12,
                      lineHeight: 1.4,
                      color: '#ffffff',
                    }}
                  >
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p
                    style={{
                      fontSize: 15,
                      color: '#cbd5e1',
                      marginBottom: 16,
                      flex: 1,
                      lineHeight: 1.6,
                    }}
                  >
                    {post.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: 16,
                      borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                      marginBottom: 0,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        gap: 16,
                        fontSize: 12,
                        color: '#94a3b8',
                      }}
                    >
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        color: '#6366f1',
                        fontWeight: 600,
                        fontSize: 13,
                        transition: 'all 0.2s ease',
                      }}
                    >
                      Read
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
