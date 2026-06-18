/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UserComment } from '../types';
import { MessageSquare, ThumbsUp, Send, Sparkles } from 'lucide-react';

const INITIAL_COMMENTS: UserComment[] = [
  {
    id: 'c1',
    author: 'أحمد اليوسف',
    avatarColor: 'bg-emerald-600',
    content: 'أداء مشرف وخيالي لأسود الأطلس اليوم، الفوز على الأرجنتين ليست مصادفة بل هو تتويج لتخطيط تكتيكي رائع وعزيمة لا تلين. بالتوفيق لكل منتخباتنا العربية 🇲🇦🇸🇦🇪🇬',
    timestamp: 'منذ 45 دقيقة',
    likes: 34
  },
  {
    id: 'c2',
    author: 'يسر تونسية',
    avatarColor: 'bg-red-500',
    content: 'إن شاء الله نسور قرطاج يفاجئون البرازيل الليلة. المباراة صعبة وصعبة جداً لكن في كرة القدم لا يوجد مستحيل بالروح القتالية والتركيز طوال التسعين دقيقة 🇹🇳💪',
    timestamp: 'منذ ساعتين',
    likes: 19
  },
  {
    id: 'c3',
    author: 'كريم خالد',
    avatarColor: 'bg-blue-600',
    content: 'سالم الدوسري يثبت مرة أخرى أنه رجل المناسبات الكبرى في مونديالات كأس العالم. هدف مارادوني رائع في شباك الألمان وجدار دفاعي حديدي، إن شاء الله صدارة المجموعة للأخضر 🇸🇦⚽',
    timestamp: 'منذ 3 ساعات',
    likes: 45
  }
];
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export default function FanZone() {
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  // Poll States
  const [voted, setVoted] = useState(false);
  const [pollVotes, setPollVotes] = useState<Record<string, number>>({
    'morocco': 342,
    'argentina': 210,
    'brazil': 185,
    'saudi': 142,
    'france': 115,
    'others': 65
  });

  // Comments States
  const [comments, setComments] = useState<UserComment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [selectedAvatarColor, setSelectedAvatarColor] = useState('bg-blue-600');

  useEffect(() => {
    // Load comments from localStorage or initialize with built-in data
    const saved = localStorage.getItem('msn_worldcup_comments');
    if (saved) {
      try {
        setComments(JSON.parse(saved));
      } catch (e) {
        setComments(INITIAL_COMMENTS);
      }
    } else {
      setComments(INITIAL_COMMENTS);
    }

    // Load poll state
    const pollSaved = localStorage.getItem('msn_worldcup_voted');
    if (pollSaved === 'true') {
      setVoted(true);
    }
  }, []);

  const saveCommentsToStorage = (newComments: UserComment[]) => {
    setComments(newComments);
    localStorage.setItem('msn_worldcup_comments', JSON.stringify(newComments));
  };

  const handleVote = (option: string) => {
    if (voted) return;
    const updated = {
      ...pollVotes,
      [option]: pollVotes[option] + 1
    };
    setPollVotes(updated);
    setVoted(true);
    localStorage.setItem('msn_worldcup_voted', 'true');
    localStorage.setItem('msn_worldcup_poll_data', JSON.stringify(updated));
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const fallbackAuthor = isEn ? 'Anonymous Fan' : 'مشجع مجهول';
    const timestampLabel = isEn ? 'Seconds ago' : 'منذ ثوانٍ';

    const newComment: UserComment = {
      id: `comm-${Date.now()}`,
      author: authorName.trim() || fallbackAuthor,
      avatarColor: selectedAvatarColor,
      content: commentText.trim(),
      timestamp: timestampLabel,
      likes: 0
    };

    const updated = [newComment, ...comments];
    saveCommentsToStorage(updated);
    setCommentText('');
    setAuthorName('');
  };

  const handleLikeComment = (commentId: string) => {
    const updated = comments.map(c => {
      if (c.id === commentId) {
        return { ...c, likes: c.likes + 1 };
      }
      return c;
    });
    saveCommentsToStorage(updated);
  };

  const totalVotes = (Object.values(pollVotes) as number[]).reduce((a, b) => a + b, 0);

  const getPercent = (votes: number) => {
    return totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
  };

  const colors = [
    { name: 'emerald', bg: 'bg-emerald-600' },
    { name: 'blue', bg: 'bg-blue-600' },
    { name: 'red', bg: 'bg-red-500' },
    { name: 'purple', bg: 'bg-purple-600' },
    { name: 'orange', bg: 'bg-orange-500' }
  ];

  return (
    <div className="w-full py-2" id="msn-sports-fan-interactive-zone">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Real-time Poll Card */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs sticky top-24">
            <h3 className={`text-base font-black text-gray-950 flex items-center gap-1.5 border-b border-gray-100 pb-3 mb-4 ${isEn ? 'flex-row' : 'flex-row-reverse'}`}>
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>{isEn ? "Live Fans Poll" : "استطلاع المشجعين المباشر"}</span>
            </h3>

            <p className={`text-xs font-black text-gray-800 leading-snug mb-4 ${isEn ? 'text-left' : 'text-right'}`}>
              {isEn ? "Which national team do you expect to win the FIFA 2026 World Cup Gold?" : "أي من المنتخبات التالية تتوقع أن يُكلّل بالذهب ويصعد منصة تتويج كأس العالم FIFA 2026؟"}
            </p>

            <div className="flex flex-col gap-3">
              <AnimatePresence>
                {[
                  { id: 'morocco', label: isEn ? 'Morocco 🇲🇦' : 'المغرب 🇲🇦', color: 'bg-red-600' },
                  { id: 'saudi', label: isEn ? 'Saudi Arabia 🇸🇦' : 'السعودية 🇸🇦', color: 'bg-emerald-600' },
                  { id: 'argentina', label: isEn ? 'Argentina 🇦🇷' : 'الأرجنتين 🇦🇷', color: 'bg-sky-400' },
                  { id: 'brazil', label: isEn ? 'Brazil 🇧🇷' : 'البرازيل 🇧🇷', color: 'bg-yellow-500' },
                  { id: 'france', label: isEn ? 'France 🇫🇷' : 'فرنسا 🇫🇷', color: 'bg-blue-800' },
                  { id: 'others', label: isEn ? 'Other Teams ❓' : 'منتخبات أخرى ❓', color: 'bg-slate-500' }
                ].map((opt) => {
                  const votes = pollVotes[opt.id];
                  const percent = getPercent(votes);
                  return (
                    <div key={opt.id} className="relative">
                      {!voted ? (
                        <button
                          onClick={() => handleVote(opt.id)}
                          className={`w-full p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50/5 text-xs font-extrabold text-gray-700 hover:text-blue-600 transition-all focus:outline-hidden cursor-pointer ${isEn ? 'text-left' : 'text-right'}`}
                        >
                          {opt.label}
                        </button>
                      ) : (
                        <div className="p-3 border border-gray-100 bg-gray-50/40 rounded-lg overflow-hidden relative">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percent}%` }}
                            transition={{ duration: 0.6 }}
                            className={`absolute top-0 bottom-0 opacity-12 ${opt.color} ${isEn ? 'left-0' : 'right-0'}`}
                          ></motion.div>
                          <div className={`flex justify-between items-center text-xs font-black text-gray-800 relative z-10 ${isEn ? 'flex-row' : ''}`}>
                            <span>{opt.label}</span>
                            <span className="font-mono text-blue-600 font-black">{percent}%</span>
                          </div>
                          <div className="w-full h-1 bg-gray-100 rounded-full mt-1.5 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${percent}%` }}
                              className={`h-full ${opt.color}`}
                            ></motion.div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </AnimatePresence>
            </div>

            {voted && (
              <div className="mt-4 text-center">
                <span className="text-[10px] text-gray-400 font-bold">
                  {isEn ? `Total: ${totalVotes.toLocaleString()} votes casted successfully!` : `إجمالي الأصوات المدونة: ${totalVotes.toLocaleString()} مشجع صوتوا بنجاح!`}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Dynamic Comment Forum Board */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-xs">
            <h3 className={`text-base font-black text-gray-950 flex items-center gap-2 border-b border-gray-100 pb-3 mb-4 ${isEn ? 'flex-row' : 'flex-row-reverse'}`}>
              <MessageSquare className="w-5 h-5 text-blue-500" />
              <span>{isEn ? "Fans Free Discussion Forum" : "منتدى نقاشات المشجعين الحرة والتعليقات"}</span>
              <span className="text-xs bg-gray-100 text-gray-500 font-extrabold px-2 py-0.5 rounded-full">
                {comments.length} {isEn ? "comments" : "تعليق"}
              </span>
            </h3>

            {/* Form */}
            <form onSubmit={handleAddComment} className="bg-slate-50 p-4 border border-gray-200 rounded-xl mb-6 flex flex-col gap-3">
              <div className={`flex flex-col sm:flex-row gap-3 ${isEn ? 'flex-row' : 'flex-row-reverse'}`}>
                {/* Author Name Input */}
                <input
                  type="text"
                  placeholder={isEn ? "Your Name (e.g., Sami Expert)..." : "اسمك الكريم (مثال: أحمد الرياضي)..."}
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className={`bg-white text-xs font-extrabold text-gray-900 border border-gray-300 rounded-lg px-3.5 py-2.5 flex-1 focus:ring-1 focus:ring-blue-600 focus:outline-hidden focus:border-blue-600 ${isEn ? 'text-left' : 'text-right'}`}
                  maxLength={30}
                />

                {/* Avatar Color selector */}
                <div className={`flex items-center gap-2 self-center bg-white p-2 border border-gray-300 rounded-lg shrink-0 ${isEn ? 'flex-row' : 'flex-row-reverse'}`}>
                  <span className="text-[10px] text-gray-500 font-extrabold">{isEn ? "Color:" : "اللون:"}</span>
                  <div className="flex gap-1.5">
                    {colors.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setSelectedAvatarColor(c.bg)}
                        className={`w-4 h-4 rounded-full transition-all ${c.bg} ${
                          selectedAvatarColor === c.bg ? 'ring-2 ring-offset-2 ring-gray-950 scale-110' : 'opacity-80'
                        }`}
                      ></button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Text Area */}
              <div className="relative">
                <textarea
                  placeholder={isEn ? "Write your predictions, messages or cheers for the national squads here..." : "اكتب رسالتك وتوقعاتك لأسود الأطلس أو المنتخبات العربية الأخرى هنا وصوتك يصل للجميع..."}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className={`w-full bg-white text-xs text-gray-800 border border-gray-300 rounded-lg px-3.5 py-2.5 h-20 resize-none focus:ring-1 focus:ring-blue-600 focus:outline-hidden focus:border-blue-600 placeholder-gray-400 ${isEn ? 'text-left' : 'text-right'}`}
                  maxLength={300}
                  required
                ></textarea>
                <span className={`absolute bottom-1.5 text-[9px] text-gray-400 font-mono ${isEn ? 'right-2.5' : 'left-2.5'}`}>
                  {300 - commentText.length} {isEn ? "chars left" : "حرف متبقي"}
                </span>
              </div>

              <button
                type="submit"
                className={`bg-blue-600 text-white text-xs font-bold px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-xs hover:shadow-md ${isEn ? 'self-end' : 'self-start'}`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isEn ? "Send Comment Now" : "إرسال التعليق الآن"}</span>
              </button>
            </form>

            {/* Comments List */}
            <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-1">
              <AnimatePresence initial={false}>
                {comments.length === 0 ? (
                  <p className="text-xs text-center py-8 text-gray-400 font-medium">
                    {isEn ? "Be the first to share your thoughts in the tournament discussion!" : "كن أول من يكتب وينير النقاش المونديالي!"}
                  </p>
                ) : (
                  comments.map((comm) => (
                    <motion.div
                      key={comm.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`bg-white border-b border-gray-100 flex gap-3 pb-4 ${isEn ? 'flex-row' : 'flex-row-reverse'}`}
                    >
                      {/* Avatar */}
                      <div className={`w-9 h-9 rounded-full ${comm.avatarColor} text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-inner`}>
                        {comm.author.substring(0, 2)}
                      </div>

                      {/* Content panel */}
                      <div className="flex-1">
                        <div className={`flex items-center justify-between gap-2 mb-1 ${isEn ? 'flex-row' : 'flex-row-reverse'}`}>
                          <span className="text-xs font-black text-gray-900">{comm.author}</span>
                          <span className="text-[10px] text-gray-400 font-semibold">{t(comm.timestamp)}</span>
                        </div>
                        <p className={`text-xs text-gray-700 leading-relaxed font-medium ${isEn ? 'text-left' : 'text-right'}`}>
                          {comm.content}
                        </p>

                        <div className={`flex items-center gap-4 mt-2 ${isEn ? 'justify-start' : 'justify-end'}`}>
                          <button
                            type="button"
                            onClick={() => handleLikeComment(comm.id)}
                            className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-blue-600 transition-colors font-bold cursor-pointer"
                          >
                            <ThumbsUp className="w-3 h-3" />
                            <span>{comm.likes} {isEn ? "Agree" : "تأييد"}</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
