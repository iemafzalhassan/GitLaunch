import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'github-readme-stats.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'skillicons.dev',
      },
      {
        protocol: 'https',
        hostname: 'github-profile-trophy.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'streak-stats.demolab.com',
      },
      {
        protocol: 'https',
        hostname: 'github-readme-activity-graph.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'devicon.dev',
      },
      {
        protocol: 'https',
        hostname: 'techicons.dev',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
    ],
  },
};

export default nextConfig;
