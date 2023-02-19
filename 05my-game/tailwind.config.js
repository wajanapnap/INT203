/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    // "./src/data/color-groups.json"
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  safelist:[
    "grid grid-cols-2 gap-2",
    "grid grid-cols-3 gap-2",
    "grid grid-cols-4 gap-2",
    "grid grid-cols-5 gap-2",
    "bg-[#22B14C]",
    "bg-[#27C957]",
    "bg-[#A349A4]",
    "bg-[#BC54BD]",
    "bg-[#FFC90E]",
    "bg-[#E0B210]",
    "bg-[#FFAEC9]",
    "bg-[#E090AA]"
  ]
}
