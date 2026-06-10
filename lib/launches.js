// The Space Devs Launch Library 2 — free tier allows ~15 calls/hour,
// so we cache for 1 hour with ISR. Covers NASA, SpaceX, ISRO, ESA and more.
export async function getNextLaunch() {
  try {
    const res = await fetch(
      "https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=1&mode=list",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.results?.[0] || null;
  } catch {
    return null;
  }
}
