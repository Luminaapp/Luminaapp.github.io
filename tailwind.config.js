/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'rubik': ['Rubik-Regular', 'sans-serif'],
        'rubik-thin': ['Rubik-Thin', 'sans-serif'],
        'rubik-light': ['Rubik-Light', 'sans-serif'],
        'rubik-regular': ['Rubik-Regular', 'sans-serif'],
        'rubik-medium': ['Rubik-Medium', 'sans-serif'],
        'rubik-semibold': ['Rubik-SemiBold', 'sans-serif'],
        'rubik-bold': ['Rubik-Bold', 'sans-serif'],
        'rubik-extrabold': ['Rubik-ExtraBold', 'sans-serif'],
        'rubik-black': ['Rubik-Black', 'sans-serif'],
      },
      colors: {
        "primary": {
          100: '#0061FF0A',
          200: '#0061FF1A',
          300: '#0061FF',
        },
        accent: {
          100: '#FBFBFD'
        },
        black: {
          DEFAULT: '#000000',
          100: '#8C8E98',
          200: '#666876',
          300: '#191D31',
          400: '#13141F',
          500: '#0D0E17',
        },
        dark: {
          card: '#1E2132',
          input: '#252837',
          border: '#2A2F3F',
        },
        danger: '#F75555',
        success: '#22C55E',
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
        },
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'fade-in-up': 'fadeIn 0.7s ease-out forwards'
      }
    },
  },
  plugins: [],
} 