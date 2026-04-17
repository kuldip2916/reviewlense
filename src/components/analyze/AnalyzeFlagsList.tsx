import { motion } from 'framer-motion';
import { ReviewFlag } from './types';

const SEVERITY_COLORS: Record<ReviewFlag['severity'], string> = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#64748b',
};

const FLAG_TITLES: Record<ReviewFlag['type'], string> = {
  HIGH_UNVERIFIED_RATIO: 'Unverified purchases',
  REVIEW_BURST:          'Unusual review spike',
  RATING_CLUSTERING:     'Rating distribution',
  GENERIC_REVIEWS:       'Generic reviews',
};

export function AnalyzeFlagsList({ flags }: { flags: ReviewFlag[] }) {
  if (flags.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          padding: '14px 18px',
          borderRadius: 12,
          border: '1px solid rgba(34,197,94,0.3)',
          background: 'rgba(34,197,94,0.06)',
          color: '#22c55e',
          fontSize: 14,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span style={{ fontSize: 18 }}>✓</span>
        <span>No suspicious patterns detected</span>
      </motion.div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {flags.map((f, i) => {
        const color = SEVERITY_COLORS[f.severity];
        return (
          <motion.div
            key={f.type}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            style={{
              padding: '12px 14px 12px 18px',
              borderRadius: 12,
              borderLeft: `3px solid ${color}`,
              background: `${color}12`,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>
              <span>{FLAG_TITLES[f.type]}</span>
              <span
                style={{
                  fontSize: 10,
                  padding: '2px 8px',
                  borderRadius: 999,
                  color,
                  background: `${color}20`,
                  border: `1px solid ${color}50`,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  fontWeight: 700,
                }}
              >
                {f.severity}
              </span>
            </div>
            <div style={{ fontSize: 13, color: 'var(--sub)', lineHeight: 1.55 }}>{f.description}</div>
          </motion.div>
        );
      })}
    </div>
  );
}
