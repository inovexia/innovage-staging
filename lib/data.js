// Site content lives in /content as JSON (see content/README.md). This module re-exports
// the shared pieces so components don't need to know which file each one lives in.
import site from '@/content/site.json';
import shared from '@/content/shared.json';
import services from '@/content/services.json';
import caseStudies from '@/content/case-studies.json';

export { site, services, caseStudies };
export const { process, stats, solutions, clients, testimonials } = shared;

// The Services menu item gets its dropdown from content/services.json.
export const nav = site.nav.map((item) =>
  item.href === '/services'
    ? { ...item, children: services.map((s) => ({ label: s.title, href: `/services/${s.slug}`, icon: s.icon, text: s.tagline })) }
    : item
);

// Replaces "{service}"-style placeholders in template strings from the page JSON.
export const fill = (str, vars) => str.replace(/\{(\w+)\}/g, (m, k) => vars[k] ?? m);
