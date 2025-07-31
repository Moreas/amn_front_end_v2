/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'yellow': {
          50: '#FFFBEB', // Light creamy yellow for sidebar and top bar
          500: '#F0C808', // Golden yellow for heart logo
        },
        'brown': {
          800: '#5C3A21', // Dark brown/maroon for text and icons
        }
      }
    },
  },
  plugins: [],
} 