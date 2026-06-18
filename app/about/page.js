import { SITE } from '../../lib/site';
export const metadata = { title: 'من نحن' };

export default function AboutPage() {
  return (
    <article className="prose">
      <h1 className="section-title">من نحن</h1>
      <p>{SITE.name} منصة رياضية مستقلة تقدم تغطية شاملة لكرة القدم: نتائج مباشرة، جداول ترتيب، أخبار، ومقالات تحليلية.</p>
      <p>رسالتنا تقديم معلومة دقيقة وسريعة للمشجع العربي، بمحتوى أصيل وموثوق.</p>
    </article>
  );
}
