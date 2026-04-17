import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AnalyzeHero } from '../components/analyze/AnalyzeHero';
import { AnalyzeLoading } from '../components/analyze/AnalyzeLoading';
import { AnalyzeResult } from '../components/analyze/AnalyzeResult';
import { AmazonExtensionCTA } from '../components/analyze/AmazonExtensionCTA';
import {
  AnalyzeResponse,
  AmazonSentinel,
  ReviewAnalysis,
  ErrorResponse,
  isAmazonSentinel,
  isError,
  Platform,
} from '../components/analyze/types';

// Cloudflare Worker URL - deployed from /analyzer-worker/.
const ANALYZE_ENDPOINT = 'https://reviewlens-analyzer.reviewlens-telemetry.workers.dev/analyze';

type State =
  | { kind: 'hero' }
  | { kind: 'loading'; platform: Platform | null }
  | { kind: 'result'; analysis: ReviewAnalysis }
  | { kind: 'amazon'; sentinel: AmazonSentinel }
  | { kind: 'error'; error: ErrorResponse };

function detectPlatformFromUrl(url: string): Platform | null {
  if (/walmart\.com/.test(url)) return 'walmart';
  if (/ebay\./.test(url)) return 'ebay';
  if (/etsy\.com/.test(url)) return 'etsy';
  if (/amazon\./.test(url)) return 'amazon';
  return null;
}

export default function Analyze() {
  // Read ?url= from the hash segment. HashRouter gives us `#/analyze?url=...`
  // but useSearchParams in HashRouter doesn't cover that - parse manually.
  const initialUrl = (() => {
    const hash = window.location.hash;
    const q = hash.indexOf('?');
    if (q === -1) return '';
    return new URLSearchParams(hash.slice(q + 1)).get('url') || '';
  })();

  const [state, setState] = useState<State>({ kind: 'hero' });

  async function analyze(url: string) {
    setState({ kind: 'loading', platform: detectPlatformFromUrl(url) });
    try {
      const res = await fetch(ANALYZE_ENDPOINT, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const body: AnalyzeResponse = await res.json();

      if (isAmazonSentinel(body)) {
        setState({ kind: 'amazon', sentinel: body });
        return;
      }
      if (isError(body)) {
        setState({ kind: 'error', error: body });
        return;
      }
      setState({ kind: 'result', analysis: body as ReviewAnalysis });
    } catch {
      setState({
        kind: 'error',
        error: { error: 'INVALID_URL', message: 'Network error - please try again.' },
      });
    }
  }

  // Auto-submit when ?url=... is present
  useEffect(() => {
    if (initialUrl && state.kind === 'hero') {
      analyze(initialUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reset = () => setState({ kind: 'hero' });

  return (
    <main style={{ paddingTop: '5rem', minHeight: '80vh' }}>
      <AnimatePresence mode="wait">
        {state.kind === 'hero' && (
          <AnalyzeHero key="hero" initialUrl={initialUrl} onSubmit={analyze} />
        )}

        {state.kind === 'loading' && (
          <AnalyzeLoading key="loading" platform={state.platform} />
        )}

        {state.kind === 'result' && (
          <AnalyzeResult key="result" analysis={state.analysis} onReset={reset} />
        )}

        {state.kind === 'amazon' && (
          <AmazonExtensionCTA
            key="amazon"
            productName={state.sentinel.productName}
            productId={state.sentinel.productId}
            message={state.sentinel.message}
            onTryAnother={reset}
          />
        )}

        {state.kind === 'error' && (
          <ErrorView key="error" error={state.error} onRetry={reset} />
        )}
      </AnimatePresence>
    </main>
  );
}

function ErrorView({ error, onRetry }: { error: ErrorResponse; onRetry: () => void }) {
  const isRateLimit = error.error === 'RATE_LIMITED';
  const minutes =
    isRateLimit && error.retryAfter ? Math.ceil(error.retryAfter / 60) : 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      style={{
        padding: '5rem 1.5rem',
        maxWidth: 560,
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <div
        className="card"
        style={{
          padding: '2rem 1.75rem',
          borderColor: 'rgba(239,68,68,0.3)',
          background: 'rgba(239,68,68,0.05)',
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 12 }}>{isRateLimit ? '⏳' : '⚠️'}</div>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>
          {isRateLimit ? 'Slow down a little' : "Couldn't analyze that URL"}
        </h3>
        <p style={{ fontSize: 14, color: 'var(--sub)', lineHeight: 1.65, marginBottom: 20 }}>
          {isRateLimit
            ? `We limit this to 20 analyses per hour per visitor. Try again in ${minutes || 1} minute${minutes > 1 ? 's' : ''}.`
            : error.message ||
              'Paste a direct Walmart, eBay, or Etsy product link (must include a product ID).'}
        </p>
        <button
          onClick={onRetry}
          className="btn-primary"
          style={{ padding: '12px 22px' }}
        >
          Try another URL
        </button>
      </div>
    </motion.section>
  );
}
