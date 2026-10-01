/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./404.html",
    "./pages/**/*.{html,js}",
    "./js/**/*.{html,js}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#FFFFFF",
        "primary-green": "#04201A",
        "pine-surface": "#072C24",
        "pine-dark": "#04201A",
        "accent": "#00DF89",
        "accent-mint": "#00DF89",
        "accent-lime": "#A3E635",
        "neon-green": "#00DF89",
        "deep-forest": "#031B16",
        "surface": "#0A362D",
        "surface-dark": "#0A362D",
        "surface-card": "rgba(10, 54, 45, 0.75)",
        "surface-dim": "#04201A",
        "bg-dark": "#05261F",
        "background": "#05261F",
        "on-surface": "#FFFFFF",
        "on-surface-variant": "#B8D3CB",
        "outline": "rgba(0, 223, 137, 0.25)"
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        roboto: ["Roboto", "sans-serif"]
      }
    }
  },
  plugins: []
};
