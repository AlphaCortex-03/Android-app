import React, { useId, useRef } from 'react';
import { motion } from 'motion/react';
import type { AccessoryId, AnimalDefinition, BrushEffectId, SplashParticle } from '../types/game';
import { getColorByHexOrId } from '../data/palette';
import { ParticleBurstGroup } from './ParticleBurst';

interface AnimalCanvasProps {
  animal: AnimalDefinition;
  fills: Record<string, string>;
  interactive?: boolean;
  guidedRegionId?: string | null;
  showIdleHint?: boolean;
  brushEffect?: BrushEffectId;
  patternHints?: boolean;
  accessory?: AccessoryId;
  dancing?: boolean;
  silhouette?: boolean;
  splashes?: SplashParticle[];
  onRegionTap?: (regionId: string, svgPoint: { x: number; y: number }) => void;
  className?: string;
}

export const AnimalCanvas: React.FC<AnimalCanvasProps> = ({
  animal,
  fills,
  interactive = false,
  guidedRegionId = null,
  showIdleHint = false,
  brushEffect = 'solid',
  patternHints = false,
  accessory = 'none',
  dancing = false,
  silhouette = false,
  splashes = [],
  onRegionTap,
  className = '',
}) => {
  const uid = useId().replace(/:/g, '');
  const svgRef = useRef<SVGSVGElement | null>(null);

  const handleRegionClick = (
    e: React.MouseEvent<SVGGElement> | React.TouchEvent<SVGGElement>,
    regionId: string
  ) => {
    if (!interactive || !onRegionTap) return;
    e.stopPropagation();

    let clientX = 0;
    let clientY = 0;
    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('changedTouches' in e && e.changedTouches.length > 0) {
      clientX = e.changedTouches[0].clientX;
      clientY = e.changedTouches[0].clientY;
    } else if ('clientX' in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    let svgPt = { x: 200, y: 200 };
    if (svgRef.current) {
      const ctm = svgRef.current.getScreenCTM();
      if (ctm) {
        const pt = svgRef.current.createSVGPoint();
        pt.x = clientX;
        pt.y = clientY;
        const transformed = pt.matrixTransform(ctm.inverse());
        svgPt = { x: transformed.x, y: transformed.y };
      }
    }

    onRegionTap(regionId, svgPt);
  };

  const guidedRegion = guidedRegionId
    ? animal.regions.find((r) => r.id === guidedRegionId)
    : null;

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        ref={svgRef}
        viewBox={animal.viewBox}
        className={`w-full h-full max-h-full drop-shadow-sm ${dancing ? 'animate-dance-jump' : ''}`}
        role="img"
        aria-label={animal.name}
      >
        <defs>
          {/* Glitter Brush Pattern */}
          <pattern id={`brush-glitter-${uid}`} width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="6" cy="6" r="2.2" fill="#FFFFFF" opacity="0.65" />
            <circle cx="18" cy="14" r="1.6" fill="#FFD60A" opacity="0.75" />
            <circle cx="10" cy="20" r="1.8" fill="#FFFFFF" opacity="0.55" />
          </pattern>

          {/* Polka Dot Brush Pattern */}
          <pattern id={`brush-polka-${uid}`} width="26" height="26" patternUnits="userSpaceOnUse">
            <circle cx="8" cy="8" r="4.5" fill="#FFFFFF" opacity="0.38" />
            <circle cx="21" cy="21" r="4.5" fill="#FFFFFF" opacity="0.38" />
          </pattern>

          {/* Starry Brush Pattern */}
          <pattern id={`brush-stars-${uid}`} width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M16 4 L18.5 11 L26 11 L20 15.5 L22.5 23 L16 18.5 L9.5 23 L12 15.5 L6 11 L13.5 11 Z" fill="#FFFFFF" opacity="0.45" />
          </pattern>

          {/* Rainbow Shimmer Pattern */}
          <linearGradient id={`brush-rainbow-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF5CAA" stopOpacity="0.32" />
            <stop offset="33%" stopColor="#FFD60A" stopOpacity="0.28" />
            <stop offset="66%" stopColor="#00D9C0" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#8E3BFF" stopOpacity="0.32" />
          </linearGradient>

          {/* Neon / Gold Glow Pattern */}
          <linearGradient id={`brush-gold-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#FFD60A" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.35" />
          </linearGradient>

          {/* Accessibility Color-Blind Pattern Hints */}
          <pattern id={`cb-dots-${uid}`} width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="8" cy="8" r="2.2" fill="#1A1A2E" opacity="0.22" />
          </pattern>
          <pattern id={`cb-stripes-${uid}`} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="14" stroke="#1A1A2E" strokeWidth="3" opacity="0.18" />
          </pattern>
          <pattern id={`cb-grid-${uid}`} width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#1A1A2E" strokeWidth="2" opacity="0.18" />
          </pattern>
        </defs>

        {/* Optional Static Background Layers */}
        {!silhouette &&
          animal.preColoredBackground?.map((layer, idx) => (
            <path
              key={`bg-${idx}`}
              d={layer.d}
              fill={layer.fill || 'none'}
              stroke={layer.stroke || 'none'}
              strokeWidth={layer.strokeWidth || 0}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={layer.opacity ?? 1}
            />
          ))}

        {/* Paintable Animal Regions */}
        {animal.regions.map((region) => {
          const filledHex = fills[region.id];
          const isGuided = interactive && guidedRegionId === region.id && !filledHex;
          const baseFill = silhouette
            ? '#CBD5E1'
            : filledHex
            ? filledHex
            : '#F1F5F9';

          const brushOverlay =
            !silhouette && filledHex && brushEffect !== 'solid'
              ? brushEffect === 'glitter'
                ? `url(#brush-glitter-${uid})`
                : brushEffect === 'polka'
                ? `url(#brush-polka-${uid})`
                : brushEffect === 'stars'
                ? `url(#brush-stars-${uid})`
                : brushEffect === 'rainbow'
                ? `url(#brush-rainbow-${uid})`
                : `url(#brush-gold-${uid})`
              : null;

          const targetSwatch = getColorByHexOrId(region.targetColor);
          const cbOverlay =
            patternHints && !silhouette && !filledHex
              ? targetSwatch.patternType === 'dots'
                ? `url(#cb-dots-${uid})`
                : targetSwatch.patternType === 'stripes' || targetSwatch.patternType === 'waves'
                ? `url(#cb-stripes-${uid})`
                : targetSwatch.patternType === 'grid' || targetSwatch.patternType === 'stars'
                ? `url(#cb-grid-${uid})`
                : null
              : null;

          return (
            <g
              key={region.id}
              onClick={(e) => handleRegionClick(e, region.id)}
              className={`${interactive ? 'cursor-pointer' : ''} ${
                isGuided ? 'animate-region-glow' : ''
              }`}
            >
              {region.svgPaths.map((pathD, pIdx) => (
                <React.Fragment key={`${region.id}-${pIdx}`}>
                  <path
                    d={pathD}
                    fill={baseFill}
                    stroke={isGuided ? '#FFB703' : silhouette ? '#94A3B8' : '#1A1A2E'}
                    strokeWidth={isGuided ? 9 : 7}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-colors duration-150"
                  />
                  {brushOverlay && (
                    <path
                      d={pathD}
                      fill={brushOverlay}
                      pointerEvents="none"
                    />
                  )}
                  {cbOverlay && (
                    <path
                      d={pathD}
                      fill={cbOverlay}
                      pointerEvents="none"
                    />
                  )}
                </React.Fragment>
              ))}
            </g>
          );
        })}

        {/* Pre-Colored Eyes, Smile & Foreground Ink Details */}
        {!silhouette &&
          animal.preColoredForeground.map((layer, idx) => (
            <path
              key={`fg-${idx}`}
              d={layer.d}
              fill={layer.fill || 'none'}
              stroke={layer.stroke || 'none'}
              strokeWidth={layer.strokeWidth || 0}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={layer.opacity ?? 1}
              pointerEvents="none"
            />
          ))}

        {/* Wearable Unlocked Accessory Overlay */}
        {!silhouette && accessory === 'hat' && (
          <g transform="translate(152, 8)" pointerEvents="none">
            <path
              d="M 48 6 L 12 64 C 34 72 62 72 84 64 Z"
              fill="#FF2E4C"
              stroke="#1A1A2E"
              strokeWidth="6"
              strokeLinejoin="round"
            />
            <path d="M 30 34 Q 48 42 66 34" fill="none" stroke="#FFD60A" strokeWidth="7" strokeLinecap="round" />
            <circle cx="48" cy="6" r="10" fill="#FFD60A" stroke="#1A1A2E" strokeWidth="5" />
          </g>
        )}

        {!silhouette && accessory === 'glasses' && (
          <g transform="translate(0, -4)" pointerEvents="none">
            <rect x="128" y="122" width="56" height="38" rx="14" fill="#1EA7FF" fillOpacity="0.45" stroke="#1A1A2E" strokeWidth="6" />
            <rect x="216" y="122" width="56" height="38" rx="14" fill="#1EA7FF" fillOpacity="0.45" stroke="#1A1A2E" strokeWidth="6" />
            <path d="M 184 138 Q 200 132 216 138" fill="none" stroke="#1A1A2E" strokeWidth="6" strokeLinecap="round" />
          </g>
        )}

        {!silhouette && accessory === 'crown' && (
          <g transform="translate(148, 8)" pointerEvents="none">
            <path
              d="M 12 58 L 6 16 L 34 38 L 52 8 L 70 38 L 98 16 L 92 58 Z"
              fill="#FFD60A"
              stroke="#1A1A2E"
              strokeWidth="6"
              strokeLinejoin="round"
            />
            <circle cx="52" cy="40" r="6" fill="#FF2E4C" stroke="#1A1A2E" strokeWidth="3" />
          </g>
        )}

        {/* Active Radial Paint Splash & Reusable ParticleBurst */}
        <ParticleBurstGroup bursts={splashes} />

        {/* 5-Second Idle Cartoon Paintbrush Hint */}
        {interactive && showIdleHint && guidedRegion && (
          <motion.g
            pointerEvents="none"
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: 1,
              x: [0, 8, 0],
              y: [0, -10, 0],
            }}
            transition={{
              opacity: { duration: 0.25 },
              x: { duration: 1.1, repeat: Infinity, ease: 'easeInOut' },
              y: { duration: 1.1, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            <g transform={`translate(${guidedRegion.hintPoint.x}, ${guidedRegion.hintPoint.y}) rotate(-28)`}>
              {/* Paintbrush tip pointing directly at (0,0) */}
              <path
                d="M 0 0 C -10 -14 -8 -28 0 -32 C 8 -28 10 -14 0 0 Z"
                fill={guidedRegion.targetColor}
                stroke="#1A1A2E"
                strokeWidth="4"
              />
              <rect
                x="-8"
                y="-44"
                width="16"
                height="14"
                rx="3"
                fill="#CBD5E1"
                stroke="#1A1A2E"
                strokeWidth="4"
              />
              <path
                d="M -7 -44 L -10 -92 C -10 -100 10 -100 10 -92 L 7 -44 Z"
                fill="#FF7A00"
                stroke="#1A1A2E"
                strokeWidth="4"
              />
            </g>
          </motion.g>
        )}
      </svg>
    </div>
  );
};
