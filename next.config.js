/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // AVIF first — meaningfully smaller than WebP for photography, and
    // every browser this site needs to support decodes it.
    formats: ["image/avif", "image/webp"],
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
