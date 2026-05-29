import React, { useState } from 'react';
import { Mail, Shield, Scale, Info, CheckCircle2, AlertTriangle, ChevronDown } from 'lucide-react';

export default function StaticPages({ pageId }: { pageId: string }) {
  if (pageId === 'about') return <AboutPage />;
  if (pageId === 'privacy') return <PrivacyPolicy />;
  if (pageId === 'terms') return <TermsOfService />;
  if (pageId === 'contact') return <ContactPage />;
  if (pageId === 'faq') return <FAQPage />;
  return null;
}

// 1. About Us Page Component
function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-205 dark:border-slate-800 shadow-sm space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <Info className="h-6 w-6 text-indigo-500" />
        <h2 className="text-2xl font-bold font-sans tracking-tight text-slate-800 dark:text-slate-100">About NexusUtils</h2>
      </div>

      <div className="space-y-6 text-xs sm:text-sm font-sans text-slate-600 dark:text-slate-350 leading-relaxed font-semibold">
        <p className="text-base font-extrabold text-slate-800 dark:text-slate-100 italic">
          Welcome to NexusUtils (
          <a href="https://nexusutils.online/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">
            https://nexusutils.online/
          </a>
          ), your ultimate, ultra-fast engineering ecosystem engineered explicitly for developers, web designers, content creators, and SEO strategists.
        </p>

        <div className="space-y-3">
          <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-150 uppercase tracking-wider border-l-4 border-indigo-500 pl-2.5">
            Our Mission
          </h3>
          <p>
            The web development ecosystem is heavily crowded with micro-SaaS platforms that hide basic, daily utilities behind complex account signup barriers, aggressive subscription gates, and hidden rate limits. NexusUtils was founded to completely smash this friction. Our core directive is simple: Deliver premium, blazing-fast, and completely unrestricted web utilities with zero latency and zero server-side storage.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-150 uppercase tracking-wider border-l-4 border-indigo-500 pl-2.5">
            What Makes NexusUtils Unique?
          </h3>
          <ul className="space-y-3 list-none pl-1">
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 font-black mt-0.5">•</span>
              <div>
                <strong className="text-slate-850 dark:text-slate-200">Blazing Fast Speeds (~47ms Response Time):</strong> Built on an optimized Next-gen single-page reactive architecture and Tailwind CSS grids, ensuring rendering metrics that consistently achieve 93+/100 on Google Lighthouse performance reviews.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 font-black mt-0.5">•</span>
              <div>
                <strong className="text-slate-850 dark:text-slate-200">Strictly 100% Client-Side Computing:</strong> Your data privacy is guaranteed by web architecture. All data inputs (whether JSON schemas, large image payloads, code scripts, or metadata blocks) are compiled and executed entirely inside your browser's V8 engine. Data never leaves your local hardware interface.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 font-black mt-0.5">•</span>
              <div>
                <strong className="text-slate-850 dark:text-slate-200">No Account, No Signups, No Paywalls:</strong> Open the page, compute your parameters, copy your clean output code, and move on. No registration workflows required.
              </div>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-150 uppercase tracking-wider border-l-4 border-indigo-500 pl-2.5">
            Our Specialized Tooling Categories
          </h3>
          <ol className="space-y-3 list-decimal pl-5">
            <li>
              <strong className="text-slate-850 dark:text-slate-200">Developer Core:</strong> Highly requested formatters, obfuscators, and code model transpilator bridges (JSON to Go/Java) executing sub-second.
            </li>
            <li>
              <strong className="text-slate-850 dark:text-slate-200">Text Analytics & SEO:</strong> Pixel-perfect visual preview engines simulating Google Desktop/Mobile search outputs and social metadata adapters (Open Graph & Twitter Cards) alongside local text comparison engines.
            </li>
            <li>
              <strong className="text-slate-850 dark:text-slate-200">Image Canvas:</strong> Native browser canvas manipulation scripts for converting JPG/PNG assets into space-saving WebP formats or custom icon wrappers (.ICO favicons) with absolute structural clarity.
            </li>
          </ol>
        </div>

        <p className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 font-medium">
          Thank you for choosing NexusUtils as your absolute companion for supreme digital productivity. Let's make engineering fluid again.
        </p>
      </div>
    </div>
  );
}

