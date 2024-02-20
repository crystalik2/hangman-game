/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.js'],
  theme: {
    extend: {
      screens: {
        xxs: '420px',
        xs: '510px',
      },
    },
  },
  plugins: [],
};
