import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { scoreToColor, scoreToGrade } from './types';

/**
 * Animated score ring that fills from 0 to `score` on mount.
 * Based on the Home.tsx ScoreRing but tuned for the larger result view.
 */
export function AnalyzeScoreRing({ score, size = 180 }: { score: number; size?: number }) {
  const [displayed, setDisplayed] = useState(0);
  const color = scoreToColor(score);
  const grade = scoreToGrade(score);
  const strokeWidth = 12;
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;
  const filled = (displayed / 100) * circ;

  useEffect(() => {
    let start: number | null = null;
    const duration = 1600;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(ease * score));
      if (progress < 1) requestAnimationFrame(step);
    };
    const timeout = setTimeout(() => requestAnimationFrame(step), 200);
    return () => clearTimeout(timeout);
  }, [score]);

  return (
    <motion.svg
      width={size}
      height={size}
      style={{ display: 'block' }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={`${filled} ${circ}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{
          transition: 'stroke-dasharray 0.06s linear',
          filter: `drop-shadow(0 0 16px ${color}55)`,
        }}
      />
      <text
        x={size / 2}
        y={size / 2 - 8}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={color}
        fontSize={size * 0.32}
        fontWeight={800}
        fontFamily="Inter, sans-serif"
      >
        {grade}
      </text>
      <text
        x={size / 2}
        y={size / 2 + size * 0.16}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={color}
        fontSize={size * 0.1}
        opacity={0.75}
        fontFamily="Inter, sans-serif"
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {displayed}/100
      </text>
    </motion.svg>
  );
}
