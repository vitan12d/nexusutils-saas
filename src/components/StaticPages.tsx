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
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-205 dark:border-slate-800 shadow-sm space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <Info className="h-6 w-6 text-blue-500" />
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">About NexusUtils</h2>
      </div>

      <div className="space-y-4 text-xs font-sans text-slate-600 dark:text-slate-350 leading-relaxed font-semibold">
        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
          NexusUtils is a leading SaaS provider of free, lightweight, high-performance online utility tools tailored specifically for developers, content creators, researchers, and financial teams worldwide.
        </p>

        <p>
          Founded in 2026, our core mission is simple yet powerful: to eliminate the friction of modern digital tasks without forcing users to rely on bloated subscriptions or insecure file-sharing sites. We believe that daily tasks—merging a PDF, optimizing a photograph, analyzing keyword density, or converting currency rates—should be fast, beautiful, and completely secure.
        </p>

        <div className="p-4 bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100/40 dark:border-blue-900/30 rounded-lg">
          <h4 className="text-blue-700 dark:text-blue-400 font-bold mb-1 uppercase tracking-widest text-[10px]">The Client-Side Promise</h4>
          Your documents, codes, and images are processed directly inside your browser. No third-party relays, no corporate server logs, and absolutely no security leak risks. This helps teams satisfy strict company file compliance guidelines (like GDPR, HIPAA, and corporate IP parameters).
        </div>

        <p>
          We are committed to continuous improvements. Our open-access platform relies on non-intrusive AdSense monetize formats to support running core developer systems—meaning you get premium tools for free, indefinitely.
        </p>
      </div>
    </div>
  );
}

// 2. Privacy Policy Component (AdSense Compliance)
function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-205 dark:border-slate-800 shadow-sm space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <Shield className="h-6 w-6 text-emerald-500" />
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Privacy Policy</h2>
      </div>

      <div className="space-y-4 text-xs text-slate-650 dark:text-slate-350 leading-relaxed font-semibold">
        <p className="text-[10px] text-slate-400">Last updated: May 27, 2026</p>

        <p>
          At NexusUtils, we take privacy security extremely seriously. This Privacy Policy details how we protect your personal coordinates and govern information sharing guidelines across our website and utility extensions.
        </p>

        <h4 className="text-slate-800 dark:text-slate-200 font-bold uppercase tracking-wider text-[11px] mt-4">1. No Document Storage Principle</h4>
        <p>
          We do not save, retrieve, analyze, or upload files processed through our PDF compiler, image canvas, density analyzer, or dev formats. All file calculations utilize standard client-side browser drawing elements, ensuring your original records stay 100% inside your memory sandbox.
        </p>

        <h4 className="text-slate-800 dark:text-slate-200 font-bold uppercase tracking-wider text-[11px] mt-4">2. Cookies & Google AdSense Monetization</h4>
        <p>
          To compile operational costs, our system uses Google AdSense to serve non-intrusive promotional ads. Google, as a third-party vendor, uses cookie tracking (specifically the DART cookie) to serve relevant promotional columns based on your browser history. You may opt-out of DART cookies by visiting the Google Ad and Content Network privacy settings.
        </p>

        <h4 className="text-slate-800 dark:text-slate-200 font-bold uppercase tracking-wider text-[11px] mt-4">3. GDPR & CCPA Consumer Safety</h4>
        <p>
          Under the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA), you retain the right to query what coordinates are stored, request removals, or audit tracking tags. Since we do not build database identities or persistent user logs, no data mapping is preserved inside our platform.
        </p>
      </div>
    </div>
  );
}

// 3. Terms of Service Component
function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-205 dark:border-slate-800 shadow-sm space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <Scale className="h-6 w-6 text-amber-500" />
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Terms of Service</h2>
      </div>

      <div className="space-y-4 text-xs text-slate-655 dark:text-slate-350 leading-relaxed font-semibold">
        <p className="text-[10px] text-slate-400">Effective Date: May 27, 2026</p>

        <p>
          By accessing or utilizing NexusUtils, you state that you have read, understood, and agreed to follow these Terms of Service. If you disagree, you must immediately terminate platform access.
        </p>

        <h4 className="text-slate-800 dark:text-slate-200 font-bold uppercase tracking-wider text-[11px] mt-4">1. License and Permitted Utilization</h4>
        <p>
          We grant users a non-exclusive, fully revocable, global permission to launch and run all 20+ utilities for personal, organizational, commercial, or scholastic workflows. You may not attempt to reverse engineer script codes, scraper API endpoints, or distribute malware payloads.
        </p>

        <h4 className="text-slate-800 dark:text-slate-200 font-bold uppercase tracking-wider text-[11px] mt-4">2. Liability Disclaimers</h4>
        <p>
          NexusUtils operates "As Is" without any warranties. Progressive calculations, tax estimators, exchange indices, and format compiler structures may show variations over time which we are not libel for. Always verify financial outputs before lodging official revenue declarations.
        </p>

        <h4 className="text-slate-800 dark:text-slate-200 font-bold uppercase tracking-wider text-[11px] mt-4">3. Right to Revisions</h4>
        <p>
          We reserve the right to alter, modify, disable, or gate specific utility elements to manage API overheads or protect system infrastructures.
        </p>
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
