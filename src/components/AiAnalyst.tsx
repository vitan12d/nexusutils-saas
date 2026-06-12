/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Match } from '../types';
import { Zap, Bot, Send, Brain, User, AlertCircle, Quote } from 'lucide-react';

interface AiAnalystProps {
  selectedMatch?: Match;
}

const PRESET_PROMPTS = [
  'ما هو تحليلك الفني والتكتيكي لمباراة الهلال والنصر اليوم؟',
  'من هو النادي المرشح للفوز بدوري أبطال أوروبا ومواجهة ريال مدريد؟',
  'أعطني إحصائيات مواجهات ديربي القاهرة بين الأهلي والزمالك؟',
  'هل يستطيع محمد صلاح الفوز بلقب هداف الدوري الإنجليزي هذا الموسم؟'
];

export default function AiAnalyst({ selectedMatch }: AiAnalystProps) {
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    {
      role: 'model',
      text: 'مرحباً بك في الاستوديو التحليلي الذكي لكووورة لايف! أنا المحلل التكتيكي الرياضي المدعوم بالذكاء الاصطناعي من جوجل. اسألني عن نتائج وتشكيلات وتحليلات الفرق الآن.'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorText, setErrorText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (promptToSend: string) => {
    if (!promptToSend.trim() || isGenerating) return;

    // Append user message
    setMessages((prev) => [...prev, { role: 'user', text: promptToSend }]);
    setInputText('');
    setIsGenerating(true);
    setErrorText('');

    try {
      const resp = await fetch('/api/ask-gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptToSend,
          matchContext: selectedMatch,
        }),
      });

      const data = await resp.json();
      if (resp.ok && data.success) {
        setMessages((prev) => [...prev, { role: 'model', text: data.answer }]);
      } else {
        throw new Error(data.error || 'عذراً، تعذر تحليل الإجابة حالياً.');
      }
    } catch (err: any) {
      console.error(err);
      setErrorText(err.message || 'حدث خطأ في الاتصال بخادم التحليل الفني.');
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: 'لم أتمكن من إتمام التحليل الفني حالياً. يرجى تفعيل مفتاح GEMINI_API_KEY أو التحقق من الاتصال بالإنترنت التكتيكي.'
        }
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded p-4 text-white font-sans text-right space-y-4" dir="rtl">
      {/* Header Panel */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-yellow-500 rounded text-slate-950 animate-pulse">
            <Brain className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-yellow-400">الاستوديو التكتيكي الذكي</h3>
            <p className="text-[10px] text-gray-400 mt-0.5">حلل وتوقع مجريات المباراة حياً بأحدث طراز ذكي</p>
          </div>
        </div>
        {selectedMatch && (
          <span className="text-[10px] bg-slate-800 px-2.5 py-1 rounded text-gray-300 font-bold">
            مباراة محددة: {selectedMatch.homeTeam} × {selectedMatch.awayTeam}
          </span>
        )}
      </div>

      {/* Messages layout */}
      <div className="h-64 overflow-y-auto space-y-3 p-2 bg-slate-950/70 rounded border border-slate-800/60 flex flex-col scrollbar-thin">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex gap-2 max-w-[85%] rounded p-2.5 text-xs ${
              m.role === 'user'
                ? 'bg-yellow-500 text-blue-950 font-bold self-start rounded-tl-none mr-auto'
                : 'bg-slate-800 text-gray-100 self-end rounded-tr-none ml-auto'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {m.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5 text-yellow-400" />}
            </div>
            <div className="space-y-1">
              <p className="font-bold opacity-70 text-[9px]">
                {m.role === 'user' ? 'المشجع الرياضي' : 'محلل كووورة الذكي'}
              </p>
              <p className="whitespace-pre-wrap leading-relaxed font-sans">{m.text}</p>
            </div>
          </div>
        ))}
        {isGenerating && (
          <div className="bg-slate-800 text-gray-200 self-end rounded-tr-none p-2.5 rounded text-xs ml-auto flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-yellow-400 animate-spin" />
            <span>جاري دراسة البيانات الفنية والتكتيكية للمواجهة...</span>
          </div>
        )}
        {errorText && (
          <div className="bg-red-950/40 border border-red-900 text-red-400 p-2.5 rounded text-[11px] self-start flex items-center gap-1.5 mr-auto">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errorText}</span>
          </div>
        )}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Presets suggestions tags */}
      <div className="space-y-1.5">
        <p className="text-[10px] text-gray-400 font-bold">💡 اقتراحات تكتيكية شائعة لتبدأ السؤال بنقرة واحدة:</p>
        <div className="flex flex-wrap gap-1.5">
          {PRESET_PROMPTS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p)}
              disabled={isGenerating}
              className="py-1 px-2.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-950 transition text-[10px] text-slate-300 hover:text-white rounded border border-slate-700/60 cursor-pointer text-right line-clamp-1 max-w-full"
            >
              # {p}
            </button>
          ))}
        </div>
      </div>

      {/* Form Input chat */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (inputText.trim()) handleSendMessage(inputText);
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={selectedMatch ? `اسأل عن خطة وتوقع ${selectedMatch.homeTeam} ضد ${selectedMatch.awayTeam}...` : 'اطرح سؤالك التكتيكي عن أي مباراة أو دوري...'}
          className="flex-1 bg-slate-950 border border-slate-800 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-yellow-400 text-right text-gray-100"
          disabled={isGenerating}
        />
        <button
          type="submit"
          disabled={isGenerating}
          className="bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold px-4 py-2 rounded text-xs transition cursor-pointer flex items-center gap-1 shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
          <span>إرسال</span>
        </button>
      </form>
    </div>
  );
}
