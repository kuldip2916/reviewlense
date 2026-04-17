/**
 * Website-local copy of the analyzer response types. Kept in sync with
 * analyzer-worker/src/types.ts and src/shared/types.ts.
 */

export type Platform = 'amazon' | 'walmart' | 'ebay' | 'etsy';

export interface ReviewFlag {
  type: 'HIGH_UNVERIFIED_RATIO' | 'REVIEW_BURST' | 'RATING_CLUSTERING' | 'GENERIC_REVIEWS';
  severity: 'low' | 'medium' | 'high';
  description: string;
}

export interface ReviewAnalysisResult {
  totalReviews: number;
  authenticityScore: number;
  flags: ReviewFlag[];
  ratingDistribution: Record<number, number>;
  suspiciousReviewCount: number;
  verifiedPurchaseRatio: number;
  reviewVelocity: string;
}

export interface RedditSentimentResult {
  sentimentScore: number;
  postCount: number;
  topSubreddits: string[];
  summary: string;
  posts: Array<{
    title: string;
    url: string;
    subreddit: string;
    score: number;
    sentiment: 'positive' | 'negative' | 'neutral';
  }>;
}

export interface ReviewAnalysis {
  productId: string;
  platform: Platform;
  productName: string;
  overallScore: number;
  reviewAnalysis: ReviewAnalysisResult;
  redditSentiment: RedditSentimentResult;
  analyzedAt: number;
}

export interface AmazonSentinel {
  error: 'AMAZON_REQUIRES_EXTENSION';
  message: string;
  productId: string;
  productName: string;
}

export interface ErrorResponse {
  error: 'RATE_LIMITED' | 'INVALID_JSON' | 'INVALID_URL' | 'UNSUPPORTED_URL';
  message?: string;
  retryAfter?: number;
}

export type AnalyzeResponse = ReviewAnalysis | AmazonSentinel | ErrorResponse;

export function isAmazonSentinel(r: AnalyzeResponse): r is AmazonSentinel {
  return 'error' in r && r.error === 'AMAZON_REQUIRES_EXTENSION';
}

export function isError(r: AnalyzeResponse): r is ErrorResponse {
  return 'error' in r && r.error !== 'AMAZON_REQUIRES_EXTENSION';
}

export function scoreToColor(score: number): string {
  if (score >= 80) return '#22c55e';
  if (score >= 65) return '#84cc16';
  if (score >= 50) return '#f59e0b';
  if (score >= 35) return '#ef4444';
  return '#dc2626';
}

export function scoreToGrade(score: number): 'A' | 'B' | 'C' | 'D' | 'F' {
  if (score >= 80) return 'A';
  if (score >= 65) return 'B';
  if (score >= 50) return 'C';
  if (score >= 35) return 'D';
  return 'F';
}

export const PLATFORM_META: Record<Platform, { name: string; accent: string; idLabel: string }> = {
  amazon:  { name: 'Amazon',  accent: '#f59e0b', idLabel: 'ASIN' },
  walmart: { name: 'Walmart', accent: '#0071CE', idLabel: 'Item ID' },
  ebay:    { name: 'eBay',    accent: '#e53238', idLabel: 'Item ID' },
  etsy:    { name: 'Etsy',    accent: '#f1641e', idLabel: 'Listing ID' },
};
