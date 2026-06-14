# GearSignal

GearSignal is a static Next.js content site for practical Amazon gear buying
guides. It is built to support affiliate program review with public editorial
pages, product-focused review content, a disclosure policy, privacy policy, and
terms.

## Live Site

The GitHub Pages deployment target is:

```text
https://liqk2014.github.io/gearsignal/
```

## Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS 4
- Local MDX content
- Static export for GitHub Pages

## Local Commands

```bash
npm install
npm run lint
npm run build
```

For a GitHub Pages-compatible local build:

```bash
NEXT_PUBLIC_BASE_PATH=/gearsignal NEXT_PUBLIC_SITE_URL=https://liqk2014.github.io/gearsignal npm run build
```

## Content

Review content lives in `src/content/reviews`. Shortlist content lives in
`src/content/best`. The public trust pages are under `src/app/about`,
`src/app/contact`, `src/app/disclosure`, `src/app/privacy`, and `src/app/terms`.

Affiliate URLs are currently non-tracked placeholders and should be replaced
with approved partner deep links after network approval.
