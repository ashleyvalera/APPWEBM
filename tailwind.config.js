/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Manrope', 'sans-serif'],
      },
      colors: {
        primary: '#2D8E6E',
        secondary: '#A8DAC8',
        tertiary: '#4A7B9D',
      },
    },
  },
  plugins: [],
}