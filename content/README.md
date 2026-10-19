# Site content

All copy on the website lives in these JSON files. Edit a file, save, and the page updates (`npm run dev`) or picks up the change on the next build.

## Where things are

| File | What it holds |
| --- | --- |
| `pages/home.json` | Home page: hero, intro, "What We Build", TeckHub360 teaser, process intro, clients, testimonials and blog headings, closing CTA |
| `pages/about.json`, `contact.json`, `process.json`, `industries.json`, `teckhub360.json`, `not-found.json` | One file per page |
| `pages/services.json` | `/services` page, plus `detail`: the shared labels used on every `/services/<slug>` page |
| `pages/case-studies.json` | `/case-studies` page, plus `detail`: the shared labels used on every case study page |
| `pages/blog.json` | `/blog` page, plus `post`: the shared labels used on every article page |
| `pages/privacy-policy.json`, `terms-and-conditions.json` | Legal pages |
| `services.json` | Every service: menu/card text **and** its full detail page (benefits, deliverables, stack, FAQs). `caseStudies` lists client names from `case-studies.json`. Array order = order on the site |
| `case-studies.json` | Every case study and its detail page. Array order = order on the site |
| `blog-posts.json` | Every article. Newest first. Cover image goes in `public/images/blog/<slug>.webp` |
| `shared.json` | Content that appears on several pages: process stages, stats, solutions, client logos, testimonials |
| `site.json` | Company details (phone, email, address), main menu, footer, and the default CTA band used when a page doesn't set its own |

## Conventions

- **Gradient accent text:** wrap words in asterisks. `"What We *Build*"` renders "Build" in the brand gradient.
- **Placeholders:** `{service}` in `pages/services.json` → `detail` is replaced with the service's title.
- **`meta`:** the page's browser title and search/social description.
- **`cta`:** the closing "call to action" band on a page. `title`, `text` and `button` are all optional; anything left out falls back to `cta` in `site.json`.
- **`icon`:** must be one of the names defined in `components/Icon.js` (e.g. `cube`, `cloud`, `shield`, `users`).
- **`slug`:** the page URL (`/services/<slug>`). Changing it changes the URL, so avoid editing it once a page is live.
- **`_note`:** editor notes and TODOs. The site ignores them.
- JSON is strict: use double quotes, no trailing commas, and no comments. A typo here breaks the build, and the error message gives the file and line.
