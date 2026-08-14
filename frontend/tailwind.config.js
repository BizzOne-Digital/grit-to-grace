/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#1a2b6d',
          600: '#152258',
          700: '#0f1a45',
          800: '#0a1232',
          900: '#060c22',
        },
        crimson: {
          50: '#fff1f2',
          100: '#ffe4e6',
          400: '#e84545',
          500: '#C8102E',
          600: '#a50d24',
          700: '#820a1c',
        },
        gold: {
          400: '#f5c842',
          500: '#e8b800',
        }
      },
      fontFamily: {
        display: ['Bebas Neue', 'Impact', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
        body: ['Montserrat', 'system-ui', 'sans-serif'],
        script: ['Playfair Display', 'Libre Baskerville', 'serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, rgba(6,12,34,0.92) 0%, rgba(200,16,46,0.15) 100%)',
        'flag-overlay': 'url("/images/flag-bg.png")',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'slide-in': 'slideIn 0.5s ease-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    }
  },
  plugins: []
}
