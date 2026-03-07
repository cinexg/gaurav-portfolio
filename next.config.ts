import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // If you ever use the Next.js <Image /> component, you'll need this too:
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
