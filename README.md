# Rawaya Sohar Global — Angular → Next.js migration

This is a like-for-like migration of the `rawaya-solar` Angular (v22, SSR) project to
Next.js 15 + React 19 + TypeScript, using the App Router. There is still no backend, no
API, no database, and no authentication — this is, and remains, a UI-only site.

## Final Next.js folder structure

```
rawaya-solar-next/
├─ app/
│  ├─ layout.tsx          # <html>/<head>, global metadata, favicon, font <link>
│  ├─ globals.css         # site-wide reset (scroll-behavior, box-sizing)
│  ├─ page.tsx            # "/" -> redirect("/home")
│  └─ home/
│     └─ page.tsx         # "/home" route, page-level metadata, composes the sections
├─ components/
│  └─ home/
│     ├─ HomeShell.tsx    # client: scroll-spy + IntersectionObserver reveal effect
│     ├─ Navbar.tsx       # nav + logo + CSS-only mobile menu
│     ├─ Hero.tsx
│     ├─ About.tsx
│     ├─ Divisions.tsx    # "products" section
│     ├─ Services.tsx
│     ├─ WhyUs.tsx        # "why" (vision & mission) section
│     ├─ Contact.tsx      # info column + <ContactForm />
│     ├─ ContactForm.tsx  # client: the only other interactive piece (button state)
│     └─ home.scss        # full ported stylesheet, scoped under `.home-page`
├─ lib/
│  └─ site-content.ts     # all copy/data (nav links, stats, products, services, etc.)
├─ types/
│  └─ content.ts          # TS interfaces for the data above
├─ public/
│  ├─ favicon.ico
│  └─ assets/             # every file from src/app/assets, copied as-is
├─ package.json
├─ tsconfig.json
├─ next.config.ts
├─ .eslintrc.json
└─ .gitignore
```

## Angular → Next.js migration map

| Angular | Next.js | Notes |
|---|---|---|
| `app.routes.ts`: `{ path: '', redirectTo: 'home' }` | `app/page.tsx` | Uses `redirect()` from `next/navigation` |
| `app.routes.ts`: `{ path: 'home', component: Home }` | `app/home/page.tsx` | Server Component; owns page `<title>`/meta |
| `App` (`app.ts` / `app.html` / `app.scss`) | `app/layout.tsx` | Root shell; `app.scss` was empty, nothing to port |
| `index.html` `<head>` | `app/layout.tsx` metadata + `<link>` | Title, favicon, Google Fonts link preserved |
| `Home` component — template (`home.html`) | `components/home/*.tsx` | Split into one component per section (see below) |
| `Home` component — behavior (`home.ts`) | `HomeShell.tsx` + `ContactForm.tsx` | See "Interactive pieces" below |
| `Home` component — styles (`home.scss`) | `components/home/home.scss` | Rescoped from `:host` to `.home-page` (see below) |
| `src/styles.scss` (global, `app-home`-prefixed rules) | appended to `components/home/home.scss` | Rescoped from `app-home` to `.home-page` |
| `src/app/assets/*` | `public/assets/*` | Copied verbatim, referenced via `/assets/...` |
| `public/favicon.ico` | `public/favicon.ico` | Unchanged |

**Why one Angular template became several React components:** `home.html` was a single
387-line template covering nav, hero, about, products, services, why-us, contact, and
footer. It's split into one file per section for maintainability, exactly the way the
"adapt the structure" instruction intends — no content, section, or behavior was added,
removed, or reordered.

## List of migrated pages

- `/` — redirects to `/home` (was `''` → `redirectTo: 'home'` in Angular)
- `/home` — the entire single-page site (nav, hero, about, divisions, services,
  vision & mission, contact, footer), matching `rawayasohar.com/home`

## List of migrated components

`Navbar`, `Hero`, `About`, `Divisions`, `Services`, `WhyUs`, `Contact`, `ContactForm`,
`Footer`, `HomeShell` (the client-side effect wrapper — has no Angular equivalent by
name; it exists only to host the two `useEffect` hooks described below).

## List of reused assets

Every file under Angular's `src/app/assets/` was copied into `public/assets/` unchanged:
`rawaya-logo.png`, `logo.png`, `17.png`, `18.png`, `19.png`, `quality-food-products.png`,
`infrastructure-project-supply.png`, `generators-compressors-diesel.png`,
`trade-logistics-execution.png`, `foodstuff-icon.svg`, `1.jpg`–`13.jpg`, plus
`favicon.ico`. Only `rawaya-logo.png`, `17.png`, `19.png`, and the four division icon
PNGs are actually referenced by the markup — the rest (`logo.png`, `18.png`,
`foodstuff-icon.svg`, `1.jpg`–`13.jpg`) were already unused in the Angular template and
are carried over only so nothing gets silently dropped.

## Interactive pieces (the part that needed real thought)

Angular's `Home` component (`home.ts`) did three things in the browser:

1. **Scroll-spy** — on scroll, find the last section whose top has been passed and
   color its matching nav link.
2. **Reveal-on-scroll** — fade/slide in `.pillar`, `.service-item`, `.why-item`, and
   `.product-card` elements via `IntersectionObserver`.
