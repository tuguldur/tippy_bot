/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "s3.qpay.mn" },
      { protocol: "https", hostname: "qpay.mn" },
    ],
  },
};

export default nextConfig;
