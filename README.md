# Dune Industries — Website

A static multi-page marketing site. **No build step, no server required** —
every page loads directly from the filesystem or any static host.

## Pages

| Page | Purpose |
|---|---|
| `Pre-Launch.html` | Flagship scroll-driven landing (6-phase animation, social-icon tether, click-transition to careers) |
| `careers.html` | Job listings with sort/filter, expandable descriptions, smooth scroll |
| `index.html` | Alternate DUNE landing (Thesis / Products / Careers layout) |
| `products.html` | Product page (Sandworm etc.) |
| `font-showcase.html` | General Sans typography sampler |
| `templates/testing-procedures-template.html` | Brand-styled SOP template |

All internal links between pages are **relative** — the site works whether
opened via `file://`, served locally, or hosted on GitHub Pages / Netlify /
Vercel / any static host.

## Run locally

Option 1 — just open the HTML files directly in your browser (no server):
```
Double-click Pre-Launch.html
```

Option 2 — with the included tiny static server:
```bash
npm install
node serve.mjs            # http://localhost:3000
```

## Deploy to GitHub Pages

1. Push the repo to GitHub.
2. Settings → Pages → **Source: Deploy from a branch** → **Branch: main / (root)**.
3. Wait ~30s. The site will be available at `https://<user>.github.io/<repo>/`.
4. Landing pages:
   - `/Pre-Launch.html` — the scroll experience
   - `/careers.html` — job listings
   - `/index.html` — the alternate landing (also the default at `/`)

If you want the pre-launch scroll experience to be the default entry, either:
- Rename `Pre-Launch.html` → `index.html` (backing up the current index first), or
- Replace `index.html` with a one-line meta-refresh redirect.

## Project structure

```
.
├── Pre-Launch.html             # Scroll-driven landing (React 18 + Babel + Tailwind, all via CDN)
├── careers.html                # Job listings + Lenis smooth scroll
├── index.html                  # Alternate landing
├── products.html               # Product page
├── font-showcase.html          # Typography sampler
├── colors_and_type.css         # Brand palette + General Sans @font-face rules
├── logo-letters/               # Per-glyph PNGs (D, U, N, E, crest) + manifest.json
├── brand_assets/               # Logo SVG/PNG variants + Sandworm imagery + full General Sans font family
├── fonts/                      # Self-hosted General Sans WOFF2 (used by colors_and_type.css)
├── templates/                  # Brand-styled document templates
└── serve.mjs                   # Tiny static file server for local dev
```

## Brand palette

| Token | Hex | Use |
|---|---|---|
| `--color-void` | `#100E0C` | near-black, deepest shadow |
| `--color-slag` | `#2E2820` | dark surface |
| `--color-sediment` | `#8B7355` | warm brown muted text |
| `--color-dune` | `#C9A97A` | warm sand, primary accent |
| `--color-bone` | `#EDE0C4` | bone |
| `--color-haze` | `#F7F2E8` | warm off-white |

Typography: **General Sans** (self-hosted WOFF2 in `fonts/`; Pre-Launch.html
also loads it via the Fontshare CDN for CDN-only deployment scenarios).
