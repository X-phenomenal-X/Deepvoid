# DeepVoid 🛰️

Live trackers, real NASA data, and a publishing engine for deep space exploration.

## What's inside

| Feature | Where | Data source |
|---|---|---|
| Live Voyager 1 & 2 odometers | Homepage | Calculated from NASA/JPL epoch data (no API needed) |
| Astronomy Picture of the Day | Homepage | NASA APOD API (cached 1 hr) |
| Next launch countdown | Homepage | The Space Devs Launch Library 2 (cached 1 hr) |
| ISS live position | Homepage | wheretheiss.at (polled every 5 s in browser) |
| Mission Explorer | /missions | Curated in `lib/missions.js` — edit the file to add missions |
| Exoplanet database (searchable) | /exoplanets | NASA Exoplanet Archive (cached 24 hr) |
| Blog ("Dispatches") | /blog | Markdown files in `content/posts/` |
| Newsletter capture, ad slots | Everywhere | Placeholders ready to wire up (below) |

## Run it locally (first time)

1. **Install Node.js** (v18 or newer) from https://nodejs.org — the LTS button.
2. Open a terminal in this folder and run:
   ```bash
   npm install     # downloads the libraries (one time, ~2 min)
   npm run dev     # starts the site
   ```
3. Open http://localhost:3000 — you should see the Voyager counter ticking.

The site works immediately with NASA's `DEMO_KEY`. For real traffic:
1. Get a free key at https://api.nasa.gov (takes 30 seconds).
2. Copy `.env.example` to a new file named `.env.local` and paste your key in.

## Deploy free on Vercel

1. Push this folder to a GitHub repository (GitHub Desktop is the easiest way if you're new to git).
2. Go to https://vercel.com → sign in with GitHub → "Add New Project" → pick your repo → Deploy. That's it.
3. Add `NASA_API_KEY` under Project → Settings → Environment Variables.
4. Search for `deepvoid.vercel.app` in the code and replace with your real domain (3 spots: `app/layout.js`, `app/sitemap.js`, `app/robots.js`).

Every time you push to GitHub, Vercel redeploys automatically.

## Publishing an article

Create a new file in `content/posts/`, e.g. `my-article.md`:

```markdown
---
title: "Your headline"
date: "2026-06-15"
excerpt: "One sentence shown on the blog index and in Google results."
---

Your article in plain markdown. ## makes a heading, **bold** works, etc.
```

Push it. It's live, in the sitemap, and SEO-tagged automatically.

## Wiring up monetization (when ready)

**Newsletter (do this first — it's free):** Create a free Beehiiv or ConvertKit account, get your form's POST endpoint, and replace the `console.log` in `components/NewsletterSignup.js` with a `fetch` to that endpoint. The email list is the most valuable asset this site will build.

**Affiliate links:** Join Amazon Associates (amazon.ca for Canadian traffic). Add product mentions inside blog posts as normal markdown links with your tag. Gear-review articles ("best beginner telescopes under $500") convert best.

**Display ads:** Apply to Google AdSense once you have ~20 articles and steady traffic. Replace the inner div in `components/AdSlot.js` with their script. At ~50k sessions/month, apply to Mediavine — roughly 5–10× the RPM.

**DeepVoid Pro (later):** The architecture supports adding Stripe + auth without rework — gate premium pages in a new `app/pro/` folder.

## Project structure (30-second tour)

```
app/         → pages (folder name = URL)
components/  → reusable UI pieces
lib/         → API calls and math (no visuals)
content/     → your articles
```

Components marked `"use client"` at the top run in the visitor's browser (anything that ticks or filters live). Everything else runs on the server and gets cached — that's what ISR ("incremental static regeneration") means, and it's why the site stays fast and within free API limits.

## Updating the Voyager epoch (once a year, optional)

The trackers extrapolate from a known position. Drift is tiny, but for maximum accuracy check NASA's mission status page yearly and update `epochKm` / `epochMs` in `lib/voyager.js`.
