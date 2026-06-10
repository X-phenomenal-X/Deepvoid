const KEY = process.env.NASA_API_KEY || "DEMO_KEY";

export async function getAPOD() {
  try {
    const res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${KEY}&thumbs=true`,
      { next: { revalidate: 3600 } } // re-fetch at most once per hour
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
