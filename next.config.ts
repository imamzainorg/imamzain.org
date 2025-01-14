import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/home',
        destination: '/',
      },

    ];
  },
};

export default nextConfig;


