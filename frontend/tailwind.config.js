/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode using 'class'
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'color-change-green': 'colorChangeGreen 5s ease-in-out infinite',
        'color-change-red': 'colorChangeRed 5s ease-in-out infinite',
      },
      keyframes: {
        colorChangeGreen: {
          '0%': { backgroundColor: '#ffffff' },
          '25%': { backgroundColor: '#e0f7e1' }, // Light Green
          '50%': { backgroundColor: '#a4dba5' }, // Slightly darker green
          '75%': { backgroundColor: '#e0f7e1' }, // Light Green
          '100%': { backgroundColor: '#ffffff' },
        },
        colorChangeRed: {
          '0%': { backgroundColor: '#ffffff' },
          '25%': { backgroundColor: '#ffe0e0' }, // Light Red
          '50%': { backgroundColor: '#f5a9a9' }, // Slightly darker red
          '75%': { backgroundColor: '#ffe0e0' }, // Light Red
          '100%': { backgroundColor: '#ffffff' },
        },
      },
    },
  },
  plugins: [],
}

