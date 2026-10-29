import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, ShieldCheck, X } from 'lucide-react';
import { Badge } from '../types/library';

interface CelebrationToastProps {
  message: string | null;
  pointsEarned?: number;
  unlockedBadges?: Badge[];
  onClose: () => void;
}

export const CelebrationToast: React.FC<CelebrationToastProps> = ({
  message,
  pointsEarned,
  unlockedBadges = [],
  onClose,
}) => {
  useEffect(() => {
    if (message) {
      confetti({
        particleCount: 65,
        spread: 55,
        origin: { y: 0.8 },
        colors: ['#b89155', '#556b2f', '#a8563c', '#ede6d6'],
      });

      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!message) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full animate-slide-up">
      <div className="bg-[#fcf8ef] border border-[#d4c9b2] p-4 shadow-[0_4px_28px_rgba(28,23,18,0.18)] relative font-serif-vintage">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#b89155] via-[#556b2f] to-[#b89155]" />

        <button
          onClick={onClose}
          className="absolute top-2.5 right-2.5 text-[#877b69] hover:text-[#a8563c] text-base cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3 pr-4">
          <div className="w-8 h-8 rounded-full bg-[#edf3e4] text-[#556b2f] border border-[#c2d2b0] grid place-items-center shrink-0 text-sm font-bold mt-0.5">
            ✦
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-sans-custom uppercase tracking-wider text-[#8f6f3e] font-bold">
                Biblioteca Escolar
              </span>
              {pointsEarned && pointsEarned > 0 ? (
                <span className="text-[10px] font-bold bg-[#edf3e4] text-[#556b2f] border border-[#c2d2b0] px-1.5 py-0.2">
                  +{pointsEarned} pontos
                </span>
              ) : null}
            </div>

            <p className="text-xs text-[#1c1712] mt-1 leading-snug">
              {message}
            </p>

            {unlockedBadges.length > 0 && (
              <div className="mt-2.5 pt-2 border-t border-[#d4c9b2] space-y-1">
                <span className="text-[9px] uppercase tracking-wider text-[#8f6f3e] block font-sans-custom font-bold">
                  Novo Selo Desbloqueado!
                </span>
                {unlockedBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className="flex items-center gap-2 text-xs font-semibold text-[#556b2f] bg-[#edf3e4] p-1.5 border border-[#c2d2b0]"
                  >
                    <span>🎖️</span>
                    <div>
                      <div>{badge.title}</div>
                      <div className="text-[10px] font-normal text-[#877b69] italic">
                        {badge.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
