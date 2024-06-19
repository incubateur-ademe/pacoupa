/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
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
      green: {
        900: "var(--color-green-900)", //     color: rgb(24 61 47 / var(--tw-text-opacity));
        800: "var(--color-green-900)", //     color: rgb(39 68 48 / var(--tw-text-opacity));
        700: "var(--color-green-700)", //     color: rgb(48 68 54 / var(--tw-text-opacity));
        DEFAULT: "var(--color-green-700)",
        500: "var(--color-green-500)", //     color: rgb(128 185 144 / var(--tw-text-opacity));
        200: "var(--color-green-200)", //     color: rgb(146 227 169 / var(--tw-text-opacity));
        100: "var(--color-green-100)", //     color: rgb(179 235 195 / var(--tw-text-opacity));
        50: "var(--color-green-50)", //     color: rgb(235 247 235 / var(--tw-text-opacity));
      },
    },
  },
  plugins: [],
  corePlugins: {
    // disable preflight to avoid conflicts with dsfr
    preflight: false,
  },
};