3. **Mobile nav menu** — a checkbox + `label` + CSS sibling-selector trick. **This one
   needed no porting at all** — it's pure CSS, no JavaScript, so it moved over unchanged
   in `home.scss` and needed no React state.

(1) and (2) are ported verbatim into `HomeShell.tsx`'s `useEffect`, using a `ref` on the
wrapping `<div className="home-page">` in place of Angular's `ElementRef`. Angular
guarded this code with `isPlatformBrowser(this.platformId)` because the app is
server-rendered and `ngAfterViewInit` runs during SSR too; in React, `useEffect` never
runs during SSR, so that guard has no equivalent and was simply omitted.

4. **Contact form submit** (`onFormSubmit`) — swapped the button's text/background for
   3 seconds, no real submission, no validation existed in the source. Ported into
   `ContactForm.tsx` as a real `onSubmit` handler with local `useState`, with a `TODO`
   marking exactly where a future `fetch()` call would go. No fake API call was added.

### Server vs. Client Components

Only `HomeShell.tsx` and `ContactForm.tsx` are Client Components (`"use client"`).
Every section component (`Navbar`, `Hero`, `About`, `Divisions`, `Services`, `WhyUs`,
`Contact`, `Footer`) is a plain Server Component, composed as `children` of `HomeShell`
from the Server Component `app/home/page.tsx` — so they render on the server and ship
no extra client JS, while `HomeShell` stays a thin client wrapper that only owns the two
effects above.

### Stylesheet scoping

Angular's `ViewEncapsulation.Emulated` (the default) rewrites every selector in
`home.scss` to only match elements inside that component's own template — effectively
"every selector, plus `:host`, gets scoped to this component" — even for `* { }` or bare
element selectors. There's no equivalent in plain CSS, so `home.scss` was programmatically
rewritten (script-assisted, not by hand, to avoid missing any of the ~150 rules) so that:

- `:host { ... }` → `.home-page { ... }` (design tokens / CSS custom properties)
- every other selector gets `.home-page ` prepended as an ancestor, e.g.
  `.hero-title { }` → `.home-page .hero-title { }`, `section { }` → `.home-page section { }`

The wrapping `<div className="home-page">` in `HomeShell.tsx` plays the same role
Angular's `<app-home>` host element did. Rule count was verified identical before/after
(150 top-level rules) with no double-scoped or missed selectors.

`src/styles.scss` had a handful of global, `app-home`-prefixed overrides (mostly extra
mobile breakpoints); those were rescoped the same way (`app-home` → `.home-page`) and
appended to the end of `home.scss` — order matters here, since two of those rules
override earlier breakpoint values, and appending at the end preserves that precedence.

## Required npm packages

Already declared in `package.json`:

- `next`, `react`, `react-dom`
- Dev: `typescript`, `@types/node`, `@types/react`, `@types/react-dom`, `eslint`,
  `eslint-config-next`, `sass` (needed because `home.scss` is Sass, not plain CSS)

## Required commands

```bash
npm install
npm run dev     # http://localhost:3000 (redirects to /home)
npm run build
npm run start
```

## Manual steps for you to do

1. **Run `npm install` and `npm run build` yourself** — this container has no network
   access, so none of this was installed or compiled here. Everything was hand-written
   and cross-checked against the Angular source, but treat the first local build as the
   real verification step, especially for TypeScript errors and any Next.js version-
   specific API changes since this was written.
2. **Fill in real contact details.** `+968 XXXXXXXX` and `info@rawayssohar.com` are
   copied verbatim from the Angular source (including what looks like a typo in the
   email domain — `rawayssohar.com` vs. the live site's `rawayasohar.com`). Fix these in
   `lib/site-content.ts` if they're wrong.
3. **Decide what to do with the unused assets** (`logo.png`, `18.png`,
   `foodstuff-icon.svg`, `1.jpg`–`13.jpg`) — they were already unreferenced in the
   Angular version; kept here for parity, safe to delete if you don't need them.
4. **Wire up the contact form** to a real backend when one exists — the `TODO` in
   `ContactForm.tsx` marks exactly where.
5. Compare side-by-side against `https://www.rawayasohar.com/home` after your first
   build, since visual QA wasn't possible in this environment.

## Known limitations

- **Not built or run in this environment.** No network access here means no
  `npm install`/`next build`/`next dev` was actually executed — this is unusually
  important to flag for a from-scratch rewrite like this one, since it means no compiler
  or linter has verified any of it yet.
- The two Google Fonts (`Cormorant Garamond`, `Outfit`) are loaded in `<head>` for
  parity with `index.html`, but no CSS in the project (Angular or this port) actually
  applies them anywhere — `home.scss` uses `Inter`. This looks like leftover config on
  the Angular side, preserved as-is rather than "fixed."
- Three CSS classes in the ported global overrides (`.project-frame`, `.hero-card`,
  `.crane-line`) don't correspond to any element in the current markup. They're almost
  certainly dead rules from an earlier design iteration; ported verbatim per the
  "don't omit" instruction, and are currently inert either way.
- The contact form has no validation or error/success states beyond the button
  text/color swap, because none existed in the Angular source to preserve.
