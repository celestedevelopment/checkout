import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  trailingSlash: false,
  images: {
    unoptimized: true
  },
  i18n: {
    locales: ['en', 'it', 'es', 'fr', 'de', 'pt', 'ru', 'zh', 'ja', 'ko'],
    defaultLocale: 'en',
    localeDetection: false, // We'll handle this manually based on IP
  },
};

export default nextConfig;
