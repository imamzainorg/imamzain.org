# imamzain.org

The public website of the **Imam Zayn al-Abidin (as) Foundation** — the
foundation's home on the web, presenting the life and heritage of Imam Zayn
al-Abidin, ʿAli ibn al-Husayn as-Sajjad (عليه السلام), alongside the
foundation's publications, media, research, and services.

## What visitors find here

- **His Life** — a biography of the Master of Prostrators (peace be upon him).
- **Digital library & publications** — browsable books and academic research
  with search, filtering, and downloads.
- **Media** — photo gallery and audio recitations.
- **Activities & news** — the foundation's posts, events, and the Baqi gathering.
- **Services & applications** — including proxy-visitation (نيابة الزيارة)
  requests and other foundation services.
- **Newsletter & contact forms** with a public links hub.

The site is fully multilingual and localized, with SEO (sitemap, structured
metadata) built in.

## Scope & architecture

- Built with **Next.js** (App Router) and **React**, styled with **Tailwind CSS**
  and **HeroUI**, with motion via **Framer Motion** and smooth scrolling via
  **Lenis**.
- Deployed on **Cloudflare Workers** (via Wrangler/OpenNext).
- Consumes the foundation's [ImamZain API](https://github.com/imamzainorg/api.imamzain.org)
  for all content, and is administered through the
  [CMS](https://github.com/imamzainorg/cms.imamzain.org).
