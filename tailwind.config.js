/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */

module.exports = {
  // purge: false,
  purge: {
    enabled: process.env.RANDOM_ENV === "production",
    content: ["./src/**/*.tsx", "./src/**/*.ts", "./src/**/*.html", "./*.html"],
  },
  theme: {
    container: {
      center: true,
    },
    extend: {
      inset: (theme) => ({
        ...theme("spacing"),
        "1/2": "50%",
      }),
      fontFamily: {
        sans: [
          '"Inter var"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ],
      },
    },
  },
  variants: [
    "responsive",
    "group-hover",
    "focus-within",
    "first",
    "last",
    "odd",
    "even",
    "hover",
    "focus",
    "active",
    "visited",
    "disabled",
  ],
  experimental: {
    experimental: "all",
  },
  future: {
    removeDeprecatedGapUtilities: true,
  },
};
