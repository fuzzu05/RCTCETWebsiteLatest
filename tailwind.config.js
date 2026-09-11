const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(135deg, #E11D48 0%, #EA580C 50%, #F59E0B 100%)',
        'rotaract-gradient': 'linear-gradient(135deg, #E11D48 0%, #EA580C 50%, #F59E0B 100%)',
        'rotaract-warm': 'linear-gradient(135deg, #FFFDF9 0%, #FAF0E4 100%)',
      },
      colors: {
        background: 'rgb(var(--background) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        primary: {
          DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
          hover: 'rgb(var(--primary-hover) / <alpha-value>)',
          light: 'rgb(var(--primary-light) / <alpha-value>)',
        },
        secondary: 'rgb(var(--secondary) / <alpha-value>)',
        accent: {
          yellow: 'rgb(var(--accent-yellow) / <alpha-value>)',
          beige: 'rgb(var(--accent-beige) / <alpha-value>)',
        },
      },
      keyframes: {
        slider: {
          'from': { transform: 'translateX(40px)' },
          'to': { transform: 'translateX(-2188px)' },
        },
        slider_mobile: {
          'from': { transform: 'translateX(40px)' },
          'to': { transform: 'translateX(-1935px)' },
        },
      },
      animation: {
        slider: 'slider 30s linear infinite',
        slider_mobile: 'slider_mobile 30s linear infinite',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      screens: {
        'xs': '425px',
        'xxl': '1680px',
        'xxl2': '2800px',
      },
    },
  },
  plugins: [],
}
