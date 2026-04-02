import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client"],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    loader: "custom",
    loaderFile: "./image-loader.ts",
  },

  reactStrictMode: true,
  outputFileTracingIncludes: {
      '/*': ['./node_modules/.prisma/client/*.node'],
    },

  output: "standalone",
};

export default nextConfig;
