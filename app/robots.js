export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://deepvoid.vercel.app/sitemap.xml" // change after deploy
  };
}
