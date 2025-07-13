/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7856ff'
      },
      boxShadow: {
        'white-sm': '0 1px 2px 0 rgba(255, 255, 255, 0.2)',
        'white-md': '0 4px 6px -1px rgba(255, 255, 255, 0.2), 0 2px 4px -2px rgba(255, 255, 255, 0.2)',
      },
    },
  },
  plugins: [],
}