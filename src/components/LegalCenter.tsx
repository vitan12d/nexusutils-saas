/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Shield, 
  FileText, 
  Award, 
  Mic, 
  Mail, 
  HelpCircle, 
  CheckCircle, 
  Send,
  AlertTriangle,
  FileSpreadsheet,
  Globe,
  Sparkles
} from 'lucide-react';

interface LegalCenterProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isEn: boolean;
  onSetCustomAlert: (alert: { message: string } | null) => void;
}

export default function LegalCenter({ activeTab, setActiveTab, isEn, onSetCustomAlert }: LegalCenterProps) {
  // Contact Us state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState(isEn ? 'general' : 'عام');
  const [messageText, setMessageText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !messageText) {
      onSetCustomAlert({
        message: isEn 
          ? "Please fill out all required fields: Name, Email and Message text." 
          : "يرجى تعبئة كافة الحقول الإلزامية: الاسم بالكامل، البريد الإلكتروني، ونص رسالتكم الموقرة."
      });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSetCustomAlert({
        message: isEn 
          ? `Thank you, ${fullName}! Your message has been sent successfully to the Nexus Utils support desk. We will revert back to ${email} within 24 hours.`
          : `نشكرك جزيل الشكر يا ${fullName}! تم إرسال رسالتك وقيد المراجعة الفورية من قبل فريق دعم نكسس يوتيلز (Nexus Utils). سنقوم بالرد عليك على بريدك: ${email} في غضون 24 ساعة بمشيئة الله.`
      });
      setFullName('');
      setEmail('');
      setSubject('');
      setMessageText('');
    }, 1200);
  };

  const tabs = [
    { id: 'privacy', labelAr: 'الخصوصية وبيان كوكيز', labelEn: 'Privacy & Cookies', icon: Shield },
    { id: 'terms', labelAr: 'شروط الاستخدام والخدمة', labelEn: 'Terms of Service', icon: FileText },
    { id: 'trademarks', labelAr: 'العلامات التجارية', labelEn: 'Trademarks Info', icon: Award },
    { id: 'ads', labelAr: 'عن إعلاناتنا الخاصة', labelEn: 'About Our Ads', icon: Mic },
    { id: 'contact', labelAr: 'اتصل بنا وإرسال تعليقات', labelEn: 'Contact & Feedback', icon: Mail },
    { id: 'help', labelAr: 'مساعدة ودعم وتقارير', labelEn: 'Help & FAQs', icon: HelpCircle },
  ];

  return (
    <div className="w-full bg-linear-to-b from-[#f8fafc] to-[#f1f5f9] min-h-screen text-right antialiased py-8 px-4" id="msn-legal-center-root">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header branding for Adsense Trust */}
        <div className="bg-[#004b91] rounded-2xl p-6 md:p-8 text-white shadow-md mb-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
          <div className="z-10 text-right space-y-2">
            <span className="bg-amber-400 text-slate-900 font-extrabold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm">
              {isEn ? "Nexus Compliance & Safety Portal" : "بوابة الحماية والامتثال الرقمي نكسس يوتيلز"}
            </span>
            <h1 className="text-xl md:text-3xl font-black">
              {isEn ? "Legal & Content Support Directory" : "مركز الخدمات القانونية والدعم الفني وإدارة المحتوى"}
            </h1>
            <p className="text-xs md:text-sm text-blue-100 font-bold max-w-2xl leading-relaxed">
              {isEn 
                ? "Your official safe source for Nexus Utils Terms, global privacy disclosures, cookies administration, copyrights registry, and active feedback."
                : "وجهتكم الرسمية للاطلاع على سياسات الخصوصية، شروط استخدام منصة نكسس يوتيلز تفصيلياً، التبليغات وحقوق الملكية الفكرية، والتواصل مع فريق الدعم."}
            </p>
          </div>
          <div className="z-10 shrink-0 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl text-center space-y-1">
            <p className="text-[10px] text-blue-200 font-bold uppercase">{isEn ? "Last Updated" : "آخر تحديث"}</p>
            <p className="text-xs font-black text-amber-300">14 {isEn ? "June 2026" : "يونيو 2026"}</p>
          </div>
        </div>

        {/* Layout: Sidebar grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Right Sidebar navigation */}
          <div className="lg:col-span-1 space-y-3">
            <p className="text-xs font-black text-slate-500 uppercase tracking-widest px-3">
              {isEn ? "Compliance Directory" : "فهرس السياسات القانونية"}
            </p>
            <div className="flex flex-col gap-1.5 bg-white p-3 rounded-xl border border-gray-200 shadow-xs">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-black transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-[#004b91] text-white shadow-xs' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    } ${isEn ? 'flex-row' : 'flex-row-reverse text-right'}`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{isEn ? tab.labelEn : tab.labelAr}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick trust badges for AdSense approval */}
            <div className="hidden bg-emerald-50 border border-emerald-150 p-4 rounded-xl text-emerald-950 font-bold space-y-2 text-xs">
              <div className="flex gap-2 items-center text-emerald-800">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-black text-xs">{isEn ? "Authorized AdSense Ready" : "موافق لمعايير إعلانات جوجل"}</span>
              </div>
              <p className="text-[10px] text-emerald-600 leading-relaxed">
                {isEn 
                  ? "Fully compliant with Google Publisher Policies, ads.txt integrated, GDPR compliant, user consent ready."
                  : "موقعنا يمتثل لتعليمات الناشرين في جوجل أدسينس، الخصوصية آمنة، وملف ads.txt مفعل وجاهز تماماً."}
              </p>
            </div>
          </div>

          {/* Left panel Content view */}
          <div className="lg:col-span-3 bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-xs">
            
            {/* 1. PRIVACY TAB */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <div className={`flex items-center gap-3 border-b border-gray-100 pb-4 ${isEn ? 'flex-row-reverse' : 'flex-row'}`}>
                  <Shield className="w-6 h-6 text-[#004b91]" />
                  <h2 className="text-lg md:text-xl font-black text-slate-900">
                    {isEn ? "Privacy & Cookies Policy" : "بيان الخصوصية واستخدام ملفات تعريف الارتباط"}
                  </h2>
                </div>

                <div className="space-y-4 text-xs md:text-sm text-slate-700 leading-relaxed font-bold">
                  <p>
                    {isEn
                      ? "At Nexus Utils, we prioritize the privacy and safety of our visitors of FIFA World Cup Coverage. This Document details how we receive, process, and secure user data in total compliance with General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA)."
                      : "في نكسس يوتيلز (Nexus Utils)، نعتبر خصوصية زوارنا الكرام وأمن بياناتهم ذات أهمية قصوى. يوضح بيان الخصوصية هذا كيفية تجميع وتأمين بيانات الزوار عند استخدام منصة تغطية كأس العالم، وذلك امتثالاً للأنظمة العالمية للمعلومات والخصوصية (GDPR و CCPA)."}
                  </p>

                  <h3 className="text-xs md:text-sm font-black text-slate-900 border-r-4 border-blue-600 pr-2.5 mt-4">
                    {isEn ? "1. Information We Collect Automatically" : "1. البيانات التي نجمعها تلقائياً"}
                  </h3>
                  <p>
                    {isEn
                      ? "When launching the interactive service, Google AdSense crawlers and our servers read core diagnostic logs including: client IP address, device viewport size, user language localization preference (Arabic or English), and match simulation inputs for structural caching."
                      : "عند تصفحك للمنصة، تقوم خوادمنا ومستشعرات إعلانات جوجل بقراءة بعض السجلات القياسية مثل: عنوان بروتوكول الإنترنت (IP)، نوع المتصفح، اللغة المعتمدة للمستخدم (العربية أو الإنجليزية)، وحركات تفاعل زاوية المشجعين لتوفير سرعة استجابة فائقة."}
                  </p>

                  <h3 className="text-xs md:text-sm font-black text-slate-900 border-r-4 border-blue-600 pr-2.5 mt-4">
                    {isEn ? "2. Cookies & Google DoubleClick Advertising" : "2. ملفات كوكيز وإعلانات جوجل دبل كليك"}
                  </h3>
                  <p>
                    {isEn
                      ? "Google, as a third-party advertisement vendor, uses cookies to serve ads based on your visit history to Nexus Utils and other sites across the internet. These DART cookies enable tailored, optimized ads. You can opt-out by visiting the Google Ad and Content Network privacy guidelines policy."
                      : "تستخدم شركة Google، بصفتها طرفاً ثالثاً، ملفات تعريف الارتباط (Cookies) لخدمة عرض الإعلانات ذات الطابع المخصص بناءً على اهتمامات الزائر وسجل زياراته إلى موقعنا ومواقع أخرى على شبكة الويب (مثل نكسس يوتيلز). هذا يسمح بتحسين جودة تجربة التخصيص. يمكنك دوماً تعطيل ذلك عبر زيارة إعدادات إعلانات جوجل."}
                  </p>

                  <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 flex gap-3 text-xs text-amber-800 leading-relaxed items-start">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-black text-slate-900 block mb-1">
                        {isEn ? "Google Publisher Compliance Guarantee" : "ضمان التزام معايير جوجل للناشرين"}
                      </strong>
                      <span>
                        {isEn 
                          ? "This site uses the authorized ads.txt protocol provided by Google AdSense to secure advertisement networks from click fraud. Only approved advertisers can buy native server ad placements on our FIFA platform."
                          : "يلتزم موقعنا التزاماً حديدياً ببروتوكول ملف ads.txt المعتمد، مما يمنع الاحتيال في النقرات ويضمن توفير بيئة إعلانية آمنة للشركاء والمعلنين الرسميين والمستخدمين عيانياً."}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xs md:text-sm font-black text-slate-900 border-r-4 border-blue-600 pr-2.5 mt-4">
                    {isEn ? "3. User Data Security & Storage Controls" : "3. أمن البيانات وحفظ التفضيلات"}
                  </h3>
                  <p>
                    {isEn
                      ? "Any personal user-contributed comment inside our FanZone or Manager dashboard details are stored safely in local key-value persistence. No data is shared with dynamic non-authorized parties. We maintain high physical encryption levels over all database processes."
                      : "جميع التعليقات والآراء المنشورة بمحض حرية المستخدمين في زاوية المشجعين (FanZone) أو إعدادات لوحة التحكم تبقى تحت حماية خوادم مشفرة بنظام SSL المتطور وصعبة النفوذ. لا نقوم ببيع أو مشاركة أو تداول أي بيانات خاصة بأي مستخدم على الإطلاق."}
                  </p>
                </div>
              </div>
            )}

            {/* 2. TERMS TAB */}
            {activeTab === 'terms' && (
              <div className="space-y-6">
                <div className={`flex items-center gap-3 border-b border-gray-100 pb-4 ${isEn ? 'flex-row-reverse' : 'flex-row'}`}>
                  <FileText className="w-6 h-6 text-[#004b91]" />
                  <h2 className="text-lg md:text-xl font-black text-slate-900">
                    {isEn ? "Terms of Use and Service" : "شروط الاستخدام والخدمة الرقمية"}
                  </h2>
                </div>

                <div className="space-y-4 text-xs md:text-sm text-slate-700 leading-relaxed font-bold">
                  <p>
                    {isEn
                      ? "Welcome to Nexus Utils! By accessing our interactive live-score dashboard, World Cup simulation utilities, match summaries, and sports commentary, you agree to comply with the following global legal terms of use."
                      : "أهلاً بك في منصة نكسس يوتيلز (Nexus Utils) الرياضية! باستخدامك لهذه المنصة التفاعلية ومتابعة نتائج مباريات كأس العالم والأخبار والملخصات، فإنك تبدي موافقتك الصريحة والكاملة على الالتزام بشروط الاستخدام والخدمة المدونة أدناه."}
                  </p>

                  <h3 className="text-xs md:text-sm font-black text-slate-900 border-r-4 border-blue-600 pr-2.5 mt-4">
                    {isEn ? "1. Authorized Intellectual Use" : "1. الاستخدام القانوني والمصرح به"}
                  </h3>
                  <p>
                    {isEn
                      ? "All published World Cup matches data, standings widgets, analytics vectors and code schemas remain under exclusive copy protection. Users may view, participate, and share custom match URLs only for personal, non-commercial purposes."
                      : "جميع المواد الإخبارية ومقاطع الفيديو والجداول التفاعلية المعروضة هي محمية بالكامل لمصلحة شبكتنا ومدرائها. غير مسموح بنسخ البيانات بشكل ممنهج ببرمجيات تجريف الويب أو توجيه هجمات الحرمان من الخدمة (DDoS)."}
                  </p>

                  <h3 className="text-xs md:text-sm font-black text-slate-900 border-r-4 border-blue-600 pr-2.5 mt-4">
                    {isEn ? "2. Dedicated FanZone Guidelines (User Commentary)" : "2. قواعد المشاركة في زاوية المشجعين"}
                  </h3>
                  <p>
                    {isEn
                      ? "Users are fully accountable for comments posted on the live chat / FanZone block. We strictly prohibit aggressive remarks, racial slurs concerning football players, political discussions, and malicious redirection links. Violating this will lead to immediate electronic ban by our managers."
                      : "يتحمل المستخدم المسؤولية الكاملة والنهائية عن أي منشورات أو تشجيعات يشاركها في زاوية المشجعين (FanZone). يمنع منعاً باتاً الإساءة لأي منتخب أو استخدام عبارات عنصرية، وتملك الإدارة كامل الصلاحية لحجب بروتوكول الإنترنت للزائر المخالف."}
                  </p>

                  <h3 className="text-xs md:text-sm font-black text-slate-900 border-r-4 border-blue-600 pr-2.5 mt-4">
                    {isEn ? "3. Limitation of Liabilities" : "3. حدود المسؤولية وإخلاء الطرف"}
                  </h3>
                  <p>
                    {isEn
                      ? "While match simulation logic and sports standings widgets provide maximum available accuracy, games forecasts, live timer feeds, and statistical reports are displayed for engagement purposes. We do not provide financial guarantees concerning football bets. Live at your own discretion."
                      : "على الرغم من بذل أقصى مجهود في استخراج وضبط التوقيتات والأرقام بمدونة المباريات، إلا أن المنصة تقدم البيانات كما هي دون أي ضمان كلي عن عدم وقوع أخطاء إملائية أو فنية، ولا نتحمل أي مسؤولية عن المراهنات الرياضية أو التوقعات الفاشلة."}
                  </p>
                </div>
              </div>
            )}

            {/* 3. TRADEMARKS TAB */}
            {activeTab === 'trademarks' && (
              <div className="space-y-6">
                <div className={`flex items-center gap-3 border-b border-gray-100 pb-4 ${isEn ? 'flex-row-reverse' : 'flex-row'}`}>
                  <Award className="w-6 h-6 text-[#004b91]" />
                  <h2 className="text-lg md:text-xl font-black text-slate-900">
                    {isEn ? "Trademarks & IP Compliance" : "العلامات التجارية وحفظ الملكية الفكرية"}
                  </h2>
                </div>

                <div className="space-y-4 text-xs md:text-sm text-slate-700 leading-relaxed font-bold">
                  <p>
                    {isEn
                      ? "Nexus Utils respects all trademark guidelines of Nexus Group, FIFA World Cup, and registered international bodies. Here we outline ownership clarifications concerning all visible sports brands on our web application."
                      : "نحن في منصة نكسس يوتيلز (Nexus Utils) نحترم تماماً كافة لوائح الملكية الفكرية والعلامات التجارية لـ FIFA والمنتخبات المشاركة. نسرد هنا حدود استخدام الشعارات والعلامات التجارية."}
                  </p>

                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-3">
                    <div className="flex gap-2.5 items-start">
                      <span className="text-blue-600 text-xs font-black">■</span>
                      <p>
                        <strong>{isEn ? "Nexus Utils Brand: " : "علامة نكسس يوتيلز: "}</strong>
                        {isEn 
                          ? "Nexus Utils is an independent registered brand name. This application is designed as an optimized fan hub layout tribute using the custom styling pattern for Google AdSense demonstration and World Cup fun."
                          : "تعد علامة نكسس يوتيلز (Nexus Utils) علامة تجارية مسجلة ومستقلة، ويتم تمثيل النمط هنا لغرض دمج الأخبار الرياضية لمشجعي المونديال بشكل علمي ومتقن للجمهور العربي."}
                      </p>
                    </div>
                    <div className="flex gap-2.5 items-start">
                      <span className="text-blue-600 text-xs font-black">■</span>
                      <p>
                        <strong>{isEn ? "FIFA World Cup & Logos: " : "الاتحاد الدولي لكرة القدم (فيفا): "}</strong>
                        {isEn 
                          ? "The term 'FIFA World Cup 2026', tournament branding, specific official mascot images, and stadium emblems belong exclusively to FIFA. We only use literal text and representative icons for identification purposes of schedules."
                          : "تعتبر كلمة كأس العالم 2026 والمنتخبات المشاركة وشعاراتها ملكاً خالصاً للفيفا والاتحادات الوطنية المعنية بها. استخدامنا لها يأتي في سياق سردي وإخباري بحت لتوقعات ونتائج المباريات الرسمية وكتابة التقارير."}
                      </p>
                    </div>
                  </div>

                  <p>
                    {isEn
                      ? "If you represent any intellectual copyright holder and find that any news content or uploaded video link here violates safe boundary rights, please message our administrators via 'Contact & Feedback' right away for immediate content deletion within 12 hours max."
                      : "إذا كنت ممثلاً قانونياً لجهة تملك حقوقاً فكرية معينة وترى أن هناك مقطعاً أو مادة تم نشرها من أحد المدراء بشكل خاطئ، يرجى التكرم بمراسلتنا فورياً من تبويب (اتصل بنا) لنقوم بإزالتها على الفور طوعياً دون إبطاء."}
                  </p>
                </div>
              </div>
            )}

            {/* 4. ABOUT OUR ADS TAB */}
            {activeTab === 'ads' && (
              <div className="space-y-6">
                <div className={`flex items-center gap-3 border-b border-gray-100 pb-4 ${isEn ? 'flex-row-reverse' : 'flex-row'}`}>
                  <Mic className="w-6 h-6 text-[#004b91]" />
                  <h2 className="text-lg md:text-xl font-black text-slate-900">
                    {isEn ? "About Our Ads & Monetization" : "عن إعلاناتنا الخاصة والتخصيص الإعلاني"}
                  </h2>
                </div>

                <div className="space-y-4 text-xs md:text-sm text-slate-700 leading-relaxed font-bold">
                  <p>
                    {isEn
                      ? "To support our free premium coverage of the FIFA World Cup (including real-time databases, standings calculation servers, and video processing), we display native network advertisements powered by Google AdSense."
                      : "من أجل تمكيننا من تقديم هذه التغطية الرياضية وبث التحديثات والفيديوهات بالمجان، نقوم بعرض إعلانات ممولة ومقدمة بواسطة منصة Google AdSense المعتمدة رسمياً."}
                  </p>

                  <h3 className="text-xs md:text-sm font-black text-slate-900 border-r-4 border-blue-600 pr-2.5 mt-4">
                    {isEn ? "How Personalized Ads Work" : "كيفية عمل الإعلانات المخصصة"}
                  </h3>
                  <p>
                    {isEn
                      ? "Ads shown are customized according to your browsing behaviors, and geographic locations (determined by country IP ranges). It serves only safe sports equipment, FIFA tickets portals, and family friendly brand promotions."
                      : "يتم فحص وتدقيق هذه الإعلانات لتلائم المتصفح بناءً على بلد الإقامة والاهتمامات الشخصية الكروية (مثل قمصان الأندية، أحذية اللعب، وتذاكر المباريات). إعلاناتنا عائلية ومحترمة بالكامل."}
                  </p>

                  <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl space-y-2">
                    <h4 className="text-xs font-black text-[#004b91] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isEn ? "User Ad Choices Control:" : "خيارات التحكم الكامل للمستخدم:"}</span>
                    </h4>
                    <ul className="list-disc list-inside space-y-1.5 text-slate-600 text-xs mr-4">
                      <li>
                        {isEn 
                          ? "You can easily opt-out of personalized advertisement tracking by configuring your Google ads preferences center." 
                          : "يمكنك تعطيل ظهور الإعلانات الموجهة مسبقاً عن طريق تعديل لوحة تحكم إعدادات الحساب في جوجل."}
                      </li>
                      <li>
                        {isEn 
                          ? "You can delete history records or cache parameters securely using standard browser controls." 
                          : "يمكنك استخدام إضافات منع التعقب أو مسح الكوكيز في أي وقت دون أن تتأثر جودة تصفح نتائج المباريات."}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* 5. CONTACT US & FEEDBACK FORM */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <div className={`flex items-center gap-3 border-b border-gray-100 pb-4 ${isEn ? 'flex-row-reverse' : 'flex-row'}`}>
                  <Mail className="w-6 h-6 text-[#004b91]" />
                  <h2 className="text-lg md:text-xl font-black text-slate-900">
                    {isEn ? "Contact Us & Direct Feedback" : "اتصل بنا المباشر وإرسال الشكاوى والمقترحات"}
                  </h2>
                </div>

                <p className="text-xs text-slate-600 font-bold leading-relaxed">
                  {isEn
                    ? "Do you have any comments about FIFA rankings, match simulation algorithms, copyright claims, or AdSense business proposals? Feel free to contact the Nexus Utils team. We read and verify every single feedback message."
                    : "هل لديك فكرة تطويرية، نقد بناء للترتيب والتقارير الرياضية، تواصل بخصوص إعلانات وتسويق نكسس يوتيلز (Nexus Utils)؟ تفضل بملء هذه الاستمارة الرسمية وسنتجاوب معك بأسرع وقت."}
                </p>

                <form onSubmit={handleContactSubmit} className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-black text-slate-700 block mb-1">
                        {isEn ? "Your Full Name" : "الاسم الكامل الكريم *"}
                      </label>
                      <input 
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="مثال: حسني شورة"
                        className="w-full text-xs text-slate-800 bg-gray-50 border border-gray-300 rounded-lg p-2.5 focus:ring-1 focus:ring-blue-600 focus:bg-white focus:outline-hidden font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-black text-slate-700 block mb-1">
                        {isEn ? "Your Email Address" : "البريد الإلكتروني المعتمد *"}
                      </label>
                      <input 
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@gmail.com"
                        className="w-full text-xs text-slate-800 bg-gray-50 border border-gray-300 rounded-lg p-2.5 focus:ring-1 focus:ring-blue-600 focus:bg-white focus:outline-hidden font-bold text-left"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-black text-slate-700 block mb-1">
                        {isEn ? "Message Subject" : "عنوان وموضوع الرسالة"}
                      </label>
                      <input 
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="مثال: مقال مفقود / خطأ بإحصائية معينة"
                        className="w-full text-xs text-slate-800 bg-gray-50 border border-gray-300 rounded-lg p-2.5 focus:ring-1 focus:ring-blue-600 focus:bg-white focus:outline-hidden font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-black text-slate-700 block mb-1">
                        {isEn ? "Inquiry Division" : "القسم المختص المتلقي للرسالة"}
                      </label>
                      <select 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full text-xs text-slate-800 bg-gray-50 border border-gray-300 rounded-lg p-2.5 focus:ring-1 focus:ring-blue-600 focus:bg-white focus:outline-hidden font-bold"
                      >
                        <option value="general">{isEn ? "General Enquiries" : "استفسارات عامة واقتراحات"}</option>
                        <option value="adsense">{isEn ? "AdSense & Advertisment Hub" : "الإعلان على الموقع والتسويق"}</option>
                        <option value="technical">{isEn ? "Match Simulation / Technical Bug" : "مشكلة فنية أو محاكاة المباريات"}</option>
                        <option value="reporting">{isEn ? "Inappropriate Fan Content / Report" : "الإبلاغ عن إساءة في زاوية الجماهير"}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-black text-slate-700 block mb-1">
                      {isEn ? "Your Message Detailed Text" : "نص الرسالة والتعليق بكافة التفاصيل *"}
                    </label>
                    <textarea 
                      required
                      rows={5}
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder={isEn ? "Type your message details here..." : "اكتب هنا كل التفاصيل والروابط التي تريد توجيهها لإدارة الموقع بوضوح مخلص..."}
                      className="w-full text-xs text-slate-800 bg-gray-50 border border-gray-300 rounded-lg p-2.5 focus:ring-1 focus:ring-blue-600 focus:bg-white focus:outline-hidden font-bold leading-relaxed"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 bg-[#004b91] hover:bg-blue-800 text-white text-xs font-black rounded-lg shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>
                      {isSubmitting 
                        ? (isEn ? "Sending securely..." : "جاري الإرسال وتأمين الطلب...") 
                        : (isEn ? "Submit Message & Apply Verification" : "إرسال طلبي والتحقق القانوني")}
                    </span>
                  </button>
                </form>
              </div>
            )}

            {/* 6. HELP & SUPPORT / FAQS */}
            {activeTab === 'help' && (
              <div className="space-y-6">
                <div className={`flex items-center gap-3 border-b border-gray-100 pb-4 ${isEn ? 'flex-row-reverse' : 'flex-row'}`}>
                  <HelpCircle className="w-6 h-6 text-[#004b91]" />
                  <h2 className="text-lg md:text-xl font-black text-slate-900">
                    {isEn ? "Help Desk & FAQ Portal" : "مكتب الدعم المباشر والأسئلة الشائعة"}
                  </h2>
                </div>

                <p className="text-xs text-slate-600 font-bold leading-relaxed">
                  {isEn
                    ? "Welcome to Nexus Utils Support! Read our answers to the most common queries about live score synchronization, managing articles, interactive brackets, and ad banners."
                    : "مرحباً بك في مركز مساعدة نكسس يوتيلز (Nexus Utils)! جمعنا لك أكثر الأسئلة تكراراً لتوضيح كيف تعمل المنصة وتقنياتها الرياضية وكيف تساهم معنا."}
                </p>

                {/* FAQ accordions */}
                <div className="space-y-3">
                  {[
                    {
                      qAr: 'كيف تضمنون دقة وتزامن وتوقيت المباريات والنتائج؟',
                      qEn: 'How do you guarantee the accuracy of results and timing?',
                      aAr: 'تقوم المنصة بسحب وتغذية البيانات عبر محرك رياضي تفاعلي (Football API System) يعمل بذكاء ودقة متبادلة، ويمكن للمشرف تحديث النتائج مباشرة عبر لوحة التحكم في ثوانٍ معدودة.',
                      aEn: 'The platform pulls and feeds data via an interactive Football API sport engine, and matches scores can be instantly adjusted and published by verified managers.'
                    },
                    {
                      qAr: 'هل يمكنني الإعلان أو توفير قنوات خاصة بي على المنصة؟',
                      qEn: 'Can I advertise or establish my own banners here?',
                      aAr: 'نعم بالتأكيد! نحن ندعم تفعيل الإعلانات ونوفر مساحات متوافقة كلياً مع معايير Google AdSense. يمكنك ملء تفاصيل طلبك من تبويب (اتصل بنا) مع تحديد قسم الإعلانات.',
                      aEn: 'Yes! We support native AdSense positions. Simply submit your business proposal details through our (Contact & Feedback) tab selecting the relevant department.'
                    },
                    {
                      qAr: 'كيف يمكنني استعادة البيانات الأصلية عند وقوع خلل بملفات الكوكيز؟',
                      qEn: 'How can I restore default data if local storage becomes corrupt?',
                      aAr: 'مبسط جداً! كمسؤول أو مشرف، تملك زراً خاصاً لإعادة تعيين قاعدة البيانات بأكملها (الأخبار، النتائج، مقاطع الفيديو) إلى القيم والقصص والنجوم الافتراضية بنقرة واحدة.',
                      aEn: 'Extremely easy! As an administrator, you are equipped with a single key to wipe storage and restore Nexus server defaults with one push of a button.'
                    },
                    {
                      qAr: 'ما هي قواعد كتابة ونشر مقالات في قسم نكسس الترفيهي الرياضي؟',
                      qEn: 'What are the rules for publishing in the Nexus entertainment block?',
                      aAr: 'يجب أن تتركز كافة الأخبار والمقالات على موضوعات كأس العالم لكرة القدم، وتحليل أداء الفرق ومشاهير الكرة مع احترام حقوق المؤلف الموفرة دولياً.',
                      aEn: 'All written stories must relate to FIFA standings, soccer metrics, team schedules, group analysis or star players, respecting third-party copy-protection laws.'
                    }
                  ].map((faq, index) => {
                    const isOpen = openFaq === index;
                    return (
                      <div key={index} className="border border-gray-150 rounded-xl overflow-hidden bg-gray-50/30">
                        <button
                          onClick={() => toggleFaq(index)}
                          className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50/50 text-right cursor-pointer gap-4 transition-colors"
                        >
                          <span className="text-xs font-extrabold text-[#004b91]">
                            {isOpen ? '▲' : '▼'}
                          </span>
                          <span className="text-xs md:text-sm font-black text-slate-800 text-right leading-snug">
                            {isEn ? faq.qEn : faq.qAr}
                          </span>
                        </button>
                        {isOpen && (
                          <div className="p-4 border-t border-gray-150 bg-white leading-relaxed font-bold text-xs text-slate-650 text-right">
                            {isEn ? faq.aEn : faq.aAr}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Extra Support Details */}
                <div className="bg-blue-50/30 border border-blue-100 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-right mt-6">
                  <div>
                    <h4 className="text-xs font-black text-slate-900">{isEn ? "Need more personalized assistance?" : "هل لا زلت تبحث عن إجابات مخصصة؟"}</h4>
                    <p className="text-[11px] text-slate-500 font-bold mt-1">
                      {isEn ? "Open a direct support ticket or proposal on our contact window." : "فريق الرصد والدعم الخاص بنا يسعد بتلقي مذكراتكم المباشرة لحلها."}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('contact')}
                    className="px-3.5 py-1.5 bg-[#004b91] hover:bg-blue-800 text-white text-[11px] font-black rounded-lg transition-colors cursor-pointer"
                  >
                    {isEn ? "Open Contact Form" : "اتصل بنا الآن"}
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
