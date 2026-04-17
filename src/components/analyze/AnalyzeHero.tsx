import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from '../Icons';
import { PLATFORM_META } from './types';

interface Props {
  initialUrl: string;
  onSubmit: (url: string) => void;
  disabled?: boolean;
}

export function AnalyzeHero({ initialUrl, onSubmit, disabled }: Props) {
  const [value, setValue] = useState(initialUrl);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) onSubmit(trimmed);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        padding: '5rem 1.5rem 3rem',
        textAlign: 'center',
        maxWidth: 760,
        margin: '0 auto',
      }}
    >
      <motion.div
        className="section-tag"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Sparkles size={14} /> No install · No account · Just paste a link
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        style={{
          fontSize: 'clamp(2.25rem, 6vw, 3.75rem)',
          fontWeight: 800,
          lineHeight: 1.12,
          letterSpacing: '-0.02em',
          marginBottom: '1rem',
        }}
      >
        Check a product before you{' '}
        <span className="gradient-text">hit buy</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        style={{
          fontSize: '1.1rem',
          color: 'var(--sub)',
          lineHeight: 1.65,
          maxWidth: 560,
          margin: '0 auto 2.5rem',
        }}
      >
        Paste a Walmart, eBay, or Etsy product link. We'll analyze its reviews
        for manipulation patterns and cross-reference with real Reddit
        discussions.
      </motion.p>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.5 }}
        style={{
          display: 'flex',
          gap: 10,
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: '1.5rem',
          maxWidth: 640,
          marginInline: 'auto',
        }}
      >
        <input
          type="url"
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="https://www.walmart.com/ip/..."
          disabled={disabled}
          style={{
            flex: '1 1 320px',
            minWidth: 260,
            padding: '16px 18px',
            borderRadius: 14,
            border: '1px solid var(--border)',
            background: 'var(--surface)',
            color: 'var(--text)',
            fontSize: 15,
            fontFamily: 'inherit',
            outline: 'none',
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'rgba(99,102,241,0.45)';
            e.currentTarget.style.boxShadow = '0 0 0 4px rgba(99,102,241,0.12)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
        <button
          type="submit"
          className="btn-primary"
          disabled={disabled || !value.trim()}
          style={{
            padding: '14px 28px',
            fontSize: 15,
            opacity: disabled || !value.trim() ? 0.55 : 1,
            cursor: disabled || !value.trim() ? 'not-allowed' : 'pointer',
          }}
        >
          Analyze →
        </button>
      </motion.form>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{
          display: 'flex',
          gap: 10,
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginTop: 8,
        }}
      >
        {(['walmart', 'ebay', 'etsy', 'amazon'] as const).map((p) => {
          const meta = PLATFORM_META[p];
          const isAmazon = p === 'amazon';
          return (
            <span
              key={p}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 11,
                fontWeight: 600,
                color: isAmazon ? 'var(--muted)' : meta.accent,
                background: isAmazon ? 'transparent' : `${meta.accent}14`,
                border: `1px solid ${isAmazon ? 'var(--border)' : `${meta.accent}40`}`,
                borderRadius: 999,
                padding: '4px 12px',
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: isAmazon ? '#475569' : meta.accent,
                }}
              />
              {meta.name}
              {isAmazon && (
                <span style={{ fontSize: 10, color: 'var(--muted)' }}>(extension only)</span>
              )}
            </span>
          );
        })}
      </motion.div>
    </motion.section>
  );
}
