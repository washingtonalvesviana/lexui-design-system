import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["@lexui/react", "@lexui/charts"],
  allowedDevOrigins: ["127.0.0.1"],
}

export default nextConfig
