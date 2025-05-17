/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... other configurations you might have

  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },

  // ... rest of your config
};

module.exports = nextConfig;