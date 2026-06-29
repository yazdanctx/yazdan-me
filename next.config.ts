import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/*": ["content/**/*.md"],
  },
};

export default nextConfig;
