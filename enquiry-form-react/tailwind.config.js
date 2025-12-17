/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // Ye line direct node_modules se files uthayegi, bina kisi error ke
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // Hum direct flowbite ka plugin use kar rahe hain
    require('flowbite/plugin'),
  ],
};

