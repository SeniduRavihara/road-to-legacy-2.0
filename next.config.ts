import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  images: {
    loader: "custom",
    loaderFile: "./my-loader.ts",
  },
};

export default nextConfig;
