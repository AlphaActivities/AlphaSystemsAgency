/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        uv: {"50":"#f7f3ff","500":"#6f59ff","600":"#5a45ff","700":"#4c3bd6"},
        gold: {"400":"#F5D76E"}
      },
      keyframes: {
        marquee: { from:{ transform:"translateX(0)" }, to:{ transform:"translateX(-50%)" } }
      },
      animation: {
        marquee: "marquee var(--marquee-speed, 14s) linear infinite"
      },
      boxShadow: {
        uvnav: "0 0 24px rgba(111, 89, 255, 0.45)"
      }
    },
  },
  plugins: [],
};
