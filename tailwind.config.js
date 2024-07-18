/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // This enables class-based dark mode.
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: '#000000',  // Default black
          lighter: '#191919', // Slightly lighter shade of black
          // You can add more shades here
        },
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in forwards',
        fadeInDelay1: 'fadeIn 2s ease-in forwards ',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}