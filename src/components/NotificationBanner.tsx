import React, { useState, useEffect } from 'react';
import { Bell, BellRing, Check, ShieldAlert, Sparkles } from 'lucide-react';

export default function NotificationBanner() {
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>('default');
  const [isRegistering, setIsRegistering] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Read initial permission if supported
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermissionStatus(Notification.permission);
    }
  }, []);

  const handleEnableAlerts = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      setSuccessMsg('Notifications are not supported in your browser/iframe sandbox.');
      return;
    }

    setIsRegistering(true);
    try {
      const permission = await Notification.requestPermission();
      setPermissionStatus(permission);

      if (permission === 'granted') {
        // Safe register of Service Worker
        if ('serviceWorker' in navigator) {
          const reg = await navigator.serviceWorker.register('/service-worker.js');
          console.log('Push SW registered successfully:', reg.scope);
        }
        setSuccessMsg('Live Goal Alerts Enabled! 🎯');
        setTimeout(() => setSuccessMsg(null), 4000);
      } else if (permission === 'denied') {
        setSuccessMsg('Permission was denied. Please allow notifications in browser site settings.');
        setTimeout(() => setSuccessMsg(null), 5000);
      }
    } catch (err: any) {
      console.error('Notification setup failed:', err);
      // Fallback state if iframe permissions block it
      setSuccessMsg('Permission requested! (Sandbox environment limits may apply)');
      setTimeout(() => setSuccessMsg(null), 4000);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-950/80 via-slate-900/90 to-slate-950 border border-indigo-500/10 rounded-xl p-4 shadow-xl text-left relative overflow-hidden group">
      {/* Dynamic Glow decoration in corner */}
      <div className="absolute -top-12 -right-12 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/15 transition-all duration-500" />
      <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-indigo-500/5 rounded-full blur-2xl font-mono" />

      <div className="flex items-start gap-3">
        <div className="p-2 bg-indigo-505/10 bg-slate-950 border border-slate-800 rounded-lg shrink-0 mt-0.5 relative">
          {permissionStatus === 'granted' ? (
            <BellRing className="w-4 h-4 text-emerald-400 animate-pulse" />
          ) : (
            <Bell className="w-4 h-4 text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
          )}
          {permissionStatus === 'granted' && (
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          )}
        </div>

        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-1.5">
            <h4 className="font-extrabold text-xs text-slate-100 uppercase tracking-widest font-mono">
              Live Goal Alerts
            </h4>
            <span className="text-[9px] font-black uppercase text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded flex items-center gap-0.5 tracking-wider font-mono">
              <Sparkles className="w-2.5 h-2.5" /> FREE TIER
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Get instant desktop and mobile push sounds whenever a dynamic goal, VAR decision, or final whistle occurs. Powered by OneSignal integrations.
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="mt-3.5 flex items-center gap-1.5 p-2 rounded text-[10px] font-mono leading-relaxed bg-slate-950 border border-slate-850 text-indigo-300 animate-fadeIn">
          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          {successMsg}
        </div>
      )}

      <div className="mt-4 pt-3.5 border-t border-slate-900 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {permissionStatus === 'granted' ? (
          <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            LIVE PUSH CHANNELS ACTIVE
          </div>
        ) : permissionStatus === 'denied' ? (
          <div className="flex items-center gap-1.5 text-[10px] text-rose-400 font-mono">
            <ShieldAlert className="w-3.5 h-3.5" />
            BLOCKED IN BROWSER
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono font-medium">
            Waiting for subscription setup
          </div>
        )}

        <button
          onClick={handleEnableAlerts}
          disabled={isRegistering || permissionStatus === 'granted'}
          className={`px-3 py-1.5 rounded text-[11px] font-bold font-mono tracking-wider transition-all duration-200 cursor-pointer text-center ${
            permissionStatus === 'granted'
              ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/20 cursor-not-allowed'
              : 'bg-indigo-500 hover:bg-indigo-400 text-slate-950 hover:shadow-lg'
          }`}
        >
          {isRegistering ? 'Registering...' : permissionStatus === 'granted' ? 'Alerts On ✓' : 'Subscribe 🔔'}
        </button>
      </div>
    </div>
  );
}
