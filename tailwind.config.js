/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#d9eaff',
          200: '#bcdbff',
          300: '#8ec5ff',
          400: '#59a3fe',
          500: '#3280f6',
          600: '#1e62ea',
          700: '#174ecc',
          800: '#1940a5',
          900: '#1a3882',
          accent: '#f59e0b',
        }
      }
    },
  },
  plugins: [],
}