// 2. Privacy Policy Component (AdSense Compliance)
function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-205 dark:border-slate-800 shadow-sm space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <Shield className="h-6 w-6 text-emerald-500" />
        <h2 className="text-2xl font-bold font-sans tracking-tight text-slate-800 dark:text-slate-100">Privacy Policy</h2>
      </div>

      <div className="space-y-5 text-xs sm:text-sm font-sans text-slate-650 dark:text-slate-350 leading-relaxed font-semibold">
        <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950/20 p-3 rounded-lg border border-slate-150 dark:border-slate-850">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Effective Date: May 29, 2026</span>
          <span className="text-[11px] font-bold text-indigo-500">AdSense & GDPR Certified</span>
        </div>

        <p>
          At NexusUtils, accessible from{" "}
          <a href="https://nexusutils.online/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">
            https://nexusutils.online/
          </a>
          , one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by NexusUtils and how we use it.
        </p>

        <p>
          If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
        </p>

        <div className="space-y-3">
          <h3 className="text-sm font-extrabold text-slate-850 dark:text-slate-200 uppercase tracking-wide">
            1. 100% Zero-Server Processing & Data Privacy
          </h3>
          <p>
            Unlike traditional SaaS platforms, NexusUtils operates strictly under a Client-Side Execution Paradigm.
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              All operations, computations, and conversions (including JSON parsing, Code formatting, SEO previews, Text comparison, and Image to Base64/WebP encoding) are performed entirely within your web browser using HTML5 Web APIs and local JavaScript modules.
            </li>
            <li>
              Your files, codes, texts, and images are <strong className="text-slate-850 dark:text-slate-100">NEVER</strong> uploaded to our servers, third-party databases, or cloud storage environments. Your data remains completely isolated within your local system memory and is destroyed immediately upon closing the browser tab.
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-extrabold text-slate-850 dark:text-slate-200 uppercase tracking-wide">
            2. Log Files
          </h3>
          <p>
            NexusUtils follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this as part of hosting services' analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-extrabold text-slate-850 dark:text-slate-200 uppercase tracking-wide">
            3. Google DoubleClick DART Cookie & Advertising
          </h3>
          <p>
            Google is one of the third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to https://nexusutils.online/ and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL –{" "}
            <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">
              https://policies.google.com/technologies/ads
            </a>
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-extrabold text-slate-850 dark:text-slate-200 uppercase tracking-wide">
            4. Our Advertising Partners
          </h3>
          <p>
            Some of the advertisers on our site may use cookies and web beacons. Our advertising partners include:
          </p>
          <ul className="list-disc pl-5">
            <li>Google AdSense</li>
          </ul>
          <p>
            Each of our advertising partners has their own Privacy Policy for their policies on user data. For easier access, we hyperlinked to their Privacy Policies below:
          </p>
          <ul className="list-disc pl-5">
            <li>
              Google:{" "}
              <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                https://policies.google.com/technologies/ads
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-extrabold text-slate-850 dark:text-slate-200 uppercase tracking-wide">
            5. Third-Party Privacy Policies
          </h3>
          <p>
            NexusUtils's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
          </p>
          <p>
            You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-extrabold text-slate-850 dark:text-slate-200 uppercase tracking-wide">
            6. Children's Information
          </h3>
          <p>
            Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
          </p>
          <p>
            NexusUtils does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
          </p>
        </div>

        <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-extrabold text-slate-850 dark:text-slate-150 uppercase tracking-wider">
            7. Consent
          </h3>
          <p>
            By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
          </p>
        </div>
      </div>
    </div>
  );
}

