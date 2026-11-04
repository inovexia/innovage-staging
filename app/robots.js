import { SITE_URL } from '@/lib/seo';

// Served at /robots.txt. /_next is left open because search engines need its CSS and JS to render pages.
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
