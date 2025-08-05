import { fileURLToPath } from "node:url";

import createJiti from "jiti";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
const jiti = createJiti(fileURLToPath(import.meta.url));

// Import env here to validate during build. Using jiti@^1 we can import .ts files :)
jiti("./src/env");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shuzimumin.com",
      },
    ],
  },
  // Add the packages in transpilePackages
  transpilePackages: ["@t3-oss/env-nextjs", "@t3-oss/env-core"],
};

export default withNextIntl(nextConfig);
