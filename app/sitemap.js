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
  ]);

  return [
    ...[...paths].map((path) => ({ url: url(path) })),
    ...caseStudies.map((c) => ({
      url: url(`/case-studies/${c.slug}`),
      ...(c.images && { images: [url(c.images.desktop), url(c.images.mobile)] }),
    })),
    ...posts.map((p) => ({
      url: url(`/blog/${p.slug}`),
      lastModified: p.updated || p.date,
      images: [url(p.image)],
    })),
  ];
}
