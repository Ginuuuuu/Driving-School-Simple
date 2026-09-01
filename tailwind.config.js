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
        // Design Tokens: New 5-Color Identity
        // 1. Soft Blue-Green: #C2D3D0
        // 2. Muted Forest/Sage Green: #56776A
        // 3. Vibrant Teal: #42B7A7
        // 4. Soft Cool Off-White: #EDEFF4
        // 5. Deep Dark Green: #26423E

        border: '#C2D3D0',
        background: '#EDEFF4',
        foreground: '#26423E',
        
        primary: {
          DEFAULT: '#42B7A7',
          foreground: '#FFFFFF',
          hover: '#56776A',
          dark: '#26423E',
          light: '#C2D3D0',
          50: '#F3F9F8',
          100: '#E2F3F0',
          200: '#C2D3D0',
          300: '#9AD8D0',
          400: '#6CC6BA',
          500: '#42B7A7',
          600: '#349B8D',
          700: '#56776A',
          800: '#3B5B50',
          900: '#26423E',
          950: '#182B28',
        },
        secondary: {
          DEFAULT: '#56776A',
          foreground: '#FFFFFF',
          hover: '#3B5B50',
          light: '#C2D3D0',
          dark: '#26423E',
        },
        muted: {
          DEFAULT: '#EDEFF4',
          foreground: '#56776A',
        },
        destructive: {
          DEFAULT: '#E05353',
          foreground: '#FFFFFF',
        },
        brand: {
          950: '#182B28',
          900: '#26423E',
          800: '#2E4E49',
          700: '#3D6357',
          600: '#42B7A7',
          500: '#56776A',
          400: '#7D9E93',
          300: '#A5C0B9',
          200: '#C2D3D0',
          100: '#DDE5E3',
          50: '#EDEFF4',
        },
        slate: {
          950: '#182B28',
          900: '#26423E',
          800: '#2E4E49',
          700: '#3D6357',
          600: '#56776A',
          500: '#6E8D81',
          400: '#91ABA1',
          300: '#AEC5BE',
          200: '#C2D3D0',
          100: '#DDE5E3',
          50: '#EDEFF4',
        },
        emerald: {
          950: '#182B28',
          900: '#26423E',
          800: '#2E4E49',
          700: '#56776A',
          600: '#349B8D',
          500: '#42B7A7',
          400: '#6CC6BA',
          300: '#9AD8D0',
          200: '#C2D3D0',
          100: '#E2F3F0',
          50: '#F3F9F8',
        },
        amber: {
          950: '#182B28',
          900: '#26423E',
          800: '#3B5B50',
          700: '#56776A',
          600: '#349B8D',
          500: '#42B7A7',
          400: '#6CC6BA',
          300: '#C2D3D0',
          200: '#D6E3E0',
          100: '#EAF1F0',
          50: '#F3F9F8',
        },
        safety: {
          50: '#EDEFF4',
          100: '#C2D3D0',
          200: '#A5C0B9',
          300: '#9AD8D0',
          400: '#6CC6BA',
          500: '#42B7A7',
          600: '#56776A',
          700: '#3D6357',
          800: '#2E4E49',
          900: '#26423E',
        },
        signal: {
          green: '#42B7A7',
          amber: '#56776A',
          red: '#E05353',
          blue: '#42B7A7',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Cabinet Grotesk', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(38, 66, 62, 0.07), 0 10px 20px -2px rgba(38, 66, 62, 0.04)',
        'glow-emerald': '0 0 25px -5px rgba(66, 183, 167, 0.4)',
        'glow-amber': '0 0 25px -5px rgba(66, 183, 167, 0.4)',
        'glow-teal': '0 0 25px -5px rgba(66, 183, 167, 0.4)',
        'card': '0 1px 3px 0 rgba(38, 66, 62, 0.06), 0 1px 2px -1px rgba(38, 66, 62, 0.04)',
        'card-hover': '0 10px 25px -5px rgba(38, 66, 62, 0.12), 0 8px 10px -6px rgba(38, 66, 62, 0.08)',
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
