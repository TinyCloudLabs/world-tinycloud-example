import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['static.usernames.app-backend.toolsforhumanity.com'],
  },
  allowedDevOrigins: ['*', 'https://world-app-sam.ngrok.io'], // Add your dev origin here
  reactStrictMode: false,
  transpilePackages: ['@tinycloudlabs/web-sdk', '@tinycloudlabs/web-core'],
  
};

export default nextConfig;
