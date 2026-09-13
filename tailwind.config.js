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
        'custom-gradient': 'linear-gradient(135deg, #EA580C 0%, #F97316 50%, #F59E0B 100%)',
        'logo-gradient': 'linear-gradient(135deg, #EA580C 0%, #F97316 50%, #FBBF24 100%)',
        'light-gradient': 'linear-gradient(180deg, #FFFDF9 0%, #FFF8F0 100%)',
        'rotaract-gradient': 'linear-gradient(135deg, #EA580C 0%, #F97316 50%, #F59E0B 100%)',
        'rotaract-warm': 'linear-gradient(180deg, #FFFDF9 0%, #FFF8F0 100%)',
      },
      colors: {
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        card: {
          DEFAULT:    'rgb(var(--card) / <alpha-value>)',
          foreground: 'rgb(var(--card-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT:    'rgb(var(--muted) / <alpha-value>)',
          foreground: 'rgb(var(--muted-foreground) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
          hover:   'rgb(var(--primary-hover) / <alpha-value>)',
          light:   'rgb(var(--primary-light) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'rgb(var(--secondary) / <alpha-value>)',
          hover: 'rgb(var(--secondary-hover) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          yellow:  'rgb(var(--accent-yellow, var(--accent)) / <alpha-value>)',
          beige:   'rgb(var(--accent-beige, var(--card)) / <alpha-value>)',
        },
        rotaract: {
          primary:  '#EA580C',
          orange:   '#EA580C',
          secondary:'#F97316',
          yellow:   '#F59E0B',
          gold:     '#F59E0B',
          beige:    '#FFFAF3',
          charcoal: '#1E1E1E',
        },
      },
      boxShadow: {
        'card-light':       '0 1px 2px rgba(30,30,30,0.04), 0 4px 12px rgba(234,88,12,0.06), 0 12px 32px rgba(30,30,30,0.06)',
        'card-light-hover': '0 2px 4px rgba(30,30,30,0.06), 0 8px 20px rgba(234,88,12,0.12), 0 20px 40px rgba(30,30,30,0.08)',
        'primary-sm':       '0 4px 14px rgba(234,88,12,0.25)',
        'primary-md':       '0 8px 24px rgba(234,88,12,0.35)',
        'primary-glow':     '0 0 20px rgba(234,88,12,0.20)',
      },
      keyframes: {
        slider: {
          'from': { transform: 'translateX(40px)' },
          'to':   { transform: 'translateX(-2188px)' },
        },
        slider_mobile: {
          'from': { transform: 'translateX(40px)' },
          'to':   { transform: 'translateX(-1935px)' },
        },
      },
      animation: {
        slider:        'slider 30s linear infinite',
        slider_mobile: 'slider_mobile 30s linear infinite',
      },
      fontFamily: {
        poppins:    ['DM Sans', 'sans-serif'],
        montserrat: ['Outfit', 'sans-serif'],
        outfit:     ['Outfit', 'sans-serif'],
        dmsans:     ['DM Sans', 'sans-serif'],
      },
      screens: {
        'xs':   '425px',
        'xxl':  '1680px',
        'xxl2': '2800px',
      },
    },
  },
  plugins: [],
}
