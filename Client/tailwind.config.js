import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ['"Roboto"', "sans-serif"],
      },
    },
  },
  plugins: [
    require("flowbite/plugin"),
    require("tailwind-scrollbar"),
  ],
  corePlugins: {
    preflight: true,
  },
};
