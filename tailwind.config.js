/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#D92567',
          600: '#c2185b',
          700: '#ad1457',
          800: '#880e4f',
          900: '#4a044e',
        },
        secondary: {
          500: '#F2357B',
        },
        accent: {
          500: '#F2B3CA',
        },
        highlight: {
          500: '#F2836B',
        }
      },
      animation: {
        'in': 'fadeIn 0.2s ease-in-out',
        'slide-in-from-right': 'slideInFromRight 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInFromRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
