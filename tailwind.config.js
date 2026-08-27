/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      colors: {
        amber: {
          600: '#B8863B',
          700: '#A07530',
        },
      },
    },
  },
  plugins: [],
}