import { motion } from 'framer-motion';
import { RedditSentimentResult } from './types';

export function AnalyzeRedditPosts({ reddit }: { reddit: RedditSentimentResult }) {
  if (reddit.postCount === 0) {
    return (
      <div
        style={{
          padding: '14px 18px',
          borderRadius: 12,
          border: '1px solid var(--border)',
          background: 'var(--surface)',
          color: 'var(--sub)',
          fontSize: 14,
        }}
      >
        {reddit.summary}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ fontSize: 13, color: 'var(--sub)', lineHeight: 1.6 }}>{reddit.summary}</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {reddit.posts.map((p, i) => {
          const borderColor =
            p.sentiment === 'positive' ? 'rgba(34,197,94,0.25)'
            : p.sentiment === 'negative' ? 'rgba(239,68,68,0.25)'
            : 'var(--border)';
          const sentimentColor =
            p.sentiment === 'positive' ? '#22c55e'
            : p.sentiment === 'negative' ? '#ef4444'
            : '#64748b';

          return (
            <motion.a
              key={p.url}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              style={{
                display: 'block',
                padding: '12px 14px',
                borderRadius: 12,
                border: `1px solid ${borderColor}`,
                background: 'var(--surface)',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'transform 0.15s, border-color 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = borderColor;
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, marginBottom: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#a5b4fc' }}>r/{p.subreddit}</span>
                <span
                  style={{
                    fontSize: 11,
                    color: sentimentColor,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {p.sentiment === 'positive' ? '▲' : p.sentiment === 'negative' ? '▼' : '•'} {p.score}
                </span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5 }}>
                {p.title.length > 110 ? p.title.slice(0, 110) + '…' : p.title}
              </div>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
