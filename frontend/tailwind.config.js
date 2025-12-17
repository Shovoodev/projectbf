/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        surface: "#f2f5f7",
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["'Lato'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
