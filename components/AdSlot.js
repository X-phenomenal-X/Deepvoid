// Responsive ad placeholder. When you're approved for AdSense or Mediavine,
// replace the inner div with the script they give you. Keeping fixed heights
// now prevents layout shift later (good for SEO Core Web Vitals).
export default function AdSlot({ size = "banner" }) {
  const heights = { banner: "h-24", box: "h-64" };
  return (
    <div
      className={`flex ${heights[size]} items-center justify-center rounded border border-dashed border-hairline text-[10px] font-mono uppercase tracking-widest text-dim/50`}
      aria-hidden="true"
    >
      ad slot
    </div>
  );
}
