import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // output: "export",
  images: {
    domains: [
      "example.com",
      "www.istockphoto.com",
      "www.google.com",
      "media.istockphoto.com",
      "www.shutterstock.com",
      "encrypted-tbn0.gstatic.com",
    ],
  },
};

export default nextConfig;
