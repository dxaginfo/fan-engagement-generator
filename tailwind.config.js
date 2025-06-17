/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          900: '#1a365d', // Dark blue for header
          800: '#2c5282', // Secondary blue
          700: '#2b6cb0', // Button hover
          600: '#3182ce', // Button default
          500: '#4299e1', // Focus rings
          200: '#bee3f8', // Light text on dark bg
          100: '#ebf8ff', // Lightest blue bg
        },
        gray: {
          900: '#1a202c',
          800: '#2d3748',
          700: '#4a5568',
          600: '#718096',
          500: '#a0aec0',
          400: '#cbd5e0',
          300: '#e2e8f0',
          200: '#edf2f7',
          100: '#f7fafc',
          50: '#f9fafb',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}