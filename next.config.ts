import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [25, 50, 75, 100],
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
