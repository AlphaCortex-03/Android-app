import React, { useEffect, useMemo } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { SplashParticle } from '../types/game';

export interface ParticleBurstProps {
  /** Horizontal coordinate in SVG units (when mode="svg") or px (when mode="overlay") */
  x: number;
  /** Vertical coordinate in SVG units (when mode="svg") or px (when mode="overlay") */
  y: number;
  /** Primary paint color of the burst */
  color: string;
  /** Optional unique burst seed/id for deterministic particle scatter */
  burstId?: number;
  /** Number of sparkle particles emitted */
  count?: number;
  /** Max radial burst distance */
  spread?: number;
  /** Highlights burst with extra golden star sparkles */
  isBonus?: boolean;
  /** Render inside an <svg> (<g>) or as a standalone positioned HTML overlay */
  mode?: 'svg' | 'overlay';
  /** Called once the burst animation finishes */
  onComplete?: () => void;
}

interface ParticleSpec {
  key: string;
  angle: number;
  distance: number;
  gravityY: number;
  size: number;
  rotate: number;
  delay: number;
  duration: number;
  shape: 'fourStar' | 'fiveStar' | 'dot' | 'ring';
  fill: string;
}

const SPARKLE_ACCENTS = ['#FFD60A', '#FFFFFF', '#FF5CAA', '#00D9C0'];

function seeded(seed: number, offset: number): number {
  const val = Math.sin(seed * 9301 + offset * 49297 + 233) * 10000;
  return val - Math.floor(val);
}

