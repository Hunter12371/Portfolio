/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#050816", // Deep space blue/black
        secondary: "#100d25", // Richer vintage purple-black
        tertiary: "#151030", // For cards
        accent: "#915eff", // Electric purple
        "text-primary": "#f3f3f3",
        "text-secondary": "#aaa6c3",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
}
