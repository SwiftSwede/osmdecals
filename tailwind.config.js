/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      colors: {
        navy: "#003366",
        "navy-dark": "#002244",
        teal: "#008080",
        "safety-orange": "#FF6600",
        "light-gray": "#F2F2F2",
      },
      fontFamily: {
        heading: ["Montserrat", "sans-serif"],
        body: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
