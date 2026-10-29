# Shafeq — Portfolio website

A fast, static portfolio site built from the "Shafeq — Portfolio" design canvas. Plain HTML, CSS and a small JavaScript file: there is **no build step**, so it deploys as-is to any static host.

## What's inside

```
.
├── index.html                 Home
├── work.html                  Work index (with working filters)
├── work/
│   ├── bridge.html            Case study: Bridge, GPU as a Service
│   ├── sovereign-ai.html      Case study: Sovereign AI / Azure Local
│   ├── fleet-operations.html  Case study: Satellite fleet operations
│   ├── nathan-digital.html    Case study: Building the design function
│   └── ai-design-systems.html Case study: AI-augmented design systems
├── editorial.html             Article index (filters + search)
├── article.html               Article template
├── book.html                  Book page
├── about.html                 About
├── contact.html               Contact (working form)
├── 404.html                   Not-found page
├── assets/
│   ├── images/                Photos, illustrations, book cover, social preview
│   └── js/main.js             Filters, search, contact form + site settings
├── favicon.svg
├── robots.txt, sitemap.xml    SEO
├── netlify.toml               Netlify config
├── vercel.json                Vercel config
└── .github/workflows/deploy-pages.yml   GitHub Pages auto-deploy
```

## Run it locally

Any static server works. With Node installed:

```bash
npm run dev        # http://localhost:3000
```

Or with Python: `python3 -m http.server 3000`.

## Before you go live: fill these in

| What | Where |
|---|---|
| Your email | `assets/js/main.js` (`contactEmail`) and the `mailto:` link in `contact.html` |
| Contact form service (optional) | `assets/js/main.js` (`formEndpoint`). Leave empty and the form opens the visitor's email app. For in-page sending, create a free form at [Formspree](https://formspree.io) and paste its URL. |
| LinkedIn / Instagram URLs | Search all `.html` files for `your-handle` |
| Your CV | Add it as `assets/Shafeq-CV.pdf` (the "Download CV" buttons point there) |
| Your domain | Replace `YOUR-DOMAIN` in `robots.txt` and `sitemap.xml` |
| Placeholders from the design | Text shown in yellow brackets, e.g. `[Years]`, `[Title]`, `[Date]`, `[Status]` |

## Deploy

### Option A: Netlify (easiest, drag and drop)
1. Go to <https://app.netlify.com/drop>.
2. Drag this whole folder onto the page. Done: you get a live URL in seconds.
3. To connect a Git repo instead: *Add new site → Import an existing project*, pick the repo, leave the build command empty and the publish directory as `.`.

### Option B: Vercel
1. Push this folder to a GitHub repository.
2. At <https://vercel.com/new>, import the repo. Framework preset: **Other**. No build command, output directory `.`.
3. Deploy. `vercel.json` turns on clean URLs (`/work` instead of `/work.html`).

Or from a terminal: `npx vercel` in this folder.

### Option C: GitHub Pages (free, from a repo)
1. Create a repository on GitHub and push this folder to the `main` branch.
2. In the repo: *Settings → Pages → Build and deployment → Source: **GitHub Actions***.
3. The included workflow deploys on every push to `main`. Your site appears at `https://<username>.github.io/<repo>/`.

All links in the site are relative, so it works from a sub-path like that as well as from a custom domain. (Only the 404 page links to `/`.)

### Option D: Cloudflare Pages
*Workers & Pages → Create → Pages → Connect to Git* (or *Upload assets*). Build command: none. Output directory: `/`.

### Custom domain
Every host above lets you add a domain under its *Domains* settings, then gives you the DNS records to add at your registrar. HTTPS is set up automatically.

## Editing content
Each page is a self-contained HTML file with its styles in the `<head>`, so you can open any page in an editor and change the text directly. Images live in `assets/images/`; replace a file with one of the same name to swap it.
