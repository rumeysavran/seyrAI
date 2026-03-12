# Seyr AI — Website

A single-page marketing site for **Seyr AI**, inspired by the [Knotch Framer template](https://knotch.framer.ai). Built with HTML, CSS, and vanilla JavaScript.

## Run locally

Open `index.html` in a browser, or use a simple server:

```bash
# Python 3
python3 -m http.server 8080

# Node (npx)
npx serve .
```

Then visit `http://localhost:8080` (or the port shown).

## Hero background (video + neural network)

- **Default:** A canvas animation runs behind the hero: subtle neural-network-style nodes with connecting lines and twinkling particles (starry/cosmic effect). No extra files needed.
- **Optional video:** To use a video instead of (or on top of) the canvas, add a file named `hero-bg.mp4` in the project root. The video will autoplay muted and loop. Good sources for free AI/neural/particle footage:
  - [Pexels – neural network videos](https://www.pexels.com/search/videos/neural%20network/)
  - [Pexels – particles](https://www.pexels.com/search/videos/particles/)
  - [Coverr – neural networks](https://coverr.co/stock-video-footage/neural-networks)  
  Download a clip you like and save it as `hero-bg.mp4`.

## Logo

- **Included:** `logo.svg` is a minimal wordmark + icon that matches the site’s style. You can keep it or replace it.
- **Use your own:** Replace `logo.svg` with your own file (same name), or point the `<img>` in `index.html` to your logo path (e.g. `images/logo.svg`). The header and footer use the same logo.
- If the logo image fails to load, the text “Seyr AI” is shown as a fallback.

## Dark mode

The layout supports a dark theme. To enable it, set a theme in code or add a toggle:

```html
<html lang="en" data-theme="dark">
```

Or in the console: `document.documentElement.setAttribute('data-theme', 'dark')`.  
To persist: `localStorage.setItem('seyrai-theme', 'dark')` and read it in `script.js` (see existing `themeKey`).

## Structure

- **index.html** — All sections: hero, how it works, solutions, case study, benefits, testimonials, pricing, comparison, FAQ, CTA, footer.
- **styles.css** — Variables for light/dark theme, layout, and Knotch-style visuals.
- **hero-canvas.js** — Neural network + particles animation for the hero background.
- **script.js** — Mobile menu, scroll reveal, header scroll state.
- **details.txt** — Original requirements and content used for the copy.

## Customize

- **Colors:** Edit `:root` and `[data-theme="dark"]` in `styles.css` (e.g. `--accent`, `--gradient-start`, `--gradient-end`).
- **Copy:** Edit the text in `index.html` (hero, services, pricing, FAQ, etc.).
- **Links:** Update `#contact` and `href="#"` to your Cal.com, email, or contact page.
