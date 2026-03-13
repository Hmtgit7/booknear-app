'use client';

import { useState } from 'react';

interface PinSpinnerProps {
  size?: number;
  color?: string;
}

interface LoadingButtonProps {
  label?: string;
  loadingLabel?: string;
}

interface InlineSpinnerProps {
  text?: string;
}

interface SectionProps {
  label: string;
  children: React.ReactNode;
}

const btnBase: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '12px 24px',
  borderRadius: '10px',
  border: 'none',
  color: 'white',
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '15px',
  fontWeight: '600',
  transition: 'all 0.3s ease',
  letterSpacing: '0.2px',
};

const skCard: React.CSSProperties = {
  background: 'white',
  borderRadius: '14px',
  padding: '18px',
  width: '280px',
  boxShadow: '0 2px 16px rgba(13,148,136,0.08)',
};

export function PinSpinner({ size = 20, color = '#0d9488' }: PinSpinnerProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      style={{ display: 'inline-block' }}
    >
      <style>{`
        .pin-spin { transform-origin: 10px 10px; animation: pinSpin 1s linear infinite; }
        @keyframes pinSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <g className="pin-spin">
        <circle
          cx="10"
          cy="10"
          r="9"
          stroke={color}
          strokeWidth="1.5"
          strokeDasharray="42 14"
          strokeLinecap="round"
          fill="none"
          opacity="0.3"
        />
        <circle
          cx="10"
          cy="10"
          r="9"
          stroke={color}
          strokeWidth="1.5"
          strokeDasharray="14 42"
          strokeLinecap="round"
          fill="none"
        />
      </g>
      <path
        d="M10 5.5C7.8 5.5 6 7.3 6 9.5C6 12.2 10 16 10 16C10 16 14 12.2 14 9.5C14 7.3 12.2 5.5 10 5.5Z"
        fill={color}
        opacity="0.9"
      />
      <circle cx="10" cy="9.5" r="1.8" fill="white" />
    </svg>
  );
}

export function LoadingButton({
  label = 'Book Appointment',
  loadingLabel = 'Booking...',
}: LoadingButtonProps) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleClick = () => {
    if (loading || done) {
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 2200);
    setTimeout(() => setDone(false), 4000);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        ...btnBase,
        background: done ? '#0f766e' : 'linear-gradient(135deg, #14b8a6, #0d9488)',
        cursor: loading ? 'not-allowed' : 'pointer',
        transform: loading ? 'scale(0.98)' : 'scale(1)',
      }}
    >
      {loading && <PinSpinner size={16} color="white" />}
      {done && <span style={{ fontSize: 16 }}>OK</span>}
      <span>{done ? 'Booked!' : loading ? loadingLabel : label}</span>
    </button>
  );
}

export function SkeletonCard() {
  return (
    <div style={skCard}>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }

        .sk {
          background: linear-gradient(90deg, #e2f8f5 25%, #b2f0e8 50%, #e2f8f5 75%);
          background-size: 800px 100%;
          animation: shimmer 1.4s infinite linear;
          border-radius: 6px;
        }
      `}</style>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
        <div className="sk" style={{ width: 48, height: 48, borderRadius: '50%', flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div className="sk" style={{ height: 13, width: '65%', marginBottom: 7 }} />
          <div className="sk" style={{ height: 11, width: '45%' }} />
        </div>
      </div>
      <div className="sk" style={{ height: 10, width: '100%', marginBottom: 7 }} />
      <div className="sk" style={{ height: 10, width: '85%', marginBottom: 7 }} />
      <div className="sk" style={{ height: 10, width: '55%' }} />
      <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
        <div className="sk" style={{ height: 32, flex: 1, borderRadius: 8 }} />
        <div className="sk" style={{ height: 32, flex: 1, borderRadius: 8 }} />
      </div>
    </div>
  );
}

export function InlineSpinner({ text = 'Finding doctors nearby...' }: InlineSpinnerProps) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        color: '#0d9488',
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '13px',
        fontWeight: 500,
      }}
    >
      <PinSpinner size={14} />
      <span>{text}</span>
    </div>
  );
}

export function MiniOverlay() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <button
        onClick={() => setVisible(true)}
        style={{
          ...btnBase,
          background: 'linear-gradient(135deg,#14b8a6,#0d9488)',
          fontSize: 13,
          padding: '8px 16px',
        }}
      >
        Show mini overlay
      </button>
    );
  }

  return (
    <div
      style={{
        position: 'relative',
        width: 200,
        height: 120,
        background: 'linear-gradient(135deg,#f0fdfa,#ccfbf1)',
        borderRadius: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        boxShadow: '0 4px 24px rgba(13,148,136,0.12)',
      }}
    >
      <PinSpinner size={36} />
      <span
        style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: 13,
          color: '#0d9488',
          fontWeight: 600,
        }}
      >
        DocNear
      </span>
      <button
        onClick={() => setVisible(false)}
        style={{
          position: 'absolute',
          top: 8,
          right: 10,
          background: 'none',
          border: 'none',
          color: '#94a3b8',
          cursor: 'pointer',
          fontSize: 12,
        }}
      >
        x dismiss
      </button>
    </div>
  );
}

export function LoadingKitShowcase() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f8fffe',
        fontFamily: "'DM Sans', sans-serif",
        padding: '40px 24px',
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');`}</style>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <h2 style={{ color: '#134e4a', fontWeight: 700, fontSize: 22, marginBottom: 4 }}>
          DocNear - Inline Loader Kit
        </h2>
        <p
          style={{
            color: '#5eead4',
            fontSize: 13,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            marginBottom: 40,
            fontWeight: 500,
          }}
        >
          compact components
        </p>

        <Section label="Pin Spinner - sizes">
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <PinSpinner size={14} />
            <PinSpinner size={20} />
            <PinSpinner size={28} />
            <PinSpinner size={36} />
            <PinSpinner size={48} />
          </div>
        </Section>

        <Section label="Button Loading State - click it!">
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <LoadingButton label="Book Appointment" loadingLabel="Booking..." />
            <LoadingButton label="Send Report" loadingLabel="Uploading..." />
          </div>
        </Section>

        <Section label="Skeleton Card - doctor list loading">
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </Section>

        <Section label="Inline Text Spinner">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <InlineSpinner text="Finding doctors nearby..." />
            <InlineSpinner text="Loading appointments..." />
            <InlineSpinner text="Verifying KYC..." />
          </div>
        </Section>

        <Section label="Mini Card Overlay">
          <MiniOverlay />
        </Section>
      </div>
    </div>
  );
}

function Section({ label, children }: SectionProps) {
  return (
    <div style={{ marginBottom: 36 }}>
      <p
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: '#94a3b8',
          textTransform: 'uppercase',
          letterSpacing: '1.2px',
          marginBottom: 16,
        }}
      >
        {label}
      </p>
      {children}
    </div>
  );
}
