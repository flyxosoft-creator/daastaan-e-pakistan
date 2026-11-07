import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#123C2D',
          'green-dark': '#0A2418',
          'green-light': '#1a5040',
          ivory: '#F7F3E9',
          'ivory-dark': '#EDE8D8',
          gold: '#B99550',
          'gold-light': '#D4AF6E',
          'gold-dark': '#8A6E35',
          charcoal: '#292D2A',
          'charcoal-light': '#3D4340',
        },
        tier: {
          cultural: '#B99550',
          food: '#C46B22',
          family: '#2563EB',
          nature: '#16A34A',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Cinzel', 'Georgia', 'serif'],
        sans: ['Outfit', 'system-ui', 'sans-serif'],
      },
      animation: {
        fadeIn: 'fadeIn 0.6s ease-in-out forwards',
        slideUp: 'slideUp 0.7s ease-out forwards',
        shimmer: 'shimmer 2s linear infinite',
        float: 'float 3s ease-in-out infinite',
        bounce: 'bounce 1.5s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        card: '0 4px 24px -4px rgba(18, 60, 45, 0.12), 0 2px 8px -2px rgba(18, 60, 45, 0.08)',
        'card-hover': '0 12px 40px -8px rgba(18, 60, 45, 0.22), 0 4px 16px -4px rgba(18, 60, 45, 0.14)',
        gold: '0 4px 20px rgba(185, 149, 80, 0.35)',
        'gold-hover': '0 8px 30px rgba(185, 149, 80, 0.5)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0A2418 0%, #123C2D 50%, #1a5040 100%)',
        'cta-gradient': 'linear-gradient(135deg, #123C2D 0%, #0A2418 100%)',
        'gold-gradient': 'linear-gradient(135deg, #B99550 0%, #D4AF6E 100%)',
        shimmer: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
      },
    },
  },
  plugins: [],
};

export default config;
