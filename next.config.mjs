/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // old legal page URLs (staging + the previous WordPress site)
      { source: '/privacy', destination: '/privacy-policy', permanent: true },
      { source: '/terms', destination: '/terms-and-conditions', permanent: true },
      { source: '/terms-and-condition', destination: '/terms-and-conditions', permanent: true },
      // product renamed from TeckHub360, then CanHub360, to CanHub 365
      { source: '/teckhub360', destination: '/canhub365', permanent: true },
      { source: '/canhub360', destination: '/canhub365', permanent: true },
      // service renamed from Business Automation to Workflow Automation
      { source: '/services/business-automation', destination: '/services/workflow-automation', permanent: true },
      // previous WordPress site: service pages
      { source: '/web-design', destination: '/services/website-design', permanent: true },
      { source: '/services/ui-ux-design', destination: '/services/website-design', permanent: true },
      { source: '/website-development', destination: '/services/website-development', permanent: true },
      { source: '/services/web-development', destination: '/services/website-development', permanent: true },
      { source: '/app-design-and-development', destination: '/services/app-development', permanent: true },
      { source: '/website-maintenance', destination: '/services/sitecare', permanent: true },
      { source: '/services/improve_performance', destination: '/services/sitecare', permanent: true },
      { source: '/services/seo', destination: '/services', permanent: true },
      { source: '/accountant-portal', destination: '/canhub365', permanent: true },
      { source: '/get-a-quote', destination: '/contact', permanent: true },
      // previous WordPress site: portfolio and testimonials
      { source: '/works', destination: '/case-studies', permanent: true },
      { source: '/work/mattressville', destination: '/case-studies/mattressville', permanent: true },
      { source: '/work/:path*', destination: '/case-studies', permanent: true },
      { source: '/testimonials', destination: '/case-studies', permanent: true },
      { source: '/testimonial/:path*', destination: '/case-studies', permanent: true },
      // previous WordPress site: blog
      { source: '/launching-an-app-checklist', destination: '/blog/mobile-app-checklist', permanent: true },
      { source: '/website-maintenance-trends-2025', destination: '/blog/maintenance-matters', permanent: true },
      { source: '/web-development-trends-2025', destination: '/blog', permanent: true },
      { source: '/website-design-trends-2025', destination: '/blog', permanent: true },
      { source: '/how-to-pick-the-right-cms', destination: '/blog', permanent: true },
      { source: '/category/:path*', destination: '/blog', permanent: true },
      { source: '/author/:path*', destination: '/blog', permanent: true },
    ];
  },
};

export default nextConfig;
