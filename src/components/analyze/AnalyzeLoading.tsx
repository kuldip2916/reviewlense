import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PLATFORM_META, Platform } from './types';

interface Props {
  platform: Platform | null;
}

const STEPS = [
  { key: 'detect',  label: (p: Platform | null) => p ? `Detected ${PLATFORM_META[p].name}` : 'Detecting platform…' },
  { key: 'reviews', label: () => 'Fetching review signals' },
  { key: 'reddit',  label: () => 'Searching Reddit discussions' },
  { key: 'score',   label: () => 'Computing authenticity score' },
];

// Reveal the steps one after another, then hold the last one as "thinking"
// until the real request completes and the parent unmounts us.
export function AnalyzeLoading({ platform }: Props) {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (visible >= STEPS.length) return;
    const t = setTimeout(() => setVisible((v) => v + 1), visible === 0 ? 120 : 600);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      style={{
        padding: '5rem 1.5rem 4rem',
        maxWidth: 560,
        margin: '0 auto',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          fontSize: 12,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          marginBottom: '1.5rem',
        }}
      >
        Analyzing
      </div>

      <div
        className="card"
        style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: 14 }}
      >
        {STEPS.map((step, i) => {
          const isActive = i === Math.min(visible - 1, STEPS.length - 1);
          const isDone = i < visible - 1;
          const isPending = i >= visible;
          if (isPending) return null;

          return (
            <motion.div
              key={step.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                color: 'var(--text)',
                fontSize: 14,
              }}
            >
              <StepIcon state={isDone ? 'done' : isActive ? 'active' : 'pending'} />
              <span style={{ color: isDone ? 'var(--sub)' : 'var(--text)' }}>
                {step.label(platform)}
                {isActive && '…'}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Shimmer bar */}
      <div
        style={{
          marginTop: '1.25rem',
          height: 3,
          borderRadius: 2,
          background: 'var(--surface)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          className="shimmer-text"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, transparent 0%, #6366f1 30%, #a78bfa 50%, #06b6d4 70%, transparent 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s linear infinite',
          }}
        />
      </div>
    </motion.section>
  );
}

function StepIcon({ state }: { state: 'done' | 'active' | 'pending' }) {
  if (state === 'done') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="11" fill="#22c55e22" stroke="#22c55e" strokeWidth="1.5" />
        <path d="M7 12.5l3.5 3.5L17 8.5" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    );
  }
  if (state === 'active') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden style={{ animation: 'spin-slow 1.1s linear infinite' }}>
        <circle cx="12" cy="12" r="10" fill="none" stroke="#1e1e32" strokeWidth="2" />
        <circle cx="12" cy="12" r="10" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="16 48" strokeLinecap="round" />
      </svg>
    );
  }
  return <div style={{ width: 18, height: 18, borderRadius: '50%', border: '1.5px dashed var(--border2)' }} />;
}
