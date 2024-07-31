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
      sm: "36em", // 576 px
      md: "48em", // 768 px
      lg: "62em", // 992 px
      xl: "78em", // 1248 px
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
      },
      primary: {
        700: "var(--color-primary-700)",
        500: "var(--color-primary-500)",
        300: "var(--color-primary-300)",
      },
      secondary: {
        700: "var(--color-secondary-700)",
        500: "var(--color-secondary-500)",
        300: "var(--color-secondary-300)",
      },
      tertiary: {
        700: "var(--color-tertiary-700)",
        500: "var(--color-tertiary-500)",
        300: "var(--color-tertiary-300)",
      },
      body: {
        700: "var(--color-body-700)",
        500: "var(--color-body-500)",
        300: "var(--color-body-300)",
      },
      success: {
        700: "var(--color-success-700)",
        300: "var(--color-success-300)",
      },
      warning: {
        700: "var(--color-warning-700)",
        300: "var(--color-warning-300)",
      },
      error: {
        700: "var(--color-error-700)",
        300: "var(--color-error-300)",
      },
      decoration: {
        700: "var(--color-decoration-700)",
        300: "var(--color-decoration-300)",
      },
    },
  },
  plugins: [],
  corePlugins: {
    // disable preflight to avoid conflicts with dsfr
    preflight: false,
  },
};
