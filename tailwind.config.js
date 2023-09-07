/* eslint-disable no-undef, @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      body: ['Instrument Sans', 'sans-serif'],
      header: ['Instrument Sans', 'sans-serif'],
      sans: ['Instrument Sans', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: colors.yellow,
        danger: colors.red
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio'), require('@tailwindcss/line-clamp')],
};
