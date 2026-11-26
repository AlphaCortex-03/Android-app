import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Download, Eye, LogIn, LogOut, Music, Trash2, UserCheck, Volume2, X } from 'lucide-react';
import type { GameSettings } from '../types/game';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useFirebaseAuth } from '../context/FirebaseProvider';

interface ParentGateModalProps {
  settings: GameSettings;
  onUpdateSettings: (patch: Partial<GameSettings>) => void;
  onResetProgress: () => void;
  onClose: () => void;
}

export const ParentGateModal: React.FC<ParentGateModalProps> = ({
  settings,
  onUpdateSettings,
  onResetProgress,
  onClose,
}) => {
  const [unlocked, setUnlocked] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [mathAnswer, setMathAnswer] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);
  const holdTimerRef = useRef<number | null>(null);

  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const { user, authReady, authBusy, authError, signInWithGoogle, logout } = useFirebaseAuth();

  const challenge = useMemo(() => {
    const a = 3 + Math.floor(Math.random() * 5);
    const b = 2 + Math.floor(Math.random() * 6);
    return { a, b, sum: a + b };
  }, []);

  useEffect(() => {
    return () => {
      if (holdTimerRef.current !== null) {
        window.clearInterval(holdTimerRef.current);
      }
    };
  }, []);

  const startHold = () => {
    if (holdTimerRef.current !== null) return;
    const start = Date.now();
    holdTimerRef.current = window.setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / 3000) * 100);
      setHoldProgress(pct);
      if (pct >= 100) {
        if (holdTimerRef.current !== null) {
          window.clearInterval(holdTimerRef.current);
          holdTimerRef.current = null;
        }
        setUnlocked(true);
      }
    }, 50);
  };

  const stopHold = () => {
    if (holdTimerRef.current !== null) {
      window.clearInterval(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    setHoldProgress(0);
  };

  const handleMathChange = (val: string) => {
    setMathAnswer(val);
    if (parseInt(val, 10) === challenge.sum) {
      setUnlocked(true);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A2E]/60 backdrop-blur-xs p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-3xl bg-[#FFF8E7] border-4 border-[#1A1A2E] shadow-[0_10px_0_#1A1A2E] p-6 relative"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Parent Settings"
          className="absolute top-4 right-4 w-11 h-11 rounded-2xl bg-white border-[3px] border-[#1A1A2E] flex items-center justify-center cursor-pointer"
        >
          <X className="w-6 h-6 text-[#1A1A2E]" strokeWidth={3} />
        </button>

        {!unlocked ? (
          <div className="flex flex-col items-center text-center gap-5 pt-2">
            <h2 className="font-display text-2xl font-bold text-[#1A1A2E]">
              Parents Corner
            </h2>
            <p className="text-sm font-bold text-[#1A1A2E]/75">
              Hold for 3 seconds or solve to enter
            </p>

            {/* 3-Second Press-and-Hold Ring */}
            <button
              type="button"
              onMouseDown={startHold}
              onMouseUp={stopHold}
              onMouseLeave={stopHold}
              onTouchStart={startHold}
              onTouchEnd={stopHold}
              className="relative w-28 h-28 rounded-full bg-[#1EA7FF] border-4 border-[#1A1A2E] shadow-[0_5px_0_#1A1A2E] flex items-center justify-center text-white font-display text-lg font-bold select-none cursor-pointer"
            >
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="#FFD60A"
                  strokeWidth="8"
                  strokeDasharray={276}
                  strokeDashoffset={276 - (276 * holdProgress) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <span>HOLD</span>
            </button>

            <div className="w-full border-t-2 border-[#1A1A2E]/15 pt-4 flex items-center justify-center gap-3">
              <span className="font-display text-2xl font-bold text-[#1A1A2E]">
                {challenge.a} + {challenge.b} =
              </span>
              <input
                type="number"
                inputMode="numeric"
                value={mathAnswer}
                onChange={(e) => handleMathChange(e.target.value)}
                placeholder="?"
                className="w-20 h-12 rounded-2xl bg-white border-[3px] border-[#1A1A2E] text-center font-display text-2xl font-bold text-[#1A1A2E] focus:outline-none focus:ring-4 focus:ring-[#FFD60A]"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 pt-2">
            <h2 className="font-display text-2xl font-bold text-[#1A1A2E]">
              Parents Settings
            </h2>

            {/* Firebase Auth (Auth-Only Parent Account) */}
            <div className="rounded-2xl bg-white border-[3px] border-[#1A1A2E] p-3.5 flex flex-col gap-2.5">
              {!authReady ? (
                <div className="text-sm font-bold text-[#1A1A2E]/60">Checking account...</div>
              ) : user ? (
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || 'Parent'}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full border-2 border-[#1A1A2E] shrink-0 object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#3CD62F] border-2 border-[#1A1A2E] flex items-center justify-center shrink-0">
                        <UserCheck className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-display font-bold text-sm text-[#1A1A2E] truncate">
                        {user.displayName || 'Signed-in Parent'}
                      </p>
                      {user.email && (
                        <p className="text-xs font-bold text-[#1A1A2E]/60 truncate">
                          {user.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    disabled={authBusy}
                    onClick={() => void logout()}
                    className="min-h-[44px] px-3 rounded-xl bg-[#FFF8E7] border-2 border-[#1A1A2E] font-display text-sm font-bold text-[#1A1A2E] flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shrink-0"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  disabled={authBusy}
                  onClick={() => void signInWithGoogle()}
                  className="min-h-[52px] px-4 rounded-xl bg-[#1EA7FF] text-white border-2 border-[#1A1A2E] shadow-[0_3px_0_#1A1A2E] active:translate-y-0.5 flex items-center justify-center gap-2 font-display text-base font-bold cursor-pointer disabled:opacity-60"
                >
                  <LogIn className="w-5 h-5" />
                  {authBusy ? 'Signing in...' : 'Sign in with Google'}
                </button>
              )}

              {authError && (
                <p className="text-xs font-bold text-[#FF2E4C] text-center">{authError}</p>
              )}
            </div>

            {/* SFX Toggle */}
            <button
              type="button"
              onClick={() => onUpdateSettings({ sfxEnabled: !settings.sfxEnabled })}
              className="min-h-[56px] px-4 rounded-2xl bg-white border-[3px] border-[#1A1A2E] flex items-center justify-between cursor-pointer"
            >
              <span className="flex items-center gap-3 font-bold text-[#1A1A2E]">
                <Volume2 className="w-6 h-6 text-[#FF7A00]" />
                Sound Effects
              </span>
              <span
                className={`px-3 py-1 rounded-xl font-display font-bold border-2 border-[#1A1A2E] ${
                  settings.sfxEnabled ? 'bg-[#3CD62F] text-white' : 'bg-[#E2E8F0] text-[#1A1A2E]'
                }`}
              >
                {settings.sfxEnabled ? 'ON' : 'OFF'}
              </span>
            </button>

            {/* Music Toggle */}
            <button
              type="button"
              onClick={() => onUpdateSettings({ musicEnabled: !settings.musicEnabled })}
              className="min-h-[56px] px-4 rounded-2xl bg-white border-[3px] border-[#1A1A2E] flex items-center justify-between cursor-pointer"
            >
              <span className="flex items-center gap-3 font-bold text-[#1A1A2E]">
                <Music className="w-6 h-6 text-[#8E3BFF]" />
                Background Music
              </span>
              <span
                className={`px-3 py-1 rounded-xl font-display font-bold border-2 border-[#1A1A2E] ${
                  settings.musicEnabled ? 'bg-[#3CD62F] text-white' : 'bg-[#E2E8F0] text-[#1A1A2E]'
                }`}
              >
                {settings.musicEnabled ? 'ON' : 'OFF'}
              </span>
            </button>

            {/* Color-Blind Pattern Hints Toggle */}
            <button
              type="button"
              onClick={() => onUpdateSettings({ patternHints: !settings.patternHints })}
              className="min-h-[56px] px-4 rounded-2xl bg-white border-[3px] border-[#1A1A2E] flex items-center justify-between cursor-pointer"
            >
              <span className="flex items-center gap-3 font-bold text-[#1A1A2E]">
                <Eye className="w-6 h-6 text-[#1EA7FF]" />
                Pattern Hints (Accessibility)
              </span>
              <span
                className={`px-3 py-1 rounded-xl font-display font-bold border-2 border-[#1A1A2E] ${
                  settings.patternHints ? 'bg-[#3CD62F] text-white' : 'bg-[#E2E8F0] text-[#1A1A2E]'
                }`}
              >
                {settings.patternHints ? 'ON' : 'OFF'}
              </span>
            </button>

            {/* PWA Install Button in Parent Settings */}
            {!isInstalled && isInstallable && (
              <button
                type="button"
                onClick={install}
                className="min-h-[56px] px-4 rounded-2xl bg-[#1EA7FF] text-white border-[3px] border-[#1A1A2E] shadow-[0_4px_0_#1A1A2E] flex items-center justify-center gap-2 font-display text-lg font-bold cursor-pointer"
              >
                <Download className="w-5 h-5" />
                Install Splash Zoo Offline App
              </button>
            )}

            {!isInstalled && !isInstallable && isIOS && (
              <div className="rounded-2xl bg-[#E8F6FF] border-2 border-[#1A1A2E] p-3 text-xs font-bold text-[#1A1A2E]">
                Install on iPhone/iPad: Tap Share in Safari, then tap Add to Home Screen.
              </div>
            )}

            {/* Reset Progress */}
            {!confirmReset ? (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="min-h-[52px] px-4 rounded-2xl bg-white border-[3px] border-[#FF2E4C] text-[#FF2E4C] flex items-center justify-center gap-2 font-bold cursor-pointer"
              >
                <Trash2 className="w-5 h-5" />
                Reset Progress
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onResetProgress();
                    setConfirmReset(false);
                    onClose();
                  }}
                  className="flex-1 min-h-[52px] rounded-2xl bg-[#FF2E4C] text-white border-[3px] border-[#1A1A2E] font-display font-bold cursor-pointer"
                >
                  Confirm Reset
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  className="flex-1 min-h-[52px] rounded-2xl bg-white border-[3px] border-[#1A1A2E] font-display font-bold cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}

            <p className="text-center text-xs font-bold text-[#1A1A2E]/55">
              Offline Play Ready · No Ads · Kid-Safe
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
