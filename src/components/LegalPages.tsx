/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LegalPagesProps {
  currentPage: 'privacy' | 'terms' | 'cookies';
  onBack: () => void;
}

export default function LegalPages({ currentPage, onBack }: LegalPagesProps) {
  return (
    <div className="bg-white border border-gray-200 rounded p-6 shadow-sm font-sans text-right max-w-4xl mx-auto" dir="rtl">
      {/* Meta tags mock representation for SEO friendliness */}
      <div className="bg-gray-100 p-2 rounded mb-6 text-xs text-slate-500 font-mono flex flex-col gap-1">
        <div>🔍 [SEO Meta Tags Preview]</div>
        <div>
          <strong>Title:</strong> {currentPage === 'privacy' ? 'سياسة الخصوصية - نكسس كورة' : currentPage === 'terms' ? 'شروط الخدمة والاستخدام - نكسس كورة' : 'سياسة ملفات تعريف الارتباط - نكسس كورة'}
        </div>
        <div>
          <strong>Description:</strong> {currentPage === 'privacy' 
            ? 'اطلع على سياسة الخصوصية لموقع نكسس كورة (Nexus Korra)، وكيف نحمي بياناتك ونستخدم ملفات تعريف الارتباط وإعلانات قوقل أدسينس، وأدستيرا.' 
            : currentPage === 'terms' 
            ? 'شروط استخدام موقع نكسس كورة للبث المباشر وجدول مباريات كرة القدم، والمحتوى والمسؤولية القانونية.' 
            : 'شرح تفصيلي حول استخدام ملفات تعريف الارتباط (Cookies) لتحسين تجربة المستخدم وعرض الإعلانات المستهدفة.'}
        </div>
        <div><strong>Robots:</strong> index, follow</div>
      </div>

      <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
          <span>📋</span>
          {currentPage === 'privacy' && 'سياسة الخصوصية (Privacy Policy)'}
          {currentPage === 'terms' && 'شروط الاستخدام والخدمة (Terms of Service)'}
          {currentPage === 'cookies' && 'سياسة ملفات تعريف الارتباط (Cookies Policy)'}
        </h1>
        <button
          onClick={onBack}
          className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-bold text-xs cursor-pointer transition-colors"
        >
          العودة للمباريات ↩
        </button>
      </div>

      <div className="prose prose-slate max-w-none text-gray-700 space-y-6 leading-relaxed text-sm">
        {currentPage === 'privacy' && (
          <>
            <section className="space-y-2">
              <h2 className="text-md font-bold text-gray-800">1. مقدمة وتمهيد</h2>
              <p>
                نرحب بكم في موقع <strong>نكسس كورة (Nexus Korra)</strong> المتصل بالدومين Nexusutils. نولي في موقعنا أهمية قصوى لخصوصية زوارنا الكرام، وتعتبر وثيقة سياسة الخصوصية هذه بمثابة اتفاقية توضح كيف نتعامل مع البيانات الشخصية التي نجمعها أو نحصل عليها منك أثناء تصفحك واستخدامك لخدمات بث المباريات وتغطية الأخبار.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-md font-bold text-[#00ff66]">2. ملفات السجل (Log Files)</h2>
              <p>
                مثل العديد من مواقع الويب الأخرى، يستخدم نكسس كورة ملفات السجل. المعلومات داخل ملفات السجل تشمل: بروتوكول الإنترنت (IP)، نوع المتصفح، مزود خدمة الإنترنت (ISP)، تاريخ ووقت الزيارة، صفحات الإحالة والخروج، وعدد النقرات لتحليل الاتجاهات وإدارة الموقع، وحساب الحركات الجغرافية للزوار بشكل كلي ودون تحديد هوياتهم الشخصية بشكل مباشر.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-md font-bold text-gray-800">3. شركاء الإعلانات (Google AdSense, Adsterra, Clickadilla)</h2>
              <p>
                يستعين موقعنا بشركات إعلانية خارجية كأطراف ثالثة لعرض الإعلانات وتميل هذه الجهات لاستخدام تقنيات الكوكيز لعرض الإعلانات المناسبة لاهتماماتك:
              </p>
              <ul className="list-disc list-inside mr-4 space-y-1">
                <li>
                  <strong>Google AdSense:</strong> تستخدم شركة قوقل ملف تعريف الارتباط DART لعرض الإعلانات استناداً إلى زيارات المستخدم لموقعنا والمواقع الأخرى على الإنترنت. يمكنك إلغاء ذلك من خلال مراجعة سياسة خصوصية إعلانات قوقل.
                </li>
                <li>
                  <strong>Adsterra & Clickadilla:</strong> تستخدم هذه الشبكات ملفات تعريف الارتباط وبرمجيات خاصة لتوجيه الإعلانات المنبثقة (Popunders) والبنرات التفاعلية. نحن لا نملك أي وصول أو تحكم في هذه الكوكيز التي يستخدمها معلنون خارجيون.
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-md font-bold text-gray-800">4. أمن البيانات وحمايتها</h2>
              <p>
                نحن ملتزمون باتخاذ أعلى معايير الحماية التقنية والمنظماتية لضمان سلامة بياناتك من الفقدان والنهب والاستخدام غير المصرح به. نستخدم بروتوكولات تشفير HTTPS القياسية لنقل البيانات بشكل آمن.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-md font-bold text-gray-800">5. تحديثات على سياسة الخصوصية</h2>
              <p>
                قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر لمواكبة المتغيرات التقنية أو التشريعية. سنقوم بنشر أي تغييرات في هذه الصفحة مع تحديث تاريخ التعديل في أسفل الوثيقة.
              </p>
            </section>

            <p className="text-xs text-gray-400 mt-8 border-t border-gray-100 pt-4">آخر تحديث: يونيو 2026</p>
          </>
        )}

        {currentPage === 'terms' && (
          <>
            <section className="space-y-2">
              <h2 className="text-md font-bold text-gray-800">1. قبول الشروط والأحكام</h2>
              <p>
                بمجرد دخولك وتصفحك لموقع <strong>نكسس كورة (Nexus Korra)</strong>، فإنك تقر وتوافق على الالتزام بجميع البنود والشروط المذكورة هنا دون قيد أو شرط. إذا كنت لا توافق على أي بند، يرجى التوقف فوراً عن استخدام الموقع ومحتوياته.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-md font-bold text-gray-800">2. حقوق الملكية الفكرية ومصادر البث المباشر</h2>
              <p>
                يقوم موقع نكسس كورة بتجميع وعرض تغطية مباشرة للمباريات وجداول المباريات والنتائج من مصادره المتاحة على شبكة الإنترنت. نحن لا نستضيف أو نوثق لقطات الفيديو على خوادمنا بل نعتمد على بروتوكولات العرض المدمجة ومشغلات الطرف الثالث. تقع المسؤولية الكاملة لمحتوى البث على الخوادم والمواقع المضيفة الأصلية.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-md font-bold text-gray-800">3. الاستخدام المقبول للموقع</h2>
              <p>
                يُحظر استخدام الموقع للقيام بأي سلوك غير قانوني، أو التشهير وتوجيه الألفاظ النابية في غرف دردشة المباريات التفاعلية. يحق لإدارة الموقع حظر أي مستخدم ينتهك هذه القوانين فوراً دون الرجوع إليه.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-md font-bold text-gray-800">4. إخلاء المسؤولية (Disclaimer)</h2>
              <p>
                يتم تقديم جدول المباريات والبث التلفزيوني "كما هو" دون أي ضمانات بالدقة، أو سلامة البث من انقطاع الإشارات أو تجميد الصورة. نحن نخلي مسؤوليتنا من أي أضرار ناجمة عن استخدام روابط وحاويات الإعلان التي تظهر للزائر عن طريق معلني الطرف الثالث.
              </p>
            </section>

            <p className="text-xs text-gray-400 mt-8 border-t border-gray-100 pt-4">آخر تحديث: يونيو 2026</p>
          </>
        )}

        {currentPage === 'cookies' && (
          <>
            <section className="space-y-2">
              <h2 className="text-md font-bold text-gray-800">1. ما هي ملفات تعريف الارتباط (Cookies)؟</h2>
              <p>
                ملفات تعريف الارتباط هي ملفات نصية صغيرة يتم حفظها على جهاز الكمبيوتر أو الهاتف الذكي الخاص بك عند زيارة مواقع الويب. تساعد ملفات الكوكيز الموقع على تذكر تفضيلاتك (مثل اختيار خيار الوضع المظلم أو جودة البث المفضلة) وتقديم تجربة استخدام أفضل وأسرع.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-md font-bold text-gray-800">2. كيف نستخدم ملفات تعريف الارتباط؟</h2>
              <ul className="list-disc list-inside mr-4 space-y-1">
                <li>
                  <strong>تحسين الأداء:</strong> حفظ تفضيلات مشغل الفيديو الخاص بك، وسيرفر البث الافتراضي والتاريخ المحدد لجدول المباريات.
                </li>
                <li>
                  <strong>التحليلات:</strong> فهم سلوك الزوار والصفحات الأكثر زيارة عبر جوجل أناليتكس (Google Analytics) لتحسين جودة وتوزيع البث.
                </li>
                <li>
                  <strong>شبكات الإعلانات:</strong> تسهل عملية تتبع المبيعات والنقرات الصادرة من قنوات AdSense و Adsterra لعرض إعلانات تناسب الزائر وتمنع تكرار مشاهدة نفس الإعلان المزعج بشكل متواصل.
                </li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-md font-bold text-gray-800">3. إدارة الكوكيز وحظرها</h2>
              <p>
                يمكنك بسهولة مراجعة إعدادات متصفحك (مثل Google Chrome, Safari, Firefox) لتعديل طرق قبول ملفات الكوكيز أو تعطيلها تماماً. يرجى العلم بأن تعطيل ملفات الكوكيز قد يؤدي إلى عدم عمل بعض أجزاء البث المباشر ودردشة المباريات بشكل طبيعي.
              </p>
            </section>

            <p className="text-xs text-gray-400 mt-8 border-t border-gray-100 pt-4">آخر تحديث: يونيو 2026</p>
          </>
        )}
      </div>
    </div>
  );
}
