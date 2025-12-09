/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Allows production builds to complete even if there are type errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // Allows production builds to complete even if there are lint errors
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;