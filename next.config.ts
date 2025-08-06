// Next.js Config Optimizado
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimizaciones de producción
  productionBrowserSourceMaps: false,
  compress: true,
  
  // Optimización de imágenes
  images: {
    domains: ['localhost'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 86400, // 24 horas
  },
  
  // Configuración experimental
  experimental: {
    // optimizeCss: true, // Deshabilitado por problemas de build en Vercel
    optimizePackageImports: ['lucide-react'],
  },
  
  // Headers de cache
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, s-maxage=600', // 5 min client, 10 min CDN
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  
  // Configuración de fuentes
  env: {
    NEXT_PUBLIC_BUSINESS_PHONE: process.env.BUSINESS_PHONE,
    NEXT_PUBLIC_BUSINESS_EMAIL: process.env.BUSINESS_EMAIL,
    NEXT_PUBLIC_BUSINESS_WHATSAPP: process.env.BUSINESS_WHATSAPP,
    NEXT_PUBLIC_BUSINESS_NAME: process.env.BUSINESS_NAME,
  },
  
  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks.chunks = 'all';
      config.optimization.splitChunks.cacheGroups = {
        default: false,
        vendors: false,
        vendor: {
          chunks: 'all',
          test: /node_modules/,
          name: 'vendor',
          enforce: true,
        },
      };
    }
    return config;
  },
};

export default nextConfig;
