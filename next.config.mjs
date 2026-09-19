/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Don't block Vercel deploy on lint in production — lint is dev-only
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
