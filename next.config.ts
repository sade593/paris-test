import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
