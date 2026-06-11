// Ad slot — intentionally renders nothing until a real ad network (AdSense /
// Mediavine) is approved. Empty dashed placeholder boxes make the site look
// unfinished, so we hide them. When approved, swap `return null` for the
// network's script/snippet and restore a fixed height to avoid layout shift.
export default function AdSlot({ size = "banner" }) {
  return null;
}
