import { motion } from 'framer-motion';
import { ShieldCheck } from '../Icons';
import { PLATFORM_META } from './types';

const CHROME_STORE_URL =
  'https://chromewebstore.google.com/detail/reviewlens-fake-review-de/ncneomnblmiefoplgpcpkjijkhpafkei';

interface Props {
  productName: string;
  productId: string;
  message: string;
  onTryAnother: () => void;
}

export function AmazonExtensionCTA({ productName, productId, message, onTryAnother }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
      style={{
        padding: '3rem 1.5rem 5rem',
        maxWidth: 720,
        margin: '0 auto',
      }}
    >
      <div
        className="card"
        style={{
          padding: '2.5rem 2rem',
          background:
            'linear-gradient(135deg, rgba(245,158,11,0.10) 0%, transparent 60%)',
          borderColor: 'rgba(245,158,11,0.25)',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 60,
            height: 60,
            borderRadius: 16,
            background: 'rgba(245,158,11,0.15)',
            border: '1px solid rgba(245,158,11,0.35)',
            marginBottom: '1.25rem',
            fontSize: 28,
          }}
        >
          📦
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, marginBottom: 8 }}
        >
          Amazon analysis lives in the{' '}
          <span style={{ color: PLATFORM_META.amazon.accent }}>extension</span>
        </motion.h2>

        {productName && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ fontSize: 14, color: 'var(--sub)', marginBottom: 8 }}
          >
            {productName}{' '}
            <span
              style={{
                fontSize: 11,
                fontFamily: 'monospace',
                color: 'var(--muted)',
                background: 'var(--surface)',
                padding: '2px 8px',
                borderRadius: 6,
                marginLeft: 6,
              }}
            >
              {productId}
            </span>
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ color: 'var(--sub)', fontSize: 15, lineHeight: 1.65, marginBottom: '1.75rem' }}
        >
          {message}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a
            href={CHROME_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            <ShieldCheck size={16} color="#fff" />
            Install ReviewLens (free)
          </a>
          <button
            onClick={onTryAnother}
            style={{
              padding: '14px 24px',
              borderRadius: 12,
              border: '1px solid var(--border)',
              background: 'transparent',
              color: 'var(--sub)',
              fontSize: 15,
              fontFamily: 'inherit',
              cursor: 'pointer',
            }}
          >
            Try another URL
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          style={{ color: 'var(--muted)', fontSize: 12, marginTop: '1.5rem', lineHeight: 1.6 }}
        >
          Why not here? Amazon blocks server-side review fetches. The extension runs inside
          your browser on the product page, so it has the access we need.
        </motion.p>
      </div>
    </motion.section>
  );
}
