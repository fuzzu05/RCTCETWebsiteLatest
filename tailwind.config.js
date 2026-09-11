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
        /* Rotaract true brand gradient: Cranberry → Orange → Gold */
        'rotaract-gradient': 'linear-gradient(135deg, #D71921 0%, #F37021 50%, #FFC72C 100%)',
        'rotaract-warm':     'linear-gradient(135deg, #FFFDF9 0%, #FAF0E4 100%)',
        /* Alias kept for backwards compat */
        'custom-gradient':   'linear-gradient(135deg, #D71921 0%, #F37021 50%, #FFC72C 100%)',
      },
      colors: {
        background: 'rgb(var(--background) / <alpha-value>)',
        card:       'rgb(var(--card) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        muted:      'rgb(var(--muted) / <alpha-value>)',
        primary: {
          DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
          hover:   'rgb(var(--primary-hover) / <alpha-value>)',
          light:   'rgb(var(--primary-light) / <alpha-value>)',
        },
        secondary:   'rgb(var(--secondary) / <alpha-value>)',
        accent: {
          yellow: 'rgb(var(--accent-yellow) / <alpha-value>)',
          beige:  'rgb(var(--accent-beige) / <alpha-value>)',
        },
        /* Rotaract direct hex tokens for quick access */
        rotaract: {
          red:    '#D71921',
          orange: '#F37021',
          gold:   '#FFC72C',
          beige:  '#FAF7F2',
          charcoal: '#1F1A1C',
        },
      },
      boxShadow: {
        /* Warm Rotaract card shadows (light mode) */
        'card-light':       '0 1px 2px rgba(31,26,28,0.04), 0 4px 12px rgba(215,25,33,0.06), 0 12px 32px rgba(31,26,28,0.06)',
        'card-light-hover': '0 2px 4px rgba(31,26,28,0.06), 0 8px 20px rgba(215,25,33,0.12), 0 20px 40px rgba(31,26,28,0.08)',
        'primary-sm':       '0 4px 14px rgba(215,25,33,0.25)',
        'primary-md':       '0 8px 24px rgba(215,25,33,0.35)',
        'primary-glow':     '0 0 20px rgba(215,25,33,0.20)',
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
        poppins:    ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
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
