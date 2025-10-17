/** @type {import('next').NextConfig} */
const domains = ["emetwlaivipizykelrun.supabase.co"];

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains,
  },
  env: {
    ADMIN_USERNAME: process.env.ADMIN_USERNAME,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  }
};

module.exports = nextConfig;
