/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./data/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: "var(--brand)",
        brandDark: "var(--brand-dark)",
        ink: "var(--ink)",
        paper: "var(--paper)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "ui-sans-serif", "Arial"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia"],
      },
      boxShadow: { soft: "0 10px 30px -12px rgba(0,0,0,.15)" },
    },
  },
  plugins: [],
};
