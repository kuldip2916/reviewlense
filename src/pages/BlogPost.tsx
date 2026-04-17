import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from '../components/Icons';

// Import blog content components
import FakeAmazonReviewsPost from '../blog/fake-amazon-reviews';
import FakespotAlternativesPost from '../blog/fakespot-alternatives';
import AreReviewsFakePost from '../blog/are-reviews-fake';

interface BlogPostMetadata {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  component: React.ComponentType;
}

const blogPostsMap: Record<string, BlogPostMetadata> = {
  'how-to-spot-fake-amazon-reviews-2026': {
    slug: 'how-to-spot-fake-amazon-reviews-2026',
    title: 'How to Spot Fake Amazon Reviews in 2026',
    date: 'April 1, 2026',
    readTime: '6 min read',
    category: 'Guide',
    component: FakeAmazonReviewsPost,
  },
  'best-fakespot-alternatives-2026': {
    slug: 'best-fakespot-alternatives-2026',
    title: 'Best Fakespot Alternatives in 2026 (Free & Paid)',
    date: 'March 28, 2026',
    readTime: '5 min read',
    category: 'Roundup',
    component: FakespotAlternativesPost,
  },
  'are-online-reviews-fake': {
    slug: 'are-online-reviews-fake',
    title: 'Are Online Reviews Fake? How to Tell in Seconds',
    date: 'March 25, 2026',
    readTime: '4 min read',
    category: 'Guide',
    component: AreReviewsFakePost,
  },
};

const allSlugs = Object.keys(blogPostsMap);

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  if (!slug || !blogPostsMap[slug]) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#050710',
          color: '#f1f5f9',
          fontFamily: 'Inter, sans-serif',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: 120,
          paddingBottom: 80,
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16 }}>Post not found</h1>
          <p style={{ color: '#94a3b8', marginBottom: 24 }}>
            Sorry, we couldn't find the blog post you're looking for.
          </p>
          <Link
            to="/blog"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: '#6366f1',
              color: '#ffffff',
              borderRadius: 8,
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#818cf8';
              e.currentTarget.style.boxShadow = '0 0 0 1px rgba(99, 102, 241, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#6366f1';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const post = blogPostsMap[slug];
  const PostComponent = post.component;

  // Get previous and next posts
  const currentIndex = allSlugs.indexOf(slug);
  const prevPost = currentIndex > 0 ? blogPostsMap[allSlugs[currentIndex - 1]] : null;
  const nextPost = currentIndex < allSlugs.length - 1 ? blogPostsMap[allSlugs[currentIndex + 1]] : null;

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

  const categoryColor = getCategoryColor(post.category);

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
      {/* Back Button */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 20px', marginBottom: 48 }}>
        <Link
          to="/blog"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            color: '#6366f1',
            textDecoration: 'none',
            fontSize: 14,
            fontWeight: 600,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.gap = '12px';
            e.currentTarget.style.color = '#818cf8';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.gap = '8px';
            e.currentTarget.style.color = '#6366f1';
          }}
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>
      </div>

      {/* Post Header */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 20px', marginBottom: 48 }}>
        <div style={{ marginBottom: 20 }}>
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
        <h1
          style={{
            fontSize: 48,
            fontWeight: 800,
            marginBottom: 20,
            lineHeight: 1.2,
            color: '#ffffff',
          }}
        >
          {post.title}
        </h1>
        <div
          style={{
            display: 'flex',
            gap: 24,
            color: '#94a3b8',
            fontSize: 14,
          }}
        >
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
      </div>

      {/* Post Content */}
      <div style={{ marginBottom: 64 }}>
        <PostComponent />
      </div>

      {/* CTA Box */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 20px', marginBottom: 64 }}>
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(99, 102, 241, 0.05))',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            borderRadius: 12,
            padding: 40,
            textAlign: 'center',
          }}
        >
          <h3
            style={{
              fontSize: 24,
              fontWeight: 700,
              marginBottom: 12,
              color: '#ffffff',
            }}
          >
            Ready to find fake reviews instantly?
          </h3>
          <p
            style={{
              fontSize: 16,
              color: '#cbd5e1',
              marginBottom: 24,
              maxWidth: 500,
              margin: '0 auto 24px',
            }}
          >
            ReviewLens automatically analyzes product reviews across Amazon, Walmart, eBay, and more - including
            Reddit sentiment.
          </p>
          <a
            href="https://chromewebstore.google.com/detail/reviewlens-fake-review-de/ncneomnblmiefoplgpcpkjijkhpafkei"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '14px 32px',
              background: '#6366f1',
              color: '#ffffff',
              borderRadius: 8,
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: 15,
              transition: 'all 0.3s ease',
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#818cf8';
              e.currentTarget.style.boxShadow = '0 0 0 1px rgba(99, 102, 241, 0.4), 0 8px 20px rgba(99, 102, 241, 0.2)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#6366f1';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Try ReviewLens Free
            <ExternalLink size={16} />
          </a>
        </div>
      </div>

      {/* Previous/Next Navigation */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: prevPost ? '1fr 1fr' : '1fr',
            gap: 32,
            marginBottom: 0,
          }}
        >
          {prevPost && (
            <Link
              to={`/blog/${prevPost.slug}`}
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
                  padding: 24,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = 'rgba(99, 102, 241, 0.4)';
                  el.style.background = 'rgba(99, 102, 241, 0.05)';
                  el.style.boxShadow =
                    '0 0 0 1px rgba(99, 102, 241, 0.2), 0 16px 40px rgba(99, 102, 241, 0.1)';
                  el.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                  el.style.background = 'rgba(255, 255, 255, 0.03)';
                  el.style.boxShadow = 'none';
                  el.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 8 }}>← Previous Post</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#ffffff', lineHeight: 1.4, marginBottom: 0 }}>
                  {prevPost.title}
                </h3>
              </div>
            </Link>
          )}

          {nextPost && (
            <Link
              to={`/blog/${nextPost.slug}`}
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
                  padding: 24,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  textAlign: prevPost ? 'right' : 'left',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = 'rgba(99, 102, 241, 0.4)';
                  el.style.background = 'rgba(99, 102, 241, 0.05)';
                  el.style.boxShadow =
                    '0 0 0 1px rgba(99, 102, 241, 0.2), 0 16px 40px rgba(99, 102, 241, 0.1)';
                  el.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                  el.style.background = 'rgba(255, 255, 255, 0.03)';
                  el.style.boxShadow = 'none';
                  el.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 8 }}>Next Post →</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#ffffff', lineHeight: 1.4, marginBottom: 0 }}>
                  {nextPost.title}
                </h3>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
