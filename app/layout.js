import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StreamBanner from '../components/StreamBanner';
import { SITE } from '../lib/site';

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | أخبار ونتائج المباريات وكأس العالم 2026`,
    template: `%s | ${SITE.name}`
  },
  description: SITE.descriptionAr,
  keywords: 'كرة القدم, نتائج المباريات, مباريات مباشرة, ترتيب الدوريات, كأس العالم 2026, بث مباشر, أخبار رياضية',
  authors: [{ name: SITE.name }],
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.descriptionAr,
    url: SITE.url,
    locale: 'ar_AR'
  },
  twitter: {
    card: 'summary_large_image',
    site: SITE.twitter,
    title: SITE.name,
    description: SITE.descriptionAr
  },
  alternates: {
    canonical: SITE.url,
    types: { 'application/rss+xml': `${SITE.url}/feed.xml` },
    languages: { 'ar': SITE.url, 'en': `${SITE.url}/en` }
  },
  verification: SITE.googleVerification ? { google: SITE.googleVerification } : undefined,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 }
  }
};

export default function RootLayout({ children }) {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    description: SITE.descriptionAr
  };
  return (
    <html lang="ar" dir="rtl">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        {SITE.adsenseClient && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${SITE.adsenseClient}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body>
        <Header />
        <StreamBanner />
        <main className="container">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
