/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest:    '#1a3a2e',
        green:     '#2d6a4f',
        'green-mid':'#3a8060',
        mint:      '#e8f5ee',
        honey:     '#d4a843',
        ivory:     '#fdfaf5',
        sage:      '#7a8a7e',
        border:    '#c8ddd0',
        'chip-bg': '#d4eadb',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        pill: '24px',
      },
      keyframes: {
        // left-to-right: chips flow in from the left side
        'scroll-rtl': {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'scroll-rtl': 'scroll-rtl 18s linear infinite',
        'fade-in':    'fade-in 0.4s ease forwards',
      },
    },
  },
  plugins: [],
};
