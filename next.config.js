/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'media.api-sports.io' }
    ]
  },
  // الإعداد السحري لتعطيل المصنف المتسبب في خطأ معالجة الحروف العربية والـ RTL
  swcMinify: false
};

module.exports = nextConfig;
