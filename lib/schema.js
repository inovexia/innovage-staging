// Structured data (schema.org JSON-LD) for search engines. Rendered through components/JsonLd.js.
// Only describes facts already on the site: don't add ratings or reviews here until they are real and visible on the page.
import { site } from '@/lib/data';
import { DEFAULT_DESCRIPTION, DEFAULT_IMAGE, PAGE_META, SITE_NAME, SITE_URL } from '@/lib/seo';

const abs = (path) => (path === '/' ? SITE_URL : `${SITE_URL}${path}`);
const ORG_ID = `${SITE_URL}/#organization`;
const LOGO = abs('/images/innovage-logo-dark.png');
const CANADA = { '@type': 'Country', name: 'Canada' };

// How other schema items point at the company, so search engines treat them as one entity.
const orgRef = { '@type': 'Organization', '@id': ORG_ID, name: SITE_NAME, url: SITE_URL, logo: LOGO };

export const organizationSchema = () => ({
  '@type': 'ProfessionalService',
  '@id': ORG_ID,
  name: SITE_NAME,
  legalName: site.legalName,
  url: SITE_URL,
  logo: LOGO,
  image: abs(DEFAULT_IMAGE.url),
  description: DEFAULT_DESCRIPTION,
  telephone: site.phoneHref.replace('tel:', ''),
  email: site.email,
  address: { '@type': 'PostalAddress', ...site.postalAddress },
  areaServed: CANADA,
});

export const websiteSchema = () => ({
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  publisher: { '@id': ORG_ID },
});

export const breadcrumbSchema = (crumbs, path) => {
  const items = [{ label: 'Home', href: '/' }, ...crumbs];
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: abs(c.href || path),
    })),
  };
};

export const serviceSchema = (service) => {
  const path = `/services/${service.slug}`;
  return {
    '@type': 'Service',
    name: service.title,
    serviceType: service.title,
    description: PAGE_META[path]?.description || `${service.tagline}. ${service.summary}`,
    url: abs(path),
    provider: orgRef,
    areaServed: CANADA,
  };
};

export const softwareSchema = () => ({
  '@type': 'SoftwareApplication',
  name: 'CanHub 365',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description: PAGE_META['/canhub365'].description,
  url: abs('/canhub365'),
  image: abs('/images/canhub/practice-overview.png'),
  publisher: orgRef,
});

export const blogPostSchema = (post) => ({
  '@type': 'BlogPosting',
  headline: post.title,
  description: post.description || post.excerpt,
  datePublished: post.date,
  dateModified: post.updated || post.date,
  image: abs(post.image),
  author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
  publisher: orgRef,
  mainEntityOfPage: abs(`/blog/${post.slug}`),
});
