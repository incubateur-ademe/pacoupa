/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      boxShadow: {
        DEFAULT: "4px 4px 0 0 #183D2F",
      },
    },
    fontFamily: {
      "geist-sans": ["var(--font-geist-sans)", "sans-serif"],
    },
    // align with dsfr
    screens: {
      sm: "36em",
      md: "48em",
      lg: "62em",
      xl: "78em",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      yellow: colors.yellow,
      blue: colors.blue,
      red: colors.red,
      green: {
        900: "var(--color-green-900)",
        800: "var(--color-green-900)",
        700: "var(--color-green-700)",
        DEFAULT: "var(--color-green-700)",
        500: "var(--color-green-500)",
        200: "var(--color-green-200)",
        100: "var(--color-green-100)",
        50: "var(--color-green-50)",
      },
    },
  },
  plugins: [],
  corePlugins: {
    // disable preflight to avoid conflicts with dsfr
    preflight: false,
  },
};
