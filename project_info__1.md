# SAFRON TECHNOLOGY Website — Codebase Overview

## Summary

A single-page marketing and product-catalogue site for SAFRON TECHNOLOGY, a Bangladeshi fire-protection and electrical-safety engineering contractor. It presents 93 products across 5 categories, 30 completed projects, 8 partner brands and 8 services, with enquiry flows that route to WhatsApp rather than a backend.

There is **no server, no database and no API**. Every "record" is a typed TypeScript literal array compiled into the bundle. This single fact explains most of the codebase's shape — and causes its most visible bug.

## Architecture

**Pattern:** client-rendered SPA with a static, module-level data layer. Effectively a three-layer stack:

1. **Data layer** — `src/data/*.ts`, plain exported arrays plus helper functions. Loaded synchronously at import time.
2. **Page layer** — `src/pages/*.tsx`, one component per route. Each page imports the arrays it needs and filters/counts them locally.
3. **Presentation layer** — `src/components/*`, dumb-ish cards (`ProductCard`, `ProjectCard`, `ServiceCard`) driven by props.

**Stack:**
- React 19.3 with React Router 7.18 (`BrowserRouter` + nested `Route` with a shared `MainLayout` outlet).
- Vite 8.3 build, TypeScript 7.0.2 (`tsc -b && vite build`), `type: "module"`.
- Tailwind CSS 4.3 via `@tailwindcss/vite`, but the bulk of styling is hand-written CSS in `src/index.css` (~large file, 727-line diff recently) using custom properties, not utility classes.
- Animation: `framer-motion` (page transitions, drawers, dropdowns), `gsap` + `@gsap/react` (scroll-driven logo scaling), `lenis` (smooth scroll), plus a custom `custom-cursor.tsx`.
- Icons: `lucide-react`, re-exported through an `ICON_MAP` in the data files so data can name icons as strings.
- `oxlint` for linting. **No test runner exists.**

**Execution entry:** `index.html` → `src/main.tsx` (`createRoot` + `StrictMode`) → `src/App.tsx` (router table) → `MainLayout` (Navbar/Outlet/Footer) → a page component.

## Directory Structure

```
e:/Website/
├── index.html                  — Vite entry, mounts #root
├── vite.config.ts              — React + Tailwind plugins
├── tsconfig.app.json           — bundler resolution, verbatimModuleSyntax, noEmit
├── package.json                — scripts: dev / build / lint / preview
├── src/
│   ├── main.tsx                — createRoot, StrictMode
│   ├── App.tsx                 — all routes; note the 5 hardcoded category routes
│   ├── index.css               — nearly all real styling (design tokens, sections, cards)
│   ├── layouts/
│   │   └── MainLayout.tsx      — CustomCursor + Navbar + animated Outlet + Footer
│   ├── pages/                  — one file per route
│   │   ├── Home.tsx            — 9 inline section components (marquee, intro, services,
│   │   │                          products, projects, why-choose, industries, CTA)
│   │   ├── Products.tsx        — catalogue with resizable sidebar, filters, URL sync
│   │   ├── ProductDetail.tsx   — slug lookup, specs table, related products
│   │   ├── Brands.tsx / BrandDetail.tsx
│   │   ├── Projects.tsx / ProjectDetail.tsx
│   │   ├── Services.tsx / ServiceDetail.tsx
│   │   ├── ProductCatalogues.tsx, Resources.tsx, About.tsx, Contact.tsx
│   ├── components/
│   │   ├── Navbar.tsx          — route table + dropdown menus + mobile drawer
│   │   ├── Footer.tsx          — static link lists, no data imports
│   │   ├── ProductCard.tsx     — the only component that resolves a category label
│   │   ├── ProductInquiryForm.tsx, ContactForm.tsx, EmberParticles.tsx
│   │   ├── SectionTitle.tsx, ServiceCard.tsx, ProjectCard.tsx
│   │   └── ui/                 — Button, custom-cursor, use-gsap, use-lenis
│   └── data/                   — THE data layer (see below)
│       ├── products.ts         — 3,600+ lines: 93 products, 5 categories, helpers
│       ├── projects.ts         — 30 projects + brand cross-references
│       ├── services.ts         — 8 services
│       ├── brands.ts           — 8 brands (logos + descriptions)
│       ├── productsSource.ts   — NEW (unwired): raw-data gateway
│       ├── catalog.ts          — NEW (unwired): normalisation + alias map
│       └── selectors.ts        — NEW (unwired): pure counting/filtering functions
├── public/images/…             — product, project, brand and hero imagery
└── .kilo/                      — Kilo Code agent config (separate tool)
```