// 3. Terms of Service Component
function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-205 dark:border-slate-800 shadow-sm space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <Scale className="h-6 w-6 text-amber-500" />
        <h2 className="text-2xl font-bold font-sans tracking-tight text-slate-800 dark:text-slate-100">Terms of Service</h2>
      </div>

      <div className="space-y-5 text-xs sm:text-sm font-sans text-slate-655 dark:text-slate-350 leading-relaxed font-semibold">
        <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950/20 p-3 rounded-lg border border-slate-150 dark:border-slate-850">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Effective Date: May 29, 2026</span>
          <span className="text-[11px] font-bold text-indigo-500">Terms of Service Agreement</span>
        </div>

        <p>
          By accessing or utilizing NexusUtils, you state that you have read, understood, and agreed to follow these Terms of Service. If you disagree, you must immediately terminate platform access.
        </p>

        <div className="space-y-3">
          <h3 className="text-sm font-extrabold text-slate-850 dark:text-slate-200 uppercase tracking-wide">
            1. Acceptance of Terms
          </h3>
          <p>
            By accessing and using{" "}
            <a href="https://nexusutils.online/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">
              https://nexusutils.online/
            </a>{" "}
            ("NexusUtils", "the Website", "the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-extrabold text-slate-850 dark:text-slate-200 uppercase tracking-wide">
            2. Description of Service
          </h3>
          <p>
            NexusUtils is an all-in-one suite of free, high-performance web developer, designer, and SEO utilities. The platform operates 100% serverless on the client-side. The tools are provided "as-is" and "as-available" without any premium subscription barriers, forced account creation, or platform usage limits.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-extrabold text-slate-850 dark:text-slate-200 uppercase tracking-wide">
            3. Fair & Permissible Use
          </h3>
          <p>
            You agree to use NexusUtils only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website. Permitted use includes:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Personal and commercial software development workflow optimizations.</li>
            <li>Mass text analytics, regex validations, and formatting.</li>
            <li>Image optimization, compression, and encoding for production websites.</li>
          </ul>
          <p className="mt-2 text-red-650 dark:text-red-400">
            Automated extraction of our client-side software algorithms via malicious scraping engines or embedding our standalone application frames within hostile third-party domains without written consent is strictly prohibited.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-extrabold text-slate-850 dark:text-slate-200 uppercase tracking-wide text-amber-600 dark:text-amber-450">
            4. Disclaimer of Warranties & Absolute Non-Liability
          </h3>
          <p>
            Because NexusUtils processes all user-input data strictly inside your local web browser context, we hold zero access to your data and assume no legal or operational liability for your workflows.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>We do not warrant that the website or its local utility modules will be error-free, uninterrupted, or perfectly accurate for highly critical mathematical, financial, or engineering tasks.</li>
            <li>Under no circumstances shall NexusUtils, its creators, or operators be held liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your reliance on our tools, system outputs, or generated scripts.</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-extrabold text-slate-850 dark:text-slate-200 uppercase tracking-wide">
            5. Third-Party Ads & Links
          </h3>
          <p>
            Our service contains responsive advertisement slots managed via Google AdSense and external links to authoritative reference nodes. We do not control, endorse, or assume responsibility for the operational content, privacy modules, or terms enforcement of any third-party advertising partners or external destinations.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-extrabold text-slate-850 dark:text-slate-200 uppercase tracking-wide">
            6. Modifications to the Service and Terms
          </h3>
          <p>
            NexusUtils reserves the right at any time to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice. We may amend these Terms of Service at any time by posting the updated terms on this website. Your continued use of the platform following any modifications constitutes formal acceptance of the modified terms.
          </p>
        </div>

        <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-extrabold text-slate-850 dark:text-slate-150 uppercase tracking-wider">
            7. Governing Law
          </h3>
          <p>
            Any claim relating to NexusUtils's website shall be governed by the laws of our operating region, without regard to its conflict of law provisions.
          </p>
        </div>
      </div>
    </div>
  );
}

