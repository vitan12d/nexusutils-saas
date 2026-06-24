import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { submitFeedback } from '../lib/firebase';
import { X, CheckCircle, Send, MessageSquare, AlertTriangle, ShieldCheck } from 'lucide-react';

interface FeedbackModalProps {
  onClose: () => void;
}

export default function FeedbackModal({ onClose }: FeedbackModalProps) {
  const { user } = useAuth();
  const [type, setType] = useState<'suggestion' | 'issue' | 'feedback'>('feedback');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle auto-population update if auth changes
  useState(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSuccess(false);
    setErrorMsg('');

    try {
      if (!message.trim()) {
        throw new Error('Message content is required.');
      }
      if (!email.trim() || !email.includes('@')) {
        throw new Error('A valid email address is required.');
      }

      await submitFeedback({
        userId: user?.uid || null,
        userEmail: email.trim(),
        type,
        subject: subject.trim() || `No Subject (${type})`,
        message: message.trim()
      });

      setSuccess(true);
      setSubject('');
      setMessage('');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to submit feedback. Check database rules.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full relative overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Progress bar style decoration */}
        <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-indigo-600" />

        {/* Modal Header */}
        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-150 dark:border-white/5 bg-slate-50/50 dark:bg-slate-950/10">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-indigo-500 shrink-0" />
            <h3 className="text-md font-bold text-slate-905 dark:text-slate-100 uppercase tracking-wide">
              Submit Feedback Hub
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form area */}
        {success ? (
          <div className="p-8 text-center space-y-4 font-sans flex-1 flex flex-col justify-center items-center">
            <div className="p-3 bg-green-500/10 text-green-500 rounded-full max-w-fit">
              <CheckCircle className="h-10 w-10 shrink-0" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">Submission Logged Successfully!</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
              Thank you for contributing to NexusUtils. Your reports and suggestion indexes are logged securely in our feedback repository.
            </p>
            <div className="pt-2 w-full max-w-xs">
              <button
                onClick={() => {
                  setSuccess(false);
                  onClose();
                }}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-705 text-slate-805 dark:text-slate-100 font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1 font-sans">
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              We appreciate all suggestions, bug reports, and general feedback. Your input helps us make NexusUtils the best serverless utility portal on the web.
            </p>

            {/* Feedback Categories Grid */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">
                Category
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['feedback', 'suggestion', 'issue'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className={`p-2 font-bold text-xs border rounded-xl hover:border-slate-350 dark:hover:border-slate-700 transition capitalize ${
                      type === t
                        ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-400'
                        : 'border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 text-slate-650 dark:text-slate-350'
                    }`}
                  >
                    {t === 'issue' ? 'Bug Report' : t}
                  </button>
                ))}
              </div>
            </div>

            {/* User Email Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">
                Your Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full h-9.5 px-3.5 bg-slate-50 dark:bg-slate-950/25 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold outline-none focus:border-indigo-500 text-slate-800 dark:text-slate-100 transition"
                required
              />
            </div>

            {/* Subject Area */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-extrabold text-slate-400 dark:text-slate-400 uppercase tracking-wider pl-1">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief summary..."
                maxLength={100}
                className="w-full h-9.5 px-3.5 bg-slate-50 dark:bg-slate-950/25 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold outline-none focus:border-indigo-500 text-slate-800 dark:text-slate-100 transition"
                required
              />
            </div>

            {/* Message Area */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-extrabold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                  Detailed Explanation
                </label>
                <span className="text-[9px] bento-mono font-bold text-slate-400">
                  {message.length} / 5000 chars
                </span>
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, 5000))}
                placeholder="Describe your suggestion, the bug you encountered, or general thoughts in detail..."
                rows={5}
                className="w-full py-2.5 px-3.5 bg-slate-50 dark:bg-slate-950/25 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold outline-none focus:border-indigo-500 text-slate-800 dark:text-slate-100 transition resize-none leading-relaxed"
                required
              />
            </div>

            {/* Security Notice */}
            <div className="p-2.5 bg-slate-50 dark:bg-slate-950/20 border border-slate-200/40 dark:border-slate-850 rounded-xl flex items-center gap-2 text-[10px] text-slate-450 dark:text-slate-500">
              <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>Feedback is transmitted over SSL and stored securely.</span>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-650 dark:text-red-400 text-xs font-bold flex items-start gap-2 leading-relaxed animate-fade-in">
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                <span className="whitespace-pre-wrap">{errorMsg}</span>
              </div>
            )}

            {/* Dialog Action Buttons */}
            <div className="flex gap-3 pt-3 border-t border-slate-100 dark:border-white/5">
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-705 text-slate-805 dark:text-slate-100 font-bold rounded-xl text-xs transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={sending}
                className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs shadow-xs transition flex items-center justify-center gap-2 cursor-pointer disabled:bg-slate-350"
              >
                {sending ? 'Submitting...' : (
                  <>
                    <Send className="h-4 w-4" />
                    Submit Feedback
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
