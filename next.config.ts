import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Disable Next.js image optimization for Cloudflare Pages
  },
};

export default nextConfig;
