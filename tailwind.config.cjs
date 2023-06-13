const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        manrope: ['Manrope', ...defaultTheme.fontFamily.serif],
        grotesk: ['Space Grotesk', ...defaultTheme.fontFamily.serif],
        mono: ['Space Mono', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        yellow: {
          100: '#fafacc',
          200: '#FFFF99', // Main Faded Yellow
          300: '#FFFF4D',
          400: '#FFFF00', // Main Brand Yellow
          500: '#d2d204',
          600: '#918802',
          700: '#6b6402',
          800: '#3a3501',
          900: '#282601',
        },
        purple: {
          50: '#EBD6FF',
          100: '#D6ADFF',
          200: '#AD5CFF',
          300: '#870FFF',
          400: '#5E00BD',
          500: '#36006C',
          600: '#2B0057',
          700: '#210042',
          800: '#140029',
          900: '#0A0014',
          950: '#05000A'
        },
        black: '#000000',
        'light-grey': '#f6f6f9',
        'darker-grey': '#d9d9d9',
      },
      fontWeight: {
        inherit: 'inherit',
      },
      gridTemplateAreas: {
        header: ['logo nav', '.    nav'],
        'section-header': ['title title', 'subtitle button'],
        'tag-search': ['title search', '. search'],
      },
      gridTemplateRows: {
        header: 'auto auto',
        'section-header': 'auto auto',
        filters: '30px',
        'tag-search': '30px auto',
      },
      gridTemplateColumns: {
        header: 'auto 1fr',
        'section-header': '1fr auto',
        filters: '150px 1fr auto',
        'tag-search': '150px auto',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      borderWidth: {
        5: '5px',
      },
      fontSize: {
        '3xl': ['2rem', { lineHeight: '2.25rem' }],
        '5xl': ['3.25rem', { lineHeight: '1' }],
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant, addUtilities, addBase, config, theme }) {
      addVariant('has-only-strong', '&:has(.only-strong)');
      addVariant('no-only-strong', '&:not(:has(.only-strong))');

      addVariant('svg-child', '& > svg');
      addVariant('svg-path-child', '& > svg path');

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

      addBase({
        // strong: { fontWeight: config('theme.fontWeight.semibold') },
        h2: {
          fontWeight: theme('fontWeight.semibold'),
          //   fontSize: theme('fontSize.xl'),

          //   [`@media (min-width: ${theme('screens.md', {})})`]: {
          //     fontSize: theme('fontSize.3xl'),
          //   },
        },
      });
    }),
    require('@tailwindcss/typography'),
    require('@savvywombat/tailwindcss-grid-areas'),
    require('tailwindcss-full-bleed'),
    require('tailwind-scrollbar-hide'),
  ],
};
