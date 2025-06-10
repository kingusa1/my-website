
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  // output: 'export', // This will be set by actions/configure-pages@v5 in CI
  // basePath: '/my-website', // This will be set by actions/configure-pages@v5 in CI
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // unoptimized: true, // This will be set by actions/configure-pages@v5 in CI
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
