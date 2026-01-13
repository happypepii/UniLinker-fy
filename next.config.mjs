/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  basePath: '/UniLinker-fy',       
  assetPrefix: '/UniLinker-fy/',   
  trailingSlash: true,             
 
}

export default nextConfig
