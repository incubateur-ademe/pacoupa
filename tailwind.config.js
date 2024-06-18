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
        900: "#183d2f", //     color: rgb(24 61 47 / var(--tw-text-opacity));
        800: "#274430", //     color: rgb(39 68 48 / var(--tw-text-opacity));
        700: "#304436", //     color: rgb(48 68 54 / var(--tw-text-opacity));
        // 600: "#334337",
        DEFAULT: "#80b990",
        500: "#80b990", //     color: rgb(128 185 144 / var(--tw-text-opacity));
        200: "#92e3a9", //     color: rgb(146 227 169 / var(--tw-text-opacity));
        100: "#b3ebc3", //     color: rgb(179 235 195 / var(--tw-text-opacity));
        50: "#ebf7eb", //     color: rgb(235 247 235 / var(--tw-text-opacity));
      },
    },
  },
  plugins: [],
  corePlugins: {
    // disable preflight to avoid conflicts with dsfr
    preflight: false,
  },
};
