import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    qualities: [75, 90],

    remotePatterns: [
      {
        hostname: "i.ibb.co.com",
        protocol: "https",
      }
    ],
  },
};

export default nextConfig;
