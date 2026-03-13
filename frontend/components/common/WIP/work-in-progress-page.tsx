'use client';

import { Badge } from '@/components/ui/badge';
import { DocNearLogo } from '../logo/docnear-logo';
import { Card, CardContent } from '@/components/ui/card';
import { InlineSpinner, PinSpinner } from '../loader/loading-primitives';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

interface WorkInProgressPageProps {
  portalLabel: string;
  eyebrow: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  items: [string, string, string];
  statusText: string;
  ctaLabel: string;
  accent: 'teal' | 'emerald' | 'cyan';
}

const accentMap = {
  teal: {
    bg: 'bg-[radial-gradient(1200px_480px_at_20%_-10%,rgba(45,212,191,0.24),transparent),radial-gradient(900px_420px_at_95%_15%,rgba(20,184,166,0.14),transparent),linear-gradient(165deg,#f6fffd_0%,#ecfdf8_55%,#f8fafc_100%)]',
    grid: 'bg-[linear-gradient(to_right,rgba(15,118,110,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,118,110,0.06)_1px,transparent_1px)] bg-size-[34px_34px] mask-[radial-gradient(circle_at_center,black,transparent_78%)]',
    badge: 'border-teal-200 bg-teal-50 text-teal-700',
    card: 'border-teal-100/80 bg-white/85 shadow-2xl shadow-teal-900/5',
    eyebrow: 'text-teal-600',
    title: 'text-teal-950',
    highlight: 'from-teal-700 to-emerald-600',
    body: 'text-teal-900/75',
    itemBox: 'border-teal-100 bg-teal-50/70 text-teal-800',
    itemLabel: 'text-teal-700',
    cta: 'bg-teal-700 text-white hover:bg-teal-800',
  },
  emerald: {
    bg: 'bg-[radial-gradient(1100px_420px_at_5%_5%,rgba(16,185,129,0.2),transparent),radial-gradient(900px_480px_at_92%_10%,rgba(45,212,191,0.18),transparent),linear-gradient(160deg,#f0fdfa_0%,#f8fffe_52%,#f8fafc_100%)]',
    grid: 'bg-[linear-gradient(to_right,rgba(13,148,136,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(13,148,136,0.05)_1px,transparent_1px)] bg-size-[30px_30px] mask-[radial-gradient(circle_at_center,black,transparent_80%)]',
    badge: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    card: 'border-emerald-100/80 bg-white/90 shadow-2xl shadow-emerald-900/5',
    eyebrow: 'text-emerald-600',
    title: 'text-emerald-950',
    highlight: 'from-emerald-700 to-teal-600',
    body: 'text-emerald-900/75',
    itemBox: 'border-emerald-100 bg-emerald-50/70 text-emerald-800',
    itemLabel: 'text-emerald-700',
    cta: 'bg-emerald-700 text-white hover:bg-emerald-800',
  },
  cyan: {
    bg: 'bg-[radial-gradient(1200px_480px_at_10%_0%,rgba(20,184,166,0.22),transparent),radial-gradient(900px_430px_at_95%_12%,rgba(6,182,212,0.16),transparent),linear-gradient(160deg,#f0fdfa_0%,#f8fffe_50%,#eff6ff_100%)]',
    grid: 'bg-[linear-gradient(to_right,rgba(14,116,144,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,116,144,0.05)_1px,transparent_1px)] bg-size-[32px_32px] mask-[radial-gradient(circle_at_center,black,transparent_80%)]',
    badge: 'border-cyan-200 bg-cyan-50 text-cyan-700',
    card: 'border-cyan-100/80 bg-white/90 shadow-2xl shadow-cyan-900/5',
    eyebrow: 'text-cyan-600',
    title: 'text-cyan-950',
    highlight: 'from-cyan-700 to-teal-600',
    body: 'text-cyan-900/75',
    itemBox: 'border-cyan-100 bg-cyan-50/70 text-cyan-800',
    itemLabel: 'text-cyan-700',
    cta: 'bg-cyan-700 text-white hover:bg-cyan-800',
  },
} as const;

