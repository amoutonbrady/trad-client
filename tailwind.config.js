const colors = require('tailwindcss/colors');

module.exports = {
  // purge: false,
  purge: {
    enabled: process.env['npm_lifecycle_event'] === 'build',
    mode: 'layers',
    layers: ['base', 'components', 'utilities'],
    content: ['./src/**/*.tsx', './src/**/*.ts', './src/**/*.html', './*.html'],
  },
  theme: {
    colors,
    container: {
      center: true,
    },
    extend: {
      inset: (theme) => ({
        ...theme('spacing'),
        '1/2': '50%',
      }),
      fontFamily: {
        sans: [
          '"Inter var"',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ],
      },
    },
  },
  variants: [
    'responsive',
    'group-hover',
    'focus-within',
    'first',
    'last',
    'odd',
    'even',
    'hover',
    'focus',
    'active',
    'visited',
    'disabled',
  ],
  plugins: [require('@tailwindcss/forms')],
};
