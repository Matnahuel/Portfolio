# Matias Nahuel Carabajal · Portfolio

Sitio personal de Matias Nahuel Carabajal, Desarrollador Full Stack y Técnico Universitario en Programación (React · Node.js · TypeScript · PostgreSQL · MongoDB).  
En vivo: https://matnahuel.github.io/Portfolio/

## Stack

- **Frontend y marcado:** HTML5 semántico, CSS3 modular (`base.css`, `layout.css`, `components.css`, `sections.css`, `animations.css`, `responsive.css`) y ES Modules nativos (`main.js`, `navigation.js`, `translations.js`, `theme.js`, `phoneProjectCard.js`).
- **Soporte bilingüe (`ES` / `EN`):** Diccionario de traducción en el cliente dentro de `assets/js/translations.js` con botón tipo cápsula (`ES` / `EN`) y persistencia en `localStorage`.
- **Temas claro y oscuro:** Selector de tema (`#theme-toggle`) con persistencia en `localStorage` y variables CSS en escritorio, tablet y mobile.
- **Arquitectura responsive:** Reglas específicas para tablet y mobile en `assets/css/responsive.css` (`@media (max-width: 1024px)` y `@media (max-width: 768px)`), manteniendo aislado el diseño de escritorio y evitando desbordes horizontales.
- **Despliegue y dominio:** Publicado en GitHub Pages (`main`) con archivo `CNAME` en la raíz y configuración de dominio personalizado.

## Decisiones de arquitectura

- **Separación entre mobile/tablet y escritorio:** Los ajustes de diseño en mobile y tablet se concentran en `assets/css/responsive.css` sin alterar la vista de escritorio, incluyendo la barra superior mobile de 5 slots con `MC` al centro, el reordenamiento del footer y la contención de anchos (`max-width: 100%`, `min-width: 0`).
- **Módulos JavaScript acotados:** Cada funcionalidad vive en su propio módulo: idioma en `translations.js`, modo claro/oscuro en `theme.js`, navegación en `navigation.js` y tarjetas interactivas de proyectos en `phoneProjectCard.js`.
- **Textos y traducciones centralizados:** Títulos, viñetas de experiencia, detalles de proyectos y etiquetas de interfaz se vinculan mediante `data-translate-key` entre español (`esp`) e inglés (`eng`).
- **Sin peso extra de frameworks:** Entrega de archivos estáticos sin dependencias pesadas en tiempo de ejecución, favoreciendo tiempos de carga ágiles en conexiones móviles.
- **SEO y metadatos:** Etiquetas Open Graph, meta descripciones y estructura semántica (`<header>`, `<main>`, `<footer>`) en `index.html`.

## Cómo ejecutarlo en local

Levantá un servidor estático desde la raíz del proyecto (`Portfolio/`) para que los ES Modules (`type="module"`) carguen sin bloqueos del navegador:

```bash
# Con Node.js (npx)
npx serve .

# O con Python
python -m http.server 8080
