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
    ];
  },
};

export default nextConfig;
