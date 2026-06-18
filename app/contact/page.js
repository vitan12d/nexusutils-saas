import { SITE } from '../../lib/site';
export const metadata = { title: 'اتصل بنا' };

export default function ContactPage() {
  return (
    <article className="prose">
      <h1 className="section-title">اتصل بنا</h1>
      <p>لأي استفسار أو اقتراح أو إبلاغ، تواصل معنا عبر البريد الإلكتروني:</p>
      <p><strong>{SITE.email}</strong></p>
      <p>نسعى للرد على جميع الرسائل خلال 48 ساعة.</p>
    </article>
  );
}
