/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Resizing is delegated to Unsplash's CDN (see the loader) rather than
    // Next's optimizer, which is billed on Vercel and needs the paid Images
    // binding on Cloudflare Workers.
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        // Flier images uploaded through /admin. Wildcarded because the
        // store subdomain is a per-store random ID that can change if the
        // Blob store is ever recreated (as already happened once).
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
};

module.exports = nextConfig;
