/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['images.unsplash.com'],
  },
};

module.exports = nextConfig;
