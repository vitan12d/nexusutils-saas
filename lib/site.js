// إعدادات الموقع العامة — غيّر الدومين بعد النشر
export const SITE = {
  name: 'Nexusutils',
  nameAr: 'نكسوس سبورت',
  url: 'https://nexusutils.com',
  twitter: '@nexusutils',
  email: 'contact@nexusutils.com',
  descriptionAr: 'نكسوس — تغطية شاملة لكرة القدم: نتائج مباشرة، جداول الترتيب، أخبار، مقالات، وبث مباشر لكأس العالم 2026.',
  descriptionEn: 'Nexusutils — full football coverage: live scores, standings, news, articles, and World Cup 2026 live coverage.',
  // بعد القبول في AdSense ضع معرّف الناشر هنا (مثال: ca-pub-1234567890123456)
  adsenseClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || '',
  // رمز تحقق Google Search Console (اختياري)
  googleVerification: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || ''
};
