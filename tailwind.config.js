/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#0B0B0F",
        "void-2": "#0F0F14",
        "void-3": "#141419",
        chrome: "#C8C8D0",
        "chrome-dim": "#888894",
        "chrome-faint": "#3A3A46",
        gold: "#C9A84C",
        "gold-dim": "#7A6230",
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "Georgia", "serif"],
        body: ["'DM Mono'", "monospace"],
        sans: ["'DM Sans'", "sans-serif"],
      },
      animation: {
        "float": "float 8s ease-in-out infinite",
        "grain": "grain 0.9s steps(1) infinite",
        "scan": "scan 5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-18px) rotate(1deg)" },
          "66%": { transform: "translateY(-8px) rotate(-1deg)" },
        },
        grain: {
          "0%,100%":{transform:"translate(0,0)"},
          "10%":{transform:"translate(-2%,-3%)"},
          "20%":{transform:"translate(3%,1%)"},
          "30%":{transform:"translate(-1%,4%)"},
          "40%":{transform:"translate(4%,-2%)"},
          "50%":{transform:"translate(-3%,2%)"},
          "60%":{transform:"translate(2%,-4%)"},
          "70%":{transform:"translate(-4%,1%)"},
          "80%":{transform:"translate(1%,3%)"},
          "90%":{transform:"translate(-2%,-1%)"},
        },
        scan: {
          "0%": { transform: "translateY(-5%)" },
          "100%": { transform: "translateY(105vh)" },
        },
      },
    },
  },
  plugins: [],
};