export const ParticleBurst: React.FC<ParticleBurstProps> = ({
  x,
  y,
  color,
  burstId = 1,
  count,
  spread,
  isBonus = false,
  mode = 'svg',
  onComplete,
}) => {
  const reducedMotion = Boolean(useReducedMotion());
  const particleCount = count ?? (isBonus ? 16 : 12);
  const maxSpread = spread ?? (isBonus ? 92 : 76);

  const particles = useMemo<ParticleSpec[]>(() => {
    return Array.from({ length: particleCount }, (_, i) => {
      const baseAngle = (i / particleCount) * Math.PI * 2;
      const jitter = (seeded(burstId, i * 3 + 1) - 0.5) * 0.42;
      const angle = baseAngle + jitter;
      const distance = maxSpread * 0.45 + seeded(burstId, i * 3 + 2) * (maxSpread * 0.55);
      const gravityY = 8 + seeded(burstId, i * 3 + 3) * 18;
      const size = 0.65 + seeded(burstId, i * 5 + 4) * 0.7;
      const rotate = (seeded(burstId, i * 7 + 5) - 0.5) * 320;
      const delay = seeded(burstId, i * 11 + 6) * 0.08;
      const duration = 0.48 + seeded(burstId, i * 13 + 7) * 0.24;

      const shapeRoll = seeded(burstId, i * 17 + 8);
      const shape: ParticleSpec['shape'] = isBonus
        ? shapeRoll < 0.45
          ? 'fiveStar'
          : shapeRoll < 0.8
          ? 'fourStar'
          : 'dot'
        : shapeRoll < 0.4
        ? 'fourStar'
        : shapeRoll < 0.65
        ? 'fiveStar'
        : shapeRoll < 0.88
        ? 'dot'
        : 'ring';

      const fill =
        i % 3 === 0
          ? color
          : isBonus && i % 2 === 0
          ? '#FFD60A'
          : SPARKLE_ACCENTS[i % SPARKLE_ACCENTS.length];

      return {
        key: `${burstId}-${i}`,
        angle,
        distance,
        gravityY,
        size,
        rotate,
        delay,
        duration,
        shape,
        fill,
      };
    });
  }, [burstId, color, isBonus, maxSpread, particleCount]);

  useEffect(() => {
    if (!onComplete) return;
    const t = window.setTimeout(onComplete, reducedMotion ? 320 : 800);
    return () => window.clearTimeout(t);
  }, [onComplete, reducedMotion]);

  const svgBurstContent = reducedMotion ? (
    <motion.circle
      cx={x}
      cy={y}
      r={24}
      fill={isBonus ? '#FFD60A' : color}
      initial={{ opacity: 0.85, scale: 0.6 }}
      animate={{ opacity: 0, scale: 1.4 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ transformOrigin: `${x}px ${y}px` }}
    />
  ) : (
    <g pointerEvents="none">
      {/* Expanding paint splash blob */}
      <motion.circle
        cx={x}
        cy={y}
        r={20}
        fill={color}
        initial={{ scale: 0.15, opacity: 0.92 }}
        animate={{ scale: 3.6, opacity: 0 }}
        transition={{ duration: 0.44, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: `${x}px ${y}px` }}
      />

      {/* Crisp cartoon pop ring */}
      <motion.circle
        cx={x}
        cy={y}
        r={14}
        fill="none"
        stroke={isBonus ? '#FFD60A' : '#1A1A2E'}
        strokeWidth={3.5}
        initial={{ scale: 0.25, opacity: 0.95 }}
        animate={{ scale: 4.5, opacity: 0 }}
        transition={{ duration: 0.48, ease: 'easeOut' }}
        style={{ transformOrigin: `${x}px ${y}px` }}
      />

      {/* Radiating sparkles, stars, and droplets */}
      {particles.map((p) => {
        const tx = x + Math.cos(p.angle) * p.distance;
        const ty = y + Math.sin(p.angle) * p.distance + p.gravityY;

        return (
          <motion.g
            key={p.key}
            initial={{ x, y, scale: 0.2, rotate: 0, opacity: 1 }}
            animate={{
              x: tx,
              y: ty,
              scale: [0.2, p.size * 1.25, p.size * 0.9, 0],
              rotate: p.rotate,
              opacity: [1, 1, 0.9, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {p.shape === 'fourStar' && (
              <path
                d="M 0 -11 Q 2 -2 11 0 Q 2 2 0 11 Q -2 2 -11 0 Q -2 -2 0 -11 Z"
                fill={p.fill}
                stroke="#1A1A2E"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
            )}
            {p.shape === 'fiveStar' && (
              <path
                d="M 0 -11 L 3 -3.5 L 11 -3.5 L 4.5 1.5 L 7 9.5 L 0 4.5 L -7 9.5 L -4.5 1.5 L -11 -3.5 L -3 -3.5 Z"
                fill={p.fill}
                stroke="#1A1A2E"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
            )}
            {p.shape === 'dot' && (
              <circle
                cx={0}
                cy={0}
                r={5.5}
                fill={p.fill}
                stroke="#1A1A2E"
                strokeWidth="2.2"
              />
            )}
            {p.shape === 'ring' && (
              <circle
                cx={0}
                cy={0}
                r={6}
                fill="none"
                stroke={p.fill}
                strokeWidth="3"
              />
            )}
          </motion.g>
        );
      })}

      {/* Rising bonus gold star on guided match */}
      {isBonus && (
        <motion.g
          initial={{ x, y: y - 6, scale: 0.3, opacity: 0 }}
          animate={{
            x,
            y: y - 60,
            scale: [0.3, 1.35, 1.1, 0.6],
            opacity: [0, 1, 1, 0],
          }}
          transition={{ duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
        >
          <path
            d="M 0 -16 L 4.5 -5.5 L 16 -5.5 L 6.8 1.8 L 10.2 13 L 0 6.5 L -10.2 13 L -6.8 1.8 L -16 -5.5 L -4.5 -5.5 Z"
            fill="#FFD60A"
            stroke="#1A1A2E"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </motion.g>
      )}
    </g>
  );

  if (mode === 'overlay') {
    return (
      <svg
        className="pointer-events-none fixed inset-0 w-full h-full z-50 overflow-visible"
        aria-hidden="true"
      >
        {svgBurstContent}
      </svg>
    );
  }

  return svgBurstContent;
};

interface ParticleBurstGroupProps {
  bursts: SplashParticle[];
}

export const ParticleBurstGroup: React.FC<ParticleBurstGroupProps> = ({ bursts }) => {
  return (
    <g pointerEvents="none">
      <AnimatePresence>
        {bursts.map((burst) => (
          <ParticleBurst
            key={burst.id}
            burstId={burst.id}
            x={burst.x}
            y={burst.y}
            color={burst.color}
            isBonus={burst.isStarMatch}
            mode="svg"
          />
        ))}
      </AnimatePresence>
    </g>
  );
};
