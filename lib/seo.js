// Shared page metadata: title, description, canonical URL, Open Graph and Twitter card.
// Next.js doesn't copy a page's title/description into og:* tags, so every page builds them here.

export const SITE_NAME = 'Innovage';

// Absolute base for og:image / canonical URLs. Netlify sets URL to the site's primary URL at build time;
// set SITE_URL to override (e.g. https://innovagesoft.com once the domain points here).
export const SITE_URL = (process.env.SITE_URL || process.env.URL || 'https://innovagesoft.com').replace(/\/$/, '');

// Search engines may only index the real domain on a production deploy. Staging sites, deploy previews and
// branch deploys are marked noindex automatically (Netlify sets URL and CONTEXT at build time).
const hostname = new URL(SITE_URL).hostname.replace(/^www\./, '');
export const ALLOW_INDEXING = hostname === 'innovagesoft.com' && (!process.env.CONTEXT || process.env.CONTEXT === 'production');

export const DEFAULT_TITLE = 'Custom Software Development Company in Ontario | Innovage';
export const DEFAULT_DESCRIPTION =
  'Custom software, web apps, SaaS platforms and client portals built around how your business works. Innovage: Mississauga, Ontario, 10+ years, 100+ projects.';
export const DEFAULT_IMAGE = { url: '/og-image.png', width: 1200, height: 630, alt: 'Innovage — Custom Software Development Company in Ontario' };

// Every page's title and description, keyed by route path. The home page uses DEFAULT_TITLE / DEFAULT_DESCRIPTION.
// Titles leave off " | Innovage" (the layout template appends it).
export const PAGE_META = {
  '/about': {
    title: 'About Us – Mississauga, Ontario Software Company',
    description: 'Innovage is a Mississauga, Ontario software company with 10+ years and 100+ projects, partnering with Canadian businesses from first idea to long-term support.',
  },
  '/services': {
    title: 'Software Development Services in Ontario',
    description: 'Innovage software development services: web and mobile apps, SaaS platforms, workflow automation, IT consulting and digital transformation in Ontario.',
  },
  '/services/website-design': {
    title: 'Website Design Services in Ontario',
    description: 'Website design services in Ontario from Innovage: strategy, UX, UI and responsive design focused on turning visitors into customers for your business.',
  },
  '/services/website-development': {
    title: 'Website Development Services in Ontario',
    description: 'Website development in Ontario by Innovage: fast, secure, scalable websites on WordPress, Laravel, React and Next.js, built for your business, easy to manage.',
  },
  '/services/app-development': {
    title: 'iOS & Android App Development in Ontario',
    description: 'Mobile app development in Ontario: Innovage builds iOS and Android apps from one codebase, connected to your backend, with web apps and SaaS platforms to match.',
  },
  '/services/custom-software': {
    title: 'Custom & Bespoke Software Development in Ontario',
    description: 'Custom software development in Ontario by Innovage: bespoke portals, internal systems, dashboards and integrations tailored to how your business already works.',
  },
  '/services/workflow-automation': {
    title: 'AI & Workflow Automation Services in Ontario',
    description: 'AI automation services in Ontario: Innovage connects your systems, automates workflows and applies AI to document extraction and drafting, cutting busywork.',
  },
  '/services/saas-platforms': {
    title: 'SaaS Platform Development Company in Canada',
    description: 'SaaS platform development in Canada: Innovage designs multi-tenant, subscription-based software with billing, onboarding and admin built in from day one.',
  },
  '/services/sitecare': {
    title: 'Website Maintenance & Support Services',
    description: 'Website maintenance and support from Innovage: ongoing security, performance optimization and updates that keep your Ontario business website running well.',
  },
  '/canhub365': {
    title: 'CanHub 365 – Client Portal for Accounting Firms',
    description: 'CanHub 365 is an all-in-one accounting client portal for Canadian firms: tax document management, OCR GIFI coding, filing, payroll, invoicing and secure chat.',
    image: { url: '/images/og/page-canhub365.jpg', width: 1200, height: 630, alt: 'CanHub 365, the client portal for accounting firms by Innovage' },
  },
  '/case-studies': {
    title: 'Software Development Case Studies & Portfolio',
    description: 'Software development case studies from Innovage: real projects for Ontario businesses, from SaaS implementations to accounting firm software, with results.',
    image: { url: '/images/og/page-case-studies.jpg', width: 1200, height: 630, alt: 'Software development case studies by Innovage' },
  },
  '/industries': {
    title: 'Industry-Specific Software Solutions in Ontario',
    description: 'Industry-specific software solutions from Innovage: education, accounting and finance, marketing and fintech software built around how Ontario businesses work.',
  },
  '/process': {
    title: 'Agile Software Development Process & Methodology',
    description: 'See the Innovage agile software development process: seven scoped stages from discovery to launch and evolve, with transparent delivery and QA testing built in.',
  },
  '/blog': {
    title: 'Ontario Software Technology Blog & Insights',
    description: 'The Innovage blog: Ontario software technology insights on SaaS development, AI and workflow automation trends, plus practical guides for growing with tech.',
  },
  '/contact': {
    title: 'Contact Us – Software Quote & Demo in Ontario',
    description: 'Contact Innovage in Mississauga, Ontario to request a software quote, book a CanHub 365 demo or schedule a free consultation with the developers who build it.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy & Data Protection (PIPEDA)',
    description: 'Innovage privacy policy: how we collect, use and protect your personal information, in line with PIPEDA and Ontario privacy laws for our website.',
  },
  '/terms-and-conditions': {
    title: 'Terms & Conditions – Software Usage Agreement',
    description: 'Innovage terms and conditions: the terms of service and software usage agreement that govern use of innovagesoft.com and our services in Ontario.',
  },
};

/**
 * @param {object} o
 * @param {string} [o.path]         route path, e.g. "/about" — a PAGE_META entry for it wins over title/description
 * @param {string} [o.title]        page title for routes without an entry, e.g. blog posts (the layout template appends " | Innovage")
 * @param {string} [o.description]
 * @param {object} [o.image]        { url, width, height, alt } — a PAGE_META entry's image wins; defaults to the site share image
 * @param {string} [o.type]         "website" | "article"
 * @param {object} [o.openGraph]    extra og fields (e.g. publishedTime)
 */
export function pageMeta({ title: fallbackTitle, description: fallbackDescription = DEFAULT_DESCRIPTION, path = '/', image: fallbackImage = DEFAULT_IMAGE, type = 'website', openGraph = {} } = {}) {
  const { title = fallbackTitle, description = fallbackDescription, image = fallbackImage } = PAGE_META[path] || {};
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
