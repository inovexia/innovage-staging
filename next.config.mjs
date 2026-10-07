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
    ];
  },
};

export default nextConfig;
