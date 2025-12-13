import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
      },
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "itmtnvdh6fapqznm.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