// 4. Contact Us Page Component
function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'Support', message: '' });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all mandatory fields before sending inquiry.');
      return;
    }
    setError(null);
    setSuccess(true);
    setFormData({ name: '', email: '', subject: 'Support', message: '' });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-205 dark:border-slate-800 shadow-sm space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <Mail className="h-6 w-6 text-blue-500" />
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Contact Team Support</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Your Name *</span>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 rounded outline-none text-xs text-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Email Address *</span>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2 bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 rounded outline-none text-xs text-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Topic Subject</span>
            <select
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full p-2 bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 rounded outline-none text-xs text-slate-800 dark:text-slate-250 cursor-pointer"
            >
              <option>General Support Inquiry</option>
              <option>AdSense Partnership Proposal</option>
              <option>Report Bug / Issues</option>
            </select>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Inquiry Message *</span>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="w-full p-2 bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-800 rounded outline-none text-xs text-slate-800 dark:text-slate-100 resize-none animate-fade-in"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded transition cursor-pointer"
          >
            Submit Inquiry
          </button>
        </form>

        <div className="p-5 bg-slate-50 dark:bg-slate-950/20 rounded-lg border border-slate-150 dark:border-slate-850 flex flex-col justify-center space-y-4 text-xs font-sans text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
          <h4 className="text-sm font-bold text-slate-850 dark:text-slate-200">Other Support Channels</h4>
          <p>
            Our core helpdesk coordinates remain active 24/7. Standard turnaround times on email tickets reside within 24-48 business hours.
          </p>

          <div className="space-y-1.5 pt-2">
            <p className="font-extrabold text-[11px] text-slate-600 dark:text-slate-300">📧 General Helpdesk Support:</p>
            <p className="font-mono text-blue-600 dark:text-blue-400">support@nexusutils.online</p>
          </div>

          <div className="space-y-1.5">
            <p className="font-extrabold text-[11px] text-slate-600 dark:text-slate-300">🏢 Corporate headquarters:</p>
            <p>NexusUtils LLC, New York Tech Hub, Lower Manhattan, NY</p>
          </div>
        </div>
      </div>

      {success && (
        <div className="p-4 bg-green-50 dark:bg-green-950/25 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-900/40 rounded-lg flex items-center gap-2 text-xs">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>Success! Your inquiry ticket has been registered. Our staff will email you shortly.</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-955/15 text-red-750 dark:text-red-400 border border-red-200 dark:border-red-900/40 rounded-lg flex items-center gap-2 text-xs">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

// 5. FAQ Page Component
function FAQPage() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const faqs = [
    { q: 'Is NexusUtils completely free to use?', a: 'Yes. Every single one of our 20+ utility tools is 100% free with no login walls, premium popups, or limits. We run on non-intrusive ad monetizing.' },
    { q: 'Are my files uploaded or saved on some database?', a: 'No. To guarantee absolute compliance and privacy, our system runs completely client-side. The file data buffers stay inside your local browser memory sandboxes and are destroyed immediately upon window close.' },
    { q: 'What should I do if a PDF merge fails?', a: 'Make sure your files are valid, searchable PDF documents that are not protected by cryptographic passwords. If the browser memory gets overloaded, split massive multi-gigabyte uploads.' },
    { q: 'How does the AI Writing Assistant operate?', a: 'Our writing companion leverages a robust, secure server proxy which pipes refined prompts directly to Google Gemini 3.5 models. Your secret keys are kept completely hidden from the front-end code.' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-205 dark:border-slate-800 shadow-sm space-y-6">
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Frequently Asked Questions (FAQ)</h2>
        <p className="text-xs text-slate-400">Core answers to standard support and functionality inquiries.</p>
      </div>

      <div className="space-y-3.5">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden bg-slate-50/50 dark:bg-slate-950/15">
            <button
              onClick={() => setActiveIdx(activeIdx === idx ? null : idx)}
              className="w-full p-4.5 text-left font-bold text-slate-750 dark:text-slate-200 text-xs flex justify-between items-center outline-none selection:bg-transparent"
            >
              <span>{faq.q}</span>
              <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${activeIdx === idx ? 'rotate-180 text-blue-500' : 'text-slate-400'}`} />
            </button>
            {activeIdx === idx && (
              <div className="p-4.5 bg-white dark:bg-slate-900 border-t border-slate-150 dark:border-slate-850 text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold animate-fade-in">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
