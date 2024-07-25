/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "blush-red": "#F4739E",
      },
      backgroundImage: {
        banner:
          "linear-gradient(to right , rgba(0,0,0,0.5) , rgba(0,0,0,0.5)) , url('https://img.freepik.com/premium-photo/people-office-background_236854-36902.jpg')",
      },
      boxShadow: {
        "custom-inset":
          "rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px",
      },
      keyframes: {
        slide: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        slide: "slide 2s linear infinite",
      },

      screens: {
        'm-landscape': { 'raw': '(max-width: 736px) and (orientation: landscape)' },
        'mobile': { 'max': '767px' }, // Custom screen for max-width: 767px
        'tab': { 'min': '768px', 'max': '979px' }, // Custom screen for tablet devices
        'md-landscape': { 'min': '960px', 'max': '1400px' }, // Custom screen for tablet landscape orientation

      },

    

    },
  },
  plugins: [],
});
