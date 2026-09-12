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
        /* Phoenix brand gradient: Red → Orange → Gold */
        'custom-gradient': 'linear-gradient(135deg, #C62016 0%, #F26E0F 55%, #FAB215 100%)',
        'logo-gradient':  'linear-gradient(135deg, #C62016 0%, #F26E0F 50%, #FAB215 100%)',
        'light-gradient': 'linear-gradient(180deg, #FFFAF3 0%, #FFF3E2 100%)',
        /* Legacy aliases for backwards compat */
        'rotaract-gradient': 'linear-gradient(135deg, #C62016 0%, #F26E0F 50%, #FAB215 100%)',
        'rotaract-warm':     'linear-gradient(180deg, #FFFAF3 0%, #FFF3E2 100%)',
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
        secondary:   'rgb(var(--secondary) / <alpha-value>)',
        accent: {
          yellow: 'rgb(var(--accent-yellow) / <alpha-value>)',
          beige:  'rgb(var(--accent-beige) / <alpha-value>)',
        },
        /* Phoenix direct hex tokens for quick access */
        rotaract: {
          red:    '#C62016',
          orange: '#F26E0F',
          gold:   '#FAB215',
          beige:  '#FFFAF3',
          charcoal: '#261812',
        },
      },
      boxShadow: {
        /* Warm Phoenix card shadows (light mode) */
        'card-light':       '0 1px 2px rgba(38,24,18,0.04), 0 4px 12px rgba(198,32,22,0.06), 0 12px 32px rgba(38,24,18,0.06)',
        'card-light-hover': '0 2px 4px rgba(38,24,18,0.06), 0 8px 20px rgba(198,32,22,0.12), 0 20px 40px rgba(38,24,18,0.08)',
        'primary-sm':       '0 4px 14px rgba(198,32,22,0.25)',
        'primary-md':       '0 8px 24px rgba(198,32,22,0.35)',
        'primary-glow':     '0 0 20px rgba(198,32,22,0.20)',
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
