import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.cosmos.so'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.cosmos.so',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
