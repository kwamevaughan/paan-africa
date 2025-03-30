const initializeBundleAnalyzer = require('@next/bundle-analyzer');

// https://www.npmjs.com/package/@next/bundle-analyzer
const withBundleAnalyzer = initializeBundleAnalyzer({
  enabled: process.env.BUNDLE_ANALYZER_ENABLED === 'true',
});

// https://nextjs.org/docs/pages/api-reference/next-config-js
const nextConfig = {
  output: 'standalone',   // Keeps the build output as standalone (recommended for deployment)
  devIndicators: false,   // Disables the development indicators, including the Next.js logo
};

module.exports = withBundleAnalyzer(nextConfig);
