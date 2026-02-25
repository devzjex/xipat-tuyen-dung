import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  output: 'standalone',
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'strapi.omegatheme.com',
      },
      {
        protocol: 'https',
        hostname: 'www.figma.com',
      },
    ],
    formats: ['image/webp'],
  },
};

export default withNextIntl(nextConfig);
