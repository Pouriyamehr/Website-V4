/**
 * Next.js config with Turbopack & LightningCSS disabled
 * (for Tailwind CSS v4 compatibility)
 */
const config = {
  experimental: {
    turbo: false,
  },
  compiler: {
    lightningcss: false,
  },
};

export default config;
