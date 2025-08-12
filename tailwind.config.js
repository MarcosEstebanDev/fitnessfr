/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      keyframes: {
        gradientMove: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "none" },
        },
        underlineSlide: {
          "0%": { width: "0", opacity: "0" },
          "100%": { width: "66%", opacity: "0.7" },
        },
        bounceSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "gradient-move": "gradientMove 3s ease-in-out infinite",
        "fade-in": "fadeIn 1.2s ease both",
        "fade-in-slow": "fadeIn 2s ease both",
        "underline-slide": "underlineSlide 1.2s cubic-bezier(0.4, 0, 0.2, 1) both",
        "bounce-slow": "bounceSlow 2.2s infinite",
      },
    },
  },
  plugins: [],
};