/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00718f",
          50: "#e6f4f7",
          100: "#cce9ef",
          200: "#99d3df",
          300: "#66bccf",
          400: "#33a6bf",
          500: "#00718f",
          600: "#005a72",
          700: "#004456",
          800: "#002d39",
          900: "#00171d",
        },
        secondary: {
          DEFAULT: "#4ecdc4",
          50: "#e8f9f7",
          100: "#c7f0ed",
          200: "#9fe7e0",
          300: "#7eddd6",
          400: "#66d8d0",
          500: "#4ecdc4",
          600: "#3bb5ad",
          700: "#2d9388",
          800: "#217063",
          900: "#164d42",
        },
        accent: {
          DEFAULT: "#ff6b6b",
          50: "#fff0f0",
          100: "#ffe0e0",
          200: "#ffb8b8",
          300: "#ff8e8e",
          400: "#ff7f7f",
          500: "#ff6b6b",
          600: "#e84848",
          700: "#cc2f2f",
          800: "#a82222",
          900: "#7a1818",
        },
        sky: {
          light: "#a8dadc",
          DEFAULT: "#457b9d",
          dark: "#1d3557",
        },
        earth: {
          light: "#f1faee",
          DEFAULT: "#a8b5a0",
          dark: "#6b8f71",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "scale-in": "scaleIn 0.5s ease-out",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
