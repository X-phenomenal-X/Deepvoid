import { getAPOD } from "@/lib/nasa";

export default async function ApodCard() {
  const apod = await getAPOD();
  if (!apod) {
    return (
      <div className="rounded-lg border border-hairline bg-panel p-6 text-sm text-dim">
        NASA&apos;s picture of the day is unavailable right now. It refreshes
        automatically — check back shortly.
      </div>
    );
  }

  const img = apod.media_type === "video" ? apod.thumbnail_url : apod.url;

  return (
    <article className="overflow-hidden rounded-lg border border-hairline bg-panel">
      {img && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={img} alt={apod.title} className="aspect-video w-full object-cover" />
      )}
      <div className="p-6">
        <p className="font-mono text-[10px] uppercase tracking-widest text-signal">
          NASA astronomy picture of the day · {apod.date}
        </p>
        <h3 className="mt-2 font-display text-xl text-starlight">{apod.title}</h3>
        <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-dim">
          {apod.explanation}
        </p>
      </div>
    </article>
  );
}
