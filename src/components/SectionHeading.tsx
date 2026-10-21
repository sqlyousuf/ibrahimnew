import type { ReactNode } from "react";

/**
 * The one heading treatment used across the site: an optional calligraphic
 * Arabic mark, a diamond eyebrow, then the serif title. `tone` flips the
 * palette for midnight sections.
 */
export default function SectionHeading({
  arabic,
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  as: Tag = "h2",
  className = "",
}: {
  /** A short Arabic word or phrase set in Ruq'ah above the eyebrow. */
  arabic?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const dark = tone === "dark";
  const centered = align === "center";

  return (
    <div className={`${centered ? "mx-auto text-center" : ""} ${className}`}>
      {arabic && (
        // Direction lives on the inner span so the line still follows the
        // heading's alignment instead of snapping to the right edge.
        <p
          className={`arabic-accent text-[1.75rem] sm:text-[2rem] ${
            dark ? "text-gold-300/90" : "text-gold-600/90"
          }`}
        >
          <span lang="ar" dir="rtl">
            {arabic}
          </span>
        </p>
      )}
      {eyebrow && (
        <p
          className={`section-eyebrow ${arabic ? "mt-3" : ""} ${
            centered ? "justify-center" : ""
          } ${dark ? "text-gold-300 before:bg-gold-300" : ""}`}
        >
          {eyebrow}
        </p>
      )}
      <Tag
        className={`mt-3 text-balance font-display text-display-md font-semibold ${
          dark ? "text-cream-50" : "text-navy-900"
        }`}
      >
        {title}
      </Tag>
      {description && (
        <p
          className={`mt-4 text-[0.9375rem] leading-[1.75] sm:text-base ${
            centered ? "mx-auto max-w-xl" : "measure"
          } ${dark ? "text-cream-100/75" : "text-navy-700"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
