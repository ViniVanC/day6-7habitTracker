/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        "blue-dianne": "#264653",
        "jungle-green": "#2A9D8F",
        "rob-roy": "#E9C46A",
        "sandy-brown": "#F4A261",
        "burnt-sienna": "#E76F51",
      },
    },
    screens: {
      xs: "480px",
      sm: "768px",
      md: "1060px",
    },
  },
  plugins: [],
};
