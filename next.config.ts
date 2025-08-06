import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BUSINESS_PHONE: process.env.BUSINESS_PHONE,
    NEXT_PUBLIC_BUSINESS_EMAIL: process.env.BUSINESS_EMAIL,
    NEXT_PUBLIC_BUSINESS_WHATSAPP: process.env.BUSINESS_WHATSAPP,
    NEXT_PUBLIC_BUSINESS_NAME: process.env.BUSINESS_NAME,
  },
};

export default nextConfig;
