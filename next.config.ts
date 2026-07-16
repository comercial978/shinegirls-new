import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/modelos/marcella-narhell",
        destination: "/modelos/melina-trida",
        permanent: true,
      },
      {
        source: "/blog/modelo-marcella-narhell",
        destination: "/blog/melina-trida-origem-shine-girls",
        permanent: true,
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
