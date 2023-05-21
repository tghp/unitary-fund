const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        yellow: {
          100: '#fafacc',
          200: '#FFFF99',
          300: '#FFFF4D',
          400: '#FFFF00',
          500: '#d2d204',
          600: '#918802',
          700: '#6b6402',
          800: '#3a3501',
          900: '#282601',
        },
      },
      fontWeight: {
        inherit: 'inherit',
      },
      gridTemplateAreas: {
        header: ['logo nav', '.    nav'],
      },
      gridTemplateRows: {
        header: 'auto auto',
      },
      gridTemplateColumns: {
        header: 'auto 1fr',
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant, addUtilities }) {
      addVariant('svg-child', '& > svg');

      addUtilities({
        '.svg-scale-h': {
          width: '100%',
          height: 'auto',
        },
        '.svg-scale-v': {
          width: 'auto',
          height: '100%',
        },
      });
    }),
    require('@tailwindcss/typography'),
    require('@savvywombat/tailwindcss-grid-areas'),
    require('tailwindcss-full-bleed'),
  ],
};
