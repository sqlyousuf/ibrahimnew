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
