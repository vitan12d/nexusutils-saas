import { SITE } from '../../lib/site';
export const metadata = { title: 'العلامة التجارية' };

export default function BrandPage() {
  return (
    <article className="prose">
      <h1 className="section-title">العلامة التجارية</h1>
      <p>{SITE.name} علامة تجارية خاصة بالموقع. اللون الرئيسي الأزرق (#0b5394).</p>
      <p>يُرجى عدم استخدام اسم أو شعار الموقع بطريقة توحي بالرعاية أو الارتباط دون إذن رسمي.</p>
    </article>
  );
}
