/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emit a fully static site into ./out on `next build`, so it can be hosted
  // as plain static files on Vercel / Netlify / GitHub Pages.
  output: 'export',

  // next/image optimization needs a running server and is incompatible with
  // output:'export'. We use plain <img> tags, but this guards against accidental
  // <Image> use and silences the build error.
  images: { unoptimized: true },

  reactStrictMode: true,

  // Emit /route/index.html instead of /route.html — clean URLs on any static host.
  trailingSlash: true,
};

export default nextConfig;
