import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920, 2048, 2560],
    imageSizes: [96, 128, 256, 384],
    qualities: [60, 70, 75, 78, 82],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.lemde.fr",
      },
      {
        protocol: "https",
        hostname: "www.lemonde.fr",
      },
    ],
  },
};

export default nextConfig;
