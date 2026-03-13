'use client';

import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';

type Phase = 0 | 1 | 2 | 3 | 4;

interface DocNearLoaderProps {
  fullscreen?: boolean;
}

export function DocNearLoader({ fullscreen = true }: DocNearLoaderProps) {
  const [phase, setPhase] = useState<Phase>(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 900);
    const t3 = setTimeout(() => setPhase(3), 1500);
    const t4 = setTimeout(() => setPhase(4), 2100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div
      style={{
        minHeight: fullscreen ? '100vh' : '100%',
        width: '100%',
        background: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 40%, #f0fdfa 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily:
          "'DM Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <style>{loaderCss}</style>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div
          style={{
            position: 'relative',
            width: 80,
            height: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle
              cx="40"
              cy="40"
              r="37"
              stroke="url(#ringGrad)"
              strokeWidth="1.5"
              fill="none"
              className={phase >= 1 ? 'ring-draw' : ''}
              style={{ opacity: phase >= 1 ? 1 : 0 }}
            />

            <g className={phase >= 1 ? 'pin-drop' : ''} style={{ opacity: phase >= 1 ? 1 : 0 }}>
              <path
                d="M40 14C30.06 14 22 22.06 22 32C22 44.5 40 66 40 66C40 66 58 44.5 58 32C58 22.06 49.94 14 40 14Z"
                fill="url(#pinGrad)"
              />
              <circle cx="40" cy="32" r="9" fill="white" opacity={0.96} />
            </g>

            <g className={phase >= 2 ? 'scope-appear' : ''} style={{ opacity: phase >= 2 ? 1 : 0 }}>
              <circle cx="40" cy="32" r="5" fill="#0d9488" />
              <path
                d="M40 29.5V34.5M37.5 32H42.5"
                stroke="white"
                strokeWidth={1.8}
                strokeLinecap="round"
              />
            </g>

            <defs>
              <linearGradient
                id="pinGrad"
                x1="22"
                y1="14"
                x2="58"
                y2="66"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#0f766e" />
              </linearGradient>
              <linearGradient
                id="ringGrad"
                x1="0"
                y1="0"
                x2="80"
                y2="80"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#0f766e" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>

          {phase >= 3 && (
            <>
              <div
                className="ripple"
                style={{
                  position: 'absolute',
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  border: '2px solid #14b8a6',
                  opacity: 0,
                  pointerEvents: 'none',
                }}
              />
              <div
                className="ripple ripple-delay"
                style={{
                  position: 'absolute',
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  border: '2px solid #14b8a6',
                  opacity: 0,
                  pointerEvents: 'none',
                }}
              />
            </>
          )}
        </div>

        <div
          className={phase >= 3 ? 'wordmark-slide' : ''}
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 4,
            marginTop: 8,
            opacity: phase >= 3 ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        >
          <span
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: '#134e4a',
              letterSpacing: -1,
            }}
          >
            Doc
          </span>
          <span
            style={{
              fontSize: 32,
              fontWeight: 500,
              color: '#0d9488',
              letterSpacing: -1,
            }}
          >
            Near
          </span>
        </div>

        <div
          className={phase >= 4 ? 'tagline-fade' : ''}
          style={{
            fontSize: 12,
            color: '#0f766e',
            letterSpacing: 2,
            textTransform: 'uppercase',
            fontWeight: 500,
            opacity: phase >= 4 ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        >
          Your doctor, nearby.
        </div>

        <div
          style={{
            display: 'flex',
            gap: 6,
            marginTop: 20,
          }}
        >
          <div className="dot dot1" style={dotStyle} />
          <div className="dot dot2" style={dotStyle} />
          <div className="dot dot3" style={dotStyle} />
        </div>
      </div>
    </div>
  );
}

const dotStyle: CSSProperties = {
  width: 6,
  height: 6,
  borderRadius: '50%',
  background: '#0d9488',
  opacity: 0.3,
};

const loaderCss = `
  .pin-drop {
    animation: pinDrop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    transform-origin: 40px 14px;
  }

  @keyframes pinDrop {
    from { transform: translateY(-20px) scale(0.7); opacity: 0; }
    to { transform: translateY(0) scale(1); opacity: 1; }
  }

  .scope-appear {
    animation: scopeFade 0.4s ease forwards;
    transform-origin: 40px 32px;
  }

  @keyframes scopeFade {
    from { opacity: 0; transform: scale(0.5); }
    to { opacity: 1; transform: scale(1); }
  }

  .ring-draw {
    stroke-dasharray: 235;
    stroke-dashoffset: 235;
    animation: ringDraw 0.9s ease forwards;
  }

  @keyframes ringDraw {
    to { stroke-dashoffset: 0; }
  }

  .ripple {
    animation: rippleOut 1.8s ease-out infinite;
  }

  .ripple-delay {
    animation-delay: 0.7s;
  }

  @keyframes rippleOut {
    0% { transform: scale(1); opacity: 0.5; }
    100% { transform: scale(2.4); opacity: 0; }
  }

  .wordmark-slide {
    animation: slideUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  @keyframes slideUp {
    from { transform: translateY(12px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  .tagline-fade {
    animation: fadein 0.6s ease forwards;
  }

  @keyframes fadein {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .dot { animation: dotBounce 1.2s ease-in-out infinite; }
  .dot1 { animation-delay: 0s; }
  .dot2 { animation-delay: 0.2s; }
  .dot3 { animation-delay: 0.4s; }

  @keyframes dotBounce {
    0%, 80%, 100% { opacity: 0.3; transform: translateY(0); }
    40% { opacity: 1; transform: translateY(-5px); }
  }
`;
