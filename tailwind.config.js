/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./content/**/*.mdx"],
  theme: {
    extend: {
      boxShadow: {
        md: "2px 2px 0 0 var(--color-text-primary)",
        DEFAULT: "4px 4px 0 0 var(--color-green-900)",
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
        800: "var(--color-green-800)",
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
        700: "var(--color-text-primary)",
        500: "var(--color-text-secondary)",
        300: "var(--color-text-tertiary)",
      },
      success: {
        700: "var(--color-tag-vert-font)",
        300: "var(--color-tag-vert-bg)",
      },
      warning: {
        700: "var(--color-tag-jaune-font)",
        300: "var(--color-tag-jaune-bg)",
      },
      error: {
        700: "var(--color-tag-rouge-font)",
        300: "var(--color-tag-rouge-bg)",
      },
      neutral: {
        700: "var(--color-tag-gris-font)",
        300: "var(--color-tag-gris-bg)",
      },
      decoration: {
        700: "var(--color-decoration-stroke)",
        300: "var(--color-decoration-bg)",
      },
      calloutyellow: "var(--color-callout-jaune)",
      calloutblue: "var(--color-callout-bleu)",
      calloutgreen: "var(--color-callout-vert)",
      calloutred: "var(--color-callout-rouge)",
    },
  },
  plugins: [],
  corePlugins: {
    // disable preflight to avoid conflicts with dsfr
    preflight: false,
  },
};
