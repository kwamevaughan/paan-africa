// Import the necessary modules
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development", // Disable in development to avoid caching issues
});

const initializeBundleAnalyzer = require("@next/bundle-analyzer");

// Configure the Bundle Analyzer
const withBundleAnalyzer = initializeBundleAnalyzer({
  enabled: process.env.BUNDLE_ANALYZER_ENABLED === "true",
});

// The base Next.js configuration
const nextConfig = {
  output: "standalone", // Keeps the build output as standalone (recommended for deployment)
  devIndicators: false, // Disables the development indicators, including the Next.js logo
  images: {
    domains: ['ik.imagekit.io'],
  },
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.paan.africa",
          },
        ],
        destination: "https://paan.africa/:path*",
        permanent: true,
      },
    ];
  },
};

// Export the configuration by combining PWA and Bundle Analyzer
module.exports = withPWA(withBundleAnalyzer(nextConfig));
