import { SITE } from '../lib/site';

export default function manifest() {
  return {
    name: SITE.name,
    short_name: SITE.name,
    description: SITE.descriptionAr,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0b5394',
    lang: 'ar',
    dir: 'rtl',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' }
    ]
  };
}
