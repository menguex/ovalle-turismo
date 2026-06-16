/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [32, 48, 64, 96, 128, 256, 384, 512, 640, 768, 1024],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.ovalleturismo.cl",
        pathname: "/sitio/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "turismoregiondecoquimbo.cl",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
