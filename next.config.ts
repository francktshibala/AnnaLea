import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Force new deployment
  experimental: {
    forceSwcTransforms: true,
  },
};

export default nextConfig;
