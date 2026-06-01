import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export interface FAQItem {
  q: string;
  a: string;
}

interface ToolFAQProps {
  faqs: FAQItem[];
  toolName: string;
}

export default function ToolFAQ({ faqs, toolName }: ToolFAQProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="p-6 sm:p-10 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-3xs space-y-6">
      {/* Title Segment */}
      <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-850 pb-4 text-left">
        <HelpCircle className="h-6 w-6 text-blue-500 shrink-0" />
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            Frequently Asked Questions • الأسئلة الشائعة حول {toolName}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5 font-bold">
            Transparent answers regarding the technical performance, file security, and offline operations of {toolName}.
          </p>
        </div>
      </div>

      {/* Interactive Accordion elements */}
      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = activeFaq === idx;
          return (
            <div
              key={idx}
              className="border border-slate-150 dark:border-slate-800/80 rounded-2xl overflow-hidden bg-slate-50/40 dark:bg-slate-950/20 hover:border-slate-300 dark:hover:border-slate-700 transition duration-150"
            >
              <button
                onClick={() => setActiveFaq(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-5 bg-transparent text-left cursor-pointer hover:text-blue-500 font-extrabold text-sm sm:text-base text-slate-850 dark:text-slate-100 gap-4"
              >
                <span className="font-sans font-extrabold leading-snug">{faq.q}</span>
                <ChevronDown
                  className={`h-4 w-4 text-slate-400 shrink-0 transform transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-blue-500' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="p-5 bg-white dark:bg-slate-900 border-t border-slate-150 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-350 leading-relaxed font-normal text-left animate-fade-in select-text">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
