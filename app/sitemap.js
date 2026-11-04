import { services, caseStudies } from '@/lib/data';
import { posts } from '@/lib/posts';
import { PAGE_META, SITE_URL } from '@/lib/seo';

const url = (path) => `${SITE_URL}${path === '/' ? '' : path}`;

// Served at /sitemap.xml. Built from the same content as the pages, so new entries are listed automatically.
// Only blog posts carry a real date; other pages leave lastModified out rather than report the build time.
export default function sitemap() {
  const paths = new Set([
    '/',
    ...Object.keys(PAGE_META),
    ...services.map((s) => `/services/${s.slug}`),
    ...caseStudies.map((c) => `/case-studies/${c.slug}`),
  ]);

  return [
    ...[...paths].map((path) => ({ url: url(path) })),
    ...posts.map((p) => ({ url: url(`/blog/${p.slug}`), lastModified: p.date })),
  ];
}
