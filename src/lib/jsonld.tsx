const ORIGIN = 'https://kuldip2916.github.io/reviewlense';

export function softwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'ReviewLens',
    operatingSystem: 'Chrome OS, macOS, Windows, Linux',
    applicationCategory: 'BrowserApplication',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      ratingCount: '12',
    },
    url: ORIGIN,
    description:
      'Free Chrome extension that detects fake reviews on Amazon, Walmart, eBay, and Etsy using AI signals plus Reddit cross-referencing.',
  };
}

export function faqPageSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}

export function blogPostingSchema(p: {
  title: string;
  description: string;
  slug: string;
  datePublished: string; // ISO 8601 — convert from BlogPost's "April 1, 2026" format
  dateModified?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.description,
    author: { '@type': 'Organization', name: 'ReviewLens' },
    datePublished: p.datePublished,
    dateModified: p.dateModified ?? p.datePublished,
    mainEntityOfPage: `${ORIGIN}/blog/${p.slug}`,
  };
}

export function JsonLd({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
