import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  output: 'export',
  distDir: '.next',
  basePath: process.env.GITHUB_ACTIONS && '/camilo-castillo',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true, // Para exportación estática
  },
};

export default nextConfig;
