/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
      },
      colors: {
        brand: {
          50: '#edf3ff',
          100: '#d9e6ff',
          200: '#b7cfff',
          300: '#89adff',
          400: '#5d85f7',
          500: '#3f66e6',
          600: '#2f4fb9',
          700: '#263f92',
          800: '#223778',
          900: '#1f325f',
          950: '#111b35',
        },
        accent: {
          100: '#ccf3f2',
          300: '#66d6d1',
          500: '#0ea5a4',
          700: '#0a7373',
        },
      },
      boxShadow: {
        soft: '0 10px 40px rgba(18, 41, 82, 0.08)',
      },
    },
  },
  plugins: [],
}

