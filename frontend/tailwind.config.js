/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef5ff',
          100: '#d9e7ff',
          200: '#bcd4ff',
          300: '#8eb8ff',
          400: '#5a94ff',
          500: '#3A86FF', // Primary blue
          600: '#1e64ff',
          700: '#134ddb',
          800: '#1742b3',
          900: '#193a8a',
        },
        secondary: {
          50: '#f4f0fe',
          100: '#ebe0fd',
          200: '#d8c5fc',
          300: '#c5a9f9',
          400: '#a87df4',
          500: '#8338EC', // Secondary purple
          600: '#7629d9',
          700: '#6422b6',
          800: '#521d93',
          900: '#451d77',
        },
        accent: {
          50: '#fff0f6',
          100: '#ffe2ee',
          200: '#ffc5dd',
          300: '#ff96bf',
          400: '#ff5a9d',
          500: '#FF006E', // Accent pink
          600: '#ea0056',
          700: '#c50046',
          800: '#a3003c',
          900: '#880538',
        },
        success: {
          500: '#10B981', // Success green
        },
        warning: {
          500: '#FBBF24', // Warning yellow
        },
        error: {
          500: '#EF4444', // Error red
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};