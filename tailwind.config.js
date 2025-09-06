/** @type {import('tailwindcss').Config} */
// This file is no longer used in the primary build process.
// The configuration is now handled by a script tag in `index.html` for the Tailwind Play CDN.
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
    },
  },
  plugins: [],
}