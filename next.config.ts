import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  devIndicators: false,
  output: "standalone",
  images: {
    domains: ["i.annih.us"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.annih.us",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "i.annih.us",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
