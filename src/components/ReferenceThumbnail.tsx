import React, { useMemo, useState } from 'react';
import type { AnimalDefinition } from '../types/game';
import { AnimalCanvas } from './AnimalCanvas';

interface ReferenceThumbnailProps {
  animal: AnimalDefinition;
}

export const ReferenceThumbnail: React.FC<ReferenceThumbnailProps> = ({ animal }) => {
  const [expanded, setExpanded] = useState(false);

  const targetFills: Record<string, string> = {};
  animal.regions.forEach((r) => {
    targetFills[r.id] = r.targetColor;
  });

  const uniqueColors = useMemo(
    () => Array.from(new Set(animal.regions.map((r) => r.targetColor))),
    [animal.regions]
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setExpanded(true)}
        aria-label="Peek at finished picture"
        className="flex items-center gap-2 rounded-2xl bg-white border-[3px] border-[#1A1A2E] p-1.5 shadow-[0_4px_0_#1A1A2E] active:translate-y-0.5 active:shadow-[0_2px_0_#1A1A2E] transition-all cursor-pointer"
      >
        <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0">
          <AnimalCanvas animal={animal} fills={targetFills} />
        </div>
        <div className="grid grid-cols-2 gap-1 pr-1">
          {uniqueColors.map((hex) => (
            <span
              key={hex}
              className="w-3.5 h-3.5 rounded-full border-2 border-[#1A1A2E]"
              style={{ backgroundColor: hex }}
            />
          ))}
        </div>
      </button>

      {expanded && (
        <div
          onClick={() => setExpanded(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A2E]/45 backdrop-blur-xs p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xs rounded-3xl bg-[#FFF8E7] border-4 border-[#1A1A2E] p-5 shadow-[0_10px_0_#1A1A2E] flex flex-col items-center gap-4"
          >
            <div className="w-48 h-48">
              <AnimalCanvas animal={animal} fills={targetFills} />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {uniqueColors.map((hex) => (
                <span
                  key={hex}
                  className="w-8 h-8 rounded-full border-[3px] border-[#1A1A2E] shadow-xs"
                  style={{ backgroundColor: hex }}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="w-full min-h-[56px] rounded-2xl bg-[#3CD62F] border-[3px] border-[#1A1A2E] shadow-[0_4px_0_#1A1A2E] font-display text-xl font-bold text-[#1A1A2E] cursor-pointer"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};
