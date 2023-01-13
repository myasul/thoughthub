/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

const shapeRendering = plugin(function ({ addUtilities }) {
  const newUtilities = {
    '.shape-auto': {
      'shape-rendering': 'auto',
    },
    '.shape-optimize-speed': {
      'shape-rendering': 'optimizeSpeed',
    },
    '.shape-crisp-edges': {
      'shape-rendering': 'crispEdges',
    },
    '.shape-geometric-precision': {
      'shape-rendering': 'geometricPrecision',
    },
  }

  addUtilities(newUtilities)
})


module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
        colors: {
           'calendar-entry-border' : 'rgba(27, 31, 35, 0.06)'
        }
    },
    fontFamily: {
        'calendar': ['system-ui', 'sans-serif']
    }
  },
  plugins: [shapeRendering],
}
