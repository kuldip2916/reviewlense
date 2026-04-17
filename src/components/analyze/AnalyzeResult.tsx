import { motion } from 'framer-motion';
import { ShieldCheck, RedditIcon } from '../Icons';
import { AnalyzeScoreRing } from './AnalyzeScoreRing';
import { AnalyzeFlagsList } from './AnalyzeFlagsList';
import { AnalyzeRedditPosts } from './AnalyzeRedditPosts';
import { PLATFORM_META, ReviewAnalysis, scoreToColor } from './types';

const CHROME_STORE_URL =
  'https://chromewebstore.google.com/detail/reviewlens-fake-review-de/ncneomnblmiefoplgpcpkjijkhpafkei';

interface Props {
  analysis: ReviewAnalysis;
  onReset: () => void;
}

export function AnalyzeResult({ analysis, onReset }: Props) {
  const meta = PLATFORM_META[analysis.platform];
  const authColor = scoreToColor(analysis.reviewAnalysis.authenticityScore);
  const redditColor = scoreToColor(analysis.redditSentiment.sentimentScore);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        padding: '3rem 1.5rem 5rem',
        maxWidth: 960,
        margin: '0 auto',
      }}
    >
      {/* Header - product meta + ScoreRing */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) auto',
          gap: '2rem',
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
        }}
        className="analyze-header-grid"
      >
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '4px 10px',
              borderRadius: 999,
              background: `${meta.accent}14`,
              border: `1px solid ${meta.accent}40`,
              fontSize: 11,
              fontWeight: 700,
              color: meta.accent,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: 10,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: meta.accent }} />
            {meta.name}
          </div>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, lineHeight: 1.2, marginBottom: 10 }}>
            {analysis.productName}
          </h2>
          <div style={{ fontSize: 13, color: 'var(--muted)', fontFamily: 'monospace' }}>
            {meta.idLabel}: {analysis.productId}
          </div>
        </motion.div>

        <div style={{ justifySelf: 'end' }}>
          <AnalyzeScoreRing score={analysis.overallScore} size={180} />
        </div>
      </div>

      {/* Two score bars */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        className="card"
        style={{
          padding: '1.5rem',
          marginBottom: 20,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 20,
        }}
      >
        <ScoreBar
          label="Review authenticity"
          sub={`${analysis.reviewAnalysis.totalReviews} reviews · ${Math.round(analysis.reviewAnalysis.verifiedPurchaseRatio * 100)}% verified`}
          value={analysis.reviewAnalysis.authenticityScore}
          color={authColor}
          icon={<ShieldCheck size={18} color={authColor} />}
        />
        <ScoreBar
          label="Reddit sentiment"
          sub={`${analysis.redditSentiment.postCount} discussion${analysis.redditSentiment.postCount !== 1 ? 's' : ''} found`}
          value={analysis.redditSentiment.sentimentScore}
          color={redditColor}
          icon={<RedditIcon size={18} color={redditColor} />}
        />
      </motion.div>

      {/* Two columns - flags + reddit */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 20,
          marginBottom: 24,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="card"
          style={{ padding: '1.5rem' }}
        >
          <SectionHeader title="Signals detected" count={analysis.reviewAnalysis.flags.length} />
          <AnalyzeFlagsList flags={analysis.reviewAnalysis.flags} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="card"
          style={{ padding: '1.5rem' }}
        >
          <SectionHeader title="What Reddit thinks" count={analysis.redditSentiment.postCount} />
          <AnalyzeRedditPosts reddit={analysis.redditSentiment} />
        </motion.div>
      </div>

      {/* CTA + reset */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="card"
        style={{
          padding: '1.75rem',
          background: 'linear-gradient(135deg, rgba(99,102,241,0.10) 0%, transparent 70%)',
          borderColor: 'rgba(99,102,241,0.3)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>
            See this on every product page you visit
          </div>
          <div style={{ fontSize: 13, color: 'var(--sub)', maxWidth: 440 }}>
            Install the free ReviewLens extension and get this analysis automatically,
            including Amazon.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button
            onClick={onReset}
            style={{
              padding: '12px 18px',
              borderRadius: 10,
              border: '1px solid var(--border)',
              background: 'transparent',
              color: 'var(--sub)',
              fontSize: 14,
              fontFamily: 'inherit',
              cursor: 'pointer',
            }}
          >
            Analyze another
          </button>
          <a
            href={CHROME_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            <ShieldCheck size={16} color="#fff" />
            Install ReviewLens
          </a>
        </div>
      </motion.div>
    </motion.section>
  );
}

function SectionHeader({ title, count }: { title: string; count: number }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 14,
        paddingBottom: 10,
        borderBottom: '1px solid var(--border)',
      }}
    >
      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        {title}
      </span>
      <span style={{ fontSize: 12, color: 'var(--sub)', fontVariantNumeric: 'tabular-nums' }}>{count}</span>
    </div>
  );
}

function ScoreBar({
  label,
  sub,
  value,
  color,
  icon,
}: {
  label: string;
  sub: string;
  value: number;
  color: string;
  icon: React.ReactNode;
}) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        {icon}
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{label}</div>
        <div
          style={{
            marginLeft: 'auto',
            fontSize: 16,
            fontWeight: 700,
            color,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {value}
        </div>
      </div>
      <div
        style={{
          height: 6,
          borderRadius: 3,
          background: 'var(--surface)',
          overflow: 'hidden',
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          style={{
            height: '100%',
            background: color,
            borderRadius: 3,
            boxShadow: `0 0 12px ${color}55`,
          }}
        />
      </div>
      <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>{sub}</div>
    </div>
  );
}
