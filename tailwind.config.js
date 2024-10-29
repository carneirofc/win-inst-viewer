/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media", // uses media query (system preference) to determine dark mode
  //safelist: [
  //  // All color/theme related classes
  //  {pattern: /^bg-/, deep: true},
  //  /^bg-/,
  //  /^text-/,
  //  /^border-/,
  //  // NOTE: Add more classes here if you want to use them in the HTML
  //],
  theme: {
    extend: {},
  },
  plugins: [],
};
