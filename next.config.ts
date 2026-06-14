import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.partnerboost.com",
      },
    ],
  },
};

export default nextConfig;
