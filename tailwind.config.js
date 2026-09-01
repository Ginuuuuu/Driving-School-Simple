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
        // Design Tokens: New Navy & Golden Yellow Identity
        // 1. Deep Navy Blue: #082B4C (Primary brand, navigation, header, footer, dark sections)
        // 2. Bright Golden Yellow: #F4C400 (Primary action, CTA buttons, active indicators, highlights)
        // 3. Warm Yellow / Gold Accent: #FFD21A (Accents, secondary CTAs)
        // 4. Pure White: #FFFFFF (Main background, cards, text on navy)
        // 5. Very Light Gray: #F5F6F7 (Secondary background, subtle sections, tables)
        // 6. Dark Charcoal: #202B33 (Primary body text, strong headings)
        // 7. Medium Gray: #6B7280 (Secondary text, descriptions, metadata)

        border: '#E5E7EB',
        background: '#FFFFFF',
        foreground: '#202B33',
        
        primary: {
          DEFAULT: '#082B4C',
          foreground: '#FFFFFF',
          hover: '#061F36',
          dark: '#041525',
          light: '#0E4477',
          50: '#F0F5FA',
          100: '#E0EBF5',
          200: '#B8D3EB',
          300: '#8FBBE0',
          400: '#3D88CA',
          500: '#082B4C',
          600: '#072440',
          700: '#061F36',
          800: '#05182B',
          900: '#041220',
          950: '#020A12',
        },
        accent: {
          DEFAULT: '#F4C400',
          foreground: '#082B4C',
          hover: '#DFAF00',
          light: '#FFD21A',
          50: '#FFFDF0',
          100: '#FFF9D6',
          200: '#FFF2AD',
          300: '#FFE675',
          400: '#FFD21A',
          500: '#F4C400',
          600: '#DFAF00',
          700: '#B89000',
          800: '#8A6D00',
          900: '#5C4800',
          950: '#3D3000',
        },
        secondary: {
          DEFAULT: '#202B33',
          foreground: '#FFFFFF',
          hover: '#161E24',
          light: '#6B7280',
          dark: '#082B4C',
        },
        muted: {
          DEFAULT: '#F5F6F7',
          foreground: '#6B7280',
        },
        destructive: {
          DEFAULT: '#DC2626',
          foreground: '#FFFFFF',
        },
        brand: {
          950: '#020A12',
          900: '#082B4C',
          800: '#0A3660',
          700: '#202B33',
          600: '#082B4C',
          500: '#F4C400',
          400: '#FFD21A',
          300: '#FFE675',
          200: '#E5E7EB',
          100: '#F5F6F7',
          50: '#FFFFFF',
        },
        slate: {
          950: '#020A12',
          900: '#082B4C',
          800: '#202B33',
          700: '#374151',
          600: '#4B5563',
          500: '#6B7280',
          400: '#9CA3AF',
          300: '#D1D5DB',
          200: '#E5E7EB',
          100: '#F3F4F6',
          50: '#F9FAFB',
        },
        emerald: {
          950: '#022C22',
          900: '#064E3B',
          800: '#065F46',
          700: '#047857',
          600: '#059669',
          500: '#10B981',
          400: '#34D399',
          300: '#6EE7B7',
          200: '#A7F3D0',
          100: '#D1FAE5',
          50: '#ECFDF5',
        },
        amber: {
          950: '#451A03',
          900: '#78350F',
          800: '#92400E',
          700: '#B45309',
          600: '#D97706',
          500: '#F4C400',
          400: '#FFD21A',
          300: '#FDE68A',
          200: '#FEF3C7',
          100: '#FFFBEB',
          50: '#FFFDF0',
        },
        safety: {
          50: '#FFFDF0',
          100: '#FFF9D6',
          200: '#FFF2AD',
          300: '#FFE675',
          400: '#FFD21A',
          500: '#F4C400',
          600: '#DFAF00',
          700: '#082B4C',
          800: '#061F36',
          900: '#041525',
        },
        signal: {
          green: '#10B981',
          amber: '#F4C400',
          red: '#EF4444',
          blue: '#082B4C',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Cabinet Grotesk', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(8, 43, 76, 0.07), 0 10px 20px -2px rgba(8, 43, 76, 0.04)',
        'glow-yellow': '0 0 25px -5px rgba(244, 196, 0, 0.45)',
        'glow-navy': '0 0 25px -5px rgba(8, 43, 76, 0.4)',
        'glow-amber': '0 0 25px -5px rgba(244, 196, 0, 0.4)',
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.35)',
        'glow-teal': '0 0 25px -5px rgba(8, 43, 76, 0.35)',
        'glow-crimson': '0 0 25px -5px rgba(244, 196, 0, 0.45)',
        'card': '0 1px 3px 0 rgba(8, 43, 76, 0.06), 0 1px 2px -1px rgba(8, 43, 76, 0.04)',
        'card-hover': '0 10px 25px -5px rgba(8, 43, 76, 0.12), 0 8px 10px -6px rgba(8, 43, 76, 0.08)',
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