export function WorkInProgressPage({
  portalLabel,
  eyebrow,
  titlePrefix,
  titleHighlight,
  description,
  items,
  statusText,
  ctaLabel,
  accent,
}: WorkInProgressPageProps) {
  const palette = accentMap[accent];

  return (
    <main className={`relative min-h-screen overflow-hidden px-6 py-12 sm:px-10 ${palette.bg}`}>
      <div className={`pointer-events-none absolute inset-0 ${palette.grid}`} />

      <section className="relative mx-auto flex w-full max-w-4xl flex-col gap-8">
        <div className="flex items-center justify-between rounded-2xl border bg-white/80 px-5 py-4 shadow-sm backdrop-blur-sm">
          <DocNearLogo size="md" />
          <Badge variant="secondary" className={palette.badge}>
            {portalLabel}
          </Badge>
        </div>

        <Card className={`${palette.card} backdrop-blur`}>
          <CardContent className="space-y-8 p-8 sm:p-10">
            <div className="space-y-4 text-center sm:text-left">
              <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${palette.eyebrow}`}>
                {eyebrow}
              </p>
              <h1 className={`text-4xl font-semibold tracking-tight sm:text-5xl ${palette.title}`}>
                {titlePrefix}
                <span
                  className={`ml-2 bg-linear-to-r bg-clip-text text-transparent ${palette.highlight}`}
                >
                  {titleHighlight}
                </span>
              </h1>
              <p className={`max-w-2xl text-sm leading-relaxed sm:text-base ${palette.body}`}>
                {description}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {items.map((item) => (
                <div key={item} className={`rounded-xl border p-4 text-sm ${palette.itemBox}`}>
                  <div className={`mb-2 flex items-center gap-2 ${palette.itemLabel}`}>
                    <PinSpinner size={14} />
                    <span className="font-medium">In active development</span>
                  </div>
                  {item}
                </div>
              ))}
            </div>

            <Separator />

            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <InlineSpinner text={statusText} />
              <Button className={palette.cta}>{ctaLabel}</Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

// 'use client';

// import * as React from 'react';
// import { DocNearLogo } from '../logo/docnear-logo';
// import { cn } from '@/lib/utils';

// // ── types ────────────────────────────────────────────────────────────────────

// type AccentColor = 'teal' | 'emerald' | 'cyan' | 'blue' | 'violet';

// interface WorkInProgressPageProps {
//   /** Small label shown in the pill badge above the title e.g. "Admin Portal" */
//   portalLabel?: string;
//   /** Tiny uppercase eyebrow text above the title e.g. "Platform Update" */
//   eyebrow?: string;
//   /** Normal-weight prefix of the main heading e.g. "Admin Web Is" */
//   titlePrefix?: string;
//   /** Bold, coloured part of the heading e.g. "Work In Progress" */
//   titleHighlight?: string;
//   /** Paragraph below the heading */
//   description?: string;
//   /** Up to 3–4 bullet features being built */
//   items?: string[];
//   /** Small status ticker text at the bottom */
//   statusText?: string;
//   /** CTA button label */
//   ctaLabel?: string;
//   /** CTA click handler — defaults to a no-op */
//   onCtaClick?: () => void;
//   /** Brand accent colour */
//   accent?: AccentColor;
// }

// // ── accent map ───────────────────────────────────────────────────────────────

// const ACCENT: Record<
//   AccentColor,
//   {
//     ring: string;
//     bg: string;
//     text: string;
//     pill: string;
//     dot: string;
//     btn: string;
//     btnHover: string;
//   }
// > = {
//   teal: {
//     ring: 'ring-teal-500/20',
//     bg: 'bg-teal-50',
//     text: 'text-teal-700',
//     pill: 'bg-teal-100 text-teal-700 ring-1 ring-teal-200',
//     dot: 'bg-teal-500',
//     btn: 'bg-teal-600',
//     btnHover: 'hover:bg-teal-700',
//   },
//   emerald: {
//     ring: 'ring-emerald-500/20',
//     bg: 'bg-emerald-50',
//     text: 'text-emerald-700',
//     pill: 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200',
//     dot: 'bg-emerald-500',
//     btn: 'bg-emerald-600',
//     btnHover: 'hover:bg-emerald-700',
//   },
//   cyan: {
//     ring: 'ring-cyan-500/20',
//     bg: 'bg-cyan-50',
//     text: 'text-cyan-700',
//     pill: 'bg-cyan-100 text-cyan-700 ring-1 ring-cyan-200',
//     dot: 'bg-cyan-500',
//     btn: 'bg-cyan-600',
//     btnHover: 'hover:bg-cyan-700',
//   },
//   blue: {
//     ring: 'ring-blue-500/20',
//     bg: 'bg-blue-50',
//     text: 'text-blue-700',
//     pill: 'bg-blue-100 text-blue-700 ring-1 ring-blue-200',
//     dot: 'bg-blue-500',
//     btn: 'bg-blue-600',
//     btnHover: 'hover:bg-blue-700',
//   },
//   violet: {
//     ring: 'ring-violet-500/20',
//     bg: 'bg-violet-50',
//     text: 'text-violet-700',
//     pill: 'bg-violet-100 text-violet-700 ring-1 ring-violet-200',
//     dot: 'bg-violet-500',
//     btn: 'bg-violet-600',
//     btnHover: 'hover:bg-violet-700',
//   },
// };

// // ── animated dots ─────────────────────────────────────────────────────────────

// function PulsingDots({ dotClass }: { dotClass: string }) {
//   return (
//     <span className="inline-flex items-center gap-1" aria-hidden="true">
//       {[0, 1, 2].map((i) => (
//         <span
//           key={i}
//           className={cn('size-1.5 rounded-full opacity-40', dotClass)}
//           style={{ animation: `wip-bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
//         />
//       ))}
//       <style>{`
//         @keyframes wip-bounce {
//           0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
//           40%            { transform: translateY(-4px); opacity: 1; }
//         }
//       `}</style>
//     </span>
//   );
// }

// // ── grid decoration ───────────────────────────────────────────────────────────

// function GridDecoration() {
//   return (
//     <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
//       {/* Dot grid */}
//       <svg
//         className="absolute inset-0 h-full w-full opacity-[0.035]"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <defs>
//           <pattern id="wip-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
//             <circle cx="1" cy="1" r="1" fill="currentColor" />
//           </pattern>
//         </defs>
//         <rect width="100%" height="100%" fill="url(#wip-dots)" />
//       </svg>
//       {/* Soft radial glow top-right */}
//       <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-linear-to-br from-white/60 to-transparent blur-3xl" />
//     </div>
//   );
// }

// // ── check icon ────────────────────────────────────────────────────────────────

// function CheckIcon({ className }: { className?: string }) {
//   return (
//     <svg
//       viewBox="0 0 16 16"
//       fill="none"
//       className={cn('size-4 shrink-0', className)}
//       aria-hidden="true"
//     >
//       <circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.3" />
//       <path
//         d="M5 8.5l2 2 4-4"
//         stroke="currentColor"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// }

// // ── main component ────────────────────────────────────────────────────────────

// export function WorkInProgressPage({
//   portalLabel = 'DocNear',
//   eyebrow = 'Coming Soon',
//   titlePrefix = 'This page is',
//   titleHighlight = 'Work In Progress',
//   description = 'We are actively building this section. Check back soon.',
//   items = [],
//   statusText = 'Building...',
//   ctaLabel = 'Notify Me',
//   onCtaClick,
//   accent = 'teal',
// }: WorkInProgressPageProps) {
//   const a = ACCENT[accent];
//   const [clicked, setClicked] = React.useState(false);

//   const handleCta = () => {
//     setClicked(true);
//     onCtaClick?.();
//     setTimeout(() => setClicked(false), 2500);
//   };

//   return (
//     <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-4 py-16">
//       <GridDecoration />

//       {/* ── content card ── */}
//       <div
//         className={cn(
//           'relative z-10 w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl shadow-gray-100',
//           'ring-1',
//           a.ring,
//         )}
//       >
//         {/* Logo + portal label */}
//         <div className="mb-6 flex items-center justify-between">
//           <DocNearLogo size="sm" />
//           <span className={cn('rounded-full px-3 py-1 text-xs font-medium', a.pill)}>
//             {portalLabel}
//           </span>
//         </div>

//         {/* Eyebrow */}
//         <p className={cn('mb-2 text-xs font-semibold uppercase tracking-widest', a.text)}>
//           {eyebrow}
//         </p>

//         {/* Heading */}
//         <h1 className="mb-4 text-balance text-3xl font-semibold leading-tight tracking-tight text-gray-900">
//           {titlePrefix} <span className={cn('font-bold', a.text)}>{titleHighlight}</span>
//         </h1>

//         {/* Description */}
//         <p className="mb-6 text-sm leading-relaxed text-gray-500">{description}</p>

//         {/* Feature list */}
//         {items.length > 0 && (
//           <ul className="mb-7 space-y-2.5">
//             {items.map((item) => (
//               <li key={item} className="flex items-center gap-2.5 text-sm text-gray-600">
//                 <CheckIcon className={a.text} />
//                 {item}
//               </li>
//             ))}
//           </ul>
//         )}

//         {/* CTA button */}
//         <button
//           onClick={handleCta}
//           className={cn(
//             'inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-2.5',
//             'text-sm font-semibold text-white transition-all duration-200',
//             clicked ? 'bg-gray-400' : cn(a.btn, a.btnHover),
//             'focus-visible:outline-2 focus-visible:outline-offset-2',
//           )}
//         >
//           {clicked ? (
//             <>
//               <svg viewBox="0 0 16 16" fill="none" className="size-4" aria-hidden="true">
//                 <path
//                   d="M3 8.5l3 3 7-7"
//                   stroke="white"
//                   strokeWidth="1.8"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//               You&apos;re on the list!
//             </>
//           ) : (
//             ctaLabel
//           )}
//         </button>

//         {/* Status ticker */}
//         <div className="mt-5 flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2">
//           <PulsingDots dotClass={a.dot} />
//           <p className="truncate text-xs text-gray-400">{statusText}</p>
//         </div>
//       </div>

//       {/* Footer */}
//       <p className="relative z-10 mt-8 text-xs text-gray-300">
//         © {new Date().getFullYear()} DocNear · India 🇮🇳
//       </p>
//     </main>
//   );
// }
