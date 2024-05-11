const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ['"Roboto"', "sans-serif"],
        // Add more custom font families as needed
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
  corePlugins: {
    preflight: true, // Enable preflight
  },
};
