"use client";

// Client wrapper so a broken image URL hides itself instead of showing
// a broken-image icon (onError isn't allowed in server components).
export default function MissionPhoto({ src, alt }) {
  if (!src) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={(e) => { e.currentTarget.style.display = "none"; }}
      className="aspect-square w-full rounded-lg border border-hairline bg-void/60 object-contain p-2"
    />
  );
}
