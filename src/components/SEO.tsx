import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string; // path only, e.g. "/features". Omit to skip canonical (e.g. on /goodbye).
  ogImage?: string;   // path; defaults to /logo.png
}

const SITE_ORIGIN = 'https://reviewlense.com';

export default function SEO({ title, description, canonical, ogImage = '/logo.png' }: SEOProps) {
  useEffect(() => {
    document.title = title;
    upsertMeta('description', description);
    upsertMeta('og:title', title, true);
    upsertMeta('og:description', description, true);
    upsertMeta('og:type', 'website', true);
    upsertMeta('og:image', `${SITE_ORIGIN}${ogImage}`, true);
    upsertMeta('twitter:card', 'summary_large_image');
    upsertMeta('twitter:title', title);
    upsertMeta('twitter:description', description);
    if (canonical) {
      upsertLink('canonical', `${SITE_ORIGIN}${canonical}`);
      upsertMeta('og:url', `${SITE_ORIGIN}${canonical}`, true);
    }
  }, [title, description, canonical, ogImage]);
  return null;
}

function upsertMeta(name: string, content: string, ogStyle = false) {
  const attr = ogStyle ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}
