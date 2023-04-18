/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      borderRadius: {
        xl: '1.5rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

