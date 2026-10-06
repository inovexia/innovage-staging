# Innovage — Next.js site

Rebuild of <https://innovagesoft.com> in Next.js (App Router, plain JavaScript) with three.js animation.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Structure

- `app/` — routes: home, about, services (+ `/services/[slug]`), teckhub360, case-studies, industries, process, blog, contact, terms, privacy
- `components/three/HeroScene.js` — home hero WebGL orb (shader noise, particle ring, star field, pointer + scroll reactive)
- `components/three/WaveScene.js` — inner-page header particle wave
- `components/Effects.js` — scroll reveal (`data-reveal`), spotlight (`.spot`), tilt (`data-tilt`), magnetic buttons (`data-magnetic`), scroll progress
- `lib/data.js` — all site content (menu, services, process, stats, clients, industries, case studies, posts)
- `app/globals.css` — design tokens and styles

## Content still to finalize (marked `TODO` in code)

- TeckHub360 product copy
- Industries list and case study details (placeholder copy)
- Blog articles in `lib/posts.js` are launch drafts — review before publishing. Covers live in `public/images/blog/<slug>.webp` (1600×900)
- Terms & Privacy page text
- Contact form currently opens the visitor's email client — connect an API route or form service to send directly
