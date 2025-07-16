import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  experimental: {
    serverActions: {},
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
};
export default nextConfig;
