import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, CheckCircle, Sparkles, User, Mail, Save, Image, LogOut } from 'lucide-react';

interface UserProfileModalProps {
  onClose: () => void;
}

export default function UserProfileModal({ onClose }: UserProfileModalProps) {
  const { user, profile, logout, updateProfile } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [premiumTier, setPremiumTier] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Hydrate fields from user profile on load
  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName || '');
      setPhotoURL(profile.photoURL || '');
      setPremiumTier(profile.premiumTier || false);
    } else if (user) {
      setDisplayName(user.displayName || '');
      setPhotoURL(user.photoURL || '');
    }
  }, [profile, user]);

  if (!user) {
    return (
      <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-xl">
          <X className="h-10 w-10 text-red-500 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Authentication Required</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Please sign in to view and manager your profile preferences.</p>
          <button onClick={onClose} className="w-full py-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold text-xs rounded-xl hover:bg-slate-300 dark:hover:bg-slate-700 transition">Close</button>
        </div>
      </div>
    );
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setErrorMsg('');

    try {
      if (!displayName.trim()) {
        throw new Error("Display Name is required.");
      }
      await updateProfile({
        displayName: displayName.trim(),
        photoURL: photoURL.trim(),
        premiumTier: premiumTier
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'An error occurred while saving profile settings.');
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      onClose();
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full relative overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Banner with style accent */}
        <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600" />

        {/* Modal Header */}
        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-150 dark:border-white/5 bg-slate-50/50 dark:bg-slate-950/10">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-500 shrink-0" />
            <h3 className="text-md font-bold text-slate-905 dark:text-slate-100 uppercase tracking-wide">
              Manage Profile Settings
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Form Scroll Area */}
        <form onSubmit={handleSave} className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1 font-sans">
          
          {/* Avatar and Email Area */}
          <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-950/30 p-3.5 border border-slate-200/50 dark:border-white/5 rounded-xl">
            <div className="h-14 w-14 rounded-full bg-blue-100 dark:bg-slate-850 flex items-center justify-center overflow-hidden shrink-0 border-2 border-blue-500/20 shadow-xs">
              {photoURL ? (
                <img src={photoURL} alt="Profile" className="h-full w-full object-cover" onError={(e) => {
                  (e.target as HTMLImageElement).src = '';
                }} />
              ) : (
                <User className="h-7 w-7 text-blue-500" />
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">{displayName || 'Nexus User'}</p>
              <div className="flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 truncate uppercase bento-mono font-bold">
                <Mail className="h-3 w-3 shrink-0" />
                <span className="truncate">{user.email}</span>
              </div>
            </div>
          </div>

          {/* Form Fields inside bento grid styling block */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1 flex items-center gap-1">
                <span>Display Name</span>
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter display name..."
                maxLength={40}
                className="w-full h-9.5 px-3.5 bg-slate-50 dark:bg-slate-950/25 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold outline-none focus:border-blue-500 text-slate-800 dark:text-slate-100 transition"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1 flex items-center gap-1">
                <Image className="h-3 w-3 inline text-slate-400" />
                <span>Avatar Image URL (Optional)</span>
              </label>
              <input
                type="url"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="https://images.unsplash.com/... or similar"
                className="w-full h-9.5 px-3.5 bg-slate-50 dark:bg-slate-950/25 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold outline-none focus:border-blue-500 text-slate-800 dark:text-slate-100 transition"
              />
            </div>
          </div>

          {/* Premium Tier Toggle / Subscription Controls */}
          <div className="p-4 bg-indigo-500/5 dark:bg-indigo-950/10 border border-indigo-500/15 dark:border-indigo-500/10 rounded-xl space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-gradient-to-tr from-indigo-500 to-blue-500 text-white rounded-lg">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Unlock Nexus Premium</h4>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-normal">Bypass client restrictions (Up to 500MB sizing)</p>
                </div>
              </div>

              {/* Pretty Switch Toggle Button */}
              <button
                type="button"
                onClick={() => setPremiumTier(!premiumTier)}
                className={`relative inline-flex h-5.5 w-10.5 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
                  premiumTier ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-800'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    premiumTier ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            
            {premiumTier && (
              <div className="text-[10px] bg-indigo-500/10 dark:bg-indigo-900/10 text-indigo-700 dark:text-indigo-400 py-1.5 px-2.5 rounded-lg font-bold border border-indigo-500/10 animate-pulse">
                ★ Groundwork Active — Premium privileges loaded!
              </div>
            )}
          </div>

          {/* Alerts Area */}
          {success && (
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-700 dark:text-green-400 flex items-center gap-2 text-xs font-bold animate-fade-in">
              <CheckCircle className="h-4 w-4 shrink-0" />
              <span>Profile preferences successfully updated!</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-650 dark:text-red-400 text-xs font-bold leading-relaxed whitespace-pre-wrap animate-fade-in">
              {errorMsg}
            </div>
          )}

          {/* Dialog Action Buttons */}
          <div className="flex gap-3 pt-3 border-t border-slate-100 dark:border-white/5">
            <button
              type="button"
              onClick={handleSignOut}
              className="py-2.5 px-3 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-900/10 text-red-600 dark:text-red-400 font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>

            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs shadow-xs transition flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:dark:bg-slate-805 cursor-pointer"
            >
              {saving ? 'Saving...' : (
                <>
                  <Save className="h-4 w-4" />
                  Save Settings
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
