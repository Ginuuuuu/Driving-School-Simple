/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Design Tokens: New 6-Color Identity
        // 1. Deep Burgundy / Dark Wine: #39340F
        // 2. Dark Crimson / Burgundy: #5F1618
        // 3. Rich Crimson Red: #BC2639
        // 4. Soft Pink: #FFC5DC
        // 5. Muted Dusty Blue-Green: #9FBAB4
        // 6. Slate Blue: #404D68

        border: '#D4E2DF',
        background: '#FAF6F8',
        foreground: '#39340F',
        
        primary: {
          DEFAULT: '#BC2639',
          foreground: '#FFFFFF',
          hover: '#5F1618',
          dark: '#39340F',
          light: '#FFC5DC',
          50: '#FFF5F8',
          100: '#FDF2F5',
          200: '#FFC5DC',
          300: '#F794B3',
          400: '#E65171',
          500: '#BC2639',
          600: '#A01E2E',
          700: '#7A1723',
          800: '#5F1618',
          900: '#39340F',
          950: '#26230A',
        },
        secondary: {
          DEFAULT: '#404D68',
          foreground: '#FFFFFF',
          hover: '#2E374A',
          light: '#9FBAB4',
          dark: '#39340F',
        },
        muted: {
          DEFAULT: '#FAF6F8',
          foreground: '#404D68',
        },
        destructive: {
          DEFAULT: '#BC2639',
          foreground: '#FFFFFF',
        },
        brand: {
          950: '#26230A',
          900: '#39340F',
          800: '#5F1618',
          700: '#7A1723',
          600: '#BC2639',
          500: '#404D68',
          400: '#9FBAB4',
          300: '#C2D6D2',
          200: '#FFC5DC',
          100: '#FDF2F5',
          50: '#FAF6F8',
        },
        slate: {
          950: '#26230A',
          900: '#39340F',
          800: '#5F1618',
          700: '#404D68',
          600: '#404D68',
          500: '#627291',
          400: '#9FBAB4',
          300: '#C2D6D2',
          200: '#D4E2DF',
          100: '#EBD8DF',
          50: '#FAF6F8',
        },
        emerald: {
          950: '#26230A',
          900: '#39340F',
          800: '#5F1618',
          700: '#7A1723',
          600: '#A01E2E',
          500: '#BC2639',
          400: '#E65171',
          300: '#FFC5DC',
          200: '#9FBAB4',
          100: '#FDF2F5',
          50: '#FFF5F8',
        },
        amber: {
          950: '#26230A',
          900: '#39340F',
          800: '#5F1618',
          700: '#404D68',
          600: '#BC2639',
          500: '#BC2639',
          400: '#FFC5DC',
          300: '#FFD6E6',
          200: '#FFEAF1',
          100: '#FDF2F5',
          50: '#FAF6F8',
        },
        safety: {
          50: '#FAF6F8',
          100: '#FFC5DC',
          200: '#9FBAB4',
          300: '#F794B3',
          400: '#E65171',
          500: '#BC2639',
          600: '#404D68',
          700: '#5F1618',
          800: '#39340F',
          900: '#26230A',
        },
        signal: {
          green: '#BC2639',
          amber: '#404D68',
          red: '#BC2639',
          blue: '#404D68',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Cabinet Grotesk', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(57, 52, 15, 0.07), 0 10px 20px -2px rgba(57, 52, 15, 0.04)',
        'glow-emerald': '0 0 25px -5px rgba(188, 38, 57, 0.35)',
        'glow-amber': '0 0 25px -5px rgba(188, 38, 57, 0.35)',
        'glow-teal': '0 0 25px -5px rgba(188, 38, 57, 0.35)',
        'glow-crimson': '0 0 25px -5px rgba(188, 38, 57, 0.4)',
        'card': '0 1px 3px 0 rgba(57, 52, 15, 0.06), 0 1px 2px -1px rgba(57, 52, 15, 0.04)',
        'card-hover': '0 10px 25px -5px rgba(57, 52, 15, 0.12), 0 8px 10px -6px rgba(57, 52, 15, 0.08)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'car-bounce': 'carBounce 1.5s ease-in-out infinite',
        'road-stripe': 'roadStripe 1s linear infinite',
      },
      keyframes: {
        carBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' },
        },
        roadStripe: {
          '0%': { strokeDashoffset: '0' },
          '100%': { strokeDashoffset: '-40' },
        }
      }
    },
  },
  plugins: [],
}
