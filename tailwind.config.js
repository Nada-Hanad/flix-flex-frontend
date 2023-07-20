/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        darkBlack: "#121212",
        lightText: "#FFFFFF",
        darkText: "#D4D4D4",
        accentText: "#F9A826",
      },
    },
  },
  plugins: [],
};
