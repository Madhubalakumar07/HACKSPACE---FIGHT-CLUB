/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFCFB',
          100: '#FAF8F5',
          200: '#F3EFEA',
          300: '#E8E2D9',
          400: '#D5CCC0',
          500: '#B8ABA0',
        },
        sage: {
          50: '#F2F7F4',
          100: '#E2EFE7',
          200: '#C5DFD0',
          300: '#9BC7AE',
          400: '#6FA98B',
          500: '#4E8C6D',
          600: '#3D7157',
          700: '#325A47',
          800: '#2A493B',
          900: '#233C31',
        },
        wellness: {
          green: '#2E7D32',
          mint: '#10B981',
          teal: '#0D9488',
          amber: '#F59E0B',
          coral: '#F43F5E',
          sky: '#0284C7',
          lavender: '#8B5CF6',
          sand: '#EFEBE4',
          surface: '#FFFFFF',
          dark: '#1C2826'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(46, 125, 50, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        'soft-lg': '0 10px 30px -4px rgba(46, 125, 50, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'soft-xl': '0 20px 40px -8px rgba(46, 125, 50, 0.12), 0 8px 16px -4px rgba(0, 0, 0, 0.05)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'breathe': 'breathe 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.85' },
          '25%': { transform: 'scale(1.2)', opacity: '1' },
          '50%': { transform: 'scale(1.2)', opacity: '1' },
          '75%': { transform: 'scale(1)', opacity: '0.85' },
        }
      }
    },
  },
  plugins: [],
}
