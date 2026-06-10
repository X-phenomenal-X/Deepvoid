// NASA Exoplanet Archive TAP service. We pull the 300 most recently
// discovered confirmed planets with the columns we display.
const QUERY = encodeURIComponent(
  "select top 300 pl_name,hostname,disc_year,discoverymethod,pl_rade,pl_bmasse,pl_orbper,pl_eqt,sy_dist from ps where default_flag=1 and sy_dist is not null order by disc_year desc"
);

export async function getExoplanets() {
  try {
    const res = await fetch(
      `https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=${QUERY}&format=json`,
      { next: { revalidate: 86400 } } // refresh once a day
    );
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}
