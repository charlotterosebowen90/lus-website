/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./conditions/*.html",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1b76c5',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#1b76c5',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          DEFAULT: '#7bc7ef',
          light: '#a8daef',
          dark: '#1b76c5',
        },
        dark: {
          DEFAULT: '#313131',
          light: '#4a4a4a',
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