## Key Abstractions

### `Product` / `ProductCategory` (types)
- **File:** `src/data/products.ts` (lines ~35–100)
- **Responsibility:** the domain model. A product carries `id, slug, name, category, subcategory, brand?, model?, shortDescription, description, image, specifications[], features[], applications[], documents[], availability?, featured?, keywords?`, plus optional bespoke fields (`starterTypes`, `enclosureOptions`, `ledIndicators`, `operationalControls`).
- **Critical detail:** `category` is a **key** string (`'fire-protection-system'`), *not* a slug, *not* an object, *not* an array. `subcategory` is likewise a sub-category key.
- A category carries **both** `key` and `slug`, and for three of five categories those two strings differ.
- **Used by:** every page, every card.

### `productCategories`
- **File:** `src/data/products.ts` — 5 entries, each with `key`, `slug`, `label`, `icon`, `image`, `description` and 7–10 `subCategories`.
- **Responsibility:** the canonical category list *and* the canonical sub-category taxonomy. There is no separate taxonomy file.
- **Used by:** `Products.tsx` (sidebar), `App.tsx` (route definitions), `ProductCard` (label lookup via `findCategory`).

### The helper cluster in `products.ts`
- **File:** `src/data/products.ts` (tail of file, ~line 3600+)
- **Interface:** `getProductById`, `getProductBySlug`, `getProductsByCategory(key)`, `getProductsBySubCategory(key, sub)`, `findCategory(keyOrSlug)`, `findCategoryBySlug`, `findSubCategory`, `getProductCount(key?, sub?)`, `getCategoryProductCount(keyOrSlug)`, `getTotalProductCount`, `getProductIcon`, `slugify`.
- **Non-obvious trap:** `findCategory()` accepts either key or slug, but `getCategoryProductCount()` is named like it does too and **does not** — it compares `p.category === keyOrSlug` with no slug resolution. This asymmetry is the bug factory. See "Non-Obvious Behaviours".
- **Lifecycle:** module-level; pure functions over the module-level array.

### `brands.ts`
- **File:** `src/data/brands.ts` — 8 brands (`naffco, simplex, bosch, hochiki, sffco, siemens, patterson, notifier`) with logo paths.
- **Responsibility:** the *marketing* brand list. It is **not** the list of brands that products actually reference (products reference 16 distinct brands, including `Tyco`, `Viking`, `Eaton`, `3M`, `Assa Abloy`, `System Sensor`, `FireNET Plus`, `To Be Specified`). This divergence is user-visible — see below.

### `projects.ts`
- **File:** `src/data/projects.ts` — 30 projects. Each has `brands: string[]` holding **brand ids** (`'naffco'`, `'bosch'`, `'bosch'`…), plus `related: string[]` of project ids used for cross-linking.
- **Interface:** `getProjectById`, `getProjectsByBrand(brandSlug)`, `getBrandProjectCounts()`.
- **Note:** `brands: []` is valid and used (RMG, La Vista) meaning "no brand specified".

### `MainLayout`
- **File:** `src/layouts/MainLayout.tsx`
- **Responsibility:** chrome + page transition. Renders `CustomCursor`, `Navbar`, an `AnimatePresence` wrapper with `key="page"` (a fixed key, so the exit animation never actually fires — see below), and `Footer`.
- **Lifecycle:** mounted once for all child routes.

### `ProductCard`
- **File:** `src/components/ProductCard.tsx`
- **Responsibility:** the single place a product's category string becomes a human label: `findCategory(category)?.label || category`. Because `findCategory` accepts key *or* slug, this resolves correctly today — which masks the wider key/slug problem elsewhere.
- Also resolves brand → `/brands/:id` link by matching `brands[].name` case-insensitively against the product's brand string.

### The new (unwired) catalog layer
- **Files:** `src/data/productsSource.ts`, `src/data/catalog.ts`, `src/data/selectors.ts`
- **Responsibility (intended):** one gateway for raw data (`loadCatalog()`), one normalisation pass that gives every product a resolved `categoryKey` / `categorySlug` / `categoryName`, and one set of pure selectors (`getTotals`, `getCategoryCounts`, `getBrandCounts`, `getFeatured`, `getRelated`, `filterProducts`, `sortProducts`, `plural`, `formatCount`) that every page must use for numbers.
- **Status: written but not imported by anything.** No page uses it yet; there is no `CatalogProvider` and no `useCatalog()` hook. Treat it as a foundation, not as live behaviour.
