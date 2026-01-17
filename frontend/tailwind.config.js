/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./assets/**/*.{css,html}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        surface: "#f2f5f7",
        // We removed dark mode colors as requested
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["'Lato'", "sans-serif"],
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
