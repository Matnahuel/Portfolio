# Matias Nahuel Carabajal · Portfolio

Personal site of Matias Nahuel Carabajal, Full Stack Developer & University Technician in Programming (React · Node.js · TypeScript · PostgreSQL · MongoDB).  
Live: https://matnahuel.github.io/Portfolio/

## Stack

- **Frontend & Markup:** Semantic HTML5, CSS3 modular (`base.css`, `layout.css`, `components.css`, `sections.css`, `animations.css`, `responsive.css`) and vanilla ES Modules (`main.js`, `navigation.js`, `translations.js`, `theme.js`, `phoneProjectCard.js`).
- **Bilingual Support (`ES` / `EN`):** Instant client-side translation dictionary in `assets/js/translations.js` with a compact pill toggle (`ES` / `EN`) and `localStorage` persistence.
- **Light & Dark Themes:** Theme switcher (`#theme-toggle`) persisting user selection in `localStorage` with CSS custom properties across desktop, tablet, and mobile.
- **Responsive Architecture:** Dedicated mobile and tablet overrides in `assets/css/responsive.css` (`@media (max-width: 1024px)` and `@media (max-width: 768px)`), keeping desktop layout isolated and preventing horizontal overflow.
- **Deployment & Custom Domain:** Hosted via GitHub Pages (`main` branch) with a root `CNAME` configuration and custom domain routing.

## Architecture Decisions

- **Decoupled Mobile & Desktop Rules:** Mobile and tablet layout adjustments live in `assets/css/responsive.css` without altering desktop styles, including a 5-slot mobile navigation bar with centered `MC` badge, reordered mobile footer blocks, and width containment (`max-width: 100%`, `min-width: 0`).
- **Modular JS Responsibilities:** Each behavior is isolated in its own module—language state in `translations.js`, dark/light mode in `theme.js`, section navigation in `navigation.js`, and interactive project cards in `phoneProjectCard.js`.
- **Single-Source Copy & Translations:** Headings, experience bullets, project details, and UI labels are mapped through `data-translate-key` attributes and synchronized across Spanish (`esp`) and English (`eng`).
- **Zero Heavy Framework Overhead:** Static asset delivery without runtime bundler bloat, keeping load times fast on mobile connections.
- **SEO & Social Metadata:** Open Graph tags, descriptive meta tags, and semantic landmarks (`<header>`, `<main>`, `<footer>`) in `index.html`.

## Getting Started

Run a local static server from the project root (`Portfolio/`) so ES modules (`type="module"`) load properly:

```bash
# Using Node.js (npx)
npx serve .

# Or using Python
python -m http.server 8080
