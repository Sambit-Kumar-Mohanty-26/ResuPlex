const plugin = require('tailwindcss/plugin'); 

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.transform-style-3d': {
          'transform-style': 'preserve-3d',
        },
      })
    })
  ],
}