/**
 * Shared geometric decorations drawn from the masjid logo's vocabulary:
 * the eight-point star (khatim) and the onion-dome arch of the minaret.
 * All are decorative and hidden from assistive tech.
 */

/** Eight-point star built from two overlapping squares. */
export function StarGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
    >
      <rect x="4.5" y="4.5" width="15" height="15" />
      <rect x="4.5" y="4.5" width="15" height="15" transform="rotate(45 12 12)" />
    </svg>
  );
}

/**
 * Horizontal rule with a centred star — used to close long-form sections
 * instead of a plain border.
 */
export function StarDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-4 ${className}`}
      aria-hidden="true"
    >
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold-500/50 sm:w-20" />
      <StarGlyph className="h-4 w-4 shrink-0 text-gold-500" />
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold-500/50 sm:w-20" />
    </div>
  );
}

/**
 * Repeating star texture, positioned absolutely inside a clipped parent.
 * Kept very low contrast — it should read as paper texture, not wallpaper.
 */
export function PatternField({
  className = "",
  opacity = 0.06,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pattern-stars pointer-events-none absolute inset-0 ${className}`}
      style={{ opacity }}
    />
  );
}

/**
 * Sixteen-point rosette: two eight-point stars, one turned 22.5°, circled
 * by an inner and outer ring. Large, faint, and slow-turning behind hero
 * type — the geometric counterpart to the calligraphy.
 */
export function Rosette({ className = "" }: { className?: string }) {
  const star = (rotate: number) => (
    <g transform={`rotate(${rotate} 100 100)`}>
      <rect x="44" y="44" width="112" height="112" />
      <rect x="44" y="44" width="112" height="112" transform="rotate(45 100 100)" />
    </g>
  );
  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.6"
    >
      <circle cx="100" cy="100" r="96" />
      <circle cx="100" cy="100" r="92" strokeDasharray="1 3" />
      {star(0)}
      {star(22.5)}
      <circle cx="100" cy="100" r="40" />
      <g transform="rotate(11.25 100 100)">
        <rect x="72" y="72" width="56" height="56" />
        <rect x="72" y="72" width="56" height="56" transform="rotate(45 100 100)" />
      </g>
      <circle cx="100" cy="100" r="6" />
    </svg>
  );
}

/**
 * Mihrab outline — the onion-dome arch from the logo drawn as a double gold
 * line, used to frame hero content.
 */
export function ArchOutline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 300"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
      className={className}
      fill="none"
      stroke="currentColor"
      vectorEffect="non-scaling-stroke"
    >
      <path
        d="M4 298 V120 C4 64 60 40 100 4 C140 40 196 64 196 120 V298"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M14 298 V124 C14 74 64 52 100 18 C136 52 186 74 186 124 V298"
        strokeWidth="0.6"
        opacity="0.55"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** The masjid's calligraphic mark, gilded — see `.logo-foil` in globals.css. */
export function LogoMark({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`logo-foil block ${className}`} />;
}
