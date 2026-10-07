// Shared page metadata: title, description, canonical URL, Open Graph and Twitter card.
// Next.js doesn't copy a page's title/description into og:* tags, so every page builds them here.

export const SITE_NAME = 'Innovage';

// Absolute base for og:image / canonical URLs. Netlify sets URL to the site's primary URL at build time;
// set SITE_URL to override (e.g. https://innovagesoft.com once the domain points here).
export const SITE_URL = (process.env.SITE_URL || process.env.URL || 'https://innovagesoft.com').replace(/\/$/, '');

export const DEFAULT_TITLE = 'Innovage — We Build Digital Products That Move Your Business Forward';
export const DEFAULT_DESCRIPTION =
  'Custom web apps, business portals, SaaS platforms and mobile applications — designed around the way your business actually works. Canadian-based, 10+ years, 100+ projects.';
export const DEFAULT_IMAGE = { url: '/og-image.png', width: 1200, height: 630, alt: 'Innovage — We Build Digital Products That Move Your Business Forward' };

/**
 * @param {object} o
 * @param {string} [o.title]        page title (the layout template appends " | Innovage")
 * @param {string} [o.description]
 * @param {string} [o.path]         route path, e.g. "/about"
 * @param {object} [o.image]        { url, width, height, alt } — defaults to the site share image
 * @param {string} [o.type]         "website" | "article"
 * @param {object} [o.openGraph]    extra og fields (e.g. publishedTime)
 */
export function pageMeta({ title, description = DEFAULT_DESCRIPTION, path = '/', image = DEFAULT_IMAGE, type = 'website', openGraph = {} } = {}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const images = [{ ...image, alt: image.alt || fullTitle }];
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: SITE_NAME,
      locale: 'en_CA',
      url: path,
      title: fullTitle,
      description,
      images,
      ...openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: images.map((i) => i.url),
    },
  };
}
