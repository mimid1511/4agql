/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [

      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "pink",
          secondary: "teal",
        },
      },

    ],
  },
};