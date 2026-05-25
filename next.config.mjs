/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.ovalleturismo.cl",
        pathname: "/sitio/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
