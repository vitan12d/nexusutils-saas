import { Sparkles, ArrowRight, ChevronRight, FileText, Image as ImageIcon, Type, DollarSign, Code, Search as SearchIcon, ShieldCheck, Percent } from 'lucide-react';

interface LandingPageProps {
  onExplore: () => void;
  onSelectCategory: (cat: string) => void;
  onNavigateSlug: (slug: string) => void;
}

const CATEGORY_ICONS: Record<string, any> = {
  pdf: FileText,
  image: ImageIcon,
  text: Type,
  finance: DollarSign,
  developer: Code,
  seo: SearchIcon,
};

export default function LandingPage({ onExplore, onSelectCategory, onNavigateSlug }: LandingPageProps) {
  const POPULAR_SEO_PAGES = [
    { name: 'Merge PDF', slug: 'merge-pdf', desc: 'Securely combine multiple PDF documents into a single file.', catName: 'PDF' },
    { name: 'Compress PDF', slug: 'compress-pdf', desc: 'Squeeze PDF file sizes without losing page readability.', catName: 'PDF' },
    { name: 'JSON Formatter & Validator', slug: 'json-formatter', desc: 'Validate, beautify, and compress JSON payloads instantly.', catName: 'Developer' },
    { name: 'Base64 Encoder', slug: 'base64-encoder', desc: 'Convert Unicode strings to Base64 or decode back securely.', catName: 'Developer' },
    { name: 'Regex Tester', slug: 'regex-tester', desc: 'Build and debug ECMAScript RegExp structures in real-time.', catName: 'Developer' },
    { name: 'Meta Tag Generator', slug: 'meta-tag-generator', desc: 'Formulate search-optimized tags for Google indexing.', catName: 'SEO Setup' },
    { name: 'Robots.txt Generator', slug: 'robots-generator', desc: 'Configure search crawler protocols and exclude directories.', catName: 'SEO Setup' },
    { name: 'Compress Image', slug: 'compress-image', desc: 'Optimize PNG, JPEG, and WebP dimensions and weight.', catName: 'Images' },
    { name: 'WebP / ICO Converter', slug: 'webp-converter', desc: 'Shave off assets size by migrating images to next-gen WebP format.', catName: 'Images' }
  ];
  const landingCategories = [
    {
      id: 'pdf',
      title: 'PDF Compiler',
      desc: 'Secure local PDF merging, precise file compression, and structural conversion tools that process entirely in your local sandbox.',
      idCode: 'v2.1',
      span: 'md:col-span-2',
      isGlass: true,
      color: 'from-red-500 to-orange-500',
    },
    {
      id: 'image',
      title: 'Image Canvas',
      desc: 'Lossless compressor, batch size adjustments, and instant format shifting.',
      idCode: 'v1.4',
      span: 'md:col-span-1',
      isGlass: false,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      id: 'text',
      title: 'Text Analytics',
      desc: 'Calculate absolute densities, casing transformations, and clean markdown text structures.',
      idCode: 'v1.0',
      span: 'md:col-span-1',
      isGlass: false,
      color: 'from-blue-500 to-sky-500',
    },
    {
      id: 'finance',
      title: 'Finance Hub',
      desc: 'Certified invoice builders and automatic math calculators. Fully templated billing suites styled with custom item list grids.',
      idCode: 'v2.0',
      span: 'md:col-span-2',
      isGlass: true,
      color: 'from-indigo-600 to-blue-500',
    },
    {
      id: 'developer',
      title: 'Developer Core',
      desc: 'Robust JSON validation, formatter blocks, security hash controls, and responsive palettes.',
      idCode: 'v3.5',
      span: 'md:col-span-2',
      isGlass: false,
      color: 'from-purple-600 to-indigo-500',
    },
    {
      id: 'seo',
      title: 'SEO Tag Center',
      desc: 'Construct meta search headers and spider indexes instantly.',
      idCode: 'v1.1',
      span: 'md:col-span-1',
      isGlass: false,
      color: 'from-amber-500 to-orange-500',
    },
  ];

  return (
    <div className="bg-slate-50 dark:bg-[#0F172A] text-slate-800 dark:text-slate-200 font-sans min-h-screen transition-colors duration-250">
      {/* Premium Hero Block */}
      <section className="relative pt-24 pb-20 px-4 max-w-7xl mx-auto text-center overflow-hidden">
        <div className="absolute inset-0 top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-gradient-to-b from-blue-500/10 to-transparent blur-3xl rounded-full" />

        <div className="relative space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full bg-blue-50 dark:bg-blue-955 border border-blue-150/40 dark:border-blue-900/40 text-blue-700 dark:text-blue-400 text-xs font-bold shadow-xs">
            <Sparkles className="h-3.5 w-3.5" />
            <span>20+ FREE Professional Web Utilities</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight font-sans">
            Unleash Supreme Productivity with <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">NexusUtils</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Over 20+ fully-functional developer, image, text, and financial tools. Built 100% serverless and offline-first — keeping your private data strictly secure inside your browser.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={onExplore}
              className="py-3 px-8 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-xs transition duration-200 flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              Launch Dashboard
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="#categories"
              className="py-3 px-8 bg-white dark:bg-slate-900 hover:bg-slate-100 hover:dark:bg-slate-800 border border-slate-200 dark:border-slate-800/80 text-slate-755 dark:text-slate-305 font-bold rounded-xl transition duration-200 text-sm flex items-center justify-center cursor-pointer"
            >
              Explore Tool Library
            </a>
          </div>
        </div>
      </section>

      {/* Visual bento categories */}
      <section id="categories" className="py-20 px-4 bg-slate-100/50 dark:bg-slate-900/20 border-t border-b border-slate-200/60 dark:border-slate-900">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3.5">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Productivity Toolbox</h2>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Engineered with zero-server latency tracking & secure containers</p>
          </div>

          {/* Primary SEO Tools Directory links block */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 pl-1">Direct Search Portals (Interactive SEO Suite)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {POPULAR_SEO_PAGES.map((page) => (
                <a
                  key={page.slug}
                  href={`/tools/${page.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateSlug(page.slug);
                  }}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/60 hover:border-blue-500/80 dark:hover:border-blue-500/40 hover:-translate-y-0.5 transition duration-200 flex flex-col justify-between group cursor-pointer shadow-3xs"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-extrabold uppercase bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md font-mono">
                        {page.catName}
                      </span>
                      <span className="text-blue-600 dark:text-blue-405 text-xs font-bold opacity-0 group-hover:opacity-100 transition duration-155 transform translate-x-1 group-hover:translate-x-0">
                        Use Now →
                      </span>
                    </div>
                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-405 transition-colors">
                      {page.name}
                    </h4>
                    <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed font-semibold">
                      {page.desc}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-200/80 dark:border-slate-800/55 pt-10 text-center">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-450 dark:text-slate-500 mb-2">Or Explore Complete Sandbox Suites</h3>
          </div>

          {/* Dynamic Bento-Grid Layout of Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {landingCategories.map((cat) => {
              const IconComp = CATEGORY_ICONS[cat.id] || Sparkles;
              const cardClass = cat.isGlass
                ? "bento-glass group cursor-pointer flex flex-col justify-between min-h-[220px]"
                : "bento-card group cursor-pointer flex flex-col justify-between min-h-[220px]";

              return (
                <div
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`${cardClass} ${cat.span}`}
                >
                  <div className="bento-glow" />
                  
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      {/* Premium Logo Box */}
                      <div className={`bento-icon-box bg-gradient-to-tr ${cat.color} text-white`}>
                        <IconComp className="h-5 w-5" />
                      </div>
                      
                      <span className="text-[10px] bento-mono text-slate-400 dark:text-blue-400/80 font-bold uppercase bg-slate-100 dark:bg-slate-800/60 px-2.5 py-0.5 rounded-full border border-slate-200/20 dark:border-white/5 shadow-2xs">
                        {cat.idCode}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-650 dark:group-hover:text-blue-400 transition-colors duration-200">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-550 dark:text-slate-400 mt-2 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="mt-5 flex justify-between items-center pt-2.5 border-t border-slate-100 dark:border-white/5">
                    <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition duration-200 flex items-center gap-1.5">
                      Launch Tools Suite
                      <ChevronRight className="h-3.5 w-3.5 transform group-hover:translate-x-0.5 transition" />
                    </span>
                    <span className="text-[9px] font-bold text-slate-350 dark:text-slate-650 uppercase">Active Sandbox</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quality Guarantees / High-security Certifications as horizontal bento grid row */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 rounded-2xl flex flex-col items-center sm:items-start text-center sm:text-left gap-4 hover:border-slate-300 dark:hover:border-slate-850 transition">
            <div className="p-3 bg-red-500/10 text-red-500 max-w-fit rounded-xl">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">100% Private & Secure</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold mt-1">
                Zero file uploads or leaks. Your private documents, code blocks, images, and financial ledgers are computed purely inside your safe client browser.
              </p>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 rounded-2xl flex flex-col items-center sm:items-start text-center sm:text-left gap-4 hover:border-slate-300 dark:hover:border-slate-850 transition">
            <div className="p-3 bg-blue-500/10 text-blue-500 max-w-fit rounded-xl">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">Blazing Fast Performance</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold mt-1">
                Instant computation with zero queue times, server down times, or waiting lobbies. Processing finishes in sub-second browser timeline cycles.
              </p>
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 rounded-2xl flex flex-col items-center sm:items-start text-center sm:text-left gap-4 hover:border-slate-300 dark:hover:border-slate-850 transition">
            <div className="p-3 bg-emerald-500/10 text-emerald-500 max-w-fit rounded-xl">
              <Percent className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">No Premium Subscription Gates</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold mt-1">
                Access 20+ operations with absolutely zero pricing traps, credit-card locks, or feature timeouts. Clean layouts and optimized utility code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Robust High-Value Bilingual SEO Content and Knowledge Base */}
      <section className="py-16 px-4 bg-white dark:bg-slate-900 border-t border-slate-205 dark:border-slate-800">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="border-b border-slate-200 dark:border-slate-800 pb-5 text-center max-w-3xl mx-auto">
            <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full uppercase tracking-widest block w-max mx-auto mb-3">
              Knowledge Hub & Technical Documentation • مركز المعرفة والتوثيق التقني
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              لماذا تُعد منصة NexusUtils الخيار الأمثل للمستخدمين والشركات؟
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">
              We process everything locally. Learn how our client-side architecture revolutionizes daily digital workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs sm:text-sm">
            
            {/* Column 1 - Arabic Explanation */}
            <div className="space-y-6 text-slate-600 dark:text-slate-350 leading-relaxed font-semibold">
              <div className="space-y-2">
                <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-600" />
                  <span>مفهوم معالجة الملفات في جانب العميل (Local Web Applications)</span>
                </h3>
                <p>
                  تعتمد معظم المواقع التقليدية على رفع ملفاتك وصورك ومستنداتك القانونية إلى خوادم وسيطة لمعالجتها، مما يشكل خطورة بالغة على خصوصية البيانات وإمكانية تسريبها. في منصتنا، نؤمن بالحرية الرقمية والخصوصية المطلقة. يتم تنفيذ كافة الأكواد الحسابية لضغط الصور، وتجميع مستندات PDF، وصنع الفواتير التجارية، وتشفير النصوص، وترميز اللغات مباشرة داخل متصفحك الخاص دون أن تغادر جهازك أبداً.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-550" />
                  <span>حلول رقمية متطابقة مع معايير الأمان العالمية (GDPR & CCPA Compliant)</span>
                </h3>
                <p>
                  نظراً لأن منصتنا الرقمية هي تطبيق محلي بالكامل (Static Portal)، فإننا لا نقوم بإنشاء سجلات مستخدمين ولا نحتفظ بنسخ احتياطية للبيانات. يتيح ذلك للشركات والباحثين والمبرمجين معالجة البيانات الحساسة دون القلق من مخالفة قواعد الامتثال العالمية لحماية خصوصية المستهلكين.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-purple-650" />
                  <span>موسوعة التبويبات والخدمات المتقدمة مجاناً</span>
                </h3>
                <p>
                  توفر المنصة حالياً ما يزيد عن عشرين تطبيقاً فرعياً مقسمة بعناية لتغطية احتياجات المطورين (كأدوات فحص وتنسيق ملفات JSON)، ومنشئي المحتوى (كضغط الصور وتغيير أبعادها)، ومدراء الـ SEO (كمنشئ الأوسمة والوسوم المخصصة لمحركات البحث)، والمحاسبين (كصانع الفواتير الرقمية والآلات الحاسبة المتقدمة).
                </p>
              </div>
            </div>

            {/* Column 2 - English Explanation */}
            <div className="space-y-6 text-slate-600 dark:text-slate-350 leading-relaxed font-semibold">
              <div className="space-y-2">
                <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-600" />
                  <span>How Client-Side Runtime Processing Guarantees Absolute Security</span>
                </h3>
                <p>
                  When you use online utilities, document leakage is often a primary concern. Our platform completely mitigates this hazard. By running standard compilation, resizing, and data rendering exclusively inside the client's localized memory thread, we ensure that zero bytes are ever uploaded to exterior databases.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-550" />
                  <span>The AdSense Program Partnership & Value Creation</span>
                </h3>
                <p>
                  In accordance with the highest publishing quality guidelines, our platform is fully engineered to deliver unique, high-utility service structures paired with explanatory documentation. This guarantees optimal site speed indexes, clean responsive design patterns across screens, and an incredible user experience which advertisers highly value.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-purple-650" />
                  <span>Optimized Codebases with Zero Computational Lag</span>
                </h3>
                <p>
                  No queue times, no paywalls, and no subscription gates. Our static micro-modules load instantaneously. From compiling developer packages to creating commercial invoices or parsing complex cryptographic strings, everything in NexusUtils executes directly on your system, bypassing network delay loops.
                </p>
              </div>
            </div>

          </div>

          {/* Bilingual FAQ Grid to solidify word count and density */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-950/20 border border-slate-200 dark:border-slate-800 space-y-6">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center gap-2">
              <span>💬</span>
              <span>الأسئلة الأكثر تكراراً • Frequently Asked Questions Center</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-900 dark:text-white">هل أحتاج إلى دفع أي رسوم مستقبلاً؟</h4>
                <p className="text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                  لا على الإطلاق. تلتزم منصتنا بتقديم كافة خدماتها الرقمية وبرمجياتها المساعدة بشكل مجاني بالكامل لكافة الزوار والشركاء، ويتم تغطية تكاليف الاستضافة والصيانة عبر شراكاتنا الإعلانية غير المزعجة.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-900 dark:text-white">Are my scanned files or custom invoices leaked?</h4>
                <p className="text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                  Never. Since processing occurs in the virtual environment of your local browser, no server ever intercepts what you parse, write, or resize. Absolute privacy compliance is achieved automatically.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-900 dark:text-white">كيف يمكنني التواصل مع فريق الدعم؟</h4>
                <p className="text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                  يمكنك التواصل معنا بكل سهولة عبر زيارة صفحة "اتصل بنا" المرفقة في أسفل الموقع أو مراسلتنا مباشرة على البريد الإلكتروني المعتمد للدعم الفني للاستفسار عن أي شراكات أو تقديم المقترحات.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-900 dark:text-white">Which formats are verified for PDF compile routines?</h4>
                <p className="text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                  Our compiler handles standard PDF format versions seamlessly, providing rich output without needing external server conversions or file exports.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
